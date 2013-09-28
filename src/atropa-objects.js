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
