let extend = (function () {

    /**
     * Create "extend" method
     * http://pietschsoft.com/post/2009/07/29/JavaScript-Easily-Extend-an-Object-Element
     */

    const extend = function( obj, extObj ) {

        if ( arguments.length > 2 ) {
            for (let a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        } else {
            for ( let i in extObj ) {
                obj[i] = extObj[i];
            }
        }

        return obj;

    };


    /**
     * Return an object exposed to the public
     */

    return {

        init: extend

    };

})();

export default extend;



// our helper function
function extend(first, second) {

    for (var secondProp in second) {

        var secondVal = second[secondProp];

        // Is this value an object?  If so, iterate over its properties, copying them over
        if (secondVal && Object.prototype.toString.call(secondVal) === "[object Object]") {
            first[secondProp] = first[secondProp] || {};
            extend(first[secondProp], secondVal);
        }

        else {
            first[secondProp] = secondVal;
        }

    }

    return first;
};

/**
 * Merge defaults with user options
 * @private
 * @param {Object} defaults Default settings
 * @param {Object} options User options
 * @returns {Object} Merged values of defaults and options
 */
var extend = function ( defaults, options ) {
    var extended = {};
    var prop;

    for (prop in defaults) {

        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }

    }
    for (prop in options) {

        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }

    }

    return extended;

// // Example
// var defaults = {
//     number: 1,
//     bool: true,
//     magic: 'real',
//     animal: 'whale',
//     croutons: 'delicious'
// };

// var options = {
//     number: 2,
//     magic: 'real',
//     animal: 'porpoise',
//     bool: false,
//     random: 42
// };

// var settings = extend(defaults, options);

// console.log(settings);
// // Returns: Object{animal: "porpoise", bool: false, croutons: "delicious", magic: "real", number: 2, random: 42}




// var extend = function(out) {
//   out = out || {};

//   for (var i = 1; i < arguments.length; i++) {
//     if (!arguments[i])
//       continue;

//     for (var key in arguments[i]) {
//       if (arguments[i].hasOwnProperty(key))
//         out[key] = arguments[i][key];
//     }
//   }

//   return out;
// };

// extend({}, objA, objB);
