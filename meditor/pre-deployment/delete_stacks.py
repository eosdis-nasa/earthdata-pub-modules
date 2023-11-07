from envbash import load_envbash
import os
import boto3
import json
import sys
from sys import argv
from os.path import exists
from json import loads, JSONDecodeError
from python_terraform import *

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
    "aws_region": env_vars["REGION"],
    "profile": env_vars["AWS_PROFILE"]
}
def terraform_destroy(json_variables):
    kwargs = {"auto-approve": True, "capture_output": False, "vars": json_variables}
    tf = Terraform()
    tf.destroy(**kwargs)

terraform_destroy(variables)
