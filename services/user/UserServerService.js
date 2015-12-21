/**
 * UserServerService.js
 */
var Async=require('async');
var UserService=require('./UserService');
var UserDao=require('../../server/dao/DaoProvider').UserDao;


/**
 * UserServerService constructor
 * @param pDataSource	the datasource
 */
var UserServerService=function(pDataSource) {
	this.parent=UserService
	this.parent(pDataSource);
	this.userDao=null;
	if(this.datasource && this.datasource.getDaoParams) {
		this.userDao=new UserDao(this.datasource.getDaoParams('user'));
	} else {
		console.log('Daos could not be created: ',pDataSource);
	}
};
UserServerService.prototype=new UserService();

/**
 * Get User by id
 * @param pParams	the request parameters
 * @param pCallback	the callback to invoke on completion
 */
UserServerService.prototype.getById=function(pParams, pCallback) {
	//console.log('UserServerService.getById', pParams);
	this.userDao.getById(pParams, pCallback);
};

/**
 * Authenticates a user via username and password
 * @param pUsername	the user name
 * @param pPassword	the password
 * @param pCallback	the callback to invoke on completion
 */
UserServerService.prototype.authenticate=function(pUsername, pPassword, pCallback) {
	//console.log('UserServerService.authenticate', pUsername, pPassword);
	this.userDao.getByUserNameAndPassword(pUsername, pPassword, function(err, user) {
		if(err) { err={message: 'Incorrect username or password'}; }
		pCallback && pCallback(err, user);
	});
};

module.exports=UserServerService;