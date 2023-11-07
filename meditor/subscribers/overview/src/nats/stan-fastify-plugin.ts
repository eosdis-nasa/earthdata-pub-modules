import { FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import STAN, { Stan, StartPosition } from 'node-nats-streaming'
import { generatePublishAsync } from './services'
import { Nats, StanPluginOptions } from './types'

const stanPlugin: FastifyPluginAsync<StanPluginOptions> = async (
    fastify,
    options
) => {
    const {
        auth,
        connectionConfig,
        connectionHandlers,
        subscriptionHandlers,
        subjects,
    } = options
    const { client, subscriptions } = await init()

    function init(): Promise<Pick<Nats, 'client' | 'subscriptions'>> {
        if (options.encoding === 'binary') {
            throw Error(
                'Connecting to a STAN server with binary encoding causes a Buffer to be returned for message data. This service is not yet equipped to parse Uint8Array messages.'
            )
        }

        const stan = STAN.connect(
            connectionConfig.clusterId,
            connectionConfig.clientId,
            {
                url: connectionConfig.url,
                ...options,
            }
        )

        //* Handle SIGTERM by closing connection.
        process.on('SIGTERM', event => {
            fastify.log.warn(`Closing connection because of ${event}.`)
            stan.close()
        })

        //* Add injected handlers to connection.
        Object.entries(connectionHandlers).forEach(([event, handler]) =>
            stan.on(event, handler)
        )

        //* Wait for connection before subscribing, then return the active subscriptions.
        return new Promise((resolve, reject) => {
            return stan.on('connect', client => {
                try {
                    resolve({
                        client,
                        subscriptions: subscribe(client),
                    })
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    function subscribe(client: Stan) {
        const options = {
            ...client.subscriptionOptions(),
            startPosition: StartPosition.FIRST,
            manualAcks: true,
            ackWait: 60 * 1000,
        }

        return subjects.map(subject => {
            //* Set the durable name as something unique to each subject.
            options.durableName = `${connectionConfig.clientId}-${subject}`

            const subscription = client.subscribe(subject, options)

            //* Add injected handlers to subscription.
            Object.entries(subscriptionHandlers).forEach(([event, handler]) =>
                subscription.on(event, handler)
            )

            return subscription
        })
    }

    //* Take what is passed in via the .register() method and combine it with this plugin init to put these objects on the registered fastify instance.
    fastify.decorate('nats', {
        auth,
        client,
        connectionHandlers,
        subscriptionHandlers,
        subscriptions,
        utils: {
            publishAsync: generatePublishAsync(client),
        },
    })
}

//* https://www.fastify.io/docs/latest/Plugins-Guide/
export default fastifyPlugin(
    async function nats(fastify, options: StanPluginOptions) {
        await stanPlugin(fastify, options)
    },
    { fastify: '3.x', name: 'nats' }
)
