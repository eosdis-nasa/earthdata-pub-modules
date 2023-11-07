import { mEditorNatsSubjects } from '../../meditor/types'
import { parseModelNameFromSubjectName } from '../subjects'

describe('parsing mEditor models from NATS subject names', () => {
    test('returns a model name that matches the original model name', () => {
        expect(parseModelNameFromSubjectName(mEditorNatsSubjects.Acknowledge)).toBe(
            'Acknowledge'
        )
        expect(parseModelNameFromSubjectName(mEditorNatsSubjects.OverviewPages)).toBe(
            'Overview Pages'
        )
    })
})
