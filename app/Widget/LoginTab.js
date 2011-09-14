/**
 * LikeMondo
 *
 *
 * @version $Id: $
 * @category Application
 * @package Widget
 * @copyright (c) Copyright ebeer-MVC
 */

/**
 * AjaxImageUploader class
 *
 * @category Application
 * @package Widget
 * @constructor
 */
var TestApp_Widget_LoginTab = function(){
};

TestApp_Widget_LoginTab.prototype = new Widget();

/**
 * Indicates the name of the widget.
 * @type String
 */
TestApp_Widget_LoginTab.prototype.name = 'LoginTab';

/**
 * Sets the inicialization number order of the widget.
 * Goes between 1 and 9 and is used commonly for resolve widgets dependecies.
 * @type Int
 */
TestApp_Widget_LoginTab.prototype.loadOrder = 9;

/**
 * This method is used by the Widget Controller to inicialize the widget. 
 */
TestApp_Widget_LoginTab.prototype._doInit = function() {
	var _mthis = this;
	
	$('.app_ajaxImageUploader').each(function(){
		var uploader = new qq.FileUploader({
		    element: this,
		    action: '/image/upload2',
			onComplete: function(id, fileName, responseJSON){
				$('.app_ajaxImageUploader_uploadedImage').html(responseJSON.html);
				var cropper = new Element_ImageCropper($('.app_imageCropper'));
				cropper.init();
			},
	        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif']
		});
	});
};

myApp.widgets.loadWidget(new TestApp_Widget_LoginTab());