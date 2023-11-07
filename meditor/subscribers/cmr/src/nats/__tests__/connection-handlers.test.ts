import { setup, teardown } from '../../../jest.setupAfter'
import { server } from '../../server'

beforeAll(setup)
afterAll(teardown)

const errorText = 'Distrust your code.'

describe('connection event handlers on the NATS plugin', () => {
    test('registers a handler for every stan subscription event', () => {
        const registeredConnectionHandlers = Object.keys(
            server.nats.connectionHandlers
        )
        const allEvents = server.nats.client.eventNames() as string[]

        allEvents.forEach(event => {
            expect(registeredConnectionHandlers.includes(event)).toBe(true)
        })
    })

    test('close', () => {
        const infoSpy = jest.spyOn(server.log, 'info')
        const errorSpy = jest.spyOn(server.log, 'error')

        server.nats.connectionHandlers.close()
        expect(infoSpy).toHaveBeenCalledTimes(1)

        server.nats.connectionHandlers.close(errorText)
        expect(infoSpy).toHaveBeenCalledTimes(2)
        expect(errorSpy).toHaveBeenCalledTimes(1)
    })

    test('connect', () => {
        const infoSpy = jest.spyOn(server.log, 'info')

        server.nats.connectionHandlers.connect(server.nats.client)
        expect(infoSpy).toHaveBeenCalledTimes(1)
    })

    test('connection_lost', () => {
        const errorSpy = jest.spyOn(server.log, 'error')

        expect(() =>
            server.nats.connectionHandlers.connection_lost(errorText)
        ).toThrowError()
        expect(errorSpy).toHaveBeenCalledTimes(1)
    })

    test('disconnect', () => {
        const infoSpy = jest.spyOn(server.log, 'info')

        server.nats.connectionHandlers.disconnect()
        expect(infoSpy).toHaveBeenCalledTimes(1)
    })

    test('error', () => {
        const errorSpy = jest.spyOn(server.log, 'error')

        expect(() => server.nats.connectionHandlers.error(errorText)).toThrowError()
        expect(errorSpy).toHaveBeenCalledTimes(1)
    })

    test('permission_error', () => {
        const errorSpy = jest.spyOn(server.log, 'error')

        expect(() =>
            server.nats.connectionHandlers.permission_error(errorText)
        ).toThrowError()
        expect(errorSpy).toHaveBeenCalledTimes(1)
    })

    test('reconnect', () => {
        const infoSpy = jest.spyOn(server.log, 'info')

        server.nats.connectionHandlers.reconnect(server.nats.client)
        expect(infoSpy).toHaveBeenCalledTimes(1)
    })

    test('reconnecting', () => {
        const infoSpy = jest.spyOn(server.log, 'info')

        server.nats.connectionHandlers.reconnecting()
        expect(infoSpy).toHaveBeenCalledTimes(1)
    })
})
