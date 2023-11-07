import { randomUUID } from 'crypto'
import { rest } from 'msw'
import { OverviewAuth, OverviewBaseUrl } from '../overview-pages/types'
import { HttpStatusCode } from '../server/types'

function exit(code = 0) {
    console.error("You probably didn't mean to call prod.")

    process.exit(code)
}

const handlers = [
    //* Make tests prod-safe.
    rest.post(`${OverviewBaseUrl.Prod}/*`, () => exit()),
    rest.delete(`${OverviewBaseUrl.Prod}/*`, () => exit()),
    rest.put(`${OverviewBaseUrl.Prod}/*`, () => exit()),

    //* Handle authentication.
    rest.get(OverviewAuth.Url, (request, response, context) => {
        return response(
            context.status(HttpStatusCode.Ok),
            context.json({
                token: randomUUID(),
                idleTimeout: 3600,
                maxTimeout: 3600,
            })
        )
    }),
]

export { handlers }
