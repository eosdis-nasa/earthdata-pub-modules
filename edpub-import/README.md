# EDPub-Import

Flask based API endpoint to allow EDPub to automatically send metadata to SAuS.

## Build

Local development can be done using docker-compose:
`docker-compose up`

This builds both the flask app docker and a separate db docker for testing.

## Usage

The following message along with a the compressed example folder should be sent to API users.

The API endpoint for edpub-import is currently available on <hostname>. The endpoint will accept UMM-C metadata sent as a POST to the following URL:

    http://<hostname>:5009/edpub-import/<api-key>

The following uuid will be used as your api-key:

    276275AF-F71B-49A2-820F-3753B9697B46

Upon a successful submission the endpoint will return JSON containing your import status (success/fail), supplied uuid, and timestamp.

Example:

    {"status":"Import Successful","timestamp":1701794248451,"uuid":"276275AF-F71B-49A2-820F-3753B9697B46"}

An example Python script to upload metadata is also attached.

### Configuration

Default configuration is included in the `/config` folder.

- DBCON.py - db connection info
- edpub-import-logging.ini - configure logging
- edpub-config.ini - uuid white list and future configuration options

### Generating UUIDs

New keys can be generated using `uuidgen` from command line on linux/mac.

New keys will need to be appended to the edpub-config.ini file under the `[uuid_list]` section. Entries are in the format of a key = value pair. Keys should be chosen to identify the user that they are issued to.

## Testing

Scripts to test the API are included in the `scripts` folder.

The test.py script can be used to send a POST to the API for testing:

    python ./scripts/test.py <hostname>

Note: "InsecureRequestWarning" is expected. This is due to the use of 'Verify=false' in the test script to facilitate https.

Example from dev:

    Bulbasaur:scripts i7j$ python3 ./test.py daacdocker1-dev
    /usr/local/lib/python3.10/site-packages/urllib3/connectionpool.py:1095: InsecureRequestWarning: Unverified HTTPS request is being made to host 'daacdocker1-dev'. Adding certificate verification is strongly advised. See: https://urllib3.readthedocs.io/en/latest/advanced-usage.html#tls-warnings
    warnings.warn(
    {'status': 'Import Failed', 'timestamp': 1694447934925, 'uuid': '276275AF-F71B-49A2-820F-3753B9697B46'}