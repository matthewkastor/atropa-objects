;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var atropa = {};

/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>

/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa;
atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],2:[function(require,module,exports){
var objects = require('../src/atropa-objects.js');

try {
    Object.keys(objects).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = objects[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-objects.js');
}

Object.keys(objects.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = objects.data[prop];
    }
);

},{"../src/atropa-objects.js":3}],3:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa, XPathResult */
// end header

/**
 * Utilities for handling objects.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130121
 * @namespace Utilities for handling objects.
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.objects">tests</a>
 */
atropa.objects = {};
/**
 * Converts an object into an array of arrays to make it possible to sort and
 *  enumerate properties reliably.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @methodOf atropa.objects.
 * @example
 *  var x = {
 *      "stuffing" : "cotton",
 *      "nose" : "button",
 *      "name" : "bear"
 *  };
 *  console.log( atropa.objects.convertObjectToArray(x) );
 *  // logs [["stuffing", "cotton"], ["nose", "button"], ["name", "bear"]]
 * @param {Object} obj An object.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the object's key stored in element 0 and
 *  the value stored in element 1. The reason an array of arrays is
 *  returned is because JavaScript does not guarantee the order of
 *  properties on an object so there is no relizble way to sort
 *  an objects keys or values.
 * @see "The mechanics and order of enumerating the properties [of an object]
 *  is not specified." 
 *  <a href="http://www.ecma-international.org/ecma-262/5.1/#sec-12.6.4">
 *  http://www.ecma-international.org/ecma-262/5.1/#sec-12.6.4</a>
 */
atropa.objects.convertObjectToArray = function convertObjectToArray(obj) {
    "use strict";
    var prop, out = [];
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            out.push([prop, obj[prop]]);
        }
    }
    return out;
};
/**
 * Converts an object into an array of arrays and allows for reliable sorting
 *  and enumeration.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted, sortedByValues, sortedByProperties;
 *  wordsCounted = {
 *      "document3" : 150,
 *      "document1" : 300,
 *      "document2" : 25
 *  };
 *  // sorting by property value as numbers
 *  function valSort(a, b) {
 *      return a[1] - b[1];
 *  }
 *  // sorting by property names as strings
 *  function propSort(a, b) {
 *      return a[0].localeCompare(b[0]);
 *  }
 *  sortedByValues = atropa.objects.sort(wordsCounted, valSort);
 *  sortedByProperties = atropa.objects.sort(wordsCounted, propSort);
 *  console.log('sorted by value: ', sortedByValues);
 *  console.log('sorted by properties: ', sortedByProperties);
 *  
 *  // logs:
 *  // sorted by value: [
 *  //     ["document2", 25],
 *  //     ["document3", 150],
 *  //     ["document1", 300]
 *  // ]
 *  // sorted by properties: [
 *  //     ["document1", 300],
 *  //     ["document2", 25],
 *  //     ["document3", 150]
 *  // ]
 * @example
 *  Lexicographic sorting:
 *  This    [1, 2, 10, 'A', 'a','Z', 'z']
 *  becomes [1, 10, 2, "A", "Z", "a", "z"]
 * @param {Object} obj An object.
 * @param {Function} sortFn Optional. The sorting function. This function will
 *  be given two arguments. Compare the two arguments and return:
 *  0 if they are equal, greater than zero if the first argument
 *  is greater than the second, or less than zero if the second
 *  argument is greater than the first. If the sorting function
 *  is not given, the array will be sorted lexographically by
 *  each elements <code>toString</code> value.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1. The reason an array of arrays is
 *  returned is because JavaScript does not guarantee the order of
 *  properties on an object so there is no relizble way to sort
 *  an objects keys or values.
 * @see atropa.objects.convertObjectToArray
 * @see <a href="http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.11">
 *  http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.11</a>
 * @see <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort">
 *  https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort</a>
 */
atropa.objects.sort = function sort(obj, sortFn) {
    "use strict";
    return atropa.objects.convertObjectToArray(obj).sort(sortFn);
};
/**
 * Sorts an object by its values using a user defined algorithm.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted;
 *  wordsCounted = {
 *      "document3" : 150,
 *      "document1" : 300,
 *      "document2" : 25
 *  };
 *  // sorting by values as numbers
 *  function sortFn(a, b) {
 *      return a - b;
 *  }
 *  console.log( atropa.objects.sortValues(wordsCounted, sortFn) );
 *  // logs: [["document2", 25], ["document3", 150], ["document1", 300]]
 * @param {Object} obj An object.
 * @param {Function} sortFn The sorting function. This function will
 *  be given two arguments. Compare the two arguments and return:
 *  0 if they are equal, greater than zero if the first argument
 *  is greater than the second, or less than zero if the second
 *  argument is greater than the first.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1.
 * @see atropa.objects.sort
 */
