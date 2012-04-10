define('exampleApp/Bootstrap', ['ebeer/Application'], function(Application) {
    var Bootstrap = function() {
    };

    Bootstrap.prototype = new Application();

    /**
     *Initiates the Object
     */
    Bootstrap.prototype.init = function() {
        //we should call first parent
        Application.prototype.init.call(this);
        //here my bootstrap code
    };

    return new Bootstrap;
});