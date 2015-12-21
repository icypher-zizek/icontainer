/**
 * HomeSection.jsx
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');
var Link=Router.Link;
var MainSlider=require('./MainSlider.jsx');
var HomeActions=require('../actions/HomeActions');
var HomeSectionStore=require('../stores/HomeSectionStore');
var Constants=require('../../../Constants');
var Locale=require('../../../../utils/common/i18n/Locale');

/**
 * HomeSection component
 */
var HomeSection=React.createClass({
	mixins: [Reflux.ListenerMixin],
	getDefaultProps: function() {
		return {
			className: ''
		};
	},
	getInitialState: function() {
		return HomeSectionStore.getInitialState();
	},
	onStateChanged: function(state) {
		this.setState(state);
	},
	componentDidMount: function() {
		this.listenTo(HomeSectionStore, this.onStateChanged);
		HomeActions.getHomePageModel();
	},
	onNavigate: function(e) {
		var section=e.target.href.split('=')[1];
		HomeActions.scrollToSection(section);
	},
	render: function() {
//		console.log('HomeSection.render()', this.state);
		var linkBase=['/',Constants.getMandator(),'/home?section='].join('');
		return (
			<div id="home" className={'home '+this.props.className}>
				<div className="section-heading"><div className="container">{this.state.textContent.pageTitle}</div>{/**/}</div>
				<MainSlider media={this.state.slider.images}></MainSlider>
				<div className="text-pane">
					<div className="container">
						<div className="row">
							<div className="col-md-8 col-md-offset-2">
								<div className="main-title-holder">
									<div className="title">{this.state.textContent.title}</div>
									{/*Links*/}
									<div className="links">
										<div className="row">
											<div className="col-md-5">
												<Link href={linkBase+'product'} className="btn btn-block" onClick={this.onNavigate}>
													{Locale.getLabel('label.home.link.product')}
												</Link>
											</div>
											<div className="col-md-5 col-md-offset-2">
												<Link href={linkBase+'contact'} className="btn btn-block" onClick={this.onNavigate}>
													{Locale.getLabel('label.home.link.contact')}
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports=HomeSection;
