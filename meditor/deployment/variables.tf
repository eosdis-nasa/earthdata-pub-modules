# TODO- Update these values so that they are not hardcoded and require manual updating

variable "profile" {
  description = "AWS profile to deploy swarm cluster"
  default = "meditor-sit"
}
variable "aws_region" {
  description = "AWS region on which we will setup the swarm cluster"
  type = string
  default = "us-west-2"
}
variable "environment" {
    description = "Environment, can be sit, uat, or production"
    type = string
    default = "sit"
}
variable "vpc_id" {
    description = "VPC ID to use on all instances corresponding to the environment variable"
    type = map(string)
    default = {
        sandbox = "vpc-0a6566cf7a25ab38e"
        sit = "vpc-0a66d8dd42e05a25a"
        uat = "vpc-005d4c376e6cedf83"
        prod = "vpc-065a667024473b312"
    }
}
variable "subnet_id" {
    description = "Subnet ID to use for all instances corresponding to the environment variable"
    type = map(string)
    default = {
        sandbox = "subnet-04be208d6a441ee8f"
        sit = "subnet-00ae04736edf92f3a"
        uat = "subnet-0b7616612be39071e"
        prod = "subnet-049450166540084ee"
    }
}
variable "internal" {
    description = "If true, ELB will be an internal ELB. Otherwise, the ELB will be internet facing."
    default = true
}
variable "cidr_block" {
    description = "CIDR block where EC2 instances are going to be found corresponding to the environment variable"
    type = map(string)
    default = {
        sandbox = "10.11.0.0/22"
        sit = "10.11.32.0/22"
        uat = "10.13.0.0/22"
        prod = "10.13.224.0/22"
    }
}
variable "ami" {
    description = "Amazon Linux AMI corresponding to the environment variable"
    type = map(string)
    default = {
        sandbox = "ami-0e30d61d0588a6d08"
        sit = "ami-003c8d52c7bb080fb"
        uat = "ami-003c8d52c7bb080fb"
        prod = "ami-003c8d52c7bb080fb"
    }
}
variable "instance_type" {
  description = "Instance type"
  default = "t2.medium"
}

variable "policies_arns" {
    description = "Policies for IAM for EC2 Role"
    type = map(map(string))
    default = {
        sandbox = {
            NGAPShRoleBoundary = "arn:aws:iam::252549204803:policy/NGAPShRoleBoundary"
            NGAPShInstanceDefaultRole = "arn:aws:iam::252549204803:role/ngap/system/NGAPShInstanceDefaultRole"
            NGAPProtAppInstanceMinimalPolicy = "arn:aws:iam::252549204803:policy/NGAPProtAppInstanceMinimalPolicy"
            NGAPProtEC2S3Interaction = "arn:aws:iam::252549204803:policy/ngap/system/NGAPProtEC2S3Interaction"
        }
        sit = {
            NGAPShRoleBoundary = "arn:aws:iam::050629596886:policy/NGAPShRoleBoundary"
            NGAPShInstanceDefaultRole = "arn:aws:iam::050629596886:role/ngap/system/NGAPShInstanceDefaultRole"
            NGAPProtAppInstanceMinimalPolicy = "arn:aws:iam::050629596886:policy/NGAPProtAppInstanceMinimalPolicy"
            NGAPProtEC2S3Interaction = "arn:aws:iam::050629596886:policy/ngap/system/NGAPProtEC2S3Interaction"
        }
        uat = {
            NGAPShRoleBoundary = "arn:aws:iam::110456675280:policy/NGAPShRoleBoundary"
            NGAPShInstanceDefaultRole = "arn:aws:iam::110456675280:role/ngap/system/NGAPShInstanceDefaultRole"
            NGAPProtAppInstanceMinimalPolicy = "arn:aws:iam::110456675280:policy/NGAPProtAppInstanceMinimalPolicy"
            NGAPProtEC2S3Interaction = "arn:aws:iam::110456675280:policy/ngap/system/NGAPProtEC2S3Interaction"
        }
        prod = {
            NGAPShRoleBoundary = "arn:aws:iam::680198697565:policy/NGAPShRoleBoundary"
            NGAPShInstanceDefaultRole = "arn:aws:iam::680198697565:role/ngap/system/NGAPShInstanceDefaultRole"
            NGAPProtAppInstanceMinimalPolicy = "arn:aws:iam::680198697565:policy/NGAPProtAppInstanceMinimalPolicy"
            NGAPProtEC2S3Interaction = "arn:aws:iam::680198697565:policy/ngap/system/NGAPProtEC2S3Interaction"
        }
    }
}