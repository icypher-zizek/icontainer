
var React=require('react');
var Router=require('react-router-component');
var Link=Router.Link;
var LoginActions=require('../actions/LoginActions');
var LoginStore=require('../stores/LoginStore');

var SecurePageMixin={
	invisbleLinkName: 'invisbleLink',
	redirectTarget: '/login',
	componentDidMount: function() {
		this.listenTo(LoginStore, this.onLoginStatusChanged);
		//this.redirectTarget='/'+this.props.mandator+'/login';
		LoginActions.getCurrentUser({}, this.onUserFetched);
	},
	onLoginStatusChanged: function(data) {
		if(data && data.isLoggedIn==false) {
			this.onUserLoggedOut();
		}
	},
	onUserFetched: function(err, user) {
		if(err) {
			console.log('User could not be fetched !');
		} else {
			// check user login status
			if(user) {
				// use the current user
				this.useCurrentUser && this.useCurrentUser(user);
			} else {
				this.onUserLoggedOut();
			}
		}
	},
	onUserLoggedOut: function() {
		// redirect to target
		if(this.refs[this.invisbleLinkName]) {
			this.refs[this.invisbleLinkName].navigate(this.redirectTarget);
		}
	},
	generateInvisibleLink: function() {
		return (<Link ref={this.invisbleLinkName} href=""></Link>);
	}
};

module.exports=SecurePageMixin;