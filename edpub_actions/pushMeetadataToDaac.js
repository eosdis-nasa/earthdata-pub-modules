
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function getSecretsValues(){
    const secretClient = new SecretsManagerClient();
  const secretCmd = new GetSecretValueCommand({ SecretId: 'ornl_endpoint' });
  return secretClient.send(secretCmd);
}

async function pushMetadataToDaac(metadata, daacId, submissionId){
    const secretsResponse = await getSecretsValues();
    const endpointCreds = JSON.parse(secretsResponse.SecretString);
    const url = `https://${endpointCreds.ornl_endpoint_url}/${endpointCreds.ornl_endpoint_access_token}`;
    metadata.AdditionalAttributes.push({
        Name: "edpub_request_id",
        Description: "Request ID from EDPub",
        DataType: "STRING",
        Value: submissionId
    })
    metadata.AdditionalAttributes.push({
        Name: "FormType",
        Description: "Integer indicating to which form these responses refer",
        DataType: "INT",
        Value: !metadata.CollectionCitations ? 1 : 2
    })
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...metadata}),
        });
        const responseJson = await response.json();
        if(responseJson.status === 'Import Successful'){
        }
    }catch(err){
        return 'endpoint failed';
    }
}

async function execute({submission}) {
  const resp = await pushMetadataToDaac(submission.metadata, submission.daac_id, submission.id);
}

module.exports.execute = execute;