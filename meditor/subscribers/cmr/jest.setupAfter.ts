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

//* Set up Mock Service Worker (MSW).
beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())

//* Register the NATS plugin.
function setup(done: Function) {
    if (!server.printPlugins().includes('nats')) {
        server
            .register(nats, {
                connectionHandlers: createConnectionHandlers(server),
                subscriptionHandlers: createSubscriptionHandlers(server),
                subjects: [mEditorNatsSubjects.UmmC],
            })
            .ready(error => {
                if (error) {
                    console.error(error)
                }
                done()
            })
    }
}

// //* Clean up the NATS client and server.
function teardown() {
    server.nats.client.close()
    server.close()
}

export { setup, teardown }
