define('exampleApp/Element/TodoRow', [], function() {
    var TodoRow = function (model) {
        this.init(model);
    };

    TodoRow.prototype.init = function (model) {
        var _mthis = this;

        this.model = model;

        $(this.model)
            .on('done', $.proxy(this.remove, this))
            .on('change', $.proxy(this.render, this));

        var html = '<li><span class="title">' + this.model.get('title') + '</span><span class="remove"> X </span></li>';
        this.view = $(html);
        this.view.find('.remove').on('click', $.proxy(this.model.markDone, this.model));
        this.view.find('.title').on('click',
            function(){
                _mthis.model.set('title', prompt('Edita la tarea', _mthis.model.get('title')));
            });
    };

    TodoRow.prototype.render = function () {
        this.view.find('.title').html(this.model.get('title'));
        return this.view;
    };

    TodoRow.prototype.remove = function () {
        this.view.remove();
    };

    return TodoRow;
});