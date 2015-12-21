/**
 * EmailSender.js
 */
var EmailSender=function() {};

/**
 * Creates a mail object
 * @param message	the message to use
 * @returns			the mail object
 */
EmailSender.prototype.buildMailObject=function(message) {
	//console.log('EmailSender.buildMailObject()',message);
	if(message==undefined||message==null) { throw new Error('Missing message'); }
	var mailObject={
		from:message.senderEmail,
		to:message.receiverEmail,
		subject:message.title,
		html:message.body,
	};
	return mailObject;
};


EmailSender.prototype.sendEmail = function(pMailObject, pSmtpServer, pCallback) {
	throw new Error('EmailSender.sendEmail() is not yet implemented!');
};

module.exports=EmailSender;