atropa.objects.sortValues = function sortValues(obj, sortFn) {
    "use strict";
    var valSort = function(a, b) {
        return sortFn(a[1], b[1]);
    };
    return atropa.objects.sort(obj, valSort);
};
/**
 * Sorts an object by its properties using a user defined algorithm.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted;
 *  wordsCounted = {
 *      "document3" : 150,
 *      "document1" : 300,
 *      "document2" : 25
 *  };
 *  // sorting by property names as strings
 *  function sortFn(a, b) {
 *      return a.localeCompare(b);
 *  }
 *  console.log( atropa.objects.sortProperties(wordsCounted, sortFn) );
 *  // logs: [["document1", 300], ["document2", 25], ["document3", 150]]
 * @param {Object} obj An object.
 * @param {Function} sortFn The sorting function. This function will
 *  be given two arguments. Compare the two arguments and return:
 *  0 if they are equal, greater than zero if the first argument
 *  is greater than the second, or less than zero if the second
 *  argument is greater than the first.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1.
 * @see atropa.objects.sort
 */
atropa.objects.sortProperties = function sortValues(obj, sortFn) {
    "use strict";
    var propSort = function(a, b) {
        return sortFn(a[0], b[0]);
    };
    return atropa.objects.sort(obj, propSort);
};
/**
 * Sorts an object by its values numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted;
 *  wordsCounted = {
 *      "document3" : 150,
 *      "document1" : 300,
 *      "document2" : 25
 *  };
 *  console.log( atropa.objects.sortValuesNumerically(wordsCounted) );
 *  // logs [["document2", 25], ["document3", 150], ["document1", 300]]
 * @param {Object} obj A simple object where the properties
 *  all have numeric-ish values.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1.
 * @see atropa.objects.sort
 */
