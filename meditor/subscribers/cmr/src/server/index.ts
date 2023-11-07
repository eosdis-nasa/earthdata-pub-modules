import Fastify from 'fastify'
import { mEditorUmmC } from '../cmr/umm-c/types'
import { mEditorMessage, mEditorNatsSubjects } from '../meditor/types'

const fastify = Fastify({
    logger: {
        level: process.env.LOG_LEVEL,
    },
})

//* If any HTTP routes need to be registered, do it here.
fastify.get('/', async (request, reply) => {
    reply.redirect('/health')
})

//* Add routes to help in testing on non-production environments.
if (process.env.NODE_ENV !== 'production') {
    // a route used to send a test mEditor UMM-C record through, without having to run mEditor itself
    fastify.get('/publish-ummc', async () => {
        // import a test fixture
        const ummCFixture = (await import('../cmr/umm-c/__tests__/__fixtures__/umm-c-cmr.fixture.json')).default

        const mEditorUmmC: mEditorUmmC = {
            ...ummCFixture.items[0].umm as any,
            EntryID: ummCFixture.items[0].meta['native-id'],
            CmrProvider: ummCFixture.items[0].meta['provider-id'],
        }

        const mEditorMessage: mEditorMessage = {
            document: mEditorUmmC,
            id: 'foo',
            model: { titleProperty: 'EntryID', name: 'Collection Metadata' },
            state: 'Draft',
            time: 1234567890,
        }

        await fastify.nats.utils.publishAsync(
            mEditorNatsSubjects.UmmC,
            JSON.stringify(mEditorMessage)
        )

        return `published at ${Date.now()}`
    })
}

export { fastify as server }
