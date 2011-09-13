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
 * CharacterCounter class
 *
 * This Element is a character counter that can be attached to any kind of 'writteable' field.
 * For example, a textarea or an input field.
 *
 * @category Application
 * @package Element
 * @constructor
 */
var Element_ImageCropper = function(placeholder){
    this._placeholder = $(placeholder);
};

/**
 * This method is used to initialize the element
 */
Element_ImageCropper.prototype.init = function() {
    var _mthis = this;
    
	this._placeholder.find('.app_imageCropper_form').submit(function(){
		if (_mthis.checkCoords()) {
			_mthis.crop(this);
		}
		return false;
	});
	
	$('#cropbox').Jcrop({
        aspectRatio: 1,
        onSelect: _mthis.updateCoords
    });

};

Element_ImageCropper.prototype.updateCoords = function(c)
{
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
};

Element_ImageCropper.prototype.checkCoords = function()
{
    if (parseInt($('#w').val())) return true;
    alert('Please select a crop region then press submit.');
    return false;
};

Element_ImageCropper.prototype.crop = function(form)
{
	var _mthis = this;
	
	$.ajax({
		url: '/image/crop',
		type: 'POST',
		data: $(form).serialize(),
        success: function(response) {
			var img = '<img src="'+response.imgUrl+'?'+new Date().getTime()+'" />'
			_mthis._placeholder.find('.app_imageCropper_result').html(img);
          }
    });
};
