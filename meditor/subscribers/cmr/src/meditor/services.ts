import { FastifyInstance } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import {
    mEditorAcknowledgement,
    mEditorAcknowledgementTarget,
    mEditorMessage,
    mEditorNatsSubjects,
} from './types'

async function acknowledgeToMeditor({
    fastify,
    data,
}: {
    fastify: FastifyInstance
    data: mEditorAcknowledgement
}): Promise<string | void> {
    try {
        const subject = mEditorNatsSubjects.Acknowledge
        const message = JSON.stringify(data)

        const guid = await fastify.nats.utils.publishAsync(subject, message)

        fastify.log.info(`Published message for subject ${subject}.`)
        fastify.log.debug(`${subject}: ${message}`)

        return guid
    } catch (error) {
        fastify.log.error(`Error attempting to acknowledge to mEditor: ${error}`)
    }
}

function convertMessageToAcknowledgement({
    data,
    message,
    statusCode,
    url,
}: {
    data: mEditorMessage
    message: string
    statusCode: StatusCodes
    url?: string
}): mEditorAcknowledgement {
    const acknowledgement = {
        documentTitle: data?.document[data?.model?.titleProperty],
        id: data?.id,
        model: data?.model?.name,
        message,
        state: data?.state,
        statusCode,
        target: mEditorAcknowledgementTarget.Cmr,
        time: data?.time || Date.now(),
        //* Optionally includes url property. Like Object.assign(acknowledgement, url && {url})
        ...(url && { url }),
    }

    //* Assert any required acknowledgement properties.
    if (!acknowledgement.id) {
        throw Error(
            `Message failed to convert to acknowledgement. Message: ${JSON.stringify(
                data
            )}`
        )
    }

    return acknowledgement
}

export { acknowledgeToMeditor, convertMessageToAcknowledgement }
