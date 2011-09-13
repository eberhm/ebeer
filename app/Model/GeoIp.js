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
 * GeoIp class
 * This class is used to get the geoip data related to an ip. Use example:
 * 
 * var geoipData = new Model_GeoIp();
 * geoipData.load(function(){
 * 		if (geoipData.loaded) {
 * 			//here we do whatever with the data
 * 		}
 * });
 * 
 * We can also initiate the model with an specific ip. If no ip is set
 * the user internet ip is taken
 * 
 * @category Application
 * @package Model
 * @constructor
 */
var Model_GeoIp = function(ip) {
    this.ip = ip;
};

Model_GeoIp.prototype = new Model();

Model_GeoIp.prototype.country = null;

Model_GeoIp.prototype.province = null;

Model_GeoIp.prototype.coordinates = null;

/**
 * This var is set to false if no data has been loaded from the server yet.
 * It'ss true otherwise
 * 
 * @type boolean
 */
Model_GeoIp.prototype.loaded = false;

Model_GeoIp.prototype.load = function(callback, force) {
	if (!this.loaded || force) {
		var _mthis = this;
		var callback = callback || function(){};
		
		var dataForm = this.ip ? {__geoip : this.ip} : null; 
			
	    $.ajax({
	      type: 'GET',
	      contentType : 'application/json',
	      url: '/ajax/geoipdata',
	      data: dataForm,
	      dataType : 'json',
	      cache :	false,
	      success: function(response) {
	    		_mthis.country = response.country;
	    		_mthis.province = response.province;
	    		_mthis.ip = response.ip;
	    		_mthis.coordinates = response.coordinates;
	    		_mthis.loaded = true;
	    		callback();
	    	},
	      error: function(response) {
	    		callback();
	    	}
	    });
	} else {
		callback();
	}
};


