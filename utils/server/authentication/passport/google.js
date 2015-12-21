/**
 * google.js
 */
var express=require('express');
var passport=require('passport');
var GoogleStrategy=require('passport-google').Strategy;
var routes=express.Router();

var GoogleAuthenticator={
		/**
		 * Configures passport for google authentication (and registration)
		 * @param authenticator	the authenticator object with the following structure: 
		 * 						{
		 * 							registration: false,
		 * 							config: {
		 * 								clientID: '',
		 * 								clientSecret: '',
		 * 								serverUrl: ''
		 * 							},
		 * 							authenticate: function(req, profile, callback) {}',
		 * 							register: function(req, profile, callback) {}
		 * 						}
		 */
	configure: funcation(authenticator) {
		if(!authenticator || !authenticator.authenticate) {
			console.log('Missing authentication function => aborting google configuration ');
			return;
		}

		// google login
		console.log('configuring google login ...');
		var logOptions={
		    realm: authenticator.config.serverUrl,
		    returnURL: authenticator.config.serverUrl + "/auth/google-callback",
		    passReqToCallback: true
		};
		passport.use(new GoogleStrategy(logOptions, function(req, identifier, profile, done) {
			authenticator.authenticate(req, profile, function(err, response) {
				if(err) {
					return done(null, false, err);
				} else {
					return done(null, response);
				}
			});
		}));
		
		// google registration
		if(authenticator.registration && authenticator.register!=undefined) {
			console.log('configuring google registration ...');
			var regOptions={
			    realm: authenticator.config.serverUrl,
			    returnURL: authenticator.config.serverUrl + "/register/google-callback",
			    passReqToCallback: true
			};
			passport.use('google-register', new GoogleStrategy(regOptions, function(req, identifier, profile, done) {
			    profile.id = identifier;
				authenticator.register(req, profile, function(err, response) {
					if(err) {
						return done(null, false, err);
					} else {
						return done(null, response);
					}
				});
			}));
		}
	},
	/**
	 * Gets the routes for google authentication (and registration)
	 * @param authenticator	the authenticator object with the following structure: 
	 * 						{
	 * 							registration: false,
	 * 							loginRoute: '/auth/facebook/:mandant',
	 * 							loginFailureRoute: '/loginFailure',
	 * 							registrationRoute: '/auth/facebook/:mandant',
	 * 							registrationFailureRoute: '/registrationFailure',
	 * 							beforeLogin: function(req, res) {}',
	 * 							afterLogin: function(req, res) {},
	 * 							beforeRegistration: function(req, res) {}',
	 * 							afterRegistration: function(req, res) {}
	 * 						}
	 * @returns 			express router
	 */
	getRoutes: function(authenticator) {
		if(!authenticator) {
			console.log('Missing authenticator => aborting google routes configuration ');
			return;
		}
		console.log('registering google authentication routes ...');
		var loginRoute=authenticator.loginRoute || '/auth/google/:mandant';
		var logFailureRoute=authenticator.loginFailureRoute || '/loginFailure';
		
		// authentication route
		var beforeLogin=authenticator.beforeLogin || function(req, res, callback) {
			req.session.mandant_name = req.params.mandant;
		    console.log("Mandant=== " + req.params.mandant);
		    callback && callback(req, res);
		};
		routes.get(loginRoute, function(req, res) {
			beforeLogin(req, res, function(pReq, pRes) {
			    passport.authenticate('google')(pReq, pRes);
			});
		});
		
		// callback after authentication
		var afterLogin=authenticator.afterLogin || function(req, res) {
		    console.log("google!");
		    return res.end("<script>window.close();</script>");
		};
		routes.get('/auth/google-callback',
		    passport.authenticate('google', {failureRedirect: logFailureRoute}),
		    afterLogin
		);

		if(authenticator.registration) {
			console.log('registering google registration routes ...');
			var registrationRoute=authenticator.registrationRoute || '/register/google/:mandant';
			var registrationFailureRoute=authenticator.registrationFailureRoute || '/registrationFailure';

			// registration route
			var beforeRegistration=authenticator.beforeRegistration || function(req, res, callback) {
				req.session.mandant_name = req.params.mandant;
			    console.log("Mandant=== " + req.params.mandant);
			    callback && callback(req, res);
			};
			routes.get(registrationRoute, function(req, res) {
				beforeRegistration(req, res, function(pReq, pRes) {
				    passport.authenticate('google-register')(pReq, pRes);
				}
			});
				
			// callback after registration
			var afterRegistration=authenticator.afterRegistration || function(req, res) {
			    console.log("google-register!");
			    return res.end("<script>" + (req.session.message ? ("alert('" + req.session.message + "');") : "") + "window.close();</script>");
			};
			routes.get('/register/google-callback',
			    passport.authenticate('google-register', {failureRedirect: registrationFailureRoute}),
			    afterRegistration
			);
		}
	}
};

module.exports = google_authentication_api;