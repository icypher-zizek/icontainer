/**
 * @jsx React.DOM
 */

/**
 * 
 * It uses `<NoteApp/>` to render the app on the server. You can create
 * isomorphic apps by rendering React on both Server and Client.
 */

var React=require('react');
var Router=require('react-router-component');
var Pages=Router.Pages;
var Page=Router.Page;
var Locations=Router.Locations;
var Location=Router.Location;
var NotFound=Router.NotFound;
var NotFoundPage=require('./pages/NotFoundPage.jsx');
var Header=require('./pages/header/Header.jsx');
var Footer=require('./pages/footer/Footer.jsx');
var HomePage=require('./pages/home/HomePage.jsx');
var SearchPage=require('./pages/search/SearchPage.jsx');
var LoginPage=require('./pages/login/LoginPage.jsx');
var UserPage=require('./user/UserPage.jsx');
var FullPageMixin=require('./pages/mixins/FullPageMixin.jsx');
var Constants=require('./Constants');
var Utils=require('../utils/common/Utils');
var HeaderActions=require('./pages/header/actions/HeaderActions');

/**
 * The Main Application
 */
var App = React.createClass({
	mixins: [FullPageMixin],
	getInitialState: function() {
		this.pageId='pageContentHolder';
		return {};
	},
	onBeforeNavigation: function() {
		//console.log('App.onBeforeNavigation()');
	},
	onNavigation: function() {
		HeaderActions.updateHeader();
		//console.log('App.onNavigation()',this.props);
	},
	render: function() {
		//console.log('App.render()',this.props);
		/*
						<Location path="/home(/*)" handler={HomePage}></Location>
		*/
		return (
			<div className="">
				<Header mandator={this.props.mandator} locale={this.props.locale}></Header>
				<div id={this.pageId}>
					<Locations onBeforeNavigation={this.onBeforeNavigation} onNavigation={this.onNavigation}>
						<Location path="(/)?" handler={HomePage}></Location>
						<Location path="/search(/*)" handler={SearchPage}></Location>
						<Location path="/login(/*)" handler={LoginPage}></Location>
						<Location path="/user(/*)" handler={UserPage}></Location>
						<NotFound handler={NotFoundPage}></NotFound>
					</Locations>
				</div>
				<Footer mandator={this.props.mandator} locale={this.props.locale}></Footer>
			</div>
		);
	}
});

module.exports=App;
