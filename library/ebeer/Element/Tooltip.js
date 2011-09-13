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
 * Tooltip class
 *
 * This is an abstraction class for any kind of tooltip implementation.
 *
 * @category Application
 * @package Element
 * @constructor
 */
var Element_Tooltip = function(placeholder) {
    this.placeholder = $(placeholder);
};

Element_Tooltip.prototype._tip = null;

/**
 * This method is used to initialize the tooltip object.
 *
 * @TODO It would be nice an array merge instead of rewrite it all.
 */
Element_Tooltip.prototype.init = function(content, settings) {
    if (!settings) {
        settings = {
			content: content,
			className: 'tip-twitter',
			showTimeout: 1,
			alignTo: 'target',
			alignX: 'center',
			alignY: 'bottom',
			offsetY: 5,
			showOn: 'hover',
			allowTipHover: false
        };
    } else {
    	settings.content = content;
    }

    this._tip = $(this.placeholder).poshytip(settings);
};

/**
 * This method is used to control the visibility of the tooltip.
 */
Element_Tooltip.prototype.show = function() {
	this.placeholder.poshytip("show");
};

/**
 * This method is used to control the visibility of the tooltip.
 */
Element_Tooltip.prototype.hide = function() {
	this.placeholder.poshytip("hide");
};

/**
 * This method is used to activate the tooltip.
 */
Element_Tooltip.prototype.enable = function() {
    this._tip.enable();
};

/**
 * This method is used to deactivate the tooltip.
 */
Element_Tooltip.prototype.disable = function() {
    this._tip.disable();
};

/**
 * This method is used to destroy the tooltip object.
 */
Element_Tooltip.prototype.destroy = function() {
	this.placeholder.poshytip("destroy");
};

/**
 * Used to update the content of the tooltip.
 */
Element_Tooltip.prototype.update = function(content, keepMemory) {
	this.placeholder.poshytip('update', content, keepMemory );
};

/**
 * This method is used to retrieve the actual content of the tooltip.
 */
Element_Tooltip.prototype.getContent = function() {
	return this._tip.opts.content;
};

/**
 * This method is used to asyncroniusly retrieve the content of the tooltip.
 */
Element_Tooltip.prototype.load = function(url, data) {
    this._tip.loadContent(url, data);
};

