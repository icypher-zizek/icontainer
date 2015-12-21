/**
 * SimpleUploader.jsx
 */
var React=require('react');
var Background=require('../general/Background.jsx');

var SimpleUploader=React.createClass({
	getDefaultProps: function() {
		return  {
			serverRoute: "/upload",
			btnTitle: "Upload Image",
			renderImage: this.renderImage
		};
	},
	getInitialState: function() {
		return {
			image: null
		};
	},
	renderImage: function(image) {
		return image==null ? image : (<Background image={image}></Background>);
	},
	render: function() {
		return (
			<div className={this.props.className}>
				<form id="uploadForm"
			  		action={this.props.serverRoute}
			  		enctype="multipart/form-data"
			  		method="POST">
					<input type="file" name="image" />
					<input type="submit" value={this.props.btnTitle} name="submit">
				</form>
				{this.renderImage(this.state.image)}
			</div>
		);
	}
});

module.exports=SimpleUploader;