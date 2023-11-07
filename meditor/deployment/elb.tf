# Create a new load balancer
resource "aws_elb" "meditor-elb" {
  name               = "meditor-elb"
  subnets = [var.subnet_id[var.environment]]
  security_groups = [aws_security_group.sgswarm.id]
  internal = var.internal

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 20
    target              = "TCP:8000"
    interval            = 30
  }

  instances                   = [aws_instance.master.id]
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400

  tags = {
    Name = "foobar-terraform-elb"
  }
  depends_on = [
    aws_instance.master,
    aws_instance.worker1,
    aws_instance.worker2
  ]
  lifecycle {
    prevent_destroy = true
  }
}