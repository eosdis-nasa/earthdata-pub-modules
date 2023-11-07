provider "aws" {
  region  = var.region
  access_key = var.access_key
  secret_key = var.secret_key
}

resource "aws_lambda_function" "kayako_module" {
  filename         = "../dist/package.zip"
  function_name    = "kayako_module"
  role             = var.execution_role_arn
  handler          = "kayako.handler"
  runtime          = "nodejs12.x"
  source_code_hash = filesha256("../dist/package.zip")
  timeout          = 10
  environment {
    variables = {
      APIKEY     = var.kayako_api_key
      SECRETKEY  = var.kayako_secret_key
      HOSTNAME   = var.kayako_hostname
      SALTLENGTH = var.kayako_salt_length
    }
  }
  vpc_config {
     subnet_ids         = var.subnet_ids
     security_group_ids = var.security_group_ids
  }
}

resource "aws_lambda_permission" "kayako_module" {
  statement_id  = "AllowExecutionFromLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.kayako_module.function_name
  principal     = "lambda.amazonaws.com"
  source_arn    = var.module_invoker_arn
}
