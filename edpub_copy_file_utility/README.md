# EDPub Copy File Utility
This terraform module is provided as a template for DAACs to use in combination with EDPub's DAAC upload capabilities in order to upload documents to EDPub and have those documents staged in DAAC internal buckets.

## Use Cases
* A DAAC wants a cloud based web interface for uploading documents to an internal staging bucket without the hassle of developing their own website.

## Features
* S3 object trigger on file upload copies file from EDPub upload bucket's DAAC prefix to DAAC internal staging bucket.
* DAAC copy file utility periodically scans EDPub upload bucket's DAAC prefix and copies created or updated files to DAAC internal staging bucket (similar to AWS CLI `sync` command).

## Getting Started

### Pre-requisites
The EDPub Copy File Utility uses the following Node and Terraform versions- also listed in .nvmrc and .terraform-version respectively:
```
Node: v18.14.1
Terraform: v0.13.6
```

### Where To Deploy
This module can be deployed to any environment; however, it should be deployed in the us-west-2 AWS region; otherwise, additional modifications to the lambda source may be necessary.

### How To Build
If you make any changes to the `src/index.js` file, you will need to rebuild the lambda package. To build the module, you will need to run the following commands:
```
npm install --include=dev
npm run build
npm run package
```
Running the above command will build the source and dependencies to a zip file which will be used for your deployment. 

### How To Deploy
To deploy, you will need to define the following variables in a .tfvars file:
```
# Required
prefix=""
daac_bucket=""
edpub_bucket=""
edpub_account_id=""
daac_prefix_in_edpub=""

# Optional - Defaults are define
region="us-west-2" // This can be changed; however, modifications to the lambda source may be necessary.
enable_s3_trigger=true // Change to false to utilize scan feature instead of s3 object trigger default.
scan_cron_value="rate(1 day)" // This AWS cron expression can be updated to any rate or cron value. This value is only utilized if enable_s3_trigger=false
```
The `edpub_bucket`, `edpub_account_id`, and `daac_prefix_in_edpub` variable values should be obtained from the EDPub development team.

After your .tfvars file is created and populated, you can run `terraform init` followed by `terraform apply --auto-approve` to deploy. If trying to deploy to an AWS account other than defined in your default profile, try `AWS_PROFILE=<profile_name> terraform apply`.

Once you have successfully deployed the module to your account, you should see output values for `edpub_copy_file_utility_lambda_arn` and `edpub_copy_file_utility_role_arn`. These are needed by the EDPub development team in order to then whitelist this lambda and iam role access to the EDPub upload bucket. 

After providing these values alongside whether you will be using the s3 object trigger or scan approach to the EDPub development team, they will then add those whitelists. They will then notify you and your copy file utility will be ready to test.

## Dependencies
[AWS CLI s3 sync for Node.js: 4.3.1](https://github.com/jeanbmar/s3-sync-client/tree/master)

[@aws-sdk/client-s3: ^3.377.0](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)

## Troubleshooting

```
I deployed the module and everything was working then I destroyed and redeployed the stack but now I'm getting AccessDenied errors.
```
When you destroy the resources the EDPub Development Team added for whitelisting, the policy on the EDPub side of things will become malformed. To resolve this, let the EDPub Development Team know that you have destroy and redeployed your resources and provide the updated lambda and iam role arn to the team.