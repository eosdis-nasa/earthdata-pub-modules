import * as meditorServices from '../../meditor/services'
import { mEditorNatsSubjects } from '../../meditor/types'
import { data } from '../../meditor/__fixtures__/message-data'
import { server } from '../../server'
import { handleMessageBySubject } from '../controllers'
import * as overviewServices from '../services'

describe('data controller', () => {
    test('throws when valid API actions are not found', async () => {
        const ackSpy = jest.spyOn(meditorServices, 'acknowledgeToMeditor')

        //* For some reason, expect(() => {}).toThrow() isn't catching the error.
        try {
            await handleMessageBySubject({
                fastify: server,
                // @ts-expect-error
                data: { ...data, state: 'Some New State' },
                subject: mEditorNatsSubjects.OverviewPages,
            })
        } catch (error) {
            expect(error).toMatchInlineSnapshot(
                `[MeditorAcknowledgeableError: Message state "Some New State" is not supported.]`
            )

            expect(ackSpy).toHaveBeenCalledTimes(0)
        }
    })

    test('acknowledges error to mEditor when a valid subject is not found', async () => {
        const ackSpy = jest.spyOn(meditorServices, 'acknowledgeToMeditor')
        const postSpy = jest.spyOn(overviewServices, 'postEntry')
        const deleteSpy = jest.spyOn(overviewServices, 'deleteEntry')

        await handleMessageBySubject({
            fastify: server,
            data,
            subject: 'meditor-Nonexistent-Subject',
        })

        expect(ackSpy).toBeCalledTimes(1)
        expect(postSpy).toBeCalledTimes(0)
        expect(deleteSpy).toBeCalledTimes(0)
    })

    test('correctly handles overview pages POST', async () => {
        process.env.MEDITOR_ENVIRONMENT === 'UAT'

        const ackSpy = jest.spyOn(meditorServices, 'acknowledgeToMeditor')
        const postSpy = jest.spyOn(overviewServices, 'postEntry')
        const deleteSpy = jest.spyOn(overviewServices, 'deleteEntry')

        await handleMessageBySubject({
            fastify: server,
            data,
            subject: mEditorNatsSubjects.OverviewPages,
        })

        expect(ackSpy).toBeCalledTimes(1)
        expect(postSpy).toBeCalledTimes(1)
        expect(deleteSpy).toBeCalledTimes(0)
    })

    test('correctly handles overview pages DELETE', async () => {
        process.env.MEDITOR_ENVIRONMENT === 'UAT'

        const ackSpy = jest.spyOn(meditorServices, 'acknowledgeToMeditor')
        const postSpy = jest.spyOn(overviewServices, 'postEntry')
        const deleteSpy = jest.spyOn(overviewServices, 'deleteEntry')

        await handleMessageBySubject({
            fastify: server,
            data: { ...data, state: 'Deleted' },
            subject: mEditorNatsSubjects.OverviewPages,
        })

        expect(ackSpy).toBeCalledTimes(2)
        expect(postSpy).toBeCalledTimes(0)
        expect(deleteSpy).toBeCalledTimes(2)
    })
})
