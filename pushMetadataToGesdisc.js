
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function getSecretsValues(){
    const secretClient = new SecretsManagerClient();
  const secretCmd = new GetSecretValueCommand({ SecretId: 'gesdisc_endpoint' });
  return secretClient.send(secretCmd);
}

async function pushMetadataToDaac(metadata){
    const secretsResponse = await getSecretsValues();
    const endpointCreds = JSON.parse(secretsResponse.SecretString);
    const url = `https://${endpointCreds.gesdisc_endpoint_url}/${endpointCreds.gesdisc_endpoint_access_token}`;
    metadata["ShortName"] = metadata.EntryTitle;
    metadata["Version"] = "1";
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(metadata),
        });
        if(response.status === 200){
            return 'success';
        }else{
            console.error(response)
            return 'endpoint failed';
        }
    }catch(err){
        console.error(err);
        return 'endpoint failed';
    }
}

async function execute({submission}) {
  const resp = await pushMetadataToDaac(submission.metadata);
  console.log(resp);
}

module.exports.execute = execute;