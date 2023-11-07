resource "aws_security_group" "sgswarm" {
  name = "sgswarm"
  vpc_id      = var.vpc_id[var.environment]

  # Allow all inbound and outbound for SSH
  ingress {
    description = "SSH port for logging in from remote workstations"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all inbound for HTTP
  ingress {
    description = "HTTP port for accessing webpage from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # Allow all inbound for HTTPS
  ingress {
    description = "HTTPS port for accessing webpage from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Docker Swarm specific ports
  ingress {
    description = "Docker port 2376 - 2377"
    from_port   = 2376
    to_port     = 2377
    protocol    = "tcp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  ingress {
    description = "Docker port 2376 - 2377"
    from_port   = 2376
    to_port     = 2377
    protocol    = "udp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  egress {
    description = "Docker port 2376 - 2377"
    from_port   = 2376
    to_port     = 2377
    protocol    = "tcp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  egress {
    description = "Docker port 2376 - 2377"
    from_port   = 2376
    to_port     = 2377
    protocol    = "udp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  ingress {
    description = "Docker UDP port 4789"
    from_port   = 4789
    to_port     = 4789
    protocol    = "udp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  egress {
    description = "Docker UDP port 4789"
    from_port   = 4789
    to_port     = 4789
    protocol    = "udp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  ingress {
    description = "Docker UDP port 4789"
    from_port   = 7946
    to_port     = 7946
    protocol    = "tcp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  egress {
    description = "Docker UDP port 4789"
    from_port   = 7946
    to_port     = 7946
    protocol    = "tcp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  ingress {
    description = "Docker UDP port 4789"
    from_port   = 7946
    to_port     = 7946
    protocol    = "udp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }
  egress {
    description = "Docker UDP port 4789"
    from_port   = 7946
    to_port     = 7946
    protocol    = "udp"
    cidr_blocks = [var.cidr_block[var.environment]]
  }

  
  # Enable ICMP
  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = -1
    to_port = -1
    protocol = "all"
    cidr_blocks = ["0.0.0.0/0"]
  }
}