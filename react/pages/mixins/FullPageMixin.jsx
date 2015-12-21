/**
 * FullPageMixin.jsx
 * @author edwin.afuba
 */

var FullPageMixin={
	pageId: null,
	headerId: 'headerNav',
	footerId: 'footer',
	componentDidMount: function() {
		this.resizePage();
	},
	resizePage: function() {
		if(!this.pageId) {
			return console.error('Page ID not set !');
		}
		var self=this;
		var offsetHeight=$jq('#'+self.headerId).outerHeight()+$jq('#'+self.footerId).outerHeight();
		var height=($jq(window).innerHeight() - offsetHeight) + 'px';
		$jq('#'+self.pageId).css({ minHeight: height });
		$jq(window).resize(function() {
			var offsetHeight=$jq('#'+self.headerId).outerHeight()+$jq('#'+self.footerId).outerHeight();
			var height=($jq(window).innerHeight() - offsetHeight) + 'px';
		    $jq('#'+self.pageId).css({ minHeight: height });
		});
		this.onResize && this.onResize();
	}
};

module.exports=FullPageMixin;