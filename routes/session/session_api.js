/**
 * session_api.js
 */
var express = require('express');
var session_api = express.Router();

/**
 * Set session object value
 */
session_api.post('/session_set_value', function(req,res) {
    console.log("session_set_value");
	if (!req.isAuthenticated()) {
		res.statusCode=401;
		return res.end("Unauthorized");
	}
	var key = req.param('key');
	var value = req.param('value');
	req.session[key]=value;
	res.status = 200;
	res.end();
});

/**
 * Get session object value
 */
session_api.get('/session_get_value', function(req,res) {
	if (!req.isAuthenticated()) {
		res.statusCode=401;
		return res.end("Unauthorized");
	}
	var key = req.param('key');
	var value = req.session[key];
	res.end(value);
});


module.exports = session_api;