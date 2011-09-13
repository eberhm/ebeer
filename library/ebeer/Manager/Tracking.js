/**
* @fileoverview This class will manage the tracking on the application
*
*/

function Manager_Tracking(padre){
	this.padre = padre;
	
	this._trackers = new Array();
	
	/**
	* It loads the form checking first all the dependencies
	*
	* @param {GSI_form} aform the form instance
	*
	* @return True on success on building the form object.false otherwise
	* @type Boolean
	*/
	this.addTracker = function(aTracker){
		this._trackers.push(aTracker);	
	};
	
	/**
	* It returns an array of trackers with the type passed as a parameter
	*
	* @param {String} name the form name to get
	*
	* @return The array of trackers
	* @type Array
	*/
	this.getTrackersByType = function(type){

		var res = new Array();
		
		for(var i in this._trackers){
			if (isNaN(i)) continue;
			if (this._trackers[i].type == type){
				res.push(this._trackers[i]);
			}
		}
		
		return res;
	};
	
	/**
	* It executes the tagging for a certain event by collecting all trackers
	* available for this type and calling execute on them.
	*
	* @param {String} type the trackers type to run
	* @param {String} request a request object that can be ultimatle used
	* by the trackers
	*
	* @return Always true
	* @type Boolean
	* @see App_Tracker
	*/
	this.tag = function(type, request){
		var trackers = this.getTrackersByType(type);
		for (var i in  trackers){
			if (isNaN(i)) continue;
			if (trackers[i] instanceof Tracker) {
				 try{
				 	trackers[i].execute(request);
				 } catch (e){
				 	app.log('there was an error while trying to tag '+type+' :'+e.message, 'ERROR');
				 }
			}
		}
		return true;
	};
};

app.tracking = new Manager_Tracking(app);