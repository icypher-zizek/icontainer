/**
 * Locale.js
 */
var I18N=require('./I18N');

var Locale={};

Locale.i18n=null;
Locale.localeInitialized=false;
Locale.localePlaceHolder='<locale>';
Locale.bundleTemplate='/bundles/Messages_'+Locale.localePlaceHolder+'.json';

Locale.onChanged=function(){
//	if (window.confirm("Die Session ist abgelaufen neu laden? ")) {
//		return true;
//	} else {
//		return false;
//	}
	return false;
};

Locale.getLabel=function() {
	var label=this.i18n ? this.i18n.get.apply(this.i18n, arguments) : arguments[0];
	return label;
};

/**
 * Load Locale
 */
Locale.loadLocale = function(pLocale) {
	if(this.localeInitialized)
		return;
	try {
		var locale=pLocale || 'de';
		var bundle=Locale.bundleTemplate.replace(Locale.localePlaceHolder, locale);
		console.log('Locale.loadLocale(): loading labels ...');
		this.i18n=new I18N();
		this.i18n.fetchBundle(bundle);
		this.localeInitialized=true;
	} catch (e) {
		console.error(e);
	}
};

module.exports=Locale;