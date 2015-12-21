/**
 * @jsx React.DOM
 */

/**
 *  For rendering the app on client side.
 */
var React = require('react');
var App = require('./App.jsx');
var ViewBuilder=require('./ViewBuilder.jsx');
var Constants=require('./Constants');
var Utils=require('../utils/common/Utils');

if (typeof window !== 'undefined') {
    window.onload = function() {
    	var location=window.location;
    	var pathname=location.pathname;
    	var mandator=pathname.split('/')[1];
    	var params=Utils.getUrlParams(window.location.search, {locale: 'en'});
        React.initializeTouchEvents(true);
        Constants.setMandator(mandator);
        ViewBuilder.buildApp('mainContent',{path:pathname,mandator:Constants.mandator});
    }
}