## Deployment

### Instructions on Deployment
1. Copy the ```example-env.json``` file to ```env.json``` file
    ```
    cp example-env.json env.json
    ```
2. Populate the contents of env.json with relevant values, such as the AWS profile that you are using according to your environment (i.e. sandbox, sit, and uat) and the region.
3. Run the following command, substituting ```<environment>``` with either sandbox, sit, or uat:
    ```
    python3 deploy.py <environment>
    ```

### Instructions on Deleting Stack
1. With the same env.json as when you did the deployment, run the following command, substituting ```<environment>``` with sandbox, sit, or uat:
    ```
    python3 delete_stacks.py <environment>
    ```

### Next Steps: Manual docker-compose deployment
The output of the deployment will give instructions for how to set up docker swarm and deploy docker-compose.production.yml

### Avoiding Excessive NASD requests
In order to access the mEditor instance from outside of VPC,
a NASD request is required to attach the mEditor load balancer
DNS to a cloudfront. Anytime the load balancer is deployed, it
will be rebuilt and reassigned a new id. To combat excessive
NASD requests, avoid deleting any mEditor load balancer attached
to a cloudfront at all costs. If the load balancer removal is
necessary, remove the prevent_destroy lifecycle policy from elb.tf before running python3 delete_stacks.py <environment>