/**
 * Header.jsx
 * @author edwin.afuba
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');
var Link=Router.Link;
var HighLightedLink=require('../../common/general/HighLightedLink.jsx');
var HeaderActions=require('./actions/HeaderActions');
var LoginActions=require('../login/actions/LoginActions');
var LoginStore=require('../login/stores/LoginStore');
var Constants=require('../../Constants');
var Utils=require('../../../utils/common/Utils');

/**
 * The Header Component
 */
var Header=React.createClass({
	mixins: [Reflux.ListenerMixin],
	getDefaultProps: function() {
		return {
			mandator: 'iContainer'
		}
	},
	getInitialState: function() {
		return {
			user: null
		};
	},
	componentDidMount: function() {
		//console.log('Header.componentDidMount()');
		this.listenTo(LoginStore, this.onUserChanged);
		this.listenTo(HeaderActions.updateHeader, this.onUpdateHeader);
		LoginActions.getCurrentUser();
	},
	onUserChanged: function(data) {
		this.setState({user: data.user});
	},
	onLogout: function() {
		console.log('Loging out ...');
		LoginActions.logoutUser();
	},
	onUpdateHeader: function() {
		this.forceUpdate();
	},
	render: function() {
		console.log('Header.render()');
		var baseUrl=''; //'/'+this.props.mandator;
		var menu=[
	        <li key={'headlnk3'}><HighLightedLink href={baseUrl+'/login'}>{'Sign in'}</HighLightedLink></li>
	    ];
		if(this.state.user) {
			menu=(
				<li>
					<a className="dropdown-toggle" data-toggle="dropdown" href="#">
						<span  className="glyphicon glyphicon-user" /> Hi, {this.state.user.name}! <span className="caret"></span>
					</a>
				    <ul className="dropdown-menu" role="menu">
						<li>
							<Link href={baseUrl+'/user/dashboard'}>
								<i className="fa fa-dashboard fa-fw"/><span className="margin-lft">{'Dashboard'}</span>
							</Link>
						</li>
						<li>
							<Link href={baseUrl+'/user/items'}>
								<i className="fa fa-list fa-fw"/><span className="margin-lft">{'My Items'}</span>
							</Link>
						</li>
						<li className="divider"></li>
						<li>
							<a href="#" onClick={this.onLogout} ref="logoutLink">
								<span className="fa fa-sign-out fa-fw" /><span className="margin-lft">{'Sign out'}</span>
							</a>
						</li>
				    </ul>
				</li>
			);
		}
		return (
            <nav id="headerNav" className="page-header navbar navbar-fixed-top no-margin">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" onClick={this.toggleNavBar}>
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="brand" href={''}></a>
					</div>
					<div ref="navbar" className="text-pane collapse navbar-collapse">
						<ul className="nav navbar-nav navbar-right">
				        	<li><HighLightedLink href={baseUrl+'/'} checkExactUrl={true}>{'Home'}</HighLightedLink></li>
				        	<li><HighLightedLink href={baseUrl+'/search'}>{'Search'}</HighLightedLink></li>
					        <li><HighLightedLink href={baseUrl+'/register'}>{'Register'}</HighLightedLink></li>
							{menu}
						</ul>
					</div>
				</div>
            </nav>
		);
	},
	toggleNavBar: function(event){
		var $navBar=$jq(this.refs["navbar"].getDOMNode());
		$navBar.collapse("toggle");
	}
});

module.exports=Header;