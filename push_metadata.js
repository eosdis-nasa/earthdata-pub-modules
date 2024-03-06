const daacMap = {
    '15df4fda-ed0d-417f-9124-558fb5e5b561': {
        endpoint: process.env.ORNL_DAAC_ENDPOINT,
        authToken: process.env.ORNL_DAAC_AUTH_TOKEN
    }
};

async function pushMetadataToDaac(metadata, daacId){
    console.log(metadata)
    const url = `https://${daacMap[daacId].endpoint}/${daacMap[daacId].authToken}`;
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(metadata),
        });
        const responseJson = await response.json();
        if(responseJson.status === 'Import Successful'){
            return 'Metadata successfully';
        }
        console.log(response);
        console.log(responseJson);
        return 'Metadata failed';
    }catch(err){
        console.log(err);
        return 'endpoint failed';
    }
}

async function execute({submission}) {
    console.log(submission);
  const resp = await pushMetadataToDaac(submission.metadata, submission.daac_id);
  console.log(resp);
}

module.exports.execute = execute;