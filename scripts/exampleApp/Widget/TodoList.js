/**
 *
 * @category Application
 * @package Widget
 * @constructor
 */
define('exampleApp/Widget/TodoList',
    [
        'ebeer/Widget',
        'exampleApp/main',
        'exampleApp/Element/TodoRow',
        'exampleApp/Model/TodoItem',
        'ebeer/Element/AjaxForm'
    ],
    function (Widget, myApp, TodoRow, TodoItem, AjaxForm) {

        var Examples_Widget_TodoList = function () {
        };

        Examples_Widget_TodoList.prototype = new Widget();

        Examples_Widget_TodoList.prototype.name = 'todolist';

        Examples_Widget_TodoList.prototype.loadOrder = 1;

        /**
         * This method is used by the Widget Controller to inicialize the widget.
         */
        Examples_Widget_TodoList.prototype._doInit = function () {
            var _mthis = this;

            this.rows = [];

            $('.add_btn').click(function() {
                row = new TodoRow(new TodoItem(new Date().getTime(), prompt('titulo', 'nueva tarea')));
                _mthis.rows.push(row);
                $('.app_todoList_container').append(row.render());
            });

            new AjaxForm('.app_todoList form');
        };

        myApp.widgets.loadWidget(new Examples_Widget_TodoList());
    });