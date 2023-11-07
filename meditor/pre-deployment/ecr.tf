resource "aws_ecr_repository" "mongo" {
  name                 = "certified/mongo"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "cmr-meditor-subscriber" {
  name                 = "cmr/cmr-meditor-subscriber"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "meditor_subscriber" {
  name                 = "edpub/meditor_subscriber"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "meditor_notifier" {
  name                 = "meditor/meditor_notifier"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "meditor_proxy" {
  name                 = "meditor/meditor_proxy"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "meditor_server" {
  name                 = "meditor/meditor_server"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "meditor_ui" {
  name                 = "meditor/meditor_ui"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "meditor_docs" {
  name                 = "meditor/meditor_docs"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "nats-streaming" {
  name                 = "nats-streaming"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "agent" {
  name                 = "portainer/agent"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "portainer" {
  name                 = "portainer/portainer"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "edpub-overview-subscriber" {
  name                 = "edpub/edpub-overview-subscriber"

  image_scanning_configuration {
    scan_on_push = true
  }
}
