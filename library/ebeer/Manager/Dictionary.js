/**
* @fileoverview This class will manage the translations on the application
*
*/

var Manager_Dictionary = function() {};

Manager_Dictionary.prototype._entries = null;

/**
* It loads the dictionary entries
*
* @param {array} Disctionary entries loaded from dictionary directory
*/
Manager_Dictionary.prototype.addTranslations = function(translations){
	this._entries = translations;
};

/**
* Returns the translated string
*
* @param {String} Dictionary key
*
* @return the translated string
* @type String
*/
Manager_Dictionary.prototype._ = function (key){
	try {
		return this._entries[key] || key;
	} catch (e) {
		return key;
	}
};