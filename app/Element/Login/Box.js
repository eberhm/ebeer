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
 * This Element is used to control the async login feature of the web.
 * Contempletes both the normal Emagister login and the one trought Facebook Connect.
 * 
 * @category Application
 * @package Element
 * @constructor
 */
var Element_Login_Box = function() {
};

Element_Login_Box.prototype = new Element_Login();

/**
 * This method is used to display the boxy in case that it already exist and creates it if is not.
 * When the boxy is created an async call is made to the server in order to retrieve the signup and login forms.
 */
Element_Login_Box.prototype.show = function(position) {
	var _mthis = this;

	position.top = position.top - 200;
	
	if (this._boxy) {
		this._boxy.show().moveTo(150, position.top);
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
				_mthis.placeholder.prepend('<span class="close"></span>');
				_mthis._initAuthPlaceholder(_mthis.placeholder);
				
				_mthis._boxy = new Boxy(
						_mthis.placeholder, 
						{ 
							x: 150, 
							y: position.top, 
							fixed: false, 
							center: false, 
							modal: false, 
							afterShow: function() {
								_mthis.loader = new Element_Loader(_mthis.placeholder);
								_mthis.loader.init({_loaderSize:'medium'});
								
								ponerCapaOscura(); 
							}, 
							afterHide:function(){
								_mthis.loader.off();
								quitarCapaOscura(); 
							} 
						}
						);
			    // This method is used to asyncroniusly retrieve the Facebook API.
			    _mthis._reInitFacebookAPI();
			    
			    _mthis.placeholder.find(".signin_mail").focus();
    		}
    	});
	}
};

Element_Login_Box.prototype.hide = function(callback) {
	var callback = callback || function() {};
	
	if (this._boxy) {
		this._boxy.hide(callback);
	} else {
		callback();
	}
};