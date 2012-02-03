var Examples_Element_TodoRow = function(model, settings) {
	this.init(model, settings);
};

Examples_Element_TodoRow.prototype.init = function(model, settings) {
	var _mthis = this;
	
	this._settings = {
			onRemove : function(response) {}
		};
	$.extend(this._settings, settings);
};

Examples_Element_TodoRow.prototype.render = function() {
	var _mthis = this;
	
	var html = '<li>'+this.model.title+'<img src="" class="remove"/></li>';
	this.placeholder = $(html);
	this.placeholder.find('.remove').click(function(){
		_mthis.remove();
	});
	
	return this.placeholder;
};

Examples_Element_TodoRow.prototype.remove = function() {
	//removes the element
	this.placeholder.remove();
	
	//user callback with mock empty responde
	this._settings.omRemove({});
};