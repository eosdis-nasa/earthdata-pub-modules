/* **********************************************
 * EDPub Copy File Utility
 *
 * Used to copy files from EDPub's DAAC Upload
 * Area to an DAAC's own account buckets.
 *
 * Limitations: This code uses the AWS SDK V3
 * CopyObjectCommand which can only copy up to
 * 5GB file sizes for the s3 object trigger
 * copy method; however, because EDPub also
 * restricts file upload to 5GB file sizes,
 * this is an understood and accepted
 * expectation. If your use case is outside
 * these constraints, you may consider using
 * UploadPartCopyCommand.
 *
 ********************************************* */

import { S3Client, CopyObjectCommand } from '@aws-sdk/client-s3';
import { S3SyncClient } from 's3-sync-client';

const uploadBucket = process.env.EDPUB_BUCKET;
const destinationBucket = process.env.DAAC_BUCKET;
const region = process.env.REGION;
const daacPrefix = process.env.DAAC_PREFIX;

const client = new S3Client({ region });
const { sync } = new S3SyncClient({ client });

async function scanEDPubCopy() {
  const sanitizedPrefix = daacPrefix.replace(/^\/?/, '').replace(/\/?$/, '');
  const edpubSource = `s3://${uploadBucket}/${sanitizedPrefix}/`;
  const daacDestination = `s3://${destinationBucket}/`;
  return sync(edpubSource, daacDestination, {
    relocations: [
      (currentPath) => (currentPath.startsWith(`${sanitizedPrefix}/`)
        ? currentPath.replace(`${sanitizedPrefix}/`, '')
        : currentPath),
    ],
  });
}

async function triggeredByEDPubCopy(event) {
  // There should only ever be 1 instance of Records for an s3 object trigger
  // event. As such anything more is considered an error.
  if (event.Records.length > 1) return Error('Event should only contain 1 record.');
  const sourceKey = event.Records[0].s3.object.key;
  // Strip EDPub prefix (/daac/<daac_shortname>/)from key
  const destinationKey = sourceKey.split('/').slice(2).join('/');
  const command = new CopyObjectCommand({
    CopySource: `${uploadBucket}/${sourceKey}`,
    Bucket: destinationBucket,
    Key: destinationKey,
  });
  return client.send(command);
}

async function handler(event) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event));
  return Object.keys(event).length > 0 ? triggeredByEDPubCopy(event) : scanEDPubCopy();
}

exports.handler = handler;
