# Command to create new stack
aws cloudformation create-stack 
    --stack-name fitness-client-stack-2
    --template-body file://template.yml
    --capabilities CAPABILITY_NAMED_IAM

aws cloudformation update-stack
  --stack-name fitness-client-stack-2
  --template-body file://template.yml
  --capabilities CAPABILITY_NAMED_IAMI
