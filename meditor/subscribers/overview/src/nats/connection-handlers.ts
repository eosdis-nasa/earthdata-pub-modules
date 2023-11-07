import { FastifyInstance } from 'fastify'
import { Stan } from 'node-nats-streaming'
import { StanConnectionEventHandlers } from './types'

function createConnectionHandlers(
    fastify: FastifyInstance
): StanConnectionEventHandlers {
    return {
        close(error?: string) {
            if (error) {
                fastify.log.error(`onClose: ${error}.`)
            }

            return fastify.log.info(
                `onClose: Disconnected client ${process.env.NATS_CLIENT_ID} from NATS Streaming Server cluster ${process.env.NATS_CLUSTER_ID} at ${process.env.NATS_URL}.`
            )
        },
        connect(client: Stan) {
            return fastify.log.info(
                `onConnect: Connected client ${process.env.NATS_CLIENT_ID} to NATS Streaming Server cluster ${process.env.NATS_CLUSTER_ID} at ${process.env.NATS_URL}.`
            )
        },
        connection_lost(error: string) {
            fastify.log.error(`onConnectionLost: ${error}.`)

            //! If the connection has been lost, throw so that we can restart.
            throw Error(error)
        },
        disconnect() {
            return fastify.log.info(
                `onDisconnect: Disconnected client ${process.env.NATS_CLIENT_ID} from NATS Streaming Server cluster ${process.env.NATS_CLUSTER_ID} at ${process.env.NATS_URL}.`
            )
        },
        error(error: string) {
            fastify.log.error(`onError (connection): ${error}.`)

            //! This is assumed to be an operational error that needs a process restart.
            throw Error(error)
        },
        permission_error(error: string) {
            fastify.log.error(`onPermissionError: ${error}.`)

            //! This is assumed to be an operational error that needs a process restart.
            throw Error(error)
        },
        reconnect(client: Stan) {
            return fastify.log.info(
                `onReconnect: Reconnected client ${process.env.NATS_CLIENT_ID} to NATS Streaming Server cluster ${process.env.NATS_CLUSTER_ID} at ${process.env.NATS_URL}.`
            )
        },
        reconnecting() {
            return fastify.log.info(
                `onReconnecting: Reconnecting client ${process.env.NATS_CLIENT_ID} to NATS Streaming Server cluster ${process.env.NATS_CLUSTER_ID} at ${process.env.NATS_URL}.`
            )
        },
    }
}

export { createConnectionHandlers }
