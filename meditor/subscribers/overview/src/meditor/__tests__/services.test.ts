import { server } from '../../server'
import { convertMessageToAcknowledgement } from '../services'
import { mEditorMessage } from '../types'
import { data } from '../__fixtures__/message-data'
import { acknowledgeToMeditor } from '../__mocks__/acknowledge'

describe('acknowledging to mEditor', () => {
    //* This tests serves more as documentation than assurance of functionality, since I mocked the fn to prevent network ops.
    test('publishes to the acknowledge channel asynchronously', async () => {
        const acknowledgement = convertMessageToAcknowledgement({
            data,
            message: 'A message for mEditor UI.',
            statusCode: 200,
        })

        const guid = await acknowledgeToMeditor({
            fastify: server,
            data: acknowledgement,
        })

        expect(guid).toBe('mock-guid')
    })
})

describe('converting NATS message data from mEditor to an acknowledgement for mEditor', () => {
    test('returns the expected data with no url', () => {
        const acknowledgement = convertMessageToAcknowledgement({
            data,
            message: 'A message for mEditor UI.',
            statusCode: 200,
        })

        expect(acknowledgement).toMatchInlineSnapshot(`
            Object {
              "documentTitle": "A Brave New Title",
              "id": "507f191e810c19729de860ea",
              "message": "A message for mEditor UI.",
              "model": "A Mock Model",
              "state": "Under Review",
              "statusCode": 200,
              "target": "edpub",
              "time": 1234567890,
            }
        `)
    })

    test('returns the expected data with a url', () => {
        const data: mEditorMessage = {
            document: { docTitle: 'A Brave New Title' },
            id: '507f191e810c19729de860ea',
            model: { titleProperty: 'docTitle', name: 'A Mock Model' },
            state: 'Under Review',
            time: 1234567890,
        }

        const acknowledgement = convertMessageToAcknowledgement({
            data,
            message: 'A message for mEditor UI.',
            statusCode: 200,
            url: 'https://example.com',
        })

        expect(acknowledgement).toMatchInlineSnapshot(`
            Object {
              "documentTitle": "A Brave New Title",
              "id": "507f191e810c19729de860ea",
              "message": "A message for mEditor UI.",
              "model": "A Mock Model",
              "state": "Under Review",
              "statusCode": 200,
              "target": "edpub",
              "time": 1234567890,
              "url": "https://example.com",
            }
        `)
    })
})
