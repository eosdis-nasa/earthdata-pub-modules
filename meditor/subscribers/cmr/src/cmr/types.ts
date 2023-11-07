import { FastifyInstance } from 'fastify'
import { mEditorMessage } from '../meditor/types'

export interface CmrApiAction {
    baseUrl: CmrBaseUrl
    method: CmrHttpMethods
}

export type CmrActionLabel = 'published to' | 'removed from'

export type CmrAuth = {
    expiry: number | null
    token: string | null
}

export const enum CmrBaseUrl {
    Prod = 'https://cmr.earthdata.nasa.gov',
    UAT = 'https://cmr.uat.earthdata.nasa.gov',
}

export interface CmrControllerOptions {
    fastify: FastifyInstance
    cmrProvider?: string
}

export type CmrDocumentState = 'documentPublished' | 'documentDraft'

export type CmrEnvironment = 'PROD' | 'UAT'

export type CmrHttpMethods = 'DELETE' | 'PUT'

export interface CmrMethodControllerOptions extends CmrSubjectControllerOptions {
    apiAction: CmrApiAction
    cmrAuth: CmrAuth
}

export interface CmrSubjectControllerOptions extends CmrControllerOptions {
    subject: string
    data: mEditorMessage
}

export const enum LaunchpadAuth {
    Url = 'https://api.launchpad.nasa.gov/icam/api/sm/v1/gettoken',
}

export const enum AWSOptions {
    PFXSecretPrefix = 'EarthdataPub/Launchpad/PFX/',
    PFXPassphraseSecretPrefix = 'EarthdataPub/Launchpad/PFXPassphrase/',
}

export interface LaunchpadCertificates {
    pfxPassphrase: string
    pfx: any
}
