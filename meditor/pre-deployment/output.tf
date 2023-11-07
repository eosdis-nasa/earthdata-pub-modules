# Output the list of repository URLs
output "mongo_url" {
    value = aws_ecr_repository.mongo.repository_url
}

output "cmr-meditor-subscriber_url" {
    value = aws_ecr_repository.cmr-meditor-subscriber.repository_url
}

output "meditor_subscriber_url" {
    value = aws_ecr_repository.meditor_subscriber.repository_url
}

output "meditor_notifier_url" {
    value = aws_ecr_repository.meditor_notifier.repository_url
}

output "meditor_proxy_url" {
    value = aws_ecr_repository.meditor_proxy.repository_url
}

output "meditor_server_url" {
    value = aws_ecr_repository.meditor_server.repository_url
}

output "meditor_ui_url" {
    value = aws_ecr_repository.meditor_ui.repository_url
}

output "meditor_docs_url" {
    value = aws_ecr_repository.meditor_docs.repository_url
}

output "nats-streaming_url" {
    value = aws_ecr_repository.nats-streaming.repository_url
}

output "agent_url" {
    value = aws_ecr_repository.agent.repository_url
}

output "portainer_url" {
    value = aws_ecr_repository.portainer.repository_url
}

# Account ID for the ECR login command reference
data "aws_caller_identity" "current" {}
output "account_id" {
  value = data.aws_caller_identity.current.account_id
}