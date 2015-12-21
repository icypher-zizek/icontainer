/**
 * authenticator.js
 */
var passport=require('passport');

/**
 * Configures a web server for authentication with passport
 */
var Authenticator={
	/**
	 * Configures authentication 
	 * @param app			the express web server configuration
	 * @param authenticator	the authenticator object with the following structure: 
	 * 						{
	 * 							serializeUser: function(user, callback) {},
	 * 							deserializeUser: function(user, callback) {},
	 * 							local: {
	 * 								authenticate: function(req, username, password, callback) {}'
	 * 							},
	 * 							google: {},
	 * 							facebook: {}
	 * 						}
	 */
	configure: function(app, authenticator) {
		if(!app) {
			console.log('ERROR: Missing web server => aborting authentication configuration !');
			return;
		} else if(!authenticator) {
			console.log('ERROR: Missing authenticator => aborting authentication configuration !');
			return;
		} else if(!authenticator.local && !authenticator.google && !authenticator.facebook) {
			console.log('ERROR: Missing authentication function => aborting authentication configuration !');
			return;
		}
		
		// save user data in session
		console.log('Authentication: configuring passport ...');
		// serialize user
		var serializeUser=authenticator.serializeUser || function(user, callback) {
			if(user.password!=undefined) user.password=null;
			callback && callback(user);
		};
		passport.serializeUser(function(user, done) {serializeUser(user, function(serializedUser) {done(null, serializedUser);});});
		// deserialize user
		var deserializeUser=authenticator.deserializeUser || function(user, callback) {
			callback && callback(user);
		};
		passport.deserializeUser(function(user, done) {deserializeUser(user, function(deserializedUser) {done(null, deserializedUser);});});
		// initialize passport
		app.use(passport.initialize());
		app.use(passport.session());
		
		// configure local authentication
		if(authenticator.local) {
			console.log('Local Authentication');
			var localAuthenticator=require('./local');
			localAuthenticator.configure(authenticator.local);
			app.use(localAuthenticator.getRoutes(authenticator.local));
		}

		// configure google authentication
		if(authenticator.google) {
			console.log('Google Authentication');
			var googleAuthenticator=require('./google');
			googleAuthenticator.configure(authenticator.google);
			app.use(googleAuthenticator.getRoutes(authenticator.google));
		}

		// configure facebook authentication
		if(authenticator.facebook) {
			console.log('Facebook Authentication');
			var facebookAuthenticator=require('./facebook');
			facebookAuthenticator.configure(authenticator.facebook);
			app.use(facebookAuthenticator.getRoutes(authenticator.facebook));
		}
	}
};

module.exports=Authenticator;