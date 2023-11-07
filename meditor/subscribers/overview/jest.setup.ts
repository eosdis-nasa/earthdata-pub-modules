import { randomUUID } from 'crypto'

process.env.LOG_LEVEL = 'fatal'

process.env.MEDITOR_ENVIRONMENT = 'UAT'

process.env.NATS_CLIENT_ID = randomUUID()
process.env.NATS_CLUSTER_ID = 'test-cluster'
process.env.NATS_URL = 'nats://localhost:4222'

process.env.NODE_ENV = 'test'
