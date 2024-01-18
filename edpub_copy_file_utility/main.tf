locals {
  zip_path = "./dist/src.zip"
}

data "aws_iam_policy_document" "assume_lambda_role" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "edpub_copy_utility_role" {
  name        = "${var.prefix}-edpub-copy-utility-role"
  description = "IAM role used for EDPub copy utility"

  assume_role_policy = data.aws_iam_policy_document.assume_lambda_role.json

  tags = {
    prefix      = var.prefix
    description = "IAM role used for EDPub copy utility"
  }
}

data "aws_iam_policy_document" "edpub_copy_utility_policy_document" {
  # Because this is a generalized template, no explicity path is defined here;
  # however, DAACs may wish to limit this themselves when deploying.
  statement {
    effect = "Allow"
    actions = [
      "s3:*"
    ]
    resources = [
      "arn:aws:s3:::${var.daac_bucket}",
      "arn:aws:s3:::${var.daac_bucket}/*",
    ]
  }

  # While this statement appears to allow access to entire bucket, access is limited
  # on EDPub side of things to DAAC specific prefix.
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:ListBucket"
    ]
    resources = [
      "arn:aws:s3:::${var.edpub_bucket}",
      "arn:aws:s3:::${var.edpub_bucket}/*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "logs:PutLogEvents",
      "logs:DescribeLogStreams",
      "logs:CreateLogStream",
      "logs:CreateLogGroup"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "edpub_copy_utility_role_policy" {
  name   = "${var.prefix}-edpub_copy_utility_role_policy"
  role   = aws_iam_role.edpub_copy_utility_role.id
  policy = data.aws_iam_policy_document.edpub_copy_utility_policy_document.json
}

resource "aws_lambda_function" "edpub_copy_file_utility" {
  filename         = local.zip_path
  function_name    = "${var.prefix}-edpub_copy_file_utility"
  role             = aws_iam_role.edpub_copy_utility_role.arn
  handler          = "index.handler"
  source_code_hash = filemd5(local.zip_path)
  runtime          = "nodejs18.x"
  timeout          = 60

  environment {
    variables = {
      EDPUB_BUCKET = var.edpub_bucket
      DAAC_BUCKET  = var.daac_bucket
      REGION       = var.region
      DAAC_PREFIX  = var.daac_prefix_in_edpub
    }
  }
}

resource "aws_lambda_permission" "allow_s3_object_trigger" {
  count          = var.enable_s3_trigger ? 1 : 0
  statement_id   = "AllowExecutionFromEDPubS3Trigger"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.edpub_copy_file_utility.function_name
  principal      = "s3.amazonaws.com"
  source_arn     = "arn:aws:s3:::${var.edpub_bucket}"
  source_account = var.edpub_account_id
}

resource "aws_cloudwatch_event_rule" "edpub_copy_file_utility_cron" {
  count               = var.enable_s3_trigger ? 0 : 1
  name                = "${var.prefix}-edpub_copy_file_utility_cron"
  description         = "Cloudwatch event to trigger EDPub copy file utility lambda to initiate scan process at specified frequency."
  schedule_expression = var.scan_cron_value
}

resource "aws_cloudwatch_event_target" "scan_edpub_copy_file_utility" {
  count     = var.enable_s3_trigger ? 0 : 1
  rule      = "${aws_cloudwatch_event_rule.edpub_copy_file_utility_cron[0].name}"
  target_id = "lambda"
  arn       = "${aws_lambda_function.edpub_copy_file_utility.arn}"
  input     = "{}"
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_edpub_copy_file_utility_lambda" {
  count         = var.enable_s3_trigger ? 0 : 1
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.edpub_copy_file_utility.function_name
  principal     = "events.amazonaws.com"
  source_arn    = "${aws_cloudwatch_event_rule.edpub_copy_file_utility_cron[0].arn}"
}
