/**
 * LoginPage.jsx
 * @author edwin.afuba
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');
var Link=Router.Link;
var LoginActions=require('./actions/LoginActions.js');
var LoginStore=require('./stores/LoginStore.js');
var FullPageMixin=require('../mixins/FullPageMixin.jsx');

/**
 * The LoginPage Component
 */
var LoginPage=React.createClass({
	mixins: [Reflux.ListenerMixin, FullPageMixin],
	getDefaultProps: function() {
		return {
			loginAction: LoginActions.loginUser,
			onLoginResult: function() {}
		};
	},
	getInitialState: function() {
		this.pageId='login-page';
		this.redirectTarget='/login';
		return {
			username: '',
			password: '',
			messageClass: '',
			message: null,
			formClass: '',
			userImgStyle: {backgroundImage: 'url("/images/profile.png")'},
		};
	},
	componentDidMount: function() {
		this.refs['username'].getDOMNode().focus();
	},
	onLoginResultReceived: function(err, data) {
		console.log('LoginPage.onLoginResultReceived()',err, data);
		if(err) {
			console.err('Login could not be executed', err);
		} else {
			var isLoggedIn=data.isLoggedIn;
			var msg=isLoggedIn ? ('Welcome, '+data.user.name+'!') : ('Invalid username or password');
			var msgClass='alert alert-'+(isLoggedIn ? 'success' : 'danger')+' animated fadeInUp no-ui-corner';
			this.setState({
				message: msg,
				messageClass: msgClass,
				formClass: (isLoggedIn ? 'form-success' : '')
			});
			if(isLoggedIn) {
				ref=this;
				setTimeout(function() {
					ref.refs['invLogin'].navigate('/user/dashboard');
				}, 1000);
			}
		}
	},
	onInputValueChanged: function(inputName, inputValue) {
		var newState={};
		newState[inputName]=inputValue;
		this.setState(newState);
	},
	passwordKeyHandler: function(event) {
	    if (event.keyCode === 13) {
	    	this.onLogin();
	    }
	},
	onLogin: function() {
		console.log('LoginPage.onLogin()', this.state);
		var user=this.state.username, pass=this.state.password;
		var msg=null;
		if(user=='') {
			msg='Please enter your username';
		} else if(pass=='') {
			msg='Please enter your password';
		}
		if(msg) {
			this.setState({
				message: msg,
				messageClass: 'alert alert-danger animated fadeInUp'
			});
		} else {
			console.log('validating user info');
			var model={
				username: user,
				password: pass
			};
			this.props.loginAction(model, this.onLoginResultReceived);
		}
	},
	render: function() {
		return (
			<div id={this.pageId} className="login-page">
				<div className="section-heading">
					<div className="container">{'Login'}</div>
				</div>
				<div className="login-container fade-in one">
					<div className={'msg-pane '+this.state.messageClass}>{this.state.message}</div>
					<div className="avatar" style={this.state.userImgStyle}></div>
					<div className="login-form-box">
						<div role="form" className={this.state.formClass}>
							<input ref="username" type="text" placeholder="Username" value={this.state.username}
								onChange={function(e) {this.onInputValueChanged('username', e.target.value);}.bind(this)}>
							</input>
							<input ref="password" type="password" placeholder="Password" value={this.state.password}
								onChange={function(e) {this.onInputValueChanged('password', e.target.value);}.bind(this)}
								onKeyUp={this.passwordKeyHandler}>
							</input>
							<button className="btn btn-custom btn-block login" onClick={this.onLogin}>{'Sign In'}</button>
						</div>
					</div>{/**/}
					<Link ref="invLogin" href=""></Link>
				</div>
			</div>
		);
	}
});

module.exports=LoginPage;