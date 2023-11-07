# Database EBS volumes
resource "aws_ebs_volume" "database" {
  availability_zone = "${var.aws_region}a"
  size              = 40
  tags = {
    Name = "meditor_database"
  }
}

# Nats EBS volumes
resource "aws_ebs_volume" "nats" {
  availability_zone = "${var.aws_region}a"
  size              = 40
  tags = {
    Name = "meditor_nats"
  }
}

# Database Volume attachments
resource "aws_volume_attachment" "database_attachment" {
  device_name = "/dev/xvdc"
  volume_id   = aws_ebs_volume.database.id
  instance_id = aws_instance.master.id
  force_detach = true
}

# Nats Volume attachments
resource "aws_volume_attachment" "nats_attachment" {
  device_name = "/dev/xvdc"
  volume_id   = aws_ebs_volume.nats.id
  instance_id = aws_instance.worker1.id
  force_detach = true
}
