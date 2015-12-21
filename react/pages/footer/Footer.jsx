/**
 * Footer.jsx
 */
var React=require('react');
var Router=require('react-router-component');
var Link=Router.Link;
var Constants=require('../../Constants');

var Footer=React.createClass({
	getDefaultProps: function() {
		return {
			mandator: 'sharerado'
		};
	},
	render: function() {
		return (
			<div id="footer" className="footer">
				<div className="container">
					<div className="row row-condensed">
						<div className="col-md-8 col-md-offset-2">
							<p className="text-center">{'Copyright © 2015 iContainer'}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports=Footer;