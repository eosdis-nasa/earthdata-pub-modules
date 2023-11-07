import { StatusCodes } from 'http-status-codes'
import type { mEditorUmmC } from '../cmr/umm-c/types'

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
    target: mEditorAcknowledgementTarget.Cmr
    time?: number
    url?: string
}

export const enum mEditorAcknowledgementTarget {
    Cmr = 'cmr',
}

export interface mEditorMessage {
    document: mEditorUmmC | any
    id: string
    model: mEditorModel
    state: mEditorDocumentState
    time: number
}

export interface mEditorModel {
    name: string
    titleProperty: string
}

export type mEditorSuccess = StatusCodes.OK

export type mEditorFailure = Exclude<StatusCodes, StatusCodes.OK>

export type mEditorEnvironment = 'OPS' | 'UAT'

export type mEditorAcknowledgeableError = {
    data: mEditorAcknowledgement
    message: string
    name: 'MeditorAcknowledgeableError'
}

export const enum mEditorNatsSubjects {
    Acknowledge = 'meditor-Acknowledge',
    UmmC = 'meditor-Collection-Metadata',
}

export type mEditorDocumentState =
    | 'Deleted'
    | 'Draft'
    | 'Hidden'
    | 'Published'
    | 'Under Review'
