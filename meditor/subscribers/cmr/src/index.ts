import healthCheck from 'fastify-custom-healthcheck'
import { mEditorNatsSubjects } from './meditor/types'
import { createConnectionHandlers } from './nats/connection-handlers'
import nats from './nats/stan-fastify-plugin'
import { createSubscriptionHandlers } from './nats/subscription-handlers'
import { server } from './server'

//* Making fetch a global polyfill.
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch')
}

server
    .register(nats, {
        connectionHandlers: createConnectionHandlers(server),
        subjects: [mEditorNatsSubjects.UmmC],
        subscriptionHandlers: createSubscriptionHandlers(server),
    })
    //* The default STAN connection handlers will throw / process.exit(1) when the built-in heartbeat functionality fails (onConnectionLost), so there's no point in trying to build a heartbeat health check for STAN.
    .register(healthCheck, {
        exposeFailure: true,
        info: {
            nodeEnvironment: process.env.NODE_ENV as string,
            //* https://docs.npmjs.com/cli/v8/using-npm/scripts#packagejson-vars
            name: process.env.npm_package_name as string,
            subscribedSubjects: [mEditorNatsSubjects.UmmC].join(', '),
            version: process.env.npm_package_version as string,
        },
    })

server.listen(process.env.npm_package_config_port as string, error => {
    if (error) {
        server.log.error(error)

        process.exit(1)
    }
})
