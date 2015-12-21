/**
 * UserDao.js
 */
var UserDao=function() {};

/**
 * Fetch a user by their id
 * @param pId			the user id
 * @param pCallback		the callback to invoke on completion
 */
UserDao.prototype.getByUserId=function(pId, pCallback) {
	throw new Error('UserDao.getByUserId() not yet implemented');
};

/**
 * Fetch a user by their username and password
 * @param pUsername		the user name
 * @param pPassword		the password
 * @param pCallback		the callback to invoke on completion
 */
UserDao.prototype.getByUserNameAndPassword=function(pUsername, pPassword, pCallback) {
	throw new Error('UserDao.saveSliderData() not yet implemented');
};

module.exports=UserDao;
