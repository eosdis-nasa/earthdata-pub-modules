# mEditor to CMR Adapter

This Node.js application [publishes and subscribes](https://github.com/nats-io/stan.js) to a [NATS Streaming Server](https://docs.nats.io/legacy/stan/intro) via a [Fastify](https://www.fastify.io/docs/latest/) plugin. It receives messages from mEditor, processes the data on those messages, and interacts with the [Common Metadata Repository (CMR)](https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/cmr) through its [Ingest API](https://cmr.earthdata.nasa.gov/ingest/site/docs/ingest/api.html), informing mEditor about the results of its operations.

STAN is synonymous with NATS Streaming. STAN is [being deprecated](https://docs.nats.io/legacy/stan/intro); JetStream is the NATS alternative for durable subscriptions to a subject.

-   [STAN Docker image](https://hub.docker.com/_/nats-streaming)

## Authentication

EDPub supports multiple DAACs and each DAAC has their own Launchpad credentials. Those credentials are stored in AWS secrets with the name/id structure: `EarthdataPub/Launchpad/PFX/{DAAC_CMR_PROVIDER}`and `EarthdataPub/Launchpad/PFX/{DAAC_CMR_PROVIDER}`

The collection that mEditor publishes should contain the CMR provider of the DAAC.

This subscriber takes the CMR provider from the mEditor document, grabs that CMR Providers Launchpad tokens, and publishes using that.

## Subscribing to a Document Workflow

When a document in mEditor moves through a workflow (e.g., moves from `Draft` to `Published`), mEditor publishes a message to a NATS server. That NATS server can be subscribed to by an external service—this project is one such service.

A message published by the NATS server will look similar to this example (type `mEditorMessage`):

```json
{
    "id": "007f191e510c19722de860ea", // mongo document id
    "document": {...}, // the document (same as what's available on mEditor's API via getDocument)
    "model": {...}, // data about the underlying mEditor model
    "state": "Under Review",
    "time": 1580324162703
}
```

A separate [channel](https://docs.nats.io/legacy/stan/intro/channels) is created for each mEditor model. For example, state changes to documents in the `Example News` model would be pushed to the `meditor-Example-News` channel. Clients are expected to publish an acknowledgement message into the `meditor-Acknowledgement` channel to inform mEditor about successful / failed operations on the data.

A message published to the `meditor-Acknowledgement` channel with this will look similar to this exmaple (type `mEditorAcknowledgement`):

```json
{
    "time": 1580324162703,
    "id": "007f191e510c19722de860ea", // mongo document id, returned so mEditor knows which document to update
    "model": "Example News", // the model namm
    "target": "example", // the application that handled the document (used to group document states)
    "url": "https://example.nasa.gov/news?title=Example%20article", //an optional URL where the document can be found in its latest state
    "message": "Success!", // success / failure message to show the user in mEditor
    "statusCode": "200", // status code to notify mEditor of success vs failure to publish
    "state": "Under Review" // document state, returned to mEditor for updating
}
```

## Local Development

The application can be run a number of different ways, depending on what you're trying to accomplish. Environment variables should be copied from `.env.example` to `.env`—create that file if it doesn't exist.

The `.env` file is built assuming that you are running the image in an EC2 instance where IAM roles are set up to read from the secrets resources. However, if you are running locally on your computer, you can overwrite certain environment variables stored in .env during runtime to use AWS credentials of your choosing, such as AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_PROFILE, and AWS_REGION.

### Tests & Linting

Tests are run on a pre-commit hook, which means that you'll need some NATS server running so that the application can run the test suites. There's a helper npm script to start (`npm run stan:up`) a NATS Streaming Server for that purpose. `npm run stan:down` will shut down and remove the docker image.

`src/mocks` contains all of the current [MSW](https://mswjs.io/) mocks. Jest configuration is done by convention, so `jest.config.js` will contain information about the Jest setup. `tsconfig.build.json` is used to extend `tsconfig.json`, but ignore files for build that Jest uses during test suite runs.

### Docker

#### Running image as part of docker-compose file
`docker compose up` will run the docker-compose file and start the application, reading from your `.env` file. You'll want to ensure that the `NATS_URL` is pointed to the internal docker DNS name so that a connection can be made to the NATS server.

#### Using IAM role (only works in EC2 instance)
1. ```npm run stan:up```
2. ```docker build -t cmr-subscriber-test .```
3. ```docker run --network host cmr-subscriber-test npm run start:dev```

#### Using AWS secret key pair (works anywhere)
1. ```npm run stan:up```
2. ```docker build -t cmr-subscriber-test .```
3. ```docker run --network host -e AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID> -e AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY> cmr-subscriber-test npm run start:dev```

#### Using AWS profile (works where AWS profile is set up)
1. ```npm run stan:up```
2. ```docker build -t cmr-subscriber-test .```
3. ```docker run --network host -e AWS_PROFILE=<AWS_PROFILE> cmr-subscriber-test npm run start:dev```

### npm

After starting an exposed NATS Streaming Server in some way (`npm run stan:up` is one such way), run `npm run start:dev` to start the application for development.

### Routes

`src/server/index.ts` contains routes that are added when the server is run in a non-production `NODE_ENV`. These routes generally might be helpful for one of two reasons:

1. mirror [CMR's Search API](https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html) for UMM-C and UMM-Var
1. manually mock messages from mEditor
