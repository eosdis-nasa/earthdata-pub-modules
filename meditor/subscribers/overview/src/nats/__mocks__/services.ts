import { Stan } from 'node-nats-streaming'

function generatePublishAsync(client: Stan) {
    const mockGuid = 'mock-guid'

    return function publishAsync(
        subject: string,
        data?: Uint8Array | string | Buffer
    ): Promise<string> {
        return new Promise(resolve => {
            resolve(mockGuid)
        })
    }
}

export { generatePublishAsync }
