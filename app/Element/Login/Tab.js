/**
 * ebeer-MVC
 *
 *
 * @version $Id: $
 * @category Application
 * @package Element
 * @copyright (c) Copyright ebeer-MVC
 */

 /**
 * This Element implements the login tab. It can be attached to any link
 * Example:
 * var myLoginTab = new TestApp_Element_Login_Tab();
 * mylognTab.init({
 * 	   tabPlaceholder: $('.myLoginLink'),
 * 	   activateOnClick: true
 * });
 * 
 * @category Application
 * @package Element
 * @constructor
 */
var TestApp_Element_Login_Tab = function() {
};

TestApp_Element_Login_Tab.prototype = new TestApp_Element_Login();

TestApp_Element_Login_Tab.prototype.show = function(position) {
	if (this._tab) {
		this._tab.show();
	} else {
		this._tabPlaceholder = $(this._settings.tabPlaceholder);
	    this.placeholder = this._tabPlaceholder.find(".asyncAuth-layer");
		this._initAuthPlaceholder(this.placeholder);
	    this.loader = new Element_Loader(this.placeholder);
	    this.loader.init({_loaderSize:'medium'});
	    this._tab = new Element_Tab();
		this._tab.init(this._tabPlaceholder, this._settings);
		this._tab.setContent(this.placeholder);
	}
    //_mthis._reInitFacebookAPI();
    //this.placeholder.find(".signin_mail").focus();
   
};

TestApp_Element_Login_Tab.prototype.hide = function(callback) {
	var callback = callback || function() {};
	
	if (this._tab) {
		this._tab.hide(callback);
	} else {
		callback();
	}
};