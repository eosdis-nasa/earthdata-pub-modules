import { randomUUID } from 'crypto'
import { MeditorAcknowledgeableError } from '../meditor/exceptions'
import { mEditorMessage } from '../meditor/types'
import { HttpStatusCode } from '../server/types'
import { errorWithInflection } from '../utils/grammar'
import { parseEnvironmentFromUrl } from './api-config'
import {
    OverviewApiAction,
    OverviewAuthResponse,
    OverviewControllerOptions,
    OverviewFailResponse,
    OverviewSuccessResponse,
} from './types'

/** @returns URI-Component-Encoded string */
function parseDocumentTitle(data: mEditorMessage) {
    const title = data.document[data.model.titleProperty]

    if (!title) {
        throw new MeditorAcknowledgeableError(
            `Cannot parse the document title for title property "${data.model.titleProperty}".`,
            data,
            HttpStatusCode.UnprocessableEntity
        )
    }

    return global.encodeURIComponent(title)
}

async function handleAuthentication({ fastify }: OverviewControllerOptions) {
    //* This might be null, but that's intentional (hence the "expiry!").
    const expiry = fastify.nats.auth.expiry!

    //* Give expiry a ten-minute buffer.
    //* null - n === -n, which is less than Date.now(). The same is not true of undefined.
    if (Date.now() >= expiry - 1000 * 60 * 10) {
        const { token, expiry } = await authorize()

        fastify.log.info(`Fetched new token.`)

        fastify.nats.auth = { token, expiry }
    }
}

async function authorize(): Promise<OverviewAuthResponse> {
    const response = {
        ok: true,
        async json() {
            return {
                token: `Basic ${process.env.EDPUB_OVERVIEW_APIKEY}`,
                idleTimeout: 3600,
                maxTimeout: 3600,
            }
        },
    }

    if (!response.ok) {
        throw Error('The fetch to authorize did not return a 200 response.')
    }

    const { token, idleTimeout, maxTimeout } = await response.json()
    //* Expiry is in seconds at this point.
    const [smallerExpiryNumber] = [idleTimeout, maxTimeout].sort((n1, n2) => n1 - n2)
    //* Set the expiry to a future time in milliseconds.
    const expiry = Date.now() + Number(smallerExpiryNumber * 1000)

    return { token, expiry }
}

async function postEntry(
    data: mEditorMessage,
    apiAction: OverviewApiAction,
    token: string
) {
    const title = parseDocumentTitle(data)

    const response = await fetch(`${process.env.EDPUB_API_ROOT}/data/pages`, {
        method: apiAction.method,
        body: JSON.stringify(data.document),
        headers: {
            authorization: token,
            'Content-Type': 'application/json',
            submissionid: 'null',
        },
    })

    if (!response.ok) {
        const { errors }: OverviewFailResponse = await response.json()

        throw new MeditorAcknowledgeableError(
            `Document ${title} was not modified in ${parseEnvironmentFromUrl(
                apiAction.baseUrl
            )} due to the following ${errorWithInflection(
                errors.length
            )}: ${errors.join('\n')}`,
            data,
            response.status
        )
    }

    return (await response.json()) as OverviewSuccessResponse
}

async function putEntry(
    data: mEditorMessage,
    apiAction: OverviewApiAction,
    token: string
) {
    const title = parseDocumentTitle(data)

    const response = {
        ok: true,
        async json() {
            const result: OverviewSuccessResponse = {
                documentId: randomUUID(),
                revisionId: randomUUID(),
                url: 'http://example.com/published-page',
            }

            return result
        },
    } as any

    if (!response.ok) {
        const { errors }: OverviewFailResponse = await response.json()

        throw new MeditorAcknowledgeableError(
            `Document ${title} was not modified in ${parseEnvironmentFromUrl(
                apiAction.baseUrl
            )} due to the following ${errorWithInflection(
                errors.length
            )}: ${errors.join('\n')}`,
            data,
            response.status
        )
    }

    return (await response.json()) as OverviewSuccessResponse
}

async function deleteEntry(
    data: mEditorMessage,
    apiAction: OverviewApiAction,
    token: string
) {
    const title = parseDocumentTitle(data)

    const response = {
        ok: true,
        async json() {
            const result: OverviewSuccessResponse = {
                documentId: randomUUID(),
                revisionId: randomUUID(),
            }

            return result
        },
    } as any

    if (!response.ok) {
        const { errors }: OverviewFailResponse = await response.json()

        throw new MeditorAcknowledgeableError(
            `Document ${title} was not deleted from ${parseEnvironmentFromUrl(
                apiAction.baseUrl
            )} due to the following ${errorWithInflection(
                errors.length
            )}: ${errors.join('\n')}`,
            data,
            response.status
        )
    }

    return (await response.json()) as OverviewSuccessResponse
}

export {
    authorize,
    handleAuthentication,
    parseDocumentTitle,
    postEntry,
    putEntry,
    deleteEntry,
}
