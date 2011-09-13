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
var Element_Login_Page = function() {
};

Element_Login_Page.prototype = new Element_Login();

/**
 * This method is used to display the boxy in case that it already exist and creates it if is not.
 * When the boxy is created an async call is made to the server in order to retrieve the signup and login forms.
 */
Element_Login_Page.prototype.show = function(position) {
        
	var _mthis = this;
    _mthis.placeholder = $(".app_loginPage");
	_mthis._initAuthPlaceholder(_mthis.placeholder);
    _mthis.loader = new Element_Loader(_mthis.placeholder);
    _mthis.loader.init({_loaderSize:'medium'});
    //_mthis._reInitFacebookAPI();
    _mthis.placeholder.find(".signin_mail").focus();
   
};
