/**
 * @jsx React.DOM
 */

var React=require('react');
var Background=require('../../../common/general/Background.jsx');
var Slider=require('../../../common/slider/simpleSlider/Slider.jsx');

var MainSlider=React.createClass({
	getDefaultProps: function() {
		return  {
			autoSlide: true,
			interval: 5000,
			className: 'main-slider',
			innerClassName: 'main-slider-inner',
			itemClassName: 'main-slider-item',
			media: []
		}
	},
	render:function(){
		console.log('MainSlider.render()', this.props);
		var markup=this.props.media.length==0 ? null : (
			<Slider data={this.props.media}
				autoSlide={this.props.autoSlide}
				interval={this.props.interval}
				className={this.props.className}
				innerClassName={this.props.innerClassName}
				itemClassName={this.props.itemClassName}>
			</Slider>
		);
//		var markup=null;
//		if(this.props.media.length>0) {
//			var images=this.props.media.map(function(image, i) {
//				var activeClass='item'+(i==0 ? ' active' : '');
//				return (
//					<div key={'mSlider'+i} className="item active"><Background className="img" image={image.file}></Background></div>
//				);
//			});
//			markup=(
//				<div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
//					<div className="carousel-inner" role="listbox">{images}</div>
//				</div>
//			);
//		}
		return (<div className="main-slider-holder">{markup}</div>);
	}
});

module.exports=MainSlider;