/**
 * ItemForm.jsx
 * @author edwin.afuba
 */
var React=require('react');
var Reflux=require('reflux');
var Router=require('react-router-component');
var Link=Router.Link;
var Input=require('../../common/inputs/InputField.jsx');
var TextArea=require('../../common/inputs/TextArea.jsx');
var ItemActions=require('../actions/ItemActions');

/**
 * The ItemForm Component
 */
var ItemForm=React.createClass({
	mixins: [Reflux.ListenerMixin],
	getDefaultProps: function() {
		return {
			mandator: 'iContainer',
			user: {},
			itemId: null
		};
	},
	getInitialState: function() {
		return {
			item: {
				id: null,
				name: '',
				category: '',
				tag: '',
				description: '',
				size: '',
				color: '',
				location: '',
				price: null,
				image: '/images/question-mark.jpg'
			},
			errors: {
				name: null,
				category: null,
				tag: null,
				description: null,
				size: null,
				color: null,
				location: null,
				price: null,
				image: null
			}
		};
	},
	onSaveItem: function() {
		console.log('ItemForm.onSaveItem()',this.refs);
		var item={
			id: this.state.item.id,
			name: this.refs['name'].getValue(),
			category: this.refs['category'].getValue(),
			tag: this.refs['tag'].getValue(),
			description: this.refs['description'].getValue(),
			size: this.refs['size'].getValue(),
			color: this.refs['color'].getValue(),
			location: this.refs['location'].getValue(),
			price: this.refs['price'].getValue(),
			image: this.state.item.image
		};
//		for(var attr in this.refs) {
//			console.log(attr+'=',this.refs[attr].getValue());
//			if(item[attr]) item[attr]=this.refs[attr].getValue();
//		}
		console.log('saving item',item);
		var self=this;
		ItemActions.saveItem(item, function(err, itemId) {
			if(!err) {
				console.log('Item successfully saved !');
				self.refs['invLink'].navigate(['','items',itemId].join('/'));
			} else {
				console.error('Item could not be saved!');
			}
		});
	},
	render: function() {
		var isNew=(this.props.itemId==null);
		var title=isNew ? 'Create Item' : 'Edit Item';
		var errors=this.state.errors;
		var item=this.state.item;
		return (
			<div className="user-item-form pad-btm">
				<div className="panel panel-custom table-responsive">
					<div className="panel-heading"><span className="h3">{title}</span></div>
					<div className="panel-body">
						<div className="row">
							<div className="col-md-6">
								<div className="form-horizontal" role="form">
									<div className={'form-group '+(errors.name?'has-error':'')}>
										<label className="control-label col-md-4">{'Name'}</label>
										<div className="col-md-8">
											<Input ref="name" name="name" className="form-control" value={item.name}></Input>
										</div>
									</div>
									<div className={'form-group '+(errors.category?'has-error':'')}>
										<label htmlFor="category" className="control-label col-md-4">{'Category'}</label>
										<div className="col-md-8">
											<Input ref="category" name="category" className="form-control" value={item.category}></Input>
										</div>
									</div>
									<div className={'form-group '+(errors.tag?'has-error':'')}>
										<label htmlFor="tag" className="control-label col-md-4">{'Tag'}</label>
										<div className="col-md-8">
											<Input ref="tag" name="tag" className="form-control" value={item.tag}></Input>
										</div>
									</div>
									<div className={'form-group '+(errors.description?'has-error':'')}>
										<label htmlFor="description" className="control-label col-md-4">{'Description'}</label>
										<div className="col-md-8">
											<TextArea ref="description" name="description" className="form-control" rows={5} 
												value={item.description}></TextArea>
										</div>
									</div>
									<div className={'form-group '+(errors.location?'has-error':'')}>
										<label htmlFor="location" className="control-label col-md-4">{'Location'}</label>
										<div className="col-md-8">
											<Input ref="location" name="location" className="form-control" value={item.location}></Input>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-horizontal" role="form">
									<div className={'form-group '+(errors.price?'has-error':'')}>
										<label htmlFor="price" className="control-label col-md-4">{'Price'}</label>
										<div className="col-md-8">
											<Input ref="price" name="price" className="form-control" value={item.price}></Input>
										</div>
									</div>
									<div className={'form-group '+(errors.size?'has-error':'')}>
										<label htmlFor="size" className="control-label col-md-4">{'Size'}</label>
										<div className="col-md-8">
											<Input ref="size" name="size" className="form-control" value={item.size}></Input>
										</div>
									</div>
									<div className={'form-group '+(errors.tag?'has-error':'')}>
										<label htmlFor="color" className="control-label col-md-4">{'Color'}</label>
										<div className="col-md-8">
											<Input ref="color" name="color" className="form-control" value={item.color}></Input>
										</div>
									</div>
									<div className={'form-group '+(errors.location?'has-error':'')}>
										<label className="control-label col-md-4">{'image'}</label>
										<div className="col-md-8">
											{/*image uploader*/}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="panel-footer text-right">
						<button className={'btn btn-custom'} onClick={this.onSaveItem}>{' Save Item '}</button>
					</div>
				</div>
				<Link ref="invLink" href=""></Link>
			</div>
		);
	}
});

module.exports=ItemForm;