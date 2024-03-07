const daacMap = {
    '15df4fda-ed0d-417f-9124-558fb5e5b561': {
        endpoint: process.env.ORNL_DAAC_ENDPOINT,
        authToken: process.env.ORNL_DAAC_AUTH_TOKEN
    }
};

async function pushMetadataToDaac(metadata, daacId, submissionId){
    const url = `https://${daacMap[daacId].endpoint}/${daacMap[daacId].authToken}`;
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
        Value: 2
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
            return 'Metadata successfully';
        }
        return 'Metadata failed';
    }catch(err){
        return 'endpoint failed';
    }
}

async function execute({submission}) {
  const resp = await pushMetadataToDaac(submission.metadata, submission.daac_id, submission.id);
  console.log(resp);
}

module.exports.execute = execute;