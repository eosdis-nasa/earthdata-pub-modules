import { HttpStatusCode } from '../../server/types'
import { MeditorAcknowledgeableError } from '../exceptions'
import { data } from '../__fixtures__/message-data'

describe('mEditor exceptions', () => {
    test('structures exception data as expected without url', () => {
        const errorData = new MeditorAcknowledgeableError(
            'It all went south.',
            data,
            HttpStatusCode.BadRequest
        )

        expect(errorData.message).toMatchInlineSnapshot(`"It all went south."`)
        expect(errorData.name).toMatchInlineSnapshot(`"MeditorAcknowledgeableError"`)
        expect(errorData.data).toMatchInlineSnapshot(`
            Object {
              "documentTitle": "A Brave New Title",
              "id": "507f191e810c19729de860ea",
              "message": "It all went south.",
              "model": "A Mock Model",
              "state": "Under Review",
              "statusCode": 400,
              "target": "edpub",
              "time": 1234567890,
            }
        `)
    })

    test('structures exception data as expected with url', () => {
        const errorData = new MeditorAcknowledgeableError(
            'It all went south.',
            data,
            HttpStatusCode.BadRequest,
            'https://example.com'
        )

        expect(errorData.message).toMatchInlineSnapshot(`"It all went south."`)
        expect(errorData.name).toMatchInlineSnapshot(`"MeditorAcknowledgeableError"`)
        expect(errorData.data).toMatchInlineSnapshot(`
            Object {
              "documentTitle": "A Brave New Title",
              "id": "507f191e810c19729de860ea",
              "message": "It all went south.",
              "model": "A Mock Model",
              "state": "Under Review",
              "statusCode": 400,
              "target": "edpub",
              "time": 1234567890,
              "url": "https://example.com",
            }
        `)
    })
})
