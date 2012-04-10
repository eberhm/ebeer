define('ebeer/Element/AjaxForm', ['ebeer/Element/Loader'], function(Loader) {
    /**
     * ebeer
     *
     * @version $Id: $
     * @category Application
     * @package Element
     * @copyright (c) Copyright ebeer
     */

    /**
     *
     * @category Application
     * @package Element
     * @constructor
     */
    var AjaxForm = function (placeholder, settings) {
        var placeholder = $(placeholder);
        this.init(placeholder, settings);
    };

    AjaxForm.prototype.init = function (placeholder, otherSettings) {
        var _mthis = this,
            _jqThis = $(_mthis);

        this.placeholder = placeholder;

        this.settings = {
            loader:true
        };

        $.extend(this.settings, otherSettings);


        if (!(this.settings.loader instanceof Loader)) {
            if (true === this.settings.loader) {
                this.loader = new Loader(this.placeholder);
                this.loader.init(this.settings);
            } else {
                //fake loader
                this.loader = {
                    on : function(){},
                    off : this.on
                };
            }
        }

        this.placeholder.submit(function () {
            _mthis.loader.on(true);

            _jqThis.trigger('_submit');

            $.ajax({
                url: _mthis.placeholder.attr("action"),
                dataType: _mthis.placeholder.attr("data-dataType") || 'json',
                data: _mthis.placeholder.serialize(),
                async:true,
                cache:false,
                method: _mthis.placeholder.attr("method"),
                success:function (response) {
                    _jqThis.trigger('success', response);
                    _mthis.loader.off();
                },
                error:function (XMLResponse) {
                    _jqThis.trigger('error', XMLResponse);
                    _mthis.loader.off();
                }
            });

            return false;
        });
    };

    AjaxForm.prototype.submit = function () {
        this.placeholder.submit();
    };

    return AjaxForm;

});