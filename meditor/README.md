## mEditor Deployment Scripts
### Directory Explanation

Contains mEditor subscribers and deployment scripts.

mEditor subscribers are contained in the subscribers directory, there are currently two:

1. cmr-subscriber
   1. subscribes to the "Collection Metadata" model in mEditor and publishes UMM-C records to either CMR UAT or CMR PROD 
2. overview-subscriber
   1. subscribes to the "Overview Pages" model in mEditor and publishes to the Earthdata Pub overview website

mEditor deployment scripts are split up into two subdirectories.

1. pre-deployment
    * Scripts for deploying mEditor docker images
      * terraform scripts for creating ECR repositories
        * More details are outlined in pre-deployment/README.md
2. deployment
    * Scripts for deploying the rest of the resources
      * EC2 instances for docker manager and two workers
      * EBS Storage for NATS and database persistence
      * ELB to set up DNS with NGAP team
      * IAM with permissions necessary for EC2 to pull from S3
      * Security Group for EC2 instances
      * S3 buckets for docker-compose.production.yml file is stored
    * deployment/README.md contains instructions for remaining manual steps

### Instructions for Greenfield Deployment
1. Deploy ECR repositories ([pre-deployment/README.md](pre-deployment/README.md))
2. Deploy the EC2 instances ([deployment/README.md](deployment/README.md))
3. Do some of the remaining manual tasks ([deployment/README.md](deployment/README.md))

### Additional Fixes for the Future
* Default user for docker deployment is root
* Certain processes may be able to get dockerized
