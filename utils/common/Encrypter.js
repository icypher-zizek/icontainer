/**
 * @jsx React.DOM
 */
 
 // Nodejs encryption with CTR
var crypto = require('crypto'),
	algorithm = 'aes-256-ctr',
	password = 'd6F3Efeq';
 
var Encrypter={
	encrypt: function (text) {
		//console.log('Encrypting: ', text);
		var cipher = crypto.createCipher(algorithm,password)
		var crypted = cipher.update(text,'utf8','hex')
		crypted += cipher.final('hex');
		return crypted;
	},
	decrypt: function (text) {
		//console.log('Decrypting: ', text);
		var decipher = crypto.createDecipher(algorithm,password)
		var dec = decipher.update(text,'hex','utf8')
		dec += decipher.final('utf8');
		return dec;
	} 
};

module.exports=Encrypter;