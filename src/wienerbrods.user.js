// ==UserScript==
// @name        Wienerbrods
// @namespace   
// @version     0.1.0
// @description 
// @match       *
// @copyright   2014 vikekh
// ==/UserScript==

(function (vikekh) {
    
    var wienerbrods = vikekh.wienerbrods = vikekh.wienerbrods || {};
    
    var settings = {};
    
    wienerbrods.init = function (options) {
        settings = options; // todo: write an extend()
        traverse();
    };
    
    var replace = function (node) {
        for (var id in settings.replace) {
            if (settings.replace.hasOwnProperty(id)) {
                var re = new RegExp('(' + settings.replace[id].from + ')', 'gi');
                node.textContent = node.textContent.replace(re, replacer.bind(this, settings.replace[id].to));
            }
        }
    };
    
    var replacer = function (replace, match, p1) {
        return replace;
    };
    
    var traverse = function (node) {
        if (!node)
            node = document.documentElement;
        
        node = node.firstChild;
        
        while (node !== null) {
            if (node.nodeType == 3) {
                replace(node);
            } else if (node.nodeType == 1) {
                traverse(node);
            }
            
            node = node.nextSibling;
        }
    };
})(vikekh = vikekh || {});

var options = {
    replace: {
        wienerbrods: {
            from: 'neger',
            to: 'choklad'
        }
    }
};
vikekh.wienerbrods.init(options);