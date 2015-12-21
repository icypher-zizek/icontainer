/**
 * LoginActions.js
 */
var Reflux=require('reflux');

var LoginActions=Reflux.createActions([
    "loginUser",
    "logoutUser",
    "getCurrentUser"
]);

module.exports=LoginActions;
