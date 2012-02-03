/**
 * TodoList widget
 *
 *
 * @version $Id: $
 * @category Application
 * @package Widget
 */

/**
 *
 * @category Application
 * @package Widget
 * @constructor
 */
var Examples_Widget_TodoList = function(){
};

Examples_Widget_TodoList.prototype = new Widget();

/**
 * Indicates the name of the widget.
 * @type String
 */
Examples_Widget_TodoList.prototype.name = 'todolist';

/**
 * Sets the inicialization number order of the widget.
 * Goes between 1 and 9 and is used commonly for resolve widgets dependecies.
 * @type Int
 */
Examples_Widget_TodoList.prototype.loadOrder = 1;

/**
 * This method is used by the Widget Controller to inicialize the widget. 
 */
Examples_Widget_TodoList.prototype._doInit = function() {
	var _mthis = this;
	
	this.placeholder = $('.app_todoList');
	this.list = this.placeholder.find('li');
	
	this.placeholder.find('add').click(function(){
		var title = prompt('Type in the title:');
		var todoItem = new Examples_Model_TodoItem();
		todoItem.setTitle(title);
		var elem = new Examples_ELement_TodoRow(todoItem, {
			onRemove: function() {
				alert('item removed');
			}
		});
		
		_mthis._addItem(elem);
	});
};

Examples_Widget_TodoList.prototype._addItem = function(elem) {
	this.list.append(elem.render());
};

myApp.widgets.loadWidget(new Examples_Widget_TodoList());