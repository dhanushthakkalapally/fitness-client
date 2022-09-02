# Command to create new stack
aws cloudformation create-stack 
    --stack-name fitness-client-stack-2
    --template-body file://template.yml
    --capabilities CAPABILITY_NAMED_IAMI

aws cloudformation update-stack --stack-name fitness-client-stack-2 --template-body file://template.yml --parameters ParameterKey=MyIP,ParameterValue=82.9.11.7 --capabilities CAPABILITY_NAMED_IAM
