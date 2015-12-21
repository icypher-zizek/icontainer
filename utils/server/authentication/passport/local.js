/**
 * local.js
 */
var express=require('express');
var authencation=express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

/**
 * Local Passport Authenticator
 */
var LocalAuthenticator={
	/**
	 * Configures passport for local authentication 
	 * @param authenticator	the authenticator object with the following structure: 
	 * 						{
	 * 							authenticate: function(req, username, password, callback) {},
	 * 							afterLogin: function(req, res) {},
	 * 						}
	 */
	configure: function(authenticator) {
		if(!authenticator || !authenticator.authenticate) {
			console.log('Missing authentication function => aborting local configuration ');
			return;
		}
		// Username und Password Login
		passport.use(new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
			authenticator.authenticate(req, username, password, function(err, response) {
				if(err) {
					// authentication failed
					return done(null, false, err);
				} else {
					// authentication succeeded
					return done(null, response);
				}
			});
		}));
	},
	/**
	 * Gets the routes for local authentication
	 * @param authenticator	the authenticator object with the following structure: 
	 * 						{
	 * 							loginRoute: '/auth/facebook/:mandant',
	 * 							loginFailureRoute: '/loginFailure',
	 * 							afterLogin: function(req, res) {}
	 * 						}
	 * @returns 			express router
	 */
	getRoutes: function(authenticator) {
		if(!authenticator) {
			console.log('Missing authenticator => aborting local routes configuration ');
			return;
		}
		console.log('registering local authentication routes ...');
		var loginRoute=authenticator.loginRoute || '/login';
		var loginFailureRoute=authenticator.loginFailureRoute || '/loginFailure';
		
		// callback after authentication
		var afterLogin=authenticator.afterLogin || function(req, res) {
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
		};
		authencation.post(loginRoute, 
			passport.authenticate('local', {failureRedirect : loginFailureRoute}), 
			afterLogin
		);
		return authencation;
	}
};

module.exports=LocalAuthenticator;
