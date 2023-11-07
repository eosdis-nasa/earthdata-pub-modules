import { Stan } from 'node-nats-streaming'

function generatePublishAsync(client: Stan) {
    return function publishAsync(
        subject: string,
        data?: Uint8Array | string | Buffer
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            client.publish(subject, data, (error: Error | undefined, guid: string) =>
                error ? reject(error) : resolve(guid)
            )
        })
    }
}

export { generatePublishAsync }
