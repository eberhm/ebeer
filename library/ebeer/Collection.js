
/**
 * EMagister
 *
 * @version    $Id: Collection.js 33369 2010-03-24 11:35:41Z iargent $
 * @category   Gsi
 * @package    Controller
 * @copyright  (c) Copyright Emagister.
 * @link       
 */
/**
 * Collection
 *	To instantiate the cass you mus pass as a parameter the create function.
 *
 *Example:
 *
 *var myCollection = new Collection(function(id){
 *	return new Model_User(id);
 *});
 *
 * @see Model
 *
 * @category   app
 * @package    App
 */
/**
* @constructor
*/

function Collection(createFunction){
	if (!(createFunction instanceof Function)) {
		app.log('The create function is not a function', 'ERROR');
	}
	
	this.createElement = createFunction;
	this.reset();
};

	/**
	* Tries adding an Item passed to the item array of the object. If the item already exists on the array it returns false.<b>
	*
	* @param {Model_User} item The item object to insert. 
	* @return True on success, false otherwise
	* @type Boolean
	*/
Collection.prototype.addElement = function(element){
		_FLAG = false;
		var id;
		if (element instanceof Model) {
			id = element.id;
			_FLAG = true;
		} else id = element;
		tElement = this.getElement(id);
		if (tElement && !_FLAG) return false;
		if (!_FLAG){
			var element = this.createElement(id);			
			app.log('Item created with id '+ element.id,'INFO');
		}
		
		this.elements[id] = element;
		return true;
	};

	/**
	* It removes an item from the collection
	*
	* @param {Model_User} item the item object
	*
	* @return True on success.false otherwise
	* @type Boolean
	*/	
Collection.prototype.removeElement = function(element){
		var id=0;
		if (element instanceof Model) {
			id = element.id;
			if (this.elements[id]) {
				delete this.elements[id];
				return true;
				} else return false;
		} else {
			if (this.elements[element]) {
				delete this.elements[element];
				return true;
				} else return false;
		}
		return true;
	};
	
Collection.prototype.getElements = function (){
		return this.elements;
	};
	/**
	* It looks for items with the ID passed whitin the items array.
	*
	* @param {String} ID The Id for the Item to check.
	* @return The Item Object requested
	* @type Model_User
	*/	
Collection.prototype.getElement = function(id, createOnNotFound){
		for(anElement in this.elements){
			if (anElement=='indexOf') continue;
			if (!(this.elements[anElement] instanceof Model)) continue;
				var res = false;
				if (res = this.elements[anElement].getElement(id)) return res;
		}
		
		if (createOnNotFound) {
			var res = this.createElement(id);
			this.addElement(res);
		}
		return res;
	};

	/**
	* Resets the items array and set the collectio to it's initial state
	*/
Collection.prototype.reset = function(){
		this.elements = new Array();
	};
	
/**
* Creates an instance of the object
* 
* @return Model
*/
Collection.prototype.createElement = function(id){
		return new Model(id);
	};