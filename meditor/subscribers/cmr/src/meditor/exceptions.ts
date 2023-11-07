import { convertMessageToAcknowledgement } from './services'
import { mEditorAcknowledgement, mEditorFailure, mEditorMessage } from './types'

/** Takes in data from STAN message from mEditor, other parameters. Returns data useful to subscription's onError handler. */
class MeditorAcknowledgeableError extends Error {
    #acknowledgement: mEditorAcknowledgement

    data: mEditorAcknowledgement
    message: string
    name = 'MeditorAcknowledgeableError'

    constructor(
        error: string,
        data: mEditorMessage,
        statusCode: mEditorFailure,
        url?: string
    ) {
        super()

        this.#acknowledgement = convertMessageToAcknowledgement({
            data,
            message: error,
            statusCode,
            url,
        })

        this.message = error
        this.data = this.#acknowledgement
    }
}

export { MeditorAcknowledgeableError }
