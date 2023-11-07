import { errorWithInflection } from '../grammar'

describe('grammar utility', () => {
    test(`error`, () => {
        expect(errorWithInflection(-0.234)).toBe('errors')
        expect(errorWithInflection(0)).toBe('errors')
        expect(errorWithInflection(0.234)).toBe('errors')
        expect(errorWithInflection(1)).toBe('error')
        expect(errorWithInflection(9999)).toBe('errors')
    })
})
