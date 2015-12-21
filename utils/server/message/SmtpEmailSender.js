/**
 * SmtpEmailSender.js
 */
var EmailSender=require('./EmailSender');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var SmtpEmailSender=function(pConfig) {
	this.parent=EmailSender;
	this.parent();
	this.config={
		host : '',
		port : 25,
		rejectUnauthorized : false
	};
	if(pConfig) {
		for(var key in pConfig) {
			if(this.config[key]!==undefined) {
				this.config[key]=pConfig[key];
			}
		}
	}
};
SmtpEmailSender.prototype=new EmailSender();

/**
 * Send email via SMTP Protocol
 */
SmtpEmailSender.prototype.sendEmail = function(pMailObject, pCallback) {
	console.log("MessageSender.sendEmail()", pMailObject);
	// Use Smtp Protocol to send Email
	var transport = nodemailer.createTransport(smtpTransport(this.config));
	transport.sendMail(pMailObject, function(error, serverResponse) {
		console.log('Send Result: ',error,serverResponse );
		pCallback && pCallback(error, serverResponse);
		transport.close();
	});
};

module.exports=SmtpEmailSender;