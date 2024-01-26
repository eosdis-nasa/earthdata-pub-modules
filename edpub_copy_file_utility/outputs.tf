output "edpub_copy_file_utility_lambda_arn" {
  value = aws_lambda_function.edpub_copy_file_utility.arn
}

output "edpub_copy_file_utility_role_arn" {
  value = aws_iam_role.edpub_copy_utility_role.arn
}