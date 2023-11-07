## Pre-deployment
The pre-deployment scripts deploy the ECRs for where the 
mEditor docker images are stored.

### Instructions on Deployment
#### Repository Deployment
1. Copy the ```example-env.json``` file to ```env.json``` file
    ```
    cp example-env.json env.json
    ```
2. Populate the contents of env.json with relevant values, such as the AWS profile that you are using according to your environment (i.e. sandbox, sit, and uat) and the region.
3. Run the following command, substituting ```<environment>``` with either sandbox, sit, or uat:
    ```
    python3 deploy.py <environment>
    ```
#### Image Deployment
4. The output should show a JSON string, and this is the recommended values of the images.json input file in autopush-docker-edpub. Copy that value, and substitute the contents of autopush-docker-edpub/images.json with the values copied over.
5. Alter ```lower_repository``` and ```lower_repository_login_command``` respectively with the baseline repository that you are trying to pull from, and with the login command associated with that account. By default, this is pointing to the SIT repository.
6. The recommended repository values may have blank tags, which default to "latest." However, we currently do not support the "latest" tag, so these will have to be version values such as the following:
    ```
    {
        "lower_repository": "050629596886.dkr.ecr.us-west-2.amazonaws.com",
        "upper_repository": "110456675280.dkr.ecr.us-west-2.amazonaws.com",
        "lower_repository_login_command": "aws ecr get-login-password --region us-east-1 --profile edpub-sit-developer | docker login --username AWS --password-stdin 050629596886.dkr.ecr.us-west-2.amazonaws.com",
        "upper_repository_login_command": "aws ecr get-login-password --region us-west-2 --profile edpub-uat-developer | docker login --username AWS --password-stdin 110456675280.dkr.ecr.us-west-2.amazonaws.com",
        "images": {
            "certified/mongo": "4.1.4",
            "cmr/cmr-meditor-subscriber": "0.20.0",
            "edpub/edpub-overview-subscriber": "0.0.0",
            "meditor/meditor_notifier": "0.37.0",
            "meditor/meditor_proxy": "0.34.0",
            "meditor/meditor_server": "0.62.0",
            "meditor/meditor_ui": "0.70.0",
            "meditor/meditor_docs": "0.0.0",
            "nats-streaming": "0.15.1",
            "portainer/portainer": "1.20.0",
            "portainer/agent": "1.1.2"
        }
    }
    ```
6. Run the generatetemplate.py script using the following command:
    ```
    python3 generatetemplate.py
    ```

### Instructions on Deleting Stack
1. With the same env.json as when you did the deployment, run the following command, substituting ```<environment>``` with sandbox, sit, or uat:
    ```
    python3 delete_stacks.py <environment>
    ```