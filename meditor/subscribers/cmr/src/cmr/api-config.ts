import { mEditorDocumentState, mEditorEnvironment } from '../meditor/types'
import {
    CmrActionLabel,
    CmrApiAction,
    CmrBaseUrl,
    CmrEnvironment,
    CmrHttpMethods,
} from './types'

function parseLabelFromMethod(method: CmrHttpMethods): CmrActionLabel {
    switch (method) {
        case 'DELETE':
            return 'removed from'

        case 'PUT':
            return 'published to'

        default:
            throw Error('Unable to parse an action label from method.')
    }
}

function parseEnvironmentFromUrl(url: CmrBaseUrl): CmrEnvironment {
    switch (url) {
        case CmrBaseUrl.Prod:
            return 'PROD'

        case CmrBaseUrl.UAT:
            return 'UAT'

        default:
            throw Error('Unable to parse CMR Environment from URL.')
    }
}

function determineApiActions(documentState: mEditorDocumentState): CmrApiAction[] {
    switch (documentState) {
        case 'Draft':
        case 'Under Review':
            // Draft/Under Review is published to CMR UAT
            return [
                {
                    baseUrl: CmrBaseUrl.UAT,
                    method: 'PUT',
                },
            ]

        case 'Published':
            // Published is published to CMR PROD
            return [
                {
                    baseUrl: CmrBaseUrl.Prod,
                    method: 'PUT',
                },
            ]

        case 'Deleted':
            // delete from both CMR UAT and CMR PROD
            return [
                {
                    baseUrl: CmrBaseUrl.Prod,
                    method: 'DELETE',
                },
                {
                    baseUrl: CmrBaseUrl.UAT,
                    method: 'DELETE',
                },
            ]

        default:
            return []
    }
}

export { determineApiActions, parseEnvironmentFromUrl, parseLabelFromMethod }
