define('ebeer/Model', [], function() {
    var Model = function() {
    };

    Model.prototype.data;

    Model.prototype.set = function(key, value) {
        if (!this.data) {
            this.data = [];
        }
        if (key instanceof Object) {
            $.extend(this.data, key);
        } else {
            this.data[key] = value;
        }
        $(this).trigger('change');
    };

    Model.prototype.get = function(key) {
        if (!this.data) {
            this.data = [];
        }
        if (!key) {
            return this.data;
        } else {
            return this.data[key];
        }
    };

    return Model;
});