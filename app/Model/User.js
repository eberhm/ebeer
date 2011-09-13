/**
 * Emagister
 *
 *
 * @version $Id: $
 * @category Application
 * @package Model
 * @copyright (c) Copyright Emagister
 */

/**
 * User class
 *
 * 
 *
 * @category Application
 * @package Model
 * @constructor
 */
var Model_User = function(id) {
    this.id = id;
    this.name = null;
    this.surname = null;
};

Model_User.prototype = new Model();

/**
 * 
 */
Model_User.prototype.logout = function(callback) {

	var _mthis = this;
	var callback = callback || function(){};

    $.ajax({
      type: 'GET',
      dataType: 'text/html',
      url: '/usuario/login/desconectar',
      data: null,
      success: function(data) {
    		callback(data);
    		$(_mthis).trigger('userLoggedOut', data);
    	},
      error: function(data) {
    		callback(data);
    	}
    });
};

/**
 * This function is used to make an asyncronious call to the server in order to log in a user.
 */
Model_User.prototype.login = function(serializedFields) {
	var _mthis = this;
	var responseBack = null;
	
	$.ajax({
		url: '/usuario/login/login',
		type: 'POST',
		data: serializedFields,
		cache: false,
		async: false,
		success: function(response) {
			responseBack = response;
			switch (response.errCode) {
				// Registro de usuario realizado correctamente
				case 0:
					$(document).trigger('userLoggedIn', response);
					break;
					
				// Registro de usuario con errores, revisar esto
				case 1:
					break;
			};
		}
	});
	return responseBack;
};

/**
 * This method is used to do an SYNCRONOUS in order to register a new user.
 */
Model_User.prototype.register = function(serializedFields) {
	var _mthis = this;
	var responseBack = null;
	
	$.ajax({
		url: '/usuario/login/alta',
		type: 'POST',
		data: serializedFields,
		cache: false,
		async: false,
		success: function(response) {
			responseBack = response;
			switch (response.errCode) {
				// Registro de usuario realizado correctamente
				case 0:
					$(document).trigger('userRegistered', response);
					break;
					
				// Registro de usuario con errores, revisar esto
				case 1:
					break;
			};
		}
	});
	return responseBack;
};

/**
 * 
 */
Model_User.prototype.setName = function(aName) {
	this.name = aName;
};

/**
 * 
 */
Model_User.prototype.setSurname = function(aSurname) {
	this.surname = aSurname;
};

/**
 * Function to set if the logged user is a 'Facebook' user
 */
Model_User.prototype.setFacebook = function(isFacebookUser) {
	if (isFacebookUser) {
		$.jStorage.set('isFacebookUser', true);
	} else {
		$.jStorage.deleteKey('isFacebookUser');
	}
};

/**
 * 
 */
Model_User.prototype.getName = function() {
	return this.name;
};

/**
 * 
 */
Model_User.prototype.getSurname = function() {
	return this.surname;
};

/**
 * Returns if the logged user is a 'Faebook' user
 */
Model_User.prototype.getFacebook = function() {
	return $.jStorage.get('isFacebookUser', false);
};
