import { MeditorAcknowledgeableError } from '../../meditor/exceptions'
import { convertMessageToAcknowledgement } from '../../meditor/services'
import { mEditorAcknowledgement } from '../../meditor/types'
import { StatusCodes } from 'http-status-codes'
import { CmrMethodControllerOptions } from '../types'
import { CmrUmmCSuccessResponse } from './types'
import { parseDocumentTitle } from '../services'
import { deleteUmmCEntry, putUmmCEntry, validateDocumentTitle } from './services'
import { parseEnvironmentFromUrl, parseLabelFromMethod } from '../api-config'

async function handleUmmC({
    fastify,
    subject,
    data,
    apiAction,
    cmrAuth,
}: CmrMethodControllerOptions): Promise<mEditorAcknowledgement> {
    let response: CmrUmmCSuccessResponse

    if (!validateDocumentTitle(data)) {
        throw new MeditorAcknowledgeableError(
            `ShortName and Version fields in document ${parseDocumentTitle(
                data
            )} do not match the EntryID`,
            data,
            StatusCodes.BAD_REQUEST
        )
    }

    switch (apiAction.method) {
        case 'PUT':
            response = await putUmmCEntry(
                data,
                apiAction,
                cmrAuth.token as string,
                fastify.log
            )

            break

        case 'DELETE':
            response = await deleteUmmCEntry(
                data,
                apiAction,
                cmrAuth.token as string
            )

            break

        default:
            throw new MeditorAcknowledgeableError(
                `Message method "${apiAction.method}" is not supported for subject "${subject}".`,
                data,
                StatusCodes.METHOD_NOT_ALLOWED
            )
    }

    return convertMessageToAcknowledgement({
        data,
        message: `Document ${parseDocumentTitle(data)} with concept Id ${
            response['concept-id']
        } at revision ${response['revision-id']} was ${parseLabelFromMethod(
            apiAction.method
        )} CMR-${parseEnvironmentFromUrl(apiAction.baseUrl)}`,
        statusCode: StatusCodes.OK,
    })
}

export { handleUmmC }
