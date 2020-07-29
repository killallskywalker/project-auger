const Mail = require('../service/mailing');

module.exports.quotation = async (event, context, callback)=> {
    try {
        const data =JSON.parse(event.Records[0].Sns.Message);
        const options = Mail.buildMailTemplate(data);
        await Mail.sendMail(options)
        console.log('Success');
      }catch(error){  
          console.log(error);
      }
}


