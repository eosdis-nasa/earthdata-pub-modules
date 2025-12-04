const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

async function pushMetadataToDaac(metadata, daacId, submissionId) {
  console.log('Uploading metadata to ORNL S3...');

  const bucket = process.env.ORNL_BUCKET;
  if (!bucket) {
    throw new Error("Missing environment variable ORNL_BUCKET_NAME");
  }

  // Add EDPub attributes
  metadata.AdditionalAttributes.push({
    Name: "edpub_request_id",
    Description: "Request ID from EDPub",
    DataType: "STRING",
    Value: submissionId
  });

  metadata.AdditionalAttributes.push({
    Name: "FormType",
    Description: "Integer indicating to which form these responses refer",
    DataType: "INT",
    Value: !metadata.CollectionCitations ? 1 : 2
  });

  const s3 = new S3Client();

  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();

  const dateStamp = `${month}-${day}-${year}`;
  const key = `${submissionId}-${dateStamp}.json`;

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: JSON.stringify(metadata),
        ContentType: 'application/json'
      })
    );

    console.log(`Uploaded metadata to s3://${bucket}/${key}`);
    return 's3 upload success';

  } catch (err) {
    const msg = `ORNL S3 upload failed: ${err}`;
    console.error(msg);
    throw new Error(msg);
  }
}

async function execute({ submission }) {
  return pushMetadataToDaac(
    submission.metadata,
    submission.daac_id,
    submission.id
  );
}

module.exports.execute = execute;