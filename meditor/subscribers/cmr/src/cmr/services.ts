import https from 'https'
import AWS from 'aws-sdk'
import { MeditorAcknowledgeableError } from '../meditor/exceptions'
import { mEditorMessage } from '../meditor/types'
import { StatusCodes } from 'http-status-codes'
import { CmrAuth, CmrControllerOptions, LaunchpadAuth, LaunchpadCertificates, AWSOptions } from './types'

/** @returns URI-Component-Encoded string */
function parseDocumentTitle(data: mEditorMessage) {
    const title = data.document[data.model.titleProperty]

    if (!title) {
        throw new MeditorAcknowledgeableError(
            `Cannot parse the document title for title property "${data.model.titleProperty}".`,
            data,
            StatusCodes.UNPROCESSABLE_ENTITY
        )
    }

    return global.encodeURIComponent(title)
}

async function handleAuthentication({ fastify, cmrProvider }: CmrControllerOptions): Promise<CmrAuth> {
    if (!cmrProvider) {
        throw Error('No CMR provider was found in the document. The provider is required to lookup DAAC Launchpad tokens.')
    }

    fastify.log.info(`Fetching launchpad credentials for CMR provider: ${cmrProvider}`)

    // fetch launchpad certificates from AWS secrets
    const launchpadCertificates = await getLaunchpadCredentialsForCmrProvider(cmrProvider)

    return await getLaunchpadToken(launchpadCertificates)
}

async function getLaunchpadToken(launchpadCertificates: LaunchpadCertificates): Promise<CmrAuth> {
    const agent = new https.Agent({ pfx: launchpadCertificates.pfx, passphrase: launchpadCertificates.pfxPassphrase.trim() })
    const response: any = await fetch(LaunchpadAuth.Url, { agent })

    if (!response.ok) {
        throw Error('getLaunchpadToken did not return a token.')
    }

    const { sm_token, session_idletimeout, session_maxtimeout } =
        await response.json()
    //* Expiry is in seconds at this point.
    const [smallerExpiryNumber] = [session_idletimeout, session_maxtimeout].sort(
        (n1, n2) => n1 - n2
    )
    //* Set the expiry to a future time in milliseconds.
    const expiry = Date.now() + Number(smallerExpiryNumber * 1000)

    return { token: sm_token, expiry }
}

async function getLaunchpadCredentialsForCmrProvider(cmrProvider: string): Promise<LaunchpadCertificates> {
    // AWS automatically looks for AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars
    const secretsClient = new AWS.SecretsManager({
        region: process.env.AWS_REGION || 'us-east-1',
    })
    
    // create a new AWS secrets client
    // fetch pfx secrets from AWS
    const pfxSecretValue = await secretsClient.getSecretValue({ SecretId: AWSOptions.PFXSecretPrefix + cmrProvider }).promise()
    const pfxPassphraseSecretValue = await secretsClient.getSecretValue({ SecretId: AWSOptions.PFXPassphraseSecretPrefix + cmrProvider }).promise()

    return {
        pfx: pfxSecretValue.SecretBinary,
        pfxPassphrase: pfxPassphraseSecretValue.SecretString as string,
    }
}


export { handleAuthentication, parseDocumentTitle }
