const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const keys = require('../config/keys');

class Mailer extends helper.Mail{
    
    constructor({subject,recipients},content){
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('abc@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html',content);
    this.recipients = this.formatAddresses(recipients);
    //console.log("Recipients:"+this.recipients);
    this.addContent(this.body);
    this.addTrackingSettings();
}

formatAddresses(recipients){

    return recipients.map(({email})=>{
    //console.log("Email:"email);//This is working
    return new helper.Email(email);
    });
      
}

addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true,true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
    this.addRecipients();
}


addRecipients(){
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient=>{
        personalize.addTo(recipient);
    })
}

async send(){
    const request = this.sgApi.emptyRequest({
        method:'POST',
        path:'/v3/mail/send',
        body:this.toJSON()

    })
    const response =this.sgApi.API(request);
    return response;

}
}

module.exports = Mailer;