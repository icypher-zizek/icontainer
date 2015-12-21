/**
 * UserService.js
 */
var Service=require('../Service');

/**
 * BlogService constructor
 * @param pDatasource	the data source
 */
var UserService=function(pDatasource) {
	this.parent=Service;
	this.parent(pDatasource);
};
UserService.prototype=new Service();

/**
 * Gets a user by id
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
UserService.prototype.getById=function(pParams, pCallback) {
	throw new Error('UserService.getById(): Not yet implemented');
};

/**
 * Authenticates a user via username and password
 * @param pUsername	the user name
 * @param pPassword	the password
 * @param pCallback	the callback to invoke on completion
 */
UserService.prototype.authenticate=function(pUsername, pPassword, pCallback) {
	throw new Error('UserService.authenticate(): Not yet implemented');
};

module.exports=UserService;