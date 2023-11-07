import { FastifyInstance } from 'fastify'
import { mEditorMessage, mEditorNatsSubjects } from '../meditor/types'

export interface OverviewApiAction {
    baseUrl: OverviewBaseUrl
    method: OverviewHttpMethods
}

export type OverviewActionLabel = 'published to' | 'removed from'

export const enum OverviewAuth {
    Url = 'https://api.launchpad.nasa.gov/icam/api/sm/v1/gettoken',
}

export type OverviewAuthResponse = {
    expiry: number | null
    token: string | null | undefined
}

export const enum OverviewBaseUrl {
    Prod = 'http://example.com/production',
    UAT = 'http://example.com/user-acceptance-testing',
}

export interface OverviewControllerOptions {
    fastify: FastifyInstance
}

export type OverviewEnvironment = 'PROD' | 'UAT'

export type OverviewFailResponse = {
    errors: string[]
}

export type OverviewHttpMethods = 'DELETE' | 'POST' | 'PUT'

export interface OverviewMethodControllerOptions
    extends OverviewSubjectControllerOptions {
    apiAction: OverviewApiAction
}

export interface OverviewSubjectControllerOptions extends OverviewControllerOptions {
    subject: mEditorNatsSubjects | string
    data: mEditorMessage
}

export type OverviewSuccessResponse = {
    documentId: string
    revisionId: string
    url?: string
}
