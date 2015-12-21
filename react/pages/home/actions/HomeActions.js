/**
 * HomeActions.js
 */
var Reflux=require('reflux');

var HomeActions=Reflux.createActions([
    "getHomePageComponent",
    "getCompositeHomePageComponent",
    "getHomePageModel",
    "allSectionsLoaded",
    "scrollToSection",
    "scrolledToSection"
]);

module.exports=HomeActions;
