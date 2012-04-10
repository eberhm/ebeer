<?php
class Ebeer
{
    private static $_js = array();
    private static $_appName = 'exampleApp';

    /**
     * Manages JS Files
     *
     * @return Ebeer
     */
    public static function requireJs($fullPathTofile)
    {
        static::$_js[$fullPathTofile] = 1;
        return $this;
    }
    
    public static function initApp()
    {
        /*
        <script type="text/javascript">
            //this script is generated in the server side
            require(
                [
                    //main is always needed
                    'app/main',
                    //here the list of widgets you may want to load.
                    'app/Widget/TodoList'
                ],
                function(app) {
                    app.widgets.initAll();

                    //we normally set myApp as global for debugging purposes.
                    //in prod you can comment this line
                    myApp = app;
                }
            );
        </script>
         */
        $requirePath = 'scripts/require/require.js';

        $out = array('<script src="' . $requirePath . '" type="text/javascript"></script>');
        $out[] = '<script type="text/javascript">';

        $out[] = 'require.config({baseUrl:"/scripts"});';

        $outJs = array('require(["'. self::$_appName .'/main"');
        foreach (static::$_js as $module => $added) {
            $outJs[] = '"'.$module.'"';
        }

        $out[] = implode(', ' . PHP_EOL, $outJs);
        $out[] = '], function(app) {
                app.widgets.initAll();
                //we normally set myApp as global for debugging purposes.
                //in prod you can comment this line
                myApp = app;
            });';
        $out[] = '</script>';

        return implode(PHP_EOL, $out);
    }
}
