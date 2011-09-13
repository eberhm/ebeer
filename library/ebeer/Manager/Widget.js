 /**
 * Widget Manager class
 *
 * This class contains the method to log and initialize all the widgets in the correct order. 
 * 
 * @category Application
 * @constructor
 */
var Manager_Widget = function(){
};

Manager_Widget.prototype._preloaded = [];

/**
* It loads the widget checking first all the dependencies
*
* @param {Widget} aWidget the Widget instance
*
* @return True on success on building the widget object.false otherwise
* @type Boolean
*/
Manager_Widget.prototype.loadWidget = function(aWidget){
    this._preloaded[aWidget.name] = aWidget;
    return true;

    if (aWidget.init()){
        if (!this.getWidget(aWidget.name)) this[aWidget.name] = aWidget;
        return true;
    }
    return false;
};

/**
* It loads the widget checking first all the dependencies
*
* @return True on success on building all widget objects.false otherwise
* @type Boolean
*/
Manager_Widget.prototype.initAll = function(){
    var _FLAG = true;
    var tSize=0;
    for (var aWidget in this._preloaded) {
        if (aWidget == 'indexOf')
            continue;
        if (tSize < this._preloaded[aWidget].loadOrder)
            tSize = this._preloaded[aWidget].loadOrder;
    }

    for (var i = 0; i<=tSize;i++){
        for (var aWidget in this._preloaded) {
            if (aWidget == 'indexOf' || !this._preloaded[aWidget])
                continue;
            if (this._preloaded[aWidget].loadOrder == i) {
                try{
                    if (this._preloaded[aWidget].init()) {
                        this[this._preloaded[aWidget].name] = this._preloaded[aWidget];
                        this._preloaded[aWidget] = false;
                    } else {
                    	app.log(aWidget + ": Error initializing widget " + this._preloaded[aWidget]['name'], "WARNING");
                        _FLAG = false;
                    }
                } catch(e){
                	app.log(aWidget + ": Error initializing - " + e.message, "ERROR");
                }
            }
        }
    }

    return _FLAG;
};

/**
* It returns the widget with the name passed as a parameter
*
* @param {String} name the widget name to get
*
* @return The widget required if exists
* @type Widget
*/
Manager_Widget.prototype.getWidget = function(name){
    if (this[name]) return this[name];
    else return false;
};
