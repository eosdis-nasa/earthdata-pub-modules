import { MeditorAcknowledgeableError } from '../meditor/exceptions'
import { acknowledgeToMeditor } from '../meditor/services'
import { mEditorAcknowledgement, mEditorNatsSubjects } from '../meditor/types'
import { StatusCodes } from 'http-status-codes'
import { determineApiActions, parseEnvironmentFromUrl } from './api-config'
import { handleAuthentication, parseDocumentTitle } from './services'
import { CmrAuth, CmrSubjectControllerOptions } from './types'
import { handleUmmC } from './umm-c/controller'

async function handleMessageBySubject({
    fastify,
    subject,
    data,
}: CmrSubjectControllerOptions) {
    const apiActions = determineApiActions(data.state)

    if (!apiActions.length) {
        throw new MeditorAcknowledgeableError(
            `Message state "${data.state}" is not supported.`,
            data,
            StatusCodes.UNPROCESSABLE_ENTITY
        )
    }

    // validate that the document contains the CMR Provider
    if (!data?.document?.CmrProvider) {
        throw new MeditorAcknowledgeableError('Document does not contain a CmrProvider', data, StatusCodes.BAD_REQUEST)
    }

    let cmrAuth: CmrAuth

    try {
        //* return a new token for service consumption
        cmrAuth = await handleAuthentication({ fastify, cmrProvider: data.document.CmrProvider })

        fastify.log.info(`Fetched new token from Launchpad for CMR provider: ${data.document.CmrProvider}`)
    } catch(err) {
        fastify.log.error(err)
        throw new MeditorAcknowledgeableError(`Failed to authenticate using Launchpad credentials for CMR provider: ${data.document.CmrProvider}`, data, StatusCodes.UNAUTHORIZED)
    }

    const acknowledgements: PromiseSettledResult<mEditorAcknowledgement>[] =
        await Promise.allSettled(
            apiActions.map(async apiAction => {
                fastify.log.info(
                    `Performing "${
                        apiAction.method
                    }" on document "${parseDocumentTitle(
                        data
                    )}" (${parseEnvironmentFromUrl(apiAction.baseUrl)}:${
                        data.document.CmrProvider
                    }).`
                )

                switch (subject) {
                    case mEditorNatsSubjects.UmmC:
                        return handleUmmC({ fastify, subject, data, apiAction, cmrAuth })

                    default:
                        throw new MeditorAcknowledgeableError(
                            `The subscribed subject "${subject}" does not have a service defined.`,
                            data,
                            StatusCodes.UNPROCESSABLE_ENTITY
                        )
                }
            })
        )

    await Promise.all(
        acknowledgements.map(async acknowledgement => {
            const mEditorAcknowledgement =
                acknowledgement.status === 'fulfilled'
                    ? acknowledgement.value
                    : acknowledgement.reason.data

            acknowledgeToMeditor({ fastify, data: mEditorAcknowledgement })
        })
    )
}

export { handleMessageBySubject }
