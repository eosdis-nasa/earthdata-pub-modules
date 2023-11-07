import { rest } from 'msw'
import { CmrBaseUrl, LaunchpadAuth } from '../cmr/types'
import ummCFixture from '../cmr/umm-c/__tests__/__fixtures__/umm-c-cmr.fixture.json'
import { StatusCodes } from 'http-status-codes'

function exit(code = 0) {
    console.error("You probably didn't mean to call CMR Prod.")

    process.exit(code)
}

const handlers = [
    //* Make CMR prod safe.
    rest.post(`${CmrBaseUrl.Prod}/*`, () => exit()),
    rest.delete(`${CmrBaseUrl.Prod}/*`, () => exit()),
    rest.put(`${CmrBaseUrl.Prod}/*`, () => exit()),

    //* Handle authentication.
    rest.get(LaunchpadAuth.Url, (request, response, context) => {
        return response(
            context.status(StatusCodes.OK),
            context.json({
                sm_token: 'QSBNb2NrZWQgVG9rZW4=',
                session_idletimeout: 3600,
                session_maxtimeout: 3600,
            })
        )
    }),

    //* Handle UMM-C.
    rest.get(
        `${CmrBaseUrl.UAT}/search/collections.umm_json`,
        (request, response, context) => {
            return response(context.status(StatusCodes.OK), context.json(ummCFixture))
        }
    ),
    rest.put(
        `${CmrBaseUrl.UAT}/ingest/providers/:providerId/collections/:nativeId`,
        (request, response, context) => {
            return response(
                context.status(StatusCodes.OK),
                context.json({ 'concept-id': 'C1200000000-PROV1', 'revision-id': 1 })
            )
        }
    ),
    rest.delete(
        `${CmrBaseUrl.UAT}/ingest/providers/:providerId/collections/:nativeId`,
        (request, response, context) => {
            return response(
                context.status(StatusCodes.OK),
                context.json({ 'concept-id': 'C1200000000-PROV1', 'revision-id': 1 })
            )
        }
    ),
]

export { handlers }
