import { randomUUID } from 'crypto'

process.env.CMR_AUTH_PFX_FILE = 'secrets/.svgsgesdisc.pfx'
process.env.CMR_AUTH_PASSPHRASE_FILE = 'secrets/.pfxpass'

process.env.LOG_LEVEL = 'fatal'

process.env.NATS_CLIENT_ID = randomUUID()
process.env.NATS_CLUSTER_ID = 'test-cluster'
process.env.NATS_URL = 'nats://localhost:4222'

process.env.NODE_ENV = 'test'
