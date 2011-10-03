var MyApp = (function() {
	var TestApp_Application = function() {
	    this.init();
	};
	
	TestApp_Application.prototype = new Application();
	
	/**
	*Initiates the Object
	*/
	TestApp_Application.prototype.init = function() {
	
		//here my bootstrap code
	};
	
	return var app = new TestApp_Application();
}).call(this);