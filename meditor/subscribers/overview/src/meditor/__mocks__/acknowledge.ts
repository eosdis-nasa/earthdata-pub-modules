import { FastifyInstance } from 'fastify'
import { mEditorAcknowledgement } from '../types'

const acknowledgeToMeditor = jest.fn(
    async ({
        fastify,
        data,
    }: {
        fastify: FastifyInstance
        data: mEditorAcknowledgement
    }): Promise<string> => {
        const subject = 'mock-acknowledge-subject'
        const message = JSON.stringify(data)

        const guid = await Promise.resolve('mock-guid')

        fastify.log.info(`Published message for subject ${subject}.`)

        return guid
    }
)

export { acknowledgeToMeditor }
