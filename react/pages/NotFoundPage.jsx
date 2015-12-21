/**
 * @jsx React.DOM
 */
var React=require('react');

var NotFoundPage = React.createClass({
	render: function() {
		return (
      		<div className="container" style={{height:'300'}}><h3>Seite nicht gefunden</h3></div>
		);
	}
});

module.exports=NotFoundPage;