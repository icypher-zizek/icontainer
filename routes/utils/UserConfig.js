/**
 * User.js
 */
var express=require('express');
var routes=express.Router();
var UserService=require('../../services/user/UserServerService');
var Serializable=require('../../utils/common/Serializable');
 
 
 var UserConfig=function(pDataSource) {
	this.loginRoute='/login';
	this.loginFailureRoute='/loginFailure';
	this.registrationRoute='/register';
	this.registrationFailureRoute='/registrationFailure';
	this.userDataRoute='/getUserData';
	this.loginStatusRoute='/isUserLoggedIn';
	this.logoutRoute='/logout';
	this.userService=new UserService(pDataSource);
	this.serializeUser=function(user, callback) {
		user.password='';
		callback && callback(user);
	};
	this.deserializeUser=function(user, callback) {
		callback && callback(user);
	};
	var self=this;
	this.local={
		authenticate: function(req, username, password, callback) {
			self.userService.authenticate(username, password, callback);
		},
		afterLogin: function(req, res) {
			if (req.isAuthenticated()) {
				if (req.xhr) {
					return res.json({isLoggedIn: true, user: req.user});
				} else {
					return res.redirect(req.session.lasturl);
				}
			} else {
				if (req.xhr) {
					return res.json({isLoggedIn: false});
				} else {
					return res.redirect(req.session.lasturl + route);
				}
			}
		}
	}
 }; 
 
 module.exports=UserConfig; 
 