// ==UserScript==
// @name        Wienerbrod
// @namespace   
// @version     0.1.0
// @description 
// @match       *://*/*
// @copyright   2014 vikekh
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

(function (wienerbrod, $, undefined) {
    
    // public vars
    
    wienerbrod.settings = {
        debug: true,
        replace: {
            wienerbrod: {
                from: 'choklad',
                to: 'neger'
            }
        }
    };
    
    // private vars

    var replacers = {};
    
    // public methods
    
    wienerbrod.init = function (options) {
        if (window.top != window.self)
            return;
        
        prepare();
        traverse();
    };
    
    // private methods

    function prepare() {
        for (var id in wienerbrod.settings.replace) {
            if (wienerbrod.settings.replace.hasOwnProperty(id)) {
                var pattern = '(' + wienerbrod.settings.replace[id].from + ')';
                replacers[id] = {
                    re: new RegExp(pattern, 'gi'),
                    func: replacer.bind(this, wienerbrod.settings.replace[id].to)
                };
            }
        }
    }

    function replace($elem) {
        for (var id in wienerbrod.settings.replace) {
            if (wienerbrod.settings.replace.hasOwnProperty(id)) {
                var old = $elem.text(),
                    text = old.replace(replacers[id].re, replacers[id].func);

                if (text !== old)
                    $elem.text(text);
            }
        }
    }
    
    function replacer(replace, match, p1) {
        console.dir(arguments);
        return replace;
    }
    
    function traverse() {
        $('*').each(function () {
            var $elem = $(this);

            if ($elem.children().length === 0)
                replace($elem);
        });
    }
    
})(window.wienerbrod = window.wienerbrod || {}, jQuery);

(function (jQuery, wienerbrod) {
    jQuery(document).ready(function ($) {
        wienerbrod.init();
    });
})(jQuery, wienerbrod);