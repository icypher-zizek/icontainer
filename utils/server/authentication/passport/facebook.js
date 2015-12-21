/**
 * facebook.js
 */
var express=require('express');
var passport=require('passport');
var FacebookStrategy=require('passport-facebook').Strategy;
var routes=express.Router();

/**
 * Facebook registration and authentication
 */
var FacebookAuthenticator={
	/**
	 * Configures passport for facebook authentication (and registration)
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
	configure: function(authenticator) {
		if(!authenticator || !authenticator.authenticate) {
			console.log('Missing authentication function => aborting facebook configuration ');
			return;
		}

		// facebook login
		console.log('configuring facebook login ...');
		var logOptions={
		    clientID: authenticator.config.clientID,
		    clientSecret: authenticator.config.clientSecret,
		    callbackURL: authenticator.config.serverUrl + "/auth/facebook-callback",
		    passReqToCallback: true,
		    enableProof: false
		};
		passport.use(new FacebookStrategy(logOptions, function(req, accessToken, refreshToken, profile, done) {
			authenticator.authenticate(req, profile, function(err, response) {
				if(err) {
					return done(null, false, err);
				} else {
					return done(null, response);
				}
			});
		}));
		
		// facebook registration
		if(authenticator.registration && authenticator.register!=undefined) {
			console.log('configuring facebook registration ...');
			var regOptions={
			    clientID: authenticator.config.clientID,
			    clientSecret: authenticator.config.clientSecret,
			    callbackURL: authenticator.config.serverUrl + "/register/facebook-callback",
			    passReqToCallback: true,
			    enableProof: false
			};
			passport.use('facebook-register', new FacebookStrategy(regOptions, function(req, accessToken, refreshToken, profile, done) {
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
	 * Gets the routes for facebook authentication (and registration)
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
			console.log('Missing authenticator => aborting facebook routes configuration ');
			return;
		}
		console.log('registering facebook authentication routes ...');
		var loginRoute=authenticator.loginRoute || '/auth/facebook/:mandant';
		var logFailureRoute=authenticator.loginFailureRoute || '/loginFailure';
		
		// authentication route
		var beforeLogin=authenticator.beforeLogin || function(req, res, callback) {
			req.session.mandant_name = req.params.mandant;
		    console.log("Mandant=== " + req.params.mandant);
		    callback && callback(req, res);
		};
		routes.get(loginRoute, function(req, res) {
			beforeLogin(req, res, function(pReq, pRes) {
			    passport.authenticate('facebook', {scope: ['email'], display: 'popup'})(pReq, pRes);
			});
		});
		
		// callback after authentication
		var afterLogin=authenticator.afterLogin || function(req, res) {
		    console.log("facebook!");
		    return res.end("<script>window.close();</script>");;
		};
		routes.get('/auth/facebook-callback',
		    passport.authenticate('facebook', {failureRedirect: logFailureRoute}),
		    afterLogin
		);

		if(authenticator.registration) {
			console.log('registering facebook registration routes ...');
			var registrationRoute=authenticator.registrationRoute || '/register/facebook/:mandant';
			var registrationFailureRoute=authenticator.registrationFailureRoute || '/registrationFailure';

			// registration route
			var beforeRegistration=authenticator.beforeRegistration || function(req, res, callback) {
				req.session.mandant_name = req.params.mandant;
			    console.log("Mandant=== " + req.params.mandant);
			    callback && callback(req, res);
			};
			routes.get(registrationRoute, function(req, res) {
				beforeRegistration(req, res, function(pReq, pRes) {
				    passport.authenticate('facebook-register', {scope: ['email'], display: 'popup'})(pReq, pRes);
				}
			});
				
			// callback after registration
			var afterRegistration=authenticator.afterRegistration || function(req, res) {
			    console.log("facebook-register!");
			    return res.end("<script>" + (req.session.message ? ("alert('" + req.session.message + "');") : "") + "window.close();</script>");
			};
			routes.get('/register/facebook-callback',
			    passport.authenticate('facebook-register', {failureRedirect: registrationFailureRoute}),
			    afterRegistration
			);
		}
	}
};

module.exports=FacebookAuthenticator;