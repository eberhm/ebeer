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
var Element_InputDisableCtrlV = function(placeholder, options) {
	this.init(placeholder, options);
};

Element_InputDisableCtrlV.prototype._disclaimerOn = false;

Element_InputDisableCtrlV.prototype._disclaimerTimer = false;

Element_InputDisableCtrlV.prototype.hideDisclaimer = function() {
	var _mthis = this;
	
	this._disclaimerTimer = setTimeout(function() {
		_mthis._doHideDisclaimer();
	}, 5000);
};

Element_InputDisableCtrlV.prototype._doHideDisclaimer = function() {
	$('.app_disableCtrlV_disclaimer').fadeOut(function() {
		$(this).remove();
	});
	this._disclaimerOn = false;
	clearTimeout(this._disclaimerTimer);
};

Element_InputDisableCtrlV.prototype.showDisclaimer = function(element) {
	if (!this._disclaimerOn) {
		clearTimeout(this._disclaimerTimer);
		$(element).parent().append(
    			'<span class="app_disableCtrlV_disclaimer disclaimer">'+
    			app.dict._('MDC_Estás pegando los textos de algún sitio. Es importante que sea una descripción única que no hayas utilizado anteriormente.')+
    			'</span>'
    			);
    	this._disclaimerOn = true;
    }
};

Element_InputDisableCtrlV.prototype.init = function(placeholder, options) {
	var _mthis = this;
	
	this.placeholder = $(placeholder);
	this.settings = {
	};
	
	this.settings = $.extend(this.settings, options);
	var _mthis = this;
	
	var ctrlDown = false;
    var ctrlKey = 17, vKey = 86, cKey = 67, ctrlKeyMac = 91;

    $(document).keydown(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == ctrlKeyMac) {
        	ctrlDown = true;
        }
    }).keyup(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == ctrlKeyMac) {
        	ctrlDown = false;
        	_mthis.hideDisclaimer();
        }
    });

    this.placeholder.keydown(function(e) {
        if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) {
        	_mthis.showDisclaimer(this);
        	return false;
        } else {
        	_mthis._doHideDisclaimer();
        }
    });
};