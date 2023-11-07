from envbash import load_envbash
import os
import boto3
import json
import sys
from python_terraform import *
import time
from jinja2 import Template
from os.path import exists
from json import loads, JSONDecodeError
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
    "environment": env_vars["ENVIRONMENT"],
    "profile": env_vars["AWS_PROFILE"],
    "aws_region": env_vars["REGION"]
}
print(variables)


# Special Variables for handling files
timeout_in_minutes=15

# Variables for dynamic configuration file creation
template_paths = ["templates/docker-compose.production.j2", "templates/node1_install.j2", "templates/node2_install.j2", "templates/node3_install.j2"]
node_install_paths = ["config/docker-compose.production.yml", "config/node1_install.sh", "config/node2_install.sh", "config/node3_install.sh"]
template_variables = {
    "ACCOUNT_NUMBER": env_vars["ACCOUNT_NUMBER"],
    "AGENT_VERSION": env_vars["IMAGE_VERSION"]["AGENT_VERSION"],
    "APP_URL": env_vars["IMAGE_VERSION"],
    "CMR_SUBSCRIBER_VERSION": env_vars["IMAGE_VERSION"]["CMR_SUBSCRIBER_VERSION"],
    "COGNITO_CLIENT_ID": env_vars["COGNITO_CLIENT_ID"],
    "COGNITO_CLIENT_DOMAIN": env_vars["COGNITO_CLIENT_DOMAIN"],
    "COGNITO_CLIENT_SECRET": env_vars["COGNITO_CLIENT_SECRET"],
    "COGNITO_INITIATE_AUTH_CLIENT_ID": env_vars["COGNITO_INITIATE_AUTH_CLIENT_ID"],
    "COGNITO_USER_POOL_ID": env_vars["COGNITO_USER_POOL_ID"],
    "NEW_USER_ROLES": env_vars["NEW_USER_ROLES"],
    "DATABASE_VERSION": env_vars["IMAGE_VERSION"]["DATABASE_VERSION"],
    "EDPUB_OVERVIEW_SUBSCRIBER_VERSION": env_vars["IMAGE_VERSION"]["EDPUB_OVERVIEW_SUBSCRIBER_VERSION"],
    "EDPUB_VERSION": env_vars["IMAGE_VERSION"]["EDPUB_VERSION"],
    "ENVIRONMENT": env,
    "MONITOR_VERSION": env_vars["IMAGE_VERSION"]["MONITOR_VERSION"],
    "NATS_VERSION": env_vars["IMAGE_VERSION"]["NATS_VERSION"],
    "NOTIFIER_VERSION": env_vars["IMAGE_VERSION"]["NOTIFIER_VERSION"],
    "PROXY_VERSION": env_vars["IMAGE_VERSION"]["PROXY_VERSION"],
    "REGION": env_vars["REGION"],
    "REGISTRY": env_vars["REGISTRY"],
    "SERVER_VERSION": env_vars["IMAGE_VERSION"]["SERVER_VERSION"],
    "UI_VERSION": env_vars["IMAGE_VERSION"]["UI_VERSION"],
    "DOCS_VERSION": env_vars["IMAGE_VERSION"]["DOCS_VERSION"],
}

def create_files_from_templates(template_path, final_path):
    with open(template_path) as f:
	    template = f.read()
    j2_template = Template(template)
    with open(final_path, "w") as f:
        f.write(j2_template.render(template_variables))

def terraform_apply(json_variables):
    kwargs = {"auto-approve": True, "capture_output": False, "vars": json_variables}
    os.system("terraform init")
    tf = Terraform()
    tf.apply(**kwargs)
    output = tf.output()
    return output # Just for the sake of testing and development

def main():
    for i in range(0, len(template_paths)):
        create_files_from_templates(template_paths[i], node_install_paths[i])
    output = terraform_apply(variables)
    master_id = output["master_id"]["value"]
    worker1_id = output["worker1_id"]["value"]
    worker2_id = output["worker2_id"]["value"]
    print()
    print("Manual steps: ")
    print("--------------")
    print("1. Log into your EC2 console in AWS.\n")
    print(f"2. Open Session Manager for the Master EC2 instance with ID {master_id}\n")
    print(f"3. Run the following command: \n \
        \t\tsudo docker swarm init\n")
    print(f"4. There should be an output from step 3 that shows the command to run on the worker nodes that looks something like \n \
        \t\tdocker swarm join --token <token> <ip-address-of-master>:2377. \n \
        Copy this command, and then paste this on the other worker EC2 instances: {worker1_id} and {worker2_id} as a sudo user\n")
    print(f"5. Go back to the master EC2 instance at {master_id}, and verify that you have access using the command: \n \
        \t\tsudo docker node ls \n \
        If you can see all three nodes, you have docker swarm set up properly\n")
    print(f"6. Run the following commands in order to make sure each node is labeled properly: \n \
        \t\tsudo docker node update --label-add database=primary <node-id-of-{master_id}> \n \
        \t\tsudo docker node update --label-add database=secondary <node-id-of-{worker1_id}>\n")
    print(f"7. Finally, deploy the docker-compose file with the following command: \n \
        \t\tsudo docker stack deploy --compose-file /root/docker-compose.production.yml meditor\n")

main()