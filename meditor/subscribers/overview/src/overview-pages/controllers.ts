import { MeditorAcknowledgeableError } from '../meditor/exceptions'
import {
    acknowledgeToMeditor,
    convertMessageToAcknowledgement,
} from '../meditor/services'
import { mEditorAcknowledgement, mEditorNatsSubjects } from '../meditor/types'
import { HttpStatusCode } from '../server/types'
import {
    determineApiActions,
    parseEnvironmentFromUrl,
    parseLabelFromMethod,
} from './api-config'
import {
    deleteEntry,
    handleAuthentication,
    parseDocumentTitle,
    postEntry,
    putEntry,
} from './services'
import {
    OverviewMethodControllerOptions,
    OverviewSubjectControllerOptions,
    OverviewSuccessResponse,
} from './types'

async function handleMessageBySubject({
    fastify,
    subject,
    data,
}: OverviewSubjectControllerOptions) {
    const apiActions = determineApiActions(data.state)

    if (!apiActions.length) {
        throw new MeditorAcknowledgeableError(
            `Message state "${data.state}" is not supported.`,
            data,
            HttpStatusCode.UnprocessableEntity
        )
    }

    //* Put a new token and new expiry (as needed) on fastify instance for service consumption.
    await handleAuthentication({ fastify })

    const acknowledgements: PromiseSettledResult<mEditorAcknowledgement>[] =
        await Promise.allSettled(
            apiActions.map(async apiAction => {
                fastify.log.info(
                    `Performing "${
                        apiAction.method
                    }" on document "${parseDocumentTitle(
                        data
                    )}" (${parseEnvironmentFromUrl(apiAction.baseUrl)}).`
                )

                switch (subject) {
                    case mEditorNatsSubjects.OverviewPages:
                        return handleOverviewPages({
                            fastify,
                            subject,
                            data,
                            apiAction,
                        })
                    default:
                        throw new MeditorAcknowledgeableError(
                            `The subscribed subject "${subject}" does not have a service defined.`,
                            data,
                            HttpStatusCode.UnprocessableEntity
                        )
                }
            })
        )

    await Promise.all(
        acknowledgements.map(async acknowledgement => {
            //* Handle differing data structures in Promise.allSettled()
            const mEditorAcknowledgement =
                acknowledgement.status === 'fulfilled'
                    ? acknowledgement.value
                    : acknowledgement.reason.data

            acknowledgeToMeditor({ fastify, data: mEditorAcknowledgement })
        })
    )
}

async function handleOverviewPages({
    fastify,
    subject,
    data,
    apiAction,
}: OverviewMethodControllerOptions): Promise<mEditorAcknowledgement> {
    let response: OverviewSuccessResponse

    switch (apiAction.method) {
        case 'POST':
            response = await postEntry(
                data,
                apiAction,
                fastify.nats.auth.token as string
            )

            break

        case 'PUT':
            response = await putEntry(
                data,
                apiAction,
                fastify.nats.auth.token as string
            )

            break

        case 'DELETE':
            response = await deleteEntry(
                data,
                apiAction,
                fastify.nats.auth.token as string
            )

            break

        default:
            throw new MeditorAcknowledgeableError(
                `Message method "${apiAction.method}" is not supported for subject "${subject}".`,
                data,
                HttpStatusCode.MethodNotAllowed
            )
    }

    return convertMessageToAcknowledgement({
        data,
        message: `Document ${parseDocumentTitle(data)} with Id ${
            response.documentId
        } at revision ${response.revisionId} was ${parseLabelFromMethod(
            apiAction.method
        )} EDPUB-${parseEnvironmentFromUrl(apiAction.baseUrl)}`,
        statusCode: HttpStatusCode.Ok,
        ...(response.url && { url: response.url }),
    })
}
export { handleMessageBySubject }
