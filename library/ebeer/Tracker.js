/**
 * Emagister
 *
 *
 * @version $Id: $
 * @category Application
 * @copyright (c) Copyright Emagister
 */

/**
 * Tracker class
 *
 * The Tracker class.
 *
 * @category Application
 * @constructor
 */
var Tracker = function() {

   	/**
    * The type for the tracker.
    * @type String
    */
	this.type = null;

   	/**
    * The request for the tracker.
    * @type String
    */
	this._request = null;
	
	var _mthis = this;
	
	this.execute = function(request){
		_mthis._request = request;
		//do something
	};
	
	this._doExecute = function(data){
		//do something really specific
	};
	
	this._evalTrackingLines = function(arrayTags){
		for(var aTag in arrayTags){
			if (aTag == 'indexOf') continue;
			eval(arrayTags[aTag]);
		}
	};
	
};