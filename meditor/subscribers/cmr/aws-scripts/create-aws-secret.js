/**
 * Create/Update AWS Secrets
 *
 * Run from root folder of the subscriber
 * Need to pass in the CMR Provider, the Launchpad provided PFX file and the Launchpad provided PFX Passphrase file
 *
 * Example: npm run aws:create-secret -- --provider=FOO --pfxFile=./some/path/.svgsfoo.pfx --pfxPassphraseFile=./some/path/.pfxpass
 */

const AWS = require('aws-sdk')
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface(process.stdin, process.stdout)

const PASSPHRASE_SECRET_PREFIX = 'EarthdataPub/Launchpad/PFXPassphrase/' // CMR provider will be appended
const PFX_SECRET_PREFIX = 'EarthdataPub/Launchpad/PFX/' // CMR provider will be appended

// create a new AWS secrets client
// AWS automatically looks for AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars
const secretsClient = new AWS.SecretsManager({
    region: process.env.AWS_REGION || 'us-west-2',
})

async function main() {
    // read input values from CLIs
    const argsv = require('minimist')(process.argv.slice(2))
    const provider = argsv['provider']
    const pfx = argsv['pfxFile']
    const pfxPassphrase = argsv['pfxPassphraseFile']

    // make sure the user passed in the right information
    if (!provider) throw new Error('You did not provide a provider')
    if (!pfx) throw new Error('You did not provide a PFX file')
    if (!pfxPassphrase) throw new Error('You did not provide a PFX passphrase file')

    // make sure the two files actually exist before continuing
    if (!fs.existsSync(pfx)) throw new Error('PFX filepath was not found')
    if (!fs.existsSync(pfxPassphrase))
        throw new Error('PFX Passphrase filepath was not found')

    // build the secret ids and secrets value using the passed in information
    // we'll be using binary secrets so we need to get the binary version of the JSON string
    const pfxPassphraseSecretId = PASSPHRASE_SECRET_PREFIX + provider
    const pfxSecretId = PFX_SECRET_PREFIX + provider

    await confirm(`
        Are you sure you want to create/update the following secrets?
            - ${pfxSecretId} - PFX file: ${pfx}
            - ${pfxPassphraseSecretId} - PFX passphrase file: ${pfxPassphrase}\n
    `)

    await createOrUpdateSecret(pfxPassphraseSecretId, fs.readFileSync(pfxPassphrase, { encoding: 'utf-8' }), provider)
    await createOrUpdateSecret(pfxSecretId, fs.readFileSync(pfx), provider)

    process.exit(0)
}

async function createOrUpdateSecret(secretId, secretValue, provider) {
    const isBinary = typeof secretValue !== 'string'
    
    if (await secretExists(secretId)) {
        console.log(`Secret (${secretId}) already exists, overwriting it...`)

        const response = await secretsClient
            .updateSecret({
                SecretId: secretId,
                ...(isBinary && { SecretBinary: secretValue }),
                ...(!isBinary && { SecretString: secretValue })
            })
            .promise()

        console.log('Successfully updated secret ', response.Name, response.ARN)
    } else {
        console.log('Creating secret...')

        const response = await secretsClient
            .createSecret({
                Name: secretId,
                Description: `Launchpad tokens for the ${provider} CMR Provider`,
                ...(isBinary && { SecretBinary: secretValue }),
                ...(!isBinary && { SecretString: secretValue })
            })
            .promise()

        console.log('Successfully created secret ', response.Name, response.ARN)
    }
}

/**
 * AWS doesn't seem to have a way to just check existence of a secret
 * wrapping the describeSecret method in a try catch
 */
async function secretExists(secretId) {
    try {
        await secretsClient.describeSecret({ SecretId: secretId }).promise()

        return true
    } catch (err) {
        return false
    }
}

/**
 * prompts the user to confirm
 */
function confirm(question) {
    return new Promise((resolve, reject) => {
        rl.question(`${question} [yes]/no`, function (answer) {
            if (answer == 'yes') {
                resolve()
            }
            
            reject()
        })
    })
}

main()
