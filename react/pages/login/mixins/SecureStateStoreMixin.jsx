/**
 * SecureStoreMixin.jsx
 */
var React=require('react');
var LoginStore=require('../stores/LoginStore');

var SecureStateStoreMixin={
	initSecurity: function(loginStore) {
		var Store=(loginStore ? loginStore : LoginStore);
		this.listenTo(Store, this.onLoginStatusChanged);
		if(this.resetState) {
			this.resetState();
		}
	},
	onLoginStatusChanged: function(data) {
		//console.log('SecureStateStoreMixin.onLoginStatusChanged()', data);
		if(data && data.isLoggedIn!=undefined) {
			//console.log('checking new state ...');
			// use the status
			if(data.isLoggedIn) {
				this.onUserLoggedIn && this.onUserLoggedIn();
			} else {
				this.resetState && this.resetState();
				this.onUserLoggedOut && this.onUserLoggedOut();
			}
		}
	}
};

module.exports=SecureStateStoreMixin;