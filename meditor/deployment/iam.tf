resource "aws_iam_role" "ec2-role" {
  name = "ec2-role"
  permissions_boundary = var.policies_arns[var.environment]["NGAPShRoleBoundary"]
  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    tag-key = "tag-value"
  }
}

resource "aws_iam_instance_profile" "ec2-role" {
  name = "ec2-role"
  role = aws_iam_role.ec2-role.name
}
resource "aws_iam_role_policy_attachment" "SecretsManagerReadWrite" {
  role       = aws_iam_role.ec2-role.name
  policy_arn = "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
}

resource "aws_iam_role_policy_attachment" "AmazonSSMManagedInstanceCore" {
  role       = aws_iam_role.ec2-role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}
resource "aws_iam_role_policy_attachment" "AmazonEC2ContainerServiceforEC2Role" {
  role       = aws_iam_role.ec2-role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_role_policy_attachment" "NGAPProtAppInstanceMinimalPolicy" {
  role       = aws_iam_role.ec2-role.name
  policy_arn = var.policies_arns[var.environment]["NGAPProtAppInstanceMinimalPolicy"]
}

resource "aws_iam_role_policy_attachment" "NGAPProtEC2S3Interaction" {
  role       = aws_iam_role.ec2-role.name
  policy_arn = var.policies_arns[var.environment]["NGAPProtEC2S3Interaction"]
}