atropa.objects.sortValuesNumerically = function sortValuesNumerically(obj) {
    "use strict";
    function sortFn(a, b) {
        return (a - b);
    }
    return atropa.objects.sortValues(obj, sortFn);
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.objects.sortValuesAlphabetically = function sortValuesAlphabetically() {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Sorts an object by its properties numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @example
 *  var wordsCounted;
 *  wordsCounted = {
 *      "3" : "Document A",
 *      "2" : "Document Z",
 *      "1" : "Document M"
 *  };
 *  console.log( atropa.objects.sortPropertiesNumerically(wordsCounted) );
 *  // logs: [["1", "Document M"], ["2", "Document Z"], ["3", "Document A"]]
 * @param {Object} obj A simple object where the properties
 *  all have numeric-ish values.
 * @returns {Array} Returns an array of arrays where each
 *  nested array will have the objects key stored in element 0 and
 *  the value stored in element 1.
 * @see atropa.objects.sort
 */
atropa.objects.sortPropertiesNumerically = function sortPropertiesNumerically(
    obj
) {
    "use strict";
    function sortFn(a, b) {
        return (a - b);
    }
    return atropa.objects.sortProperties(obj, sortFn);
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.objects.sortPropertiesAlphabetically = 
function sortPropertiesAlphabetically(obj) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":1}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1oZWFkZXJcXHNyY1xcYXRyb3BhLWhlYWRlci5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLW9iamVjdHNcXGRldlxcYnJvd3Nlck1haW4uanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1vYmplY3RzXFxzcmNcXGF0cm9wYS1vYmplY3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXRyb3BhID0ge307XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhO1xyXG5hdHJvcGEgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXHJcbiAqICBlcnJvciBpZiBpdCBoYXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcclxuICovXHJcbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcclxuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xyXG4gICAgXHJcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxyXG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcclxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXHJcbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xyXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxyXG4gKiAgcmV0dXJuIGZhbHNlLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXHJcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcclxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICovXHJcbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcclxuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLmRhdGEgPSB7fTtcclxuXHJcbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xyXG5cclxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuXHJcbiIsInZhciBvYmplY3RzID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1vYmplY3RzLmpzJyk7XHJcblxyXG50cnkge1xyXG4gICAgT2JqZWN0LmtleXMob2JqZWN0cykuZm9yRWFjaChcclxuICAgICAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICBpZighYXRyb3BhW3Byb3BdKSB7XHJcbiAgICAgICAgICAgICAgICBhdHJvcGFbcHJvcF0gPSBvYmplY3RzW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSBjYXRjaCAoaWdub3JlKSB7XHJcbiAgICBhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLW9iamVjdHMuanMnKTtcclxufVxyXG5cclxuT2JqZWN0LmtleXMob2JqZWN0cy5kYXRhKS5maWx0ZXIoXHJcbiAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wICE9PSAncmVxdWlyZW1lbnRzJztcclxuICAgIH1cclxuKS5mb3JFYWNoKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICBhdHJvcGEuZGF0YVtwcm9wXSA9IG9iamVjdHMuZGF0YVtwcm9wXTtcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIG9iamVjdHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgb2JqZWN0cy5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEub2JqZWN0c1wiPnRlc3RzPC9hPlxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMgPSB7fTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGFycmF5cyB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIHNvcnQgYW5kXHJcbiAqICBlbnVtZXJhdGUgcHJvcGVydGllcyByZWxpYWJseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBtZXRob2RPZiBhdHJvcGEub2JqZWN0cy5cclxuICogQGV4YW1wbGVcclxuICogIHZhciB4ID0ge1xyXG4gKiAgICAgIFwic3R1ZmZpbmdcIiA6IFwiY290dG9uXCIsXHJcbiAqICAgICAgXCJub3NlXCIgOiBcImJ1dHRvblwiLFxyXG4gKiAgICAgIFwibmFtZVwiIDogXCJiZWFyXCJcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuY29udmVydE9iamVjdFRvQXJyYXkoeCkgKTtcclxuICogIC8vIGxvZ3MgW1tcInN0dWZmaW5nXCIsIFwiY290dG9uXCJdLCBbXCJub3NlXCIsIFwiYnV0dG9uXCJdLCBbXCJuYW1lXCIsIFwiYmVhclwiXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaFxyXG4gKiAgbmVzdGVkIGFycmF5IHdpbGwgaGF2ZSB0aGUgb2JqZWN0J3Mga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS4gVGhlIHJlYXNvbiBhbiBhcnJheSBvZiBhcnJheXMgaXNcclxuICogIHJldHVybmVkIGlzIGJlY2F1c2UgSmF2YVNjcmlwdCBkb2VzIG5vdCBndWFyYW50ZWUgdGhlIG9yZGVyIG9mXHJcbiAqICBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCBzbyB0aGVyZSBpcyBubyByZWxpemJsZSB3YXkgdG8gc29ydFxyXG4gKiAgYW4gb2JqZWN0cyBrZXlzIG9yIHZhbHVlcy5cclxuICogQHNlZSBcIlRoZSBtZWNoYW5pY3MgYW5kIG9yZGVyIG9mIGVudW1lcmF0aW5nIHRoZSBwcm9wZXJ0aWVzIFtvZiBhbiBvYmplY3RdXHJcbiAqICBpcyBub3Qgc3BlY2lmaWVkLlwiIFxyXG4gKiAgPGEgaHJlZj1cImh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy0xMi42LjRcIj5cclxuICogIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi81LjEvI3NlYy0xMi42LjQ8L2E+XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheSA9IGZ1bmN0aW9uIGNvbnZlcnRPYmplY3RUb0FycmF5KG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgcHJvcCwgb3V0ID0gW107XHJcbiAgICBmb3IgKHByb3AgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICBvdXQucHVzaChbcHJvcCwgb2JqW3Byb3BdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGFycmF5cyBhbmQgYWxsb3dzIGZvciByZWxpYWJsZSBzb3J0aW5nXHJcbiAqICBhbmQgZW51bWVyYXRpb24uXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHdvcmRzQ291bnRlZCwgc29ydGVkQnlWYWx1ZXMsIHNvcnRlZEJ5UHJvcGVydGllcztcclxuICogIHdvcmRzQ291bnRlZCA9IHtcclxuICogICAgICBcImRvY3VtZW50M1wiIDogMTUwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQxXCIgOiAzMDAsXHJcbiAqICAgICAgXCJkb2N1bWVudDJcIiA6IDI1XHJcbiAqICB9O1xyXG4gKiAgLy8gc29ydGluZyBieSBwcm9wZXJ0eSB2YWx1ZSBhcyBudW1iZXJzXHJcbiAqICBmdW5jdGlvbiB2YWxTb3J0KGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYVsxXSAtIGJbMV07XHJcbiAqICB9XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHByb3BlcnR5IG5hbWVzIGFzIHN0cmluZ3NcclxuICogIGZ1bmN0aW9uIHByb3BTb3J0KGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYVswXS5sb2NhbGVDb21wYXJlKGJbMF0pO1xyXG4gKiAgfVxyXG4gKiAgc29ydGVkQnlWYWx1ZXMgPSBhdHJvcGEub2JqZWN0cy5zb3J0KHdvcmRzQ291bnRlZCwgdmFsU29ydCk7XHJcbiAqICBzb3J0ZWRCeVByb3BlcnRpZXMgPSBhdHJvcGEub2JqZWN0cy5zb3J0KHdvcmRzQ291bnRlZCwgcHJvcFNvcnQpO1xyXG4gKiAgY29uc29sZS5sb2coJ3NvcnRlZCBieSB2YWx1ZTogJywgc29ydGVkQnlWYWx1ZXMpO1xyXG4gKiAgY29uc29sZS5sb2coJ3NvcnRlZCBieSBwcm9wZXJ0aWVzOiAnLCBzb3J0ZWRCeVByb3BlcnRpZXMpO1xyXG4gKiAgXHJcbiAqICAvLyBsb2dzOlxyXG4gKiAgLy8gc29ydGVkIGJ5IHZhbHVlOiBbXHJcbiAqICAvLyAgICAgW1wiZG9jdW1lbnQyXCIsIDI1XSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDNcIiwgMTUwXSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDFcIiwgMzAwXVxyXG4gKiAgLy8gXVxyXG4gKiAgLy8gc29ydGVkIGJ5IHByb3BlcnRpZXM6IFtcclxuICogIC8vICAgICBbXCJkb2N1bWVudDFcIiwgMzAwXSxcclxuICogIC8vICAgICBbXCJkb2N1bWVudDJcIiwgMjVdLFxyXG4gKiAgLy8gICAgIFtcImRvY3VtZW50M1wiLCAxNTBdXHJcbiAqICAvLyBdXHJcbiAqIEBleGFtcGxlXHJcbiAqICBMZXhpY29ncmFwaGljIHNvcnRpbmc6XHJcbiAqICBUaGlzICAgIFsxLCAyLCAxMCwgJ0EnLCAnYScsJ1onLCAneiddXHJcbiAqICBiZWNvbWVzIFsxLCAxMCwgMiwgXCJBXCIsIFwiWlwiLCBcImFcIiwgXCJ6XCJdXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0Rm4gT3B0aW9uYWwuIFRoZSBzb3J0aW5nIGZ1bmN0aW9uLiBUaGlzIGZ1bmN0aW9uIHdpbGxcclxuICogIGJlIGdpdmVuIHR3byBhcmd1bWVudHMuIENvbXBhcmUgdGhlIHR3byBhcmd1bWVudHMgYW5kIHJldHVybjpcclxuICogIDAgaWYgdGhleSBhcmUgZXF1YWwsIGdyZWF0ZXIgdGhhbiB6ZXJvIGlmIHRoZSBmaXJzdCBhcmd1bWVudFxyXG4gKiAgaXMgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQsIG9yIGxlc3MgdGhhbiB6ZXJvIGlmIHRoZSBzZWNvbmRcclxuICogIGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgZmlyc3QuIElmIHRoZSBzb3J0aW5nIGZ1bmN0aW9uXHJcbiAqICBpcyBub3QgZ2l2ZW4sIHRoZSBhcnJheSB3aWxsIGJlIHNvcnRlZCBsZXhvZ3JhcGhpY2FsbHkgYnlcclxuICogIGVhY2ggZWxlbWVudHMgPGNvZGU+dG9TdHJpbmc8L2NvZGU+IHZhbHVlLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS4gVGhlIHJlYXNvbiBhbiBhcnJheSBvZiBhcnJheXMgaXNcclxuICogIHJldHVybmVkIGlzIGJlY2F1c2UgSmF2YVNjcmlwdCBkb2VzIG5vdCBndWFyYW50ZWUgdGhlIG9yZGVyIG9mXHJcbiAqICBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCBzbyB0aGVyZSBpcyBubyByZWxpemJsZSB3YXkgdG8gc29ydFxyXG4gKiAgYW4gb2JqZWN0cyBrZXlzIG9yIHZhbHVlcy5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheVxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTUuNC40LjExXCI+XHJcbiAqICBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNS4xLyNzZWMtMTUuNC40LjExPC9hPlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3NvcnRcIj5cclxuICogIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc29ydDwvYT5cclxuICovXHJcbmF0cm9wYS5vYmplY3RzLnNvcnQgPSBmdW5jdGlvbiBzb3J0KG9iaiwgc29ydEZuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5jb252ZXJ0T2JqZWN0VG9BcnJheShvYmopLnNvcnQoc29ydEZuKTtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIG9iamVjdCBieSBpdHMgdmFsdWVzIHVzaW5nIGEgdXNlciBkZWZpbmVkIGFsZ29yaXRobS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICAvLyBzb3J0aW5nIGJ5IHZhbHVlcyBhcyBudW1iZXJzXHJcbiAqICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gKiAgICAgIHJldHVybiBhIC0gYjtcclxuICogIH1cclxuICogIGNvbnNvbGUubG9nKCBhdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzKHdvcmRzQ291bnRlZCwgc29ydEZuKSApO1xyXG4gKiAgLy8gbG9nczogW1tcImRvY3VtZW50MlwiLCAyNV0sIFtcImRvY3VtZW50M1wiLCAxNTBdLCBbXCJkb2N1bWVudDFcIiwgMzAwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRGbiBUaGUgc29ydGluZyBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsXHJcbiAqICBiZSBnaXZlbiB0d28gYXJndW1lbnRzLiBDb21wYXJlIHRoZSB0d28gYXJndW1lbnRzIGFuZCByZXR1cm46XHJcbiAqICAwIGlmIHRoZXkgYXJlIGVxdWFsLCBncmVhdGVyIHRoYW4gemVybyBpZiB0aGUgZmlyc3QgYXJndW1lbnRcclxuICogIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCBvciBsZXNzIHRoYW4gemVybyBpZiB0aGUgc2Vjb25kXHJcbiAqICBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpcnN0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5zb3J0XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzID0gZnVuY3Rpb24gc29ydFZhbHVlcyhvYmosIHNvcnRGbikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdmFsU29ydCA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gc29ydEZuKGFbMV0sIGJbMV0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBhdHJvcGEub2JqZWN0cy5zb3J0KG9iaiwgdmFsU29ydCk7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHByb3BlcnRpZXMgdXNpbmcgYSB1c2VyIGRlZmluZWQgYWxnb3JpdGhtLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQ7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCJkb2N1bWVudDNcIiA6IDE1MCxcclxuICogICAgICBcImRvY3VtZW50MVwiIDogMzAwLFxyXG4gKiAgICAgIFwiZG9jdW1lbnQyXCIgOiAyNVxyXG4gKiAgfTtcclxuICogIC8vIHNvcnRpbmcgYnkgcHJvcGVydHkgbmFtZXMgYXMgc3RyaW5nc1xyXG4gKiAgZnVuY3Rpb24gc29ydEZuKGEsIGIpIHtcclxuICogICAgICByZXR1cm4gYS5sb2NhbGVDb21wYXJlKGIpO1xyXG4gKiAgfVxyXG4gKiAgY29uc29sZS5sb2coIGF0cm9wYS5vYmplY3RzLnNvcnRQcm9wZXJ0aWVzKHdvcmRzQ291bnRlZCwgc29ydEZuKSApO1xyXG4gKiAgLy8gbG9nczogW1tcImRvY3VtZW50MVwiLCAzMDBdLCBbXCJkb2N1bWVudDJcIiwgMjVdLCBbXCJkb2N1bWVudDNcIiwgMTUwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRGbiBUaGUgc29ydGluZyBmdW5jdGlvbi4gVGhpcyBmdW5jdGlvbiB3aWxsXHJcbiAqICBiZSBnaXZlbiB0d28gYXJndW1lbnRzLiBDb21wYXJlIHRoZSB0d28gYXJndW1lbnRzIGFuZCByZXR1cm46XHJcbiAqICAwIGlmIHRoZXkgYXJlIGVxdWFsLCBncmVhdGVyIHRoYW4gemVybyBpZiB0aGUgZmlyc3QgYXJndW1lbnRcclxuICogIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCBvciBsZXNzIHRoYW4gemVybyBpZiB0aGUgc2Vjb25kXHJcbiAqICBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpcnN0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2hcclxuICogIG5lc3RlZCBhcnJheSB3aWxsIGhhdmUgdGhlIG9iamVjdHMga2V5IHN0b3JlZCBpbiBlbGVtZW50IDAgYW5kXHJcbiAqICB0aGUgdmFsdWUgc3RvcmVkIGluIGVsZW1lbnQgMS5cclxuICogQHNlZSBhdHJvcGEub2JqZWN0cy5zb3J0XHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllcyA9IGZ1bmN0aW9uIHNvcnRWYWx1ZXMob2JqLCBzb3J0Rm4pIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHByb3BTb3J0ID0gZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBzb3J0Rm4oYVswXSwgYlswXSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnQob2JqLCBwcm9wU29ydCk7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBvYmplY3QgYnkgaXRzIHZhbHVlcyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgd29yZHNDb3VudGVkO1xyXG4gKiAgd29yZHNDb3VudGVkID0ge1xyXG4gKiAgICAgIFwiZG9jdW1lbnQzXCIgOiAxNTAsXHJcbiAqICAgICAgXCJkb2N1bWVudDFcIiA6IDMwMCxcclxuICogICAgICBcImRvY3VtZW50MlwiIDogMjVcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlc051bWVyaWNhbGx5KHdvcmRzQ291bnRlZCkgKTtcclxuICogIC8vIGxvZ3MgW1tcImRvY3VtZW50MlwiLCAyNV0sIFtcImRvY3VtZW50M1wiLCAxNTBdLCBbXCJkb2N1bWVudDFcIiwgMzAwXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBIHNpbXBsZSBvYmplY3Qgd2hlcmUgdGhlIHByb3BlcnRpZXNcclxuICogIGFsbCBoYXZlIG51bWVyaWMtaXNoIHZhbHVlcy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFZhbHVlc051bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydFZhbHVlc051bWVyaWNhbGx5KG9iaikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0cm9wYS5vYmplY3RzLnNvcnRWYWx1ZXMob2JqLCBzb3J0Rm4pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0VmFsdWVzQWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0VmFsdWVzQWxwaGFiZXRpY2FsbHkoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gb2JqZWN0IGJ5IGl0cyBwcm9wZXJ0aWVzIG51bWVyaWNhbGx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQGV4YW1wbGVcclxuICogIHZhciB3b3Jkc0NvdW50ZWQ7XHJcbiAqICB3b3Jkc0NvdW50ZWQgPSB7XHJcbiAqICAgICAgXCIzXCIgOiBcIkRvY3VtZW50IEFcIixcclxuICogICAgICBcIjJcIiA6IFwiRG9jdW1lbnQgWlwiLFxyXG4gKiAgICAgIFwiMVwiIDogXCJEb2N1bWVudCBNXCJcclxuICogIH07XHJcbiAqICBjb25zb2xlLmxvZyggYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXNOdW1lcmljYWxseSh3b3Jkc0NvdW50ZWQpICk7XHJcbiAqICAvLyBsb2dzOiBbW1wiMVwiLCBcIkRvY3VtZW50IE1cIl0sIFtcIjJcIiwgXCJEb2N1bWVudCBaXCJdLCBbXCIzXCIsIFwiRG9jdW1lbnQgQVwiXV1cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBIHNpbXBsZSBvYmplY3Qgd2hlcmUgdGhlIHByb3BlcnRpZXNcclxuICogIGFsbCBoYXZlIG51bWVyaWMtaXNoIHZhbHVlcy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIGFycmF5cyB3aGVyZSBlYWNoXHJcbiAqICBuZXN0ZWQgYXJyYXkgd2lsbCBoYXZlIHRoZSBvYmplY3RzIGtleSBzdG9yZWQgaW4gZWxlbWVudCAwIGFuZFxyXG4gKiAgdGhlIHZhbHVlIHN0b3JlZCBpbiBlbGVtZW50IDEuXHJcbiAqIEBzZWUgYXRyb3BhLm9iamVjdHMuc29ydFxyXG4gKi9cclxuYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXNOdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnRQcm9wZXJ0aWVzTnVtZXJpY2FsbHkoXHJcbiAgICBvYmpcclxuKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGZ1bmN0aW9uIHNvcnRGbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhIC0gYik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXRyb3BhLm9iamVjdHMuc29ydFByb3BlcnRpZXMob2JqLCBzb3J0Rm4pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEub2JqZWN0cy5zb3J0UHJvcGVydGllc0FscGhhYmV0aWNhbGx5ID0gXHJcbmZ1bmN0aW9uIHNvcnRQcm9wZXJ0aWVzQWxwaGFiZXRpY2FsbHkob2JqKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iXX0=
;