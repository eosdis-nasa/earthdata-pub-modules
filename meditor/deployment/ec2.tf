resource "aws_instance" "master" {
  tags = {Name = "Swarm Master"}
  ami = var.ami[var.environment]
  instance_type = "t2.medium"
  user_data = "${file("config/node1_install.sh")}"
  vpc_security_group_ids = ["${aws_security_group.sgswarm.id}"]
  subnet_id = var.subnet_id[var.environment]
  iam_instance_profile = aws_iam_role.ec2-role.name
  root_block_device {
    volume_size = 30
  }
  depends_on = [
    aws_iam_role.ec2-role,
    aws_s3_bucket_object.file1
  ]
}
resource "aws_instance" "worker1" {
  tags = {Name = "Swarm Worker 1"}
  ami = var.ami[var.environment]
  instance_type = "t2.medium"
  user_data = "${file("config/node2_install.sh")}"
  vpc_security_group_ids = ["${aws_security_group.sgswarm.id}"]
  subnet_id = var.subnet_id[var.environment]
  iam_instance_profile = aws_iam_role.ec2-role.name
  root_block_device {
    volume_size = 20
  }
  depends_on = [
    aws_iam_role.ec2-role,
    aws_s3_bucket_object.file1
  ]
}

resource "aws_instance" "worker2" {
  tags = {Name = "Swarm Worker 2"}
  ami = var.ami[var.environment]
  instance_type = "t2.medium"
  user_data = "${file("config/node3_install.sh")}"
  vpc_security_group_ids = ["${aws_security_group.sgswarm.id}"]
  subnet_id = var.subnet_id[var.environment]
  iam_instance_profile = aws_iam_role.ec2-role.name
  root_block_device {
    volume_size = 20
  }
  depends_on = [
    aws_iam_role.ec2-role,
    aws_s3_bucket_object.file1
  ]
}