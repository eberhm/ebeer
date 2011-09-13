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
 * InputClearFocus class
 *
 * This element will add clear focus functionality to an input element. When 
 * the user focuses on the element, it will delete its content if it is nly an 
 * example text, etc
 * 
 * @category Application
 * @package Element
 * @constructor
 */
var Element_InputClearFocus = function(placeholder, options) {
	this.init(placeholder, options);
};

Element_InputClearFocus.prototype._alreadyFocused = false;

Element_InputClearFocus.prototype.init = function(placeholder, options) {
	var _mthis = this;
	
	this.placeholder = $(placeholder);
	this.settings = {
		onActivation : function(element){
				app.log('me activo', 'INFO');
			},
		onDeactivation : function(element){
				app.log('me desactivo', 'INFO');
			},
		activeCss : {
			color: '#000'
			},
		exampleCss : {
			color: '#999'
			}
	};
	
	this.settings = $.extend(this.settings, options);
	var statusActive = false;
	
	this.placeholder.focus(function(){
    	if (! _mthis._alreadyFocused) {
    		this['mainText'] = $(this).val();
    		$(this).val('').css(_mthis.settings.activeCss);
    		if (!this['_clearFocusInitialized']) {
    			$(this).blur(function(){
        	    	if ($(this).val() == '') {
        	    		$(this).val(this['mainText']).css(_mthis.settings.exampleCss);
        	    		_mthis._alreadyFocused = false;  
        	    	}	
        	    });
    			this['_clearFocusInitialized'] = true;
    		}
    		
    		_mthis._alreadyFocused = true;
    	}
    }).keyup(function(){
    	if ($(this).val().replace(/ /g, '') != '') {
    		var newStatusActive = true;
    	} else {
    		var newStatusActive = false;
    	}
    	
    	if (statusActive != newStatusActive) {
    		statusActive = newStatusActive;
    		if (newStatusActive) {
    			_mthis.settings.onActivation(_mthis);
    		} else {
    			_mthis.settings.onDeactivation(_mthis);
    		}
    	}	
    }).css(this.settings.exampleCss);
	
	this.settings.onDeactivation(this);
};