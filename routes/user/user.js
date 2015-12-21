/**
 * User.js
 */
var express=require('express');
var routes=express.Router();

/**
 * Gets the routes for facebook authentication (and registration)
 * @param config	the configuration object with the following structure: 
 * 		{
 * 			userDataRoute: '/getUserData',
 * 			loginStatusRoute: '/isUserLoggedIn',
 * 			loginFailureRoute: '/loginFailure',
 * 			registrationFailureRoute: '/registrationFailure',
 * 			logoutRoute: '/logoutRoute',
 * 			onGetUserData: function(req, res) {}',
 * 			onGetLoginStatus: function(req, res) {}',
 * 			onLoginFailure: function(req, res) {},
 * 			onRegistrationFailure: function(req, res) {}',
 * 			onLogout: function(req, res) {}
 * 		}
 * @returns express router
 */
var getRoutes=function(config) {
	
	// Route for fetching logged in user data
	var userDataRoute=config.userDataRoute || '/getUserData';
	var onGetUserData=config.onGetUserData || function(req,res) {
		var response={};
		if(req.isAuthenticated()){
			response=req.user;
			if(req.user && req.user.serialize){
				response=req.user.serialize();
			}
		} 
		return res.json(response);
	};
	routes.get(userDataRoute, onGetUserData);

	// Route for checking if a user is logged in
	var loginStatusRoute=config.loginStatusRoute || '/isUserLoggedIn';
	var onGetLoginStatus=config.onGetLoginStatus || function(req,res) {
		var response=(req.isAuthenticated()) ? true : false; 
		return res.json({isLoggedIn: response});
	};
	routes.get(loginStatusRoute, onGetLoginStatus);

	// Redirect route for failed authentication
	var loginFailureRoute=config.loginFailureRoute || '/loginFailure';
	var onLoginFailure=config.onLoginFailure || function(req,res) {
		if (req.xhr) {
			return res.json({isLoggedIn: false});
		} else {
			return res.end("<script>window.close();</script>");
		}
	};
	routes.get(loginFailureRoute, onLoginFailure);

	// Redirect route for failed registration
	var registrationFailureRoute=config.registrationFailureRoute || '/registrationFailure';
	var onRegistrationFailure=config.onRegistrationFailure || function(req,res) {
		if (req.xhr) {
			return res.end("Unauthorized");
		} else {
			if (req.session.message != "") {
				return  res.end("<script>alert('" +req.session.message +"'); window.close(); </script>");
			} else {
				return  res.end("<script>window.close();</script>");
			}
		}
	};
	routes.get(registrationFailureRoute, onRegistrationFailure);

	// Logout route
	var logoutRoute=config.logoutRoute || '/logout';
	var onLogout=config.onLogout || function(req,res) {
		req.logout();
		req.session.destroy();
		if(req.xhr) {
			return res.json({isLoggedIn: false});
		} else {
			return res.redirect(req.session.lasturl+self.loginRoute);
		}
	};
	routes.get(logoutRoute, onLogout);
	
	return routes;
};

module.exports={
	/**
	 * Configure user routes
	 */
	configure: function(app, config) {
		if(!app) {
			console.log('ERROR: Missing web server => aborting configuration !');
			return;
		} else if(!config) {
			console.log('ERROR: Missing user config object => aborting configuration !');
			return;
		}
		console.log('User: configuring user toutes ...');
		var api=getRoutes(config);
		app.use(api);
	}
};