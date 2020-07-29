var AWS = require("aws-sdk"); 

const options = (process.env.APP_ENVIRONMENT == 'localhost') ? {
  endpoint: "http://127.0.0.1:4002",
  region: "us-east-1",
}:null;

var sns = new AWS.SNS(options);

module.exports.publishToSnS = (data,topic) =>{
  return new Promise((resolve, reject) => {
    sns.publish({
      Message:JSON.stringify(data),
      TopicArn: topic,
    }, (err,result) => {
      if (err) {
        reject(err);    
      } else {
        console.log(`Message successfully send - Message Id - ${result.MessageId}`);
        resolve(`Message successfully send - Message Id - ${result.MessageId}`);
      }
    })
  });
}
