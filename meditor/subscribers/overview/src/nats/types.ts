import { Message, Stan, StanOptions, Subscription } from 'node-nats-streaming'
import { mEditorAcknowledgeableError } from '../meditor/types'
import { OverviewAuthResponse } from '../overview-pages/types'

export interface StanConnectionConfig {
    clientId: string
    clusterId: string
    url: string
}

/** Method names match connection event names for ease of attachment. https://github.com/nats-io/stan.js#stan-connections-events */
export interface StanConnectionEventHandlers {
    close: (error?: string) => void
    connect: (client: Stan) => void
    connection_lost: (error: string) => void
    disconnect: () => void
    error: (error: string) => void
    permission_error: (error: string) => void
    reconnect: (client: Stan) => void
    reconnecting: () => void
}

/** Method names match connection event names for ease of attachment. https://github.com/nats-io/stan.js#stan-subscriptions-events */
export interface StanSubscriptionEventHandlers {
    closed: () => void
    error: (errorUnion: ErrorUnion) => void
    message: (message: Message) => void
    ready: () => void
    timeout: (error: string) => void
    unsubscribed: () => void
}

export type StanPluginOptions = StanOptions & {
    auth: OverviewAuthResponse
    connectionConfig: StanConnectionConfig
    connectionHandlers: StanConnectionEventHandlers
    /** Subjects to which STAN will listen. Internally combined with environment variable NATS_CLIENT_ID to generate a durable subscription name. */
    subjects: string[]
    subscriptionHandlers: StanSubscriptionEventHandlers
}

export type Nats = {
    auth: OverviewAuthResponse
    client: Stan
    connectionHandlers: StanConnectionEventHandlers
    subscriptionHandlers: StanSubscriptionEventHandlers
    subscriptions: Subscription[]
    utils: {
        publishAsync: (
            subject: string,
            data?: Uint8Array | string | Buffer
        ) => Promise<string>
    }
}

export type ErrorUnion = string | Error | mEditorAcknowledgeableError
