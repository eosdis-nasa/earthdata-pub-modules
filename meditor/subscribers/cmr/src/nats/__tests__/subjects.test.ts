import { mEditorNatsSubjects } from '../../meditor/types'
import { parseModelNameFromSubjectName } from '../subjects'

describe('parsing mEditor models from NATS subject names', () => {
    test('returns a model name that matches the original model name', () => {
        const ummCModel = 'Collection Metadata'

        expect(parseModelNameFromSubjectName(mEditorNatsSubjects.UmmC)).toBe(
            ummCModel
        )
    })
})
