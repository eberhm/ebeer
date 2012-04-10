define('ebeer/Application',
    [
    'ebeer/Logger',
    'ebeer/Manager/Widget'
    ],
    function(Logger, WidgetsManager) {

    var Application = function() {};

    Application.prototype.version = '0.0.1';
    Application.prototype.widgets = null;

    /**
    *Initiates the Object
    */
    Application.prototype.init = function(config) {
        this.logger = new Logger();
        this.widgets = new WidgetsManager();
    };

    Application.prototype.log = function (eDesc, eType) {
        this.logger.add(eDesc, eType);
    };

    return Application;
});