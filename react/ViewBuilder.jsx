/**
 * @jsx React.DOM
 */
var React = require('react');
var App	= React.createFactory(require('./App.jsx'));

/**
 * The View Builder
 */
var ViewBuilder = {};

/**
 * Build application
 * @param holderId	the containing element id
 */
ViewBuilder.buildApp=function(holderId,data){
	if(holderId==undefined || holderId==null) {
		console.error('ViewBuilder.buildApp(): Missing holder ID !');
	}
	React.render(App(data), document.getElementById(holderId));
};

module.exports = ViewBuilder;