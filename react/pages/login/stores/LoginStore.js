/**
 * LoginStore.js
 */
var Reflux=require('reflux');
var Async=require('async');
var LoginActions=require('../actions/LoginActions.js');

var LoginStore=Reflux.createStore({
	mixins: [],
	init : function () {
		this.listenTo(LoginActions.loginUser, this.onLoginUser);
		this.listenTo(LoginActions.logoutUser, this.onLogoutUser);
//		this.listenTo(LoginActions.isUserloggedIn, this.isUserloggedIn);
		this.listenTo(LoginActions.getCurrentUser, this.onGetCurrentUser);
		this.currentUser=null;
	},
	/**
	 * @returns the current user
	 */
	getCurrentUser: function() {
		return this.currentUser;
	},
	onLoginUser: function(props, pCallback) {
		console.log('LoginStore.onLoginUser()');
		var self=this;
		var posting=$jq.post(
			"/login?mandant=iContainer",
			{
				username: props.username, 
				password:props.password
			}
		);
		posting.done(function(data) {
			console.log('Login results: ', data);
			self.onLoginSuccess(data, pCallback);
		});	
	},
	onLogoutUser: function(props, pCallback) {
		console.log('LoginStore.onLogoutUser()');
		var self=this;
		$jq.ajax({
			url : "/logout",
			type : 'GET',
			contentType : "application/x-www-form-urlencoded;charset=utf-8",
			dataType : 'json',
			success: function(data) {
				self.currentUser=null;
				if(pCallback) {pCallback(null, data);}
				self.trigger(data);
			}
		});
	},
	
	onGetCurrentUser: function(props, pCallback) {
		console.log('LoginStore.onGetCurrentUser()');
		var self=this;
		if(self.currentUser) {
			if(pCallback) {pCallback(null, self.currentUser);}
			self.trigger({isLoggedIn: (self.currentUser!=null), user: self.currentUser});
		} else {
			this.fetchCurrentUser(props, function(err, user) {
				if(pCallback) {pCallback(null, self.currentUser);}
				self.trigger({isLoggedIn: (user!=null), user: user});
			});
		}
	},
	onLoginSuccess: function(data, pCallback) {
		var self=this;
		Async.series(
			[
			 	function(sCallback) {
			 		// get current User
			 		console.log('>> setting the current user ...');
			 		self.fetchCurrentUser({}, function(user) {
			 			sCallback(null);
			 		});
			 	}
			],
			function(err) {
				if(pCallback) {pCallback(null, data);}
		 		console.log('notifying listeners ...');
				self.trigger(data);
			}
		);
	},
	/**
	 * 
	 */
	onRemotelyLoggedOut: function() {
		// server was restarted or connection lost ...
		setTimeout(function(){			
			if(this.currentUser){
				this.enableComm({});
				ClassroomActions.rejoinChat();
			}
		}.bind(this),1000);
	},
	fetchCurrentUser: function(props, pCallback) {
		console.log('LoginStore.fetchCurrentUser()');
		var self=this;
		$jq.ajax({
			url : "/getUserData",
	        async: false,
			type : 'GET',
			contentType : "application/x-www-form-urlencoded;charset=utf-8",
			dataType : 'json',
			success : function(data) {
				if(Object.keys(data).length>0) {
					self.currentUser=data; //Serializable.deserialize(data);
				}
				if(pCallback) {pCallback(null, self.currentUser);}
			}
		});
	}
});

module.exports=LoginStore;