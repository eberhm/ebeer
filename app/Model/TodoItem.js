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
var Examples_Model_TodoItem = function(id) {
    this.id = id;
    this.title = null;
    this.description = null;
};

Examples_Model_TodoItem.prototype = new Model();

/**
 * 
 */
Examples_Model_TodoItem.prototype.logout = function(callback) {

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
Examples_Model_TodoItem.prototype.login = function(serializedFields) {
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
Examples_Model_TodoItem.prototype.setTitle = function(aName) {
	this. = aName;
};

/**
 * 
 */
Examples_Model_TodoItem.prototype.setSurname = function(aSurname) {
	this.surname = aSurname;
};

/**
 * 
 */
Examples_Model_TodoItem.prototype.getName = function() {
	return this.name;
};

/**
 * 
 */
Examples_Model_TodoItem.prototype.getSurname = function() {
	return this.surname;
};