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
var Element_Login = function() {
};

Element_Login.prototype.placeholder = null;

/**
 * This method is used to display the boxy in case that it already exist and creates it if is not.
 * When the boxy is created an async call is made to the server in order to retrieve the signup and login forms.
 */
Element_Login.prototype.show = function(position) {
	//to be implemented in the concrete class
	throw Exception('Method not implemented in the concrete class');
};

Element_Login.prototype.hide = function(callback) {
	//to be implemented in the concrete class
	throw Exception('Method not implemented in the concrete class');
};

/**
 * When the user fulfill the register form, we use this method to control the correct
 * register in the server side.
 * The register attempt could response two different status:
 * 0 - Everything was ok, user created, logged in and being redirecting.
 * 1- Some of the required fields responses an error, a tooltip is showed.
 */
Element_Login.prototype._makeRegisterRequest = function() {
	var _mthis = this;
	this.loader.on(true);
	
	var usuarioLogado = new Model_User();
	var result = usuarioLogado.register(this.placeholder.find(".register-form").serialize());
	this.placeholder.find(".campo-erroneo-register").poshytip('disable').removeClass('campo-erroneo-register');
	if (result.errCode == 0) {
        _mthis._settings.onLoginSuccess(result);
	} else if (result.errCode == 1) {
		this.loader.off();
		$.each(result.messages, function(key, value) {
			var campo = ".register_" + key;
			
			// @TODO: En vez de llamar directa,mente al plugin del tooltip, usar el Element de abstracción Tooltip
			_mthis.placeholder.find(campo).addClass("campo-erroneo-register").poshytip({
    			content: value,
    			className: 'tip-twitter',
    			showTimeout: 1,
    			showOn: 'focus',
    			alignTo: 'target',
    			alignX: 'right',
    			alignY: 'center',
    			offsetX: 5
    		});
		});
		$(".campo-erroneo-register:first").focus();
	}
	
};

/**
 * This method is used to make an asyncronious login request to the server.
 * There're two possible answers:
 *     errCode 0 stablishes that everything goes fine. The User is now logged. The User Module also triggers a refresh event.
 *     errCode 1 is used to return an error in one of the fields or of any other kind. 
 */
Element_Login.prototype._makeLoginRequest = function() {
	var _mthis = this;
	this.loader.on(true);
	
	var usuarioLogado = new Model_User();
	var result = usuarioLogado.login(this.placeholder.find(".login-form").serialize());
	this.placeholder.find(".campo-erroneo-login").poshytip('disable').removeClass('campo-erroneo-register');
	this.loader.off();
	if (result.errCode == 0) {
		this._settings.onLoginSuccess(result);
	} else if (result.errCode == 1) {
	    // @TODO: En vez de llamar directa,mente al plugin del tooltip, usar el Element de abstracción Tooltip
		$.each(result.messages, function(key, value) {
			var campo = ".signin_" + key;
			_mthis.placeholder.find(campo).addClass("campo-erroneo-login").poshytip({
				content: value,
				className: 'tip-twitter',
				showTimeout: 1,
				showOn: 'focus',
				alignTo: 'target',
				alignX: 'right',
				alignY: 'center',
				offsetX: 5
			});
		});
		
		this.placeholder.find(".campo-erroneo-login:first").focus();
		
		this._settings.onLoginError(result);
	}
	
};

/**
 * This method is used to do the reInitialization of the Facebook API in order to attach
 * the needed functionallity to the 'Facebook Connect' button that loads asincroniusly.
 */
Element_Login.prototype._reInitFacebookAPI = function() {
    FB.init({appId: _egc.facebookAppId, status: true, cookie: true, xfbml: true, oauth: true});
};

Element_Login.prototype.tryLoginSuccess = function(position) {
	if ((app.activeEntity) && (app.activeEntity.type == "user")) {
		this._settings.onLoginSuccess();
	} else {
		this.show(position);
	}
};


Element_Login.prototype._initAuthPlaceholder = function(jContent) {
	var _mthis = this;
	
	jContent.find(".app_showLoginFB").click(function(e) {
		e.preventDefault();
		jContent.find(".auth-lnk").removeClass("active");
		$(this).parent().addClass("active");
		jContent.find(".facebook-login").fadeIn("normal");
		jContent.find(".emagister-register, .emagister-login").hide();
		
	});
	jContent.find(".app_showLoginEmagister").click(function(e) {
		e.preventDefault();
		jContent.find(".auth-lnk").removeClass("active");
        $(this).parent().addClass("active");
		jContent.find(".emagister-login").fadeIn("normal");
		jContent.find(".emagister-register, .facebook-login").hide();
		
	});
	jContent.find(".app_showRegisterEmagister").click(function(e) {
		e.preventDefault();
		jContent.find(".auth-lnk").removeClass("active");
        $(this).parent().addClass("active");
		jContent.find(".emagister-register").fadeIn("normal");
		jContent.find(".facebook-login, .emagister-login").hide();
		
	});
	jContent.find(".app_sendAsyncRegister").click(function(e) {
		e.preventDefault();
		_mthis._makeRegisterRequest();
	});
	jContent.find(".app_sendAsyncLogin").click(function(e) {
		e.preventDefault();
		_mthis._makeLoginRequest();
	});
	jContent.find(".app_bypassLogin").click(function(e) {
		e.preventDefault();
		_mthis._settings.onLoginBypass();
	});
	jContent.find(".login-recupera-lnk").click(function(e) {
		/*e.preventDefault();
		@todo: show password recovery layer here*/
	});
	
	$(".fb_button").live('click', function(e) {
		if (!$(e.target).parents().is(_mthis.placeholder)) {
			return;
		}
		_mthis.loader.on(true);
		fbLoginCallback = function(fbUser) {
			fbLoginCallback = function(fbUser){};
	        FB.getLoginStatus(function(response) {
	            if (response.status === 'connected') {
	                // When user log in
	                $.ajax({
	                    url: "/usuario/login/ajaxfacebook",
	                    dataType: 'json',
	                    cache: false,
	                    async: false,
	                    success: function(response) {
	                		if (response.errCode == 0) {
	        	                
	        	                var _entity = app.getActiveEntity();
	                        	_entity.setFacebook(true);
	                        	_mthis._settings.onLoginSuccess(response);
	                		} else if (response.errCode == 1) {
	                			this.placeholder.find(".facebook-login").append(app.dict._("Error al logarse en Facebook, ¡intenta de nuevo!"));
	        	                
	        	                // When the message of the box changes, the height of the box changes, so the loader is refreshed.
	        	                if (_mthis.loader) {
	            	    			_mthis.loader.off();
	            	    			//_mthis._settings.onLoginError(response);
	            	    		}
	                		}
	                    }
	                }); 
	            } else {
	                // When user no accpet conditions, or close the windowuser is not logged in
	            	
	                // Disable spin
	        		if (_mthis.loader) {
	        			_mthis.loader.off();
	        		}
	            }
	        });
		};
	});
	
	if (this._settings.disclaimerContent) {
		jContent.find('.app_loginDisclaimer').html(_mthis._settings.disclaimerContent);
	}
};

/**
 * This method is used by the Widget Controller to inicialize the widget. 
 */
Element_Login.prototype.init = function(settings) {
	var _mthis = this;
	
	this._settings = {
			onLoginSuccess : function(response) {},
			onLoginError : function(response) {},
			onLoginBypass : function() {},
			disclaimerContent : null,
			allowBypass : false
		};
	
	$.extend(this._settings, settings);
};