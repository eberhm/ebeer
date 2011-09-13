/**
 * Emagister
 *
 *
 * @version $Id: $
 * @category Application
 * @package Element
 * @copyright (c) Copyright Emagister
 */

/**
 * ShareButtons class
 *
 * This widget is used to control the 'share this page' feature.
 *
 * @category Application
 * @package Element
 * @constructor
 */
var Element_SharedButtons = function() {
};

//Element_SharedButtons.prototype = new Element();

/**
 * This method is used to create the boxy layer and put it into the DOM.
 */
Element_SharedButtons.prototype._createBoxy = function(tipo) {
	var _mthis = this;
	
	if (tipo == "shared") {
		this._shareBox = new Boxy("<div class='compartir_inner'></div>", _mthis._boxySettings);
		$(".compartir_inner").html($(".compartir_inhidden").html()).parents("table").addClass("compartir");
		
	} else if (tipo == "embed") {
		this._embedBox = new Boxy("<div class='embed_inner'></div>", _mthis._boxySettings);
		$(".embed_inner").html($(".embed_inhidden").html()).parents("table").addClass("embed");
	}
};

/**
 * 
 */
Element_SharedButtons.prototype._setPosition = function(elem, boxy) {
	var topOffset = elem.offset().top - (boxy.height() / 2);
	var leftOffset = elem.offset().left - (boxy.width() / 2);
	if (leftOffset < 0) leftOffset = elem.offset().left;
	
	boxy.offset({ top: topOffset, left: leftOffset });
};

/**
 * 
 */
Element_SharedButtons.prototype._loadExternalAPIs = function(callback) {

	// The lines below are used to create an async iframe for the Facebook widget.
	var FbSelector = $(".facebook-iframe-wrp", this.placeholder).each(function(){
		var that = this;
		var FbParams = {
				href: $(that).attr("data-url"),
				layout: "button_count",
				show_faces: false,
				action: "like",
				font: "arial",
				colorscheme: "light",
				height: 21
			};

			var FbIframeUrl = "http://www.facebook.com/plugins/like.php?" + $.param(FbParams);	
		    var FbIframeSelector = $(document.createElement('iframe'));
		    FbIframeSelector.attr({
		    	src: FbIframeUrl,
		    	id: "FbIframe",
		    	scrolling: "no",
		    	frameborder: "0",
		    	allowTransparency: true
		    });
		    
		    $(this).append(FbIframeSelector);
		
	});
    
    // The lines below are used to create an async iframe for the Facebook widget.
	var FbSelectorStandard = $(".facebook-iframe-standard-wrp", this.placeholder).each(function(){
		var that = this;
		var FbParams = {
				href: $(that).attr("data-url"),
				layout: "standard",
				show_faces: false,
				action: "like",
				font: "arial",
				colorscheme: "light",
				height: 24
			};

			var FbIframeUrl = "http://www.facebook.com/plugins/like.php?" + $.param(FbParams);	
		    var FbIframeSelector = $(document.createElement('iframe'));
		    FbIframeSelector.attr({
		    	src: FbIframeUrl,
		    	id: "FbIframeStandard",
		    	scrolling: "no",
		    	frameborder: "0",
		    	allowTransparency: true                
		    });
		    
		    $(this).append(FbIframeSelector);
		
	});
    
    // The lines below are used to create an async iframe for the Facebook widget.
    var FbSelectorBox = $(".facebook-iframe-box-wrp", this.placeholder).each(function(){
		var that = this;
		var FbParams = {
				href: $(that).attr("data-url"),
				app_id:187911447928681,
				layout: "box_count",
				show_faces: false,
				action: "like",
				font: "arial",
				colorscheme: "light",
				height: 70
			};
		
			var FbIframeUrl = "http://www.facebook.com/plugins/like.php?" + $.param(FbParams);	
		    var FbIframeSelector = $(document.createElement('iframe'));
		    FbIframeSelector.attr({
		    	src: FbIframeUrl,
		    	id: "FbIframe",
		    	scrolling: "no",
		    	frameborder: "0",
		    	style: "border:none; overflow:hidden; width:74px; height:70px;", 
		    	allowTransparency: true
		    });
		    
		    $(this).append(FbIframeSelector);
		
	});    	
};

/**
 * This method is used to do the binds of compareBox widget with the DOM elements.
 */
Element_SharedButtons.prototype._doBinds = function() {
	var _mthis = this;
	
	this._settings.shareButton.click(function(event) {
		try {
			if(!(_mthis._shareBox)) {
				_mthis._createBoxy("shared");
				_mthis._setPosition($(this), $(".compartir"));
			} else {
				_mthis._shareBox.show();
			}
    	} catch(e) {
    		app.log(_mthis.name + ": Error executing " + event.type + " - " + e.message, "ERROR");
    	}
		return false;
	});

	this._settings.embedButton.click(function(event) {
		try {
			if(!(_mthis._embedBox)) {
				_mthis._createBoxy("embed");
				_mthis._setPosition($(this), $(".embed"));
			} else {
				_mthis._embedBox.show();
			}
    	} catch(e) {
    		app.log(_mthis.name + ": Error executing " + event.type + " - " + e.message, "ERROR");
    	}
		return false;
	});

	//this is a dirty hack because we use a boxy here
	// @todo: when creating the boxy object move the content with the dom 
	//already created
	this._settings.shareFocus.live("click", function() {
		if (this['initialized']) {
			return;
		} else {
			$(this).focus().select();
			this['initialized'] = true;
		}
		
	});
	
	//this is a dirty hack because we use a boxy here
	// @todo: when creating the boxy object move the content with the dom 
	//already created 
	this._settings.shareLnks.live("click", function() {
		if (this['initialized']) {
			return;
		} else {
			window.open($(this).attr("name"), "", 800, 800);
			_gaq.push(['_trackEvent','OtrosTrackings','SocialButtons', app.functions.trim($(this).text())]);
			this['initialized'] = true;
		}		
	});
};

/**
 * This method is used by the Widget Controller to inicialize the widget. 
 */
Element_SharedButtons.prototype.init = function(placeholder) {
	var _mthis = this;
	
	this.placeholder = $(placeholder);
	
	this._settings = {
			shareButton: $(".app_getShareBox", _mthis.placeholder),
			embedButton: $(".app_getEmbedBox", _mthis.placeholder),
			shareFocus: $(".app_shereFocus"),
			shareLnks: $(".app_share")
		};
		
		this._shareBox;
		this._embedBox;
		
		this._boxySettings = {
			title: "&nbsp;", show: true, draggable: false, fixed: true, center: false, closeText: app.dict._("COMMONS_cerrar")
		};
	
    this._doBinds();
    
    this._loadExternalAPIs();
};