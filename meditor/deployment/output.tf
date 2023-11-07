output "master_id" {
  value = aws_instance.master.id
}
output "worker1_id" {
  value = aws_instance.worker1.id
}
output "worker2_id" {
  value = aws_instance.worker2.id
}