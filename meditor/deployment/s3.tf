resource "aws_s3_bucket" "meditor_bucket" {
    bucket = "${var.environment}-meditorbucket"
    acl = "private"
}
resource "aws_s3_bucket_object" "file1" {
    bucket = "${var.environment}-meditorbucket"
    key = "docker-compose.production.yml"
    source = "config/docker-compose.production.yml"
    depends_on = [
        aws_s3_bucket.meditor_bucket,
    ]
}

# resource "aws_s3_bucket_object" "file2" {
#     bucket = var.meditorbucket[var.environment]
#     key = "docker-deploy.py"
#     source = "docker-deploy.py"
#     depends_on = [
#         aws_s3_bucket.meditor_bucket,
#     ]
# }