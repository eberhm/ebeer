var Application = function()
{
    this.init();
};

Application.prototype.version = '1';
Application.prototype.widgets = null;

/**
*Initiates the Object
*/
Application.prototype.init = function() {

	this.logger = new Logger();
	
	try {
		this.dict = new Manager_Dictionary();
		this.dict.addTranslations(dictionary);
	} catch(e) {
		this.logger.add('Dictionary_Manager initialization error: '+e.toString(),'ERROR');
	}
	
	// The line below is used to activate the cache for 
	//all the async request by default (including 'script' and 'jsonp')
	$.ajaxSetup({ cache: true });

    this.widgets = new Manager_Widget();
    
    this.users = new Collection(function(id) {
    	return new Model_User(id);
    });
    this.centers = new Collection(function(id) {
    	return new Model_Center(id);
    });
    
    this.geoip = new Model_GeoIp(); //'148.243.168.33' Mexico DF '200.58.72.104' Bolivia
};

/**
 * The concept of 'Entity' groups both Users and Centers.
 * At the beggining of the load, we set up the current loggued user (if it exist), along with
 * all the data storaged in the cookie.
 * 
 */
Application.prototype.getActiveEntity = function() {
	
	if (!this.activeEntity) {
		// Only one access to the cookie (because is too slow to do that)
		var _cookieContent = $.cookie(cookieSidName);
		
		if ((_cookieContent) && (_cookieContent != "")) {
	        var userData	= unescape(_cookieContent).split(';');
	        
			var id = userData[0];
			var nombre = userData[1];
			
			this.activeEntity = app.users.getElement(id, true);
			this.activeEntity.setName(nombre);
			
			// If the surname is set in the cookie, we add it to the object
			if(userData.length > 2) {
				var apellidos = userData[2];
				this.activeEntity.setSurname(apellidos);
			}
			
			this.activeEntity.type = "user";
			
		} else if (($.cookie("ck_identcen")) && ($.cookie("ck_identcen") != "")) {
			var id = unescape($.cookie("ck_identcen"));
			this.activeEntity = app.centers.getElement(id, true);
			
			this.activeEntity.type = "center";
		}
	} 
	
	return this.activeEntity;
};

Application.prototype.log = function (eDesc, eType) {
	this.logger.add(eDesc, eType);
};

/**
 * Loads a class in the framework by calling the file to the server and loading
 * it into the page. It only loads the class if it does not exists but it allways
 * executes the callback function. 
 * 
 * @param {String} The name of the class to load
 * @param {Funtion} a function that will be called right after the class is 
 * ready to be used
 */
Application.prototype.loadClass = function (className, callback) {
	try {
		var callback = callback || function(){};
		
		if (eval('typeof('+className +') != "undefined"')) {
			callback();
			return ;
		}
		
		var mainPath = '/js/_common/app/';
		var fullPathFileName = mainPath + className.replace(/_/g, '/');
		fullPathFileName += '.js';
		
		$.getScript(fullPathFileName, callback);
	} catch(e) {
		app.logger.add('ERROR when trying to load class ' + className, 'ERROR');
	}

};

Application.prototype.functions = {};