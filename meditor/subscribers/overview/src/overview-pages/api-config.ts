import { mEditorDocumentState, mEditorEnvironment } from '../meditor/types'
import {
    OverviewActionLabel,
    OverviewApiAction,
    OverviewBaseUrl,
    OverviewEnvironment,
    OverviewHttpMethods,
} from './types'

function parseLabelFromMethod(method: OverviewHttpMethods): OverviewActionLabel {
    switch (method) {
        case 'DELETE':
            return 'removed from'

        case 'PUT':
            return 'published to'

        default:
            throw Error('Unable to parse an action label from method.')
    }
}

function parseEnvironmentFromUrl(url: OverviewBaseUrl): OverviewEnvironment {
    switch (url) {
        case OverviewBaseUrl.Prod:
            return 'PROD'

        case OverviewBaseUrl.UAT:
            return 'UAT'

        default:
            throw Error('Unable to parse environment from URL.')
    }
}

function determineApiActions(
    documentState: mEditorDocumentState
): OverviewApiAction[] {
    const isMeditorOps =
        (process.env.MEDITOR_ENVIRONMENT as mEditorEnvironment) === 'OPS'

    switch (documentState) {
        case 'Deleted':
            return isMeditorOps
                ? [
                      {
                          baseUrl: OverviewBaseUrl.Prod,
                          method: 'DELETE',
                      },
                      {
                          baseUrl: OverviewBaseUrl.UAT,
                          method: 'DELETE',
                      },
                  ]
                : [
                      {
                          baseUrl: OverviewBaseUrl.UAT,
                          method: 'DELETE',
                      },
                      {
                          baseUrl: OverviewBaseUrl.UAT,
                          method: 'DELETE',
                      },
                  ]

        case 'Draft':
        case 'Under Review':
            return [
                {
                    baseUrl: OverviewBaseUrl.UAT,
                    method: 'POST',
                },
            ]

        case 'Hidden':
            return [
                {
                    baseUrl: isMeditorOps
                        ? OverviewBaseUrl.Prod
                        : OverviewBaseUrl.UAT,
                    method: 'DELETE',
                },
            ]

        case 'Published':
            return [
                {
                    baseUrl: isMeditorOps
                        ? OverviewBaseUrl.Prod
                        : OverviewBaseUrl.UAT,
                    method: 'POST',
                },
            ]

        default:
            return []
    }
}

export { determineApiActions, parseEnvironmentFromUrl, parseLabelFromMethod }
