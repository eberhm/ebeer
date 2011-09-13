/**
 * LikeMondo
 *
 *
 * @version $Id: $
 * @category Application
 * @package Widget
 * @copyright (c) Copyright Emagister
 */

/**
 * AjaxImageUploader class
 *
 * @category Application
 * @package Widget
 * @constructor
 */
var Widget_AjaxImageUploader = function(){
};

Widget_AjaxImageUploader.prototype = new Widget();

/**
 * Indicates the name of the widget.
 * @type String
 */
Widget_AjaxImageUploader.prototype.name = 'ajaximageuploader';

/**
 * Sets the inicialization number order of the widget.
 * Goes between 1 and 9 and is used commonly for resolve widgets dependecies.
 * @type Int
 */
Widget_AjaxImageUploader.prototype.loadOrder = 9;

/**
 * This method is used by the Widget Controller to inicialize the widget. 
 */
Widget_AjaxImageUploader.prototype._doInit = function() {
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

app.widgets.loadWidget(new Widget_AjaxImageUploader());