import { data } from '../../meditor/__fixtures__/message-data'
import { parseDocumentTitle } from '../services'

describe('parsing document title', () => {
    test('uses the model property to grab an identifying string, encoding for URI', () => {
        const title = parseDocumentTitle(data)

        expect(title).toMatchInlineSnapshot(`"A%20Brave%20New%20Title"`)
    })

    test('throws when it cannot find a title', () => {
        const localData = {
            ...data,
            model: { ...data.model, titleProperty: 'DoesNotExist' },
        }

        expect(() =>
            parseDocumentTitle(localData)
        ).toThrowErrorMatchingInlineSnapshot(
            `"Cannot parse the document title for title property \\"DoesNotExist\\"."`
        )
    })
})
