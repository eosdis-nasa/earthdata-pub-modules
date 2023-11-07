import { setup, teardown } from '../../../jest.setupAfter'
import { MeditorAcknowledgeableError } from '../../meditor/exceptions'
import * as meditorServices from '../../meditor/services'
import { mEditorMessage } from '../../meditor/types'
import { server } from '../../server'
import { StatusCodes } from 'http-status-codes'

const data: mEditorMessage = {
    document: { docTitle: 'A Brave New Title' },
    id: '507f191e810c19729de860ea',
    model: { titleProperty: 'docTitle', name: 'A Mock Model' },
    state: 'Under Review',
    time: 1234567890,
}
const errorText = 'Distrust your code'
const subject = 'localhost-Unused-Metadata'

beforeAll(setup)
afterAll(teardown)

describe('subscription event handlers on the NATS plugin', () => {
    test('registers a handler for every stan subscription event', () => {
        const registeredSubscriptionHandlers = Object.keys(
            server.nats.subscriptionHandlers
        )
        const allEvents = server.nats.subscriptions.flatMap(subscription => {
            return subscription.eventNames() as string[]
        })

        allEvents.forEach(event => {
            expect(registeredSubscriptionHandlers.includes(event)).toBeTruthy()
        })
    })

    test('closed', () => {
        const infoSpy = jest.spyOn(server.log, 'info')

        server.nats.subscriptionHandlers.closed()

        expect(infoSpy).toHaveBeenCalledTimes(1)
        expect(infoSpy.mock.calls).toMatchInlineSnapshot(`
            Array [
              Array [
                "onClosed: Subscription closed.",
              ],
            ]
        `)
    })

    test('error', () => {
        const acknowledgeSpy = jest.spyOn(meditorServices, 'acknowledgeToMeditor')
        const errorSpy = jest.spyOn(server.log, 'error')
        const acknowledgeable = new MeditorAcknowledgeableError(
            errorText,
            data,
            StatusCodes.BAD_REQUEST
        )
        const nonAcknowledgeable = new Error(errorText)

        server.nats.subscriptionHandlers.error(errorText)
        server.nats.subscriptionHandlers.error(nonAcknowledgeable)
        server.nats.subscriptionHandlers.error(acknowledgeable)

        expect(errorSpy).toHaveBeenCalledTimes(2)
        expect(acknowledgeSpy).toHaveBeenCalledTimes(1)
    })

    test('ready', () => {
        const infoSpy = jest.spyOn(server.log, 'info')

        server.nats.subscriptionHandlers.ready()

        expect(infoSpy).toHaveBeenCalledTimes(1)
        expect(infoSpy.mock.calls).toMatchInlineSnapshot(`
            Array [
              Array [
                "onReady: Subscription ready.",
              ],
            ]
        `)
    })

    test('timeout', () => {
        const errorSpy = jest.spyOn(server.log, 'error')

        server.nats.subscriptionHandlers.timeout(errorText)

        expect(errorSpy).toHaveBeenCalledTimes(1)
        expect(errorSpy.mock.calls).toMatchInlineSnapshot(`
            Array [
              Array [
                "onTimeout: Distrust your code.",
              ],
            ]
        `)
    })

    test('unsubscribed', () => {
        const infoSpy = jest.spyOn(server.log, 'info')

        server.nats.subscriptionHandlers.unsubscribed()

        expect(infoSpy).toHaveBeenCalledTimes(1)
        expect(infoSpy.mock.calls).toMatchInlineSnapshot(`
            Array [
              Array [
                "onUnsubscribed: Subscription unsubscribed.",
              ],
            ]
        `)
    })
})
