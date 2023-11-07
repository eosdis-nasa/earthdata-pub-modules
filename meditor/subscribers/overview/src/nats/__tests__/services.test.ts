jest.mock('../services')

import { server } from '../../server'
import { generatePublishAsync } from '../services'

describe('publishAsync', () => {
    test('publishes asynchronously', async () => {
        const publishAsync = generatePublishAsync(server.nats.client)
        const guid = await publishAsync(
            'test.subject',
            'A test message has been published.'
        )

        expect(guid).toBe('mock-guid')
    })

    test('decorates the server instance', () => {
        expect(server.nats.utils.publishAsync).toBeDefined()
    })
})
