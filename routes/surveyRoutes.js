const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/emailTemplate');

const Survey = mongoose.model('surveys');



module.exports=(app)=>{


app.post(
    '/api/survey',(req,res)=>{
        console.log(req.body);
        const{ title, subject, body,recipients } =req.body;
        
        const survey =new Survey({
            title,
            subject,
            body,
            recipients,
            recipients:recipients.split(',').map(email=>({email})),
            _user:req.user.id,
            dateSent:Date.now()
        });
        
        console.log(survey);//This is working(Recipients property is also fine)
        
        
           
        const mailer = new Mailer(survey,surveyTemplate(survey));
        mailer.send();

       
    }
);
}