import { mEditorEnvironment } from '../../meditor/types'
import { determineApiActions } from '../api-config'

describe('API configuration', () => {
    describe('map API Actions', () => {
        test(`"Draft" state from mEditor's UAT environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'UAT'

            const actions = determineApiActions('Draft')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "POST",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Draft" state from mEditor's OPS environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'OPS'

            const actions = determineApiActions('Draft')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "POST",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Under Review" state from mEditor's UAT environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'UAT'

            const actions = determineApiActions('Under Review')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "POST",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Under Review" state from mEditor's OPS environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'OPS'

            const actions = determineApiActions('Under Review')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "POST",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Hidden" state from mEditor's UAT environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'UAT'

            const actions = determineApiActions('Hidden')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "DELETE",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Hidden" state from mEditor's OPS environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'OPS'

            const actions = determineApiActions('Hidden')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/production",
                    "method": "DELETE",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Published" state from mEditor's UAT environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'UAT'

            const actions = determineApiActions('Published')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "POST",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Published" state from mEditor's OPS environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'OPS'

            const actions = determineApiActions('Published')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/production",
                    "method": "POST",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Deleted" state from mEditor's UAT environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'UAT'

            const actions = determineApiActions('Deleted')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "DELETE",
                  },
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "DELETE",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })

        test(`"Deleted" state from mEditor's OPS environment`, () => {
            const mEditorEnv = process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment
            process.env.MEDITOR_ENVIRONMENT = 'OPS'

            const actions = determineApiActions('Deleted')

            expect(actions).toMatchInlineSnapshot(`
                Array [
                  Object {
                    "baseUrl": "http://example.com/production",
                    "method": "DELETE",
                  },
                  Object {
                    "baseUrl": "http://example.com/user-acceptance-testing",
                    "method": "DELETE",
                  },
                ]
            `)

            process.env.MEDITOR_ENVIRONMENT = mEditorEnv
        })
    })
})
