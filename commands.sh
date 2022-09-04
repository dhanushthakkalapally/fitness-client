# Command to create new stack
aws cloudformation create-stack --stack-name fitness-client-stack-2 --template-body file://template.yml --parameters ParameterKey=DomainName,ParameterValue=turtleturtlerun.com ParameterKey=HostedZoneId,ParameterValue=Z103071716DHVJO96ULFQ  --capabilities CAPABILITY_NAMED_IAM

aws cloudformation update-stack --stack-name fitness-client-stack-2 --template-body file://template.yml --parameters ParameterKey=DomainName,ParameterValue=turtleturtlerun.com ParameterKey=HostedZoneId,ParameterValue=Z103071716DHVJO96ULFQ  --capabilities CAPABILITY_NAMED_IAM
