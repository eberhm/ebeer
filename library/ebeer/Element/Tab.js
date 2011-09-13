var Element_Tab = function() {
	
};

Element_Tab.prototype.mouseOnTab = false;
Element_Tab.prototype.showing = false;

Element_Tab.prototype.init = function(placeholder, settings) {
	var _mthis = this;
	
	this.placeholder = $(placeholder);
	
	this._settings = {
			onEndShow : function() {},
			onEndHide : function() {},
			classname : '',
			activateOnClick : false,
			activateOnHover : true
		};
	$.extend(this._settings, settings);
	
	this._initPlaceholder(this.placeholder);
};

Element_Tab.prototype.setContent = function(content) {
	this._tab.html(content);
};

Element_Tab.prototype._initPlaceholder = function(placeholder) {
	var _mthis = this;
	
	if (!this._tab) {
		this._tab = $('<div class="app_tab '+_mthis._settings.classname+'" style="display:none;"></div>');
		this._tab.hover(function(){
			_mthis.mouseOnTab = true;
		},
		function(){
			_mthis.mouseOnTab = false;
		});
		
		placeholder.append(this._tab);
	}
	
	if (this._settings.activateOnClick) {
		placeholder.click(function() {
			if (_mthis.showing) {
				_mthis.hide();
			} else {
				_mthis.show();
			}
		});
	}
	
	if (this._settings.activateOnHover) {
		placeholder.hover(
			function() {
				_mthis.show();
			},
			function() {
				if (!_mthis.mouseOnTab) {
					_mthis.hide();
				}
			}
		);
	}
	
	
};

Element_Tab.prototype.show = function() {
	this._tab.show();
	this.showing = true;
	this.placeholder.addClass('app_tabActive');
};

Element_Tab.prototype.hide = function() {
	this._tab.hide();
	this.showing = false;
	this.placeholder.removeClass('app_tabActive');
};