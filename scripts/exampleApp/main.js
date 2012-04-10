require.config(
    {
        baseUrl:"./scripts",
        pkgs : [
            "ebeer",
            "exampleApp"
        ],
        paths : {
            "ebeer" : "ebeer/lib"
        }
    });

define('exampleApp/main',
    [
        'exampleApp/Bootstrap',
        'exampleApp/config'
    ],
    function (bootstrap, config) {
        bootstrap.init(config);
        return bootstrap;
    });