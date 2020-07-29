# PROJECT-AUGER

![Project-Auger](https://github.com/killallskywalker/project-auger/workflows/Project-Auger/badge.svg)

This repo contain simple API and function as a service which is trigger from sns message by using [Serverless Framework](https://www.serverless.com/framework/docs/providers/aws/guide/intro/) to  develop and deploy your AWS Lambda functions, along with the AWS infrastructure resources they require. 

## Feature
  - Send information to get quotation .
  - Receive an email about the quoation .
  
## Getting started 

To run serverless framework locally , it require sls offline and sns offline . Sns offline is require because we using sns to trigger a lambda function . Using  express js as backend and mongo as database . 

Clone this repo
Set env in config file , which is example file is provided .\ 
```npm install``` to install all required dependencies\
```npm run test``` to start test\
```npm run start``` to start locally

To seed data you just can run plan.js in the directory  ```node plan.js```

You can access it from ```localhost:3000/dev``` , you can customised the port use by using cli or set in yml
under custom options .
```
settings:
    dev:
     PORT: YOUR CUSTOM PORT NUMBER
```

## Application structures
```config``` env configuration will be set in here based on stage\
```controller``` contain endpoint logic\
```faas``` contain function as a service\ 
```helper``` contain helper such as publish message\
```mail``` contain email template\
```middleware``` contain all middleware that require for application\
```validation``` contain all validation for request \
```model``` contain all model\
```routes``` contain all routes\
```seeder``` contain seeders for dummy data\
```service``` contain service like email\ 
```tests``` contain test file\
```main.js``` main handler to wrap into lambda\

## Deployment
```sls deploy``` to deploy . If you already set stage in yml , it will take the stage set in yml as default stage or you can use to overwrite stage by using ```sls deploy --stage prod``` for production . 

## API documentation
[Documentation](https://documenter.getpostman.com/view/8054127/T1DsAw83?version=latest)




