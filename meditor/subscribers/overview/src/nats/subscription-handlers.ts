import { FastifyInstance } from 'fastify'
import { Message } from 'node-nats-streaming'
import { MeditorAcknowledgeableError } from '../meditor/exceptions'
import { acknowledgeToMeditor } from '../meditor/services'
import { mEditorMessage, mEditorNatsSubjects } from '../meditor/types'
import { handleMessageBySubject } from '../overview-pages/controllers'
import { parseModelNameFromSubjectName } from './subjects'
import { StanSubscriptionEventHandlers } from './types'

function createSubscriptionHandlers(
    fastify: FastifyInstance
): StanSubscriptionEventHandlers {
    return {
        closed() {
            return fastify.log.info(`onClosed: Subscription closed.`)
        },
        //* The error could be a string (from STAN), an instance of Error (operationally...like JSON.parse), or a custom error (thrown from some controller / service).
        async error(errorUnion) {
            switch (typeof errorUnion) {
                case 'object':
                    if (errorUnion instanceof MeditorAcknowledgeableError) {
                        await acknowledgeToMeditor({ fastify, data: errorUnion.data })
                    }

                    return fastify.log.error(
                        `onError (subscription): ${errorUnion.message}`
                    )

                case 'string':
                default:
                    return fastify.log.error(`onError (subscription): ${errorUnion}`)
            }
        },
        async message(message: Message) {
            try {
                const subject = message.getSubject() as mEditorNatsSubjects
                const data: mEditorMessage = JSON.parse(message.getData() as string)

                if (!data.model?.name) {
                    data.model.name = parseModelNameFromSubjectName(subject)
                }

                fastify.log.info(
                    `onMessage: Received message for subject "${subject}".`
                )

                await handleMessageBySubject({ fastify, data, subject })
                //* Send acknowledgement of message receipt to STAN after handler's success.
                return message.ack()
            } catch (error: any) {
                //* We want to retry on server errors, but not retry on client errors.
                const isClientError =
                    error instanceof MeditorAcknowledgeableError &&
                    error.data.statusCode >= 400 &&
                    error.data.statusCode <= 499

                if (isClientError) {
                    //* Send acknowledgement of message receipt to STAN if handler fails with a client error.
                    message.ack()
                }

                return fastify.nats.subscriptionHandlers.error(error)
            }
        },
        ready() {
            return fastify.log.info(`onReady: Subscription ready.`)
        },
        timeout(error: string) {
            return fastify.log.error(`onTimeout: ${error}.`)
        },
        unsubscribed() {
            return fastify.log.info(`onUnsubscribed: Subscription unsubscribed.`)
        },
    }
}

export { createSubscriptionHandlers }
