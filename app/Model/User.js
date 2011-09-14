/**
 * ebeer-MVC
 *
 *
 * @version $Id: $
 * @category Application
 * @package Model
 * @copyright (c) Copyright ebeer-MVC
 */

/**
 * User Model Example
 *
 * @category Application
 * @package Model
 * @constructor
 */
var TestApp_Model_User = function(id) {
    this.id = id;
    this.name = null;
    this.surname = null;
};

TestApp_Model_User.prototype = new Model();

/**
 * 
 */
TestApp_Model_User.prototype.logout = function(callback) {

	var _mthis = this;
	var callback = callback || function(){};

    $.ajax({
      type: 'GET',
      dataType: 'text/html',
      url: '/user/logout',
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
TestApp_Model_User.prototype.login = function(serializedFields) {
	var _mthis = this;
	var responseBack = null;
	
	$.ajax({
		url: '/user/login',
		type: 'POST',
		data: serializedFields,
		cache: false,
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
 * 
 */
TestApp_Model_User.prototype.setName = function(aName) {
	this.name = aName;
};

/**
 * 
 */
TestApp_Model_User.prototype.setSurname = function(aSurname) {
	this.surname = aSurname;
};

/**
 * 
 */
TestApp_Model_User.prototype.getName = function() {
	return this.name;
};

/**
 * 
 */
TestApp_Model_User.prototype.getSurname = function() {
	return this.surname;
};