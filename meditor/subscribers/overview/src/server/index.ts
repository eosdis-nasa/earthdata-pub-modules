import Fastify from 'fastify'
import { mEditorMessage, mEditorNatsSubjects } from '../meditor/types'

const fastify = Fastify({
    logger: {
        level: process.env.LOG_LEVEL,
    },
})

//* Register a redirect route for the health check plugin.
fastify.get('/', async (request, reply) => {
    reply.redirect('/health')
})

if (process.env.NODE_ENV !== 'production') {
    fastify.get('/pub', async () => {
        const data: mEditorMessage = {
            document: { docTitle: 'A Brave New Title' },
            id: '507f191e810c19729de860ea',
            model: { titleProperty: 'docTitle', name: 'A Mock Model' },
            state: 'Under Review',
            time: 1234567890,
        }

        const guid = await fastify.nats.utils.publishAsync(
            mEditorNatsSubjects.OverviewPages,
            JSON.stringify(data)
        )

        return `published NATS message ${guid}`
    })

    fastify.get('/test', async () => {
        const data: mEditorMessage = {
            document: {
                docTitle: 'Update page',
                page_key: 'test_sub',
                content: {
                    id: 9,
                    heading: 'Test Sub Heading',
                    paragraphs: ['Test Sub Paragraph'],
                    list: ['Test Sub List'],
                },
            },
            id: '507f191e810c19729de860ea',
            model: { titleProperty: 'docTitle', name: 'A Mock Sub Model' },
            state: 'Under Review',
            time: 1234567890,
        }

        const guid = await fastify.nats.utils.publishAsync(
            mEditorNatsSubjects.OverviewPages,
            JSON.stringify(data)
        )

        return `published test Sub NATS message ${guid}`
    })
}

export { fastify as server }
