import os
from python_terraform import *
import time
from os.path import exists
from json import loads, dumps, JSONDecodeError
from sys import argv

# Read in environment command line argument, if given
if len(argv) > 1:
    env = argv[1]
else:
    # Default to SIT
    env = 'sit'


# Obtain Environment variables
if not exists('env.json'):
    raise Exception('Missing env.json file.')
    # Read in environment
with open('env.json', 'r') as f:
    try:
        env_vars = loads(f.read())[env]
    except JSONDecodeError:
        raise Exception('Invalid JSON in env file.')
    except KeyError:
        raise Exception(f'Invalid environment or environment missing from env file: {env}')

variables = {
    "profile": env_vars["AWS_PROFILE"],
    "aws_region": env_vars["REGION"]
}

def terraform_apply(json_variables):
    kwargs = {"auto-approve": True, "capture_output": False, "vars": json_variables}
    os.system("terraform init")
    tf = Terraform()
    tf.apply(**kwargs)
    output = tf.output()
    return output 

def main():
    # Terraform Apply
    output = terraform_apply(variables)
    
    # Prepare output for recommended next steps
    account_id = output["account_id"]["value"]
    recommended_images_json = {
        "lower_repository": "050629596886.dkr.ecr.us-west-2.amazonaws.com",
        "upper_repository": f"{account_id}.dkr.ecr.{env_vars['REGION']}.amazonaws.com",
        "lower_repository_login_command": "aws ecr get-login-password --region us-west-2 --profile edpub-sit-developer | docker login --username AWS --password-stdin 050629596886.dkr.ecr.us-west-2.amazonaws.com",
        "upper_repository_login_command": f'aws ecr get-login-password --region {env_vars["REGION"]} --profile {env_vars["AWS_PROFILE"]} | docker login --username AWS --password-stdin {account_id}.dkr.ecr.{env_vars["REGION"]}.amazonaws.com',
        "images": {
            "certified/mongo": "",
            "cmr/cmr-meditor-subscriber": "",
            "meditor/meditor_notifier": "",
            "meditor/meditor_proxy": "",
            "meditor/meditor_server": "",
            "meditor/meditor_ui": "",
            "meditor/meditor_docs": "",
            "nats-streaming": "",
            "portainer/portainer": "",
            "portainer/agent": "",
            "edpub/edpub-overview-subscriber": ""
        }
    }
    time.sleep(2)
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("~~~   Your ECR deployment is complete.   ~~~")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print()
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("~~~  NOTE: IF THIS IS YOUR FIRST DEPLOY  ~~~")
    print("~~~  YOU MAY WANT TO PUSH DOCKER IMAGES  ~~~")
    print("~~~        TO YOUR ECR REPOSITORY.       ~~~")
    print("~~~  THE RECOMMENDED CONFIGURATION FILE  ~~~")
    print("~~~  TO USE FOR THE GENERATETEMPLATE.PY  ~~~")
    print("~~~               SCRIPTS                ~~~")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    time.sleep(2)
    print("> Please copy the following and place in images.json")
    print("> Insert desired image tags within each \"\" under the 'images' section")
    print()
    print(dumps(
        recommended_images_json,
        indent=4,
        separators=(',', ': ')
    ))
main()