/**
 * Main Node JS Server Script
 */

var express=require('express');
var path=require('path');
var os=require('os');
var favicon=require('static-favicon');
var logger=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var busboy=require('connect-busboy'); // middleware for form/file upload
var csrf=require('csurf');
var moment=require('moment'); // time and date
var config=require('getconfig');

//For requiring `.jsx` files as Node modules
require('node-jsx').install({extension: '.jsx'});
process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";

var app=express();
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public/')));

//========================================================//
//	Additional configuration 							  //
//========================================================//

//create data source
var Datasource=require('./utils/server/datasource/JsonDatasource');
var datasource=new Datasource({
    user: path.join('server','data','users.json')
});

// session
var session=require('./utils/server/session/session');
session.configure(app);

// user config
var UserConfig=require('./routes/utils/UserConfig');
var userConfig=new UserConfig(datasource);

// authentication
var authenticator=require('./routes/passport/authenticator');
authenticator.configure(app, userConfig);

// user routes
var user=require('./routes/user/user');
user.configure(app, UserConfig);

// upload
var upload=require('./routes/upload/upload');
upload.configure(app);

//========================================================//

// web pages
app.use('/*', function(req,res) {
	return res.sendFile(path.join(__dirname,"public","index.html"));
});

module.exports=app;