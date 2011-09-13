/**
 * Emagister
 *
 * @version $Id: $
 * @category Application
 * @package Element
 * @copyright (c) Copyright Emagister
 */

 /**
 * 
 * @category Application
 * @package Element
 * @constructor
 */
var Element_AjaxForm = function(placeHolder, settings) {
	var placeHolder = $(placeHolder);
	this.init(placeHolder, settings);
};

Element_AjaxForm.prototype.init = function(placeHolder, otherSettings) {
	var _mthis = this;
	
	this.placeHolder = placeHolder;
	
	this.settings = {
		loader : true,
		successHandler : function() {},
		errorHandler: function() {},
		onSubmitHandler: function(){}
	};
	
	$.extend(this.settings, otherSettings);
	
	if (this.settings.loader) {
		this.loader = new Element_Loader(this.placeHolder);
		this.loader.init(this.settings);
	}
	
	this.placeHolder.submit(function() {
		if (_mthis.settings.loader) _mthis.loader.on(true);
		
		_mthis.settings.onSubmitHandler();
		
		$.ajax({
	        url: _mthis.placeHolder.attr("action"),
	        dataType: 'json', //change this
	        data: _mthis.placeHolder.serialize(),
	        async: true,
	        cache: false,
	        method: _mthis.placeHolder.attr("method"),
	        success: function(response) {
				try {
					_mthis.settings.successHandler(response);
				} catch (e) {
					if (_mthis.settings.loader) _mthis.loader.off();
				}
				
				if (_mthis.settings.loader) _mthis.loader.off();
			},
	        error: function(XMLResponse) {
				try {
					_mthis.settings.errorHandler(XMLResponse);
					if (_mthis.settings.loader) _mthis.loader.off();
				} catch (e) {
					if (_mthis.settings.loader) _mthis.loader.off();
				}
				
				if (_mthis.settings.loader) _mthis.loader.off();
			}
	    });
		
		return false;
	});
};

Element_AjaxForm.prototype.submit = function() {
	this.placeHolder.submit();
};