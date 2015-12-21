/**
 * Constants.js
 */
var Constants={};

/**
 * Mandator
 */
Constants.mandator='iContainer';
Constants.getMandator=function() { return this.mandator; };
Constants.setMandator=function(pMandator) { if(pMandator) this.mandator=pMandator; };

module.exports=Constants;