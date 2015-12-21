/**
 * User.js
 * @author edwin.afuba
 */
var Utils=require('../utils/common/Utils');

/**
 * Constructor
 * @param pParams	the parameter object or array
 */
var User=function(pParams) {
	this.username='';
	this.password='';
	this.name='';
	this.setContent(pParams)
};

/**
 * Set the text content
 * @param pParams	the parameter object or array
 */
User.prototype.setContent=function(pParams) {
	if(pParams) {
		this.username=pParams.username || this.username;
		this.password=pParams.password || this.password;
		this.name=pParams.name || this.name;
	}
};

module.exports=User;