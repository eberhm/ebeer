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
 * Center class
 *
 * 
 *
 * @category Application
 * @package Model
 * @constructor
 */
var Model_Center = function(id) {
    this.id = id;
    this.name = null;
};

Model_Center.prototype = new Model();

/**
 * 
 */
Model_Center.prototype.logout = function(callback) {
	return;
	var _mthis = this;
	var callback = callback || function(){};
/*
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
    }); */
};

/**
 * 
 */
Model_Center.prototype.setName = function(aName) {
	this.name = aName;
};

/**
 * 
 */
Model_Center.prototype.getName = function() {
	return this.name;
};

