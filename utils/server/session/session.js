/**
 * Configure web server sessions
 * session.js
 */
var session=require('express-session');
var SessionStore=require('session-file-store')(session);
var session_api=require('./session_api');

var storeOptions={
	ttl: 7*24*60*60
};

var instance=session({ secret: "sslhUIduDQ36djH6RksiQkd3jo2",resave:true,saveUninitialized:true,store: new SessionStore(storeOptions)});

module.exports={
	configure: function(app) {
		if(!app) {
			console.log('ERROR: Missing web server => aborting configuration !');
			return;
		}
		console.log('Session: configuring session ...');
		app.use(instance);
		app.use(session_api);
	},
	getInstance: function(){
		return instance;
	}
};