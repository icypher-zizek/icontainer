/**
 * UserPage.jsx
 * @author edwin.afuba
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');
var Locations=Router.Locations;
var Location=Router.Location;
var NotFound=Router.NotFound;
var NotFoundPage=require('../pages/NotFoundPage.jsx');
var HighLightedLink=require('../common/general/HighLightedLink.jsx');
var FullPageMixin=require('../pages/mixins/FullPageMixin.jsx');
var SecurePageMixin=require('../pages/login/mixins/SecurePageMixin.jsx');
var DashboardPage=require('./components/DashboardPage.jsx');
var ItemsPage=require('./components/ItemsPage.jsx');
var ItemForm=require('./components/ItemForm.jsx');

/**
 * The UserPage Component
 */
var UserPage=React.createClass({
	mixins: [Reflux.ListenerMixin, FullPageMixin, SecurePageMixin],
	getDefaultProps: function() {
		return {
			mandator: 'iContainer'
		};
	},
	getInitialState: function() {
		this.pageId='user-page';
		return {
			user: null
		};
	},
	useCurrentUser: function(user) {
		console.log('UserPage.useCurrentUser()',user);
		this.setState({user: user});
	},
	render: function() {
		console.log('UserPage.render()', this.state);
		var markup=(<div></div>);
		if(this.state.user!=null) {
			var baseUrl=['','user'].join('/');
			markup=[
				<div key={'usr1'} className="section-heading">
					<div className="container">{'User Backend'}</div>
				</div>,
				<div key={'usr2'} className="container">
					<div className="row">
						<div className="col-md-3">
							<div className="panel panel-default margin-top">
								<div className="list-group">
									<HighLightedLink className='list-group-item' href={baseUrl+'/dashboard'}>
										<i className="fa fa-dashboard fa-fw"/><span className="margin-lft">{'Dashboard'}</span>
									</HighLightedLink>
									<HighLightedLink className='list-group-item' href={baseUrl+'/items'}>
										<i className="fa fa-list fa-fw"/><span className="margin-lft">{'My Items'}</span>
									</HighLightedLink>
									<HighLightedLink className='list-group-item' href={baseUrl+'/item/create'}>
										<i className="fa fa-file-text-o fa-fw"/><span className="margin-lft">{'Create Item'}</span>
									</HighLightedLink>
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<div className="margin-top">
								<Locations contextual>
									<Location path="(/)" handler={DashboardPage} mandator={this.props.mandator} user={this.state.user}></Location>
									<Location path="/dashboard(/*)" handler={DashboardPage} mandator={this.props.mandator} user={this.state.user}></Location>
									<Location path="/items(/*)" handler={ItemsPage} mandator={this.props.mandator} user={this.state.user}></Location>
									<Location path="/item/create" handler={ItemForm} mandator={this.props.mandator} user={this.state.user}></Location>
									<Location path="/item/edit/:itemId" handler={ItemForm} mandator={this.props.mandator} user={this.state.user}></Location>
									<NotFound handler={NotFoundPage}></NotFound>
								</Locations>
							</div>
						</div>
					</div>
				</div>,
				<span key={'usr3'}></span>
			];
		}
		return (<div id={this.pageId} className="user-page">{markup}{this.generateInvisibleLink()}</div>);
	}
});

module.exports=UserPage;