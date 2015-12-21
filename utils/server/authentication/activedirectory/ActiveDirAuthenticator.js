/**
 * ActiveDirAuthenticator.js
 */
var ActiveDirectory=require('activedirectory');

/**
 * Constructor
 * @param config	the active directory config with the following structure:
 * 					{
 * 						url: 'ldap://dc.domain.com',
 * 						baseDN: 'dc=domain,dc=com',
 * 						username: 'username@domain.com',
 * 						password: 'password'
 * 					}
 */
var ActiveDirAuthenticator=function(config) {
	this.activeDirectory=null;
	if(config) {
		try {
			this.activeDirectory=new ActiveDirectory(config);
		} catch(e) {
			console.log('Active Dir Internal Object could not be created !', e);
		}
	}
};

/**
 * Authenticate 
 * @param pUsername		the user name
 * @param pPassword		the user password
 * @param pCallback		the callback to invoke on completion
 */
ActiveDirAuthenticator.prototype.authenticate=function(pUsername, pPassword, pCallback) {
	console.log('ActiveDirAuthenticator.authenticate()', pUsername, pPassword);
	this.activeDirectory && this.activeDirectory.authenticate(pUsername, pPassword, pCallback);
};

/**
 * Checks a user is a member of a group 
 * @param pUsername		the user name
 * @param pGroupName	the group name
 * @param pCallback		the callback to invoke on completion
 */
ActiveDirAuthenticator.prototype.isUserMemberOf=function(pUsername, pGroupName, pCallback) {
	console.log('ActiveDirAuthenticator.isUserMemberOf()', pUsername, pGroupName);
	this.activeDirectory && this.activeDirectory.isUserMemberOf(pUsername, pGroupName, pCallback);
};

/**
 * Checks if a group exists
 * @param pGroupName	the group name
 * @param pCallback		the callback to invoke on completion
 */
ActiveDirAuthenticator.prototype.groupExists=function(pGroupName, pCallback) {
	console.log('ActiveDirAuthenticator.groupExists()', pGroupName);
	this.activeDirectory && this.activeDirectory.groupExists(pGroupName, pCallback});
};

/**
 * Checks if a user exists
 * @param pUsername		the user name
 * @param pCallback		the callback to invoke on completion
 */
ActiveDirAuthenticator.prototype.userExists=function(pUsername, pCallback) {
	console.log('ActiveDirAuthenticator.userExists()', pUsername);
	this.activeDirectory && this.activeDirectory.userExists(pUsername, pCallback);
};

/**
 * Gets the users in a group
 * @param pGroupName	the group name
 * @param pCallback		the callback to invoke on completion
 */
ActiveDirAuthenticator.prototype.getUsersForGroup=function(pGroupName, pCallback) {
	console.log('ActiveDirAuthenticator.getUsersForGroup()', pGroupName);
	this.activeDirectory && this.activeDirectory.getUsersForGroup(pGroupName, pCallback});
};

module.exports=ActiveDirAuthenticator;
