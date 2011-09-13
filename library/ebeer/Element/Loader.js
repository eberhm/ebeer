/**
 * App Loader Class
 * 
 * See class for detailed explanation
 * 
 * @version $Id: Loader.js 34045 2010-04-30 09:56:15Z dmartin $
 * @package Element
 * @copyright (c) Copyright App Inc.
 */
var LOADER_IMAGE_SMALL = '/img/web/_common/core/loader-small.gif';
var LOADER_IMAGE_MEDIUM = '/img/web/_common/core/loader-medium.gif';
var LOADER_IMAGE_BIG = '/img/web/_common/core/loader-big.gif';

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
 * var myLoader = new Element_loader($('.app_Placeholder'));
 * MyLoader.init();
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
function Element_Loader(placeholder){
	
    this._placeholder = $(placeholder);
    this._loaderSize = 'large';
    this._imageLoaderObj;
    this._loaderImg;
    this._isOn = false;
    this._zIndex = 2;
    this._customCss = null;
	


    this.init = function(xtraConf, css){
        var _mthis = this;
		
        if (this._placeholder.length != 1) {
            app.log('ERROR, a loader got badly initiated', 'ERROR');
            return;
        }
		
        for(var aConf in xtraConf){
            _mthis[aConf] = xtraConf[aConf];
        }
		
        this._imageLoaderObj = $('<div class="loader"></div>');
		
		
        var imgPath;
        switch (this._loaderSize){
            case 'small' :
                imgPath = LOADER_IMAGE_SMALL;
                break;
            case 'medium' :
                imgPath = LOADER_IMAGE_MEDIUM;
                break;
            case 'large' :
                imgPath = LOADER_IMAGE_BIG;
                break;
            default:
                imgPath = LOADER_IMAGE_BIG;
                break;
        }
		
        this._loaderImg = $("<img src='"+imgPath+"'\>").load(function(){
            _mthis._setupImg();
        });

        this._imageLoaderObj.html(this._loaderImg).fadeTo("fast", 0);
        if (css) this.css(css);
        else this._setup();
		
    };

    this.refresh = function(){
        this._setup();
        this.refreshImg();
    };

    this.refreshImg = function(){
        this._setupImg();
    };
	
    
    /**
     * Turns the loader On. If true is passed as a parameter. It recalculates
     *  all sizes. Recomended for when the placehgolder changes its size 
     *  (DOM injection, etc)
     */
    this.on = function(forceRefresh){
        var _mthis = this;
        
        if (forceRefresh) this.refresh();
        this._imageLoaderObj.prependTo(this._placeholder).fadeTo("fast", 0.5, function(){
            _mthis._isOn = true;
        });
    };

    this.off = function(callback){
        var _mthis = this;
        
        if (!callback) callback = function(){};
        this._imageLoaderObj.fadeTo('fast', 0, function(){
            $(this).remove();
            _mthis._isOn = false;
            callback();
        });
    };
	
    this.css = function(css){
        this._customCss = css;
        this._setup();
    };
	
    this._getElementWidth = function (DOMobject) {
        try{
            return (DOMobject.offsetWidth > 0) ? DOMobject.offsetWidth : parseInt($(DOMobject).css('width'));
        }catch(e) {
            app.log(e.message, 'ERROR');
        }
    };
	
    this._getElementHeight = function (DOMobject) {
        try{
            return (DOMobject.offsetHeight > 0) ? DOMobject.offsetHeight : parseInt($(DOMobject).css('height'));
        }catch(e) {
            app.log(e.message, 'ERROR');
        }
    };
	
    this._getImageTop = function() {
        try{
            var top = (this._getElementHeight(this._imageLoaderObj.get(0)) - this._getElementHeight($('img', this._imageLoaderObj).get(0)))/2;
            return top ? top : this._getElementHeight(this._imageLoaderObj.get(0))/2;
        }catch(e) {
            app.log(e.message, 'ERROR');
        }
    };
	
    this._setup = function(){
        var _mthis = this;
        
        try{
            var width = (this._getElementWidth(this._placeholder.get(0)));
            var height = (this._getElementHeight(this._placeholder.get(0)));
			
            if (isNaN(width) || isNaN(height)) return;
			
            var placeholderCss = {
                width : width+'px',
                height : height+'px',
                top: '0px',
                left: '0px',
                position : 'absolute',
                overflow : 'hidden',
                'z-index' : _mthis._zIndex,
                'background-color' : '#FFF'
            };
			
            this._imageLoaderObj.css(placeholderCss);
            if (this._customCss) this._imageLoaderObj.css(this._customCss);
        } catch(e){
            app.log('There was an error setting up the loader: '+e.message, 'ERROR');
        }
		
    };
	
    this._setupImg = function(){
        if (!this._placeholder) return;
		
        var width = (this._getElementWidth(this._placeholder.get(0)));
        var top = this._getImageTop();
        if (isNaN(width) || isNaN(top)) return;
        var loaderCss = {
            position: 'absolute',
            'margin-top' : (top - 16) +'px',
            'margin-left' : ((width/2)-16)+'px',
            left : '0px',
            top : '0px'
        };
        this._loaderImg.css(loaderCss);
    };
};