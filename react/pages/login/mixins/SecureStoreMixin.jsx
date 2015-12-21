/**
 * SecureStoreMixin.jsx
 */
var React=require('react');
var LoginStore=require('../stores/LoginStore');

var SecureStoreMixin={
	initSecurity: function(loginStore) {
		var Store=(loginStore ? loginStore : LoginStore);
		this.listenTo(Store, this.onLoginStatusChanged);
		if(this.resetStore) {
			this.resetStore();
		}
	},
	onLoginStatusChanged: function(data) {
		if(data && data.isLoggedIn!=undefined) {
			// use the status
			if(data.isLoggedIn && this.onUserLoggedIn) {
				this.onUserLoggedIn();
			} else {
				if(this.resetStore) {
					this.resetStore();
				}
				if(this.onUserLoggedOut) {
					this.onUserLoggedOut();
				}
			}
		}
	}
};

module.exports=SecureStoreMixin;