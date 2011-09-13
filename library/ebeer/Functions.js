/**
 * Emagister
 *
 *
 * @version $Id: $
 * @category Application
 * @copyright (c) Copyright Emagister
 */






/**
* Object with specific functions to use at app. For example, associative arrays support functions, etc
* @member functions
*/
var Functions = function(){
	
    this.isset = function (tObj){
        if (typeof tObj == "undefined") return false;
        if (tObj == null) return false;
        //if (!tObj) return false;
        return true;
    };

    this.trim = function (str) {
    	var str = str || '';
    	return String(str).replace(/^\s*|\s*$/g,"");
    };

    this.getURLParameter = function(name) {
        return unescape(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    };


// This function creates a new anchor element and uses location
// properties (inherent) to get the desired URL data. Some String
// operations are used (to normalize results across browsers).

    this.parseURL = function(url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                    var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                    for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tp:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    };



};

app.functions = new Functions();
