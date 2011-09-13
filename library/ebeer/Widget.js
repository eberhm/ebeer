/**
*@constructor
*/
var Widget = function(){};

Widget.prototype._load = function() {
    return true;
};

/**
* This flag shows whether the widgets has been loaded (through AJAX) or not
* @type Boolean
*/
Widget.prototype.loaded = false;

/**
* The name for the widget.
* @type String
*/
Widget.prototype.name = 'NotFinalWidget';

/**
* Sets the initialization order. This sorts out the dependencies between widgets.
*
   * @type Int
*/
Widget.prototype.loadOrder = 1;


Widget.prototype._doInit = function(){
};

/**
* This method will be called every time a widget it's loaded by the Widget controller
*/
Widget.prototype.init = function() {
	if (!this._load()) return false;
	
	this._doInit();
	    
    this.loaded = true;
    return true;
};
