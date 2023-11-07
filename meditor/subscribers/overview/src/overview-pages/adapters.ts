import { produce } from 'immer'
import { mEditorMessage } from '../meditor/types'

async function exampleAdapter(data: mEditorMessage) {
    const transformed = await produce<any>(
        data.document,
        async (draft: any) => await draft
    )

    return transformed
}

export { exampleAdapter }
