import { Nats } from '../nats/types'

declare module 'fastify' {
    interface FastifyInstance {
        nats: Nats
    }
}
