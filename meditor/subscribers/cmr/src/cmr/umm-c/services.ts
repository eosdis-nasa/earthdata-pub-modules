import produce from 'immer'
import { MeditorAcknowledgeableError } from '../../meditor/exceptions'
import { mEditorMessage } from '../../meditor/types'
import { parseEnvironmentFromUrl } from '../api-config'
import { parseDocumentTitle } from '../services'
import { CmrApiAction } from '../types'
import { FastifyLoggerInstance } from 'fastify'
import type { CmrUmmCFailResponse, UmmC } from '../umm-c/types'
import { Version, Name, URL } from '../umm-c/types'
import { CmrUmmCSuccessResponse } from './types'
import { clearEmpties } from '../../utils/object'
import { StatusCodes } from 'http-status-codes'
import { errorWithInflection } from '../../utils/grammar'

async function putUmmCEntry(
    data: mEditorMessage,
    apiAction: CmrApiAction,
    token: string,
    log?: FastifyLoggerInstance
) {
    const title = parseDocumentTitle(data)

    let ummCDocument: string

    try {
        ummCDocument = JSON.stringify(prepareMeditorDataForCmrIngest(data.document))
    } catch (err) {
        // Failures in the message preparation are considered FATAL production errors
        log?.error('Failed to prepare mEditor data for ingest')
        log?.error(err)

        throw new MeditorAcknowledgeableError(
            `Document ${title} was not modified in CMR-${parseEnvironmentFromUrl(
                apiAction.baseUrl
            )} due to an internal mEditor error. Please submit a ticket for an engineering team member to review.`,
            data,
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }

    // output the mapped document to aid in debugging
    log?.debug(ummCDocument)

    //* PUT (or ingest) the document to the appropriate CMR instance
    const response = await fetch(
        `${apiAction.baseUrl}/ingest/providers/${data.document.CmrProvider}/collections/${title}`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': `application/vnd.nasa.cmr.umm+json;version=${Version.The1170}`,
                'Echo-Token': token,
            },
            body: ummCDocument,
        }
    )

    if (!response.ok) {
        const { errors }: CmrUmmCFailResponse = await response.json()

        throw new MeditorAcknowledgeableError(
            `Document ${title} using schema version ${
                Version.The1170
            } was not modified in CMR-${parseEnvironmentFromUrl(
                apiAction.baseUrl
            )} due to the following ${errorWithInflection(
                errors.length
            )}: ${parseCmrErrors(errors)}`,
            data,
            response.status
        )
    }

    return (await response.json()) as CmrUmmCSuccessResponse
}

async function deleteUmmCEntry(
    data: mEditorMessage,
    apiAction: CmrApiAction,
    token: string
) {
    const title = parseDocumentTitle(data)

    const response = await fetch(
        `${apiAction.baseUrl}/ingest/providers/${data.document.CmrProvider}/collections/${title}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Echo-Token': token,
            },
        }
    )

    if (!response.ok) {
        const { errors }: CmrUmmCFailResponse = await response.json()

        throw new MeditorAcknowledgeableError(
            `Document ${title} was not deleted from CMR-${parseEnvironmentFromUrl(
                apiAction.baseUrl
            )} due to the following ${errorWithInflection(
                errors.length
            )}: ${parseCmrErrors(errors)}`,
            data,
            response.status
        )
    }

    return (await response.json()) as CmrUmmCSuccessResponse
}

/**
 * converts the mEditor UMM-C schema to a CMR ready UMM-C document by:
 *      - tacking on the MetadataSpecification (Version) field
 *      - deleting empty objects, null/undefined values
 *      - removing mEditor specific fields
 */
function prepareMeditorDataForCmrIngest(data: any) {
    return produce<UmmC>(data, (draft: any) => {

        //* Lock the schema version to what's been generated by quicktype. This property exists on UmmC > 1.7. See ReadMe for instructions to update available version.
        draft.MetadataSpecification = {
            Name: Name.UmmC,
            URL: URL.HTTPSCDNEarthdataNasaGovUmmCollectionV1170,
            Version: Version.The1170,
        }

        // delete any extraneous mEditor fields
        delete draft.EntryID
        delete draft.CmrProvider
        delete draft._id
        delete draft['x-meditor']

        // drop any empty values left after mapping
        // undefined values and empty objects can trigger CMR validation errors
        return clearEmpties(draft)
    })
}

/**
 * in CMR, collections are referenced by shortname + version (e.g. ShortName: GLDAS_CLM10SUBP_3H, Version: 001)
 * in mEditor, they are combined into EntryID (e.g. GLDAS_CLM10SUBP_3H_001)
 *
 * if the title does not match these properties, we can unintentionally overwrite an existing record
 */
function validateDocumentTitle(data: mEditorMessage, delimiter: string = '_') {
    const title = parseDocumentTitle(data)
    const concatenatedTitle = [data.document.ShortName, data.document.Version].join(
        delimiter
    )

    return decodeURIComponent(title) === concatenatedTitle
}

/**
 * Returns a single concatenated string containing any errors that CMR has returned
 * 
 * CMR is not guaranteed to pass back string based errors, we'll stringify anything they send back
 * to ensure it is human readable
 */
function parseCmrErrors(errors: any[]) {
    return errors.map(error => JSON.stringify(error)).join('\n')
}

export { putUmmCEntry, deleteUmmCEntry, validateDocumentTitle }
