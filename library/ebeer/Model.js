
var Model = function(id) {
    this.id = id;
};

Model.prototype.getElement = function(id) {
	if (this.id == id) {
		return this;
	} else {
		return false;
	}
};

Model.prototype.set = function(key, value) {
	eval('this.'+key+'='+value);
	$(this).trigger('change');
};

Model.prototype.get = function(key) {
	return eval('this.'+key);
};