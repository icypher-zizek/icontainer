/**
 * UserDaoJson.js
 * @author edwin.afuba
 */
var Async=require('async');
var crypto=require('crypto');
var UserDao=require('../api/UserDao');
var User=require('../../../models/User');
var FileUtils=require('../../../utils/common/FileUtils');

/**
 * The UserDaoJson Class
 * @param pFile the file object
 */
var UserDaoJson=function(pFile) {
	this.parent=UserDao;
	this.parent();
	this.file=(pFile || null);
};
UserDaoJson.prototype=new UserDao();

/**
 * Checks if file exits
 * @throws	exception if the file object is not set
 */
UserDaoJson.prototype.checkFile=function() {
	if(this.file==null) {
		throw new Error('Invalid file object');
	}
};/**
 * Fetch a user by their id
 * @param pId			the user id
 * @param pCallback		the callback to invoke on completion
 */
UserDaoJson.prototype.getByUserId=function(pId, pCallback) {
	try {
		if(!pId) { throw new Error('Missing Id'); }
		this.checkFile();
		FileUtils.loadJsonFile(this.file, function(err, data) {
			if(err) return (pCallback && pCallback(err));
			var user=null;
			if(pId-1<data.length) {
				user=new User(data[pId-1]);
			}
			pCallback && pCallback(err, user);
		});
	} catch (error) {
		pCallback && pCallback(error);
	}
};

/**
 * Fetch a user by their username and password
 * @param pUsername		the user name
 * @param pPassword		the password
 * @param pCallback		the callback to invoke on completion
 */
UserDaoJson.prototype.getByUserNameAndPassword=function(pUsername, pPassword, pCallback) {
	try {
		if(!pUsername) { throw new Error('Missing User Name'); }
		if(!pPassword) { throw new Error('Missing Password'); }
		this.checkFile();
		//console.log('loading file ',this.file);
		FileUtils.loadJsonFile(this.file, function(err, data) {
			if(err) return (pCallback && pCallback(err));
			var user=null;
			for(var i in data) {
				var USER=data[i].username;
				var PASS=data[i].password;
				var hash=crypto.createHash('md5').update(pPassword).digest("hex");
				if(pUsername===USER && hash===PASS) { 
					user=new User(data[i]);
					break; 
				}
			}
			pCallback && pCallback(err, user);
		});
	} catch (error) {
		pCallback && pCallback(error);
	}
};

module.exports=UserDaoJson;