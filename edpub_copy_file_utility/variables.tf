variable "prefix" {
  description = "Typically stack prefix used to identify resources deployed together"
  type        = string
}

variable "daac_bucket" {
  description = "DAAC bucket which files should be copied to."
  type        = string
}

variable "edpub_bucket" {
  description = "EDPub bucket which files are uploaded to by EDPub application."
  type        = string
}

variable "region" {
  description = "AWS region which lambda is deployed to. If differs from us-west-2, special attention will be necessary."
  type        = string
  default     = "us-west-2"
}

variable "enable_s3_trigger" {
  description = "Whether or not lambda should be invoked by s3 object trigger or cron."
  type        = bool
  default     = true
}

variable "edpub_account_id" {
  description = "Account ID for EDPub upload bucket. Required for allowing s3 object trigger. "
  type        = string
}

variable "daac_prefix_in_edpub" {
  description = "Prefix which DAAC is uploaded to within EDPub upload bucket."
  type        = string
}

variable "scan_cron_value" {
  description = "Cron value describing how often lambda should scan EDPub upload bucket."
  type        = string
  default     = "rate(1 day)"
}