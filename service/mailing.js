const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

module.exports = {
    sendMail: async(options) => {
        try{
            const transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: `${process.env.MAILTRAP_PORT}`,
                auth: {
                    user: `${process.env.MAILTRAP_USERNAME}`,
                    pass: `${process.env.MAILTRAP_PASSWORD}`
                }
            });
            
            return await transporter.sendMail(options);
    
        }catch(err){
            throw new Error(err);
        };
    },

    buildMailTemplate: (data) => {
        if(data.template === undefined){
            throw new Error('Filename not provided!');
        }else{
            const source = fs.readFileSync(path.join(__dirname, `../mail/${data.template}`), 'utf8');
            const template = Handlebars.compile(source);
            const content = data;
            console.log(content);
            const mailOptions = {
                from: 'skywalker@galaxy.com',
                to: data.email,
                subject: data.subject,
                html: template({content})
            };
    
            return mailOptions;
        }
       
    },
}