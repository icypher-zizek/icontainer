/**
 * DashboardPage.jsx
 * @author edwin.afuba
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');

/**
 * The DashboardPage Component
 */
var DashboardPage=React.createClass({
	mixins: [Reflux.ListenerMixin],
	getDefaultProps: function() {
		return {
			mandator: 'iContainer',
			user: {}
		};
	},
	getInitialState: function() {
		return {
			
		};
	},
	render: function() {
		return (
			<div className="user-dashboard">
				<h2>{'Dashboard for '+this.props.user.name}</h2>
				<div className="">
				</div>
			</div>
		);
	}
});

module.exports=DashboardPage;