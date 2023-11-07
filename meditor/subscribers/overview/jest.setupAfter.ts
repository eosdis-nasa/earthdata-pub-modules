import { mEditorNatsSubjects } from './src/meditor/types'
import { createConnectionHandlers } from './src/nats/connection-handlers'
import nats from './src/nats/stan-fastify-plugin'
import { createSubscriptionHandlers } from './src/nats/subscription-handlers'
import { server } from './src/server'
import { mswServer } from './src/__mocks__/server'

//* Making fetch a global polyfill.
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch')
}

//* Set up Mock Service Worker (MSW) and NATS.
beforeAll(done => {
    mswServer.listen()

    server
        .register(nats, {
            auth: { expiry: null, token: null },
            connectionConfig: {
                clientId: process.env.NATS_CLIENT_ID as string,
                clusterId: process.env.NATS_CLUSTER_ID as string,
                url: process.env.NATS_URL as string,
            },
            connectionHandlers: createConnectionHandlers(server),
            subjects: [mEditorNatsSubjects.OverviewPages],
            subscriptionHandlers: createSubscriptionHandlers(server),
        })
        .ready(error => {
            if (error) {
                console.error(error)
            }
            done()
        })
})

beforeEach(() => {})

afterEach(() => {
    mswServer.resetHandlers()
})

afterAll(() => {
    server.nats.client.close()
    server.close()

    mswServer.close()
})
