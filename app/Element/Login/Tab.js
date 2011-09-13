/**
 * Emagister
 *
 *
 * @version $Id: $
 * @category Application
 * @package Element
 * @copyright (c) Copyright Emagister
 */

 /**
 * This Element implements the login tab. It can be attached to any link
 * Example:
 * var myLoginTab = new Element_Login_Tab();
 * mylognTab.init({
 * 	   tabPlaceholder: $('.myLoginLink'),
 * 	   activateOnClick: true
 * });
 * 
 * @category Application
 * @package Element
 * @constructor
 */
var Element_Login_Tab = function() {
};

Element_Login_Tab.prototype = new Element_Login();

Element_Login_Tab.prototype.show = function(position) {
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

/**
 * This method is used to display the tab in case that it already exist and creates it if is not.
 * When the tab is created an async call is made to the server in order to retrieve the signup and login forms.
 */
Element_Login_Tab.prototype.show2 = function() {
	var _mthis = this;
	
	if (this._tab) {
		this._tab.show();
	} else {
		$.ajax({
    		url: '/usuario/login/auth',
    		type: 'GET',
    		data: {
				allowBypass : _mthis._settings.allowBypass
			},
    		cache: false,
    		success: function(response) {
				_mthis.placeholder = $(response);
				_mthis._initAuthPlaceholder(_mthis.placeholder);
				
				_mthis.loader = new Element_Loader(_mthis.placeholder);
				_mthis.loader.init({_loaderSize:'medium'});
				
				_mthis._tab = new Element_Tab();
				_mthis._tab.init(_mthis._settings.tabPlaceholder, _mthis._settings);
				_mthis._tab.setContent(_mthis.placeholder);
				
			    // This method is used to asyncroniusly retrieve the Facebook API.
			    _mthis._reInitFacebookAPI();
			    
			    _mthis.placeholder.find(".signin_mail").focus();
    		}
    	});
	}
};

Element_Login_Tab.prototype.hide = function(callback) {
	var callback = callback || function() {};
	
	if (this._tab) {
		this._tab.hide(callback);
	} else {
		callback();
	}
};