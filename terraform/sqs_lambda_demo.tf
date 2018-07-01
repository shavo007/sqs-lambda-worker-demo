provider "aws" {
  region     = "${var.region}"
}

resource "aws_sqs_queue" "lambda_queue" {
  name                      = "sqs-lambda-example-queue"
  delay_seconds             = 90
  max_message_size          = 2048
  message_retention_seconds = 86400
  receive_wait_time_seconds = 10
  # redrive_policy            = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.terraform_queue_deadletter.arn}\",\"maxReceiveCount\":4}"

  tags {
    Environment = "production"
  }
}
