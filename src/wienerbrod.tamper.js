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
                from: 'foo',
                to: 'bar'
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
        return replace;
    }
    
    function traverse($node) {
        if (typeof $node === 'undefined')
            $node = $('body');

        $node.contents()
            .filter(function () {
                return this.nodeType === 3;
            })
            .each(function () {
                replace($(this));
            })
            .end()
            .filter(function () {
                return this.nodeType === 1;
            })
            .each(function () {
                traverse($(this));
            });
    }
    
})(window.wienerbrod = window.wienerbrod || {}, jQuery);

(function (jQuery, wienerbrod) {
    jQuery(document).ready(function ($) {
        wienerbrod.init();
    });
})(jQuery, wienerbrod);
