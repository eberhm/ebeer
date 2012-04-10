define('exampleApp/Model/TodoItem', ['ebeer/Model'], function(Model) {
    var TodoItem = function(id, title) {
        this.set({
            id : id,
            title : title
        });
    };

    TodoItem.prototype = new Model;

    TodoItem.prototype.markDone = function() {
        $(this).trigger('done');
        console.log('item done '+this.get('id'));
    };

    return TodoItem;
});