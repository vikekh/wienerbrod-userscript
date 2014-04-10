// ==UserScript==
// @name        Wienerbrod
// @namespace   
// @version     0.1.0
// @description 
// @match       http://*/*
// @copyright   2014 vikekh
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

(function (wienerbrod, $, undefined) {
    
    // public vars
    
    wienerbrod.settings = {
        debug: true,
        replace: {
            wienerbrod: {
                from: 'neger',
                to: 'choklad'
            }
        }
    };
    
    // private vars
    
    // public methods
    
    wienerbrod.init = function (options) {
        if (window.top != window.self)
            return;
        
        this.traverse();
    };
    
    // private methods
    
    function replacer(replace, match, p1) {
        return '<span style="background-color: #f00;">' + replace + '</span>';
    }
    
    function traverse() {
        var $elems = $('*').contents().filter(function () { return this.nodeType === 3; });
        
        for (var id in wienerbrod.settings.replace) {
            if (wienerbrod.settings.replace.hasOwnProperty(id)) {
                var re = new RegExp('(' + wienerbrod.settings.replace[id].from + ')', 'gi');
                
                $elems.each(function () {
                    var $elem = $(this);
                    $elem.text($elem.text().replace(re, replacer.bind(this, wienerbrod.settings.replace[id].to)));
                });
            }
        }
    }
    
})(window.wienerbrod = window.wienerbrod || {}, jQuery);

(function (jQuery, wienerbrod) {
    jQuery(document).ready(function ($) {
        wienerbrod.init();
    });
})(jQuery, wienerbrod);