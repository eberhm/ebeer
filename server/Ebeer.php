<?php
class Ebeer
{
    protected static $_js = array();
    protected static $_applicationName = 'app';
    
    protected static $_coreFiles = array(
        '/library/ebeer/Collection.js' => true,
        '/library/ebeer/Model.js' => true,
        '/library/ebeer/Logger.js' => true,
        '/library/ebeer/Widget.js' => true,
        //'/library/ebeer/Manager/Dictionary.js' => true,
        '/library/ebeer/Manager/Widget.js' => true,
        '/library/ebeer/Application.js' => true,
    );

    /**
     * Manages JS Files
     *
     * @return Elege_View_Helper_Common_Js_Js
     */
    public static function requireJs($fullPathTofile)
    {
        static::$_js[$fullPathTofile] = 1;
        return $this;
    }
    
    public static function initApp()
    {
        
        $labPath = '/library/LABjs/LAB.min.js';

        $out = array('<script src="' . $labPath . '" type="text/javascript"></script>');
        $out[] = '<script type="text/javascript">';
        $out[] = '$LAB';

        $outJs = array();
        foreach (array_merge(static::$_coreFiles, static::$_js) as $link) {
            $outJs[] = '.script("' . $link . '").wait()';
        }

        $out[] = implode('' . PHP_EOL, $outJs);
        $out[] = '.wait(function(){
            try{
                ' . $self::_applicationName . '.widgets.initAll();
            } catch (e) {
            }
        });';
        $out[] = '</script>';

        return implode(PHP_EOL, $out);
    }
}
