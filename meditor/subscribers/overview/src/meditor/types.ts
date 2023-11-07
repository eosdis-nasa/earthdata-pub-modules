import { HttpStatusCode } from '../server/types'

export interface mEditorAcknowledgement {
    documentTitle?: string
    id: string
    message: string
    /** model name */
    model: string
    state: string
    /** mEditor defines success as 200, failure as anything else. */
    statusCode: mEditorSuccess | mEditorFailure
    /** This is used in mEditor to group document states. Only the most recent state is stored per target. */
    target: mEditorAcknowledgementTarget.EDPUB
    time?: number
    url?: string
}

export const enum mEditorAcknowledgementTarget {
    EDPUB = 'edpub',
}

export interface mEditorMessage {
    /** Generating types from mEditor's model schema would allow a better typing here. https://quicktype.io/typescript */
    document: any
    id: string
    model: mEditorModel
    state: mEditorDocumentState
    time: number
}

export interface mEditorModel {
    name: string
    titleProperty: string
}

export type mEditorSuccess = HttpStatusCode.Ok

export type mEditorFailure = Exclude<HttpStatusCode, HttpStatusCode.Ok>

export type mEditorEnvironment = 'OPS' | 'UAT'

export type mEditorAcknowledgeableError = {
    data: mEditorAcknowledgement
    message: string
    name: 'MeditorAcknowledgeableError'
}

export const enum mEditorNatsSubjects {
    Acknowledge = 'meditor-Acknowledge',
    OverviewPages = 'meditor-Overview-Pages',
}

export type mEditorDocumentState =
    | 'Deleted'
    | 'Draft'
    | 'Hidden'
    | 'Published'
    | 'Under Review'
