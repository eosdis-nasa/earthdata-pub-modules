variable "access_key" {
  type = string
}
variable "secret_key" {
  type = string
}
variable "region" {
  type = string
}
variable "execution_role_arn" {
  type = string
}
variable "kayako_api_key" {
  type = string
}
variable "kayako_secret_key" {
  type = string
}
variable "kayako_hostname" {
  type = string
}
variable "kayako_salt_length" {
  type = string
}
variable "module_invoker_arn" {
  type = string
}
variable "security_group_ids" {
  type = list(string)
}
variable "subnet_ids" {
  type = list(string)
}
