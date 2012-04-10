
define('ebeer/Element/Loader', [], function() {
    /**
     * App Loader Class
     *
     * See class for detailed explanation
     *
     * @package Element
     */
    var LOADER_IMAGE_SMALL = '/scripts/ebeer/resources/img/loader-small.gif';
    var LOADER_IMAGE_MEDIUM = '/scripts/ebeer/resources/img/loader-medium.gif';
    var LOADER_IMAGE_BIG = '/scripts/ebeer/resources/img/loader-big.gif';

    /**
     * App Loader Class
     *
     * Creates a loader considering the placeholder.
     *
     * Note: The element passed as placeholder MUST have position:relative
     * Recommended also for the placeholder to have a width and height
     *
     * Usage example:
     *
     * var myLoader = new Element_loader($('.app_Placeholder'), {
     *   ...my settings
     * });
     * myLoader.init();
     *
     * ...later in the code
     *
     * myLoader.on();
     *
     * ...later in the code
     *
     * myLoader.off();
     *
     * @package Element
     * @constructor
     */
    var Loader = function (placeholder) {
        this.placeholder = $(placeholder);
    };

    Loader.prototype.placeholder;
    Loader.prototype._imageLoaderOb;
    Loader.prototype._loaderImg;
    Loader.prototype._isOn;

    Loader.prototype.init = function(settings) {
        var _mthis = this;

        if (this.placeholder.length != 1) {
            app.log('ERROR, placeholder not found for this loader', 'WARNING');
            return;
        }

        this.settings = {
            imgSmall : LOADER_IMAGE_SMALL,
            imgMedium : LOADER_IMAGE_MEDIUM,
            imgBig : LOADER_IMAGE_BIG,
            imgInline : LOADER_IMAGE_SMALL,
            size : 'large',
            zIndex : 2,
            backgroundColor :'#FFF'
        };
        $.extend(this.settings, settings);

        this._isOn = false;

        this._imageLoaderObj = $('<div class="loader"></div>');

        var imgPath;
        switch (this.settings.size) {
        case 'small':
            imgPath = this.settings.imgSmall;
            break;
        case 'medium':
            imgPath = this.settings.imgMedium;
            break;
        case 'large':
            imgPath = this.settings.imgBig;
            break;
        default:
            imgPath = this.settings.imgBig;
            break;
        }

        this._loaderImg = $("<img src='" + imgPath + "'\>").load(function() {
            _mthis._setupImg();
        });

        this._imageLoaderObj.html(this._loaderImg).fadeTo("fast", 0);
        this._setup();
    };

    Loader.prototype.refresh = function() {
        this._setup();
        this.refreshImg();
    };

    Loader.prototype.refreshImg = function() {
        this._setupImg();
    };

    /**
     * Turns the loader On. If true is passed as a parameter. It recalculates
     *  all sizes. Recomended for when the placeholder changes its size
     *  (DOM injection, etc)
     */
    Loader.prototype.on = function(forceRefresh) {
        var _mthis = this;

        if (false !== forceRefresh)
            this.refresh();
        this._imageLoaderObj
            .prependTo(this.placeholder)
            .fadeTo(
                "fast",
                0.5,
                function() {
                    _mthis._isOn = true;
                }
            );
    };

    Loader.prototype.off = function(callback) {
        var _mthis = this;

        if (!callback)
            callback = function() {
            };
        this._imageLoaderObj.fadeTo('fast', 0, function() {
            $(this).remove();
            _mthis._isOn = false;
            callback();
        });
    };

    Loader.prototype._setup = function() {
        var _mthis = this;

        try {
            var width = this.placeholder.outerWidth(true);
            var height = this.placeholder.outerHeight(true);

            if (isNaN(width) || isNaN(height))
                return;

            var placeholderCss = {
                width : width + 'px',
                height : height + 'px',
                top : '0px',
                left : '0px',
                position : 'absolute',
                overflow : 'hidden',
                'z-index' : _mthis.settings.zIndex,
                'background-color' : _mthis.settings.backgroundColor
            };

            this._imageLoaderObj.css(placeholderCss);
        } catch (e) {
            app.log('There was an error setting up the loader: ' + e.message,
                    'WARNING');
        }

    };

    Loader.prototype._setupImg = function() {
        if (!this.placeholder)
            return;

        var imgDom = this._loaderImg.get(0);
        var width = (this._imageLoaderObj.width() - imgDom.width)/2;
        var top = (this._imageLoaderObj.height() - imgDom.height)/2;
        if (isNaN(width) || isNaN(top))
            return;
        var loaderCss = {
            position : 'absolute',
            'margin-top' : top + 'px',
            'margin-left' : width + 'px',
            left : '0px',
            top : '0px'
        };
        this._loaderImg.css(loaderCss);
    };

    return Loader;
});