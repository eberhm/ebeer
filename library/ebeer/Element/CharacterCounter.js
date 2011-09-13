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
 * CharacterCounter class
 *
 * This Element is a character counter that can be attached to any kind of 'writteable' field.
 * For example, a textarea or an input field.
 *
 * @category Application
 * @package Element
 * @constructor
 */
var Element_CharacterCounter = function(placeholder, maxLength){
    this._placeholder = $(placeholder);
    this._maxLength = maxLength;
    
    this._settings = {
    	errorColor: '#ff0000'
    };
    
    this.init();
};

/**
 * 
 */

Element_CharacterCounter.prototype._calculateHeat = function(currentLength) {
	var _mthis = this;
	
	var calcul = (currentLength * 100) / this._maxLength;
	if (calcul <= 70) {
		this._counterBox.css('borderColor','#fff');
	} else if (calcul > 70 && calcul <= 75) {
		this._counterBox.css('borderColor','#fffa7a');
	} else if (calcul > 75 && calcul <= 80) {
		this._counterBox.css('borderColor','#fff600');
	} else if (calcul > 80 && calcul <= 85) {
		this._counterBox.css('borderColor','#ffda77');
	} else if (calcul > 85 && calcul <= 90) {
		this._counterBox.css('borderColor','#feb900');
	} else if (calcul > 90 && calcul <= 95) {
		this._counterBox.css('borderColor','##fe5a52');
	} else {
		this._counterBox.css('borderColor','#ff0000');
	}
};


/**
 * This function is used to binding the needed DOM elements.
 */
Element_CharacterCounter.prototype._doBinds = function(){
	var _mthis = this;
	
	this._placeholder.keyup(function(e){
		var charLength = $(this).val().length;

		if (charLength <= (_mthis._maxLength)) {
			_mthis._counterCurrent.html(charLength);
			_mthis._calculateHeat(charLength);
			return true;
		} else {
			var remove_excess_characters = $(this).val().substr(0,_mthis._maxLength);
			_mthis._counterBox.effect("highlight", {'color':_mthis._settings.errorColor}, 1000);
			$(this).val(remove_excess_characters);
			return false;
		}
	});
};

/**
 * This method is used to initialize the element
 */
Element_CharacterCounter.prototype.init = function() {
	var _mthis = this;
	
	this._placeholder.after('<div class="counterBox"><span class="counterCurrent"></span>/<span class="counterMax">' + _mthis._maxLength + '</span></div>');
	
	this._counterBox = this._placeholder.next(".counterBox");
	this._counterCurrent = this._counterBox.children(":first");
	
	this._doBinds();
	
	this._placeholder.trigger('keyup');
};
