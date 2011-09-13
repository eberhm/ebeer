try {
	var DEBUG = (_egc.environment == "DEVEL") ? true : false;
} catch(e) {
	var DEBUG = false;
}

function Logger(){

   /**
    * The messages array. Every message entry will have the following structure:
    * array('name', 'type', 'description')
    *
    * @type Array
    */
	this._messages = [];
	
	var _mthis = this;

	var _enableUserTracking = true;
	/**
	* It adds an entry on the erros array
	*
	* @param {String} eName the message name
	* @param {String} eType the message type
	* @param {String} eDesc the message description
	*
	* @return true on success, false otherwise
	* @type Boolean
	*/
	this.add = function(eDesc, eType){
            try {
				var tMessage = {
	                'type'  : eType,
	                'desc'  : eDesc
	            };
	            if (!app.functions.isset(eDesc)) eDesc = '';
	            if (!app.functions.isset(eType)) eType = '';
	
	            _mthis._messages.push(tMessage);
	
	    		if (eType.toUpperCase() == 'ERROR' && _enableUserTracking && _egc.environment == "PRODUCTION") { 
	    			_gaq.push(['_trackEvent', "OtrosTrackings", "JsClientSideErrors", eDesc]);
	    		}
	    		
	            if (DEBUG && typeof console != "undefined") {
	                    switch (eType.toUpperCase()){
	                            case 'ERROR':
	                            	console.error(eDesc);
	                            break;
	
	                            case 'WARNING':
	                                console.warn(eDesc);
	                            break;
	
	                            default:
	                                console.info(eDesc);
	                            break;
	                    }
	            }
	            return true;
            } catch (e) {
            	return true;
            }
	};
	
	/**
	* It resets the message array
	*
	*/
	this.resetMessages = function(){
                _mthis._messages = [];
	};

	/**
	* It returns an String representation for the messages array
	*
	*
	* @return The String representation for the messages array
	* @type String
	*/
	this.toString = function(){
            var str = '';
            for (anMessage in _mthis._messages){
		str +='\n' + _mthis._messages[anMessage].toString();
            }
            return str;
	};
	
	/**
	* It returns the messages array
	*
	*
	* @return The HTML encoded String representation for the messages array
	* @type Array
	*/
	this.toArray = function(){
		return _mthis._messages;
	};
	
};