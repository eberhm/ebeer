
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