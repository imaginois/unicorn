/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _rx = __webpack_require__(1);

	var _rx2 = _interopRequireDefault(_rx);

	var _core = __webpack_require__(4);

	var _core2 = _interopRequireDefault(_core);

	var _cycleSnabbdom = __webpack_require__(5);

	var _http = __webpack_require__(24);

	var _history = __webpack_require__(29);

	var _Content = __webpack_require__(59);

	var _Content2 = _interopRequireDefault(_Content);

	__webpack_require__(73);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//webpack will inline this

	var header = (0, _cycleSnabbdom.h)('header', {}, [(0, _cycleSnabbdom.h)('a', { attrs: { href: '/' } }, 'Color Changer'), (0, _cycleSnabbdom.h)('a', { attrs: { href: '/github' } }, 'Github Search'), (0, _cycleSnabbdom.h)('a', { attrs: { href: '/hero-simple' } }, 'Hero Transition (Simple)'), (0, _cycleSnabbdom.h)('a', { attrs: { href: '/hero-complex' } }, 'Hero Transition (Complex)'), (0, _cycleSnabbdom.h)('a', { attrs: { href: '/hero-tests' } }, 'Hero Transition (Tests)')]);

	var view = function view(hdr, cont) {
	  return (0, _cycleSnabbdom.h)('div.app-wrapper', {}, [hdr, (0, _cycleSnabbdom.h)('main.content-holder', {}, [cont])]);
	};

	function main(sources) {
	  //Link filtering
	  var url$ = sources.DOM.select('a').events('click').filter(_history.filterLinks).map(function (event) {
	    return event.target.pathname;
	  });

	  var content = (0, _Content2.default)(sources);

	  var view$ = _rx2.default.Observable.just(view(header, content.DOM));

	  return { DOM: view$, HTTP: content.HTTP, History: url$ };
	}

	_core2.default.run(main, {

	  DOM: (0, _cycleSnabbdom.makeDOMDriver)('#app-container', [__webpack_require__(20), __webpack_require__(77), __webpack_require__(23), __webpack_require__(21), __webpack_require__(22)]),
	  HTTP: (0, _http.makeHTTPDriver)(),
	  History: (0, _history.makeHistoryDriver)({ hash: false, queries: true })
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global, process) {// Copyright (c) Microsoft, All rights reserved. See License.txt in the project root for license information.

	;(function (undefined) {

	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  function checkGlobal(value) {
	    return (value && value.Object === Object) ? value : null;
	  }

	  var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
	  var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
	  var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
	  var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	  var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	  var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
	  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	  var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();

	  var Rx = {
	    internals: {},
	    config: {
	      Promise: root.Promise
	    },
	    helpers: { }
	  };

	  // Defaults
	  var noop = Rx.helpers.noop = function () { },
	    identity = Rx.helpers.identity = function (x) { return x; },
	    defaultNow = Rx.helpers.defaultNow = Date.now,
	    defaultComparer = Rx.helpers.defaultComparer = function (x, y) { return isEqual(x, y); },
	    defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) { return x > y ? 1 : (x < y ? -1 : 0); },
	    defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) { return x.toString(); },
	    defaultError = Rx.helpers.defaultError = function (err) { throw err; },
	    isPromise = Rx.helpers.isPromise = function (p) { return !!p && typeof p.subscribe !== 'function' && typeof p.then === 'function'; },
	    isFunction = Rx.helpers.isFunction = (function () {

	      var isFn = function (value) {
	        return typeof value == 'function' || false;
	      };

	      // fallback for older versions of Chrome and Safari
	      if (isFn(/x/)) {
	        isFn = function(value) {
	          return typeof value == 'function' && toString.call(value) == '[object Function]';
	        };
	      }

	      return isFn;
	    }());

	  function cloneArray(arr) { for(var a = [], i = 0, len = arr.length; i < len; i++) { a.push(arr[i]); } return a;}

	  var errorObj = {e: {}};
	  
	  function tryCatcherGen(tryCatchTarget) {
	    return function tryCatcher() {
	      try {
	        return tryCatchTarget.apply(this, arguments);
	      } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	      }
	    };
	  }

	  var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
	    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
	    return tryCatcherGen(fn);
	  };

	  function thrower(e) {
	    throw e;
	  }

	  Rx.config.longStackSupport = false;
	  var hasStacks = false, stacks = tryCatch(function () { throw new Error(); })();
	  hasStacks = !!stacks.e && !!stacks.e.stack;

	  // All code after this point will be filtered from stack traces reported by RxJS
	  var rStartingLine = captureLine(), rFileName;

	  var STACK_JUMP_SEPARATOR = 'From previous event:';

	  function makeStackTraceLong(error, observable) {
	    // If possible, transform the error stack trace by removing Node and RxJS
	    // cruft, then concatenating with the stack trace of `observable`.
	    if (hasStacks &&
	        observable.stack &&
	        typeof error === 'object' &&
	        error !== null &&
	        error.stack &&
	        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
	    ) {
	      var stacks = [];
	      for (var o = observable; !!o; o = o.source) {
	        if (o.stack) {
	          stacks.unshift(o.stack);
	        }
	      }
	      stacks.unshift(error.stack);

	      var concatedStacks = stacks.join('\n' + STACK_JUMP_SEPARATOR + '\n');
	      error.stack = filterStackString(concatedStacks);
	    }
	  }

	  function filterStackString(stackString) {
	    var lines = stackString.split('\n'), desiredLines = [];
	    for (var i = 0, len = lines.length; i < len; i++) {
	      var line = lines[i];

	      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	        desiredLines.push(line);
	      }
	    }
	    return desiredLines.join('\n');
	  }

	  function isInternalFrame(stackLine) {
	    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
	    if (!fileNameAndLineNumber) {
	      return false;
	    }
	    var fileName = fileNameAndLineNumber[0], lineNumber = fileNameAndLineNumber[1];

	    return fileName === rFileName &&
	      lineNumber >= rStartingLine &&
	      lineNumber <= rEndingLine;
	  }

	  function isNodeFrame(stackLine) {
	    return stackLine.indexOf('(module.js:') !== -1 ||
	      stackLine.indexOf('(node.js:') !== -1;
	  }

	  function captureLine() {
	    if (!hasStacks) { return; }

	    try {
	      throw new Error();
	    } catch (e) {
	      var lines = e.stack.split('\n');
	      var firstLine = lines[0].indexOf('@') > 0 ? lines[1] : lines[2];
	      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	      if (!fileNameAndLineNumber) { return; }

	      rFileName = fileNameAndLineNumber[0];
	      return fileNameAndLineNumber[1];
	    }
	  }

	  function getFileNameAndLineNumber(stackLine) {
	    // Named functions: 'at functionName (filename:lineNumber:columnNumber)'
	    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	    if (attempt1) { return [attempt1[1], Number(attempt1[2])]; }

	    // Anonymous functions: 'at filename:lineNumber:columnNumber'
	    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	    if (attempt2) { return [attempt2[1], Number(attempt2[2])]; }

	    // Firefox style: 'function@filename:lineNumber or @filename:lineNumber'
	    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	    if (attempt3) { return [attempt3[1], Number(attempt3[2])]; }
	  }

	  var EmptyError = Rx.EmptyError = function() {
	    this.message = 'Sequence contains no elements.';
	    Error.call(this);
	  };
	  EmptyError.prototype = Object.create(Error.prototype);
	  EmptyError.prototype.name = 'EmptyError';

	  var ObjectDisposedError = Rx.ObjectDisposedError = function() {
	    this.message = 'Object has been disposed';
	    Error.call(this);
	  };
	  ObjectDisposedError.prototype = Object.create(Error.prototype);
	  ObjectDisposedError.prototype.name = 'ObjectDisposedError';

	  var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function () {
	    this.message = 'Argument out of range';
	    Error.call(this);
	  };
	  ArgumentOutOfRangeError.prototype = Object.create(Error.prototype);
	  ArgumentOutOfRangeError.prototype.name = 'ArgumentOutOfRangeError';

	  var NotSupportedError = Rx.NotSupportedError = function (message) {
	    this.message = message || 'This operation is not supported';
	    Error.call(this);
	  };
	  NotSupportedError.prototype = Object.create(Error.prototype);
	  NotSupportedError.prototype.name = 'NotSupportedError';

	  var NotImplementedError = Rx.NotImplementedError = function (message) {
	    this.message = message || 'This operation is not implemented';
	    Error.call(this);
	  };
	  NotImplementedError.prototype = Object.create(Error.prototype);
	  NotImplementedError.prototype.name = 'NotImplementedError';

	  var notImplemented = Rx.helpers.notImplemented = function () {
	    throw new NotImplementedError();
	  };

	  var notSupported = Rx.helpers.notSupported = function () {
	    throw new NotSupportedError();
	  };

	  // Shim in iterator support
	  var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) ||
	    '_es6shim_iterator_';
	  // Bug for mozilla version
	  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
	    $iterator$ = '@@iterator';
	  }

	  var doneEnumerator = Rx.doneEnumerator = { done: true, value: undefined };

	  var isIterable = Rx.helpers.isIterable = function (o) {
	    return o && o[$iterator$] !== undefined;
	  };

	  var isArrayLike = Rx.helpers.isArrayLike = function (o) {
	    return o && o.length !== undefined;
	  };

	  Rx.helpers.iterator = $iterator$;

	  var bindCallback = Rx.internals.bindCallback = function (func, thisArg, argCount) {
	    if (typeof thisArg === 'undefined') { return func; }
	    switch(argCount) {
	      case 0:
	        return function() {
	          return func.call(thisArg)
	        };
	      case 1:
	        return function(arg) {
	          return func.call(thisArg, arg);
	        };
	      case 2:
	        return function(value, index) {
	          return func.call(thisArg, value, index);
	        };
	      case 3:
	        return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	    }

	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  };

	  /** Used to determine if values are of the language type Object */
	  var dontEnums = ['toString',
	    'toLocaleString',
	    'valueOf',
	    'hasOwnProperty',
	    'isPrototypeOf',
	    'propertyIsEnumerable',
	    'constructor'],
	  dontEnumsLength = dontEnums.length;

	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	var objectProto = Object.prototype,
	    hasOwnProperty = objectProto.hasOwnProperty,
	    objToString = objectProto.toString,
	    MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	var keys = Object.keys || (function() {
	    var hasOwnProperty = Object.prototype.hasOwnProperty,
	        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
	        dontEnums = [
	          'toString',
	          'toLocaleString',
	          'valueOf',
	          'hasOwnProperty',
	          'isPrototypeOf',
	          'propertyIsEnumerable',
	          'constructor'
	        ],
	        dontEnumsLength = dontEnums.length;

	    return function(obj) {
	      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
	        throw new TypeError('Object.keys called on non-object');
	      }

	      var result = [], prop, i;

	      for (prop in obj) {
	        if (hasOwnProperty.call(obj, prop)) {
	          result.push(prop);
	        }
	      }

	      if (hasDontEnumBug) {
	        for (i = 0; i < dontEnumsLength; i++) {
	          if (hasOwnProperty.call(obj, dontEnums[i])) {
	            result.push(dontEnums[i]);
	          }
	        }
	      }
	      return result;
	    };
	  }());

	function equalObjects(object, other, equalFunc, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength !== othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength, key;
	  while (index--) {
	    key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result;

	    if (!(result === undefined ? equalFunc(objValue, othValue, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key === 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    if (objCtor !== othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor === 'function' && objCtor instanceof objCtor &&
	          typeof othCtor === 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      return +object === +other;

	    case errorTag:
	      return object.name === other.name && object.message === other.message;

	    case numberTag:
	      return (object !== +object) ?
	        other !== +other :
	        object === +other;

	    case regexpTag:
	    case stringTag:
	      return object === (other + '');
	  }
	  return false;
	}

	var isObject = Rx.internals.isObject = function(value) {
	  var type = typeof value;
	  return !!value && (type === 'object' || type === 'function');
	};

	function isObjectLike(value) {
	  return !!value && typeof value === 'object';
	}

	function isLength(value) {
	  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
	}

	var isHostObject = (function() {
	  try {
	    Object({ 'toString': 0 } + '');
	  } catch(e) {
	    return function() { return false; };
	  }
	  return function(value) {
	    return typeof value.toString !== 'function' && typeof (value + '') === 'string';
	  };
	}());

	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	var isArray = Array.isArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) === arrayTag;
	};

	function arraySome (array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	function equalArrays(array, other, equalFunc, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength !== othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	function baseIsEqualDeep(object, other, equalFunc, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag === argsTag) {
	      objTag = objectTag;
	    } else if (objTag !== objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag === argsTag) {
	      othTag = objectTag;
	    }
	  }
	  var objIsObj = objTag === objectTag && !isHostObject(object),
	      othIsObj = othTag === objectTag && !isHostObject(other),
	      isSameTag = objTag === othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] === object) {
	      return stackB[length] === other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	function baseIsEqual(value, other, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, isLoose, stackA, stackB);
	}

	var isEqual = Rx.internals.isEqual = function (value, other) {
	  return baseIsEqual(value, other);
	};

	  var hasProp = {}.hasOwnProperty,
	      slice = Array.prototype.slice;

	  var inherits = Rx.internals.inherits = function (child, parent) {
	    function __() { this.constructor = child; }
	    __.prototype = parent.prototype;
	    child.prototype = new __();
	  };

	  var addProperties = Rx.internals.addProperties = function (obj) {
	    for(var sources = [], i = 1, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
	    for (var idx = 0, ln = sources.length; idx < ln; idx++) {
	      var source = sources[idx];
	      for (var prop in source) {
	        obj[prop] = source[prop];
	      }
	    }
	  };

	  // Rx Utils
	  var addRef = Rx.internals.addRef = function (xs, r) {
	    return new AnonymousObservable(function (observer) {
	      return new BinaryDisposable(r.getDisposable(), xs.subscribe(observer));
	    });
	  };

	  function arrayInitialize(count, factory) {
	    var a = new Array(count);
	    for (var i = 0; i < count; i++) {
	      a[i] = factory();
	    }
	    return a;
	  }

	  function IndexedItem(id, value) {
	    this.id = id;
	    this.value = value;
	  }

	  IndexedItem.prototype.compareTo = function (other) {
	    var c = this.value.compareTo(other.value);
	    c === 0 && (c = this.id - other.id);
	    return c;
	  };

	  var PriorityQueue = Rx.internals.PriorityQueue = function (capacity) {
	    this.items = new Array(capacity);
	    this.length = 0;
	  };

	  var priorityProto = PriorityQueue.prototype;
	  priorityProto.isHigherPriority = function (left, right) {
	    return this.items[left].compareTo(this.items[right]) < 0;
	  };

	  priorityProto.percolate = function (index) {
	    if (index >= this.length || index < 0) { return; }
	    var parent = index - 1 >> 1;
	    if (parent < 0 || parent === index) { return; }
	    if (this.isHigherPriority(index, parent)) {
	      var temp = this.items[index];
	      this.items[index] = this.items[parent];
	      this.items[parent] = temp;
	      this.percolate(parent);
	    }
	  };

	  priorityProto.heapify = function (index) {
	    +index || (index = 0);
	    if (index >= this.length || index < 0) { return; }
	    var left = 2 * index + 1,
	        right = 2 * index + 2,
	        first = index;
	    if (left < this.length && this.isHigherPriority(left, first)) {
	      first = left;
	    }
	    if (right < this.length && this.isHigherPriority(right, first)) {
	      first = right;
	    }
	    if (first !== index) {
	      var temp = this.items[index];
	      this.items[index] = this.items[first];
	      this.items[first] = temp;
	      this.heapify(first);
	    }
	  };

	  priorityProto.peek = function () { return this.items[0].value; };

	  priorityProto.removeAt = function (index) {
	    this.items[index] = this.items[--this.length];
	    this.items[this.length] = undefined;
	    this.heapify();
	  };

	  priorityProto.dequeue = function () {
	    var result = this.peek();
	    this.removeAt(0);
	    return result;
	  };

	  priorityProto.enqueue = function (item) {
	    var index = this.length++;
	    this.items[index] = new IndexedItem(PriorityQueue.count++, item);
	    this.percolate(index);
	  };

	  priorityProto.remove = function (item) {
	    for (var i = 0; i < this.length; i++) {
	      if (this.items[i].value === item) {
	        this.removeAt(i);
	        return true;
	      }
	    }
	    return false;
	  };
	  PriorityQueue.count = 0;

	  /**
	   * Represents a group of disposable resources that are disposed together.
	   * @constructor
	   */
	  var CompositeDisposable = Rx.CompositeDisposable = function () {
	    var args = [], i, len;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      len = arguments.length;
	      args = new Array(len);
	      for(i = 0; i < len; i++) { args[i] = arguments[i]; }
	    }
	    this.disposables = args;
	    this.isDisposed = false;
	    this.length = args.length;
	  };

	  var CompositeDisposablePrototype = CompositeDisposable.prototype;

	  /**
	   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
	   * @param {Mixed} item Disposable to add.
	   */
	  CompositeDisposablePrototype.add = function (item) {
	    if (this.isDisposed) {
	      item.dispose();
	    } else {
	      this.disposables.push(item);
	      this.length++;
	    }
	  };

	  /**
	   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
	   * @param {Mixed} item Disposable to remove.
	   * @returns {Boolean} true if found; false otherwise.
	   */
	  CompositeDisposablePrototype.remove = function (item) {
	    var shouldDispose = false;
	    if (!this.isDisposed) {
	      var idx = this.disposables.indexOf(item);
	      if (idx !== -1) {
	        shouldDispose = true;
	        this.disposables.splice(idx, 1);
	        this.length--;
	        item.dispose();
	      }
	    }
	    return shouldDispose;
	  };

	  /**
	   *  Disposes all disposables in the group and removes them from the group.
	   */
	  CompositeDisposablePrototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var len = this.disposables.length, currentDisposables = new Array(len);
	      for(var i = 0; i < len; i++) { currentDisposables[i] = this.disposables[i]; }
	      this.disposables = [];
	      this.length = 0;

	      for (i = 0; i < len; i++) {
	        currentDisposables[i].dispose();
	      }
	    }
	  };

	  /**
	   * Provides a set of static methods for creating Disposables.
	   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
	   */
	  var Disposable = Rx.Disposable = function (action) {
	    this.isDisposed = false;
	    this.action = action || noop;
	  };

	  /** Performs the task of cleaning up resources. */
	  Disposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.action();
	      this.isDisposed = true;
	    }
	  };

	  /**
	   * Creates a disposable object that invokes the specified action when disposed.
	   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
	   * @return {Disposable} The disposable object that runs the given action upon disposal.
	   */
	  var disposableCreate = Disposable.create = function (action) { return new Disposable(action); };

	  /**
	   * Gets the disposable that does nothing when disposed.
	   */
	  var disposableEmpty = Disposable.empty = { dispose: noop };

	  /**
	   * Validates whether the given object is a disposable
	   * @param {Object} Object to test whether it has a dispose method
	   * @returns {Boolean} true if a disposable object, else false.
	   */
	  var isDisposable = Disposable.isDisposable = function (d) {
	    return d && isFunction(d.dispose);
	  };

	  var checkDisposed = Disposable.checkDisposed = function (disposable) {
	    if (disposable.isDisposed) { throw new ObjectDisposedError(); }
	  };

	  var disposableFixup = Disposable._fixup = function (result) {
	    return isDisposable(result) ? result : disposableEmpty;
	  };

	  // Single assignment
	  var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function () {
	    this.isDisposed = false;
	    this.current = null;
	  };
	  SingleAssignmentDisposable.prototype.getDisposable = function () {
	    return this.current;
	  };
	  SingleAssignmentDisposable.prototype.setDisposable = function (value) {
	    if (this.current) { throw new Error('Disposable has already been assigned'); }
	    var shouldDispose = this.isDisposed;
	    !shouldDispose && (this.current = value);
	    shouldDispose && value && value.dispose();
	  };
	  SingleAssignmentDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old = this.current;
	      this.current = null;
	      old && old.dispose();
	    }
	  };

	  // Multiple assignment disposable
	  var SerialDisposable = Rx.SerialDisposable = function () {
	    this.isDisposed = false;
	    this.current = null;
	  };
	  SerialDisposable.prototype.getDisposable = function () {
	    return this.current;
	  };
	  SerialDisposable.prototype.setDisposable = function (value) {
	    var shouldDispose = this.isDisposed;
	    if (!shouldDispose) {
	      var old = this.current;
	      this.current = value;
	    }
	    old && old.dispose();
	    shouldDispose && value && value.dispose();
	  };
	  SerialDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old = this.current;
	      this.current = null;
	    }
	    old && old.dispose();
	  };

	  var BinaryDisposable = Rx.BinaryDisposable = function (first, second) {
	    this._first = first;
	    this._second = second;
	    this.isDisposed = false;
	  };

	  BinaryDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old1 = this._first;
	      this._first = null;
	      old1 && old1.dispose();
	      var old2 = this._second;
	      this._second = null;
	      old2 && old2.dispose();
	    }
	  };

	  var NAryDisposable = Rx.NAryDisposable = function (disposables) {
	    this._disposables = disposables;
	    this.isDisposed = false;
	  };

	  NAryDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      for (var i = 0, len = this._disposables.length; i < len; i++) {
	        this._disposables[i].dispose();
	      }
	      this._disposables.length = 0;
	    }
	  };

	  /**
	   * Represents a disposable resource that only disposes its underlying disposable resource when all dependent disposable objects have been disposed.
	   */
	  var RefCountDisposable = Rx.RefCountDisposable = (function () {

	    function InnerDisposable(disposable) {
	      this.disposable = disposable;
	      this.disposable.count++;
	      this.isInnerDisposed = false;
	    }

	    InnerDisposable.prototype.dispose = function () {
	      if (!this.disposable.isDisposed && !this.isInnerDisposed) {
	        this.isInnerDisposed = true;
	        this.disposable.count--;
	        if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
	          this.disposable.isDisposed = true;
	          this.disposable.underlyingDisposable.dispose();
	        }
	      }
	    };

	    /**
	     * Initializes a new instance of the RefCountDisposable with the specified disposable.
	     * @constructor
	     * @param {Disposable} disposable Underlying disposable.
	      */
	    function RefCountDisposable(disposable) {
	      this.underlyingDisposable = disposable;
	      this.isDisposed = false;
	      this.isPrimaryDisposed = false;
	      this.count = 0;
	    }

	    /**
	     * Disposes the underlying disposable only when all dependent disposables have been disposed
	     */
	    RefCountDisposable.prototype.dispose = function () {
	      if (!this.isDisposed && !this.isPrimaryDisposed) {
	        this.isPrimaryDisposed = true;
	        if (this.count === 0) {
	          this.isDisposed = true;
	          this.underlyingDisposable.dispose();
	        }
	      }
	    };

	    /**
	     * Returns a dependent disposable that when disposed decreases the refcount on the underlying disposable.
	     * @returns {Disposable} A dependent disposable contributing to the reference count that manages the underlying disposable's lifetime.
	     */
	    RefCountDisposable.prototype.getDisposable = function () {
	      return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
	    };

	    return RefCountDisposable;
	  })();

	  function ScheduledDisposable(scheduler, disposable) {
	    this.scheduler = scheduler;
	    this.disposable = disposable;
	    this.isDisposed = false;
	  }

	  function scheduleItem(s, self) {
	    if (!self.isDisposed) {
	      self.isDisposed = true;
	      self.disposable.dispose();
	    }
	  }

	  ScheduledDisposable.prototype.dispose = function () {
	    this.scheduler.schedule(this, scheduleItem);
	  };

	  var ScheduledItem = Rx.internals.ScheduledItem = function (scheduler, state, action, dueTime, comparer) {
	    this.scheduler = scheduler;
	    this.state = state;
	    this.action = action;
	    this.dueTime = dueTime;
	    this.comparer = comparer || defaultSubComparer;
	    this.disposable = new SingleAssignmentDisposable();
	  };

	  ScheduledItem.prototype.invoke = function () {
	    this.disposable.setDisposable(this.invokeCore());
	  };

	  ScheduledItem.prototype.compareTo = function (other) {
	    return this.comparer(this.dueTime, other.dueTime);
	  };

	  ScheduledItem.prototype.isCancelled = function () {
	    return this.disposable.isDisposed;
	  };

	  ScheduledItem.prototype.invokeCore = function () {
	    return disposableFixup(this.action(this.scheduler, this.state));
	  };

	  /** Provides a set of static properties to access commonly used schedulers. */
	  var Scheduler = Rx.Scheduler = (function () {

	    function Scheduler() { }

	    /** Determines whether the given object is a scheduler */
	    Scheduler.isScheduler = function (s) {
	      return s instanceof Scheduler;
	    };

	    var schedulerProto = Scheduler.prototype;

	    /**
	   * Schedules an action to be executed.
	   * @param state State passed to the action to be executed.
	   * @param {Function} action Action to be executed.
	   * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	   */
	    schedulerProto.schedule = function (state, action) {
	      throw new NotImplementedError();
	    };

	  /**
	   * Schedules an action to be executed after dueTime.
	   * @param state State passed to the action to be executed.
	   * @param {Function} action Action to be executed.
	   * @param {Number} dueTime Relative time after which to execute the action.
	   * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	   */
	    schedulerProto.scheduleFuture = function (state, dueTime, action) {
	      var dt = dueTime;
	      dt instanceof Date && (dt = dt - this.now());
	      dt = Scheduler.normalize(dt);

	      if (dt === 0) { return this.schedule(state, action); }

	      return this._scheduleFuture(state, dt, action);
	    };

	    schedulerProto._scheduleFuture = function (state, dueTime, action) {
	      throw new NotImplementedError();
	    };

	    /** Gets the current time according to the local machine's system clock. */
	    Scheduler.now = defaultNow;

	    /** Gets the current time according to the local machine's system clock. */
	    Scheduler.prototype.now = defaultNow;

	    /**
	     * Normalizes the specified TimeSpan value to a positive value.
	     * @param {Number} timeSpan The time span value to normalize.
	     * @returns {Number} The specified TimeSpan value if it is zero or positive; otherwise, 0
	     */
	    Scheduler.normalize = function (timeSpan) {
	      timeSpan < 0 && (timeSpan = 0);
	      return timeSpan;
	    };

	    return Scheduler;
	  }());

	  var normalizeTime = Scheduler.normalize, isScheduler = Scheduler.isScheduler;

	  (function (schedulerProto) {

	    function invokeRecImmediate(scheduler, pair) {
	      var state = pair[0], action = pair[1], group = new CompositeDisposable();
	      action(state, innerAction);
	      return group;

	      function innerAction(state2) {
	        var isAdded = false, isDone = false;

	        var d = scheduler.schedule(state2, scheduleWork);
	        if (!isDone) {
	          group.add(d);
	          isAdded = true;
	        }

	        function scheduleWork(_, state3) {
	          if (isAdded) {
	            group.remove(d);
	          } else {
	            isDone = true;
	          }
	          action(state3, innerAction);
	          return disposableEmpty;
	        }
	      }
	    }

	    function invokeRecDate(scheduler, pair) {
	      var state = pair[0], action = pair[1], group = new CompositeDisposable();
	      action(state, innerAction);
	      return group;

	      function innerAction(state2, dueTime1) {
	        var isAdded = false, isDone = false;

	        var d = scheduler.scheduleFuture(state2, dueTime1, scheduleWork);
	        if (!isDone) {
	          group.add(d);
	          isAdded = true;
	        }

	        function scheduleWork(_, state3) {
	          if (isAdded) {
	            group.remove(d);
	          } else {
	            isDone = true;
	          }
	          action(state3, innerAction);
	          return disposableEmpty;
	        }
	      }
	    }

	    /**
	     * Schedules an action to be executed recursively.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in recursive invocation state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursive = function (state, action) {
	      return this.schedule([state, action], invokeRecImmediate);
	    };

	    /**
	     * Schedules an action to be executed recursively after a specified relative or absolute due time.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
	     * @param {Number | Date} dueTime Relative or absolute time after which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveFuture = function (state, dueTime, action) {
	      return this.scheduleFuture([state, action], dueTime, invokeRecDate);
	    };

	  }(Scheduler.prototype));

	  (function (schedulerProto) {

	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
	     * @param {Mixed} state Initial state passed to the action upon the first iteration.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed, potentially updating the state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    schedulerProto.schedulePeriodic = function(state, period, action) {
	      if (typeof root.setInterval === 'undefined') { throw new NotSupportedError(); }
	      period = normalizeTime(period);
	      var s = state, id = root.setInterval(function () { s = action(s); }, period);
	      return disposableCreate(function () { root.clearInterval(id); });
	    };

	  }(Scheduler.prototype));

	  (function (schedulerProto) {
	    /**
	     * Returns a scheduler that wraps the original scheduler, adding exception handling for scheduled actions.
	     * @param {Function} handler Handler that's run if an exception is caught. The exception will be rethrown if the handler returns false.
	     * @returns {Scheduler} Wrapper around the original scheduler, enforcing exception handling.
	     */
	    schedulerProto.catchError = schedulerProto['catch'] = function (handler) {
	      return new CatchScheduler(this, handler);
	    };
	  }(Scheduler.prototype));

	  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function () {
	    function createTick(self) {
	      return function tick(command, recurse) {
	        recurse(0, self._period);
	        var state = tryCatch(self._action)(self._state);
	        if (state === errorObj) {
	          self._cancel.dispose();
	          thrower(state.e);
	        }
	        self._state = state;
	      };
	    }

	    function SchedulePeriodicRecursive(scheduler, state, period, action) {
	      this._scheduler = scheduler;
	      this._state = state;
	      this._period = period;
	      this._action = action;
	    }

	    SchedulePeriodicRecursive.prototype.start = function () {
	      var d = new SingleAssignmentDisposable();
	      this._cancel = d;
	      d.setDisposable(this._scheduler.scheduleRecursiveFuture(0, this._period, createTick(this)));

	      return d;
	    };

	    return SchedulePeriodicRecursive;
	  }());

	  /** Gets a scheduler that schedules work immediately on the current thread. */
	   var ImmediateScheduler = (function (__super__) {
	    inherits(ImmediateScheduler, __super__);
	    function ImmediateScheduler() {
	      __super__.call(this);
	    }

	    ImmediateScheduler.prototype.schedule = function (state, action) {
	      return disposableFixup(action(this, state));
	    };

	    return ImmediateScheduler;
	  }(Scheduler));

	  var immediateScheduler = Scheduler.immediate = new ImmediateScheduler();

	  /**
	   * Gets a scheduler that schedules work as soon as possible on the current thread.
	   */
	  var CurrentThreadScheduler = (function (__super__) {
	    var queue;

	    function runTrampoline () {
	      while (queue.length > 0) {
	        var item = queue.dequeue();
	        !item.isCancelled() && item.invoke();
	      }
	    }

	    inherits(CurrentThreadScheduler, __super__);
	    function CurrentThreadScheduler() {
	      __super__.call(this);
	    }

	    CurrentThreadScheduler.prototype.schedule = function (state, action) {
	      var si = new ScheduledItem(this, state, action, this.now());

	      if (!queue) {
	        queue = new PriorityQueue(4);
	        queue.enqueue(si);

	        var result = tryCatch(runTrampoline)();
	        queue = null;
	        if (result === errorObj) { thrower(result.e); }
	      } else {
	        queue.enqueue(si);
	      }
	      return si.disposable;
	    };

	    CurrentThreadScheduler.prototype.scheduleRequired = function () { return !queue; };

	    return CurrentThreadScheduler;
	  }(Scheduler));

	  var currentThreadScheduler = Scheduler.currentThread = new CurrentThreadScheduler();

	  var scheduleMethod, clearMethod;

	  var localTimer = (function () {
	    var localSetTimeout, localClearTimeout = noop;
	    if (!!root.setTimeout) {
	      localSetTimeout = root.setTimeout;
	      localClearTimeout = root.clearTimeout;
	    } else if (!!root.WScript) {
	      localSetTimeout = function (fn, time) {
	        root.WScript.Sleep(time);
	        fn();
	      };
	    } else {
	      throw new NotSupportedError();
	    }

	    return {
	      setTimeout: localSetTimeout,
	      clearTimeout: localClearTimeout
	    };
	  }());
	  var localSetTimeout = localTimer.setTimeout,
	    localClearTimeout = localTimer.clearTimeout;

	  (function () {

	    var nextHandle = 1, tasksByHandle = {}, currentlyRunning = false;

	    clearMethod = function (handle) {
	      delete tasksByHandle[handle];
	    };

	    function runTask(handle) {
	      if (currentlyRunning) {
	        localSetTimeout(function () { runTask(handle); }, 0);
	      } else {
	        var task = tasksByHandle[handle];
	        if (task) {
	          currentlyRunning = true;
	          var result = tryCatch(task)();
	          clearMethod(handle);
	          currentlyRunning = false;
	          if (result === errorObj) { thrower(result.e); }
	        }
	      }
	    }

	    var reNative = new RegExp('^' +
	      String(toString)
	        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	        .replace(/toString| for [^\]]+/g, '.*?') + '$'
	    );

	    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' &&
	      !reNative.test(setImmediate) && setImmediate;

	    function postMessageSupported () {
	      // Ensure not in a worker
	      if (!root.postMessage || root.importScripts) { return false; }
	      var isAsync = false, oldHandler = root.onmessage;
	      // Test for async
	      root.onmessage = function () { isAsync = true; };
	      root.postMessage('', '*');
	      root.onmessage = oldHandler;

	      return isAsync;
	    }

	    // Use in order, setImmediate, nextTick, postMessage, MessageChannel, script readystatechanged, setTimeout
	    if (isFunction(setImmediate)) {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        setImmediate(function () { runTask(id); });

	        return id;
	      };
	    } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        process.nextTick(function () { runTask(id); });

	        return id;
	      };
	    } else if (postMessageSupported()) {
	      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();

	      var onGlobalPostMessage = function (event) {
	        // Only if we're a match to avoid any other global events
	        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
	          runTask(event.data.substring(MSG_PREFIX.length));
	        }
	      };

	      root.addEventListener('message', onGlobalPostMessage, false);

	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        root.postMessage(MSG_PREFIX + currentId, '*');
	        return id;
	      };
	    } else if (!!root.MessageChannel) {
	      var channel = new root.MessageChannel();

	      channel.port1.onmessage = function (e) { runTask(e.data); };

	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        channel.port2.postMessage(id);
	        return id;
	      };
	    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {

	      scheduleMethod = function (action) {
	        var scriptElement = root.document.createElement('script');
	        var id = nextHandle++;
	        tasksByHandle[id] = action;

	        scriptElement.onreadystatechange = function () {
	          runTask(id);
	          scriptElement.onreadystatechange = null;
	          scriptElement.parentNode.removeChild(scriptElement);
	          scriptElement = null;
	        };
	        root.document.documentElement.appendChild(scriptElement);
	        return id;
	      };

	    } else {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        localSetTimeout(function () {
	          runTask(id);
	        }, 0);

	        return id;
	      };
	    }
	  }());

	  /**
	   * Gets a scheduler that schedules work via a timed callback based upon platform.
	   */
	   var DefaultScheduler = (function (__super__) {
	     inherits(DefaultScheduler, __super__);
	     function DefaultScheduler() {
	       __super__.call(this);
	     }

	     function scheduleAction(disposable, action, scheduler, state) {
	       return function schedule() {
	         disposable.setDisposable(Disposable._fixup(action(scheduler, state)));
	       };
	     }

	     function ClearDisposable(id) {
	       this._id = id;
	       this.isDisposed = false;
	     }

	     ClearDisposable.prototype.dispose = function () {
	       if (!this.isDisposed) {
	         this.isDisposed = true;
	         clearMethod(this._id);
	       }
	     };

	     function LocalClearDisposable(id) {
	       this._id = id;
	       this.isDisposed = false;
	     }

	     LocalClearDisposable.prototype.dispose = function () {
	       if (!this.isDisposed) {
	         this.isDisposed = true;
	         localClearTimeout(this._id);
	       }
	     };

	    DefaultScheduler.prototype.schedule = function (state, action) {
	      var disposable = new SingleAssignmentDisposable(),
	          id = scheduleMethod(scheduleAction(disposable, action, this, state));
	      return new BinaryDisposable(disposable, new ClearDisposable(id));
	    };

	    DefaultScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
	      if (dueTime === 0) { return this.schedule(state, action); }
	      var disposable = new SingleAssignmentDisposable(),
	          id = localSetTimeout(scheduleAction(disposable, action, this, state), dueTime);
	      return new BinaryDisposable(disposable, new LocalClearDisposable(id));
	    };

	    return DefaultScheduler;
	  }(Scheduler));

	  var defaultScheduler = Scheduler['default'] = Scheduler.async = new DefaultScheduler();

	  var CatchScheduler = (function (__super__) {
	    inherits(CatchScheduler, __super__);

	    function CatchScheduler(scheduler, handler) {
	      this._scheduler = scheduler;
	      this._handler = handler;
	      this._recursiveOriginal = null;
	      this._recursiveWrapper = null;
	      __super__.call(this);
	    }

	    CatchScheduler.prototype.schedule = function (state, action) {
	      return this._scheduler.schedule(state, this._wrap(action));
	    };

	    CatchScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
	      return this._scheduler.schedule(state, dueTime, this._wrap(action));
	    };

	    CatchScheduler.prototype.now = function () { return this._scheduler.now(); };

	    CatchScheduler.prototype._clone = function (scheduler) {
	        return new CatchScheduler(scheduler, this._handler);
	    };

	    CatchScheduler.prototype._wrap = function (action) {
	      var parent = this;
	      return function (self, state) {
	        var res = tryCatch(action)(parent._getRecursiveWrapper(self), state);
	        if (res === errorObj) {
	          if (!parent._handler(res.e)) { thrower(res.e); }
	          return disposableEmpty;
	        }
	        return disposableFixup(res);
	      };
	    };

	    CatchScheduler.prototype._getRecursiveWrapper = function (scheduler) {
	      if (this._recursiveOriginal !== scheduler) {
	        this._recursiveOriginal = scheduler;
	        var wrapper = this._clone(scheduler);
	        wrapper._recursiveOriginal = scheduler;
	        wrapper._recursiveWrapper = wrapper;
	        this._recursiveWrapper = wrapper;
	      }
	      return this._recursiveWrapper;
	    };

	    CatchScheduler.prototype.schedulePeriodic = function (state, period, action) {
	      var self = this, failed = false, d = new SingleAssignmentDisposable();

	      d.setDisposable(this._scheduler.schedulePeriodic(state, period, function (state1) {
	        if (failed) { return null; }
	        var res = tryCatch(action)(state1);
	        if (res === errorObj) {
	          failed = true;
	          if (!self._handler(res.e)) { thrower(res.e); }
	          d.dispose();
	          return null;
	        }
	        return res;
	      }));

	      return d;
	    };

	    return CatchScheduler;
	  }(Scheduler));

	  /**
	   *  Represents a notification to an observer.
	   */
	  var Notification = Rx.Notification = (function () {
	    function Notification() {

	    }

	    Notification.prototype._accept = function (onNext, onError, onCompleted) {
	      throw new NotImplementedError();
	    };

	    Notification.prototype._acceptObserver = function (onNext, onError, onCompleted) {
	      throw new NotImplementedError();
	    };

	    /**
	     * Invokes the delegate corresponding to the notification or the observer's method corresponding to the notification and returns the produced result.
	     * @param {Function | Observer} observerOrOnNext Function to invoke for an OnNext notification or Observer to invoke the notification on..
	     * @param {Function} onError Function to invoke for an OnError notification.
	     * @param {Function} onCompleted Function to invoke for an OnCompleted notification.
	     * @returns {Any} Result produced by the observation.
	     */
	    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
	      return observerOrOnNext && typeof observerOrOnNext === 'object' ?
	        this._acceptObserver(observerOrOnNext) :
	        this._accept(observerOrOnNext, onError, onCompleted);
	    };

	    /**
	     * Returns an observable sequence with a single notification.
	     *
	     * @memberOf Notifications
	     * @param {Scheduler} [scheduler] Scheduler to send out the notification calls on.
	     * @returns {Observable} The observable sequence that surfaces the behavior of the notification upon subscription.
	     */
	    Notification.prototype.toObservable = function (scheduler) {
	      var self = this;
	      isScheduler(scheduler) || (scheduler = immediateScheduler);
	      return new AnonymousObservable(function (o) {
	        return scheduler.schedule(self, function (_, notification) {
	          notification._acceptObserver(o);
	          notification.kind === 'N' && o.onCompleted();
	        });
	      });
	    };

	    return Notification;
	  })();

	  var OnNextNotification = (function (__super__) {
	    inherits(OnNextNotification, __super__);
	    function OnNextNotification(value) {
	      this.value = value;
	      this.kind = 'N';
	    }

	    OnNextNotification.prototype._accept = function (onNext) {
	      return onNext(this.value);
	    };

	    OnNextNotification.prototype._acceptObserver = function (o) {
	      return o.onNext(this.value);
	    };

	    OnNextNotification.prototype.toString = function () {
	      return 'OnNext(' + this.value + ')';
	    };

	    return OnNextNotification;
	  }(Notification));

	  var OnErrorNotification = (function (__super__) {
	    inherits(OnErrorNotification, __super__);
	    function OnErrorNotification(error) {
	      this.error = error;
	      this.kind = 'E';
	    }

	    OnErrorNotification.prototype._accept = function (onNext, onError) {
	      return onError(this.error);
	    };

	    OnErrorNotification.prototype._acceptObserver = function (o) {
	      return o.onError(this.error);
	    };

	    OnErrorNotification.prototype.toString = function () {
	      return 'OnError(' + this.error + ')';
	    };

	    return OnErrorNotification;
	  }(Notification));

	  var OnCompletedNotification = (function (__super__) {
	    inherits(OnCompletedNotification, __super__);
	    function OnCompletedNotification() {
	      this.kind = 'C';
	    }

	    OnCompletedNotification.prototype._accept = function (onNext, onError, onCompleted) {
	      return onCompleted();
	    };

	    OnCompletedNotification.prototype._acceptObserver = function (o) {
	      return o.onCompleted();
	    };

	    OnCompletedNotification.prototype.toString = function () {
	      return 'OnCompleted()';
	    };

	    return OnCompletedNotification;
	  }(Notification));

	  /**
	   * Creates an object that represents an OnNext notification to an observer.
	   * @param {Any} value The value contained in the notification.
	   * @returns {Notification} The OnNext notification containing the value.
	   */
	  var notificationCreateOnNext = Notification.createOnNext = function (value) {
	    return new OnNextNotification(value);
	  };

	  /**
	   * Creates an object that represents an OnError notification to an observer.
	   * @param {Any} error The exception contained in the notification.
	   * @returns {Notification} The OnError notification containing the exception.
	   */
	  var notificationCreateOnError = Notification.createOnError = function (error) {
	    return new OnErrorNotification(error);
	  };

	  /**
	   * Creates an object that represents an OnCompleted notification to an observer.
	   * @returns {Notification} The OnCompleted notification.
	   */
	  var notificationCreateOnCompleted = Notification.createOnCompleted = function () {
	    return new OnCompletedNotification();
	  };

	  /**
	   * Supports push-style iteration over an observable sequence.
	   */
	  var Observer = Rx.Observer = function () { };

	  /**
	   *  Creates a notification callback from an observer.
	   * @returns The action that forwards its input notification to the underlying observer.
	   */
	  Observer.prototype.toNotifier = function () {
	    var observer = this;
	    return function (n) { return n.accept(observer); };
	  };

	  /**
	   *  Hides the identity of an observer.
	   * @returns An observer that hides the identity of the specified observer.
	   */
	  Observer.prototype.asObserver = function () {
	    var self = this;
	    return new AnonymousObserver(
	      function (x) { self.onNext(x); },
	      function (err) { self.onError(err); },
	      function () { self.onCompleted(); });
	  };

	  /**
	   *  Checks access to the observer for grammar violations. This includes checking for multiple OnError or OnCompleted calls, as well as reentrancy in any of the observer methods.
	   *  If a violation is detected, an Error is thrown from the offending observer method call.
	   * @returns An observer that checks callbacks invocations against the observer grammar and, if the checks pass, forwards those to the specified observer.
	   */
	  Observer.prototype.checked = function () { return new CheckedObserver(this); };

	  /**
	   *  Creates an observer from the specified OnNext, along with optional OnError, and OnCompleted actions.
	   * @param {Function} [onNext] Observer's OnNext action implementation.
	   * @param {Function} [onError] Observer's OnError action implementation.
	   * @param {Function} [onCompleted] Observer's OnCompleted action implementation.
	   * @returns {Observer} The observer object implemented using the given actions.
	   */
	  var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
	    onNext || (onNext = noop);
	    onError || (onError = defaultError);
	    onCompleted || (onCompleted = noop);
	    return new AnonymousObserver(onNext, onError, onCompleted);
	  };

	  /**
	   *  Creates an observer from a notification callback.
	   * @param {Function} handler Action that handles a notification.
	   * @returns The observer object that invokes the specified handler using a notification corresponding to each message it receives.
	   */
	  Observer.fromNotifier = function (handler, thisArg) {
	    var cb = bindCallback(handler, thisArg, 1);
	    return new AnonymousObserver(function (x) {
	      return cb(notificationCreateOnNext(x));
	    }, function (e) {
	      return cb(notificationCreateOnError(e));
	    }, function () {
	      return cb(notificationCreateOnCompleted());
	    });
	  };

	  /**
	   * Schedules the invocation of observer methods on the given scheduler.
	   * @param {Scheduler} scheduler Scheduler to schedule observer messages on.
	   * @returns {Observer} Observer whose messages are scheduled on the given scheduler.
	   */
	  Observer.prototype.notifyOn = function (scheduler) {
	    return new ObserveOnObserver(scheduler, this);
	  };

	  Observer.prototype.makeSafe = function(disposable) {
	    return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
	  };

	  /**
	   * Abstract base class for implementations of the Observer class.
	   * This base class enforces the grammar of observers where OnError and OnCompleted are terminal messages.
	   */
	  var AbstractObserver = Rx.internals.AbstractObserver = (function (__super__) {
	    inherits(AbstractObserver, __super__);

	    /**
	     * Creates a new observer in a non-stopped state.
	     */
	    function AbstractObserver() {
	      this.isStopped = false;
	    }

	    // Must be implemented by other observers
	    AbstractObserver.prototype.next = notImplemented;
	    AbstractObserver.prototype.error = notImplemented;
	    AbstractObserver.prototype.completed = notImplemented;

	    /**
	     * Notifies the observer of a new element in the sequence.
	     * @param {Any} value Next element in the sequence.
	     */
	    AbstractObserver.prototype.onNext = function (value) {
	      !this.isStopped && this.next(value);
	    };

	    /**
	     * Notifies the observer that an exception has occurred.
	     * @param {Any} error The error that has occurred.
	     */
	    AbstractObserver.prototype.onError = function (error) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.error(error);
	      }
	    };

	    /**
	     * Notifies the observer of the end of the sequence.
	     */
	    AbstractObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.completed();
	      }
	    };

	    /**
	     * Disposes the observer, causing it to transition to the stopped state.
	     */
	    AbstractObserver.prototype.dispose = function () { this.isStopped = true; };

	    AbstractObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.error(e);
	        return true;
	      }

	      return false;
	    };

	    return AbstractObserver;
	  }(Observer));

	  /**
	   * Class to create an Observer instance from delegate-based implementations of the on* methods.
	   */
	  var AnonymousObserver = Rx.AnonymousObserver = (function (__super__) {
	    inherits(AnonymousObserver, __super__);

	    /**
	     * Creates an observer from the specified OnNext, OnError, and OnCompleted actions.
	     * @param {Any} onNext Observer's OnNext action implementation.
	     * @param {Any} onError Observer's OnError action implementation.
	     * @param {Any} onCompleted Observer's OnCompleted action implementation.
	     */
	    function AnonymousObserver(onNext, onError, onCompleted) {
	      __super__.call(this);
	      this._onNext = onNext;
	      this._onError = onError;
	      this._onCompleted = onCompleted;
	    }

	    /**
	     * Calls the onNext action.
	     * @param {Any} value Next element in the sequence.
	     */
	    AnonymousObserver.prototype.next = function (value) {
	      this._onNext(value);
	    };

	    /**
	     * Calls the onError action.
	     * @param {Any} error The error that has occurred.
	     */
	    AnonymousObserver.prototype.error = function (error) {
	      this._onError(error);
	    };

	    /**
	     *  Calls the onCompleted action.
	     */
	    AnonymousObserver.prototype.completed = function () {
	      this._onCompleted();
	    };

	    return AnonymousObserver;
	  }(AbstractObserver));

	  var CheckedObserver = (function (__super__) {
	    inherits(CheckedObserver, __super__);

	    function CheckedObserver(observer) {
	      __super__.call(this);
	      this._observer = observer;
	      this._state = 0; // 0 - idle, 1 - busy, 2 - done
	    }

	    var CheckedObserverPrototype = CheckedObserver.prototype;

	    CheckedObserverPrototype.onNext = function (value) {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onNext).call(this._observer, value);
	      this._state = 0;
	      res === errorObj && thrower(res.e);
	    };

	    CheckedObserverPrototype.onError = function (err) {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onError).call(this._observer, err);
	      this._state = 2;
	      res === errorObj && thrower(res.e);
	    };

	    CheckedObserverPrototype.onCompleted = function () {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onCompleted).call(this._observer);
	      this._state = 2;
	      res === errorObj && thrower(res.e);
	    };

	    CheckedObserverPrototype.checkAccess = function () {
	      if (this._state === 1) { throw new Error('Re-entrancy detected'); }
	      if (this._state === 2) { throw new Error('Observer completed'); }
	      if (this._state === 0) { this._state = 1; }
	    };

	    return CheckedObserver;
	  }(Observer));

	  var ScheduledObserver = Rx.internals.ScheduledObserver = (function (__super__) {
	    inherits(ScheduledObserver, __super__);

	    function ScheduledObserver(scheduler, observer) {
	      __super__.call(this);
	      this.scheduler = scheduler;
	      this.observer = observer;
	      this.isAcquired = false;
	      this.hasFaulted = false;
	      this.queue = [];
	      this.disposable = new SerialDisposable();
	    }

	    function enqueueNext(observer, x) { return function () { observer.onNext(x); }; }
	    function enqueueError(observer, e) { return function () { observer.onError(e); }; }
	    function enqueueCompleted(observer) { return function () { observer.onCompleted(); }; }

	    ScheduledObserver.prototype.next = function (x) {
	      this.queue.push(enqueueNext(this.observer, x));
	    };

	    ScheduledObserver.prototype.error = function (e) {
	      this.queue.push(enqueueError(this.observer, e));
	    };

	    ScheduledObserver.prototype.completed = function () {
	      this.queue.push(enqueueCompleted(this.observer));
	    };


	    function scheduleMethod(state, recurse) {
	      var work;
	      if (state.queue.length > 0) {
	        work = state.queue.shift();
	      } else {
	        state.isAcquired = false;
	        return;
	      }
	      var res = tryCatch(work)();
	      if (res === errorObj) {
	        state.queue = [];
	        state.hasFaulted = true;
	        return thrower(res.e);
	      }
	      recurse(state);
	    }

	    ScheduledObserver.prototype.ensureActive = function () {
	      var isOwner = false;
	      if (!this.hasFaulted && this.queue.length > 0) {
	        isOwner = !this.isAcquired;
	        this.isAcquired = true;
	      }
	      isOwner &&
	        this.disposable.setDisposable(this.scheduler.scheduleRecursive(this, scheduleMethod));
	    };

	    ScheduledObserver.prototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this.disposable.dispose();
	    };

	    return ScheduledObserver;
	  }(AbstractObserver));

	  var ObserveOnObserver = (function (__super__) {
	    inherits(ObserveOnObserver, __super__);

	    function ObserveOnObserver(scheduler, observer, cancel) {
	      __super__.call(this, scheduler, observer);
	      this._cancel = cancel;
	    }

	    ObserveOnObserver.prototype.next = function (value) {
	      __super__.prototype.next.call(this, value);
	      this.ensureActive();
	    };

	    ObserveOnObserver.prototype.error = function (e) {
	      __super__.prototype.error.call(this, e);
	      this.ensureActive();
	    };

	    ObserveOnObserver.prototype.completed = function () {
	      __super__.prototype.completed.call(this);
	      this.ensureActive();
	    };

	    ObserveOnObserver.prototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this._cancel && this._cancel.dispose();
	      this._cancel = null;
	    };

	    return ObserveOnObserver;
	  })(ScheduledObserver);

	  var observableProto;

	  /**
	   * Represents a push-style collection.
	   */
	  var Observable = Rx.Observable = (function () {

	    function makeSubscribe(self, subscribe) {
	      return function (o) {
	        var oldOnError = o.onError;
	        o.onError = function (e) {
	          makeStackTraceLong(e, self);
	          oldOnError.call(o, e);
	        };

	        return subscribe.call(self, o);
	      };
	    }

	    function Observable() {
	      if (Rx.config.longStackSupport && hasStacks) {
	        var oldSubscribe = this._subscribe;
	        var e = tryCatch(thrower)(new Error()).e;
	        this.stack = e.stack.substring(e.stack.indexOf('\n') + 1);
	        this._subscribe = makeSubscribe(this, oldSubscribe);
	      }
	    }

	    observableProto = Observable.prototype;

	    /**
	    * Determines whether the given object is an Observable
	    * @param {Any} An object to determine whether it is an Observable
	    * @returns {Boolean} true if an Observable, else false.
	    */
	    Observable.isObservable = function (o) {
	      return o && isFunction(o.subscribe);
	    };

	    /**
	     *  Subscribes an o to the observable sequence.
	     *  @param {Mixed} [oOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.
	     *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.
	     *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.
	     *  @returns {Diposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribe = observableProto.forEach = function (oOrOnNext, onError, onCompleted) {
	      return this._subscribe(typeof oOrOnNext === 'object' ?
	        oOrOnNext :
	        observerCreate(oOrOnNext, onError, onCompleted));
	    };

	    /**
	     * Subscribes to the next value in the sequence with an optional "this" argument.
	     * @param {Function} onNext The function to invoke on each element in the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnNext = function (onNext, thisArg) {
	      return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) { onNext.call(thisArg, x); } : onNext));
	    };

	    /**
	     * Subscribes to an exceptional condition in the sequence with an optional "this" argument.
	     * @param {Function} onError The function to invoke upon exceptional termination of the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnError = function (onError, thisArg) {
	      return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) { onError.call(thisArg, e); } : onError));
	    };

	    /**
	     * Subscribes to the next value in the sequence with an optional "this" argument.
	     * @param {Function} onCompleted The function to invoke upon graceful termination of the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {
	      return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() { onCompleted.call(thisArg); } : onCompleted));
	    };

	    return Observable;
	  })();

	  var ObservableBase = Rx.ObservableBase = (function (__super__) {
	    inherits(ObservableBase, __super__);

	    function fixSubscriber(subscriber) {
	      return subscriber && isFunction(subscriber.dispose) ? subscriber :
	        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
	    }

	    function setDisposable(s, state) {
	      var ado = state[0], self = state[1];
	      var sub = tryCatch(self.subscribeCore).call(self, ado);
	      if (sub === errorObj && !ado.fail(errorObj.e)) { thrower(errorObj.e); }
	      ado.setDisposable(fixSubscriber(sub));
	    }

	    function ObservableBase() {
	      __super__.call(this);
	    }

	    ObservableBase.prototype._subscribe = function (o) {
	      var ado = new AutoDetachObserver(o), state = [ado, this];

	      if (currentThreadScheduler.scheduleRequired()) {
	        currentThreadScheduler.schedule(state, setDisposable);
	      } else {
	        setDisposable(null, state);
	      }
	      return ado;
	    };

	    ObservableBase.prototype.subscribeCore = notImplemented;

	    return ObservableBase;
	  }(Observable));

	var FlatMapObservable = Rx.FlatMapObservable = (function(__super__) {

	    inherits(FlatMapObservable, __super__);

	    function FlatMapObservable(source, selector, resultSelector, thisArg) {
	      this.resultSelector = isFunction(resultSelector) ? resultSelector : null;
	      this.selector = bindCallback(isFunction(selector) ? selector : function() { return selector; }, thisArg, 3);
	      this.source = source;
	      __super__.call(this);
	    }

	    FlatMapObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o, this.selector, this.resultSelector, this));
	    };

	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(observer, selector, resultSelector, source) {
	      this.i = 0;
	      this.selector = selector;
	      this.resultSelector = resultSelector;
	      this.source = source;
	      this.o = observer;
	      AbstractObserver.call(this);
	    }

	    InnerObserver.prototype._wrapResult = function(result, x, i) {
	      return this.resultSelector ?
	        result.map(function(y, i2) { return this.resultSelector(x, y, i, i2); }, this) :
	        result;
	    };

	    InnerObserver.prototype.next = function(x) {
	      var i = this.i++;
	      var result = tryCatch(this.selector)(x, i, this.source);
	      if (result === errorObj) { return this.o.onError(result.e); }

	      isPromise(result) && (result = observableFromPromise(result));
	      (isArrayLike(result) || isIterable(result)) && (result = Observable.from(result));
	      this.o.onNext(this._wrapResult(result, x, i));
	    };

	    InnerObserver.prototype.error = function(e) { this.o.onError(e); };

	    InnerObserver.prototype.completed = function() { this.o.onCompleted(); };

	    return FlatMapObservable;

	}(ObservableBase));

	  var Enumerable = Rx.internals.Enumerable = function () { };

	  function IsDisposedDisposable(state) {
	    this._s = state;
	    this.isDisposed = false;
	  }

	  IsDisposedDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      this._s.isDisposed = true;
	    }
	  };

	  var ConcatEnumerableObservable = (function(__super__) {
	    inherits(ConcatEnumerableObservable, __super__);
	    function ConcatEnumerableObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }

	    function scheduleMethod(state, recurse) {
	      if (state.isDisposed) { return; }
	      var currentItem = tryCatch(state.e.next).call(state.e);
	      if (currentItem === errorObj) { return state.o.onError(currentItem.e); }
	      if (currentItem.done) { return state.o.onCompleted(); }

	      // Check if promise
	      var currentValue = currentItem.value;
	      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	      var d = new SingleAssignmentDisposable();
	      state.subscription.setDisposable(d);
	      d.setDisposable(currentValue.subscribe(new InnerObserver(state, recurse)));
	    }

	    ConcatEnumerableObservable.prototype.subscribeCore = function (o) {
	      var subscription = new SerialDisposable();
	      var state = {
	        isDisposed: false,
	        o: o,
	        subscription: subscription,
	        e: this.sources[$iterator$]()
	      };

	      var cancelable = currentThreadScheduler.scheduleRecursive(state, scheduleMethod);
	      return new NAryDisposable([subscription, cancelable, new IsDisposedDisposable(state)]);
	    };

	    function InnerObserver(state, recurse) {
	      this._state = state;
	      this._recurse = recurse;
	      AbstractObserver.call(this);
	    }

	    inherits(InnerObserver, AbstractObserver);

	    InnerObserver.prototype.next = function (x) { this._state.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) { this._state.o.onError(e); };
	    InnerObserver.prototype.completed = function () { this._recurse(this._state); };

	    return ConcatEnumerableObservable;
	  }(ObservableBase));

	  Enumerable.prototype.concat = function () {
	    return new ConcatEnumerableObservable(this);
	  };

	  var CatchErrorObservable = (function(__super__) {
	    function CatchErrorObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }

	    inherits(CatchErrorObservable, __super__);

	    function scheduleMethod(state, recurse) {
	      if (state.isDisposed) { return; }
	      var currentItem = tryCatch(state.e.next).call(state.e);
	      if (currentItem === errorObj) { return state.o.onError(currentItem.e); }
	      if (currentItem.done) { return state.lastError !== null ? state.o.onError(state.lastError) : state.o.onCompleted(); }

	      var currentValue = currentItem.value;
	      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	      var d = new SingleAssignmentDisposable();
	      state.subscription.setDisposable(d);
	      d.setDisposable(currentValue.subscribe(new InnerObserver(state, recurse)));
	    }

	    CatchErrorObservable.prototype.subscribeCore = function (o) {
	      var subscription = new SerialDisposable();
	      var state = {
	        isDisposed: false,
	        e: this.sources[$iterator$](),
	        subscription: subscription,
	        lastError: null,
	        o: o
	      };

	      var cancelable = currentThreadScheduler.scheduleRecursive(state, scheduleMethod);
	      return new NAryDisposable([subscription, cancelable, new IsDisposedDisposable(state)]);
	    };

	    function InnerObserver(state, recurse) {
	      this._state = state;
	      this._recurse = recurse;
	      AbstractObserver.call(this);
	    }

	    inherits(InnerObserver, AbstractObserver);

	    InnerObserver.prototype.next = function (x) { this._state.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) { this._state.lastError = e; this._recurse(this._state); };
	    InnerObserver.prototype.completed = function () { this._state.o.onCompleted(); };

	    return CatchErrorObservable;
	  }(ObservableBase));

	  Enumerable.prototype.catchError = function () {
	    return new CatchErrorObservable(this);
	  };

	  Enumerable.prototype.catchErrorWhen = function (notificationHandler) {
	    var sources = this;
	    return new AnonymousObservable(function (o) {
	      var exceptions = new Subject(),
	        notifier = new Subject(),
	        handled = notificationHandler(exceptions),
	        notificationDisposable = handled.subscribe(notifier);

	      var e = sources[$iterator$]();

	      var state = { isDisposed: false },
	        lastError,
	        subscription = new SerialDisposable();
	      var cancelable = currentThreadScheduler.scheduleRecursive(null, function (_, self) {
	        if (state.isDisposed) { return; }
	        var currentItem = tryCatch(e.next).call(e);
	        if (currentItem === errorObj) { return o.onError(currentItem.e); }

	        if (currentItem.done) {
	          if (lastError) {
	            o.onError(lastError);
	          } else {
	            o.onCompleted();
	          }
	          return;
	        }

	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	        var outer = new SingleAssignmentDisposable();
	        var inner = new SingleAssignmentDisposable();
	        subscription.setDisposable(new BinaryDisposable(inner, outer));
	        outer.setDisposable(currentValue.subscribe(
	          function(x) { o.onNext(x); },
	          function (exn) {
	            inner.setDisposable(notifier.subscribe(self, function(ex) {
	              o.onError(ex);
	            }, function() {
	              o.onCompleted();
	            }));

	            exceptions.onNext(exn);
	          },
	          function() { o.onCompleted(); }));
	      });

	      return new NAryDisposable([notificationDisposable, subscription, cancelable, new IsDisposedDisposable(state)]);
	    });
	  };

	  var RepeatEnumerable = (function (__super__) {
	    inherits(RepeatEnumerable, __super__);
	    function RepeatEnumerable(v, c) {
	      this.v = v;
	      this.c = c == null ? -1 : c;
	    }

	    RepeatEnumerable.prototype[$iterator$] = function () {
	      return new RepeatEnumerator(this);
	    };

	    function RepeatEnumerator(p) {
	      this.v = p.v;
	      this.l = p.c;
	    }

	    RepeatEnumerator.prototype.next = function () {
	      if (this.l === 0) { return doneEnumerator; }
	      if (this.l > 0) { this.l--; }
	      return { done: false, value: this.v };
	    };

	    return RepeatEnumerable;
	  }(Enumerable));

	  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
	    return new RepeatEnumerable(value, repeatCount);
	  };

	  var OfEnumerable = (function(__super__) {
	    inherits(OfEnumerable, __super__);
	    function OfEnumerable(s, fn, thisArg) {
	      this.s = s;
	      this.fn = fn ? bindCallback(fn, thisArg, 3) : null;
	    }
	    OfEnumerable.prototype[$iterator$] = function () {
	      return new OfEnumerator(this);
	    };

	    function OfEnumerator(p) {
	      this.i = -1;
	      this.s = p.s;
	      this.l = this.s.length;
	      this.fn = p.fn;
	    }

	    OfEnumerator.prototype.next = function () {
	     return ++this.i < this.l ?
	       { done: false, value: !this.fn ? this.s[this.i] : this.fn(this.s[this.i], this.i, this.s) } :
	       doneEnumerator;
	    };

	    return OfEnumerable;
	  }(Enumerable));

	  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
	    return new OfEnumerable(source, selector, thisArg);
	  };

	var ObserveOnObservable = (function (__super__) {
	  inherits(ObserveOnObservable, __super__);
	  function ObserveOnObservable(source, s) {
	    this.source = source;
	    this._s = s;
	    __super__.call(this);
	  }

	  ObserveOnObservable.prototype.subscribeCore = function (o) {
	    return this.source.subscribe(new ObserveOnObserver(this._s, o));
	  };

	  return ObserveOnObservable;
	}(ObservableBase));

	   /**
	   *  Wraps the source sequence in order to run its observer callbacks on the specified scheduler.
	   *
	   *  This only invokes observer callbacks on a scheduler. In case the subscription and/or unsubscription actions have side-effects
	   *  that require to be run on a scheduler, use subscribeOn.
	   *
	   *  @param {Scheduler} scheduler Scheduler to notify observers on.
	   *  @returns {Observable} The source sequence whose observations happen on the specified scheduler.
	   */
	  observableProto.observeOn = function (scheduler) {
	    return new ObserveOnObservable(this, scheduler);
	  };

	  var SubscribeOnObservable = (function (__super__) {
	    inherits(SubscribeOnObservable, __super__);
	    function SubscribeOnObservable(source, s) {
	      this.source = source;
	      this._s = s;
	      __super__.call(this);
	    }

	    function scheduleMethod(scheduler, state) {
	      var source = state[0], d = state[1], o = state[2];
	      d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(o)));
	    }

	    SubscribeOnObservable.prototype.subscribeCore = function (o) {
	      var m = new SingleAssignmentDisposable(), d = new SerialDisposable();
	      d.setDisposable(m);
	      m.setDisposable(this._s.schedule([this.source, d, o], scheduleMethod));
	      return d;
	    };

	    return SubscribeOnObservable;
	  }(ObservableBase));

	   /**
	   *  Wraps the source sequence in order to run its subscription and unsubscription logic on the specified scheduler. This operation is not commonly used;
	   *  see the remarks section for more information on the distinction between subscribeOn and observeOn.

	   *  This only performs the side-effects of subscription and unsubscription on the specified scheduler. In order to invoke observer
	   *  callbacks on a scheduler, use observeOn.

	   *  @param {Scheduler} scheduler Scheduler to perform subscription and unsubscription actions on.
	   *  @returns {Observable} The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.
	   */
	  observableProto.subscribeOn = function (scheduler) {
	    return new SubscribeOnObservable(this, scheduler);
	  };

	  var FromPromiseObservable = (function(__super__) {
	    inherits(FromPromiseObservable, __super__);
	    function FromPromiseObservable(p, s) {
	      this._p = p;
	      this._s = s;
	      __super__.call(this);
	    }

	    function scheduleNext(s, state) {
	      var o = state[0], data = state[1];
	      o.onNext(data);
	      o.onCompleted();
	    }

	    function scheduleError(s, state) {
	      var o = state[0], err = state[1];
	      o.onError(err);
	    }

	    FromPromiseObservable.prototype.subscribeCore = function(o) {
	      var sad = new SingleAssignmentDisposable(), self = this;

	      this._p
	        .then(function (data) {
	          sad.setDisposable(self._s.schedule([o, data], scheduleNext));
	        }, function (err) {
	          sad.setDisposable(self._s.schedule([o, err], scheduleError));
	        });

	      return sad;
	    };

	    return FromPromiseObservable;
	  }(ObservableBase));

	  /**
	  * Converts a Promise to an Observable sequence
	  * @param {Promise} An ES6 Compliant promise.
	  * @returns {Observable} An Observable sequence which wraps the existing promise success and failure.
	  */
	  var observableFromPromise = Observable.fromPromise = function (promise, scheduler) {
	    scheduler || (scheduler = defaultScheduler);
	    return new FromPromiseObservable(promise, scheduler);
	  };

	  /*
	   * Converts an existing observable sequence to an ES6 Compatible Promise
	   * @example
	   * var promise = Rx.Observable.return(42).toPromise(RSVP.Promise);
	   *
	   * // With config
	   * Rx.config.Promise = RSVP.Promise;
	   * var promise = Rx.Observable.return(42).toPromise();
	   * @param {Function} [promiseCtor] The constructor of the promise. If not provided, it looks for it in Rx.config.Promise.
	   * @returns {Promise} An ES6 compatible promise with the last value from the observable sequence.
	   */
	  observableProto.toPromise = function (promiseCtor) {
	    promiseCtor || (promiseCtor = Rx.config.Promise);
	    if (!promiseCtor) { throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise'); }
	    var source = this;
	    return new promiseCtor(function (resolve, reject) {
	      // No cancellation can be done
	      var value;
	      source.subscribe(function (v) {
	        value = v;
	      }, reject, function () {
	        resolve(value);
	      });
	    });
	  };

	  var ToArrayObservable = (function(__super__) {
	    inherits(ToArrayObservable, __super__);
	    function ToArrayObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    ToArrayObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o));
	    };

	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(o) {
	      this.o = o;
	      this.a = [];
	      AbstractObserver.call(this);
	    }
	    
	    InnerObserver.prototype.next = function (x) { this.a.push(x); };
	    InnerObserver.prototype.error = function (e) { this.o.onError(e);  };
	    InnerObserver.prototype.completed = function () { this.o.onNext(this.a); this.o.onCompleted(); };

	    return ToArrayObservable;
	  }(ObservableBase));

	  /**
	  * Creates an array from an observable sequence.
	  * @returns {Observable} An observable sequence containing a single element with a list containing all the elements of the source sequence.
	  */
	  observableProto.toArray = function () {
	    return new ToArrayObservable(this);
	  };

	  /**
	   *  Creates an observable sequence from a specified subscribe method implementation.
	   * @example
	   *  var res = Rx.Observable.create(function (observer) { return function () { } );
	   *  var res = Rx.Observable.create(function (observer) { return Rx.Disposable.empty; } );
	   *  var res = Rx.Observable.create(function (observer) { } );
	   * @param {Function} subscribe Implementation of the resulting observable sequence's subscribe method, returning a function that will be wrapped in a Disposable.
	   * @returns {Observable} The observable sequence with the specified implementation for the Subscribe method.
	   */
	  Observable.create = function (subscribe, parent) {
	    return new AnonymousObservable(subscribe, parent);
	  };

	  var Defer = (function(__super__) {
	    inherits(Defer, __super__);
	    function Defer(factory) {
	      this._f = factory;
	      __super__.call(this);
	    }

	    Defer.prototype.subscribeCore = function (o) {
	      var result = tryCatch(this._f)();
	      if (result === errorObj) { return observableThrow(result.e).subscribe(o);}
	      isPromise(result) && (result = observableFromPromise(result));
	      return result.subscribe(o);
	    };

	    return Defer;
	  }(ObservableBase));

	  /**
	   *  Returns an observable sequence that invokes the specified factory function whenever a new observer subscribes.
	   *
	   * @example
	   *  var res = Rx.Observable.defer(function () { return Rx.Observable.fromArray([1,2,3]); });
	   * @param {Function} observableFactory Observable factory function to invoke for each observer that subscribes to the resulting sequence or Promise.
	   * @returns {Observable} An observable sequence whose observers trigger an invocation of the given observable factory function.
	   */
	  var observableDefer = Observable.defer = function (observableFactory) {
	    return new Defer(observableFactory);
	  };

	  var EmptyObservable = (function(__super__) {
	    inherits(EmptyObservable, __super__);
	    function EmptyObservable(scheduler) {
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    EmptyObservable.prototype.subscribeCore = function (observer) {
	      var sink = new EmptySink(observer, this.scheduler);
	      return sink.run();
	    };

	    function EmptySink(observer, scheduler) {
	      this.observer = observer;
	      this.scheduler = scheduler;
	    }

	    function scheduleItem(s, state) {
	      state.onCompleted();
	      return disposableEmpty;
	    }

	    EmptySink.prototype.run = function () {
	      var state = this.observer;
	      return this.scheduler === immediateScheduler ?
	        scheduleItem(null, state) :
	        this.scheduler.schedule(state, scheduleItem);
	    };

	    return EmptyObservable;
	  }(ObservableBase));

	  var EMPTY_OBSERVABLE = new EmptyObservable(immediateScheduler);

	  /**
	   *  Returns an empty observable sequence, using the specified scheduler to send out the single OnCompleted message.
	   *
	   * @example
	   *  var res = Rx.Observable.empty();
	   *  var res = Rx.Observable.empty(Rx.Scheduler.timeout);
	   * @param {Scheduler} [scheduler] Scheduler to send the termination call on.
	   * @returns {Observable} An observable sequence with no elements.
	   */
	  var observableEmpty = Observable.empty = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return scheduler === immediateScheduler ? EMPTY_OBSERVABLE : new EmptyObservable(scheduler);
	  };

	  var FromObservable = (function(__super__) {
	    inherits(FromObservable, __super__);
	    function FromObservable(iterable, fn, scheduler) {
	      this._iterable = iterable;
	      this._fn = fn;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }

	    function createScheduleMethod(o, it, fn) {
	      return function loopRecursive(i, recurse) {
	        var next = tryCatch(it.next).call(it);
	        if (next === errorObj) { return o.onError(next.e); }
	        if (next.done) { return o.onCompleted(); }

	        var result = next.value;

	        if (isFunction(fn)) {
	          result = tryCatch(fn)(result, i);
	          if (result === errorObj) { return o.onError(result.e); }
	        }

	        o.onNext(result);
	        recurse(i + 1);
	      };
	    }

	    FromObservable.prototype.subscribeCore = function (o) {
	      var list = Object(this._iterable),
	          it = getIterable(list);

	      return this._scheduler.scheduleRecursive(0, createScheduleMethod(o, it, this._fn));
	    };

	    return FromObservable;
	  }(ObservableBase));

	  var maxSafeInteger = Math.pow(2, 53) - 1;

	  function StringIterable(s) {
	    this._s = s;
	  }

	  StringIterable.prototype[$iterator$] = function () {
	    return new StringIterator(this._s);
	  };

	  function StringIterator(s) {
	    this._s = s;
	    this._l = s.length;
	    this._i = 0;
	  }

	  StringIterator.prototype[$iterator$] = function () {
	    return this;
	  };

	  StringIterator.prototype.next = function () {
	    return this._i < this._l ? { done: false, value: this._s.charAt(this._i++) } : doneEnumerator;
	  };

	  function ArrayIterable(a) {
	    this._a = a;
	  }

	  ArrayIterable.prototype[$iterator$] = function () {
	    return new ArrayIterator(this._a);
	  };

	  function ArrayIterator(a) {
	    this._a = a;
	    this._l = toLength(a);
	    this._i = 0;
	  }

	  ArrayIterator.prototype[$iterator$] = function () {
	    return this;
	  };

	  ArrayIterator.prototype.next = function () {
	    return this._i < this._l ? { done: false, value: this._a[this._i++] } : doneEnumerator;
	  };

	  function numberIsFinite(value) {
	    return typeof value === 'number' && root.isFinite(value);
	  }

	  function isNan(n) {
	    return n !== n;
	  }

	  function getIterable(o) {
	    var i = o[$iterator$], it;
	    if (!i && typeof o === 'string') {
	      it = new StringIterable(o);
	      return it[$iterator$]();
	    }
	    if (!i && o.length !== undefined) {
	      it = new ArrayIterable(o);
	      return it[$iterator$]();
	    }
	    if (!i) { throw new TypeError('Object is not iterable'); }
	    return o[$iterator$]();
	  }

	  function sign(value) {
	    var number = +value;
	    if (number === 0) { return number; }
	    if (isNaN(number)) { return number; }
	    return number < 0 ? -1 : 1;
	  }

	  function toLength(o) {
	    var len = +o.length;
	    if (isNaN(len)) { return 0; }
	    if (len === 0 || !numberIsFinite(len)) { return len; }
	    len = sign(len) * Math.floor(Math.abs(len));
	    if (len <= 0) { return 0; }
	    if (len > maxSafeInteger) { return maxSafeInteger; }
	    return len;
	  }

	  /**
	  * This method creates a new Observable sequence from an array-like or iterable object.
	  * @param {Any} arrayLike An array-like or iterable object to convert to an Observable sequence.
	  * @param {Function} [mapFn] Map function to call on every element of the array.
	  * @param {Any} [thisArg] The context to use calling the mapFn if provided.
	  * @param {Scheduler} [scheduler] Optional scheduler to use for scheduling.  If not provided, defaults to Scheduler.currentThread.
	  */
	  var observableFrom = Observable.from = function (iterable, mapFn, thisArg, scheduler) {
	    if (iterable == null) {
	      throw new Error('iterable cannot be null.')
	    }
	    if (mapFn && !isFunction(mapFn)) {
	      throw new Error('mapFn when provided must be a function');
	    }
	    if (mapFn) {
	      var mapper = bindCallback(mapFn, thisArg, 2);
	    }
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromObservable(iterable, mapper, scheduler);
	  }

	  var FromArrayObservable = (function(__super__) {
	    inherits(FromArrayObservable, __super__);
	    function FromArrayObservable(args, scheduler) {
	      this._args = args;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }

	    function scheduleMethod(o, args) {
	      var len = args.length;
	      return function loopRecursive (i, recurse) {
	        if (i < len) {
	          o.onNext(args[i]);
	          recurse(i + 1);
	        } else {
	          o.onCompleted();
	        }
	      };
	    }

	    FromArrayObservable.prototype.subscribeCore = function (o) {
	      return this._scheduler.scheduleRecursive(0, scheduleMethod(o, this._args));
	    };

	    return FromArrayObservable;
	  }(ObservableBase));

	  /**
	  *  Converts an array to an observable sequence, using an optional scheduler to enumerate the array.
	  * @deprecated use Observable.from or Observable.of
	  * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given enumerable sequence.
	  */
	  var observableFromArray = Observable.fromArray = function (array, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromArrayObservable(array, scheduler)
	  };

	  var GenerateObservable = (function (__super__) {
	    inherits(GenerateObservable, __super__);
	    function GenerateObservable(state, cndFn, itrFn, resFn, s) {
	      this._state = state;
	      this._cndFn = cndFn;
	      this._itrFn = itrFn;
	      this._resFn = resFn;
	      this._s = s;
	      this._first = true;
	      __super__.call(this);
	    }

	    function scheduleRecursive(self, recurse) {
	      if (self._first) {
	        self._first = false;
	      } else {
	        self._state = tryCatch(self._itrFn)(self._state);
	        if (self._state === errorObj) { return self._o.onError(self._state.e); }
	      }
	      var hasResult = tryCatch(self._cndFn)(self._state);
	      if (hasResult === errorObj) { return self._o.onError(hasResult.e); }
	      if (hasResult) {
	        var result = tryCatch(self._resFn)(self._state);
	        if (result === errorObj) { return self._o.onError(result.e); }
	        self._o.onNext(result);
	        recurse(self);
	      } else {
	        self._o.onCompleted();
	      }
	    }

	    GenerateObservable.prototype.subscribeCore = function (o) {
	      this._o = o;
	      return this._s.scheduleRecursive(this, scheduleRecursive);
	    };

	    return GenerateObservable;
	  }(ObservableBase));

	  /**
	   *  Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
	   *
	   * @example
	   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; });
	   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; }, Rx.Scheduler.timeout);
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Scheduler} [scheduler] Scheduler on which to run the generator loop. If not provided, defaults to Scheduler.currentThread.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new GenerateObservable(initialState, condition, iterate, resultSelector, scheduler);
	  };

	  function observableOf (scheduler, array) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromArrayObservable(array, scheduler);
	  }

	  /**
	  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
	  */
	  Observable.of = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return new FromArrayObservable(args, currentThreadScheduler);
	  };

	  /**
	  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
	  * @param {Scheduler} scheduler A scheduler to use for scheduling the arguments.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
	  */
	  Observable.ofWithScheduler = function (scheduler) {
	    var len = arguments.length, args = new Array(len - 1);
	    for(var i = 1; i < len; i++) { args[i - 1] = arguments[i]; }
	    return new FromArrayObservable(args, scheduler);
	  };

	  /**
	   * Creates an Observable sequence from changes to an array using Array.observe.
	   * @param {Array} array An array to observe changes.
	   * @returns {Observable} An observable sequence containing changes to an array from Array.observe.
	   */
	  Observable.ofArrayChanges = function(array) {
	    if (!Array.isArray(array)) { throw new TypeError('Array.observe only accepts arrays.'); }
	    if (typeof Array.observe !== 'function' && typeof Array.unobserve !== 'function') { throw new TypeError('Array.observe is not supported on your platform') }
	    return new AnonymousObservable(function(observer) {
	      function observerFn(changes) {
	        for(var i = 0, len = changes.length; i < len; i++) {
	          observer.onNext(changes[i]);
	        }
	      }
	      
	      Array.observe(array, observerFn);

	      return function () {
	        Array.unobserve(array, observerFn);
	      };
	    });
	  };

	  /**
	   * Creates an Observable sequence from changes to an object using Object.observe.
	   * @param {Object} obj An object to observe changes.
	   * @returns {Observable} An observable sequence containing changes to an object from Object.observe.
	   */
	  Observable.ofObjectChanges = function(obj) {
	    if (obj == null) { throw new TypeError('object must not be null or undefined.'); }
	    if (typeof Object.observe !== 'function' && typeof Object.unobserve !== 'function') { throw new TypeError('Object.observe is not supported on your platform') }
	    return new AnonymousObservable(function(observer) {
	      function observerFn(changes) {
	        for(var i = 0, len = changes.length; i < len; i++) {
	          observer.onNext(changes[i]);
	        }
	      }

	      Object.observe(obj, observerFn);

	      return function () {
	        Object.unobserve(obj, observerFn);
	      };
	    });
	  };

	  var NeverObservable = (function(__super__) {
	    inherits(NeverObservable, __super__);
	    function NeverObservable() {
	      __super__.call(this);
	    }

	    NeverObservable.prototype.subscribeCore = function (observer) {
	      return disposableEmpty;
	    };

	    return NeverObservable;
	  }(ObservableBase));

	  var NEVER_OBSERVABLE = new NeverObservable();

	  /**
	   * Returns a non-terminating observable sequence, which can be used to denote an infinite duration (e.g. when using reactive joins).
	   * @returns {Observable} An observable sequence whose observers will never get called.
	   */
	  var observableNever = Observable.never = function () {
	    return NEVER_OBSERVABLE;
	  };

	  var PairsObservable = (function(__super__) {
	    inherits(PairsObservable, __super__);
	    function PairsObservable(o, scheduler) {
	      this._o = o;
	      this._keys = Object.keys(o);
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }

	    function scheduleMethod(o, obj, keys) {
	      return function loopRecursive(i, recurse) {
	        if (i < keys.length) {
	          var key = keys[i];
	          o.onNext([key, obj[key]]);
	          recurse(i + 1);
	        } else {
	          o.onCompleted();
	        }
	      };
	    }

	    PairsObservable.prototype.subscribeCore = function (o) {
	      return this._scheduler.scheduleRecursive(0, scheduleMethod(o, this._o, this._keys));
	    };

	    return PairsObservable;
	  }(ObservableBase));

	  /**
	   * Convert an object into an observable sequence of [key, value] pairs.
	   * @param {Object} obj The object to inspect.
	   * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
	   * @returns {Observable} An observable sequence of [key, value] pairs from the object.
	   */
	  Observable.pairs = function (obj, scheduler) {
	    scheduler || (scheduler = currentThreadScheduler);
	    return new PairsObservable(obj, scheduler);
	  };

	    var RangeObservable = (function(__super__) {
	    inherits(RangeObservable, __super__);
	    function RangeObservable(start, count, scheduler) {
	      this.start = start;
	      this.rangeCount = count;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    function loopRecursive(start, count, o) {
	      return function loop (i, recurse) {
	        if (i < count) {
	          o.onNext(start + i);
	          recurse(i + 1);
	        } else {
	          o.onCompleted();
	        }
	      };
	    }

	    RangeObservable.prototype.subscribeCore = function (o) {
	      return this.scheduler.scheduleRecursive(
	        0,
	        loopRecursive(this.start, this.rangeCount, o)
	      );
	    };

	    return RangeObservable;
	  }(ObservableBase));

	  /**
	  *  Generates an observable sequence of integral numbers within a specified range, using the specified scheduler to send out observer messages.
	  * @param {Number} start The value of the first integer in the sequence.
	  * @param {Number} count The number of sequential integers to generate.
	  * @param {Scheduler} [scheduler] Scheduler to run the generator loop on. If not specified, defaults to Scheduler.currentThread.
	  * @returns {Observable} An observable sequence that contains a range of sequential integral numbers.
	  */
	  Observable.range = function (start, count, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new RangeObservable(start, count, scheduler);
	  };

	  var RepeatObservable = (function(__super__) {
	    inherits(RepeatObservable, __super__);
	    function RepeatObservable(value, repeatCount, scheduler) {
	      this.value = value;
	      this.repeatCount = repeatCount == null ? -1 : repeatCount;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }

	    RepeatObservable.prototype.subscribeCore = function (observer) {
	      var sink = new RepeatSink(observer, this);
	      return sink.run();
	    };

	    return RepeatObservable;
	  }(ObservableBase));

	  function RepeatSink(observer, parent) {
	    this.observer = observer;
	    this.parent = parent;
	  }

	  RepeatSink.prototype.run = function () {
	    var observer = this.observer, value = this.parent.value;
	    function loopRecursive(i, recurse) {
	      if (i === -1 || i > 0) {
	        observer.onNext(value);
	        i > 0 && i--;
	      }
	      if (i === 0) { return observer.onCompleted(); }
	      recurse(i);
	    }

	    return this.parent.scheduler.scheduleRecursive(this.parent.repeatCount, loopRecursive);
	  };

	  /**
	   *  Generates an observable sequence that repeats the given element the specified number of times, using the specified scheduler to send out observer messages.
	   * @param {Mixed} value Element to repeat.
	   * @param {Number} repeatCount [Optiona] Number of times to repeat the element. If not specified, repeats indefinitely.
	   * @param {Scheduler} scheduler Scheduler to run the producer loop on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} An observable sequence that repeats the given element the specified number of times.
	   */
	  Observable.repeat = function (value, repeatCount, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new RepeatObservable(value, repeatCount, scheduler);
	  };

	  var JustObservable = (function(__super__) {
	    inherits(JustObservable, __super__);
	    function JustObservable(value, scheduler) {
	      this._value = value;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }

	    JustObservable.prototype.subscribeCore = function (o) {
	      var state = [this._value, o];
	      return this._scheduler === immediateScheduler ?
	        scheduleItem(null, state) :
	        this._scheduler.schedule(state, scheduleItem);
	    };

	    function scheduleItem(s, state) {
	      var value = state[0], observer = state[1];
	      observer.onNext(value);
	      observer.onCompleted();
	      return disposableEmpty;
	    }

	    return JustObservable;
	  }(ObservableBase));

	  /**
	   *  Returns an observable sequence that contains a single element, using the specified scheduler to send out observer messages.
	   *  There is an alias called 'just' or browsers <IE9.
	   * @param {Mixed} value Single element in the resulting observable sequence.
	   * @param {Scheduler} scheduler Scheduler to send the single element on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} An observable sequence containing the single specified element.
	   */
	  var observableReturn = Observable['return'] = Observable.just = function (value, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new JustObservable(value, scheduler);
	  };

	  var ThrowObservable = (function(__super__) {
	    inherits(ThrowObservable, __super__);
	    function ThrowObservable(error, scheduler) {
	      this._error = error;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }

	    ThrowObservable.prototype.subscribeCore = function (o) {
	      var state = [this._error, o];
	      return this._scheduler === immediateScheduler ?
	        scheduleItem(null, state) :
	        this._scheduler.schedule(state, scheduleItem);
	    };

	    function scheduleItem(s, state) {
	      var e = state[0], o = state[1];
	      o.onError(e);
	      return disposableEmpty;
	    }

	    return ThrowObservable;
	  }(ObservableBase));

	  /**
	   *  Returns an observable sequence that terminates with an exception, using the specified scheduler to send out the single onError message.
	   *  There is an alias to this method called 'throwError' for browsers <IE9.
	   * @param {Mixed} error An object used for the sequence's termination.
	   * @param {Scheduler} scheduler Scheduler to send the exceptional termination call on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} The observable sequence that terminates exceptionally with the specified exception object.
	   */
	  var observableThrow = Observable['throw'] = function (error, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new ThrowObservable(error, scheduler);
	  };

	  var UsingObservable = (function (__super__) {
	    inherits(UsingObservable, __super__);
	    function UsingObservable(resFn, obsFn) {
	      this._resFn = resFn;
	      this._obsFn = obsFn;
	      __super__.call(this);
	    }

	    UsingObservable.prototype.subscribeCore = function (o) {
	      var disposable = disposableEmpty;
	      var resource = tryCatch(this._resFn)();
	      if (resource === errorObj) {
	        return new BinaryDisposable(observableThrow(resource.e).subscribe(o), disposable);
	      }
	      resource && (disposable = resource);
	      var source = tryCatch(this._obsFn)(resource);
	      if (source === errorObj) {
	        return new BinaryDisposable(observableThrow(source.e).subscribe(o), disposable);
	      }
	      return new BinaryDisposable(source.subscribe(o), disposable);
	    };

	    return UsingObservable;
	  }(ObservableBase));

	  /**
	   * Constructs an observable sequence that depends on a resource object, whose lifetime is tied to the resulting observable sequence's lifetime.
	   * @param {Function} resourceFactory Factory function to obtain a resource object.
	   * @param {Function} observableFactory Factory function to obtain an observable sequence that depends on the obtained resource.
	   * @returns {Observable} An observable sequence whose lifetime controls the lifetime of the dependent resource object.
	   */
	  Observable.using = function (resourceFactory, observableFactory) {
	    return new UsingObservable(resourceFactory, observableFactory);
	  };

	  /**
	   * Propagates the observable sequence or Promise that reacts first.
	   * @param {Observable} rightSource Second observable sequence or Promise.
	   * @returns {Observable} {Observable} An observable sequence that surfaces either of the given sequences, whichever reacted first.
	   */
	  observableProto.amb = function (rightSource) {
	    var leftSource = this;
	    return new AnonymousObservable(function (observer) {
	      var choice,
	        leftChoice = 'L', rightChoice = 'R',
	        leftSubscription = new SingleAssignmentDisposable(),
	        rightSubscription = new SingleAssignmentDisposable();

	      isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));

	      function choiceL() {
	        if (!choice) {
	          choice = leftChoice;
	          rightSubscription.dispose();
	        }
	      }

	      function choiceR() {
	        if (!choice) {
	          choice = rightChoice;
	          leftSubscription.dispose();
	        }
	      }

	      var leftSubscribe = observerCreate(
	        function (left) {
	          choiceL();
	          choice === leftChoice && observer.onNext(left);
	        },
	        function (e) {
	          choiceL();
	          choice === leftChoice && observer.onError(e);
	        },
	        function () {
	          choiceL();
	          choice === leftChoice && observer.onCompleted();
	        }
	      );
	      var rightSubscribe = observerCreate(
	        function (right) {
	          choiceR();
	          choice === rightChoice && observer.onNext(right);
	        },
	        function (e) {
	          choiceR();
	          choice === rightChoice && observer.onError(e);
	        },
	        function () {
	          choiceR();
	          choice === rightChoice && observer.onCompleted();
	        }
	      );

	      leftSubscription.setDisposable(leftSource.subscribe(leftSubscribe));
	      rightSubscription.setDisposable(rightSource.subscribe(rightSubscribe));

	      return new BinaryDisposable(leftSubscription, rightSubscription);
	    });
	  };

	  function amb(p, c) { return p.amb(c); }

	  /**
	   * Propagates the observable sequence or Promise that reacts first.
	   * @returns {Observable} An observable sequence that surfaces any of the given sequences, whichever reacted first.
	   */
	  Observable.amb = function () {
	    var acc = observableNever(), items;
	    if (Array.isArray(arguments[0])) {
	      items = arguments[0];
	    } else {
	      var len = arguments.length;
	      items = new Array(items);
	      for(var i = 0; i < len; i++) { items[i] = arguments[i]; }
	    }
	    for (var i = 0, len = items.length; i < len; i++) {
	      acc = amb(acc, items[i]);
	    }
	    return acc;
	  };

	  var CatchObservable = (function (__super__) {
	    inherits(CatchObservable, __super__);
	    function CatchObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    CatchObservable.prototype.subscribeCore = function (o) {
	      var d1 = new SingleAssignmentDisposable(), subscription = new SerialDisposable();
	      subscription.setDisposable(d1);
	      d1.setDisposable(this.source.subscribe(new CatchObserver(o, subscription, this._fn)));
	      return subscription;
	    };

	    return CatchObservable;
	  }(ObservableBase));

	  var CatchObserver = (function(__super__) {
	    inherits(CatchObserver, __super__);
	    function CatchObserver(o, s, fn) {
	      this._o = o;
	      this._s = s;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    CatchObserver.prototype.next = function (x) { this._o.onNext(x); };
	    CatchObserver.prototype.completed = function () { return this._o.onCompleted(); };
	    CatchObserver.prototype.error = function (e) {
	      var result = tryCatch(this._fn)(e);
	      if (result === errorObj) { return this._o.onError(result.e); }
	      isPromise(result) && (result = observableFromPromise(result));

	      var d = new SingleAssignmentDisposable();
	      this._s.setDisposable(d);
	      d.setDisposable(result.subscribe(this._o));
	    };

	    return CatchObserver;
	  }(AbstractObserver));

	  /**
	   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
	   * @param {Mixed} handlerOrSecond Exception handler function that returns an observable sequence given the error that occurred in the first sequence, or a second observable sequence used to produce results when an error occurred in the first sequence.
	   * @returns {Observable} An observable sequence containing the first sequence's elements, followed by the elements of the handler sequence in case an exception occurred.
	   */
	  observableProto['catch'] = function (handlerOrSecond) {
	    return isFunction(handlerOrSecond) ? new CatchObservable(this, handlerOrSecond) : observableCatch([this, handlerOrSecond]);
	  };

	  /**
	   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
	   * @param {Array | Arguments} args Arguments or an array to use as the next sequence if an error occurs.
	   * @returns {Observable} An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.
	   */
	  var observableCatch = Observable['catch'] = function () {
	    var items;
	    if (Array.isArray(arguments[0])) {
	      items = arguments[0];
	    } else {
	      var len = arguments.length;
	      items = new Array(len);
	      for(var i = 0; i < len; i++) { items[i] = arguments[i]; }
	    }
	    return enumerableOf(items).catchError();
	  };

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
	   * This can be in the form of an argument list of observables or an array.
	   *
	   * @example
	   * 1 - obs = observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	   * 2 - obs = observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.combineLatest = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    if (Array.isArray(args[0])) {
	      args[0].unshift(this);
	    } else {
	      args.unshift(this);
	    }
	    return combineLatest.apply(this, args);
	  };

	  function falseFactory() { return false; }
	  function argumentsToArray() {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return args;
	  }

	  var CombineLatestObservable = (function(__super__) {
	    inherits(CombineLatestObservable, __super__);
	    function CombineLatestObservable(params, cb) {
	      this._params = params;
	      this._cb = cb;
	      __super__.call(this);
	    }

	    CombineLatestObservable.prototype.subscribeCore = function(observer) {
	      var len = this._params.length,
	          subscriptions = new Array(len);

	      var state = {
	        hasValue: arrayInitialize(len, falseFactory),
	        hasValueAll: false,
	        isDone: arrayInitialize(len, falseFactory),
	        values: new Array(len)
	      };

	      for (var i = 0; i < len; i++) {
	        var source = this._params[i], sad = new SingleAssignmentDisposable();
	        subscriptions[i] = sad;
	        isPromise(source) && (source = observableFromPromise(source));
	        sad.setDisposable(source.subscribe(new CombineLatestObserver(observer, i, this._cb, state)));
	      }

	      return new NAryDisposable(subscriptions);
	    };

	    return CombineLatestObservable;
	  }(ObservableBase));

	  var CombineLatestObserver = (function (__super__) {
	    inherits(CombineLatestObserver, __super__);
	    function CombineLatestObserver(o, i, cb, state) {
	      this._o = o;
	      this._i = i;
	      this._cb = cb;
	      this._state = state;
	      __super__.call(this);
	    }

	    function notTheSame(i) {
	      return function (x, j) {
	        return j !== i;
	      };
	    }

	    CombineLatestObserver.prototype.next = function (x) {
	      this._state.values[this._i] = x;
	      this._state.hasValue[this._i] = true;
	      if (this._state.hasValueAll || (this._state.hasValueAll = this._state.hasValue.every(identity))) {
	        var res = tryCatch(this._cb).apply(null, this._state.values);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        this._o.onNext(res);
	      } else if (this._state.isDone.filter(notTheSame(this._i)).every(identity)) {
	        this._o.onCompleted();
	      }
	    };

	    CombineLatestObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    CombineLatestObserver.prototype.completed = function () {
	      this._state.isDone[this._i] = true;
	      this._state.isDone.every(identity) && this._o.onCompleted();
	    };

	    return CombineLatestObserver;
	  }(AbstractObserver));

	  /**
	  * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
	  *
	  * @example
	  * 1 - obs = Rx.Observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	  * 2 - obs = Rx.Observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	  * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	  */
	  var combineLatest = Observable.combineLatest = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	    Array.isArray(args[0]) && (args = args[0]);
	    return new CombineLatestObservable(args, resultSelector);
	  };

	  /**
	   * Concatenates all the observable sequences.  This takes in either an array or variable arguments to concatenate.
	   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
	   */
	  observableProto.concat = function () {
	    for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	    args.unshift(this);
	    return observableConcat.apply(null, args);
	  };

	  var ConcatObserver = (function(__super__) {
	    inherits(ConcatObserver, __super__);
	    function ConcatObserver(s, fn) {
	      this._s = s;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    ConcatObserver.prototype.next = function (x) { this._s.o.onNext(x); };
	    ConcatObserver.prototype.error = function (e) { this._s.o.onError(e); };
	    ConcatObserver.prototype.completed = function () { this._s.i++; this._fn(this._s); };

	    return ConcatObserver;
	  }(AbstractObserver));

	  var ConcatObservable = (function(__super__) {
	    inherits(ConcatObservable, __super__);
	    function ConcatObservable(sources) {
	      this._sources = sources;
	      __super__.call(this);
	    }

	    function scheduleRecursive (state, recurse) {
	      if (state.disposable.isDisposed) { return; }
	      if (state.i === state.sources.length) { return state.o.onCompleted(); }

	      // Check if promise
	      var currentValue = state.sources[state.i];
	      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

	      var d = new SingleAssignmentDisposable();
	      state.subscription.setDisposable(d);
	      d.setDisposable(currentValue.subscribe(new ConcatObserver(state, recurse)));
	    }

	    ConcatObservable.prototype.subscribeCore = function(o) {
	      var subscription = new SerialDisposable();
	      var disposable = disposableCreate(noop);
	      var state = {
	        o: o,
	        i: 0,
	        subscription: subscription,
	        disposable: disposable,
	        sources: this._sources
	      };

	      var cancelable = immediateScheduler.scheduleRecursive(state, scheduleRecursive);
	      return new NAryDisposable([subscription, disposable, cancelable]);
	    };

	    return ConcatObservable;
	  }(ObservableBase));

	  /**
	   * Concatenates all the observable sequences.
	   * @param {Array | Arguments} args Arguments or an array to concat to the observable sequence.
	   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
	   */
	  var observableConcat = Observable.concat = function () {
	    var args;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      args = new Array(arguments.length);
	      for(var i = 0, len = arguments.length; i < len; i++) { args[i] = arguments[i]; }
	    }
	    return new ConcatObservable(args);
	  };

	  /**
	   * Concatenates an observable sequence of observable sequences.
	   * @returns {Observable} An observable sequence that contains the elements of each observed inner sequence, in sequential order.
	   */
	  observableProto.concatAll = function () {
	    return this.merge(1);
	  };

	  var MergeObservable = (function (__super__) {
	    inherits(MergeObservable, __super__);

	    function MergeObservable(source, maxConcurrent) {
	      this.source = source;
	      this.maxConcurrent = maxConcurrent;
	      __super__.call(this);
	    }

	    MergeObservable.prototype.subscribeCore = function(observer) {
	      var g = new CompositeDisposable();
	      g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
	      return g;
	    };

	    return MergeObservable;

	  }(ObservableBase));

	  var MergeObserver = (function (__super__) {
	    function MergeObserver(o, max, g) {
	      this.o = o;
	      this.max = max;
	      this.g = g;
	      this.done = false;
	      this.q = [];
	      this.activeCount = 0;
	      __super__.call(this);
	    }

	    inherits(MergeObserver, __super__);

	    MergeObserver.prototype.handleSubscribe = function (xs) {
	      var sad = new SingleAssignmentDisposable();
	      this.g.add(sad);
	      isPromise(xs) && (xs = observableFromPromise(xs));
	      sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
	    };

	    MergeObserver.prototype.next = function (innerSource) {
	      if(this.activeCount < this.max) {
	        this.activeCount++;
	        this.handleSubscribe(innerSource);
	      } else {
	        this.q.push(innerSource);
	      }
	    };
	    MergeObserver.prototype.error = function (e) { this.o.onError(e); };
	    MergeObserver.prototype.completed = function () { this.done = true; this.activeCount === 0 && this.o.onCompleted(); };

	    function InnerObserver(parent, sad) {
	      this.parent = parent;
	      this.sad = sad;
	      __super__.call(this);
	    }

	    inherits(InnerObserver, __super__);

	    InnerObserver.prototype.next = function (x) { this.parent.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) { this.parent.o.onError(e); };
	    InnerObserver.prototype.completed = function () {
	      this.parent.g.remove(this.sad);
	      if (this.parent.q.length > 0) {
	        this.parent.handleSubscribe(this.parent.q.shift());
	      } else {
	        this.parent.activeCount--;
	        this.parent.done && this.parent.activeCount === 0 && this.parent.o.onCompleted();
	      }
	    };

	    return MergeObserver;
	  }(AbstractObserver));

	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence, limiting the number of concurrent subscriptions to inner sequences.
	  * Or merges two observable sequences into a single observable sequence.
	  * @param {Mixed} [maxConcurrentOrOther] Maximum number of inner observable sequences being subscribed to concurrently or the second observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.merge = function (maxConcurrentOrOther) {
	    return typeof maxConcurrentOrOther !== 'number' ?
	      observableMerge(this, maxConcurrentOrOther) :
	      new MergeObservable(this, maxConcurrentOrOther);
	  };

	  /**
	   * Merges all the observable sequences into a single observable sequence.
	   * The scheduler is optional and if not specified, the immediate scheduler is used.
	   * @returns {Observable} The observable sequence that merges the elements of the observable sequences.
	   */
	  var observableMerge = Observable.merge = function () {
	    var scheduler, sources = [], i, len = arguments.length;
	    if (!arguments[0]) {
	      scheduler = immediateScheduler;
	      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
	    } else if (isScheduler(arguments[0])) {
	      scheduler = arguments[0];
	      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
	    } else {
	      scheduler = immediateScheduler;
	      for(i = 0; i < len; i++) { sources.push(arguments[i]); }
	    }
	    if (Array.isArray(sources[0])) {
	      sources = sources[0];
	    }
	    return observableOf(scheduler, sources).mergeAll();
	  };

	  var MergeAllObservable = (function (__super__) {
	    inherits(MergeAllObservable, __super__);

	    function MergeAllObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    MergeAllObservable.prototype.subscribeCore = function (o) {
	      var g = new CompositeDisposable(), m = new SingleAssignmentDisposable();
	      g.add(m);
	      m.setDisposable(this.source.subscribe(new MergeAllObserver(o, g)));
	      return g;
	    };

	    return MergeAllObservable;
	  }(ObservableBase));

	  var MergeAllObserver = (function (__super__) {
	    function MergeAllObserver(o, g) {
	      this.o = o;
	      this.g = g;
	      this.done = false;
	      __super__.call(this);
	    }

	    inherits(MergeAllObserver, __super__);

	    MergeAllObserver.prototype.next = function(innerSource) {
	      var sad = new SingleAssignmentDisposable();
	      this.g.add(sad);
	      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	      sad.setDisposable(innerSource.subscribe(new InnerObserver(this, sad)));
	    };

	    MergeAllObserver.prototype.error = function (e) {
	      this.o.onError(e);
	    };

	    MergeAllObserver.prototype.completed = function () {
	      this.done = true;
	      this.g.length === 1 && this.o.onCompleted();
	    };

	    function InnerObserver(parent, sad) {
	      this.parent = parent;
	      this.sad = sad;
	      __super__.call(this);
	    }

	    inherits(InnerObserver, __super__);

	    InnerObserver.prototype.next = function (x) {
	      this.parent.o.onNext(x);
	    };
	    InnerObserver.prototype.error = function (e) {
	      this.parent.o.onError(e);
	    };
	    InnerObserver.prototype.completed = function () {
	      this.parent.g.remove(this.sad);
	      this.parent.done && this.parent.g.length === 1 && this.parent.o.onCompleted();
	    };

	    return MergeAllObserver;
	  }(AbstractObserver));

	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.mergeAll = function () {
	    return new MergeAllObservable(this);
	  };

	  var CompositeError = Rx.CompositeError = function(errors) {
	    this.innerErrors = errors;
	    this.message = 'This contains multiple errors. Check the innerErrors';
	    Error.call(this);
	  };
	  CompositeError.prototype = Object.create(Error.prototype);
	  CompositeError.prototype.name = 'CompositeError';

	  var MergeDelayErrorObservable = (function(__super__) {
	    inherits(MergeDelayErrorObservable, __super__);
	    function MergeDelayErrorObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    MergeDelayErrorObservable.prototype.subscribeCore = function (o) {
	      var group = new CompositeDisposable(),
	        m = new SingleAssignmentDisposable(),
	        state = { isStopped: false, errors: [], o: o };

	      group.add(m);
	      m.setDisposable(this.source.subscribe(new MergeDelayErrorObserver(group, state)));

	      return group;
	    };

	    return MergeDelayErrorObservable;
	  }(ObservableBase));

	  var MergeDelayErrorObserver = (function(__super__) {
	    inherits(MergeDelayErrorObserver, __super__);
	    function MergeDelayErrorObserver(group, state) {
	      this._group = group;
	      this._state = state;
	      __super__.call(this);
	    }

	    function setCompletion(o, errors) {
	      if (errors.length === 0) {
	        o.onCompleted();
	      } else if (errors.length === 1) {
	        o.onError(errors[0]);
	      } else {
	        o.onError(new CompositeError(errors));
	      }
	    }

	    MergeDelayErrorObserver.prototype.next = function (x) {
	      var inner = new SingleAssignmentDisposable();
	      this._group.add(inner);

	      // Check for promises support
	      isPromise(x) && (x = observableFromPromise(x));
	      inner.setDisposable(x.subscribe(new InnerObserver(inner, this._group, this._state)));
	    };

	    MergeDelayErrorObserver.prototype.error = function (e) {
	      this._state.errors.push(e);
	      this._state.isStopped = true;
	      this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
	    };

	    MergeDelayErrorObserver.prototype.completed = function () {
	      this._state.isStopped = true;
	      this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
	    };

	    inherits(InnerObserver, __super__);
	    function InnerObserver(inner, group, state) {
	      this._inner = inner;
	      this._group = group;
	      this._state = state;
	      __super__.call(this);
	    }

	    InnerObserver.prototype.next = function (x) { this._state.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) {
	      this._state.errors.push(e);
	      this._group.remove(this._inner);
	      this._state.isStopped && this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
	    };
	    InnerObserver.prototype.completed = function () {
	      this._group.remove(this._inner);
	      this._state.isStopped && this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
	    };

	    return MergeDelayErrorObserver;
	  }(AbstractObserver));

	  /**
	  * Flattens an Observable that emits Observables into one Observable, in a way that allows an Observer to
	  * receive all successfully emitted items from all of the source Observables without being interrupted by
	  * an error notification from one of them.
	  *
	  * This behaves like Observable.prototype.mergeAll except that if any of the merged Observables notify of an
	  * error via the Observer's onError, mergeDelayError will refrain from propagating that
	  * error notification until all of the merged Observables have finished emitting items.
	  * @param {Array | Arguments} args Arguments or an array to merge.
	  * @returns {Observable} an Observable that emits all of the items emitted by the Observables emitted by the Observable
	  */
	  Observable.mergeDelayError = function() {
	    var args;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      var len = arguments.length;
	      args = new Array(len);
	      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    }
	    var source = observableOf(null, args);
	    return new MergeDelayErrorObservable(source);
	  };

	  /**
	   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
	   * @param {Observable} second Second observable sequence used to produce results after the first sequence terminates.
	   * @returns {Observable} An observable sequence that concatenates the first and second sequence, even if the first sequence terminates exceptionally.
	   */
	  observableProto.onErrorResumeNext = function (second) {
	    if (!second) { throw new Error('Second observable is required'); }
	    return onErrorResumeNext([this, second]);
	  };

	  var OnErrorResumeNextObservable = (function(__super__) {
	    inherits(OnErrorResumeNextObservable, __super__);
	    function OnErrorResumeNextObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }

	    function scheduleMethod(state, recurse) {
	      if (state.pos < state.sources.length) {
	        var current = state.sources[state.pos++];
	        isPromise(current) && (current = observableFromPromise(current));
	        var d = new SingleAssignmentDisposable();
	        state.subscription.setDisposable(d);
	        d.setDisposable(current.subscribe(new OnErrorResumeNextObserver(state, recurse)));
	      } else {
	        state.o.onCompleted();
	      }
	    }

	    OnErrorResumeNextObservable.prototype.subscribeCore = function (o) {
	      var subscription = new SerialDisposable(),
	          state = {pos: 0, subscription: subscription, o: o, sources: this.sources },
	          cancellable = immediateScheduler.scheduleRecursive(state, scheduleMethod);

	      return new BinaryDisposable(subscription, cancellable);
	    };

	    return OnErrorResumeNextObservable;
	  }(ObservableBase));

	  var OnErrorResumeNextObserver = (function(__super__) {
	    inherits(OnErrorResumeNextObserver, __super__);
	    function OnErrorResumeNextObserver(state, recurse) {
	      this._state = state;
	      this._recurse = recurse;
	      __super__.call(this);
	    }

	    OnErrorResumeNextObserver.prototype.next = function (x) { this._state.o.onNext(x); };
	    OnErrorResumeNextObserver.prototype.error = function () { this._recurse(this._state); };
	    OnErrorResumeNextObserver.prototype.completed = function () { this._recurse(this._state); };

	    return OnErrorResumeNextObserver;
	  }(AbstractObserver));

	  /**
	   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
	   * @returns {Observable} An observable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
	   */
	  var onErrorResumeNext = Observable.onErrorResumeNext = function () {
	    var sources = [];
	    if (Array.isArray(arguments[0])) {
	      sources = arguments[0];
	    } else {
	      var len = arguments.length;
	      sources = new Array(len);
	      for(var i = 0; i < len; i++) { sources[i] = arguments[i]; }
	    }
	    return new OnErrorResumeNextObservable(sources);
	  };

	  var SkipUntilObservable = (function(__super__) {
	    inherits(SkipUntilObservable, __super__);

	    function SkipUntilObservable(source, other) {
	      this._s = source;
	      this._o = isPromise(other) ? observableFromPromise(other) : other;
	      this._open = false;
	      __super__.call(this);
	    }

	    SkipUntilObservable.prototype.subscribeCore = function(o) {
	      var leftSubscription = new SingleAssignmentDisposable();
	      leftSubscription.setDisposable(this._s.subscribe(new SkipUntilSourceObserver(o, this)));

	      isPromise(this._o) && (this._o = observableFromPromise(this._o));

	      var rightSubscription = new SingleAssignmentDisposable();
	      rightSubscription.setDisposable(this._o.subscribe(new SkipUntilOtherObserver(o, this, rightSubscription)));

	      return new BinaryDisposable(leftSubscription, rightSubscription);
	    };

	    return SkipUntilObservable;
	  }(ObservableBase));

	  var SkipUntilSourceObserver = (function(__super__) {
	    inherits(SkipUntilSourceObserver, __super__);
	    function SkipUntilSourceObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      __super__.call(this);
	    }

	    SkipUntilSourceObserver.prototype.next = function (x) {
	      this._p._open && this._o.onNext(x);
	    };

	    SkipUntilSourceObserver.prototype.error = function (err) {
	      this._o.onError(err);
	    };

	    SkipUntilSourceObserver.prototype.onCompleted = function () {
	      this._p._open && this._o.onCompleted();
	    };

	    return SkipUntilSourceObserver;
	  }(AbstractObserver));

	  var SkipUntilOtherObserver = (function(__super__) {
	    inherits(SkipUntilOtherObserver, __super__);
	    function SkipUntilOtherObserver(o, p, r) {
	      this._o = o;
	      this._p = p;
	      this._r = r;
	      __super__.call(this);
	    }

	    SkipUntilOtherObserver.prototype.next = function () {
	      this._p._open = true;
	      this._r.dispose();
	    };

	    SkipUntilOtherObserver.prototype.error = function (err) {
	      this._o.onError(err);
	    };

	    SkipUntilOtherObserver.prototype.onCompleted = function () {
	      this._r.dispose();
	    };

	    return SkipUntilOtherObserver;
	  }(AbstractObserver));

	  /**
	   * Returns the values from the source observable sequence only after the other observable sequence produces a value.
	   * @param {Observable | Promise} other The observable sequence or Promise that triggers propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence starting from the point the other sequence triggered propagation.
	   */
	  observableProto.skipUntil = function (other) {
	    return new SkipUntilObservable(this, other);
	  };

	  var SwitchObservable = (function(__super__) {
	    inherits(SwitchObservable, __super__);
	    function SwitchObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    SwitchObservable.prototype.subscribeCore = function (o) {
	      var inner = new SerialDisposable(), s = this.source.subscribe(new SwitchObserver(o, inner));
	      return new BinaryDisposable(s, inner);
	    };

	    inherits(SwitchObserver, AbstractObserver);
	    function SwitchObserver(o, inner) {
	      this.o = o;
	      this.inner = inner;
	      this.stopped = false;
	      this.latest = 0;
	      this.hasLatest = false;
	      AbstractObserver.call(this);
	    }

	    SwitchObserver.prototype.next = function (innerSource) {
	      var d = new SingleAssignmentDisposable(), id = ++this.latest;
	      this.hasLatest = true;
	      this.inner.setDisposable(d);
	      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	      d.setDisposable(innerSource.subscribe(new InnerObserver(this, id)));
	    };

	    SwitchObserver.prototype.error = function (e) {
	      this.o.onError(e);
	    };

	    SwitchObserver.prototype.completed = function () {
	      this.stopped = true;
	      !this.hasLatest && this.o.onCompleted();
	    };

	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(parent, id) {
	      this.parent = parent;
	      this.id = id;
	      AbstractObserver.call(this);
	    }
	    InnerObserver.prototype.next = function (x) {
	      this.parent.latest === this.id && this.parent.o.onNext(x);
	    };

	    InnerObserver.prototype.error = function (e) {
	      this.parent.latest === this.id && this.parent.o.onError(e);
	    };

	    InnerObserver.prototype.completed = function () {
	      if (this.parent.latest === this.id) {
	        this.parent.hasLatest = false;
	        this.parent.stopped && this.parent.o.onCompleted();
	      }
	    };

	    return SwitchObservable;
	  }(ObservableBase));

	  /**
	  * Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
	  * @returns {Observable} The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
	  */
	  observableProto['switch'] = observableProto.switchLatest = function () {
	    return new SwitchObservable(this);
	  };

	  var TakeUntilObservable = (function(__super__) {
	    inherits(TakeUntilObservable, __super__);

	    function TakeUntilObservable(source, other) {
	      this.source = source;
	      this.other = isPromise(other) ? observableFromPromise(other) : other;
	      __super__.call(this);
	    }

	    TakeUntilObservable.prototype.subscribeCore = function(o) {
	      return new BinaryDisposable(
	        this.source.subscribe(o),
	        this.other.subscribe(new TakeUntilObserver(o))
	      );
	    };

	    return TakeUntilObservable;
	  }(ObservableBase));

	  var TakeUntilObserver = (function(__super__) {
	    inherits(TakeUntilObserver, __super__);
	    function TakeUntilObserver(o) {
	      this._o = o;
	      __super__.call(this);
	    }

	    TakeUntilObserver.prototype.next = function () {
	      this._o.onCompleted();
	    };

	    TakeUntilObserver.prototype.error = function (err) {
	      this._o.onError(err);
	    };

	    TakeUntilObserver.prototype.onCompleted = noop;

	    return TakeUntilObserver;
	  }(AbstractObserver));

	  /**
	   * Returns the values from the source observable sequence until the other observable sequence produces a value.
	   * @param {Observable | Promise} other Observable sequence or Promise that terminates propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
	   */
	  observableProto.takeUntil = function (other) {
	    return new TakeUntilObservable(this, other);
	  };

	  function falseFactory() { return false; }
	  function argumentsToArray() {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return args;
	  }

	  var WithLatestFromObservable = (function(__super__) {
	    inherits(WithLatestFromObservable, __super__);
	    function WithLatestFromObservable(source, sources, resultSelector) {
	      this._s = source;
	      this._ss = sources;
	      this._cb = resultSelector;
	      __super__.call(this);
	    }

	    WithLatestFromObservable.prototype.subscribeCore = function (o) {
	      var len = this._ss.length;
	      var state = {
	        hasValue: arrayInitialize(len, falseFactory),
	        hasValueAll: false,
	        values: new Array(len)
	      };

	      var n = this._ss.length, subscriptions = new Array(n + 1);
	      for (var i = 0; i < n; i++) {
	        var other = this._ss[i], sad = new SingleAssignmentDisposable();
	        isPromise(other) && (other = observableFromPromise(other));
	        sad.setDisposable(other.subscribe(new WithLatestFromOtherObserver(o, i, state)));
	        subscriptions[i] = sad;
	      }

	      var outerSad = new SingleAssignmentDisposable();
	      outerSad.setDisposable(this._s.subscribe(new WithLatestFromSourceObserver(o, this._cb, state)));
	      subscriptions[n] = outerSad;

	      return new NAryDisposable(subscriptions);
	    };

	    return WithLatestFromObservable;
	  }(ObservableBase));

	  var WithLatestFromOtherObserver = (function (__super__) {
	    inherits(WithLatestFromOtherObserver, __super__);
	    function WithLatestFromOtherObserver(o, i, state) {
	      this._o = o;
	      this._i = i;
	      this._state = state;
	      __super__.call(this);
	    }

	    WithLatestFromOtherObserver.prototype.next = function (x) {
	      this._state.values[this._i] = x;
	      this._state.hasValue[this._i] = true;
	      this._state.hasValueAll = this._state.hasValue.every(identity);
	    };

	    WithLatestFromOtherObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    WithLatestFromOtherObserver.prototype.completed = noop;

	    return WithLatestFromOtherObserver;
	  }(AbstractObserver));

	  var WithLatestFromSourceObserver = (function (__super__) {
	    inherits(WithLatestFromSourceObserver, __super__);
	    function WithLatestFromSourceObserver(o, cb, state) {
	      this._o = o;
	      this._cb = cb;
	      this._state = state;
	      __super__.call(this);
	    }

	    WithLatestFromSourceObserver.prototype.next = function (x) {
	      var allValues = [x].concat(this._state.values);
	      if (!this._state.hasValueAll) { return; }
	      var res = tryCatch(this._cb).apply(null, allValues);
	      if (res === errorObj) { return this._o.onError(res.e); }
	      this._o.onNext(res);
	    };

	    WithLatestFromSourceObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    WithLatestFromSourceObserver.prototype.completed = function () {
	      this._o.onCompleted();
	    };

	    return WithLatestFromSourceObserver;
	  }(AbstractObserver));

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function only when the (first) source observable sequence produces an element.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.withLatestFrom = function () {
	    if (arguments.length === 0) { throw new Error('invalid arguments'); }

	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	    Array.isArray(args[0]) && (args = args[0]);

	    return new WithLatestFromObservable(this, args, resultSelector);
	  };

	  function falseFactory() { return false; }
	  function emptyArrayFactory() { return []; }

	  var ZipObservable = (function(__super__) {
	    inherits(ZipObservable, __super__);
	    function ZipObservable(sources, resultSelector) {
	      this._s = sources;
	      this._cb = resultSelector;
	      __super__.call(this);
	    }

	    ZipObservable.prototype.subscribeCore = function(observer) {
	      var n = this._s.length,
	          subscriptions = new Array(n),
	          done = arrayInitialize(n, falseFactory),
	          q = arrayInitialize(n, emptyArrayFactory);

	      for (var i = 0; i < n; i++) {
	        var source = this._s[i], sad = new SingleAssignmentDisposable();
	        subscriptions[i] = sad;
	        isPromise(source) && (source = observableFromPromise(source));
	        sad.setDisposable(source.subscribe(new ZipObserver(observer, i, this, q, done)));
	      }

	      return new NAryDisposable(subscriptions);
	    };

	    return ZipObservable;
	  }(ObservableBase));

	  var ZipObserver = (function (__super__) {
	    inherits(ZipObserver, __super__);
	    function ZipObserver(o, i, p, q, d) {
	      this._o = o;
	      this._i = i;
	      this._p = p;
	      this._q = q;
	      this._d = d;
	      __super__.call(this);
	    }

	    function notEmpty(x) { return x.length > 0; }
	    function shiftEach(x) { return x.shift(); }
	    function notTheSame(i) {
	      return function (x, j) {
	        return j !== i;
	      };
	    }

	    ZipObserver.prototype.next = function (x) {
	      this._q[this._i].push(x);
	      if (this._q.every(notEmpty)) {
	        var queuedValues = this._q.map(shiftEach);
	        var res = tryCatch(this._p._cb).apply(null, queuedValues);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        this._o.onNext(res);
	      } else if (this._d.filter(notTheSame(this._i)).every(identity)) {
	        this._o.onCompleted();
	      }
	    };

	    ZipObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    ZipObserver.prototype.completed = function () {
	      this._d[this._i] = true;
	      this._d.every(identity) && this._o.onCompleted();
	    };

	    return ZipObserver;
	  }(AbstractObserver));

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
	   * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
	   */
	  observableProto.zip = function () {
	    if (arguments.length === 0) { throw new Error('invalid arguments'); }

	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	    Array.isArray(args[0]) && (args = args[0]);

	    var parent = this;
	    args.unshift(parent);

	    return new ZipObservable(args, resultSelector);
	  };

	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.
	   * @param arguments Observable sources.
	   * @param {Function} resultSelector Function to invoke for each series of elements at corresponding indexes in the sources.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  Observable.zip = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    if (Array.isArray(args[0])) {
	      args = isFunction(args[1]) ? args[0].concat(args[1]) : args[0];
	    }
	    var first = args.shift();
	    return first.zip.apply(first, args);
	  };

	function falseFactory() { return false; }
	function emptyArrayFactory() { return []; }
	function argumentsToArray() {
	  var len = arguments.length, args = new Array(len);
	  for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	  return args;
	}

	var ZipIterableObservable = (function(__super__) {
	  inherits(ZipIterableObservable, __super__);
	  function ZipIterableObservable(sources, cb) {
	    this.sources = sources;
	    this._cb = cb;
	    __super__.call(this);
	  }

	  ZipIterableObservable.prototype.subscribeCore = function (o) {
	    var sources = this.sources, len = sources.length, subscriptions = new Array(len);

	    var state = {
	      q: arrayInitialize(len, emptyArrayFactory),
	      done: arrayInitialize(len, falseFactory),
	      cb: this._cb,
	      o: o
	    };

	    for (var i = 0; i < len; i++) {
	      (function (i) {
	        var source = sources[i], sad = new SingleAssignmentDisposable();
	        (isArrayLike(source) || isIterable(source)) && (source = observableFrom(source));

	        subscriptions[i] = sad;
	        sad.setDisposable(source.subscribe(new ZipIterableObserver(state, i)));
	      }(i));
	    }

	    return new NAryDisposable(subscriptions);
	  };

	  return ZipIterableObservable;
	}(ObservableBase));

	var ZipIterableObserver = (function (__super__) {
	  inherits(ZipIterableObserver, __super__);
	  function ZipIterableObserver(s, i) {
	    this._s = s;
	    this._i = i;
	    __super__.call(this);
	  }

	  function notEmpty(x) { return x.length > 0; }
	  function shiftEach(x) { return x.shift(); }
	  function notTheSame(i) {
	    return function (x, j) {
	      return j !== i;
	    };
	  }

	  ZipIterableObserver.prototype.next = function (x) {
	    this._s.q[this._i].push(x);
	    if (this._s.q.every(notEmpty)) {
	      var queuedValues = this._s.q.map(shiftEach),
	          res = tryCatch(this._s.cb).apply(null, queuedValues);
	      if (res === errorObj) { return this._s.o.onError(res.e); }
	      this._s.o.onNext(res);
	    } else if (this._s.done.filter(notTheSame(this._i)).every(identity)) {
	      this._s.o.onCompleted();
	    }
	  };

	  ZipIterableObserver.prototype.error = function (e) { this._s.o.onError(e); };

	  ZipIterableObserver.prototype.completed = function () {
	    this._s.done[this._i] = true;
	    this._s.done.every(identity) && this._s.o.onCompleted();
	  };

	  return ZipIterableObserver;
	}(AbstractObserver));

	/**
	 * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
	 * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
	 * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
	 */
	observableProto.zipIterable = function () {
	  if (arguments.length === 0) { throw new Error('invalid arguments'); }

	  var len = arguments.length, args = new Array(len);
	  for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	  var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;

	  var parent = this;
	  args.unshift(parent);
	  return new ZipIterableObservable(args, resultSelector);
	};

	  function asObservable(source) {
	    return function subscribe(o) { return source.subscribe(o); };
	  }

	  /**
	   *  Hides the identity of an observable sequence.
	   * @returns {Observable} An observable sequence that hides the identity of the source sequence.
	   */
	  observableProto.asObservable = function () {
	    return new AnonymousObservable(asObservable(this), this);
	  };

	  function toArray(x) { return x.toArray(); }
	  function notEmpty(x) { return x.length > 0; }

	  /**
	   *  Projects each element of an observable sequence into zero or more buffers which are produced based on element count information.
	   * @param {Number} count Length of each buffer.
	   * @param {Number} [skip] Number of elements to skip between creation of consecutive buffers. If not provided, defaults to the count.
	   * @returns {Observable} An observable sequence of buffers.
	   */
	  observableProto.bufferWithCount = function (count, skip) {
	    typeof skip !== 'number' && (skip = count);
	    return this.windowWithCount(count, skip)
	      .flatMap(toArray)
	      .filter(notEmpty);
	  };

	  var DematerializeObservable = (function (__super__) {
	    inherits(DematerializeObservable, __super__);
	    function DematerializeObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    DematerializeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new DematerializeObserver(o));
	    };

	    return DematerializeObservable;
	  }(ObservableBase));

	  var DematerializeObserver = (function (__super__) {
	    inherits(DematerializeObserver, __super__);

	    function DematerializeObserver(o) {
	      this._o = o;
	      __super__.call(this);
	    }

	    DematerializeObserver.prototype.next = function (x) { x.accept(this._o); };
	    DematerializeObserver.prototype.error = function (e) { this._o.onError(e); };
	    DematerializeObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return DematerializeObserver;
	  }(AbstractObserver));

	  /**
	   * Dematerializes the explicit notification values of an observable sequence as implicit notifications.
	   * @returns {Observable} An observable sequence exhibiting the behavior corresponding to the source sequence's notification values.
	   */
	  observableProto.dematerialize = function () {
	    return new DematerializeObservable(this);
	  };

	  var DistinctUntilChangedObservable = (function(__super__) {
	    inherits(DistinctUntilChangedObservable, __super__);
	    function DistinctUntilChangedObservable(source, keyFn, comparer) {
	      this.source = source;
	      this.keyFn = keyFn;
	      this.comparer = comparer;
	      __super__.call(this);
	    }

	    DistinctUntilChangedObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new DistinctUntilChangedObserver(o, this.keyFn, this.comparer));
	    };

	    return DistinctUntilChangedObservable;
	  }(ObservableBase));

	  var DistinctUntilChangedObserver = (function(__super__) {
	    inherits(DistinctUntilChangedObserver, __super__);
	    function DistinctUntilChangedObserver(o, keyFn, comparer) {
	      this.o = o;
	      this.keyFn = keyFn;
	      this.comparer = comparer;
	      this.hasCurrentKey = false;
	      this.currentKey = null;
	      __super__.call(this);
	    }

	    DistinctUntilChangedObserver.prototype.next = function (x) {
	      var key = x, comparerEquals;
	      if (isFunction(this.keyFn)) {
	        key = tryCatch(this.keyFn)(x);
	        if (key === errorObj) { return this.o.onError(key.e); }
	      }
	      if (this.hasCurrentKey) {
	        comparerEquals = tryCatch(this.comparer)(this.currentKey, key);
	        if (comparerEquals === errorObj) { return this.o.onError(comparerEquals.e); }
	      }
	      if (!this.hasCurrentKey || !comparerEquals) {
	        this.hasCurrentKey = true;
	        this.currentKey = key;
	        this.o.onNext(x);
	      }
	    };
	    DistinctUntilChangedObserver.prototype.error = function(e) {
	      this.o.onError(e);
	    };
	    DistinctUntilChangedObserver.prototype.completed = function () {
	      this.o.onCompleted();
	    };

	    return DistinctUntilChangedObserver;
	  }(AbstractObserver));

	  /**
	  *  Returns an observable sequence that contains only distinct contiguous elements according to the keyFn and the comparer.
	  * @param {Function} [keyFn] A function to compute the comparison key for each element. If not provided, it projects the value.
	  * @param {Function} [comparer] Equality comparer for computed key values. If not provided, defaults to an equality comparer function.
	  * @returns {Observable} An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
	  */
	  observableProto.distinctUntilChanged = function (keyFn, comparer) {
	    comparer || (comparer = defaultComparer);
	    return new DistinctUntilChangedObservable(this, keyFn, comparer);
	  };

	  var TapObservable = (function(__super__) {
	    inherits(TapObservable,__super__);
	    function TapObservable(source, observerOrOnNext, onError, onCompleted) {
	      this.source = source;
	      this._oN = observerOrOnNext;
	      this._oE = onError;
	      this._oC = onCompleted;
	      __super__.call(this);
	    }

	    TapObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o, this));
	    };

	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(o, p) {
	      this.o = o;
	      this.t = !p._oN || isFunction(p._oN) ?
	        observerCreate(p._oN || noop, p._oE || noop, p._oC || noop) :
	        p._oN;
	      this.isStopped = false;
	      AbstractObserver.call(this);
	    }
	    InnerObserver.prototype.next = function(x) {
	      var res = tryCatch(this.t.onNext).call(this.t, x);
	      if (res === errorObj) { this.o.onError(res.e); }
	      this.o.onNext(x);
	    };
	    InnerObserver.prototype.error = function(err) {
	      var res = tryCatch(this.t.onError).call(this.t, err);
	      if (res === errorObj) { return this.o.onError(res.e); }
	      this.o.onError(err);
	    };
	    InnerObserver.prototype.completed = function() {
	      var res = tryCatch(this.t.onCompleted).call(this.t);
	      if (res === errorObj) { return this.o.onError(res.e); }
	      this.o.onCompleted();
	    };

	    return TapObservable;
	  }(ObservableBase));

	  /**
	  *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function | Observer} observerOrOnNext Action to invoke for each element in the observable sequence or an o.
	  * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	  * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
	    return new TapObservable(this, observerOrOnNext, onError, onCompleted);
	  };

	  /**
	  *  Invokes an action for each element in the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onNext Action to invoke for each element in the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnNext = observableProto.tapOnNext = function (onNext, thisArg) {
	    return this.tap(typeof thisArg !== 'undefined' ? function (x) { onNext.call(thisArg, x); } : onNext);
	  };

	  /**
	  *  Invokes an action upon exceptional termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onError Action to invoke upon exceptional termination of the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnError = observableProto.tapOnError = function (onError, thisArg) {
	    return this.tap(noop, typeof thisArg !== 'undefined' ? function (e) { onError.call(thisArg, e); } : onError);
	  };

	  /**
	  *  Invokes an action upon graceful termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onCompleted Action to invoke upon graceful termination of the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnCompleted = observableProto.tapOnCompleted = function (onCompleted, thisArg) {
	    return this.tap(noop, null, typeof thisArg !== 'undefined' ? function () { onCompleted.call(thisArg); } : onCompleted);
	  };

	  var FinallyObservable = (function (__super__) {
	    inherits(FinallyObservable, __super__);
	    function FinallyObservable(source, fn, thisArg) {
	      this.source = source;
	      this._fn = bindCallback(fn, thisArg, 0);
	      __super__.call(this);
	    }

	    FinallyObservable.prototype.subscribeCore = function (o) {
	      var d = tryCatch(this.source.subscribe).call(this.source, o);
	      if (d === errorObj) {
	        this._fn();
	        thrower(d.e);
	      }

	      return new FinallyDisposable(d, this._fn);
	    };

	    function FinallyDisposable(s, fn) {
	      this.isDisposed = false;
	      this._s = s;
	      this._fn = fn;
	    }
	    FinallyDisposable.prototype.dispose = function () {
	      if (!this.isDisposed) {
	        var res = tryCatch(this._s.dispose).call(this._s);
	        this._fn();
	        res === errorObj && thrower(res.e);
	      }
	    };

	    return FinallyObservable;

	  }(ObservableBase));

	  /**
	   *  Invokes a specified action after the source observable sequence terminates gracefully or exceptionally.
	   * @param {Function} finallyAction Action to invoke after the source observable sequence terminates.
	   * @returns {Observable} Source sequence with the action-invoking termination behavior applied.
	   */
	  observableProto['finally'] = function (action, thisArg) {
	    return new FinallyObservable(this, action, thisArg);
	  };

	  var IgnoreElementsObservable = (function(__super__) {
	    inherits(IgnoreElementsObservable, __super__);

	    function IgnoreElementsObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    IgnoreElementsObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o));
	    };

	    function InnerObserver(o) {
	      this.o = o;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = noop;
	    InnerObserver.prototype.onError = function (err) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.observer.onError(e);
	        return true;
	      }

	      return false;
	    };

	    return IgnoreElementsObservable;
	  }(ObservableBase));

	  /**
	   *  Ignores all elements in an observable sequence leaving only the termination messages.
	   * @returns {Observable} An empty observable sequence that signals termination, successful or exceptional, of the source sequence.
	   */
	  observableProto.ignoreElements = function () {
	    return new IgnoreElementsObservable(this);
	  };

	  var MaterializeObservable = (function (__super__) {
	    inherits(MaterializeObservable, __super__);
	    function MaterializeObservable(source, fn) {
	      this.source = source;
	      __super__.call(this);
	    }

	    MaterializeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new MaterializeObserver(o));
	    };

	    return MaterializeObservable;
	  }(ObservableBase));

	  var MaterializeObserver = (function (__super__) {
	    inherits(MaterializeObserver, __super__);

	    function MaterializeObserver(o) {
	      this._o = o;
	      __super__.call(this);
	    }

	    MaterializeObserver.prototype.next = function (x) { this._o.onNext(notificationCreateOnNext(x)) };
	    MaterializeObserver.prototype.error = function (e) { this._o.onNext(notificationCreateOnError(e)); this._o.onCompleted(); };
	    MaterializeObserver.prototype.completed = function () { this._o.onNext(notificationCreateOnCompleted()); this._o.onCompleted(); };

	    return MaterializeObserver;
	  }(AbstractObserver));

	  /**
	   *  Materializes the implicit notifications of an observable sequence as explicit notification values.
	   * @returns {Observable} An observable sequence containing the materialized notification values from the source sequence.
	   */
	  observableProto.materialize = function () {
	    return new MaterializeObservable(this);
	  };

	  /**
	   *  Repeats the observable sequence a specified number of times. If the repeat count is not specified, the sequence repeats indefinitely.
	   * @param {Number} [repeatCount]  Number of times to repeat the sequence. If not provided, repeats the sequence indefinitely.
	   * @returns {Observable} The observable sequence producing the elements of the given sequence repeatedly.
	   */
	  observableProto.repeat = function (repeatCount) {
	    return enumerableRepeat(this, repeatCount).concat();
	  };

	  /**
	   *  Repeats the source observable sequence the specified number of times or until it successfully terminates. If the retry count is not specified, it retries indefinitely.
	   *  Note if you encounter an error and want it to retry once, then you must use .retry(2);
	   *
	   * @example
	   *  var res = retried = retry.repeat();
	   *  var res = retried = retry.repeat(2);
	   * @param {Number} [retryCount]  Number of times to retry the sequence. If not provided, retry the sequence indefinitely.
	   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
	   */
	  observableProto.retry = function (retryCount) {
	    return enumerableRepeat(this, retryCount).catchError();
	  };

	  /**
	   *  Repeats the source observable sequence upon error each time the notifier emits or until it successfully terminates. 
	   *  if the notifier completes, the observable sequence completes.
	   *
	   * @example
	   *  var timer = Observable.timer(500);
	   *  var source = observable.retryWhen(timer);
	   * @param {Observable} [notifier] An observable that triggers the retries or completes the observable with onNext or onCompleted respectively.
	   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
	   */
	  observableProto.retryWhen = function (notifier) {
	    return enumerableRepeat(this).catchErrorWhen(notifier);
	  };
	  var ScanObservable = (function(__super__) {
	    inherits(ScanObservable, __super__);
	    function ScanObservable(source, accumulator, hasSeed, seed) {
	      this.source = source;
	      this.accumulator = accumulator;
	      this.hasSeed = hasSeed;
	      this.seed = seed;
	      __super__.call(this);
	    }

	    ScanObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new ScanObserver(o,this));
	    };

	    return ScanObservable;
	  }(ObservableBase));

	  var ScanObserver = (function (__super__) {
	    inherits(ScanObserver, __super__);
	    function ScanObserver(o, parent) {
	      this._o = o;
	      this._p = parent;
	      this._fn = parent.accumulator;
	      this._hs = parent.hasSeed;
	      this._s = parent.seed;
	      this._ha = false;
	      this._a = null;
	      this._hv = false;
	      this._i = 0;
	      __super__.call(this);
	    }

	    ScanObserver.prototype.next = function (x) {
	      !this._hv && (this._hv = true);
	      if (this._ha) {
	        this._a = tryCatch(this._fn)(this._a, x, this._i, this._p);
	      } else {
	        this._a = this._hs ? tryCatch(this._fn)(this._s, x, this._i, this._p) : x;
	        this._ha = true;
	      }
	      if (this._a === errorObj) { return this._o.onError(this._a.e); }
	      this._o.onNext(this._a);
	      this._i++;
	    };

	    ScanObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    ScanObserver.prototype.completed = function () {
	      !this._hv && this._hs && this._o.onNext(this._s);
	      this._o.onCompleted();
	    };

	    return ScanObserver;
	  }(AbstractObserver));

	  /**
	  *  Applies an accumulator function over an observable sequence and returns each intermediate result. The optional seed value is used as the initial accumulator value.
	  *  For aggregation behavior with no intermediate results, see Observable.aggregate.
	  * @param {Mixed} [seed] The initial accumulator value.
	  * @param {Function} accumulator An accumulator function to be invoked on each element.
	  * @returns {Observable} An observable sequence containing the accumulated values.
	  */
	  observableProto.scan = function () {
	    var hasSeed = false, seed, accumulator = arguments[0];
	    if (arguments.length === 2) {
	      hasSeed = true;
	      seed = arguments[1];
	    }
	    return new ScanObservable(this, accumulator, hasSeed, seed);
	  };

	  var SkipLastObservable = (function (__super__) {
	    inherits(SkipLastObservable, __super__);
	    function SkipLastObservable(source, c) {
	      this.source = source;
	      this._c = c;
	      __super__.call(this);
	    }

	    SkipLastObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SkipLastObserver(o, this._c));
	    };

	    return SkipLastObservable;
	  }(ObservableBase));

	  var SkipLastObserver = (function (__super__) {
	    inherits(SkipLastObserver, __super__);
	    function SkipLastObserver(o, c) {
	      this._o = o;
	      this._c = c;
	      this._q = [];
	      __super__.call(this);
	    }

	    SkipLastObserver.prototype.next = function (x) {
	      this._q.push(x);
	      this._q.length > this._c && this._o.onNext(this._q.shift());
	    };

	    SkipLastObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    SkipLastObserver.prototype.completed = function () {
	      this._o.onCompleted();
	    };

	    return SkipLastObserver;
	  }(AbstractObserver));

	  /**
	   *  Bypasses a specified number of elements at the end of an observable sequence.
	   * @description
	   *  This operator accumulates a queue with a length enough to store the first `count` elements. As more elements are
	   *  received, elements are taken from the front of the queue and produced on the result sequence. This causes elements to be delayed.
	   * @param count Number of elements to bypass at the end of the source sequence.
	   * @returns {Observable} An observable sequence containing the source sequence elements except for the bypassed ones at the end.
	   */
	  observableProto.skipLast = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    return new SkipLastObservable(this, count);
	  };

	  /**
	   *  Prepends a sequence of values to an observable sequence with an optional scheduler and an argument list of values to prepend.
	   *  @example
	   *  var res = source.startWith(1, 2, 3);
	   *  var res = source.startWith(Rx.Scheduler.timeout, 1, 2, 3);
	   * @param {Arguments} args The specified values to prepend to the observable sequence
	   * @returns {Observable} The source sequence prepended with the specified values.
	   */
	  observableProto.startWith = function () {
	    var values, scheduler, start = 0;
	    if (!!arguments.length && isScheduler(arguments[0])) {
	      scheduler = arguments[0];
	      start = 1;
	    } else {
	      scheduler = immediateScheduler;
	    }
	    for(var args = [], i = start, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	    return enumerableOf([observableFromArray(args, scheduler), this]).concat();
	  };

	  var TakeLastObserver = (function (__super__) {
	    inherits(TakeLastObserver, __super__);
	    function TakeLastObserver(o, c) {
	      this._o = o;
	      this._c = c;
	      this._q = [];
	      __super__.call(this);
	    }

	    TakeLastObserver.prototype.next = function (x) {
	      this._q.push(x);
	      this._q.length > this._c && this._q.shift();
	    };

	    TakeLastObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    TakeLastObserver.prototype.completed = function () {
	      while (this._q.length > 0) { this._o.onNext(this._q.shift()); }
	      this._o.onCompleted();
	    };

	    return TakeLastObserver;
	  }(AbstractObserver));

	  /**
	   *  Returns a specified number of contiguous elements from the end of an observable sequence.
	   * @description
	   *  This operator accumulates a buffer with a length enough to store elements count elements. Upon completion of
	   *  the source sequence, this buffer is drained on the result sequence. This causes the elements to be delayed.
	   * @param {Number} count Number of elements to take from the end of the source sequence.
	   * @returns {Observable} An observable sequence containing the specified number of elements from the end of the source sequence.
	   */
	  observableProto.takeLast = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(new TakeLastObserver(o, count));
	    }, source);
	  };

	  var TakeLastBufferObserver = (function (__super__) {
	    inherits(TakeLastBufferObserver, __super__);
	    function TakeLastBufferObserver(o, c) {
	      this._o = o;
	      this._c = c;
	      this._q = [];
	      __super__.call(this);
	    }

	    TakeLastBufferObserver.prototype.next = function (x) {
	      this._q.push(x);
	      this._q.length > this._c && this._q.shift();
	    };

	    TakeLastBufferObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    TakeLastBufferObserver.prototype.completed = function () {
	      this._o.onNext(this._q);
	      this._o.onCompleted();
	    };

	    return TakeLastBufferObserver;
	  }(AbstractObserver));

	  /**
	   *  Returns an array with the specified number of contiguous elements from the end of an observable sequence.
	   *
	   * @description
	   *  This operator accumulates a buffer with a length enough to store count elements. Upon completion of the
	   *  source sequence, this buffer is produced on the result sequence.
	   * @param {Number} count Number of elements to take from the end of the source sequence.
	   * @returns {Observable} An observable sequence containing a single array with the specified number of elements from the end of the source sequence.
	   */
	  observableProto.takeLastBuffer = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(new TakeLastBufferObserver(o, count));
	    }, source);
	  };

	  /**
	   *  Projects each element of an observable sequence into zero or more windows which are produced based on element count information.
	   * @param {Number} count Length of each window.
	   * @param {Number} [skip] Number of elements to skip between creation of consecutive windows. If not specified, defaults to the count.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithCount = function (count, skip) {
	    var source = this;
	    +count || (count = 0);
	    Math.abs(count) === Infinity && (count = 0);
	    if (count <= 0) { throw new ArgumentOutOfRangeError(); }
	    skip == null && (skip = count);
	    +skip || (skip = 0);
	    Math.abs(skip) === Infinity && (skip = 0);

	    if (skip <= 0) { throw new ArgumentOutOfRangeError(); }
	    return new AnonymousObservable(function (observer) {
	      var m = new SingleAssignmentDisposable(),
	        refCountDisposable = new RefCountDisposable(m),
	        n = 0,
	        q = [];

	      function createWindow () {
	        var s = new Subject();
	        q.push(s);
	        observer.onNext(addRef(s, refCountDisposable));
	      }

	      createWindow();

	      m.setDisposable(source.subscribe(
	        function (x) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
	          var c = n - count + 1;
	          c >= 0 && c % skip === 0 && q.shift().onCompleted();
	          ++n % skip === 0 && createWindow();
	        },
	        function (e) {
	          while (q.length > 0) { q.shift().onError(e); }
	          observer.onError(e);
	        },
	        function () {
	          while (q.length > 0) { q.shift().onCompleted(); }
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };

	  function concatMap(source, selector, thisArg) {
	    var selectorFunc = bindCallback(selector, thisArg, 3);
	    return source.map(function (x, i) {
	      var result = selectorFunc(x, i, source);
	      isPromise(result) && (result = observableFromPromise(result));
	      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
	      return result;
	    }).concatAll();
	  }

	  /**
	   *  One of the Following:
	   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   * @example
	   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); });
	   *  Or:
	   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
	   *
	   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
	   *  Or:
	   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   *  var res = source.concatMap(Rx.Observable.fromArray([1,2,3]));
	   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the
	   * source sequence onto which could be either an observable or Promise.
	   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
	   */
	  observableProto.selectConcat = observableProto.concatMap = function (selector, resultSelector, thisArg) {
	    if (isFunction(selector) && isFunction(resultSelector)) {
	      return this.concatMap(function (x, i) {
	        var selectorResult = selector(x, i);
	        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
	        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

	        return selectorResult.map(function (y, i2) {
	          return resultSelector(x, y, i, i2);
	        });
	      });
	    }
	    return isFunction(selector) ?
	      concatMap(this, selector, thisArg) :
	      concatMap(this, function () { return selector; });
	  };

	  /**
	   * Projects each notification of an observable sequence to an observable sequence and concats the resulting observable sequences into one observable sequence.
	   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
	   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
	   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
	   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
	   */
	  observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
	    var source = this,
	        onNextFunc = bindCallback(onNext, thisArg, 2),
	        onErrorFunc = bindCallback(onError, thisArg, 1),
	        onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
	    return new AnonymousObservable(function (observer) {
	      var index = 0;
	      return source.subscribe(
	        function (x) {
	          var result;
	          try {
	            result = onNextFunc(x, index++);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	        },
	        function (err) {
	          var result;
	          try {
	            result = onErrorFunc(err);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        },
	        function () {
	          var result;
	          try {
	            result = onCompletedFunc();
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        });
	    }, this).concatAll();
	  };

	  var DefaultIfEmptyObserver = (function (__super__) {
	    inherits(DefaultIfEmptyObserver, __super__);
	    function DefaultIfEmptyObserver(o, d) {
	      this._o = o;
	      this._d = d;
	      this._f = false;
	      __super__.call(this);
	    }

	    DefaultIfEmptyObserver.prototype.next = function (x) {
	      this._f = true;
	      this._o.onNext(x);
	    };

	    DefaultIfEmptyObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    DefaultIfEmptyObserver.prototype.completed = function () {
	      !this._f && this._o.onNext(this._d);
	      this._o.onCompleted();
	    };

	    return DefaultIfEmptyObserver;
	  }(AbstractObserver));

	  /**
	   *  Returns the elements of the specified sequence or the specified value in a singleton sequence if the sequence is empty.
	   *
	   *  var res = obs = xs.defaultIfEmpty();
	   *  2 - obs = xs.defaultIfEmpty(false);
	   *
	   * @memberOf Observable#
	   * @param defaultValue The value to return if the sequence is empty. If not provided, this defaults to null.
	   * @returns {Observable} An observable sequence that contains the specified default value if the source is empty; otherwise, the elements of the source itself.
	   */
	    observableProto.defaultIfEmpty = function (defaultValue) {
	      var source = this;
	      defaultValue === undefined && (defaultValue = null);
	      return new AnonymousObservable(function (o) {
	        return source.subscribe(new DefaultIfEmptyObserver(o, defaultValue));
	      }, source);
	    };

	  // Swap out for Array.findIndex
	  function arrayIndexOfComparer(array, item, comparer) {
	    for (var i = 0, len = array.length; i < len; i++) {
	      if (comparer(array[i], item)) { return i; }
	    }
	    return -1;
	  }

	  function HashSet(comparer) {
	    this.comparer = comparer;
	    this.set = [];
	  }
	  HashSet.prototype.push = function(value) {
	    var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
	    retValue && this.set.push(value);
	    return retValue;
	  };

	  var DistinctObservable = (function (__super__) {
	    inherits(DistinctObservable, __super__);
	    function DistinctObservable(source, keyFn, cmpFn) {
	      this.source = source;
	      this._keyFn = keyFn;
	      this._cmpFn = cmpFn;
	      __super__.call(this);
	    }

	    DistinctObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new DistinctObserver(o, this._keyFn, this._cmpFn));
	    };

	    return DistinctObservable;
	  }(ObservableBase));

	  var DistinctObserver = (function (__super__) {
	    inherits(DistinctObserver, __super__);
	    function DistinctObserver(o, keyFn, cmpFn) {
	      this._o = o;
	      this._keyFn = keyFn;
	      this._h = new HashSet(cmpFn);
	      __super__.call(this);
	    }

	    DistinctObserver.prototype.next = function (x) {
	      var key = x;
	      if (isFunction(this._keyFn)) {
	        key = tryCatch(this._keyFn)(x);
	        if (key === errorObj) { return this._o.onError(key.e); }
	      }
	      this._h.push(key) && this._o.onNext(x);
	    };

	    DistinctObserver.prototype.error = function (e) { this._o.onError(e); };
	    DistinctObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return DistinctObserver;
	  }(AbstractObserver));

	  /**
	   *  Returns an observable sequence that contains only distinct elements according to the keySelector and the comparer.
	   *  Usage of this operator should be considered carefully due to the maintenance of an internal lookup structure which can grow large.
	   *
	   * @example
	   *  var res = obs = xs.distinct();
	   *  2 - obs = xs.distinct(function (x) { return x.id; });
	   *  2 - obs = xs.distinct(function (x) { return x.id; }, function (a,b) { return a === b; });
	   * @param {Function} [keySelector]  A function to compute the comparison key for each element.
	   * @param {Function} [comparer]  Used to compare items in the collection.
	   * @returns {Observable} An observable sequence only containing the distinct elements, based on a computed key value, from the source sequence.
	   */
	  observableProto.distinct = function (keySelector, comparer) {
	    comparer || (comparer = defaultComparer);
	    return new DistinctObservable(this, keySelector, comparer);
	  };

	  /**
	   *  Groups the elements of an observable sequence according to a specified key selector function and comparer and selects the resulting elements by using a specified function.
	   *
	   * @example
	   *  var res = observable.groupBy(function (x) { return x.id; });
	   *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; });
	   *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; }, function (x) { return x.toString(); });
	   * @param {Function} keySelector A function to extract the key for each element.
	   * @param {Function} [elementSelector]  A function to map each source element to an element in an observable group.
	   * @returns {Observable} A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
	   */
	  observableProto.groupBy = function (keySelector, elementSelector) {
	    return this.groupByUntil(keySelector, elementSelector, observableNever);
	  };

	    /**
	     *  Groups the elements of an observable sequence according to a specified key selector function.
	     *  A duration selector function is used to control the lifetime of groups. When a group expires, it receives an OnCompleted notification. When a new element with the same
	     *  key value as a reclaimed group occurs, the group will be reborn with a new lifetime request.
	     *
	     * @example
	     *  var res = observable.groupByUntil(function (x) { return x.id; }, null,  function () { return Rx.Observable.never(); });
	     *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); });
	     *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); }, function (x) { return x.toString(); });
	     * @param {Function} keySelector A function to extract the key for each element.
	     * @param {Function} durationSelector A function to signal the expiration of a group.
	     * @returns {Observable}
	     *  A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
	     *  If a group's lifetime expires, a new group with the same key value can be created once an element with such a key value is encoutered.
	     *
	     */
	    observableProto.groupByUntil = function (keySelector, elementSelector, durationSelector) {
	      var source = this;
	      return new AnonymousObservable(function (o) {
	        var map = new Map(),
	          groupDisposable = new CompositeDisposable(),
	          refCountDisposable = new RefCountDisposable(groupDisposable),
	          handleError = function (e) { return function (item) { item.onError(e); }; };

	        groupDisposable.add(
	          source.subscribe(function (x) {
	            var key = tryCatch(keySelector)(x);
	            if (key === errorObj) {
	              map.forEach(handleError(key.e));
	              return o.onError(key.e);
	            }

	            var fireNewMapEntry = false, writer = map.get(key);
	            if (writer === undefined) {
	              writer = new Subject();
	              map.set(key, writer);
	              fireNewMapEntry = true;
	            }

	            if (fireNewMapEntry) {
	              var group = new GroupedObservable(key, writer, refCountDisposable),
	                durationGroup = new GroupedObservable(key, writer);
	              var duration = tryCatch(durationSelector)(durationGroup);
	              if (duration === errorObj) {
	                map.forEach(handleError(duration.e));
	                return o.onError(duration.e);
	              }

	              o.onNext(group);

	              var md = new SingleAssignmentDisposable();
	              groupDisposable.add(md);

	              md.setDisposable(duration.take(1).subscribe(
	                noop,
	                function (e) {
	                  map.forEach(handleError(e));
	                  o.onError(e);
	                },
	                function () {
	                  if (map['delete'](key)) { writer.onCompleted(); }
	                  groupDisposable.remove(md);
	                }));
	            }

	            var element = x;
	            if (isFunction(elementSelector)) {
	              element = tryCatch(elementSelector)(x);
	              if (element === errorObj) {
	                map.forEach(handleError(element.e));
	                return o.onError(element.e);
	              }
	            }

	            writer.onNext(element);
	        }, function (e) {
	          map.forEach(handleError(e));
	          o.onError(e);
	        }, function () {
	          map.forEach(function (item) { item.onCompleted(); });
	          o.onCompleted();
	        }));

	      return refCountDisposable;
	    }, source);
	  };

	  var MapObservable = (function (__super__) {
	    inherits(MapObservable, __super__);

	    function MapObservable(source, selector, thisArg) {
	      this.source = source;
	      this.selector = bindCallback(selector, thisArg, 3);
	      __super__.call(this);
	    }

	    function innerMap(selector, self) {
	      return function (x, i, o) { return selector.call(this, self.selector(x, i, o), i, o); };
	    }

	    MapObservable.prototype.internalMap = function (selector, thisArg) {
	      return new MapObservable(this.source, innerMap(selector, this), thisArg);
	    };

	    MapObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.selector, this));
	    };

	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(o, selector, source) {
	      this.o = o;
	      this.selector = selector;
	      this.source = source;
	      this.i = 0;
	      AbstractObserver.call(this);
	    }

	    InnerObserver.prototype.next = function(x) {
	      var result = tryCatch(this.selector)(x, this.i++, this.source);
	      if (result === errorObj) { return this.o.onError(result.e); }
	      this.o.onNext(result);
	    };

	    InnerObserver.prototype.error = function (e) {
	      this.o.onError(e);
	    };

	    InnerObserver.prototype.completed = function () {
	      this.o.onCompleted();
	    };

	    return MapObservable;

	  }(ObservableBase));

	  /**
	  * Projects each element of an observable sequence into a new form by incorporating the element's index.
	  * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source.
	  */
	  observableProto.map = observableProto.select = function (selector, thisArg) {
	    var selectorFn = typeof selector === 'function' ? selector : function () { return selector; };
	    return this instanceof MapObservable ?
	      this.internalMap(selectorFn, thisArg) :
	      new MapObservable(this, selectorFn, thisArg);
	  };

	  function plucker(args, len) {
	    return function mapper(x) {
	      var currentProp = x;
	      for (var i = 0; i < len; i++) {
	        var p = currentProp[args[i]];
	        if (typeof p !== 'undefined') {
	          currentProp = p;
	        } else {
	          return undefined;
	        }
	      }
	      return currentProp;
	    }
	  }

	  /**
	   * Retrieves the value of a specified nested property from all elements in
	   * the Observable sequence.
	   * @param {Arguments} arguments The nested properties to pluck.
	   * @returns {Observable} Returns a new Observable sequence of property values.
	   */
	  observableProto.pluck = function () {
	    var len = arguments.length, args = new Array(len);
	    if (len === 0) { throw new Error('List of properties cannot be empty.'); }
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return this.map(plucker(args, len));
	  };

	observableProto.flatMap = observableProto.selectMany = function(selector, resultSelector, thisArg) {
	    return new FlatMapObservable(this, selector, resultSelector, thisArg).mergeAll();
	};

	  /**
	   * Projects each notification of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
	   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
	   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
	   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
	   */
	  observableProto.flatMapObserver = observableProto.selectManyObserver = function (onNext, onError, onCompleted, thisArg) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var index = 0;

	      return source.subscribe(
	        function (x) {
	          var result;
	          try {
	            result = onNext.call(thisArg, x, index++);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	        },
	        function (err) {
	          var result;
	          try {
	            result = onError.call(thisArg, err);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        },
	        function () {
	          var result;
	          try {
	            result = onCompleted.call(thisArg);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        });
	    }, source).mergeAll();
	  };

	Rx.Observable.prototype.flatMapLatest = function(selector, resultSelector, thisArg) {
	    return new FlatMapObservable(this, selector, resultSelector, thisArg).switchLatest();
	};
	  var SkipObservable = (function(__super__) {
	    inherits(SkipObservable, __super__);
	    function SkipObservable(source, count) {
	      this.source = source;
	      this._count = count;
	      __super__.call(this);
	    }

	    SkipObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SkipObserver(o, this._count));
	    };

	    function SkipObserver(o, c) {
	      this._o = o;
	      this._r = c;
	      AbstractObserver.call(this);
	    }

	    inherits(SkipObserver, AbstractObserver);

	    SkipObserver.prototype.next = function (x) {
	      if (this._r <= 0) {
	        this._o.onNext(x);
	      } else {
	        this._r--;
	      }
	    };
	    SkipObserver.prototype.error = function(e) { this._o.onError(e); };
	    SkipObserver.prototype.completed = function() { this._o.onCompleted(); };

	    return SkipObservable;
	  }(ObservableBase));

	  /**
	   * Bypasses a specified number of elements in an observable sequence and then returns the remaining elements.
	   * @param {Number} count The number of elements to skip before returning the remaining elements.
	   * @returns {Observable} An observable sequence that contains the elements that occur after the specified index in the input sequence.
	   */
	  observableProto.skip = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    return new SkipObservable(this, count);
	  };

	  var SkipWhileObservable = (function (__super__) {
	    inherits(SkipWhileObservable, __super__);
	    function SkipWhileObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    SkipWhileObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SkipWhileObserver(o, this));
	    };

	    return SkipWhileObservable;
	  }(ObservableBase));

	  var SkipWhileObserver = (function (__super__) {
	    inherits(SkipWhileObserver, __super__);

	    function SkipWhileObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      this._i = 0;
	      this._r = false;
	      __super__.call(this);
	    }

	    SkipWhileObserver.prototype.next = function (x) {
	      if (!this._r) {
	        var res = tryCatch(this._p._fn)(x, this._i++, this._p);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        this._r = !res;
	      }
	      this._r && this._o.onNext(x);
	    };
	    SkipWhileObserver.prototype.error = function (e) { this._o.onError(e); };
	    SkipWhileObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return SkipWhileObserver;
	  }(AbstractObserver));

	  /**
	   *  Bypasses elements in an observable sequence as long as a specified condition is true and then returns the remaining elements.
	   *  The element's index is used in the logic of the predicate function.
	   *
	   *  var res = source.skipWhile(function (value) { return value < 10; });
	   *  var res = source.skipWhile(function (value, index) { return value < 10 || index < 10; });
	   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
	   */
	  observableProto.skipWhile = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new SkipWhileObservable(this, fn);
	  };

	  var TakeObservable = (function(__super__) {
	    inherits(TakeObservable, __super__);
	    function TakeObservable(source, count) {
	      this.source = source;
	      this._count = count;
	      __super__.call(this);
	    }

	    TakeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TakeObserver(o, this._count));
	    };

	    function TakeObserver(o, c) {
	      this._o = o;
	      this._c = c;
	      this._r = c;
	      AbstractObserver.call(this);
	    }

	    inherits(TakeObserver, AbstractObserver);

	    TakeObserver.prototype.next = function (x) {
	      if (this._r-- > 0) {
	        this._o.onNext(x);
	        this._r <= 0 && this._o.onCompleted();
	      }
	    };

	    TakeObserver.prototype.error = function (e) { this._o.onError(e); };
	    TakeObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return TakeObservable;
	  }(ObservableBase));

	  /**
	   *  Returns a specified number of contiguous elements from the start of an observable sequence, using the specified scheduler for the edge case of take(0).
	   * @param {Number} count The number of elements to return.
	   * @param {Scheduler} [scheduler] Scheduler used to produce an OnCompleted message in case <paramref name="count count</paramref> is set to 0.
	   * @returns {Observable} An observable sequence that contains the specified number of elements from the start of the input sequence.
	   */
	  observableProto.take = function (count, scheduler) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    if (count === 0) { return observableEmpty(scheduler); }
	    return new TakeObservable(this, count);
	  };

	  var TakeWhileObservable = (function (__super__) {
	    inherits(TakeWhileObservable, __super__);
	    function TakeWhileObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    TakeWhileObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TakeWhileObserver(o, this));
	    };

	    return TakeWhileObservable;
	  }(ObservableBase));

	  var TakeWhileObserver = (function (__super__) {
	    inherits(TakeWhileObserver, __super__);

	    function TakeWhileObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      this._i = 0;
	      this._r = true;
	      __super__.call(this);
	    }

	    TakeWhileObserver.prototype.next = function (x) {
	      if (this._r) {
	        this._r = tryCatch(this._p._fn)(x, this._i++, this._p);
	        if (this._r === errorObj) { return this._o.onError(this._r.e); }
	      }
	      if (this._r) {
	        this._o.onNext(x);
	      } else {
	        this._o.onCompleted();
	      }
	    };
	    TakeWhileObserver.prototype.error = function (e) { this._o.onError(e); };
	    TakeWhileObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return TakeWhileObserver;
	  }(AbstractObserver));

	  /**
	   *  Returns elements from an observable sequence as long as a specified condition is true.
	   *  The element's index is used in the logic of the predicate function.
	   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.
	   */
	  observableProto.takeWhile = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new TakeWhileObservable(this, fn);
	  };

	  var FilterObservable = (function (__super__) {
	    inherits(FilterObservable, __super__);

	    function FilterObservable(source, predicate, thisArg) {
	      this.source = source;
	      this.predicate = bindCallback(predicate, thisArg, 3);
	      __super__.call(this);
	    }

	    FilterObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.predicate, this));
	    };

	    function innerPredicate(predicate, self) {
	      return function(x, i, o) { return self.predicate(x, i, o) && predicate.call(this, x, i, o); }
	    }

	    FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
	      return new FilterObservable(this.source, innerPredicate(predicate, this), thisArg);
	    };

	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(o, predicate, source) {
	      this.o = o;
	      this.predicate = predicate;
	      this.source = source;
	      this.i = 0;
	      AbstractObserver.call(this);
	    }

	    InnerObserver.prototype.next = function(x) {
	      var shouldYield = tryCatch(this.predicate)(x, this.i++, this.source);
	      if (shouldYield === errorObj) {
	        return this.o.onError(shouldYield.e);
	      }
	      shouldYield && this.o.onNext(x);
	    };

	    InnerObserver.prototype.error = function (e) {
	      this.o.onError(e);
	    };

	    InnerObserver.prototype.completed = function () {
	      this.o.onCompleted();
	    };

	    return FilterObservable;

	  }(ObservableBase));

	  /**
	  *  Filters the elements of an observable sequence based on a predicate by incorporating the element's index.
	  * @param {Function} predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} An observable sequence that contains elements from the input sequence that satisfy the condition.
	  */
	  observableProto.filter = observableProto.where = function (predicate, thisArg) {
	    return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) :
	      new FilterObservable(this, predicate, thisArg);
	  };

	  var ExtremaByObservable = (function (__super__) {
	    inherits(ExtremaByObservable, __super__);
	    function ExtremaByObservable(source, k, c) {
	      this.source = source;
	      this._k = k;
	      this._c = c;
	      __super__.call(this);
	    }

	    ExtremaByObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new ExtremaByObserver(o, this._k, this._c));
	    };

	    return ExtremaByObservable;
	  }(ObservableBase));

	  var ExtremaByObserver = (function (__super__) {
	    inherits(ExtremaByObserver, __super__);
	    function ExtremaByObserver(o, k, c) {
	      this._o = o;
	      this._k = k;
	      this._c = c;
	      this._v = null;
	      this._hv = false;
	      this._l = [];
	      __super__.call(this);
	    }

	    ExtremaByObserver.prototype.next = function (x) {
	      var key = tryCatch(this._k)(x);
	      if (key === errorObj) { return this._o.onError(key.e); }
	      var comparison = 0;
	      if (!this._hv) {
	        this._hv = true;
	        this._v = key;
	      } else {
	        comparison = tryCatch(this._c)(key, this._v);
	        if (comparison === errorObj) { return this._o.onError(comparison.e); }
	      }
	      if (comparison > 0) {
	        this._v = key;
	        this._l = [];
	      }
	      if (comparison >= 0) { this._l.push(x); }
	    };

	    ExtremaByObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    ExtremaByObserver.prototype.completed = function () {
	      this._o.onNext(this._l);
	      this._o.onCompleted();
	    };

	    return ExtremaByObserver;
	  }(AbstractObserver));

	  function firstOnly(x) {
	    if (x.length === 0) { throw new EmptyError(); }
	    return x[0];
	  }

	  var ReduceObservable = (function(__super__) {
	    inherits(ReduceObservable, __super__);
	    function ReduceObservable(source, accumulator, hasSeed, seed) {
	      this.source = source;
	      this.accumulator = accumulator;
	      this.hasSeed = hasSeed;
	      this.seed = seed;
	      __super__.call(this);
	    }

	    ReduceObservable.prototype.subscribeCore = function(observer) {
	      return this.source.subscribe(new ReduceObserver(observer,this));
	    };

	    return ReduceObservable;
	  }(ObservableBase));

	  var ReduceObserver = (function (__super__) {
	    inherits(ReduceObserver, __super__);
	    function ReduceObserver(o, parent) {
	      this._o = o;
	      this._p = parent;
	      this._fn = parent.accumulator;
	      this._hs = parent.hasSeed;
	      this._s = parent.seed;
	      this._ha = false;
	      this._a = null;
	      this._hv = false;
	      this._i = 0;
	      __super__.call(this);
	    }

	    ReduceObserver.prototype.next = function (x) {
	      !this._hv && (this._hv = true);
	      if (this._ha) {
	        this._a = tryCatch(this._fn)(this._a, x, this._i, this._p);
	      } else {
	        this._a = this._hs ? tryCatch(this._fn)(this._s, x, this._i, this._p) : x;
	        this._ha = true;
	      }
	      if (this._a === errorObj) { return this._o.onError(this._a.e); }
	      this._i++;
	    };

	    ReduceObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    ReduceObserver.prototype.completed = function () {
	      this._hv && this._o.onNext(this._a);
	      !this._hv && this._hs && this._o.onNext(this._s);
	      !this._hv && !this._hs && this._o.onError(new EmptyError());
	      this._o.onCompleted();
	    };

	    return ReduceObserver;
	  }(AbstractObserver));

	  /**
	  * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
	  * For aggregation behavior with incremental intermediate results, see Observable.scan.
	  * @param {Function} accumulator An accumulator function to be invoked on each element.
	  * @param {Any} [seed] The initial accumulator value.
	  * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
	  */
	  observableProto.reduce = function () {
	    var hasSeed = false, seed, accumulator = arguments[0];
	    if (arguments.length === 2) {
	      hasSeed = true;
	      seed = arguments[1];
	    }
	    return new ReduceObservable(this, accumulator, hasSeed, seed);
	  };

	  var SomeObservable = (function (__super__) {
	    inherits(SomeObservable, __super__);
	    function SomeObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    SomeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SomeObserver(o, this._fn, this.source));
	    };

	    return SomeObservable;
	  }(ObservableBase));

	  var SomeObserver = (function (__super__) {
	    inherits(SomeObserver, __super__);

	    function SomeObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._i = 0;
	      __super__.call(this);
	    }

	    SomeObserver.prototype.next = function (x) {
	      var result = tryCatch(this._fn)(x, this._i++, this._s);
	      if (result === errorObj) { return this._o.onError(result.e); }
	      if (Boolean(result)) {
	        this._o.onNext(true);
	        this._o.onCompleted();
	      }
	    };
	    SomeObserver.prototype.error = function (e) { this._o.onError(e); };
	    SomeObserver.prototype.completed = function () {
	      this._o.onNext(false);
	      this._o.onCompleted();
	    };

	    return SomeObserver;
	  }(AbstractObserver));

	  /**
	   * Determines whether any element of an observable sequence satisfies a condition if present, else if any items are in the sequence.
	   * @param {Function} [predicate] A function to test each element for a condition.
	   * @returns {Observable} An observable sequence containing a single element determining whether any elements in the source sequence pass the test in the specified predicate if given, else if any items are in the sequence.
	   */
	  observableProto.some = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new SomeObservable(this, fn);
	  };

	  var IsEmptyObservable = (function (__super__) {
	    inherits(IsEmptyObservable, __super__);
	    function IsEmptyObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    IsEmptyObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new IsEmptyObserver(o));
	    };

	    return IsEmptyObservable;
	  }(ObservableBase));

	  var IsEmptyObserver = (function(__super__) {
	    inherits(IsEmptyObserver, __super__);
	    function IsEmptyObserver(o) {
	      this._o = o;
	      __super__.call(this);
	    }

	    IsEmptyObserver.prototype.next = function () {
	      this._o.onNext(false);
	      this._o.onCompleted();
	    };
	    IsEmptyObserver.prototype.error = function (e) { this._o.onError(e); };
	    IsEmptyObserver.prototype.completed = function () {
	      this._o.onNext(true);
	      this._o.onCompleted();
	    };

	    return IsEmptyObserver;
	  }(AbstractObserver));

	  /**
	   * Determines whether an observable sequence is empty.
	   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence is empty.
	   */
	  observableProto.isEmpty = function () {
	    return new IsEmptyObservable(this);
	  };

	  var EveryObservable = (function (__super__) {
	    inherits(EveryObservable, __super__);
	    function EveryObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    EveryObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new EveryObserver(o, this._fn, this.source));
	    };

	    return EveryObservable;
	  }(ObservableBase));

	  var EveryObserver = (function (__super__) {
	    inherits(EveryObserver, __super__);

	    function EveryObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._i = 0;
	      __super__.call(this);
	    }

	    EveryObserver.prototype.next = function (x) {
	      var result = tryCatch(this._fn)(x, this._i++, this._s);
	      if (result === errorObj) { return this._o.onError(result.e); }
	      if (!Boolean(result)) {
	        this._o.onNext(false);
	        this._o.onCompleted();
	      }
	    };
	    EveryObserver.prototype.error = function (e) { this._o.onError(e); };
	    EveryObserver.prototype.completed = function () {
	      this._o.onNext(true);
	      this._o.onCompleted();
	    };

	    return EveryObserver;
	  }(AbstractObserver));

	  /**
	   * Determines whether all elements of an observable sequence satisfy a condition.
	   * @param {Function} [predicate] A function to test each element for a condition.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element determining whether all elements in the source sequence pass the test in the specified predicate.
	   */
	  observableProto.every = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new EveryObservable(this, fn);
	  };

	  var IncludesObservable = (function (__super__) {
	    inherits(IncludesObservable, __super__);
	    function IncludesObservable(source, elem, idx) {
	      var n = +idx || 0;
	      Math.abs(n) === Infinity && (n = 0);

	      this.source = source;
	      this._elem = elem;
	      this._n = n;
	      __super__.call(this);
	    }

	    IncludesObservable.prototype.subscribeCore = function (o) {
	      if (this._n < 0) {
	        o.onNext(false);
	        o.onCompleted();
	        return disposableEmpty;
	      }

	      return this.source.subscribe(new IncludesObserver(o, this._elem, this._n));
	    };

	    return IncludesObservable;
	  }(ObservableBase));

	  var IncludesObserver = (function (__super__) {
	    inherits(IncludesObserver, __super__);
	    function IncludesObserver(o, elem, n) {
	      this._o = o;
	      this._elem = elem;
	      this._n = n;
	      this._i = 0;
	      __super__.call(this);
	    }

	    function comparer(a, b) {
	      return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
	    }

	    IncludesObserver.prototype.next = function (x) {
	      if (this._i++ >= this._n && comparer(x, this._elem)) {
	        this._o.onNext(true);
	        this._o.onCompleted();
	      }
	    };
	    IncludesObserver.prototype.error = function (e) { this._o.onError(e); };
	    IncludesObserver.prototype.completed = function () { this._o.onNext(false); this._o.onCompleted(); };

	    return IncludesObserver;
	  }(AbstractObserver));

	  /**
	   * Determines whether an observable sequence includes a specified element with an optional equality comparer.
	   * @param searchElement The value to locate in the source sequence.
	   * @param {Number} [fromIndex] An equality comparer to compare elements.
	   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence includes an element that has the specified value from the given index.
	   */
	  observableProto.includes = function (searchElement, fromIndex) {
	    return new IncludesObservable(this, searchElement, fromIndex);
	  };

	  var CountObservable = (function (__super__) {
	    inherits(CountObservable, __super__);
	    function CountObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    CountObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new CountObserver(o, this._fn, this.source));
	    };

	    return CountObservable;
	  }(ObservableBase));

	  var CountObserver = (function (__super__) {
	    inherits(CountObserver, __super__);

	    function CountObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._i = 0;
	      this._c = 0;
	      __super__.call(this);
	    }

	    CountObserver.prototype.next = function (x) {
	      if (this._fn) {
	        var result = tryCatch(this._fn)(x, this._i++, this._s);
	        if (result === errorObj) { return this._o.onError(result.e); }
	        Boolean(result) && (this._c++);
	      } else {
	        this._c++;
	      }
	    };
	    CountObserver.prototype.error = function (e) { this._o.onError(e); };
	    CountObserver.prototype.completed = function () {
	      this._o.onNext(this._c);
	      this._o.onCompleted();
	    };

	    return CountObserver;
	  }(AbstractObserver));

	  /**
	   * Returns an observable sequence containing a value that represents how many elements in the specified observable sequence satisfy a condition if provided, else the count of items.
	   * @example
	   * res = source.count();
	   * res = source.count(function (x) { return x > 3; });
	   * @param {Function} [predicate]A function to test each element for a condition.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with a number that represents how many elements in the input sequence satisfy the condition in the predicate function if provided, else the count of items in the sequence.
	   */
	  observableProto.count = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new CountObservable(this, fn);
	  };

	  var IndexOfObservable = (function (__super__) {
	    inherits(IndexOfObservable, __super__);
	    function IndexOfObservable(source, e, n) {
	      this.source = source;
	      this._e = e;
	      this._n = n;
	      __super__.call(this);
	    }

	    IndexOfObservable.prototype.subscribeCore = function (o) {
	      if (this._n < 0) {
	        o.onNext(-1);
	        o.onCompleted();
	        return disposableEmpty;
	      }

	      return this.source.subscribe(new IndexOfObserver(o, this._e, this._n));
	    };

	    return IndexOfObservable;
	  }(ObservableBase));

	  var IndexOfObserver = (function (__super__) {
	    inherits(IndexOfObserver, __super__);
	    function IndexOfObserver(o, e, n) {
	      this._o = o;
	      this._e = e;
	      this._n = n;
	      this._i = 0;
	      __super__.call(this);
	    }

	    IndexOfObserver.prototype.next = function (x) {
	      if (this._i >= this._n && x === this._e) {
	        this._o.onNext(this._i);
	        this._o.onCompleted();
	      }
	      this._i++;
	    };
	    IndexOfObserver.prototype.error = function (e) { this._o.onError(e); };
	    IndexOfObserver.prototype.completed = function () { this._o.onNext(-1); this._o.onCompleted(); };

	    return IndexOfObserver;
	  }(AbstractObserver));

	  /**
	   * Returns the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   * @param {Any} searchElement Element to locate in the array.
	   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
	   * @returns {Observable} And observable sequence containing the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   */
	  observableProto.indexOf = function(searchElement, fromIndex) {
	    var n = +fromIndex || 0;
	    Math.abs(n) === Infinity && (n = 0);
	    return new IndexOfObservable(this, searchElement, n);
	  };

	  var SumObservable = (function (__super__) {
	    inherits(SumObservable, __super__);
	    function SumObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    SumObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SumObserver(o, this._fn, this.source));
	    };

	    return SumObservable;
	  }(ObservableBase));

	  var SumObserver = (function (__super__) {
	    inherits(SumObserver, __super__);

	    function SumObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._i = 0;
	      this._c = 0;
	      __super__.call(this);
	    }

	    SumObserver.prototype.next = function (x) {
	      if (this._fn) {
	        var result = tryCatch(this._fn)(x, this._i++, this._s);
	        if (result === errorObj) { return this._o.onError(result.e); }
	        this._c += result;
	      } else {
	        this._c += x;
	      }
	    };
	    SumObserver.prototype.error = function (e) { this._o.onError(e); };
	    SumObserver.prototype.completed = function () {
	      this._o.onNext(this._c);
	      this._o.onCompleted();
	    };

	    return SumObserver;
	  }(AbstractObserver));

	  /**
	   * Computes the sum of a sequence of values that are obtained by invoking an optional transform function on each element of the input sequence, else if not specified computes the sum on each item in the sequence.
	   * @param {Function} [selector] A transform function to apply to each element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with the sum of the values in the source sequence.
	   */
	  observableProto.sum = function (keySelector, thisArg) {
	    var fn = bindCallback(keySelector, thisArg, 3);
	    return new SumObservable(this, fn);
	  };

	  /**
	   * Returns the elements in an observable sequence with the minimum key value according to the specified comparer.
	   * @example
	   * var res = source.minBy(function (x) { return x.value; });
	   * var res = source.minBy(function (x) { return x.value; }, function (x, y) { return x - y; });
	   * @param {Function} keySelector Key selector function.
	   * @param {Function} [comparer] Comparer used to compare key values.
	   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a minimum key value.
	   */
	  observableProto.minBy = function (keySelector, comparer) {
	    comparer || (comparer = defaultSubComparer);
	    return new ExtremaByObservable(this, keySelector, function (x, y) { return comparer(x, y) * -1; });
	  };

	  /**
	   * Returns the minimum element in an observable sequence according to the optional comparer else a default greater than less than check.
	   * @example
	   * var res = source.min();
	   * var res = source.min(function (x, y) { return x.value - y.value; });
	   * @param {Function} [comparer] Comparer used to compare elements.
	   * @returns {Observable} An observable sequence containing a single element with the minimum element in the source sequence.
	   */
	  observableProto.min = function (comparer) {
	    return this.minBy(identity, comparer).map(function (x) { return firstOnly(x); });
	  };

	  /**
	   * Returns the elements in an observable sequence with the maximum  key value according to the specified comparer.
	   * @example
	   * var res = source.maxBy(function (x) { return x.value; });
	   * var res = source.maxBy(function (x) { return x.value; }, function (x, y) { return x - y;; });
	   * @param {Function} keySelector Key selector function.
	   * @param {Function} [comparer]  Comparer used to compare key values.
	   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a maximum key value.
	   */
	  observableProto.maxBy = function (keySelector, comparer) {
	    comparer || (comparer = defaultSubComparer);
	    return new ExtremaByObservable(this, keySelector, comparer);
	  };

	  /**
	   * Returns the maximum value in an observable sequence according to the specified comparer.
	   * @example
	   * var res = source.max();
	   * var res = source.max(function (x, y) { return x.value - y.value; });
	   * @param {Function} [comparer] Comparer used to compare elements.
	   * @returns {Observable} An observable sequence containing a single element with the maximum element in the source sequence.
	   */
	  observableProto.max = function (comparer) {
	    return this.maxBy(identity, comparer).map(function (x) { return firstOnly(x); });
	  };

	  var AverageObservable = (function (__super__) {
	    inherits(AverageObservable, __super__);
	    function AverageObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    AverageObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new AverageObserver(o, this._fn, this.source));
	    };

	    return AverageObservable;
	  }(ObservableBase));

	  var AverageObserver = (function(__super__) {
	    inherits(AverageObserver, __super__);
	    function AverageObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._c = 0;
	      this._t = 0;
	      __super__.call(this);
	    }

	    AverageObserver.prototype.next = function (x) {
	      if(this._fn) {
	        var r = tryCatch(this._fn)(x, this._c++, this._s);
	        if (r === errorObj) { return this._o.onError(r.e); }
	        this._t += r;
	      } else {
	        this._c++;
	        this._t += x;
	      }
	    };
	    AverageObserver.prototype.error = function (e) { this._o.onError(e); };
	    AverageObserver.prototype.completed = function () {
	      if (this._c === 0) { return this._o.onError(new EmptyError()); }
	      this._o.onNext(this._t / this._c);
	      this._o.onCompleted();
	    };

	    return AverageObserver;
	  }(AbstractObserver));

	  /**
	   * Computes the average of an observable sequence of values that are in the sequence or obtained by invoking a transform function on each element of the input sequence if present.
	   * @param {Function} [selector] A transform function to apply to each element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with the average of the sequence of values.
	   */
	  observableProto.average = function (keySelector, thisArg) {
	    var source = this, fn;
	    if (isFunction(keySelector)) {
	      fn = bindCallback(keySelector, thisArg, 3);
	    }
	    return new AverageObservable(source, fn);
	  };

	  /**
	   *  Determines whether two sequences are equal by comparing the elements pairwise using a specified equality comparer.
	   *
	   * @example
	   * var res = res = source.sequenceEqual([1,2,3]);
	   * var res = res = source.sequenceEqual([{ value: 42 }], function (x, y) { return x.value === y.value; });
	   * 3 - res = source.sequenceEqual(Rx.Observable.returnValue(42));
	   * 4 - res = source.sequenceEqual(Rx.Observable.returnValue({ value: 42 }), function (x, y) { return x.value === y.value; });
	   * @param {Observable} second Second observable sequence or array to compare.
	   * @param {Function} [comparer] Comparer used to compare elements of both sequences.
	   * @returns {Observable} An observable sequence that contains a single element which indicates whether both sequences are of equal length and their corresponding elements are equal according to the specified equality comparer.
	   */
	  observableProto.sequenceEqual = function (second, comparer) {
	    var first = this;
	    comparer || (comparer = defaultComparer);
	    return new AnonymousObservable(function (o) {
	      var donel = false, doner = false, ql = [], qr = [];
	      var subscription1 = first.subscribe(function (x) {
	        if (qr.length > 0) {
	          var v = qr.shift();
	          var equal = tryCatch(comparer)(v, x);
	          if (equal === errorObj) { return o.onError(equal.e); }
	          if (!equal) {
	            o.onNext(false);
	            o.onCompleted();
	          }
	        } else if (doner) {
	          o.onNext(false);
	          o.onCompleted();
	        } else {
	          ql.push(x);
	        }
	      }, function(e) { o.onError(e); }, function () {
	        donel = true;
	        if (ql.length === 0) {
	          if (qr.length > 0) {
	            o.onNext(false);
	            o.onCompleted();
	          } else if (doner) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        }
	      });

	      (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
	      isPromise(second) && (second = observableFromPromise(second));
	      var subscription2 = second.subscribe(function (x) {
	        if (ql.length > 0) {
	          var v = ql.shift();
	          var equal = tryCatch(comparer)(v, x);
	          if (equal === errorObj) { return o.onError(equal.e); }
	          if (!equal) {
	            o.onNext(false);
	            o.onCompleted();
	          }
	        } else if (donel) {
	          o.onNext(false);
	          o.onCompleted();
	        } else {
	          qr.push(x);
	        }
	      }, function(e) { o.onError(e); }, function () {
	        doner = true;
	        if (qr.length === 0) {
	          if (ql.length > 0) {
	            o.onNext(false);
	            o.onCompleted();
	          } else if (donel) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        }
	      });
	      return new BinaryDisposable(subscription1, subscription2);
	    }, first);
	  };

	  var ElementAtObservable = (function (__super__) {
	    inherits(ElementAtObservable, __super__);
	    function ElementAtObservable(source, i, d) {
	      this.source = source;
	      this._i = i;
	      this._d = d;
	      __super__.call(this);
	    }

	    ElementAtObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new ElementAtObserver(o, this._i, this._d));
	    };

	    return ElementAtObservable;
	  }(ObservableBase));

	  var ElementAtObserver = (function (__super__) {
	    inherits(ElementAtObserver, __super__);

	    function ElementAtObserver(o, i, d) {
	      this._o = o;
	      this._i = i;
	      this._d = d;
	      __super__.call(this);
	    }

	    ElementAtObserver.prototype.next = function (x) {
	      if (this._i-- === 0) {
	        this._o.onNext(x);
	        this._o.onCompleted();
	      }
	    };
	    ElementAtObserver.prototype.error = function (e) { this._o.onError(e); };
	    ElementAtObserver.prototype.completed = function () {
	      if (this._d === undefined) {
	        this._o.onError(new ArgumentOutOfRangeError());
	      } else {
	        this._o.onNext(this._d);
	        this._o.onCompleted();
	      }
	    };

	    return ElementAtObserver;
	  }(AbstractObserver));

	  /**
	   * Returns the element at a specified index in a sequence or default value if not found.
	   * @param {Number} index The zero-based index of the element to retrieve.
	   * @param {Any} [defaultValue] The default value to use if elementAt does not find a value.
	   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence.
	   */
	  observableProto.elementAt =  function (index, defaultValue) {
	    if (index < 0) { throw new ArgumentOutOfRangeError(); }
	    return new ElementAtObservable(this, index, defaultValue);
	  };

	  var SingleObserver = (function(__super__) {
	    inherits(SingleObserver, __super__);
	    function SingleObserver(o, obj, s) {
	      this._o = o;
	      this._obj = obj;
	      this._s = s;
	      this._i = 0;
	      this._hv = false;
	      this._v = null;
	      __super__.call(this);
	    }

	    SingleObserver.prototype.next = function (x) {
	      var shouldYield = false;
	      if (this._obj.predicate) {
	        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        Boolean(res) && (shouldYield = true);
	      } else if (!this._obj.predicate) {
	        shouldYield = true;
	      }
	      if (shouldYield) {
	        if (this._hv) {
	          return this._o.onError(new Error('Sequence contains more than one matching element'));
	        }
	        this._hv = true;
	        this._v = x;
	      }
	    };
	    SingleObserver.prototype.error = function (e) { this._o.onError(e); };
	    SingleObserver.prototype.completed = function () {
	      if (this._hv) {
	        this._o.onNext(this._v);
	        this._o.onCompleted();
	      }
	      else if (this._obj.defaultValue === undefined) {
	        this._o.onError(new EmptyError());
	      } else {
	        this._o.onNext(this._obj.defaultValue);
	        this._o.onCompleted();
	      }
	    };

	    return SingleObserver;
	  }(AbstractObserver));


	    /**
	     * Returns the only element of an observable sequence that satisfies the condition in the optional predicate, and reports an exception if there is not exactly one element in the observable sequence.
	     * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate.
	     */
	    observableProto.single = function (predicate, thisArg) {
	      var obj = {}, source = this;
	      if (typeof arguments[0] === 'object') {
	        obj = arguments[0];
	      } else {
	        obj = {
	          predicate: arguments[0],
	          thisArg: arguments[1],
	          defaultValue: arguments[2]
	        };
	      }
	      if (isFunction (obj.predicate)) {
	        var fn = obj.predicate;
	        obj.predicate = bindCallback(fn, obj.thisArg, 3);
	      }
	      return new AnonymousObservable(function (o) {
	        return source.subscribe(new SingleObserver(o, obj, source));
	      }, source);
	    };

	  var FirstObservable = (function (__super__) {
	    inherits(FirstObservable, __super__);
	    function FirstObservable(source, obj) {
	      this.source = source;
	      this._obj = obj;
	      __super__.call(this);
	    }

	    FirstObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new FirstObserver(o, this._obj, this.source));
	    };

	    return FirstObservable;
	  }(ObservableBase));

	  var FirstObserver = (function(__super__) {
	    inherits(FirstObserver, __super__);
	    function FirstObserver(o, obj, s) {
	      this._o = o;
	      this._obj = obj;
	      this._s = s;
	      this._i = 0;
	      __super__.call(this);
	    }

	    FirstObserver.prototype.next = function (x) {
	      if (this._obj.predicate) {
	        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        if (Boolean(res)) {
	          this._o.onNext(x);
	          this._o.onCompleted();
	        }
	      } else if (!this._obj.predicate) {
	        this._o.onNext(x);
	        this._o.onCompleted();
	      }
	    };
	    FirstObserver.prototype.error = function (e) { this._o.onError(e); };
	    FirstObserver.prototype.completed = function () {
	      if (this._obj.defaultValue === undefined) {
	        this._o.onError(new EmptyError());
	      } else {
	        this._o.onNext(this._obj.defaultValue);
	        this._o.onCompleted();
	      }
	    };

	    return FirstObserver;
	  }(AbstractObserver));

	  /**
	   * Returns the first element of an observable sequence that satisfies the condition in the predicate if present else the first item in the sequence.
	   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate if provided, else the first item in the sequence.
	   */
	  observableProto.first = function () {
	    var obj = {}, source = this;
	    if (typeof arguments[0] === 'object') {
	      obj = arguments[0];
	    } else {
	      obj = {
	        predicate: arguments[0],
	        thisArg: arguments[1],
	        defaultValue: arguments[2]
	      };
	    }
	    if (isFunction (obj.predicate)) {
	      var fn = obj.predicate;
	      obj.predicate = bindCallback(fn, obj.thisArg, 3);
	    }
	    return new FirstObservable(this, obj);
	  };

	  var LastObservable = (function (__super__) {
	    inherits(LastObservable, __super__);
	    function LastObservable(source, obj) {
	      this.source = source;
	      this._obj = obj;
	      __super__.call(this);
	    }

	    LastObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new LastObserver(o, this._obj, this.source));
	    };

	    return LastObservable;
	  }(ObservableBase));

	  var LastObserver = (function(__super__) {
	    inherits(LastObserver, __super__);
	    function LastObserver(o, obj, s) {
	      this._o = o;
	      this._obj = obj;
	      this._s = s;
	      this._i = 0;
	      this._hv = false;
	      this._v = null;
	      __super__.call(this);
	    }

	    LastObserver.prototype.next = function (x) {
	      var shouldYield = false;
	      if (this._obj.predicate) {
	        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        Boolean(res) && (shouldYield = true);
	      } else if (!this._obj.predicate) {
	        shouldYield = true;
	      }
	      if (shouldYield) {
	        this._hv = true;
	        this._v = x;
	      }
	    };
	    LastObserver.prototype.error = function (e) { this._o.onError(e); };
	    LastObserver.prototype.completed = function () {
	      if (this._hv) {
	        this._o.onNext(this._v);
	        this._o.onCompleted();
	      }
	      else if (this._obj.defaultValue === undefined) {
	        this._o.onError(new EmptyError());
	      } else {
	        this._o.onNext(this._obj.defaultValue);
	        this._o.onCompleted();
	      }
	    };

	    return LastObserver;
	  }(AbstractObserver));

	  /**
	   * Returns the last element of an observable sequence that satisfies the condition in the predicate if specified, else the last element.
	   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate.
	   */
	  observableProto.last = function () {
	    var obj = {}, source = this;
	    if (typeof arguments[0] === 'object') {
	      obj = arguments[0];
	    } else {
	      obj = {
	        predicate: arguments[0],
	        thisArg: arguments[1],
	        defaultValue: arguments[2]
	      };
	    }
	    if (isFunction (obj.predicate)) {
	      var fn = obj.predicate;
	      obj.predicate = bindCallback(fn, obj.thisArg, 3);
	    }
	    return new LastObservable(this, obj);
	  };

	  var FindValueObserver = (function(__super__) {
	    inherits(FindValueObserver, __super__);
	    function FindValueObserver(observer, source, callback, yieldIndex) {
	      this._o = observer;
	      this._s = source;
	      this._cb = callback;
	      this._y = yieldIndex;
	      this._i = 0;
	      __super__.call(this);
	    }

	    FindValueObserver.prototype.next = function (x) {
	      var shouldRun = tryCatch(this._cb)(x, this._i, this._s);
	      if (shouldRun === errorObj) { return this._o.onError(shouldRun.e); }
	      if (shouldRun) {
	        this._o.onNext(this._y ? this._i : x);
	        this._o.onCompleted();
	      } else {
	        this._i++;
	      }
	    };

	    FindValueObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    FindValueObserver.prototype.completed = function () {
	      this._y && this._o.onNext(-1);
	      this._o.onCompleted();
	    };

	    return FindValueObserver;
	  }(AbstractObserver));

	  function findValue (source, predicate, thisArg, yieldIndex) {
	    var callback = bindCallback(predicate, thisArg, 3);
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(new FindValueObserver(o, source, callback, yieldIndex));
	    }, source);
	  }

	  /**
	   * Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire Observable sequence.
	   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} An Observable sequence with the first element that matches the conditions defined by the specified predicate, if found; otherwise, undefined.
	   */
	  observableProto.find = function (predicate, thisArg) {
	    return findValue(this, predicate, thisArg, false);
	  };

	  /**
	   * Searches for an element that matches the conditions defined by the specified predicate, and returns
	   * an Observable sequence with the zero-based index of the first occurrence within the entire Observable sequence.
	   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} An Observable sequence with the zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, –1.
	  */
	  observableProto.findIndex = function (predicate, thisArg) {
	    return findValue(this, predicate, thisArg, true);
	  };

	  var ToSetObservable = (function (__super__) {
	    inherits(ToSetObservable, __super__);
	    function ToSetObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    ToSetObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new ToSetObserver(o));
	    };

	    return ToSetObservable;
	  }(ObservableBase));

	  var ToSetObserver = (function (__super__) {
	    inherits(ToSetObserver, __super__);
	    function ToSetObserver(o) {
	      this._o = o;
	      this._s = new root.Set();
	      __super__.call(this);
	    }

	    ToSetObserver.prototype.next = function (x) {
	      this._s.add(x);
	    };

	    ToSetObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    ToSetObserver.prototype.completed = function () {
	      this._o.onNext(this._s);
	      this._o.onCompleted();
	    };

	    return ToSetObserver;
	  }(AbstractObserver));

	  /**
	   * Converts the observable sequence to a Set if it exists.
	   * @returns {Observable} An observable sequence with a single value of a Set containing the values from the observable sequence.
	   */
	  observableProto.toSet = function () {
	    if (typeof root.Set === 'undefined') { throw new TypeError(); }
	    return new ToSetObservable(this);
	  };

	  var ToMapObservable = (function (__super__) {
	    inherits(ToMapObservable, __super__);
	    function ToMapObservable(source, k, e) {
	      this.source = source;
	      this._k = k;
	      this._e = e;
	      __super__.call(this);
	    }

	    ToMapObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new ToMapObserver(o, this._k, this._e));
	    };

	    return ToMapObservable;
	  }(ObservableBase));

	  var ToMapObserver = (function (__super__) {
	    inherits(ToMapObserver, __super__);
	    function ToMapObserver(o, k, e) {
	      this._o = o;
	      this._k = k;
	      this._e = e;
	      this._m = new root.Map();
	      __super__.call(this);
	    }

	    ToMapObserver.prototype.next = function (x) {
	      var key = tryCatch(this._k)(x);
	      if (key === errorObj) { return this._o.onError(key.e); }
	      var elem = x;
	      if (this._e) {
	        elem = tryCatch(this._e)(x);
	        if (elem === errorObj) { return this._o.onError(elem.e); }
	      }

	      this._m.set(key, elem);
	    };

	    ToMapObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    ToMapObserver.prototype.completed = function () {
	      this._o.onNext(this._m);
	      this._o.onCompleted();
	    };

	    return ToMapObserver;
	  }(AbstractObserver));

	  /**
	  * Converts the observable sequence to a Map if it exists.
	  * @param {Function} keySelector A function which produces the key for the Map.
	  * @param {Function} [elementSelector] An optional function which produces the element for the Map. If not present, defaults to the value from the observable sequence.
	  * @returns {Observable} An observable sequence with a single value of a Map containing the values from the observable sequence.
	  */
	  observableProto.toMap = function (keySelector, elementSelector) {
	    if (typeof root.Map === 'undefined') { throw new TypeError(); }
	    return new ToMapObservable(this, keySelector, elementSelector);
	  };

	  var SliceObservable = (function (__super__) {
	    inherits(SliceObservable, __super__);
	    function SliceObservable(source, b, e) {
	      this.source = source;
	      this._b = b;
	      this._e = e;
	      __super__.call(this);
	    }

	    SliceObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SliceObserver(o, this._b, this._e));
	    };

	    return SliceObservable;
	  }(ObservableBase));

	  var SliceObserver = (function (__super__) {
	    inherits(SliceObserver, __super__);

	    function SliceObserver(o, b, e) {
	      this._o = o;
	      this._b = b;
	      this._e = e;
	      this._i = 0;
	      __super__.call(this);
	    }

	    SliceObserver.prototype.next = function (x) {
	      if (this._i >= this._b) {
	        if (this._e === this._i) {
	          this._o.onCompleted();
	        } else {
	          this._o.onNext(x);
	        }
	      }
	      this._i++;
	    };
	    SliceObserver.prototype.error = function (e) { this._o.onError(e); };
	    SliceObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return SliceObserver;
	  }(AbstractObserver));

	  /*
	  * The slice() method returns a shallow copy of a portion of an Observable into a new Observable object.
	  * Unlike the array version, this does not support negative numbers for being or end.
	  * @param {Number} [begin] Zero-based index at which to begin extraction. If omitted, this will default to zero.
	  * @param {Number} [end] Zero-based index at which to end extraction. slice extracts up to but not including end.
	  * If omitted, this will emit the rest of the Observable object.
	  * @returns {Observable} A shallow copy of a portion of an Observable into a new Observable object.
	  */
	  observableProto.slice = function (begin, end) {
	    var start = begin || 0;
	    if (start < 0) { throw new Rx.ArgumentOutOfRangeError(); }
	    if (typeof end === 'number' && end < start) {
	      throw new Rx.ArgumentOutOfRangeError();
	    }
	    return new SliceObservable(this, start, end);
	  };

	  var LastIndexOfObservable = (function (__super__) {
	    inherits(LastIndexOfObservable, __super__);
	    function LastIndexOfObservable(source, e, n) {
	      this.source = source;
	      this._e = e;
	      this._n = n;
	      __super__.call(this);
	    }

	    LastIndexOfObservable.prototype.subscribeCore = function (o) {
	      if (this._n < 0) {
	        o.onNext(-1);
	        o.onCompleted();
	        return disposableEmpty;
	      }

	      return this.source.subscribe(new LastIndexOfObserver(o, this._e, this._n));
	    };

	    return LastIndexOfObservable;
	  }(ObservableBase));

	  var LastIndexOfObserver = (function (__super__) {
	    inherits(LastIndexOfObserver, __super__);
	    function LastIndexOfObserver(o, e, n) {
	      this._o = o;
	      this._e = e;
	      this._n = n;
	      this._v = 0;
	      this._hv = false;
	      this._i = 0;
	      __super__.call(this);
	    }

	    LastIndexOfObserver.prototype.next = function (x) {
	      if (this._i >= this._n && x === this._e) {
	        this._hv = true;
	        this._v = this._i;
	      }
	      this._i++;
	    };
	    LastIndexOfObserver.prototype.error = function (e) { this._o.onError(e); };
	    LastIndexOfObserver.prototype.completed = function () {
	      if (this._hv) {
	        this._o.onNext(this._v);
	      } else {
	        this._o.onNext(-1);
	      }
	      this._o.onCompleted();
	    };

	    return LastIndexOfObserver;
	  }(AbstractObserver));

	  /**
	   * Returns the last index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   * @param {Any} searchElement Element to locate in the array.
	   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
	   * @returns {Observable} And observable sequence containing the last index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   */
	  observableProto.lastIndexOf = function(searchElement, fromIndex) {
	    var n = +fromIndex || 0;
	    Math.abs(n) === Infinity && (n = 0);
	    return new LastIndexOfObservable(this, searchElement, n);
	  };

	  Observable.wrap = function (fn) {
	    function createObservable() {
	      return Observable.spawn.call(this, fn.apply(this, arguments));
	    }

	    createObservable.__generatorFunction__ = fn;
	    return createObservable;
	  };

	  var spawn = Observable.spawn = function () {
	    var gen = arguments[0], self = this, args = [];
	    for (var i = 1, len = arguments.length; i < len; i++) { args.push(arguments[i]); }

	    return new AnonymousObservable(function (o) {
	      var g = new CompositeDisposable();

	      if (isFunction(gen)) { gen = gen.apply(self, args); }
	      if (!gen || !isFunction(gen.next)) {
	        o.onNext(gen);
	        return o.onCompleted();
	      }

	      function processGenerator(res) {
	        var ret = tryCatch(gen.next).call(gen, res);
	        if (ret === errorObj) { return o.onError(ret.e); }
	        next(ret);
	      }

	      processGenerator();

	      function onError(err) {
	        var ret = tryCatch(gen.next).call(gen, err);
	        if (ret === errorObj) { return o.onError(ret.e); }
	        next(ret);
	      }

	      function next(ret) {
	        if (ret.done) {
	          o.onNext(ret.value);
	          o.onCompleted();
	          return;
	        }
	        var obs = toObservable.call(self, ret.value);
	        var value = null;
	        var hasValue = false;
	        if (Observable.isObservable(obs)) {
	          g.add(obs.subscribe(function(val) {
	            hasValue = true;
	            value = val;
	          }, onError, function() {
	            hasValue && processGenerator(value);
	          }));
	        } else {
	          onError(new TypeError('type not supported'));
	        }
	      }

	      return g;
	    });
	  };

	  function toObservable(obj) {
	    if (!obj) { return obj; }
	    if (Observable.isObservable(obj)) { return obj; }
	    if (isPromise(obj)) { return Observable.fromPromise(obj); }
	    if (isGeneratorFunction(obj) || isGenerator(obj)) { return spawn.call(this, obj); }
	    if (isFunction(obj)) { return thunkToObservable.call(this, obj); }
	    if (isArrayLike(obj) || isIterable(obj)) { return arrayToObservable.call(this, obj); }
	    if (isObject(obj)) {return objectToObservable.call(this, obj);}
	    return obj;
	  }

	  function arrayToObservable (obj) {
	    return Observable.from(obj).concatMap(function(o) {
	      if(Observable.isObservable(o) || isObject(o)) {
	        return toObservable.call(null, o);
	      } else {
	        return Rx.Observable.just(o);
	      }
	    }).toArray();
	  }

	  function objectToObservable (obj) {
	    var results = new obj.constructor(), keys = Object.keys(obj), observables = [];
	    for (var i = 0, len = keys.length; i < len; i++) {
	      var key = keys[i];
	      var observable = toObservable.call(this, obj[key]);

	      if(observable && Observable.isObservable(observable)) {
	        defer(observable, key);
	      } else {
	        results[key] = obj[key];
	      }
	    }

	    return Observable.forkJoin.apply(Observable, observables).map(function() {
	      return results;
	    });


	    function defer (observable, key) {
	      results[key] = undefined;
	      observables.push(observable.map(function (next) {
	        results[key] = next;
	      }));
	    }
	  }

	  function thunkToObservable(fn) {
	    var self = this;
	    return new AnonymousObservable(function (o) {
	      fn.call(self, function () {
	        var err = arguments[0], res = arguments[1];
	        if (err) { return o.onError(err); }
	        if (arguments.length > 2) {
	          var args = [];
	          for (var i = 1, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	          res = args;
	        }
	        o.onNext(res);
	        o.onCompleted();
	      });
	    });
	  }

	  function isGenerator(obj) {
	    return isFunction (obj.next) && isFunction (obj['throw']);
	  }

	  function isGeneratorFunction(obj) {
	    var ctor = obj.constructor;
	    if (!ctor) { return false; }
	    if (ctor.name === 'GeneratorFunction' || ctor.displayName === 'GeneratorFunction') { return true; }
	    return isGenerator(ctor.prototype);
	  }

	  function isObject(val) {
	    return Object == val.constructor;
	  }

	  /**
	   * Invokes the specified function asynchronously on the specified scheduler, surfacing the result through an observable sequence.
	   *
	   * @example
	   * var res = Rx.Observable.start(function () { console.log('hello'); });
	   * var res = Rx.Observable.start(function () { console.log('hello'); }, Rx.Scheduler.timeout);
	   * var res = Rx.Observable.start(function () { this.log('hello'); }, Rx.Scheduler.timeout, console);
	   *
	   * @param {Function} func Function to run asynchronously.
	   * @param {Scheduler} [scheduler]  Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
	   * @param [context]  The context for the func parameter to be executed.  If not specified, defaults to undefined.
	   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
	   *
	   * Remarks
	   * * The function is called immediately, not during the subscription of the resulting sequence.
	   * * Multiple subscriptions to the resulting sequence can observe the function's result.
	   */
	  Observable.start = function (func, context, scheduler) {
	    return observableToAsync(func, context, scheduler)();
	  };

	  /**
	   * Converts the function into an asynchronous function. Each invocation of the resulting asynchronous function causes an invocation of the original synchronous function on the specified scheduler.
	   * @param {Function} function Function to convert to an asynchronous function.
	   * @param {Scheduler} [scheduler] Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
	   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	   * @returns {Function} Asynchronous function.
	   */
	  var observableToAsync = Observable.toAsync = function (func, context, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return function () {
	      var args = arguments,
	        subject = new AsyncSubject();

	      scheduler.schedule(null, function () {
	        var result;
	        try {
	          result = func.apply(context, args);
	        } catch (e) {
	          subject.onError(e);
	          return;
	        }
	        subject.onNext(result);
	        subject.onCompleted();
	      });
	      return subject.asObservable();
	    };
	  };

	function createCbObservable(fn, ctx, selector, args) {
	  var o = new AsyncSubject();

	  args.push(createCbHandler(o, ctx, selector));
	  fn.apply(ctx, args);

	  return o.asObservable();
	}

	function createCbHandler(o, ctx, selector) {
	  return function handler () {
	    var len = arguments.length, results = new Array(len);
	    for(var i = 0; i < len; i++) { results[i] = arguments[i]; }

	    if (isFunction(selector)) {
	      results = tryCatch(selector).apply(ctx, results);
	      if (results === errorObj) { return o.onError(results.e); }
	      o.onNext(results);
	    } else {
	      if (results.length <= 1) {
	        o.onNext(results[0]);
	      } else {
	        o.onNext(results);
	      }
	    }

	    o.onCompleted();
	  };
	}

	/**
	 * Converts a callback function to an observable sequence.
	 *
	 * @param {Function} fn Function with a callback as the last parameter to convert to an Observable sequence.
	 * @param {Mixed} [ctx] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	 * @param {Function} [selector] A selector which takes the arguments from the callback to produce a single item to yield on next.
	 * @returns {Function} A function, when executed with the required parameters minus the callback, produces an Observable sequence with a single value of the arguments to the callback as an array.
	 */
	Observable.fromCallback = function (fn, ctx, selector) {
	  return function () {
	    typeof ctx === 'undefined' && (ctx = this); 

	    var len = arguments.length, args = new Array(len)
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return createCbObservable(fn, ctx, selector, args);
	  };
	};

	function createNodeObservable(fn, ctx, selector, args) {
	  var o = new AsyncSubject();

	  args.push(createNodeHandler(o, ctx, selector));
	  fn.apply(ctx, args);

	  return o.asObservable();
	}

	function createNodeHandler(o, ctx, selector) {
	  return function handler () {
	    var err = arguments[0];
	    if (err) { return o.onError(err); }

	    var len = arguments.length, results = [];
	    for(var i = 1; i < len; i++) { results[i - 1] = arguments[i]; }

	    if (isFunction(selector)) {
	      var results = tryCatch(selector).apply(ctx, results);
	      if (results === errorObj) { return o.onError(results.e); }
	      o.onNext(results);
	    } else {
	      if (results.length <= 1) {
	        o.onNext(results[0]);
	      } else {
	        o.onNext(results);
	      }
	    }

	    o.onCompleted();
	  };
	}

	/**
	 * Converts a Node.js callback style function to an observable sequence.  This must be in function (err, ...) format.
	 * @param {Function} fn The function to call
	 * @param {Mixed} [ctx] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	 * @param {Function} [selector] A selector which takes the arguments from the callback minus the error to produce a single item to yield on next.
	 * @returns {Function} An async function which when applied, returns an observable sequence with the callback arguments as an array.
	 */
	Observable.fromNodeCallback = function (fn, ctx, selector) {
	  return function () {
	    typeof ctx === 'undefined' && (ctx = this); 
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return createNodeObservable(fn, ctx, selector, args);
	  };
	};

	  function isNodeList(el) {
	    if (root.StaticNodeList) {
	      // IE8 Specific
	      // instanceof is slower than Object#toString, but Object#toString will not work as intended in IE8
	      return el instanceof root.StaticNodeList || el instanceof root.NodeList;
	    } else {
	      return Object.prototype.toString.call(el) === '[object NodeList]';
	    }
	  }

	  function ListenDisposable(e, n, fn) {
	    this._e = e;
	    this._n = n;
	    this._fn = fn;
	    this._e.addEventListener(this._n, this._fn, false);
	    this.isDisposed = false;
	  }
	  ListenDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this._e.removeEventListener(this._n, this._fn, false);
	      this.isDisposed = true;
	    }
	  };

	  function createEventListener (el, eventName, handler) {
	    var disposables = new CompositeDisposable();

	    // Asume NodeList or HTMLCollection
	    var elemToString = Object.prototype.toString.call(el);
	    if (isNodeList(el) || elemToString === '[object HTMLCollection]') {
	      for (var i = 0, len = el.length; i < len; i++) {
	        disposables.add(createEventListener(el.item(i), eventName, handler));
	      }
	    } else if (el) {
	      disposables.add(new ListenDisposable(el, eventName, handler));
	    }

	    return disposables;
	  }

	  /**
	   * Configuration option to determine whether to use native events only
	   */
	  Rx.config.useNativeEvents = false;

	  var EventObservable = (function(__super__) {
	    inherits(EventObservable, __super__);
	    function EventObservable(el, name, fn) {
	      this._el = el;
	      this._n = name;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    function createHandler(o, fn) {
	      return function handler () {
	        var results = arguments[0];
	        if (isFunction(fn)) {
	          results = tryCatch(fn).apply(null, arguments);
	          if (results === errorObj) { return o.onError(results.e); }
	        }
	        o.onNext(results);
	      };
	    }

	    EventObservable.prototype.subscribeCore = function (o) {
	      return createEventListener(
	        this._el,
	        this._n,
	        createHandler(o, this._fn));
	    };

	    return EventObservable;
	  }(ObservableBase));

	  /**
	   * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
	   * @param {Object} element The DOMElement or NodeList to attach a listener.
	   * @param {String} eventName The event name to attach the observable sequence.
	   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
	   * @returns {Observable} An observable sequence of events from the specified element and the specified event.
	   */
	  Observable.fromEvent = function (element, eventName, selector) {
	    // Node.js specific
	    if (element.addListener) {
	      return fromEventPattern(
	        function (h) { element.addListener(eventName, h); },
	        function (h) { element.removeListener(eventName, h); },
	        selector);
	    }

	    // Use only if non-native events are allowed
	    if (!Rx.config.useNativeEvents) {
	      // Handles jq, Angular.js, Zepto, Marionette, Ember.js
	      if (typeof element.on === 'function' && typeof element.off === 'function') {
	        return fromEventPattern(
	          function (h) { element.on(eventName, h); },
	          function (h) { element.off(eventName, h); },
	          selector);
	      }
	    }

	    return new EventObservable(element, eventName, selector).publish().refCount();
	  };

	  var EventPatternObservable = (function(__super__) {
	    inherits(EventPatternObservable, __super__);
	    function EventPatternObservable(add, del, fn) {
	      this._add = add;
	      this._del = del;
	      this._fn = fn;
	      __super__.call(this);
	    }

	    function createHandler(o, fn) {
	      return function handler () {
	        var results = arguments[0];
	        if (isFunction(fn)) {
	          results = tryCatch(fn).apply(null, arguments);
	          if (results === errorObj) { return o.onError(results.e); }
	        }
	        o.onNext(results);
	      };
	    }

	    EventPatternObservable.prototype.subscribeCore = function (o) {
	      var fn = createHandler(o, this._fn);
	      var returnValue = this._add(fn);
	      return new EventPatternDisposable(this._del, fn, returnValue);
	    };

	    function EventPatternDisposable(del, fn, ret) {
	      this._del = del;
	      this._fn = fn;
	      this._ret = ret;
	      this.isDisposed = false;
	    }

	    EventPatternDisposable.prototype.dispose = function () {
	      if(!this.isDisposed) {
	        isFunction(this._del) && this._del(this._fn, this._ret);
	      }
	    };

	    return EventPatternObservable;
	  }(ObservableBase));

	  /**
	   * Creates an observable sequence from an event emitter via an addHandler/removeHandler pair.
	   * @param {Function} addHandler The function to add a handler to the emitter.
	   * @param {Function} [removeHandler] The optional function to remove a handler from an emitter.
	   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
	   * @returns {Observable} An observable sequence which wraps an event from an event emitter
	   */
	  var fromEventPattern = Observable.fromEventPattern = function (addHandler, removeHandler, selector) {
	    return new EventPatternObservable(addHandler, removeHandler, selector).publish().refCount();
	  };

	  /**
	   * Invokes the asynchronous function, surfacing the result through an observable sequence.
	   * @param {Function} functionAsync Asynchronous function which returns a Promise to run.
	   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
	   */
	  Observable.startAsync = function (functionAsync) {
	    var promise = tryCatch(functionAsync)();
	    if (promise === errorObj) { return observableThrow(promise.e); }
	    return observableFromPromise(promise);
	  };

	  var PausableObservable = (function (__super__) {
	    inherits(PausableObservable, __super__);
	    function PausableObservable(source, pauser) {
	      this.source = source;
	      this.controller = new Subject();

	      if (pauser && pauser.subscribe) {
	        this.pauser = this.controller.merge(pauser);
	      } else {
	        this.pauser = this.controller;
	      }

	      __super__.call(this);
	    }

	    PausableObservable.prototype._subscribe = function (o) {
	      var conn = this.source.publish(),
	        subscription = conn.subscribe(o),
	        connection = disposableEmpty;

	      var pausable = this.pauser.distinctUntilChanged().subscribe(function (b) {
	        if (b) {
	          connection = conn.connect();
	        } else {
	          connection.dispose();
	          connection = disposableEmpty;
	        }
	      });

	      return new NAryDisposable([subscription, connection, pausable]);
	    };

	    PausableObservable.prototype.pause = function () {
	      this.controller.onNext(false);
	    };

	    PausableObservable.prototype.resume = function () {
	      this.controller.onNext(true);
	    };

	    return PausableObservable;

	  }(Observable));

	  /**
	   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false.
	   * @example
	   * var pauser = new Rx.Subject();
	   * var source = Rx.Observable.interval(100).pausable(pauser);
	   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
	   * @returns {Observable} The observable sequence which is paused based upon the pauser.
	   */
	  observableProto.pausable = function (pauser) {
	    return new PausableObservable(this, pauser);
	  };

	  function combineLatestSource(source, subject, resultSelector) {
	    return new AnonymousObservable(function (o) {
	      var hasValue = [false, false],
	        hasValueAll = false,
	        isDone = false,
	        values = new Array(2),
	        err;

	      function next(x, i) {
	        values[i] = x;
	        hasValue[i] = true;
	        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
	          if (err) { return o.onError(err); }
	          var res = tryCatch(resultSelector).apply(null, values);
	          if (res === errorObj) { return o.onError(res.e); }
	          o.onNext(res);
	        }
	        isDone && values[1] && o.onCompleted();
	      }

	      return new BinaryDisposable(
	        source.subscribe(
	          function (x) {
	            next(x, 0);
	          },
	          function (e) {
	            if (values[1]) {
	              o.onError(e);
	            } else {
	              err = e;
	            }
	          },
	          function () {
	            isDone = true;
	            values[1] && o.onCompleted();
	          }),
	        subject.subscribe(
	          function (x) {
	            next(x, 1);
	          },
	          function (e) { o.onError(e); },
	          function () {
	            isDone = true;
	            next(true, 1);
	          })
	        );
	    }, source);
	  }

	  var PausableBufferedObservable = (function (__super__) {
	    inherits(PausableBufferedObservable, __super__);
	    function PausableBufferedObservable(source, pauser) {
	      this.source = source;
	      this.controller = new Subject();

	      if (pauser && pauser.subscribe) {
	        this.pauser = this.controller.merge(pauser);
	      } else {
	        this.pauser = this.controller;
	      }

	      __super__.call(this);
	    }

	    PausableBufferedObservable.prototype._subscribe = function (o) {
	      var q = [], previousShouldFire;

	      function drainQueue() { while (q.length > 0) { o.onNext(q.shift()); } }

	      var subscription =
	        combineLatestSource(
	          this.source,
	          this.pauser.startWith(false).distinctUntilChanged(),
	          function (data, shouldFire) {
	            return { data: data, shouldFire: shouldFire };
	          })
	          .subscribe(
	            function (results) {
	              if (previousShouldFire !== undefined && results.shouldFire !== previousShouldFire) {
	                previousShouldFire = results.shouldFire;
	                // change in shouldFire
	                if (results.shouldFire) { drainQueue(); }
	              } else {
	                previousShouldFire = results.shouldFire;
	                // new data
	                if (results.shouldFire) {
	                  o.onNext(results.data);
	                } else {
	                  q.push(results.data);
	                }
	              }
	            },
	            function (err) {
	              drainQueue();
	              o.onError(err);
	            },
	            function () {
	              drainQueue();
	              o.onCompleted();
	            }
	          );
	      return subscription;      
	    };

	    PausableBufferedObservable.prototype.pause = function () {
	      this.controller.onNext(false);
	    };

	    PausableBufferedObservable.prototype.resume = function () {
	      this.controller.onNext(true);
	    };

	    return PausableBufferedObservable;

	  }(Observable));

	  /**
	   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false,
	   * and yields the values that were buffered while paused.
	   * @example
	   * var pauser = new Rx.Subject();
	   * var source = Rx.Observable.interval(100).pausableBuffered(pauser);
	   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
	   * @returns {Observable} The observable sequence which is paused based upon the pauser.
	   */
	  observableProto.pausableBuffered = function (pauser) {
	    return new PausableBufferedObservable(this, pauser);
	  };

	  var ControlledObservable = (function (__super__) {
	    inherits(ControlledObservable, __super__);
	    function ControlledObservable (source, enableQueue, scheduler) {
	      __super__.call(this);
	      this.subject = new ControlledSubject(enableQueue, scheduler);
	      this.source = source.multicast(this.subject).refCount();
	    }

	    ControlledObservable.prototype._subscribe = function (o) {
	      return this.source.subscribe(o);
	    };

	    ControlledObservable.prototype.request = function (numberOfItems) {
	      return this.subject.request(numberOfItems == null ? -1 : numberOfItems);
	    };

	    return ControlledObservable;

	  }(Observable));

	  var ControlledSubject = (function (__super__) {
	    inherits(ControlledSubject, __super__);
	    function ControlledSubject(enableQueue, scheduler) {
	      enableQueue == null && (enableQueue = true);

	      __super__.call(this);
	      this.subject = new Subject();
	      this.enableQueue = enableQueue;
	      this.queue = enableQueue ? [] : null;
	      this.requestedCount = 0;
	      this.requestedDisposable = null;
	      this.error = null;
	      this.hasFailed = false;
	      this.hasCompleted = false;
	      this.scheduler = scheduler || currentThreadScheduler;
	    }

	    addProperties(ControlledSubject.prototype, Observer, {
	      _subscribe: function (o) {
	        return this.subject.subscribe(o);
	      },
	      onCompleted: function () {
	        this.hasCompleted = true;
	        if (!this.enableQueue || this.queue.length === 0) {
	          this.subject.onCompleted();
	          this.disposeCurrentRequest();
	        } else {
	          this.queue.push(Notification.createOnCompleted());
	        }
	      },
	      onError: function (error) {
	        this.hasFailed = true;
	        this.error = error;
	        if (!this.enableQueue || this.queue.length === 0) {
	          this.subject.onError(error);
	          this.disposeCurrentRequest();
	        } else {
	          this.queue.push(Notification.createOnError(error));
	        }
	      },
	      onNext: function (value) {
	        if (this.requestedCount <= 0) {
	          this.enableQueue && this.queue.push(Notification.createOnNext(value));
	        } else {
	          (this.requestedCount-- === 0) && this.disposeCurrentRequest();
	          this.subject.onNext(value);
	        }
	      },
	      _processRequest: function (numberOfItems) {
	        if (this.enableQueue) {
	          while (this.queue.length > 0 && (numberOfItems > 0 || this.queue[0].kind !== 'N')) {
	            var first = this.queue.shift();
	            first.accept(this.subject);
	            if (first.kind === 'N') {
	              numberOfItems--;
	            } else {
	              this.disposeCurrentRequest();
	              this.queue = [];
	            }
	          }
	        }

	        return numberOfItems;
	      },
	      request: function (number) {
	        this.disposeCurrentRequest();
	        var self = this;

	        this.requestedDisposable = this.scheduler.schedule(number,
	        function(s, i) {
	          var remaining = self._processRequest(i);
	          var stopped = self.hasCompleted || self.hasFailed;
	          if (!stopped && remaining > 0) {
	            self.requestedCount = remaining;

	            return disposableCreate(function () {
	              self.requestedCount = 0;
	            });
	              // Scheduled item is still in progress. Return a new
	              // disposable to allow the request to be interrupted
	              // via dispose.
	          }
	        });

	        return this.requestedDisposable;
	      },
	      disposeCurrentRequest: function () {
	        if (this.requestedDisposable) {
	          this.requestedDisposable.dispose();
	          this.requestedDisposable = null;
	        }
	      }
	    });

	    return ControlledSubject;
	  }(Observable));

	  /**
	   * Attaches a controller to the observable sequence with the ability to queue.
	   * @example
	   * var source = Rx.Observable.interval(100).controlled();
	   * source.request(3); // Reads 3 values
	   * @param {bool} enableQueue truthy value to determine if values should be queued pending the next request
	   * @param {Scheduler} scheduler determines how the requests will be scheduled
	   * @returns {Observable} The observable sequence which only propagates values on request.
	   */
	  observableProto.controlled = function (enableQueue, scheduler) {

	    if (enableQueue && isScheduler(enableQueue)) {
	      scheduler = enableQueue;
	      enableQueue = true;
	    }

	    if (enableQueue == null) {  enableQueue = true; }
	    return new ControlledObservable(this, enableQueue, scheduler);
	  };

	  var StopAndWaitObservable = (function (__super__) {
	    inherits(StopAndWaitObservable, __super__);
	    function StopAndWaitObservable (source) {
	      __super__.call(this);
	      this.source = source;
	    }

	    function scheduleMethod(s, self) {
	      self.source.request(1);
	    }

	    StopAndWaitObservable.prototype._subscribe = function (o) {
	      this.subscription = this.source.subscribe(new StopAndWaitObserver(o, this, this.subscription));
	      return new BinaryDisposable(
	        this.subscription,
	        defaultScheduler.schedule(this, scheduleMethod)
	      );
	    };

	    var StopAndWaitObserver = (function (__sub__) {
	      inherits(StopAndWaitObserver, __sub__);
	      function StopAndWaitObserver (observer, observable, cancel) {
	        __sub__.call(this);
	        this.observer = observer;
	        this.observable = observable;
	        this.cancel = cancel;
	        this.scheduleDisposable = null;
	      }

	      StopAndWaitObserver.prototype.completed = function () {
	        this.observer.onCompleted();
	        this.dispose();
	      };

	      StopAndWaitObserver.prototype.error = function (error) {
	        this.observer.onError(error);
	        this.dispose();
	      };

	      function innerScheduleMethod(s, self) {
	        self.observable.source.request(1);
	      }

	      StopAndWaitObserver.prototype.next = function (value) {
	        this.observer.onNext(value);
	        this.scheduleDisposable = defaultScheduler.schedule(this, innerScheduleMethod);
	      };

	      StopAndWaitObservable.dispose = function () {
	        this.observer = null;
	        if (this.cancel) {
	          this.cancel.dispose();
	          this.cancel = null;
	        }
	        if (this.scheduleDisposable) {
	          this.scheduleDisposable.dispose();
	          this.scheduleDisposable = null;
	        }
	        __sub__.prototype.dispose.call(this);
	      };

	      return StopAndWaitObserver;
	    }(AbstractObserver));

	    return StopAndWaitObservable;
	  }(Observable));


	  /**
	   * Attaches a stop and wait observable to the current observable.
	   * @returns {Observable} A stop and wait observable.
	   */
	  ControlledObservable.prototype.stopAndWait = function () {
	    return new StopAndWaitObservable(this);
	  };

	  var WindowedObservable = (function (__super__) {
	    inherits(WindowedObservable, __super__);
	    function WindowedObservable(source, windowSize) {
	      __super__.call(this);
	      this.source = source;
	      this.windowSize = windowSize;
	    }

	    function scheduleMethod(s, self) {
	      self.source.request(self.windowSize);
	    }

	    WindowedObservable.prototype._subscribe = function (o) {
	      this.subscription = this.source.subscribe(new WindowedObserver(o, this, this.subscription));
	      return new BinaryDisposable(
	        this.subscription,
	        defaultScheduler.schedule(this, scheduleMethod)
	      );
	    };

	    var WindowedObserver = (function (__sub__) {
	      inherits(WindowedObserver, __sub__);
	      function WindowedObserver(observer, observable, cancel) {
	        this.observer = observer;
	        this.observable = observable;
	        this.cancel = cancel;
	        this.received = 0;
	        this.scheduleDisposable = null;
	        __sub__.call(this);
	      }

	      WindowedObserver.prototype.completed = function () {
	        this.observer.onCompleted();
	        this.dispose();
	      };

	      WindowedObserver.prototype.error = function (error) {
	        this.observer.onError(error);
	        this.dispose();
	      };

	      function innerScheduleMethod(s, self) {
	        self.observable.source.request(self.observable.windowSize);
	      }

	      WindowedObserver.prototype.next = function (value) {
	        this.observer.onNext(value);
	        this.received = ++this.received % this.observable.windowSize;
	        this.received === 0 && (this.scheduleDisposable = defaultScheduler.schedule(this, innerScheduleMethod));
	      };

	      WindowedObserver.prototype.dispose = function () {
	        this.observer = null;
	        if (this.cancel) {
	          this.cancel.dispose();
	          this.cancel = null;
	        }
	        if (this.scheduleDisposable) {
	          this.scheduleDisposable.dispose();
	          this.scheduleDisposable = null;
	        }
	        __sub__.prototype.dispose.call(this);
	      };

	      return WindowedObserver;
	    }(AbstractObserver));

	    return WindowedObservable;
	  }(Observable));

	  /**
	   * Creates a sliding windowed observable based upon the window size.
	   * @param {Number} windowSize The number of items in the window
	   * @returns {Observable} A windowed observable based upon the window size.
	   */
	  ControlledObservable.prototype.windowed = function (windowSize) {
	    return new WindowedObservable(this, windowSize);
	  };

	  /**
	   * Pipes the existing Observable sequence into a Node.js Stream.
	   * @param {Stream} dest The destination Node.js stream.
	   * @returns {Stream} The destination stream.
	   */
	  observableProto.pipe = function (dest) {
	    var source = this.pausableBuffered();

	    function onDrain() {
	      source.resume();
	    }

	    dest.addListener('drain', onDrain);

	    source.subscribe(
	      function (x) {
	        !dest.write(String(x)) && source.pause();
	      },
	      function (err) {
	        dest.emit('error', err);
	      },
	      function () {
	        // Hack check because STDIO is not closable
	        !dest._isStdio && dest.end();
	        dest.removeListener('drain', onDrain);
	      });

	    source.resume();

	    return dest;
	  };

	  var MulticastObservable = (function (__super__) {
	    inherits(MulticastObservable, __super__);
	    function MulticastObservable(source, fn1, fn2) {
	      this.source = source;
	      this._fn1 = fn1;
	      this._fn2 = fn2;
	      __super__.call(this);
	    }

	    MulticastObservable.prototype.subscribeCore = function (o) {
	      var connectable = this.source.multicast(this._fn1());
	      return new BinaryDisposable(this._fn2(connectable).subscribe(o), connectable.connect());
	    };

	    return MulticastObservable;
	  }(ObservableBase));

	  /**
	   * Multicasts the source sequence notifications through an instantiated subject into all uses of the sequence within a selector function. Each
	   * subscription to the resulting sequence causes a separate multicast invocation, exposing the sequence resulting from the selector function's
	   * invocation. For specializations with fixed subject types, see Publish, PublishLast, and Replay.
	   *
	   * @example
	   * 1 - res = source.multicast(observable);
	   * 2 - res = source.multicast(function () { return new Subject(); }, function (x) { return x; });
	   *
	   * @param {Function|Subject} subjectOrSubjectSelector
	   * Factory function to create an intermediate subject through which the source sequence's elements will be multicast to the selector function.
	   * Or:
	   * Subject to push source elements into.
	   *
	   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence subject to the policies enforced by the created subject. Specified only if <paramref name="subjectOrSubjectSelector" is a factory function.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.multicast = function (subjectOrSubjectSelector, selector) {
	    return isFunction(subjectOrSubjectSelector) ?
	      new MulticastObservable(this, subjectOrSubjectSelector, selector) :
	      new ConnectableObservable(this, subjectOrSubjectSelector);
	  };

	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence.
	   * This operator is a specialization of Multicast using a regular Subject.
	   *
	   * @example
	   * var resres = source.publish();
	   * var res = source.publish(function (x) { return x; });
	   *
	   * @param {Function} [selector] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publish = function (selector) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new Subject(); }, selector) :
	      this.multicast(new Subject());
	  };

	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence.
	   * This operator is a specialization of publish which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.share = function () {
	    return this.publish().refCount();
	  };

	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence containing only the last notification.
	   * This operator is a specialization of Multicast using a AsyncSubject.
	   *
	   * @example
	   * var res = source.publishLast();
	   * var res = source.publishLast(function (x) { return x; });
	   *
	   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will only receive the last notification of the source.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publishLast = function (selector) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new AsyncSubject(); }, selector) :
	      this.multicast(new AsyncSubject());
	  };

	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence and starts with initialValue.
	   * This operator is a specialization of Multicast using a BehaviorSubject.
	   *
	   * @example
	   * var res = source.publishValue(42);
	   * var res = source.publishValue(function (x) { return x.select(function (y) { return y * y; }) }, 42);
	   *
	   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive immediately receive the initial value, followed by all notifications of the source from the time of the subscription on.
	   * @param {Mixed} initialValue Initial value received by observers upon subscription.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publishValue = function (initialValueOrSelector, initialValue) {
	    return arguments.length === 2 ?
	      this.multicast(function () {
	        return new BehaviorSubject(initialValue);
	      }, initialValueOrSelector) :
	      this.multicast(new BehaviorSubject(initialValueOrSelector));
	  };

	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence and starts with an initialValue.
	   * This operator is a specialization of publishValue which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   * @param {Mixed} initialValue Initial value received by observers upon subscription.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.shareValue = function (initialValue) {
	    return this.publishValue(initialValue).refCount();
	  };

	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
	   * This operator is a specialization of Multicast using a ReplaySubject.
	   *
	   * @example
	   * var res = source.replay(null, 3);
	   * var res = source.replay(null, 3, 500);
	   * var res = source.replay(null, 3, 500, scheduler);
	   * var res = source.replay(function (x) { return x.take(6).repeat(); }, 3, 500, scheduler);
	   *
	   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all the notifications of the source subject to the specified replay buffer trimming policy.
	   * @param bufferSize [Optional] Maximum element count of the replay buffer.
	   * @param windowSize [Optional] Maximum time length of the replay buffer.
	   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.replay = function (selector, bufferSize, windowSize, scheduler) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new ReplaySubject(bufferSize, windowSize, scheduler); }, selector) :
	      this.multicast(new ReplaySubject(bufferSize, windowSize, scheduler));
	  };

	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
	   * This operator is a specialization of replay which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   *
	   * @example
	   * var res = source.shareReplay(3);
	   * var res = source.shareReplay(3, 500);
	   * var res = source.shareReplay(3, 500, scheduler);
	   *

	   * @param bufferSize [Optional] Maximum element count of the replay buffer.
	   * @param window [Optional] Maximum time length of the replay buffer.
	   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.shareReplay = function (bufferSize, windowSize, scheduler) {
	    return this.replay(null, bufferSize, windowSize, scheduler).refCount();
	  };

	  var InnerSubscription = function (s, o) {
	    this._s = s;
	    this._o = o;
	  };

	  InnerSubscription.prototype.dispose = function () {
	    if (!this._s.isDisposed && this._o !== null) {
	      var idx = this._s.observers.indexOf(this._o);
	      this._s.observers.splice(idx, 1);
	      this._o = null;
	    }
	  };

	  var RefCountObservable = (function (__super__) {
	    inherits(RefCountObservable, __super__);
	    function RefCountObservable(source) {
	      this.source = source;
	      this._count = 0;
	      this._connectableSubscription = null;
	      __super__.call(this);
	    }

	    RefCountObservable.prototype.subscribeCore = function (o) {
	      var subscription = this.source.subscribe(o);
	      ++this._count === 1 && (this._connectableSubscription = this.source.connect());
	      return new RefCountDisposable(this, subscription);
	    };

	    function RefCountDisposable(p, s) {
	      this._p = p;
	      this._s = s;
	      this.isDisposed = false;
	    }

	    RefCountDisposable.prototype.dispose = function () {
	      if (!this.isDisposed) {
	        this.isDisposed = true;
	        this._s.dispose();
	        --this._p._count === 0 && this._p._connectableSubscription.dispose();
	      }
	    };

	    return RefCountObservable;
	  }(ObservableBase));

	  var ConnectableObservable = Rx.ConnectableObservable = (function (__super__) {
	    inherits(ConnectableObservable, __super__);
	    function ConnectableObservable(source, subject) {
	      this.source = source;
	      this._connection = null;
	      this._source = source.asObservable();
	      this._subject = subject;
	      __super__.call(this);
	    }

	    function ConnectDisposable(parent, subscription) {
	      this._p = parent;
	      this._s = subscription;
	    }

	    ConnectDisposable.prototype.dispose = function () {
	      if (this._s) {
	        this._s.dispose();
	        this._s = null;
	        this._p._connection = null;
	      }
	    };

	    ConnectableObservable.prototype.connect = function () {
	      if (!this._connection) {
	        var subscription = this._source.subscribe(this._subject);
	        this._connection = new ConnectDisposable(this, subscription);
	      }
	      return this._connection;
	    };

	    ConnectableObservable.prototype._subscribe = function (o) {
	      return this._subject.subscribe(o);
	    };

	    ConnectableObservable.prototype.refCount = function () {
	      return new RefCountObservable(this);
	    };

	    return ConnectableObservable;
	  }(Observable));

	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence. This observable sequence
	   * can be resubscribed to, even if all prior subscriptions have ended. (unlike `.publish().refCount()`)
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source.
	   */
	  observableProto.singleInstance = function() {
	    var source = this, hasObservable = false, observable;

	    function getObservable() {
	      if (!hasObservable) {
	        hasObservable = true;
	        observable = source['finally'](function() { hasObservable = false; }).publish().refCount();
	      }
	      return observable;
	    }

	    return new AnonymousObservable(function(o) {
	      return getObservable().subscribe(o);
	    });
	  };

	  /**
	   *  Correlates the elements of two sequences based on overlapping durations.
	   *
	   *  @param {Observable} right The right observable sequence to join elements for.
	   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
	   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
	   *  @param {Function} resultSelector A function invoked to compute a result element for any two overlapping elements of the left and right observable sequences. The parameters passed to the function correspond with the elements from the left and right source sequences for which overlap occurs.
	   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
	   */
	  observableProto.join = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
	    var left = this;
	    return new AnonymousObservable(function (o) {
	      var group = new CompositeDisposable();
	      var leftDone = false, rightDone = false;
	      var leftId = 0, rightId = 0;
	      var leftMap = new Map(), rightMap = new Map();
	      var handleError = function (e) { o.onError(e); };

	      group.add(left.subscribe(
	        function (value) {
	          var id = leftId++, md = new SingleAssignmentDisposable();

	          leftMap.set(id, value);
	          group.add(md);

	          var duration = tryCatch(leftDurationSelector)(value);
	          if (duration === errorObj) { return o.onError(duration.e); }

	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            handleError,
	            function () {
	              leftMap['delete'](id) && leftMap.size === 0 && leftDone && o.onCompleted();
	              group.remove(md);
	            }));

	          rightMap.forEach(function (v) {
	            var result = tryCatch(resultSelector)(value, v);
	            if (result === errorObj) { return o.onError(result.e); }
	            o.onNext(result);
	          });
	        },
	        handleError,
	        function () {
	          leftDone = true;
	          (rightDone || leftMap.size === 0) && o.onCompleted();
	        })
	      );

	      group.add(right.subscribe(
	        function (value) {
	          var id = rightId++, md = new SingleAssignmentDisposable();

	          rightMap.set(id, value);
	          group.add(md);

	          var duration = tryCatch(rightDurationSelector)(value);
	          if (duration === errorObj) { return o.onError(duration.e); }

	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            handleError,
	            function () {
	              rightMap['delete'](id) && rightMap.size === 0 && rightDone && o.onCompleted();
	              group.remove(md);
	            }));

	          leftMap.forEach(function (v) {
	            var result = tryCatch(resultSelector)(v, value);
	            if (result === errorObj) { return o.onError(result.e); }
	            o.onNext(result);
	          });
	        },
	        handleError,
	        function () {
	          rightDone = true;
	          (leftDone || rightMap.size === 0) && o.onCompleted();
	        })
	      );
	      return group;
	    }, left);
	  };

	  /**
	   *  Correlates the elements of two sequences based on overlapping durations, and groups the results.
	   *
	   *  @param {Observable} right The right observable sequence to join elements for.
	   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
	   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
	   *  @param {Function} resultSelector A function invoked to compute a result element for any element of the left sequence with overlapping elements from the right observable sequence. The first parameter passed to the function is an element of the left sequence. The second parameter passed to the function is an observable sequence with elements from the right sequence that overlap with the left sequence's element.
	   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
	   */
	  observableProto.groupJoin = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
	    var left = this;
	    return new AnonymousObservable(function (o) {
	      var group = new CompositeDisposable();
	      var r = new RefCountDisposable(group);
	      var leftMap = new Map(), rightMap = new Map();
	      var leftId = 0, rightId = 0;
	      var handleError = function (e) { return function (v) { v.onError(e); }; };

	      function handleError(e) { };

	      group.add(left.subscribe(
	        function (value) {
	          var s = new Subject();
	          var id = leftId++;
	          leftMap.set(id, s);

	          var result = tryCatch(resultSelector)(value, addRef(s, r));
	          if (result === errorObj) {
	            leftMap.forEach(handleError(result.e));
	            return o.onError(result.e);
	          }
	          o.onNext(result);

	          rightMap.forEach(function (v) { s.onNext(v); });

	          var md = new SingleAssignmentDisposable();
	          group.add(md);

	          var duration = tryCatch(leftDurationSelector)(value);
	          if (duration === errorObj) {
	            leftMap.forEach(handleError(duration.e));
	            return o.onError(duration.e);
	          }

	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            function (e) {
	              leftMap.forEach(handleError(e));
	              o.onError(e);
	            },
	            function () {
	              leftMap['delete'](id) && s.onCompleted();
	              group.remove(md);
	            }));
	        },
	        function (e) {
	          leftMap.forEach(handleError(e));
	          o.onError(e);
	        },
	        function () { o.onCompleted(); })
	      );

	      group.add(right.subscribe(
	        function (value) {
	          var id = rightId++;
	          rightMap.set(id, value);

	          var md = new SingleAssignmentDisposable();
	          group.add(md);

	          var duration = tryCatch(rightDurationSelector)(value);
	          if (duration === errorObj) {
	            leftMap.forEach(handleError(duration.e));
	            return o.onError(duration.e);
	          }

	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            function (e) {
	              leftMap.forEach(handleError(e));
	              o.onError(e);
	            },
	            function () {
	              rightMap['delete'](id);
	              group.remove(md);
	            }));

	          leftMap.forEach(function (v) { v.onNext(value); });
	        },
	        function (e) {
	          leftMap.forEach(handleError(e));
	          o.onError(e);
	        })
	      );

	      return r;
	    }, left);
	  };

	  function toArray(x) { return x.toArray(); }

	  /**
	   *  Projects each element of an observable sequence into zero or more buffers.
	   *  @param {Mixed} bufferOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
	   *  @param {Function} [bufferClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
	   *  @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.buffer = function () {
	    return this.window.apply(this, arguments)
	      .flatMap(toArray);
	  };

	  /**
	   *  Projects each element of an observable sequence into zero or more windows.
	   *
	   *  @param {Mixed} windowOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
	   *  @param {Function} [windowClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
	   *  @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.window = function (windowOpeningsOrClosingSelector, windowClosingSelector) {
	    if (arguments.length === 1 && typeof arguments[0] !== 'function') {
	      return observableWindowWithBoundaries.call(this, windowOpeningsOrClosingSelector);
	    }
	    return typeof windowOpeningsOrClosingSelector === 'function' ?
	      observableWindowWithClosingSelector.call(this, windowOpeningsOrClosingSelector) :
	      observableWindowWithOpenings.call(this, windowOpeningsOrClosingSelector, windowClosingSelector);
	  };

	  function observableWindowWithOpenings(windowOpenings, windowClosingSelector) {
	    return windowOpenings.groupJoin(this, windowClosingSelector, observableEmpty, function (_, win) {
	      return win;
	    });
	  }

	  function observableWindowWithBoundaries(windowBoundaries) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var win = new Subject(),
	        d = new CompositeDisposable(),
	        r = new RefCountDisposable(d);

	      observer.onNext(addRef(win, r));

	      d.add(source.subscribe(function (x) {
	        win.onNext(x);
	      }, function (err) {
	        win.onError(err);
	        observer.onError(err);
	      }, function () {
	        win.onCompleted();
	        observer.onCompleted();
	      }));

	      isPromise(windowBoundaries) && (windowBoundaries = observableFromPromise(windowBoundaries));

	      d.add(windowBoundaries.subscribe(function (w) {
	        win.onCompleted();
	        win = new Subject();
	        observer.onNext(addRef(win, r));
	      }, function (err) {
	        win.onError(err);
	        observer.onError(err);
	      }, function () {
	        win.onCompleted();
	        observer.onCompleted();
	      }));

	      return r;
	    }, source);
	  }

	  function observableWindowWithClosingSelector(windowClosingSelector) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var m = new SerialDisposable(),
	        d = new CompositeDisposable(m),
	        r = new RefCountDisposable(d),
	        win = new Subject();
	      observer.onNext(addRef(win, r));
	      d.add(source.subscribe(function (x) {
	          win.onNext(x);
	      }, function (err) {
	          win.onError(err);
	          observer.onError(err);
	      }, function () {
	          win.onCompleted();
	          observer.onCompleted();
	      }));

	      function createWindowClose () {
	        var windowClose;
	        try {
	          windowClose = windowClosingSelector();
	        } catch (e) {
	          observer.onError(e);
	          return;
	        }

	        isPromise(windowClose) && (windowClose = observableFromPromise(windowClose));

	        var m1 = new SingleAssignmentDisposable();
	        m.setDisposable(m1);
	        m1.setDisposable(windowClose.take(1).subscribe(noop, function (err) {
	          win.onError(err);
	          observer.onError(err);
	        }, function () {
	          win.onCompleted();
	          win = new Subject();
	          observer.onNext(addRef(win, r));
	          createWindowClose();
	        }));
	      }

	      createWindowClose();
	      return r;
	    }, source);
	  }

	  var PairwiseObservable = (function (__super__) {
	    inherits(PairwiseObservable, __super__);
	    function PairwiseObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    PairwiseObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new PairwiseObserver(o));
	    };

	    return PairwiseObservable;
	  }(ObservableBase));

	  var PairwiseObserver = (function(__super__) {
	    inherits(PairwiseObserver, __super__);
	    function PairwiseObserver(o) {
	      this._o = o;
	      this._p = null;
	      this._hp = false;
	    }

	    PairwiseObserver.prototype.next = function (x) {
	      if (this._hp) {
	        this._o.onNext([this._p, x]);
	      } else {
	        this._hp = true;
	      }
	      this._p = x;
	    };
	    PairwiseObserver.prototype.error = function (err) { this._o.onError(err); };
	    PairwiseObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return PairwiseObserver;
	  }(AbstractObserver));

	  /**
	   * Returns a new observable that triggers on the second and subsequent triggerings of the input observable.
	   * The Nth triggering of the input observable passes the arguments from the N-1th and Nth triggering as a pair.
	   * The argument passed to the N-1th triggering is held in hidden internal state until the Nth triggering occurs.
	   * @returns {Observable} An observable that triggers on successive pairs of observations from the input observable as an array.
	   */
	  observableProto.pairwise = function () {
	    return new PairwiseObservable(this);
	  };

	  /**
	   * Returns two observables which partition the observations of the source by the given function.
	   * The first will trigger observations for those values for which the predicate returns true.
	   * The second will trigger observations for those values where the predicate returns false.
	   * The predicate is executed once for each subscribed observer.
	   * Both also propagate all error observations arising from the source and each completes
	   * when the source completes.
	   * @param {Function} predicate
	   *    The function to determine which output Observable will trigger a particular observation.
	   * @returns {Array}
	   *    An array of observables. The first triggers when the predicate returns true,
	   *    and the second triggers when the predicate returns false.
	  */
	  observableProto.partition = function(predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return [
	      this.filter(predicate, thisArg),
	      this.filter(function (x, i, o) { return !fn(x, i, o); })
	    ];
	  };

	  var WhileEnumerable = (function(__super__) {
	    inherits(WhileEnumerable, __super__);
	    function WhileEnumerable(c, s) {
	      this.c = c;
	      this.s = s;
	    }
	    WhileEnumerable.prototype[$iterator$] = function () {
	      var self = this;
	      return {
	        next: function () {
	          return self.c() ?
	           { done: false, value: self.s } :
	           { done: true, value: void 0 };
	        }
	      };
	    };
	    return WhileEnumerable;
	  }(Enumerable));
	  
	  function enumerableWhile(condition, source) {
	    return new WhileEnumerable(condition, source);
	  }  

	   /**
	   *  Returns an observable sequence that is the result of invoking the selector on the source sequence, without sharing subscriptions.
	   *  This operator allows for a fluent style of writing queries that use the same sequence multiple times.
	   *
	   * @param {Function} selector Selector function which can use the source sequence as many times as needed, without sharing subscriptions to the source sequence.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.letBind = observableProto['let'] = function (func) {
	    return func(this);
	  };

	   /**
	   *  Determines whether an observable collection contains values. 
	   *
	   * @example
	   *  1 - res = Rx.Observable.if(condition, obs1);
	   *  2 - res = Rx.Observable.if(condition, obs1, obs2);
	   *  3 - res = Rx.Observable.if(condition, obs1, scheduler);
	   * @param {Function} condition The condition which determines if the thenSource or elseSource will be run.
	   * @param {Observable} thenSource The observable sequence or Promise that will be run if the condition function returns true.
	   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the condition function returns false. If this is not provided, it defaults to Rx.Observabe.Empty with the specified scheduler.
	   * @returns {Observable} An observable sequence which is either the thenSource or elseSource.
	   */
	  Observable['if'] = function (condition, thenSource, elseSourceOrScheduler) {
	    return observableDefer(function () {
	      elseSourceOrScheduler || (elseSourceOrScheduler = observableEmpty());

	      isPromise(thenSource) && (thenSource = observableFromPromise(thenSource));
	      isPromise(elseSourceOrScheduler) && (elseSourceOrScheduler = observableFromPromise(elseSourceOrScheduler));

	      // Assume a scheduler for empty only
	      typeof elseSourceOrScheduler.now === 'function' && (elseSourceOrScheduler = observableEmpty(elseSourceOrScheduler));
	      return condition() ? thenSource : elseSourceOrScheduler;
	    });
	  };

	   /**
	   *  Concatenates the observable sequences obtained by running the specified result selector for each element in source.
	   * There is an alias for this method called 'forIn' for browsers <IE9
	   * @param {Array} sources An array of values to turn into an observable sequence.
	   * @param {Function} resultSelector A function to apply to each item in the sources array to turn it into an observable sequence.
	   * @returns {Observable} An observable sequence from the concatenated observable sequences.
	   */
	  Observable['for'] = Observable.forIn = function (sources, resultSelector, thisArg) {
	    return enumerableOf(sources, resultSelector, thisArg).concat();
	  };

	   /**
	   *  Repeats source as long as condition holds emulating a while loop.
	   * There is an alias for this method called 'whileDo' for browsers <IE9
	   *
	   * @param {Function} condition The condition which determines if the source will be repeated.
	   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
	   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
	   */
	  var observableWhileDo = Observable['while'] = Observable.whileDo = function (condition, source) {
	    isPromise(source) && (source = observableFromPromise(source));
	    return enumerableWhile(condition, source).concat();
	  };

	   /**
	   *  Repeats source as long as condition holds emulating a do while loop.
	   *
	   * @param {Function} condition The condition which determines if the source will be repeated.
	   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
	   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
	   */
	  observableProto.doWhile = function (condition) {
	    return observableConcat([this, observableWhileDo(condition, this)]);
	  };

	   /**
	   *  Uses selector to determine which source in sources to use.
	   * @param {Function} selector The function which extracts the value for to test in a case statement.
	   * @param {Array} sources A object which has keys which correspond to the case statement labels.
	   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the sources are not matched. If this is not provided, it defaults to Rx.Observabe.empty with the specified scheduler.
	   *
	   * @returns {Observable} An observable sequence which is determined by a case statement.
	   */
	  Observable['case'] = function (selector, sources, defaultSourceOrScheduler) {
	    return observableDefer(function () {
	      isPromise(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableFromPromise(defaultSourceOrScheduler));
	      defaultSourceOrScheduler || (defaultSourceOrScheduler = observableEmpty());

	      isScheduler(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableEmpty(defaultSourceOrScheduler));

	      var result = sources[selector()];
	      isPromise(result) && (result = observableFromPromise(result));

	      return result || defaultSourceOrScheduler;
	    });
	  };

	  var ExpandObservable = (function(__super__) {
	    inherits(ExpandObservable, __super__);
	    function ExpandObservable(source, fn, scheduler) {
	      this.source = source;
	      this._fn = fn;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }

	    function scheduleRecursive(args, recurse) {
	      var state = args[0], self = args[1];
	      var work;
	      if (state.q.length > 0) {
	        work = state.q.shift();
	      } else {
	        state.isAcquired = false;
	        return;
	      }
	      var m1 = new SingleAssignmentDisposable();
	      state.d.add(m1);
	      m1.setDisposable(work.subscribe(new ExpandObserver(state, self, m1)));
	      recurse([state, self]);
	    }

	    ExpandObservable.prototype._ensureActive = function (state) {
	      var isOwner = false;
	      if (state.q.length > 0) {
	        isOwner = !state.isAcquired;
	        state.isAcquired = true;
	      }
	      isOwner && state.m.setDisposable(this._scheduler.scheduleRecursive([state, this], scheduleRecursive));
	    };

	    ExpandObservable.prototype.subscribeCore = function (o) {
	      var m = new SerialDisposable(),
	        d = new CompositeDisposable(m),
	        state = {
	          q: [],
	          m: m,
	          d: d,
	          activeCount: 0,
	          isAcquired: false,
	          o: o
	        };

	      state.q.push(this.source);
	      state.activeCount++;
	      this._ensureActive(state);
	      return d;
	    };

	    return ExpandObservable;
	  }(ObservableBase));

	  var ExpandObserver = (function(__super__) {
	    inherits(ExpandObserver, __super__);
	    function ExpandObserver(state, parent, m1) {
	      this._s = state;
	      this._p = parent;
	      this._m1 = m1;
	      __super__.call(this);
	    }

	    ExpandObserver.prototype.next = function (x) {
	      this._s.o.onNext(x);
	      var result = tryCatch(this._p._fn)(x);
	      if (result === errorObj) { return this._s.o.onError(result.e); }
	      this._s.q.push(result);
	      this._s.activeCount++;
	      this._p._ensureActive(this._s);
	    };

	    ExpandObserver.prototype.error = function (e) {
	      this._s.o.onError(e);
	    };

	    ExpandObserver.prototype.completed = function () {
	      this._s.d.remove(this._m1);
	      this._s.activeCount--;
	      this._s.activeCount === 0 && this._s.o.onCompleted();
	    };

	    return ExpandObserver;
	  }(AbstractObserver));

	   /**
	   *  Expands an observable sequence by recursively invoking selector.
	   *
	   * @param {Function} selector Selector function to invoke for each produced element, resulting in another sequence to which the selector will be invoked recursively again.
	   * @param {Scheduler} [scheduler] Scheduler on which to perform the expansion. If not provided, this defaults to the current thread scheduler.
	   * @returns {Observable} An observable sequence containing all the elements produced by the recursive expansion.
	   */
	  observableProto.expand = function (selector, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new ExpandObservable(this, selector, scheduler);
	  };

	  function argumentsToArray() {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return args;
	  }

	  var ForkJoinObservable = (function (__super__) {
	    inherits(ForkJoinObservable, __super__);
	    function ForkJoinObservable(sources, cb) {
	      this._sources = sources;
	      this._cb = cb;
	      __super__.call(this);
	    }

	    ForkJoinObservable.prototype.subscribeCore = function (o) {
	      if (this._sources.length === 0) {
	        o.onCompleted();
	        return disposableEmpty;
	      }

	      var count = this._sources.length;
	      var state = {
	        finished: false,
	        hasResults: new Array(count),
	        hasCompleted: new Array(count),
	        results: new Array(count)
	      };

	      var subscriptions = new CompositeDisposable();
	      for (var i = 0, len = this._sources.length; i < len; i++) {
	        var source = this._sources[i];
	        isPromise(source) && (source = observableFromPromise(source));
	        subscriptions.add(source.subscribe(new ForkJoinObserver(o, state, i, this._cb, subscriptions)));
	      }

	      return subscriptions;
	    };

	    return ForkJoinObservable;
	  }(ObservableBase));

	  var ForkJoinObserver = (function(__super__) {
	    inherits(ForkJoinObserver, __super__);
	    function ForkJoinObserver(o, s, i, cb, subs) {
	      this._o = o;
	      this._s = s;
	      this._i = i;
	      this._cb = cb;
	      this._subs = subs;
	      __super__.call(this);
	    }

	    ForkJoinObserver.prototype.next = function (x) {
	      if (!this._s.finished) {
	        this._s.hasResults[this._i] = true;
	        this._s.results[this._i] = x;
	      }
	    };

	    ForkJoinObserver.prototype.error = function (e) {
	      this._s.finished = true;
	      this._o.onError(e);
	      this._subs.dispose();
	    };

	    ForkJoinObserver.prototype.completed = function () {
	      if (!this._s.finished) {
	        if (!this._s.hasResults[this._i]) {
	          return this._o.onCompleted();
	        }
	        this._s.hasCompleted[this._i] = true;
	        for (var i = 0; i < this._s.results.length; i++) {
	          if (!this._s.hasCompleted[i]) { return; }
	        }
	        this._s.finished = true;

	        var res = tryCatch(this._cb).apply(null, this._s.results);
	        if (res === errorObj) { return this._o.onError(res.e); }

	        this._o.onNext(res);
	        this._o.onCompleted();
	      }
	    };

	    return ForkJoinObserver;
	  }(AbstractObserver));

	   /**
	   *  Runs all observable sequences in parallel and collect their last elements.
	   *
	   * @example
	   *  1 - res = Rx.Observable.forkJoin([obs1, obs2]);
	   *  1 - res = Rx.Observable.forkJoin(obs1, obs2, ...);
	   * @returns {Observable} An observable sequence with an array collecting the last elements of all the input sequences.
	   */
	  Observable.forkJoin = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	    Array.isArray(args[0]) && (args = args[0]);
	    return new ForkJoinObservable(args, resultSelector);
	  };

	   /**
	   *  Runs two observable sequences in parallel and combines their last elemenets.
	   * @param {Observable} second Second observable sequence.
	   * @param {Function} resultSelector Result selector function to invoke with the last elements of both sequences.
	   * @returns {Observable} An observable sequence with the result of calling the selector function with the last elements of both input sequences.
	   */
	  observableProto.forkJoin = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    if (Array.isArray(args[0])) {
	      args[0].unshift(this);
	    } else {
	      args.unshift(this);
	    }
	    return Observable.forkJoin.apply(null, args);
	  };

	  /**
	   * Comonadic bind operator.
	   * @param {Function} selector A transform function to apply to each element.
	   * @param {Object} scheduler Scheduler used to execute the operation. If not specified, defaults to the ImmediateScheduler.
	   * @returns {Observable} An observable sequence which results from the comonadic bind operation.
	   */
	  observableProto.manySelect = observableProto.extend = function (selector, scheduler) {
	    isScheduler(scheduler) || (scheduler = Rx.Scheduler.immediate);
	    var source = this;
	    return observableDefer(function () {
	      var chain;

	      return source
	        .map(function (x) {
	          var curr = new ChainObservable(x);

	          chain && chain.onNext(x);
	          chain = curr;

	          return curr;
	        })
	        .tap(
	          noop,
	          function (e) { chain && chain.onError(e); },
	          function () { chain && chain.onCompleted(); }
	        )
	        .observeOn(scheduler)
	        .map(selector);
	    }, source);
	  };

	  var ChainObservable = (function (__super__) {
	    inherits(ChainObservable, __super__);
	    function ChainObservable(head) {
	      __super__.call(this);
	      this.head = head;
	      this.tail = new AsyncSubject();
	    }

	    addProperties(ChainObservable.prototype, Observer, {
	      _subscribe: function (o) {
	        var g = new CompositeDisposable();
	        g.add(currentThreadScheduler.schedule(this, function (_, self) {
	          o.onNext(self.head);
	          g.add(self.tail.mergeAll().subscribe(o));
	        }));

	        return g;
	      },
	      onCompleted: function () {
	        this.onNext(Observable.empty());
	      },
	      onError: function (e) {
	        this.onNext(Observable['throw'](e));
	      },
	      onNext: function (v) {
	        this.tail.onNext(v);
	        this.tail.onCompleted();
	      }
	    });

	    return ChainObservable;

	  }(Observable));

	  var Map = root.Map || (function () {
	    function Map() {
	      this.size = 0;
	      this._values = [];
	      this._keys = [];
	    }

	    Map.prototype['delete'] = function (key) {
	      var i = this._keys.indexOf(key);
	      if (i === -1) { return false; }
	      this._values.splice(i, 1);
	      this._keys.splice(i, 1);
	      this.size--;
	      return true;
	    };

	    Map.prototype.get = function (key) {
	      var i = this._keys.indexOf(key);
	      return i === -1 ? undefined : this._values[i];
	    };

	    Map.prototype.set = function (key, value) {
	      var i = this._keys.indexOf(key);
	      if (i === -1) {
	        this._keys.push(key);
	        this._values.push(value);
	        this.size++;
	      } else {
	        this._values[i] = value;
	      }
	      return this;
	    };

	    Map.prototype.forEach = function (cb, thisArg) {
	      for (var i = 0; i < this.size; i++) {
	        cb.call(thisArg, this._values[i], this._keys[i]);
	      }
	    };

	    return Map;
	  }());

	  /**
	   * @constructor
	   * Represents a join pattern over observable sequences.
	   */
	  function Pattern(patterns) {
	    this.patterns = patterns;
	  }

	  /**
	   *  Creates a pattern that matches the current plan matches and when the specified observable sequences has an available value.
	   *  @param other Observable sequence to match in addition to the current pattern.
	   *  @return {Pattern} Pattern object that matches when all observable sequences in the pattern have an available value.
	   */
	  Pattern.prototype.and = function (other) {
	    return new Pattern(this.patterns.concat(other));
	  };

	  /**
	   *  Matches when all observable sequences in the pattern (specified using a chain of and operators) have an available value and projects the values.
	   *  @param {Function} selector Selector that will be invoked with available values from the source sequences, in the same order of the sequences in the pattern.
	   *  @return {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
	   */
	  Pattern.prototype.thenDo = function (selector) {
	    return new Plan(this, selector);
	  };

	  function Plan(expression, selector) {
	    this.expression = expression;
	    this.selector = selector;
	  }

	  function handleOnError(o) { return function (e) { o.onError(e); }; }
	  function handleOnNext(self, observer) {
	    return function onNext () {
	      var result = tryCatch(self.selector).apply(self, arguments);
	      if (result === errorObj) { return observer.onError(result.e); }
	      observer.onNext(result);
	    };
	  }

	  Plan.prototype.activate = function (externalSubscriptions, observer, deactivate) {
	    var joinObservers = [], errHandler = handleOnError(observer);
	    for (var i = 0, len = this.expression.patterns.length; i < len; i++) {
	      joinObservers.push(planCreateObserver(externalSubscriptions, this.expression.patterns[i], errHandler));
	    }
	    var activePlan = new ActivePlan(joinObservers, handleOnNext(this, observer), function () {
	      for (var j = 0, jlen = joinObservers.length; j < jlen; j++) {
	        joinObservers[j].removeActivePlan(activePlan);
	      }
	      deactivate(activePlan);
	    });
	    for (i = 0, len = joinObservers.length; i < len; i++) {
	      joinObservers[i].addActivePlan(activePlan);
	    }
	    return activePlan;
	  };

	  function planCreateObserver(externalSubscriptions, observable, onError) {
	    var entry = externalSubscriptions.get(observable);
	    if (!entry) {
	      var observer = new JoinObserver(observable, onError);
	      externalSubscriptions.set(observable, observer);
	      return observer;
	    }
	    return entry;
	  }

	  function ActivePlan(joinObserverArray, onNext, onCompleted) {
	    this.joinObserverArray = joinObserverArray;
	    this.onNext = onNext;
	    this.onCompleted = onCompleted;
	    this.joinObservers = new Map();
	    for (var i = 0, len = this.joinObserverArray.length; i < len; i++) {
	      var joinObserver = this.joinObserverArray[i];
	      this.joinObservers.set(joinObserver, joinObserver);
	    }
	  }

	  ActivePlan.prototype.dequeue = function () {
	    this.joinObservers.forEach(function (v) { v.queue.shift(); });
	  };

	  ActivePlan.prototype.match = function () {
	    var i, len, hasValues = true;
	    for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
	      if (this.joinObserverArray[i].queue.length === 0) {
	        hasValues = false;
	        break;
	      }
	    }
	    if (hasValues) {
	      var firstValues = [],
	          isCompleted = false;
	      for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
	        firstValues.push(this.joinObserverArray[i].queue[0]);
	        this.joinObserverArray[i].queue[0].kind === 'C' && (isCompleted = true);
	      }
	      if (isCompleted) {
	        this.onCompleted();
	      } else {
	        this.dequeue();
	        var values = [];
	        for (i = 0, len = firstValues.length; i < firstValues.length; i++) {
	          values.push(firstValues[i].value);
	        }
	        this.onNext.apply(this, values);
	      }
	    }
	  };

	  var JoinObserver = (function (__super__) {
	    inherits(JoinObserver, __super__);

	    function JoinObserver(source, onError) {
	      __super__.call(this);
	      this.source = source;
	      this.onError = onError;
	      this.queue = [];
	      this.activePlans = [];
	      this.subscription = new SingleAssignmentDisposable();
	      this.isDisposed = false;
	    }

	    var JoinObserverPrototype = JoinObserver.prototype;

	    JoinObserverPrototype.next = function (notification) {
	      if (!this.isDisposed) {
	        if (notification.kind === 'E') {
	          return this.onError(notification.error);
	        }
	        this.queue.push(notification);
	        var activePlans = this.activePlans.slice(0);
	        for (var i = 0, len = activePlans.length; i < len; i++) {
	          activePlans[i].match();
	        }
	      }
	    };

	    JoinObserverPrototype.error = noop;
	    JoinObserverPrototype.completed = noop;

	    JoinObserverPrototype.addActivePlan = function (activePlan) {
	      this.activePlans.push(activePlan);
	    };

	    JoinObserverPrototype.subscribe = function () {
	      this.subscription.setDisposable(this.source.materialize().subscribe(this));
	    };

	    JoinObserverPrototype.removeActivePlan = function (activePlan) {
	      this.activePlans.splice(this.activePlans.indexOf(activePlan), 1);
	      this.activePlans.length === 0 && this.dispose();
	    };

	    JoinObserverPrototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      if (!this.isDisposed) {
	        this.isDisposed = true;
	        this.subscription.dispose();
	      }
	    };

	    return JoinObserver;
	  } (AbstractObserver));

	  /**
	   *  Creates a pattern that matches when both observable sequences have an available value.
	   *
	   *  @param right Observable sequence to match with the current sequence.
	   *  @return {Pattern} Pattern object that matches when both observable sequences have an available value.
	   */
	  observableProto.and = function (right) {
	    return new Pattern([this, right]);
	  };

	  /**
	   *  Matches when the observable sequence has an available value and projects the value.
	   *
	   *  @param {Function} selector Selector that will be invoked for values in the source sequence.
	   *  @returns {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
	   */
	  observableProto.thenDo = function (selector) {
	    return new Pattern([this]).thenDo(selector);
	  };

	  /**
	   *  Joins together the results from several patterns.
	   *
	   *  @param plans A series of plans (specified as an Array of as a series of arguments) created by use of the Then operator on patterns.
	   *  @returns {Observable} Observable sequence with the results form matching several patterns.
	   */
	  Observable.when = function () {
	    var len = arguments.length, plans;
	    if (Array.isArray(arguments[0])) {
	      plans = arguments[0];
	    } else {
	      plans = new Array(len);
	      for(var i = 0; i < len; i++) { plans[i] = arguments[i]; }
	    }
	    return new AnonymousObservable(function (o) {
	      var activePlans = [],
	          externalSubscriptions = new Map();
	      var outObserver = observerCreate(
	        function (x) { o.onNext(x); },
	        function (err) {
	          externalSubscriptions.forEach(function (v) { v.onError(err); });
	          o.onError(err);
	        },
	        function (x) { o.onCompleted(); }
	      );
	      try {
	        for (var i = 0, len = plans.length; i < len; i++) {
	          activePlans.push(plans[i].activate(externalSubscriptions, outObserver, function (activePlan) {
	            var idx = activePlans.indexOf(activePlan);
	            activePlans.splice(idx, 1);
	            activePlans.length === 0 && o.onCompleted();
	          }));
	        }
	      } catch (e) {
	        observableThrow(e).subscribe(o);
	      }
	      var group = new CompositeDisposable();
	      externalSubscriptions.forEach(function (joinObserver) {
	        joinObserver.subscribe();
	        group.add(joinObserver);
	      });

	      return group;
	    });
	  };

	  var TimerObservable = (function(__super__) {
	    inherits(TimerObservable, __super__);
	    function TimerObservable(dt, s) {
	      this._dt = dt;
	      this._s = s;
	      __super__.call(this);
	    }

	    TimerObservable.prototype.subscribeCore = function (o) {
	      return this._s.scheduleFuture(o, this._dt, scheduleMethod);
	    };

	    function scheduleMethod(s, o) {
	      o.onNext(0);
	      o.onCompleted();
	    }

	    return TimerObservable;
	  }(ObservableBase));

	  function _observableTimer(dueTime, scheduler) {
	    return new TimerObservable(dueTime, scheduler);
	  }

	  function observableTimerDateAndPeriod(dueTime, period, scheduler) {
	    return new AnonymousObservable(function (observer) {
	      var d = dueTime, p = normalizeTime(period);
	      return scheduler.scheduleRecursiveFuture(0, d, function (count, self) {
	        if (p > 0) {
	          var now = scheduler.now();
	          d = new Date(d.getTime() + p);
	          d.getTime() <= now && (d = new Date(now + p));
	        }
	        observer.onNext(count);
	        self(count + 1, new Date(d));
	      });
	    });
	  }

	  function observableTimerTimeSpanAndPeriod(dueTime, period, scheduler) {
	    return dueTime === period ?
	      new AnonymousObservable(function (observer) {
	        return scheduler.schedulePeriodic(0, period, function (count) {
	          observer.onNext(count);
	          return count + 1;
	        });
	      }) :
	      observableDefer(function () {
	        return observableTimerDateAndPeriod(new Date(scheduler.now() + dueTime), period, scheduler);
	      });
	  }

	  /**
	   *  Returns an observable sequence that produces a value after each period.
	   *
	   * @example
	   *  1 - res = Rx.Observable.interval(1000);
	   *  2 - res = Rx.Observable.interval(1000, Rx.Scheduler.timeout);
	   *
	   * @param {Number} period Period for producing the values in the resulting sequence (specified as an integer denoting milliseconds).
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, Rx.Scheduler.timeout is used.
	   * @returns {Observable} An observable sequence that produces a value after each period.
	   */
	  var observableinterval = Observable.interval = function (period, scheduler) {
	    return observableTimerTimeSpanAndPeriod(period, period, isScheduler(scheduler) ? scheduler : defaultScheduler);
	  };

	  /**
	   *  Returns an observable sequence that produces a value after dueTime has elapsed and then after each period.
	   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) at which to produce the first value.
	   * @param {Mixed} [periodOrScheduler]  Period to produce subsequent values (specified as an integer denoting milliseconds), or the scheduler to run the timer on. If not specified, the resulting timer is not recurring.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence that produces a value after due time has elapsed and then each period.
	   */
	  var observableTimer = Observable.timer = function (dueTime, periodOrScheduler, scheduler) {
	    var period;
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    if (periodOrScheduler != null && typeof periodOrScheduler === 'number') {
	      period = periodOrScheduler;
	    } else if (isScheduler(periodOrScheduler)) {
	      scheduler = periodOrScheduler;
	    }
	    if ((dueTime instanceof Date || typeof dueTime === 'number') && period === undefined) {
	      return _observableTimer(dueTime, scheduler);
	    }
	    if (dueTime instanceof Date && period !== undefined) {
	      return observableTimerDateAndPeriod(dueTime.getTime(), periodOrScheduler, scheduler);
	    }
	    return observableTimerTimeSpanAndPeriod(dueTime, period, scheduler);
	  };

	  function observableDelayRelative(source, dueTime, scheduler) {
	    return new AnonymousObservable(function (o) {
	      var active = false,
	        cancelable = new SerialDisposable(),
	        exception = null,
	        q = [],
	        running = false,
	        subscription;
	      subscription = source.materialize().timestamp(scheduler).subscribe(function (notification) {
	        var d, shouldRun;
	        if (notification.value.kind === 'E') {
	          q = [];
	          q.push(notification);
	          exception = notification.value.error;
	          shouldRun = !running;
	        } else {
	          q.push({ value: notification.value, timestamp: notification.timestamp + dueTime });
	          shouldRun = !active;
	          active = true;
	        }
	        if (shouldRun) {
	          if (exception !== null) {
	            o.onError(exception);
	          } else {
	            d = new SingleAssignmentDisposable();
	            cancelable.setDisposable(d);
	            d.setDisposable(scheduler.scheduleRecursiveFuture(null, dueTime, function (_, self) {
	              var e, recurseDueTime, result, shouldRecurse;
	              if (exception !== null) {
	                return;
	              }
	              running = true;
	              do {
	                result = null;
	                if (q.length > 0 && q[0].timestamp - scheduler.now() <= 0) {
	                  result = q.shift().value;
	                }
	                if (result !== null) {
	                  result.accept(o);
	                }
	              } while (result !== null);
	              shouldRecurse = false;
	              recurseDueTime = 0;
	              if (q.length > 0) {
	                shouldRecurse = true;
	                recurseDueTime = Math.max(0, q[0].timestamp - scheduler.now());
	              } else {
	                active = false;
	              }
	              e = exception;
	              running = false;
	              if (e !== null) {
	                o.onError(e);
	              } else if (shouldRecurse) {
	                self(null, recurseDueTime);
	              }
	            }));
	          }
	        }
	      });
	      return new BinaryDisposable(subscription, cancelable);
	    }, source);
	  }

	  function observableDelayAbsolute(source, dueTime, scheduler) {
	    return observableDefer(function () {
	      return observableDelayRelative(source, dueTime - scheduler.now(), scheduler);
	    });
	  }

	  function delayWithSelector(source, subscriptionDelay, delayDurationSelector) {
	    var subDelay, selector;
	    if (isFunction(subscriptionDelay)) {
	      selector = subscriptionDelay;
	    } else {
	      subDelay = subscriptionDelay;
	      selector = delayDurationSelector;
	    }
	    return new AnonymousObservable(function (o) {
	      var delays = new CompositeDisposable(), atEnd = false, subscription = new SerialDisposable();

	      function start() {
	        subscription.setDisposable(source.subscribe(
	          function (x) {
	            var delay = tryCatch(selector)(x);
	            if (delay === errorObj) { return o.onError(delay.e); }
	            var d = new SingleAssignmentDisposable();
	            delays.add(d);
	            d.setDisposable(delay.subscribe(
	              function () {
	                o.onNext(x);
	                delays.remove(d);
	                done();
	              },
	              function (e) { o.onError(e); },
	              function () {
	                o.onNext(x);
	                delays.remove(d);
	                done();
	              }
	            ));
	          },
	          function (e) { o.onError(e); },
	          function () {
	            atEnd = true;
	            subscription.dispose();
	            done();
	          }
	        ));
	      }

	      function done () {
	        atEnd && delays.length === 0 && o.onCompleted();
	      }

	      if (!subDelay) {
	        start();
	      } else {
	        subscription.setDisposable(subDelay.subscribe(start, function (e) { o.onError(e); }, start));
	      }

	      return new BinaryDisposable(subscription, delays);
	    }, this);
	  }

	  /**
	   *  Time shifts the observable sequence by dueTime.
	   *  The relative time intervals between the values are preserved.
	   *
	   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) by which to shift the observable sequence.
	   * @param {Scheduler} [scheduler] Scheduler to run the delay timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Time-shifted sequence.
	   */
	  observableProto.delay = function () {
	    var firstArg = arguments[0];
	    if (typeof firstArg === 'number' || firstArg instanceof Date) {
	      var dueTime = firstArg, scheduler = arguments[1];
	      isScheduler(scheduler) || (scheduler = defaultScheduler);
	      return dueTime instanceof Date ?
	        observableDelayAbsolute(this, dueTime, scheduler) :
	        observableDelayRelative(this, dueTime, scheduler);
	    } else if (Observable.isObservable(firstArg) || isFunction(firstArg)) {
	      return delayWithSelector(this, firstArg, arguments[1]);
	    } else {
	      throw new Error('Invalid arguments');
	    }
	  };

	  var DebounceObservable = (function (__super__) {
	    inherits(DebounceObservable, __super__);
	    function DebounceObservable(source, dt, s) {
	      isScheduler(s) || (s = defaultScheduler);
	      this.source = source;
	      this._dt = dt;
	      this._s = s;
	      __super__.call(this);
	    }

	    DebounceObservable.prototype.subscribeCore = function (o) {
	      var cancelable = new SerialDisposable();
	      return new BinaryDisposable(
	        this.source.subscribe(new DebounceObserver(o, this.source, this._dt, this._s, cancelable)),
	        cancelable);
	    };

	    return DebounceObservable;
	  }(ObservableBase));

	  var DebounceObserver = (function (__super__) {
	    inherits(DebounceObserver, __super__);
	    function DebounceObserver(observer, source, dueTime, scheduler, cancelable) {
	      this._o = observer;
	      this._s = source;
	      this._d = dueTime;
	      this._scheduler = scheduler;
	      this._c = cancelable;
	      this._v = null;
	      this._hv = false;
	      this._id = 0;
	      __super__.call(this);
	    }

	    DebounceObserver.prototype.next = function (x) {
	      this._hv = true;
	      this._v = x;
	      var currentId = ++this._id, d = new SingleAssignmentDisposable();
	      this._c.setDisposable(d);
	      d.setDisposable(this._scheduler.scheduleFuture(this, this._d, function (_, self) {
	        self._hv && self._id === currentId && self._o.onNext(x);
	        self._hv = false;
	      }));
	    };

	    DebounceObserver.prototype.error = function (e) {
	      this._c.dispose();
	      this._o.onError(e);
	      this._hv = false;
	      this._id++;
	    };

	    DebounceObserver.prototype.completed = function () {
	      this._c.dispose();
	      this._hv && this._o.onNext(this._v);
	      this._o.onCompleted();
	      this._hv = false;
	      this._id++;
	    };

	    return DebounceObserver;
	  }(AbstractObserver));

	  function debounceWithSelector(source, durationSelector) {
	    return new AnonymousObservable(function (o) {
	      var value, hasValue = false, cancelable = new SerialDisposable(), id = 0;
	      var subscription = source.subscribe(
	        function (x) {
	          var throttle = tryCatch(durationSelector)(x);
	          if (throttle === errorObj) { return o.onError(throttle.e); }

	          isPromise(throttle) && (throttle = observableFromPromise(throttle));

	          hasValue = true;
	          value = x;
	          id++;
	          var currentid = id, d = new SingleAssignmentDisposable();
	          cancelable.setDisposable(d);
	          d.setDisposable(throttle.subscribe(
	            function () {
	              hasValue && id === currentid && o.onNext(value);
	              hasValue = false;
	              d.dispose();
	            },
	            function (e) { o.onError(e); },
	            function () {
	              hasValue && id === currentid && o.onNext(value);
	              hasValue = false;
	              d.dispose();
	            }
	          ));
	        },
	        function (e) {
	          cancelable.dispose();
	          o.onError(e);
	          hasValue = false;
	          id++;
	        },
	        function () {
	          cancelable.dispose();
	          hasValue && o.onNext(value);
	          o.onCompleted();
	          hasValue = false;
	          id++;
	        }
	      );
	      return new BinaryDisposable(subscription, cancelable);
	    }, source);
	  }

	  observableProto.debounce = function () {
	    if (isFunction (arguments[0])) {
	      return debounceWithSelector(this, arguments[0]);
	    } else if (typeof arguments[0] === 'number') {
	      return new DebounceObservable(this, arguments[0], arguments[1]);
	    } else {
	      throw new Error('Invalid arguments');
	    }
	  };

	  /**
	   *  Projects each element of an observable sequence into zero or more windows which are produced based on timing information.
	   * @param {Number} timeSpan Length of each window (specified as an integer denoting milliseconds).
	   * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive windows (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent windows.
	   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
	    var source = this, timeShift;
	    timeShiftOrScheduler == null && (timeShift = timeSpan);
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    if (typeof timeShiftOrScheduler === 'number') {
	      timeShift = timeShiftOrScheduler;
	    } else if (isScheduler(timeShiftOrScheduler)) {
	      timeShift = timeSpan;
	      scheduler = timeShiftOrScheduler;
	    }
	    return new AnonymousObservable(function (observer) {
	      var groupDisposable,
	        nextShift = timeShift,
	        nextSpan = timeSpan,
	        q = [],
	        refCountDisposable,
	        timerD = new SerialDisposable(),
	        totalTime = 0;
	        groupDisposable = new CompositeDisposable(timerD),
	        refCountDisposable = new RefCountDisposable(groupDisposable);

	       function createTimer () {
	        var m = new SingleAssignmentDisposable(),
	          isSpan = false,
	          isShift = false;
	        timerD.setDisposable(m);
	        if (nextSpan === nextShift) {
	          isSpan = true;
	          isShift = true;
	        } else if (nextSpan < nextShift) {
	            isSpan = true;
	        } else {
	          isShift = true;
	        }
	        var newTotalTime = isSpan ? nextSpan : nextShift,
	          ts = newTotalTime - totalTime;
	        totalTime = newTotalTime;
	        if (isSpan) {
	          nextSpan += timeShift;
	        }
	        if (isShift) {
	          nextShift += timeShift;
	        }
	        m.setDisposable(scheduler.scheduleFuture(null, ts, function () {
	          if (isShift) {
	            var s = new Subject();
	            q.push(s);
	            observer.onNext(addRef(s, refCountDisposable));
	          }
	          isSpan && q.shift().onCompleted();
	          createTimer();
	        }));
	      };
	      q.push(new Subject());
	      observer.onNext(addRef(q[0], refCountDisposable));
	      createTimer();
	      groupDisposable.add(source.subscribe(
	        function (x) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
	        },
	        function (e) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onError(e); }
	          observer.onError(e);
	        },
	        function () {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onCompleted(); }
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };

	  /**
	   *  Projects each element of an observable sequence into a window that is completed when either it's full or a given amount of time has elapsed.
	   * @param {Number} timeSpan Maximum time length of a window.
	   * @param {Number} count Maximum element count of a window.
	   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithTimeOrCount = function (timeSpan, count, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new AnonymousObservable(function (observer) {
	      var timerD = new SerialDisposable(),
	          groupDisposable = new CompositeDisposable(timerD),
	          refCountDisposable = new RefCountDisposable(groupDisposable),
	          n = 0,
	          windowId = 0,
	          s = new Subject();

	      function createTimer(id) {
	        var m = new SingleAssignmentDisposable();
	        timerD.setDisposable(m);
	        m.setDisposable(scheduler.scheduleFuture(null, timeSpan, function () {
	          if (id !== windowId) { return; }
	          n = 0;
	          var newId = ++windowId;
	          s.onCompleted();
	          s = new Subject();
	          observer.onNext(addRef(s, refCountDisposable));
	          createTimer(newId);
	        }));
	      }

	      observer.onNext(addRef(s, refCountDisposable));
	      createTimer(0);

	      groupDisposable.add(source.subscribe(
	        function (x) {
	          var newId = 0, newWindow = false;
	          s.onNext(x);
	          if (++n === count) {
	            newWindow = true;
	            n = 0;
	            newId = ++windowId;
	            s.onCompleted();
	            s = new Subject();
	            observer.onNext(addRef(s, refCountDisposable));
	          }
	          newWindow && createTimer(newId);
	        },
	        function (e) {
	          s.onError(e);
	          observer.onError(e);
	        }, function () {
	          s.onCompleted();
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };

	  function toArray(x) { return x.toArray(); }

	  /**
	   *  Projects each element of an observable sequence into zero or more buffers which are produced based on timing information.
	   * @param {Number} timeSpan Length of each buffer (specified as an integer denoting milliseconds).
	   * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive buffers (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent buffers.
	   * @param {Scheduler} [scheduler]  Scheduler to run buffer timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of buffers.
	   */
	  observableProto.bufferWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
	    return this.windowWithTime(timeSpan, timeShiftOrScheduler, scheduler).flatMap(toArray);
	  };

	  function toArray(x) { return x.toArray(); }

	  /**
	   *  Projects each element of an observable sequence into a buffer that is completed when either it's full or a given amount of time has elapsed.
	   * @param {Number} timeSpan Maximum time length of a buffer.
	   * @param {Number} count Maximum element count of a buffer.
	   * @param {Scheduler} [scheduler]  Scheduler to run bufferin timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of buffers.
	   */
	  observableProto.bufferWithTimeOrCount = function (timeSpan, count, scheduler) {
	    return this.windowWithTimeOrCount(timeSpan, count, scheduler).flatMap(toArray);
	  };

	  var TimeIntervalObservable = (function (__super__) {
	    inherits(TimeIntervalObservable, __super__);
	    function TimeIntervalObservable(source, s) {
	      this.source = source;
	      this._s = s;
	      __super__.call(this);
	    }

	    TimeIntervalObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TimeIntervalObserver(o, this._s));
	    };

	    return TimeIntervalObservable;
	  }(ObservableBase));

	  var TimeIntervalObserver = (function (__super__) {
	    inherits(TimeIntervalObserver, __super__);

	    function TimeIntervalObserver(o, s) {
	      this._o = o;
	      this._s = s;
	      this._l = s.now();
	      __super__.call(this);
	    }

	    TimeIntervalObserver.prototype.next = function (x) {
	      var now = this._s.now(), span = now - this._l;
	      this._l = now;
	      this._o.onNext({ value: x, interval: span });
	    };
	    TimeIntervalObserver.prototype.error = function (e) { this._o.onError(e); };
	    TimeIntervalObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return TimeIntervalObserver;
	  }(AbstractObserver));

	  /**
	   *  Records the time interval between consecutive values in an observable sequence.
	   *
	   * @example
	   *  1 - res = source.timeInterval();
	   *  2 - res = source.timeInterval(Rx.Scheduler.timeout);
	   *
	   * @param [scheduler]  Scheduler used to compute time intervals. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence with time interval information on values.
	   */
	  observableProto.timeInterval = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new TimeIntervalObservable(this, scheduler);
	  };

	  var TimestampObservable = (function (__super__) {
	    inherits(TimestampObservable, __super__);
	    function TimestampObservable(source, s) {
	      this.source = source;
	      this._s = s;
	      __super__.call(this);
	    }

	    TimestampObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TimestampObserver(o, this._s));
	    };

	    return TimestampObservable;
	  }(ObservableBase));

	  var TimestampObserver = (function (__super__) {
	    inherits(TimestampObserver, __super__);
	    function TimestampObserver(o, s) {
	      this._o = o;
	      this._s = s;
	      __super__.call(this);
	    }

	    TimestampObserver.prototype.next = function (x) {
	      this._o.onNext({ value: x, timestamp: this._s.now() });
	    };

	    TimestampObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };

	    TimestampObserver.prototype.completed = function () {
	      this._o.onCompleted();
	    };

	    return TimestampObserver;
	  }(AbstractObserver));

	  /**
	   *  Records the timestamp for each value in an observable sequence.
	   *
	   * @example
	   *  1 - res = source.timestamp(); // produces { value: x, timestamp: ts }
	   *  2 - res = source.timestamp(Rx.Scheduler.default);
	   *
	   * @param {Scheduler} [scheduler]  Scheduler used to compute timestamps. If not specified, the default scheduler is used.
	   * @returns {Observable} An observable sequence with timestamp information on values.
	   */
	  observableProto.timestamp = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new TimestampObservable(this, scheduler);
	  };

	  function sampleObservable(source, sampler) {
	    return new AnonymousObservable(function (o) {
	      var atEnd = false, value, hasValue = false;

	      function sampleSubscribe() {
	        if (hasValue) {
	          hasValue = false;
	          o.onNext(value);
	        }
	        atEnd && o.onCompleted();
	      }

	      var sourceSubscription = new SingleAssignmentDisposable();
	      sourceSubscription.setDisposable(source.subscribe(
	        function (newValue) {
	          hasValue = true;
	          value = newValue;
	        },
	        function (e) { o.onError(e); },
	        function () {
	          atEnd = true;
	          sourceSubscription.dispose();
	        }
	      ));

	      return new BinaryDisposable(
	        sourceSubscription,
	        sampler.subscribe(sampleSubscribe, function (e) { o.onError(e); }, sampleSubscribe)
	      );
	    }, source);
	  }

	  /**
	   *  Samples the observable sequence at each interval.
	   *
	   * @example
	   *  1 - res = source.sample(sampleObservable); // Sampler tick sequence
	   *  2 - res = source.sample(5000); // 5 seconds
	   *  2 - res = source.sample(5000, Rx.Scheduler.timeout); // 5 seconds
	   *
	   * @param {Mixed} intervalOrSampler Interval at which to sample (specified as an integer denoting milliseconds) or Sampler Observable.
	   * @param {Scheduler} [scheduler]  Scheduler to run the sampling timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Sampled observable sequence.
	   */
	  observableProto.sample = observableProto.throttleLatest = function (intervalOrSampler, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return typeof intervalOrSampler === 'number' ?
	      sampleObservable(this, observableinterval(intervalOrSampler, scheduler)) :
	      sampleObservable(this, intervalOrSampler);
	  };

	  var TimeoutError = Rx.TimeoutError = function(message) {
	    this.message = message || 'Timeout has occurred';
	    this.name = 'TimeoutError';
	    Error.call(this);
	  };
	  TimeoutError.prototype = Object.create(Error.prototype);

	  function timeoutWithSelector(source, firstTimeout, timeoutDurationSelector, other) {
	    if (isFunction(firstTimeout)) {
	      other = timeoutDurationSelector;
	      timeoutDurationSelector = firstTimeout;
	      firstTimeout = observableNever();
	    }
	    Observable.isObservable(other) || (other = observableThrow(new TimeoutError()));
	    return new AnonymousObservable(function (o) {
	      var subscription = new SerialDisposable(),
	        timer = new SerialDisposable(),
	        original = new SingleAssignmentDisposable();

	      subscription.setDisposable(original);

	      var id = 0, switched = false;

	      function setTimer(timeout) {
	        var myId = id, d = new SingleAssignmentDisposable();

	        function timerWins() {
	          switched = (myId === id);
	          return switched;
	        }

	        timer.setDisposable(d);
	        d.setDisposable(timeout.subscribe(function () {
	          timerWins() && subscription.setDisposable(other.subscribe(o));
	          d.dispose();
	        }, function (e) {
	          timerWins() && o.onError(e);
	        }, function () {
	          timerWins() && subscription.setDisposable(other.subscribe(o));
	        }));
	      };

	      setTimer(firstTimeout);

	      function oWins() {
	        var res = !switched;
	        if (res) { id++; }
	        return res;
	      }

	      original.setDisposable(source.subscribe(function (x) {
	        if (oWins()) {
	          o.onNext(x);
	          var timeout = tryCatch(timeoutDurationSelector)(x);
	          if (timeout === errorObj) { return o.onError(timeout.e); }
	          setTimer(isPromise(timeout) ? observableFromPromise(timeout) : timeout);
	        }
	      }, function (e) {
	        oWins() && o.onError(e);
	      }, function () {
	        oWins() && o.onCompleted();
	      }));
	      return new BinaryDisposable(subscription, timer);
	    }, source);
	  }

	  function timeout(source, dueTime, other, scheduler) {
	    if (isScheduler(other)) {
	      scheduler = other;
	      other = observableThrow(new TimeoutError());
	    }
	    if (other instanceof Error) { other = observableThrow(other); }
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    Observable.isObservable(other) || (other = observableThrow(new TimeoutError()));
	    return new AnonymousObservable(function (o) {
	      var id = 0,
	        original = new SingleAssignmentDisposable(),
	        subscription = new SerialDisposable(),
	        switched = false,
	        timer = new SerialDisposable();

	      subscription.setDisposable(original);

	      function createTimer() {
	        var myId = id;
	        timer.setDisposable(scheduler.scheduleFuture(null, dueTime, function () {
	          switched = id === myId;
	          if (switched) {
	            isPromise(other) && (other = observableFromPromise(other));
	            subscription.setDisposable(other.subscribe(o));
	          }
	        }));
	      }

	      createTimer();

	      original.setDisposable(source.subscribe(function (x) {
	        if (!switched) {
	          id++;
	          o.onNext(x);
	          createTimer();
	        }
	      }, function (e) {
	        if (!switched) {
	          id++;
	          o.onError(e);
	        }
	      }, function () {
	        if (!switched) {
	          id++;
	          o.onCompleted();
	        }
	      }));
	      return new BinaryDisposable(subscription, timer);
	    }, source);
	  }

	  observableProto.timeout = function () {
	    var firstArg = arguments[0];
	    if (firstArg instanceof Date || typeof firstArg === 'number') {
	      return timeout(this, firstArg, arguments[1], arguments[2]);
	    } else if (Observable.isObservable(firstArg) || isFunction(firstArg)) {
	      return timeoutWithSelector(this, firstArg, arguments[1], arguments[2]);
	    } else {
	      throw new Error('Invalid arguments');
	    }
	  };

	  var GenerateAbsoluteObservable = (function (__super__) {
	    inherits(GenerateAbsoluteObservable, __super__);
	    function GenerateAbsoluteObservable(state, cndFn, itrFn, resFn, timeFn, s) {
	      this._state = state;
	      this._cndFn = cndFn;
	      this._itrFn = itrFn;
	      this._resFn = resFn;
	      this._timeFn = timeFn;
	      this._s = s;
	      this._first = true;
	      this._hasResult = false;
	      __super__.call(this);
	    }

	    function scheduleRecursive(self, recurse) {
	      self._hasResult && self._o.onNext(self._state);

	      if (self._first) {
	        self._first = false;
	      } else {
	        self._state = tryCatch(self._itrFn)(self._state);
	        if (self._state === errorObj) { return self._o.onError(self._state.e); }
	      }
	      self._hasResult = tryCatch(self._cndFn)(self._state);
	      if (self._hasResult === errorObj) { return self._o.onError(self._hasResult.e); }
	      if (self._hasResult) {
	        var result = tryCatch(self._resFn)(self._state);
	        if (result === errorObj) { return self._o.onError(result.e); }
	        var time = tryCatch(self._timeFn)(self._state);
	        if (time === errorObj) { return self._o.onError(time.e); }
	        recurse(self, time);
	      } else {
	        self._o.onCompleted();
	      }
	    }

	    GenerateAbsoluteObservable.prototype.subscribeCore = function (o) {
	      this._o = o;
	      return this._s.scheduleRecursiveFuture(this, new Date(this._s.now()), scheduleRecursive);
	    };

	    return GenerateAbsoluteObservable;
	  }(ObservableBase));

	  /**
	   *  GenerateAbsolutes an observable sequence by iterating a state from an initial state until the condition fails.
	   *
	   * @example
	   *  res = source.generateWithAbsoluteTime(0,
	   *      function (x) { return return true; },
	   *      function (x) { return x + 1; },
	   *      function (x) { return x; },
	   *      function (x) { return new Date(); }
	   *  });
	   *
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning Date values.
	   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generateWithAbsoluteTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new GenerateAbsoluteObservable(initialState, condition, iterate, resultSelector, timeSelector, scheduler);
	  };

	  var GenerateRelativeObservable = (function (__super__) {
	    inherits(GenerateRelativeObservable, __super__);
	    function GenerateRelativeObservable(state, cndFn, itrFn, resFn, timeFn, s) {
	      this._state = state;
	      this._cndFn = cndFn;
	      this._itrFn = itrFn;
	      this._resFn = resFn;
	      this._timeFn = timeFn;
	      this._s = s;
	      this._first = true;
	      this._hasResult = false;
	      __super__.call(this);
	    }

	    function scheduleRecursive(self, recurse) {
	      self._hasResult && self._o.onNext(self._state);

	      if (self._first) {
	        self._first = false;
	      } else {
	        self._state = tryCatch(self._itrFn)(self._state);
	        if (self._state === errorObj) { return self._o.onError(self._state.e); }
	      }
	      self._hasResult = tryCatch(self._cndFn)(self._state);
	      if (self._hasResult === errorObj) { return self._o.onError(self._hasResult.e); }
	      if (self._hasResult) {
	        var result = tryCatch(self._resFn)(self._state);
	        if (result === errorObj) { return self._o.onError(result.e); }
	        var time = tryCatch(self._timeFn)(self._state);
	        if (time === errorObj) { return self._o.onError(time.e); }
	        recurse(self, time);
	      } else {
	        self._o.onCompleted();
	      }
	    }

	    GenerateRelativeObservable.prototype.subscribeCore = function (o) {
	      this._o = o;
	      return this._s.scheduleRecursiveFuture(this, 0, scheduleRecursive);
	    };

	    return GenerateRelativeObservable;
	  }(ObservableBase));

	  /**
	   *  Generates an observable sequence by iterating a state from an initial state until the condition fails.
	   *
	   * @example
	   *  res = source.generateWithRelativeTime(0,
	   *      function (x) { return return true; },
	   *      function (x) { return x + 1; },
	   *      function (x) { return x; },
	   *      function (x) { return 500; }
	   *  );
	   *
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning integer values denoting milliseconds.
	   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generateWithRelativeTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new GenerateRelativeObservable(initialState, condition, iterate, resultSelector, timeSelector, scheduler);
	  };

	  var DelaySubscription = (function(__super__) {
	    inherits(DelaySubscription, __super__);
	    function DelaySubscription(source, dt, s) {
	      this.source = source;
	      this._dt = dt;
	      this._s = s;
	      __super__.call(this);
	    }

	    DelaySubscription.prototype.subscribeCore = function (o) {
	      var d = new SerialDisposable();

	      d.setDisposable(this._s.scheduleFuture([this.source, o, d], this._dt, scheduleMethod));

	      return d;
	    };

	    function scheduleMethod(s, state) {
	      var source = state[0], o = state[1], d = state[2];
	      d.setDisposable(source.subscribe(o));
	    }

	    return DelaySubscription;
	  }(ObservableBase));

	  /**
	   *  Time shifts the observable sequence by delaying the subscription with the specified relative time duration, using the specified scheduler to run timers.
	   *
	   * @example
	   *  1 - res = source.delaySubscription(5000); // 5s
	   *  2 - res = source.delaySubscription(5000, Rx.Scheduler.default); // 5 seconds
	   *
	   * @param {Number} dueTime Relative or absolute time shift of the subscription.
	   * @param {Scheduler} [scheduler]  Scheduler to run the subscription delay timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Time-shifted sequence.
	   */
	  observableProto.delaySubscription = function (dueTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new DelaySubscription(this, dueTime, scheduler);
	  };

	  var SkipLastWithTimeObservable = (function (__super__) {
	    inherits(SkipLastWithTimeObservable, __super__);
	    function SkipLastWithTimeObservable(source, d, s) {
	      this.source = source;
	      this._d = d;
	      this._s = s;
	      __super__.call(this);
	    }

	    SkipLastWithTimeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SkipLastWithTimeObserver(o, this));
	    };

	    return SkipLastWithTimeObservable;
	  }(ObservableBase));

	  var SkipLastWithTimeObserver = (function (__super__) {
	    inherits(SkipLastWithTimeObserver, __super__);

	    function SkipLastWithTimeObserver(o, p) {
	      this._o = o;
	      this._s = p._s;
	      this._d = p._d;
	      this._q = [];
	      __super__.call(this);
	    }

	    SkipLastWithTimeObserver.prototype.next = function (x) {
	      var now = this._s.now();
	      this._q.push({ interval: now, value: x });
	      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
	        this._o.onNext(this._q.shift().value);
	      }
	    };
	    SkipLastWithTimeObserver.prototype.error = function (e) { this._o.onError(e); };
	    SkipLastWithTimeObserver.prototype.completed = function () {
	      var now = this._s.now();
	      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
	        this._o.onNext(this._q.shift().value);
	      }
	      this._o.onCompleted();
	    };

	    return SkipLastWithTimeObserver;
	  }(AbstractObserver));

	  /**
	   *  Skips elements for the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for skipping elements from the end of the sequence.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout
	   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the end of the source sequence.
	   */
	  observableProto.skipLastWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new SkipLastWithTimeObservable(this, duration, scheduler);
	  };

	  var TakeLastWithTimeObservable = (function (__super__) {
	    inherits(TakeLastWithTimeObservable, __super__);
	    function TakeLastWithTimeObservable(source, d, s) {
	      this.source = source;
	      this._d = d;
	      this._s = s;
	      __super__.call(this);
	    }

	    TakeLastWithTimeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TakeLastWithTimeObserver(o, this._d, this._s));
	    };

	    return TakeLastWithTimeObservable;
	  }(ObservableBase));

	  var TakeLastWithTimeObserver = (function (__super__) {
	    inherits(TakeLastWithTimeObserver, __super__);

	    function TakeLastWithTimeObserver(o, d, s) {
	      this._o = o;
	      this._d = d;
	      this._s = s;
	      this._q = [];
	      __super__.call(this);
	    }

	    TakeLastWithTimeObserver.prototype.next = function (x) {
	      var now = this._s.now();
	      this._q.push({ interval: now, value: x });
	      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
	        this._q.shift();
	      }
	    };
	    TakeLastWithTimeObserver.prototype.error = function (e) { this._o.onError(e); };
	    TakeLastWithTimeObserver.prototype.completed = function () {
	      var now = this._s.now();
	      while (this._q.length > 0) {
	        var next = this._q.shift();
	        if (now - next.interval <= this._d) { this._o.onNext(next.value); }
	      }
	      this._o.onCompleted();
	    };

	    return TakeLastWithTimeObserver;
	  }(AbstractObserver));

	  /**
	   *  Returns elements within the specified duration from the end of the observable source sequence, using the specified schedulers to run timers and to drain the collected elements.
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the end of the sequence.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the end of the source sequence.
	   */
	  observableProto.takeLastWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new TakeLastWithTimeObservable(this, duration, scheduler);
	  };

	  /**
	   *  Returns an array with the elements within the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the end of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence containing a single array with the elements taken during the specified duration from the end of the source sequence.
	   */
	  observableProto.takeLastBufferWithTime = function (duration, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        var now = scheduler.now();
	        q.push({ interval: now, value: x });
	        while (q.length > 0 && now - q[0].interval >= duration) {
	          q.shift();
	        }
	      }, function (e) { o.onError(e); }, function () {
	        var now = scheduler.now(), res = [];
	        while (q.length > 0) {
	          var next = q.shift();
	          now - next.interval <= duration && res.push(next.value);
	        }
	        o.onNext(res);
	        o.onCompleted();
	      });
	    }, source);
	  };

	  var TakeWithTimeObservable = (function (__super__) {
	    inherits(TakeWithTimeObservable, __super__);
	    function TakeWithTimeObservable(source, d, s) {
	      this.source = source;
	      this._d = d;
	      this._s = s;
	      __super__.call(this);
	    }

	    function scheduleMethod(s, o) {
	      o.onCompleted();
	    }

	    TakeWithTimeObservable.prototype.subscribeCore = function (o) {
	      return new BinaryDisposable(
	        this._s.scheduleFuture(o, this._d, scheduleMethod),
	        this.source.subscribe(o)
	      );
	    };

	    return TakeWithTimeObservable;
	  }(ObservableBase));

	  /**
	   *  Takes elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
	   *
	   * @example
	   *  1 - res = source.takeWithTime(5000,  [optional scheduler]);
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the start of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the start of the source sequence.
	   */
	  observableProto.takeWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new TakeWithTimeObservable(this, duration, scheduler);
	  };

	  var SkipWithTimeObservable = (function (__super__) {
	    inherits(SkipWithTimeObservable, __super__);
	    function SkipWithTimeObservable(source, d, s) {
	      this.source = source;
	      this._d = d;
	      this._s = s;
	      this._open = false;
	      __super__.call(this);
	    }

	    function scheduleMethod(s, self) {
	      self._open = true;
	    }

	    SkipWithTimeObservable.prototype.subscribeCore = function (o) {
	      return new BinaryDisposable(
	        this._s.scheduleFuture(this, this._d, scheduleMethod),
	        this.source.subscribe(new SkipWithTimeObserver(o, this))
	      );
	    };

	    return SkipWithTimeObservable;
	  }(ObservableBase));

	  var SkipWithTimeObserver = (function (__super__) {
	    inherits(SkipWithTimeObserver, __super__);

	    function SkipWithTimeObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      __super__.call(this);
	    }

	    SkipWithTimeObserver.prototype.next = function (x) { this._p._open && this._o.onNext(x); };
	    SkipWithTimeObserver.prototype.error = function (e) { this._o.onError(e); };
	    SkipWithTimeObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return SkipWithTimeObserver;
	  }(AbstractObserver));

	  /**
	   *  Skips elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
	   * @description
	   *  Specifying a zero value for duration doesn't guarantee no elements will be dropped from the start of the source sequence.
	   *  This is a side-effect of the asynchrony introduced by the scheduler, where the action that causes callbacks from the source sequence to be forwarded
	   *  may not execute immediately, despite the zero due time.
	   *
	   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the duration.
	   * @param {Number} duration Duration for skipping elements from the start of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the start of the source sequence.
	   */
	  observableProto.skipWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new SkipWithTimeObservable(this, duration, scheduler);
	  };

	  var SkipUntilWithTimeObservable = (function (__super__) {
	    inherits(SkipUntilWithTimeObservable, __super__);
	    function SkipUntilWithTimeObservable(source, startTime, scheduler) {
	      this.source = source;
	      this._st = startTime;
	      this._s = scheduler;
	      __super__.call(this);
	    }

	    function scheduleMethod(s, state) {
	      state._open = true;
	    }

	    SkipUntilWithTimeObservable.prototype.subscribeCore = function (o) {
	      this._open = false;
	      return new BinaryDisposable(
	        this._s.scheduleFuture(this, this._st, scheduleMethod),
	        this.source.subscribe(new SkipUntilWithTimeObserver(o, this))
	      );
	    };

	    return SkipUntilWithTimeObservable;
	  }(ObservableBase));

	  var SkipUntilWithTimeObserver = (function (__super__) {
	    inherits(SkipUntilWithTimeObserver, __super__);

	    function SkipUntilWithTimeObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      __super__.call(this);
	    }

	    SkipUntilWithTimeObserver.prototype.next = function (x) { this._p._open && this._o.onNext(x); };
	    SkipUntilWithTimeObserver.prototype.error = function (e) { this._o.onError(e); };
	    SkipUntilWithTimeObserver.prototype.completed = function () { this._o.onCompleted(); };

	    return SkipUntilWithTimeObserver;
	  }(AbstractObserver));


	  /**
	   *  Skips elements from the observable source sequence until the specified start time, using the specified scheduler to run timers.
	   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the start time.
	   *
	   * @examples
	   *  1 - res = source.skipUntilWithTime(new Date(), [scheduler]);
	   *  2 - res = source.skipUntilWithTime(5000, [scheduler]);
	   * @param {Date|Number} startTime Time to start taking elements from the source sequence. If this value is less than or equal to Date(), no elements will be skipped.
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements skipped until the specified start time.
	   */
	  observableProto.skipUntilWithTime = function (startTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new SkipUntilWithTimeObservable(this, startTime, scheduler);
	  };

	  /**
	   *  Takes elements for the specified duration until the specified end time, using the specified scheduler to run timers.
	   * @param {Number | Date} endTime Time to stop taking elements from the source sequence. If this value is less than or equal to new Date(), the result stream will complete immediately.
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on.
	   * @returns {Observable} An observable sequence with the elements taken until the specified end time.
	   */
	  observableProto.takeUntilWithTime = function (endTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return new BinaryDisposable(
	        scheduler.scheduleFuture(o, endTime, function (_, o) { o.onCompleted(); }),
	        source.subscribe(o));
	    }, source);
	  };

	  /**
	   * Returns an Observable that emits only the first item emitted by the source Observable during sequential time windows of a specified duration.
	   * @param {Number} windowDuration time to wait before emitting another item after emitting the last item
	   * @param {Scheduler} [scheduler] the Scheduler to use internally to manage the timers that handle timeout for each item. If not provided, defaults to Scheduler.timeout.
	   * @returns {Observable} An Observable that performs the throttle operation.
	   */
	  observableProto.throttle = function (windowDuration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    var duration = +windowDuration || 0;
	    if (duration <= 0) { throw new RangeError('windowDuration cannot be less or equal zero.'); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var lastOnNext = 0;
	      return source.subscribe(
	        function (x) {
	          var now = scheduler.now();
	          if (lastOnNext === 0 || now - lastOnNext >= duration) {
	            lastOnNext = now;
	            o.onNext(x);
	          }
	        },function (e) { o.onError(e); }, function () { o.onCompleted(); }
	      );
	    }, source);
	  };

	  var TransduceObserver = (function (__super__) {
	    inherits(TransduceObserver, __super__);
	    function TransduceObserver(o, xform) {
	      this._o = o;
	      this._xform = xform;
	      __super__.call(this);
	    }

	    TransduceObserver.prototype.next = function (x) {
	      var res = tryCatch(this._xform['@@transducer/step']).call(this._xform, this._o, x);
	      if (res === errorObj) { this._o.onError(res.e); }
	    };

	    TransduceObserver.prototype.error = function (e) { this._o.onError(e); };

	    TransduceObserver.prototype.completed = function () {
	      this._xform['@@transducer/result'](this._o);
	    };

	    return TransduceObserver;
	  }(AbstractObserver));

	  function transformForObserver(o) {
	    return {
	      '@@transducer/init': function() {
	        return o;
	      },
	      '@@transducer/step': function(obs, input) {
	        return obs.onNext(input);
	      },
	      '@@transducer/result': function(obs) {
	        return obs.onCompleted();
	      }
	    };
	  }

	  /**
	   * Executes a transducer to transform the observable sequence
	   * @param {Transducer} transducer A transducer to execute
	   * @returns {Observable} An Observable sequence containing the results from the transducer.
	   */
	  observableProto.transduce = function(transducer) {
	    var source = this;
	    return new AnonymousObservable(function(o) {
	      var xform = transducer(transformForObserver(o));
	      return source.subscribe(new TransduceObserver(o, xform));
	    }, source);
	  };

	  var SwitchFirstObservable = (function (__super__) {
	    inherits(SwitchFirstObservable, __super__);
	    function SwitchFirstObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }

	    SwitchFirstObservable.prototype.subscribeCore = function (o) {
	      var m = new SingleAssignmentDisposable(),
	        g = new CompositeDisposable(),
	        state = {
	          hasCurrent: false,
	          isStopped: false,
	          o: o,
	          g: g
	        };

	      g.add(m);
	      m.setDisposable(this.source.subscribe(new SwitchFirstObserver(state)));
	      return g;
	    };

	    return SwitchFirstObservable;
	  }(ObservableBase));

	  var SwitchFirstObserver = (function(__super__) {
	    inherits(SwitchFirstObserver, __super__);
	    function SwitchFirstObserver(state) {
	      this._s = state;
	      __super__.call(this);
	    }

	    SwitchFirstObserver.prototype.next = function (x) {
	      if (!this._s.hasCurrent) {
	        this._s.hasCurrent = true;
	        isPromise(x) && (x = observableFromPromise(x));
	        var inner = new SingleAssignmentDisposable();
	        this._s.g.add(inner);
	        inner.setDisposable(x.subscribe(new InnerObserver(this._s, inner)));
	      }
	    };

	    SwitchFirstObserver.prototype.error = function (e) {
	      this._s.o.onError(e);
	    };

	    SwitchFirstObserver.prototype.completed = function () {
	      this._s.isStopped = true;
	      !this._s.hasCurrent && this._s.g.length === 1 && this._s.o.onCompleted();
	    };

	    inherits(InnerObserver, __super__);
	    function InnerObserver(state, inner) {
	      this._s = state;
	      this._i = inner;
	      __super__.call(this);
	    }

	    InnerObserver.prototype.next = function (x) { this._s.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) { this._s.o.onError(e); };
	    InnerObserver.prototype.completed = function () {
	      this._s.g.remove(this._i);
	      this._s.hasCurrent = false;
	      this._s.isStopped && this._s.g.length === 1 && this._s.o.onCompleted();
	    };

	    return SwitchFirstObserver;
	  }(AbstractObserver));

	  /**
	   * Performs a exclusive waiting for the first to finish before subscribing to another observable.
	   * Observables that come in between subscriptions will be dropped on the floor.
	   * @returns {Observable} A exclusive observable with only the results that happen when subscribed.
	   */
	  observableProto.switchFirst = function () {
	    return new SwitchFirstObservable(this);
	  };

	observableProto.flatMapFirst = observableProto.selectManyFirst = function(selector, resultSelector, thisArg) {
	    return new FlatMapObservable(this, selector, resultSelector, thisArg).switchFirst();
	};

	Rx.Observable.prototype.flatMapWithMaxConcurrent = function(limit, selector, resultSelector, thisArg) {
	    return new FlatMapObservable(this, selector, resultSelector, thisArg).merge(limit);
	};
	  /** Provides a set of extension methods for virtual time scheduling. */
	  var VirtualTimeScheduler = Rx.VirtualTimeScheduler = (function (__super__) {
	    inherits(VirtualTimeScheduler, __super__);

	    /**
	     * Creates a new virtual time scheduler with the specified initial clock value and absolute time comparer.
	     *
	     * @constructor
	     * @param {Number} initialClock Initial value for the clock.
	     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
	     */
	    function VirtualTimeScheduler(initialClock, comparer) {
	      this.clock = initialClock;
	      this.comparer = comparer;
	      this.isEnabled = false;
	      this.queue = new PriorityQueue(1024);
	      __super__.call(this);
	    }

	    var VirtualTimeSchedulerPrototype = VirtualTimeScheduler.prototype;

	    VirtualTimeSchedulerPrototype.now = function () {
	      return this.toAbsoluteTime(this.clock);
	    };

	    VirtualTimeSchedulerPrototype.schedule = function (state, action) {
	      return this.scheduleAbsolute(state, this.clock, action);
	    };

	    VirtualTimeSchedulerPrototype.scheduleFuture = function (state, dueTime, action) {
	      var dt = dueTime instanceof Date ?
	        this.toRelativeTime(dueTime - this.now()) :
	        this.toRelativeTime(dueTime);

	      return this.scheduleRelative(state, dt, action);
	    };

	    /**
	     * Adds a relative time value to an absolute time value.
	     * @param {Number} absolute Absolute virtual time value.
	     * @param {Number} relative Relative virtual time value to add.
	     * @return {Number} Resulting absolute virtual time sum value.
	     */
	    VirtualTimeSchedulerPrototype.add = notImplemented;

	    /**
	     * Converts an absolute time to a number
	     * @param {Any} The absolute time.
	     * @returns {Number} The absolute time in ms
	     */
	    VirtualTimeSchedulerPrototype.toAbsoluteTime = notImplemented;

	    /**
	     * Converts the TimeSpan value to a relative virtual time value.
	     * @param {Number} timeSpan TimeSpan value to convert.
	     * @return {Number} Corresponding relative virtual time value.
	     */
	    VirtualTimeSchedulerPrototype.toRelativeTime = notImplemented;

	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be emulated using recursive scheduling.
	     * @param {Mixed} state Initial state passed to the action upon the first iteration.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed, potentially updating the state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.schedulePeriodic = function (state, period, action) {
	      var s = new SchedulePeriodicRecursive(this, state, period, action);
	      return s.start();
	    };

	    /**
	     * Schedules an action to be executed after dueTime.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Number} dueTime Relative time after which to execute the action.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.scheduleRelative = function (state, dueTime, action) {
	      var runAt = this.add(this.clock, dueTime);
	      return this.scheduleAbsolute(state, runAt, action);
	    };

	    /**
	     * Starts the virtual time scheduler.
	     */
	    VirtualTimeSchedulerPrototype.start = function () {
	      if (!this.isEnabled) {
	        this.isEnabled = true;
	        do {
	          var next = this.getNext();
	          if (next !== null) {
	            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
	            next.invoke();
	          } else {
	            this.isEnabled = false;
	          }
	        } while (this.isEnabled);
	      }
	    };

	    /**
	     * Stops the virtual time scheduler.
	     */
	    VirtualTimeSchedulerPrototype.stop = function () {
	      this.isEnabled = false;
	    };

	    /**
	     * Advances the scheduler's clock to the specified time, running all work till that point.
	     * @param {Number} time Absolute time to advance the scheduler's clock to.
	     */
	    VirtualTimeSchedulerPrototype.advanceTo = function (time) {
	      var dueToClock = this.comparer(this.clock, time);
	      if (this.comparer(this.clock, time) > 0) { throw new ArgumentOutOfRangeError(); }
	      if (dueToClock === 0) { return; }
	      if (!this.isEnabled) {
	        this.isEnabled = true;
	        do {
	          var next = this.getNext();
	          if (next !== null && this.comparer(next.dueTime, time) <= 0) {
	            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
	            next.invoke();
	          } else {
	            this.isEnabled = false;
	          }
	        } while (this.isEnabled);
	        this.clock = time;
	      }
	    };

	    /**
	     * Advances the scheduler's clock by the specified relative time, running all work scheduled for that timespan.
	     * @param {Number} time Relative time to advance the scheduler's clock by.
	     */
	    VirtualTimeSchedulerPrototype.advanceBy = function (time) {
	      var dt = this.add(this.clock, time),
	          dueToClock = this.comparer(this.clock, dt);
	      if (dueToClock > 0) { throw new ArgumentOutOfRangeError(); }
	      if (dueToClock === 0) {  return; }

	      this.advanceTo(dt);
	    };

	    /**
	     * Advances the scheduler's clock by the specified relative time.
	     * @param {Number} time Relative time to advance the scheduler's clock by.
	     */
	    VirtualTimeSchedulerPrototype.sleep = function (time) {
	      var dt = this.add(this.clock, time);
	      if (this.comparer(this.clock, dt) >= 0) { throw new ArgumentOutOfRangeError(); }

	      this.clock = dt;
	    };

	    /**
	     * Gets the next scheduled item to be executed.
	     * @returns {ScheduledItem} The next scheduled item.
	     */
	    VirtualTimeSchedulerPrototype.getNext = function () {
	      while (this.queue.length > 0) {
	        var next = this.queue.peek();
	        if (next.isCancelled()) {
	          this.queue.dequeue();
	        } else {
	          return next;
	        }
	      }
	      return null;
	    };

	    /**
	     * Schedules an action to be executed at dueTime.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Number} dueTime Absolute time at which to execute the action.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.scheduleAbsolute = function (state, dueTime, action) {
	      var self = this;

	      function run(scheduler, state1) {
	        self.queue.remove(si);
	        return action(scheduler, state1);
	      }

	      var si = new ScheduledItem(this, state, run, dueTime, this.comparer);
	      this.queue.enqueue(si);

	      return si.disposable;
	    };

	    return VirtualTimeScheduler;
	  }(Scheduler));

	  /** Provides a virtual time scheduler that uses Date for absolute time and number for relative time. */
	  Rx.HistoricalScheduler = (function (__super__) {
	    inherits(HistoricalScheduler, __super__);

	    /**
	     * Creates a new historical scheduler with the specified initial clock value.
	     * @constructor
	     * @param {Number} initialClock Initial value for the clock.
	     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
	     */
	    function HistoricalScheduler(initialClock, comparer) {
	      var clock = initialClock == null ? 0 : initialClock;
	      var cmp = comparer || defaultSubComparer;
	      __super__.call(this, clock, cmp);
	    }

	    var HistoricalSchedulerProto = HistoricalScheduler.prototype;

	    /**
	     * Adds a relative time value to an absolute time value.
	     * @param {Number} absolute Absolute virtual time value.
	     * @param {Number} relative Relative virtual time value to add.
	     * @return {Number} Resulting absolute virtual time sum value.
	     */
	    HistoricalSchedulerProto.add = function (absolute, relative) {
	      return absolute + relative;
	    };

	    HistoricalSchedulerProto.toAbsoluteTime = function (absolute) {
	      return new Date(absolute).getTime();
	    };

	    /**
	     * Converts the TimeSpan value to a relative virtual time value.
	     * @memberOf HistoricalScheduler
	     * @param {Number} timeSpan TimeSpan value to convert.
	     * @return {Number} Corresponding relative virtual time value.
	     */
	    HistoricalSchedulerProto.toRelativeTime = function (timeSpan) {
	      return timeSpan;
	    };

	    return HistoricalScheduler;
	  }(Rx.VirtualTimeScheduler));

	function OnNextPredicate(predicate) {
	    this.predicate = predicate;
	}

	OnNextPredicate.prototype.equals = function (other) {
	  if (other === this) { return true; }
	  if (other == null) { return false; }
	  if (other.kind !== 'N') { return false; }
	  return this.predicate(other.value);
	};

	function OnErrorPredicate(predicate) {
	  this.predicate = predicate;
	}

	OnErrorPredicate.prototype.equals = function (other) {
	  if (other === this) { return true; }
	  if (other == null) { return false; }
	  if (other.kind !== 'E') { return false; }
	  return this.predicate(other.error);
	};

	var ReactiveTest = Rx.ReactiveTest = {
	  /** Default virtual time used for creation of observable sequences in unit tests. */
	  created: 100,
	  /** Default virtual time used to subscribe to observable sequences in unit tests. */
	  subscribed: 200,
	  /** Default virtual time used to dispose subscriptions in unit tests. */
	  disposed: 1000,

	  /**
	   * Factory method for an OnNext notification record at a given time with a given value or a predicate function.
	   *
	   * 1 - ReactiveTest.onNext(200, 42);
	   * 2 - ReactiveTest.onNext(200, function (x) { return x.length == 2; });
	   *
	   * @param ticks Recorded virtual time the OnNext notification occurs.
	   * @param value Recorded value stored in the OnNext notification or a predicate.
	   * @return Recorded OnNext notification.
	   */
	  onNext: function (ticks, value) {
	    return typeof value === 'function' ?
	      new Recorded(ticks, new OnNextPredicate(value)) :
	      new Recorded(ticks, Notification.createOnNext(value));
	  },
	  /**
	   * Factory method for an OnError notification record at a given time with a given error.
	   *
	   * 1 - ReactiveTest.onNext(200, new Error('error'));
	   * 2 - ReactiveTest.onNext(200, function (e) { return e.message === 'error'; });
	   *
	   * @param ticks Recorded virtual time the OnError notification occurs.
	   * @param exception Recorded exception stored in the OnError notification.
	   * @return Recorded OnError notification.
	   */
	  onError: function (ticks, error) {
	    return typeof error === 'function' ?
	      new Recorded(ticks, new OnErrorPredicate(error)) :
	      new Recorded(ticks, Notification.createOnError(error));
	  },
	  /**
	   * Factory method for an OnCompleted notification record at a given time.
	   *
	   * @param ticks Recorded virtual time the OnCompleted notification occurs.
	   * @return Recorded OnCompleted notification.
	   */
	  onCompleted: function (ticks) {
	    return new Recorded(ticks, Notification.createOnCompleted());
	  },
	  /**
	   * Factory method for a subscription record based on a given subscription and disposal time.
	   *
	   * @param start Virtual time indicating when the subscription was created.
	   * @param end Virtual time indicating when the subscription was disposed.
	   * @return Subscription object.
	   */
	  subscribe: function (start, end) {
	    return new Subscription(start, end);
	  }
	};

	  /**
	   * Creates a new object recording the production of the specified value at the given virtual time.
	   *
	   * @constructor
	   * @param {Number} time Virtual time the value was produced on.
	   * @param {Mixed} value Value that was produced.
	   * @param {Function} comparer An optional comparer.
	   */
	  var Recorded = Rx.Recorded = function (time, value, comparer) {
	    this.time = time;
	    this.value = value;
	    this.comparer = comparer || defaultComparer;
	  };

	  /**
	   * Checks whether the given recorded object is equal to the current instance.
	   *
	   * @param {Recorded} other Recorded object to check for equality.
	   * @returns {Boolean} true if both objects are equal; false otherwise.
	   */
	  Recorded.prototype.equals = function (other) {
	    return this.time === other.time && this.comparer(this.value, other.value);
	  };

	  /**
	   * Returns a string representation of the current Recorded value.
	   *
	   * @returns {String} String representation of the current Recorded value.
	   */
	  Recorded.prototype.toString = function () {
	    return this.value.toString() + '@' + this.time;
	  };

	  /**
	   * Creates a new subscription object with the given virtual subscription and unsubscription time.
	   *
	   * @constructor
	   * @param {Number} subscribe Virtual time at which the subscription occurred.
	   * @param {Number} unsubscribe Virtual time at which the unsubscription occurred.
	   */
	  var Subscription = Rx.Subscription = function (start, end) {
	    this.subscribe = start;
	    this.unsubscribe = end || Number.MAX_VALUE;
	  };

	  /**
	   * Checks whether the given subscription is equal to the current instance.
	   * @param other Subscription object to check for equality.
	   * @returns {Boolean} true if both objects are equal; false otherwise.
	   */
	  Subscription.prototype.equals = function (other) {
	    return this.subscribe === other.subscribe && this.unsubscribe === other.unsubscribe;
	  };

	  /**
	   * Returns a string representation of the current Subscription value.
	   * @returns {String} String representation of the current Subscription value.
	   */
	  Subscription.prototype.toString = function () {
	    return '(' + this.subscribe + ', ' + (this.unsubscribe === Number.MAX_VALUE ? 'Infinite' : this.unsubscribe) + ')';
	  };

	  var MockDisposable = Rx.MockDisposable = function (scheduler) {
	    this.scheduler = scheduler;
	    this.disposes = [];
	    this.disposes.push(this.scheduler.clock);
	  };

	  MockDisposable.prototype.dispose = function () {
	    this.disposes.push(this.scheduler.clock);
	  };

	  var MockObserver = (function (__super__) {
	    inherits(MockObserver, __super__);

	    function MockObserver(scheduler) {
	      __super__.call(this);
	      this.scheduler = scheduler;
	      this.messages = [];
	    }

	    var MockObserverPrototype = MockObserver.prototype;

	    MockObserverPrototype.onNext = function (value) {
	      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnNext(value)));
	    };

	    MockObserverPrototype.onError = function (e) {
	      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnError(e)));
	    };

	    MockObserverPrototype.onCompleted = function () {
	      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnCompleted()));
	    };

	    return MockObserver;
	  })(Observer);

	  function MockPromise(scheduler, messages) {
	    var self = this;
	    this.scheduler = scheduler;
	    this.messages = messages;
	    this.subscriptions = [];
	    this.observers = [];
	    for (var i = 0, len = this.messages.length; i < len; i++) {
	      var message = this.messages[i],
	          notification = message.value;
	      (function (innerNotification) {
	        scheduler.scheduleAbsolute(null, message.time, function () {
	          var obs = self.observers.slice(0);

	          for (var j = 0, jLen = obs.length; j < jLen; j++) {
	            innerNotification.accept(obs[j]);
	          }
	          return disposableEmpty;
	        });
	      })(notification);
	    }
	  }

	  MockPromise.prototype.then = function (onResolved, onRejected) {
	    var self = this;

	    this.subscriptions.push(new Subscription(this.scheduler.clock));
	    var index = this.subscriptions.length - 1;

	    var newPromise;

	    var observer = Rx.Observer.create(
	      function (x) {
	        var retValue = onResolved(x);
	        if (retValue && typeof retValue.then === 'function') {
	          newPromise = retValue;
	        } else {
	          var ticks = self.scheduler.clock;
	          newPromise = new MockPromise(self.scheduler, [Rx.ReactiveTest.onNext(ticks, undefined), Rx.ReactiveTest.onCompleted(ticks)]);
	        }
	        var idx = self.observers.indexOf(observer);
	        self.observers.splice(idx, 1);
	        self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
	      },
	      function (err) {
	        onRejected(err);
	        var idx = self.observers.indexOf(observer);
	        self.observers.splice(idx, 1);
	        self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
	      }
	    );
	    this.observers.push(observer);

	    return newPromise || new MockPromise(this.scheduler, this.messages);
	  };

	  var HotObservable = (function (__super__) {
	    inherits(HotObservable, __super__);

	    function HotObservable(scheduler, messages) {
	      __super__.call(this);
	      var message, notification, observable = this;
	      this.scheduler = scheduler;
	      this.messages = messages;
	      this.subscriptions = [];
	      this.observers = [];
	      for (var i = 0, len = this.messages.length; i < len; i++) {
	        message = this.messages[i];
	        notification = message.value;
	        (function (innerNotification) {
	          scheduler.scheduleAbsolute(null, message.time, function () {
	            var obs = observable.observers.slice(0);

	            for (var j = 0, jLen = obs.length; j < jLen; j++) {
	              innerNotification.accept(obs[j]);
	            }
	            return disposableEmpty;
	          });
	        })(notification);
	      }
	    }

	    HotObservable.prototype._subscribe = function (o) {
	      var observable = this;
	      this.observers.push(o);
	      this.subscriptions.push(new Subscription(this.scheduler.clock));
	      var index = this.subscriptions.length - 1;
	      return disposableCreate(function () {
	        var idx = observable.observers.indexOf(o);
	        observable.observers.splice(idx, 1);
	        observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
	      });
	    };

	    return HotObservable;
	  })(Observable);

	  var ColdObservable = (function (__super__) {
	    inherits(ColdObservable, __super__);

	    function ColdObservable(scheduler, messages) {
	      __super__.call(this);
	      this.scheduler = scheduler;
	      this.messages = messages;
	      this.subscriptions = [];
	    }

	    ColdObservable.prototype._subscribe = function (o) {
	      var message, notification, observable = this;
	      this.subscriptions.push(new Subscription(this.scheduler.clock));
	      var index = this.subscriptions.length - 1;
	      var d = new CompositeDisposable();
	      for (var i = 0, len = this.messages.length; i < len; i++) {
	        message = this.messages[i];
	        notification = message.value;
	        (function (innerNotification) {
	          d.add(observable.scheduler.scheduleRelative(null, message.time, function () {
	            innerNotification.accept(o);
	            return disposableEmpty;
	          }));
	        })(notification);
	      }
	      return disposableCreate(function () {
	        observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
	        d.dispose();
	      });
	    };

	    return ColdObservable;
	  })(Observable);

	  /** Virtual time scheduler used for testing applications and libraries built using Reactive Extensions. */
	  Rx.TestScheduler = (function (__super__) {
	    inherits(TestScheduler, __super__);

	    function baseComparer(x, y) {
	      return x > y ? 1 : (x < y ? -1 : 0);
	    }

	    function TestScheduler() {
	      __super__.call(this, 0, baseComparer);
	    }

	    /**
	     * Schedules an action to be executed at the specified virtual time.
	     *
	     * @param state State passed to the action to be executed.
	     * @param dueTime Absolute virtual time at which to execute the action.
	     * @param action Action to be executed.
	     * @return Disposable object used to cancel the scheduled action (best effort).
	     */
	    TestScheduler.prototype.scheduleAbsolute = function (state, dueTime, action) {
	      dueTime <= this.clock && (dueTime = this.clock + 1);
	      return __super__.prototype.scheduleAbsolute.call(this, state, dueTime, action);
	    };
	    /**
	     * Adds a relative virtual time to an absolute virtual time value.
	     *
	     * @param absolute Absolute virtual time value.
	     * @param relative Relative virtual time value to add.
	     * @return Resulting absolute virtual time sum value.
	     */
	    TestScheduler.prototype.add = function (absolute, relative) {
	      return absolute + relative;
	    };
	    /**
	     * Converts the absolute virtual time value to a DateTimeOffset value.
	     *
	     * @param absolute Absolute virtual time value to convert.
	     * @return Corresponding DateTimeOffset value.
	     */
	    TestScheduler.prototype.toAbsoluteTime = function (absolute) {
	      return new Date(absolute).getTime();
	    };
	    /**
	     * Converts the TimeSpan value to a relative virtual time value.
	     *
	     * @param timeSpan TimeSpan value to convert.
	     * @return Corresponding relative virtual time value.
	     */
	    TestScheduler.prototype.toRelativeTime = function (timeSpan) {
	      return timeSpan;
	    };
	    /**
	     * Starts the test scheduler and uses the specified virtual times to invoke the factory function, subscribe to the resulting sequence, and dispose the subscription.
	     *
	     * @param create Factory method to create an observable sequence.
	     * @param created Virtual time at which to invoke the factory to create an observable sequence.
	     * @param subscribed Virtual time at which to subscribe to the created observable sequence.
	     * @param disposed Virtual time at which to dispose the subscription.
	     * @return Observer with timestamped recordings of notification messages that were received during the virtual time window when the subscription to the source sequence was active.
	     */
	    TestScheduler.prototype.startScheduler = function (createFn, settings) {
	      settings || (settings = {});
	      settings.created == null && (settings.created = ReactiveTest.created);
	      settings.subscribed == null && (settings.subscribed = ReactiveTest.subscribed);
	      settings.disposed == null && (settings.disposed = ReactiveTest.disposed);

	      var observer = this.createObserver(), source, subscription;

	      this.scheduleAbsolute(null, settings.created, function () {
	        source = createFn();
	        return disposableEmpty;
	      });

	      this.scheduleAbsolute(null, settings.subscribed, function () {
	        subscription = source.subscribe(observer);
	        return disposableEmpty;
	      });

	      this.scheduleAbsolute(null, settings.disposed, function () {
	        subscription.dispose();
	        return disposableEmpty;
	      });

	      this.start();

	      return observer;
	    };

	    /**
	     * Creates a hot observable using the specified timestamped notification messages either as an array or arguments.
	     * @param messages Notifications to surface through the created sequence at their specified absolute virtual times.
	     * @return Hot observable sequence that can be used to assert the timing of subscriptions and notifications.
	     */
	    TestScheduler.prototype.createHotObservable = function () {
	      var len = arguments.length, args;
	      if (Array.isArray(arguments[0])) {
	        args = arguments[0];
	      } else {
	        args = new Array(len);
	        for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
	      }
	      return new HotObservable(this, args);
	    };

	    /**
	     * Creates a cold observable using the specified timestamped notification messages either as an array or arguments.
	     * @param messages Notifications to surface through the created sequence at their specified virtual time offsets from the sequence subscription time.
	     * @return Cold observable sequence that can be used to assert the timing of subscriptions and notifications.
	     */
	    TestScheduler.prototype.createColdObservable = function () {
	      var len = arguments.length, args;
	      if (Array.isArray(arguments[0])) {
	        args = arguments[0];
	      } else {
	        args = new Array(len);
	        for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
	      }
	      return new ColdObservable(this, args);
	    };

	    /**
	     * Creates a resolved promise with the given value and ticks
	     * @param {Number} ticks The absolute time of the resolution.
	     * @param {Any} value The value to yield at the given tick.
	     * @returns {MockPromise} A mock Promise which fulfills with the given value.
	     */
	    TestScheduler.prototype.createResolvedPromise = function (ticks, value) {
	      return new MockPromise(this, [Rx.ReactiveTest.onNext(ticks, value), Rx.ReactiveTest.onCompleted(ticks)]);
	    };

	    /**
	     * Creates a rejected promise with the given reason and ticks
	     * @param {Number} ticks The absolute time of the resolution.
	     * @param {Any} reason The reason for rejection to yield at the given tick.
	     * @returns {MockPromise} A mock Promise which rejects with the given reason.
	     */
	    TestScheduler.prototype.createRejectedPromise = function (ticks, reason) {
	      return new MockPromise(this, [Rx.ReactiveTest.onError(ticks, reason)]);
	    };

	    /**
	     * Creates an observer that records received notification messages and timestamps those.
	     * @return Observer that can be used to assert the timing of received notifications.
	     */
	    TestScheduler.prototype.createObserver = function () {
	      return new MockObserver(this);
	    };

	    return TestScheduler;
	  })(VirtualTimeScheduler);

	  var AnonymousObservable = Rx.AnonymousObservable = (function (__super__) {
	    inherits(AnonymousObservable, __super__);

	    // Fix subscriber to check for undefined or function returned to decorate as Disposable
	    function fixSubscriber(subscriber) {
	      return subscriber && isFunction(subscriber.dispose) ? subscriber :
	        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
	    }

	    function setDisposable(s, state) {
	      var ado = state[0], self = state[1];
	      var sub = tryCatch(self.__subscribe).call(self, ado);
	      if (sub === errorObj && !ado.fail(errorObj.e)) { thrower(errorObj.e); }
	      ado.setDisposable(fixSubscriber(sub));
	    }

	    function AnonymousObservable(subscribe, parent) {
	      this.source = parent;
	      this.__subscribe = subscribe;
	      __super__.call(this);
	    }

	    AnonymousObservable.prototype._subscribe = function (o) {
	      var ado = new AutoDetachObserver(o), state = [ado, this];

	      if (currentThreadScheduler.scheduleRequired()) {
	        currentThreadScheduler.schedule(state, setDisposable);
	      } else {
	        setDisposable(null, state);
	      }
	      return ado;
	    };

	    return AnonymousObservable;

	  }(Observable));

	  var AutoDetachObserver = (function (__super__) {
	    inherits(AutoDetachObserver, __super__);

	    function AutoDetachObserver(observer) {
	      __super__.call(this);
	      this.observer = observer;
	      this.m = new SingleAssignmentDisposable();
	    }

	    var AutoDetachObserverPrototype = AutoDetachObserver.prototype;

	    AutoDetachObserverPrototype.next = function (value) {
	      var result = tryCatch(this.observer.onNext).call(this.observer, value);
	      if (result === errorObj) {
	        this.dispose();
	        thrower(result.e);
	      }
	    };

	    AutoDetachObserverPrototype.error = function (err) {
	      var result = tryCatch(this.observer.onError).call(this.observer, err);
	      this.dispose();
	      result === errorObj && thrower(result.e);
	    };

	    AutoDetachObserverPrototype.completed = function () {
	      var result = tryCatch(this.observer.onCompleted).call(this.observer);
	      this.dispose();
	      result === errorObj && thrower(result.e);
	    };

	    AutoDetachObserverPrototype.setDisposable = function (value) { this.m.setDisposable(value); };
	    AutoDetachObserverPrototype.getDisposable = function () { return this.m.getDisposable(); };

	    AutoDetachObserverPrototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this.m.dispose();
	    };

	    return AutoDetachObserver;
	  }(AbstractObserver));

	  var UnderlyingObservable = (function (__super__) {
	    inherits(UnderlyingObservable, __super__);
	    function UnderlyingObservable(m, u) {
	      this._m = m;
	      this._u = u;
	      __super__.call(this);
	    }

	    UnderlyingObservable.prototype.subscribeCore = function (o) {
	      return new BinaryDisposable(this._m.getDisposable(), this._u.subscribe(o));
	    };

	    return UnderlyingObservable;
	  }(ObservableBase));

	  var GroupedObservable = (function (__super__) {
	    inherits(GroupedObservable, __super__);
	    function GroupedObservable(key, underlyingObservable, mergedDisposable) {
	      __super__.call(this);
	      this.key = key;
	      this.underlyingObservable = !mergedDisposable ?
	        underlyingObservable :
	        new UnderlyingObservable(mergedDisposable, underlyingObservable);
	    }

	    GroupedObservable.prototype._subscribe = function (o) {
	      return this.underlyingObservable.subscribe(o);
	    };

	    return GroupedObservable;
	  }(Observable));

	  /**
	   *  Represents an object that is both an observable sequence as well as an observer.
	   *  Each notification is broadcasted to all subscribed observers.
	   */
	  var Subject = Rx.Subject = (function (__super__) {
	    inherits(Subject, __super__);
	    function Subject() {
	      __super__.call(this);
	      this.isDisposed = false;
	      this.isStopped = false;
	      this.observers = [];
	      this.hasError = false;
	    }

	    addProperties(Subject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.observers.push(o);
	          return new InnerSubscription(this, o);
	        }
	        if (this.hasError) {
	          o.onError(this.error);
	          return disposableEmpty;
	        }
	        o.onCompleted();
	        return disposableEmpty;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () { return this.observers.length > 0; },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onCompleted();
	          }

	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.error = error;
	          this.hasError = true;
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onError(error);
	          }

	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onNext(value);
	          }
	        }
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	      }
	    });

	    /**
	     * Creates a subject from the specified observer and observable.
	     * @param {Observer} observer The observer used to send messages to the subject.
	     * @param {Observable} observable The observable used to subscribe to messages sent from the subject.
	     * @returns {Subject} Subject implemented using the given observer and observable.
	     */
	    Subject.create = function (observer, observable) {
	      return new AnonymousSubject(observer, observable);
	    };

	    return Subject;
	  }(Observable));

	  /**
	   *  Represents the result of an asynchronous operation.
	   *  The last value before the OnCompleted notification, or the error received through OnError, is sent to all subscribed observers.
	   */
	  var AsyncSubject = Rx.AsyncSubject = (function (__super__) {
	    inherits(AsyncSubject, __super__);

	    /**
	     * Creates a subject that can only receive one value and that value is cached for all future observations.
	     * @constructor
	     */
	    function AsyncSubject() {
	      __super__.call(this);
	      this.isDisposed = false;
	      this.isStopped = false;
	      this.hasValue = false;
	      this.observers = [];
	      this.hasError = false;
	    }

	    addProperties(AsyncSubject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        checkDisposed(this);

	        if (!this.isStopped) {
	          this.observers.push(o);
	          return new InnerSubscription(this, o);
	        }

	        if (this.hasError) {
	          o.onError(this.error);
	        } else if (this.hasValue) {
	          o.onNext(this.value);
	          o.onCompleted();
	        } else {
	          o.onCompleted();
	        }

	        return disposableEmpty;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () {
	        checkDisposed(this);
	        return this.observers.length > 0;
	      },
	      /**
	       * Notifies all subscribed observers about the end of the sequence, also causing the last received value to be sent out (if any).
	       */
	      onCompleted: function () {
	        var i, len;
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          var os = cloneArray(this.observers), len = os.length;

	          if (this.hasValue) {
	            for (i = 0; i < len; i++) {
	              var o = os[i];
	              o.onNext(this.value);
	              o.onCompleted();
	            }
	          } else {
	            for (i = 0; i < len; i++) {
	              os[i].onCompleted();
	            }
	          }

	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the error.
	       * @param {Mixed} error The Error to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.hasError = true;
	          this.error = error;

	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onError(error);
	          }

	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Sends a value to the subject. The last value received before successful termination will be sent to all subscribed and future observers.
	       * @param {Mixed} value The value to store in the subject.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.value = value;
	        this.hasValue = true;
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	        this.error = null;
	        this.value = null;
	      }
	    });

	    return AsyncSubject;
	  }(Observable));

	  /**
	   *  Represents a value that changes over time.
	   *  Observers can subscribe to the subject to receive the last (or initial) value and all subsequent notifications.
	   */
	  var BehaviorSubject = Rx.BehaviorSubject = (function (__super__) {
	    inherits(BehaviorSubject, __super__);
	    function BehaviorSubject(value) {
	      __super__.call(this);
	      this.value = value;
	      this.observers = [];
	      this.isDisposed = false;
	      this.isStopped = false;
	      this.hasError = false;
	    }

	    addProperties(BehaviorSubject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.observers.push(o);
	          o.onNext(this.value);
	          return new InnerSubscription(this, o);
	        }
	        if (this.hasError) {
	          o.onError(this.error);
	        } else {
	          o.onCompleted();
	        }
	        return disposableEmpty;
	      },
	      /**
	       * Gets the current value or throws an exception.
	       * Value is frozen after onCompleted is called.
	       * After onError is called always throws the specified exception.
	       * An exception is always thrown after dispose is called.
	       * @returns {Mixed} The initial value passed to the constructor until onNext is called; after which, the last value passed to onNext.
	       */
	      getValue: function () {
	        checkDisposed(this);
	        if (this.hasError) { thrower(this.error); }
	        return this.value;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () { return this.observers.length > 0; },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onCompleted();
	        }

	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        this.hasError = true;
	        this.error = error;

	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onError(error);
	        }

	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.value = value;
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onNext(value);
	        }
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	        this.value = null;
	        this.error = null;
	      }
	    });

	    return BehaviorSubject;
	  }(Observable));

	  /**
	   * Represents an object that is both an observable sequence as well as an observer.
	   * Each notification is broadcasted to all subscribed and future observers, subject to buffer trimming policies.
	   */
	  var ReplaySubject = Rx.ReplaySubject = (function (__super__) {

	    var maxSafeInteger = Math.pow(2, 53) - 1;

	    function createRemovableDisposable(subject, observer) {
	      return disposableCreate(function () {
	        observer.dispose();
	        !subject.isDisposed && subject.observers.splice(subject.observers.indexOf(observer), 1);
	      });
	    }

	    inherits(ReplaySubject, __super__);

	    /**
	     *  Initializes a new instance of the ReplaySubject class with the specified buffer size, window size and scheduler.
	     *  @param {Number} [bufferSize] Maximum element count of the replay buffer.
	     *  @param {Number} [windowSize] Maximum time length of the replay buffer.
	     *  @param {Scheduler} [scheduler] Scheduler the observers are invoked on.
	     */
	    function ReplaySubject(bufferSize, windowSize, scheduler) {
	      this.bufferSize = bufferSize == null ? maxSafeInteger : bufferSize;
	      this.windowSize = windowSize == null ? maxSafeInteger : windowSize;
	      this.scheduler = scheduler || currentThreadScheduler;
	      this.q = [];
	      this.observers = [];
	      this.isStopped = false;
	      this.isDisposed = false;
	      this.hasError = false;
	      this.error = null;
	      __super__.call(this);
	    }

	    addProperties(ReplaySubject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        checkDisposed(this);
	        var so = new ScheduledObserver(this.scheduler, o), subscription = createRemovableDisposable(this, so);

	        this._trim(this.scheduler.now());
	        this.observers.push(so);

	        for (var i = 0, len = this.q.length; i < len; i++) {
	          so.onNext(this.q[i].value);
	        }

	        if (this.hasError) {
	          so.onError(this.error);
	        } else if (this.isStopped) {
	          so.onCompleted();
	        }

	        so.ensureActive();
	        return subscription;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () {
	        return this.observers.length > 0;
	      },
	      _trim: function (now) {
	        while (this.q.length > this.bufferSize) {
	          this.q.shift();
	        }
	        while (this.q.length > 0 && (now - this.q[0].interval) > this.windowSize) {
	          this.q.shift();
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        var now = this.scheduler.now();
	        this.q.push({ interval: now, value: value });
	        this._trim(now);

	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onNext(value);
	          observer.ensureActive();
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        this.error = error;
	        this.hasError = true;
	        var now = this.scheduler.now();
	        this._trim(now);
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onError(error);
	          observer.ensureActive();
	        }
	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        var now = this.scheduler.now();
	        this._trim(now);
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onCompleted();
	          observer.ensureActive();
	        }
	        this.observers.length = 0;
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	      }
	    });

	    return ReplaySubject;
	  }(Observable));

	  var AnonymousSubject = Rx.AnonymousSubject = (function (__super__) {
	    inherits(AnonymousSubject, __super__);
	    function AnonymousSubject(observer, observable) {
	      this.observer = observer;
	      this.observable = observable;
	      __super__.call(this);
	    }

	    addProperties(AnonymousSubject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        return this.observable.subscribe(o);
	      },
	      onCompleted: function () {
	        this.observer.onCompleted();
	      },
	      onError: function (error) {
	        this.observer.onError(error);
	      },
	      onNext: function (value) {
	        this.observer.onNext(value);
	      }
	    });

	    return AnonymousSubject;
	  }(Observable));

	  /**
	  * Used to pause and resume streams.
	  */
	  Rx.Pauser = (function (__super__) {
	    inherits(Pauser, __super__);
	    function Pauser() {
	      __super__.call(this);
	    }

	    /**
	     * Pauses the underlying sequence.
	     */
	    Pauser.prototype.pause = function () { this.onNext(false); };

	    /**
	    * Resumes the underlying sequence.
	    */
	    Pauser.prototype.resume = function () { this.onNext(true); };

	    return Pauser;
	  }(Subject));

	  if (true) {
	    root.Rx = Rx;

	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Rx;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (freeExports && freeModule) {
	    // in Node.js or RingoJS
	    if (moduleExports) {
	      (freeModule.exports = Rx).Rx = Rx;
	    } else {
	      freeExports.Rx = Rx;
	    }
	  } else {
	    // in a browser or Rhino
	    root.Rx = Rx;
	  }

	  // All code before this point will be filtered from stack traces.
	  var rEndingLine = captureLine();

	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Rx = __webpack_require__(1);

	function makeSinkProxies(drivers) {
	  var sinkProxies = {};
	  for (var _name in drivers) {
	    if (drivers.hasOwnProperty(_name)) {
	      sinkProxies[_name] = new Rx.ReplaySubject(1);
	    }
	  }
	  return sinkProxies;
	}

	function callDrivers(drivers, sinkProxies) {
	  var sources = {};
	  for (var _name2 in drivers) {
	    if (drivers.hasOwnProperty(_name2)) {
	      sources[_name2] = drivers[_name2](sinkProxies[_name2], _name2);
	    }
	  }
	  return sources;
	}

	function attachDisposeToSinks(sinks, replicationSubscription) {
	  Object.defineProperty(sinks, "dispose", {
	    enumerable: false,
	    value: function value() {
	      replicationSubscription.dispose();
	    }
	  });
	  return sinks;
	}

	function makeDisposeSources(sources) {
	  return function dispose() {
	    for (var _name3 in sources) {
	      if (sources.hasOwnProperty(_name3) && typeof sources[_name3].dispose === "function") {
	        sources[_name3].dispose();
	      }
	    }
	  };
	}

	function attachDisposeToSources(sources) {
	  Object.defineProperty(sources, "dispose", {
	    enumerable: false,
	    value: makeDisposeSources(sources)
	  });
	  return sources;
	}

	function logToConsoleError(err) {
	  var target = err.stack || err;
	  if (console && console.error) {
	    console.error(target);
	  }
	}

	function replicateMany(observables, subjects) {
	  return Rx.Observable.create(function (observer) {
	    var subscription = new Rx.CompositeDisposable();
	    setTimeout(function () {
	      for (var _name4 in observables) {
	        if (observables.hasOwnProperty(_name4) && subjects.hasOwnProperty(_name4) && !subjects[_name4].isDisposed) {
	          subscription.add(observables[_name4].doOnError(logToConsoleError).subscribe(subjects[_name4].asObserver()));
	        }
	      }
	      observer.onNext(subscription);
	    }, 1);

	    return function dispose() {
	      subscription.dispose();
	      for (var x in subjects) {
	        if (subjects.hasOwnProperty(x)) {
	          subjects[x].dispose();
	        }
	      }
	    };
	  });
	}

	function isObjectEmpty(obj) {
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	function run(main, drivers) {
	  if (typeof main !== "function") {
	    throw new Error("First argument given to Cycle.run() must be the 'main' " + "function.");
	  }
	  if (typeof drivers !== "object" || drivers === null) {
	    throw new Error("Second argument given to Cycle.run() must be an object " + "with driver functions as properties.");
	  }
	  if (isObjectEmpty(drivers)) {
	    throw new Error("Second argument given to Cycle.run() must be an object " + "with at least one driver function declared as a property.");
	  }

	  var sinkProxies = makeSinkProxies(drivers);
	  var sources = callDrivers(drivers, sinkProxies);
	  var sinks = main(sources);
	  var subscription = replicateMany(sinks, sinkProxies).subscribe();
	  var sinksWithDispose = attachDisposeToSinks(sinks, subscription);
	  var sourcesWithDispose = attachDisposeToSources(sources);
	  return { sources: sourcesWithDispose, sinks: sinksWithDispose };
	}

	var Cycle = {
	  /**
	   * Takes an `main` function and circularly connects it to the given collection
	   * of driver functions.
	   *
	   * The `main` function expects a collection of "driver source" Observables
	   * as input, and should return a collection of "driver sink" Observables.
	   * A "collection of Observables" is a JavaScript object where
	   * keys match the driver names registered by the `drivers` object, and values
	   * are Observables or a collection of Observables.
	   *
	   * @param {Function} main a function that takes `sources` as input
	   * and outputs a collection of `sinks` Observables.
	   * @param {Object} drivers an object where keys are driver names and values
	   * are driver functions.
	   * @return {Object} an object with two properties: `sources` and `sinks`.
	   * `sinks` is the collection of driver sinks, and `sources` is the collection
	   * of driver sources, that can be used for debugging or testing.
	   * @function run
	   */
	  run: run
	};

	module.exports = Cycle;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.video = exports.ul = exports.u = exports.tr = exports.title = exports.thead = exports.th = exports.tfoot = exports.textarea = exports.td = exports.tbody = exports.table = exports.sup = exports.sub = exports.style = exports.strong = exports.span = exports.source = exports.small = exports.select = exports.section = exports.script = exports.samp = exports.s = exports.ruby = exports.rt = exports.rp = exports.q = exports.pre = exports.param = exports.p = exports.option = exports.optgroup = exports.ol = exports.object = exports.noscript = exports.nav = exports.meta = exports.menu = exports.mark = exports.map = exports.link = exports.li = exports.legend = exports.label = exports.keygen = exports.kbd = exports.ins = exports.input = exports.img = exports.iframe = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.form = exports.footer = exports.figure = exports.figcaption = exports.fieldset = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dir = exports.dfn = exports.del = exports.dd = exports.colgroup = exports.col = exports.code = exports.cite = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.bdo = exports.bdi = exports.base = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.address = exports.abbr = exports.a = exports.h = exports.makeDOMDriver = undefined;

	var _rx = __webpack_require__(1);

	var _rx2 = _interopRequireDefault(_rx);

	var _snabbdom = __webpack_require__(6);

	var _snabbdom2 = _interopRequireDefault(_snabbdom);

	var _h = __webpack_require__(9);

	var _h2 = _interopRequireDefault(_h);

	var _map = __webpack_require__(10);

	var _map2 = _interopRequireDefault(_map);

	var _reduce = __webpack_require__(12);

	var _reduce2 = _interopRequireDefault(_reduce);

	var _filter = __webpack_require__(14);

	var _filter2 = _interopRequireDefault(_filter);

	var _matchesSelector = __webpack_require__(15);

	var _matchesSelector2 = _interopRequireDefault(_matchesSelector);

	var _utils = __webpack_require__(16);

	var _fromEvent = __webpack_require__(17);

	var _fromEvent2 = _interopRequireDefault(_fromEvent);

	var _parseTree = __webpack_require__(18);

	var _parseTree2 = _interopRequireDefault(_parseTree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _require = __webpack_require__(19)(_h2.default);

	var a = _require.a;
	var abbr = _require.abbr;
	var address = _require.address;
	var area = _require.area;
	var article = _require.article;
	var aside = _require.aside;
	var audio = _require.audio;
	var b = _require.b;
	var base = _require.base;
	var bdi = _require.bdi;
	var bdo = _require.bdo;
	var blockquote = _require.blockquote;
	var body = _require.body;
	var br = _require.br;
	var button = _require.button;
	var canvas = _require.canvas;
	var caption = _require.caption;
	var cite = _require.cite;
	var code = _require.code;
	var col = _require.col;
	var colgroup = _require.colgroup;
	var dd = _require.dd;
	var del = _require.del;
	var dfn = _require.dfn;
	var dir = _require.dir;
	var div = _require.div;
	var dl = _require.dl;
	var dt = _require.dt;
	var em = _require.em;
	var embed = _require.embed;
	var fieldset = _require.fieldset;
	var figcaption = _require.figcaption;
	var figure = _require.figure;
	var footer = _require.footer;
	var form = _require.form;
	var h1 = _require.h1;
	var h2 = _require.h2;
	var h3 = _require.h3;
	var h4 = _require.h4;
	var h5 = _require.h5;
	var h6 = _require.h6;
	var head = _require.head;
	var header = _require.header;
	var hgroup = _require.hgroup;
	var hr = _require.hr;
	var html = _require.html;
	var i = _require.i;
	var iframe = _require.iframe;
	var img = _require.img;
	var input = _require.input;
	var ins = _require.ins;
	var kbd = _require.kbd;
	var keygen = _require.keygen;
	var label = _require.label;
	var legend = _require.legend;
	var li = _require.li;
	var link = _require.link;
	var map = _require.map;
	var mark = _require.mark;
	var menu = _require.menu;
	var meta = _require.meta;
	var nav = _require.nav;
	var noscript = _require.noscript;
	var object = _require.object;
	var ol = _require.ol;
	var optgroup = _require.optgroup;
	var option = _require.option;
	var p = _require.p;
	var param = _require.param;
	var pre = _require.pre;
	var q = _require.q;
	var rp = _require.rp;
	var rt = _require.rt;
	var ruby = _require.ruby;
	var s = _require.s;
	var samp = _require.samp;
	var script = _require.script;
	var section = _require.section;
	var select = _require.select;
	var small = _require.small;
	var source = _require.source;
	var span = _require.span;
	var strong = _require.strong;
	var style = _require.style;
	var sub = _require.sub;
	var sup = _require.sup;
	var table = _require.table;
	var tbody = _require.tbody;
	var td = _require.td;
	var textarea = _require.textarea;
	var tfoot = _require.tfoot;
	var th = _require.th;
	var thead = _require.thead;
	var title = _require.title;
	var tr = _require.tr;
	var u = _require.u;
	var ul = _require.ul;
	var video = _require.video;

	var isolateSource = function isolateSource(_source, _scope) {
	  return _source.select('.cycle-scope-' + _scope);
	};

	var isolateSink = function isolateSink(sink, scope) {
	  return sink.map(function (vtree) {
	    var c = (vtree.sel + '.cycle-scope-' + scope).trim();
	    vtree.sel = c;
	    return vtree;
	  });
	};

	var makeIsStrictlyInRootScope = function makeIsStrictlyInRootScope(rootList, namespace) {
	  return function (leaf) {
	    var classIsForeign = function classIsForeign(c) {
	      var matched = c.match(/cycle-scope-(\S+)/);
	      return matched && namespace.indexOf('.' + c) === -1;
	    };

	    for (var el = leaf.parentElement; el !== null; el = el.parentElement) {
	      if (rootList.indexOf(el) >= 0) {
	        return true;
	      }
	      var classList = el.className.split(' ');
	      if (classList.some(classIsForeign)) {
	        return false;
	      }
	    }
	    return true;
	  };
	};

	var makeEventsSelector = function makeEventsSelector(element$) {
	  return function (eventName) {
	    var useCapture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    if (typeof eventName !== 'string') {
	      throw new Error('DOM drivers events() expects argument to be a ' + 'string representing the event type to listen for.');
	    }
	    return element$.flatMapLatest(function (element) {
	      if (!element) {
	        return _rx2.default.Observable.empty();
	      }
	      return (0, _fromEvent2.default)(element, eventName, useCapture);
	    }).share();
	  };
	};

	// Use function not 'const = x => {}' for this.namespace below
	function makeElementSelector(rootElem$) {
	  return function DOMSelect(selector) {
	    if (typeof selector !== 'string') {
	      throw new Error('DOM drivers select() expects first argument to be a ' + 'string as a CSS selector');
	    }
	    var namespace = this.namespace;
	    var scopedSelector = (namespace.join(' ') + ' ' + selector).trim();
	    var element$ = selector.trim() === ':root' ? rootElem$ : rootElem$.map(function (x) {
	      var array = Array.isArray(x) ? x : [x];
	      return (0, _filter2.default)((0, _reduce2.default)((0, _map2.default)(array, function (element) {
	        if ((0, _matchesSelector2.default)(element, scopedSelector)) {
	          return [element];
	        } else {
	          var nodeList = element.querySelectorAll(scopedSelector);
	          return Array.prototype.slice.call(nodeList);
	        }
	      }), function (prev, curr) {
	        return prev.concat(curr);
	      }, []), makeIsStrictlyInRootScope(array, namespace));
	    });
	    return {
	      observable: element$,
	      namespace: namespace.concat(selector),
	      select: makeElementSelector(element$),
	      events: makeEventsSelector(element$),
	      isolateSource: isolateSource,
	      isolateSink: isolateSink
	    };
	  };
	}

	var validateDOMDriverInput = function validateDOMDriverInput(view$) {
	  if (!view$ || typeof view$.subscribe !== 'function') {
	    throw new Error('The DOM driver function expects as input an ' + 'Observable of virtual DOM elements');
	  }
	};

	var makeDOMDriver = function makeDOMDriver(container) {
	  var modules = arguments.length <= 1 || arguments[1] === undefined ? [__webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(23)] : arguments[1];

	  var patch = _snabbdom2.default.init(modules);
	  var rootElem = (0, _utils.getDomElement)(container);

	  var DOMDriver = function DOMDriver(view$) {
	    validateDOMDriverInput(view$);

	    var rootElem$ = view$.flatMapLatest(_parseTree2.default).startWith(rootElem).pairwise().map(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2);

	      var prevView = _ref2[0];
	      var newView = _ref2[1];

	      patch(prevView, newView);
	      return newView.elm;
	    }).replay(null, 1);

	    var disposable = rootElem$.connect();
	    return {
	      namespace: [],
	      select: makeElementSelector(rootElem$),
	      dispose: disposable.dispose.bind(disposable),
	      isolateSink: isolateSink,
	      isolateSource: isolateSource
	    };
	  };
	  return DOMDriver;
	};

	exports.makeDOMDriver = makeDOMDriver;
	exports.h = _h2.default;
	exports.a = a;
	exports.abbr = abbr;
	exports.address = address;
	exports.area = area;
	exports.article = article;
	exports.aside = aside;
	exports.audio = audio;
	exports.b = b;
	exports.base = base;
	exports.bdi = bdi;
	exports.bdo = bdo;
	exports.blockquote = blockquote;
	exports.body = body;
	exports.br = br;
	exports.button = button;
	exports.canvas = canvas;
	exports.caption = caption;
	exports.cite = cite;
	exports.code = code;
	exports.col = col;
	exports.colgroup = colgroup;
	exports.dd = dd;
	exports.del = del;
	exports.dfn = dfn;
	exports.dir = dir;
	exports.div = div;
	exports.dl = dl;
	exports.dt = dt;
	exports.em = em;
	exports.embed = embed;
	exports.fieldset = fieldset;
	exports.figcaption = figcaption;
	exports.figure = figure;
	exports.footer = footer;
	exports.form = form;
	exports.h1 = h1;
	exports.h2 = h2;
	exports.h3 = h3;
	exports.h4 = h4;
	exports.h5 = h5;
	exports.h6 = h6;
	exports.head = head;
	exports.header = header;
	exports.hgroup = hgroup;
	exports.hr = hr;
	exports.html = html;
	exports.i = i;
	exports.iframe = iframe;
	exports.img = img;
	exports.input = input;
	exports.ins = ins;
	exports.kbd = kbd;
	exports.keygen = keygen;
	exports.label = label;
	exports.legend = legend;
	exports.li = li;
	exports.link = link;
	exports.map = map;
	exports.mark = mark;
	exports.menu = menu;
	exports.meta = meta;
	exports.nav = nav;
	exports.noscript = noscript;
	exports.object = object;
	exports.ol = ol;
	exports.optgroup = optgroup;
	exports.option = option;
	exports.p = p;
	exports.param = param;
	exports.pre = pre;
	exports.q = q;
	exports.rp = rp;
	exports.rt = rt;
	exports.ruby = ruby;
	exports.s = s;
	exports.samp = samp;
	exports.script = script;
	exports.section = section;
	exports.select = select;
	exports.small = small;
	exports.source = source;
	exports.span = span;
	exports.strong = strong;
	exports.style = style;
	exports.sub = sub;
	exports.sup = sup;
	exports.table = table;
	exports.tbody = tbody;
	exports.td = td;
	exports.textarea = textarea;
	exports.tfoot = tfoot;
	exports.th = th;
	exports.thead = thead;
	exports.title = title;
	exports.tr = tr;
	exports.u = u;
	exports.ul = ul;
	exports.video = video;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Element */
	'use strict';

	var VNode = __webpack_require__(7);
	var is = __webpack_require__(8);

	function isUndef(s) { return s === undefined; }
	function isDef(s) { return s !== undefined; }

	function emptyNodeAt(elm) {
	  return VNode(elm.tagName, {}, [], undefined, elm);
	}

	var emptyNode = VNode('', {}, [], undefined, undefined);

	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}

	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i, map = {}, key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}

	function createRmCb(childElm, listeners) {
	  return function() {
	    if (--listeners === 0) childElm.parentElement.removeChild(childElm);
	  };
	}

	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

	function init(modules) {
	  var i, j, cbs = {};
	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }

	  function createElm(vnode, insertedVnodeQueue) {
	    var i, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	      if (isDef(i = data.vnode)) vnode = i;
	    }
	    var elm, children = vnode.children, sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? document.createElementNS(i, tag)
	                                                          : document.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          elm.appendChild(createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        elm.appendChild(document.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
	      i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = document.createTextNode(vnode.text);
	    }
	    return vnode.elm;
	  }

	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      parentElm.insertBefore(createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }

	  function invokeDestroyHook(vnode) {
	    var i = vnode.data, j;
	    if (isDef(i)) {
	      if (isDef(i = i.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	  }

	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i, listeners, rm, ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
	          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else { // Text node
	          parentElm.removeChild(ch.elm);
	        }
	      }
	    }
	  }

	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0, newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) { // New element
	          parentElm.insertBefore(createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    if (isDef(i = oldVnode.data) && isDef(i = i.vnode)) oldVnode = i;
	    if (isDef(i = vnode.data) && isDef(i = i.vnode)) vnode = i;
	    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
	      i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      elm.textContent = vnode.text;
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }

	  return function(oldVnode, vnode) {
	    var i;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
	    if (oldVnode instanceof Element) {
	      if (oldVnode.parentElement !== null) {
	        createElm(vnode, insertedVnodeQueue);
	        oldVnode.parentElement.replaceChild(vnode.elm, oldVnode);
	      } else {
	        oldVnode = emptyNodeAt(oldVnode);
	        patchVnode(oldVnode, vnode, insertedVnodeQueue);
	      }
	    } else {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    }
	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
	    return vnode;
	  };
	}

	module.exports = {init: init};


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return {sel: sel, data: data, children: children,
	          text: text, elm: elm, key: key};
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {
	  array: Array.isArray,
	  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var VNode = __webpack_require__(7);
	var is = __webpack_require__(8);

	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children);
	    }
	  }
	}

	module.exports = function h(sel, b, c) {
	  var data = {}, children, text, i;
	  if (arguments.length === 3) {
	    data = b;
	    if (is.array(c)) { children = c; }
	    else if (is.primitive(c)) { text = c; }
	  } else if (arguments.length === 2) {
	    if (is.array(b)) { children = b; }
	    else if (is.primitive(b)) { text = b; }
	    else { data = b; }
	  }
	  if (is.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return VNode(sel, data, children, text, undefined);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal3 = __webpack_require__(11);

	/**
	 * # Map
	 *
	 * A fast `.map()` implementation.
	 *
	 * @param  {Array}    subject     The array (or array-like) to map over.
	 * @param  {Function} fn          The mapper function.
	 * @param  {Object}   thisContext The context for the mapper.
	 * @return {Array}                The array containing the results.
	 */
	module.exports = function fastMap (subject, fn, thisContext) {
	  var length = subject.length,
	      result = new Array(length),
	      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
	      i;
	  for (i = 0; i < length; i++) {
	    result[i] = iterator(subject[i], i, subject);
	  }
	  return result;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Internal helper to bind a function known to have 3 arguments
	 * to a given context.
	 */
	module.exports = function bindInternal3 (func, thisContext) {
	  return function (a, b, c) {
	    return func.call(thisContext, a, b, c);
	  };
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal4 = __webpack_require__(13);

	/**
	 * # Reduce
	 *
	 * A fast `.reduce()` implementation.
	 *
	 * @param  {Array}    subject      The array (or array-like) to reduce.
	 * @param  {Function} fn           The reducer function.
	 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
	 * @param  {Object}   thisContext  The context for the reducer.
	 * @return {mixed}                 The final result.
	 */
	module.exports = function fastReduce (subject, fn, initialValue, thisContext) {
	  var length = subject.length,
	      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
	      i, result;

	  if (initialValue === undefined) {
	    i = 1;
	    result = subject[0];
	  }
	  else {
	    i = 0;
	    result = initialValue;
	  }

	  for (; i < length; i++) {
	    result = iterator(result, subject[i], i, subject);
	  }

	  return result;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Internal helper to bind a function known to have 4 arguments
	 * to a given context.
	 */
	module.exports = function bindInternal4 (func, thisContext) {
	  return function (a, b, c, d) {
	    return func.call(thisContext, a, b, c, d);
	  };
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindInternal3 = __webpack_require__(11);

	/**
	 * # Filter
	 *
	 * A fast `.filter()` implementation.
	 *
	 * @param  {Array}    subject     The array (or array-like) to filter.
	 * @param  {Function} fn          The filter function.
	 * @param  {Object}   thisContext The context for the filter.
	 * @return {Array}                The array containing the results.
	 */
	module.exports = function fastFilter (subject, fn, thisContext) {
	  var length = subject.length,
	      result = [],
	      iterator = thisContext !== undefined ? bindInternal3(fn, thisContext) : fn,
	      i;
	  for (i = 0; i < length; i++) {
	    if (iterator(subject[i], i, subject)) {
	      result.push(subject[i]);
	    }
	  }
	  return result;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var proto = Element.prototype;
	var vendor = proto.matches
	  || proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; i++) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isElement = function isElement(obj) {
	  return typeof HTMLElement === "object" ? obj instanceof HTMLElement || obj instanceof DocumentFragment : obj && typeof obj === "object" && obj !== null && (obj.nodeType === 1 || obj.nodeType === 11) && typeof obj.nodeName === "string";
	};

	var getDomElement = function getDomElement(_el) {
	  var domElement = typeof _el === "string" ? document.querySelector(_el) : _el;

	  if (typeof domElement === "string" && domElement === null) {
	    throw new Error("Cannot render into unknown element `" + _el + "`");
	  } else if (!isElement(domElement)) {
	    throw new Error("Given container is not a DOM element neither a " + "selector string.");
	  }
	  return domElement;
	};

	exports.getDomElement = getDomElement;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Rx = __webpack_require__(1);

	var disposableCreate = Rx.Disposable.create;
	var CompositeDisposable = Rx.CompositeDisposable;
	var AnonymousObservable = Rx.AnonymousObservable;

	function createListener(_ref) {
	  var element = _ref.element;
	  var eventName = _ref.eventName;
	  var handler = _ref.handler;
	  var useCapture = _ref.useCapture;

	  if (element.addEventListener) {
	    element.addEventListener(eventName, handler, useCapture);
	    return disposableCreate(function removeEventListener() {
	      element.removeEventListener(eventName, handler, useCapture);
	    });
	  }
	  throw new Error("No listener found");
	}

	function createEventListener(_ref2) {
	  var element = _ref2.element;
	  var eventName = _ref2.eventName;
	  var handler = _ref2.handler;
	  var useCapture = _ref2.useCapture;

	  var disposables = new CompositeDisposable();

	  if (Array.isArray(element)) {
	    for (var i = 0, len = element.length; i < len; i++) {
	      disposables.add(createEventListener({
	        element: element[i],
	        eventName: eventName,
	        handler: handler,
	        useCapture: useCapture
	      }));
	    }
	  } else if (element) {
	    disposables.add(createListener({ element: element, eventName: eventName, handler: handler, useCapture: useCapture }));
	  }
	  return disposables;
	}

	function fromEvent(element, eventName) {
	  var useCapture = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	  return new AnonymousObservable(function subscribe(observer) {
	    return createEventListener({
	      element: element,
	      eventName: eventName,
	      handler: function handler() {
	        observer.onNext(arguments[0]);
	      },
	      useCapture: useCapture
	    });
	  }).share();
	}

	module.exports = fromEvent;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rx = __webpack_require__(1);

	var _rx2 = _interopRequireDefault(_rx);

	var _map = __webpack_require__(10);

	var _map2 = _interopRequireDefault(_map);

	var _filter = __webpack_require__(14);

	var _filter2 = _interopRequireDefault(_filter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var combineVTreeStreams = function combineVTreeStreams(vTree) {
	  for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    children[_key - 1] = arguments[_key];
	  }

	  return {
	    sel: vTree.sel,
	    data: vTree.data,
	    text: vTree.text,
	    elm: vTree.elm,
	    key: vTree.key,
	    children: children
	  };
	};

	var parseTree = function parseTree(vTree) {
	  if (!vTree) {
	    return null;
	  } else if (vTree.subscribe) {
	    return vTree.flatMapLatest(parseTree);
	  } else if ('object' === (typeof vTree === 'undefined' ? 'undefined' : _typeof(vTree))) {
	    var vtree$ = _rx2.default.Observable.just(vTree);
	    if (vTree.children && vTree.children.length > 0) {
	      var _Rx$Observable;

	      return (_Rx$Observable = _rx2.default.Observable).combineLatest.apply(_Rx$Observable, [vtree$].concat(_toConsumableArray((0, _filter2.default)((0, _map2.default)(vTree.children, parseTree), function (x) {
	        return x !== null;
	      })), [combineVTreeStreams]));
	    }
	    return vtree$;
	  } else {
	    throw new Error('Unhandled tree value');
	  }
	};

	exports.default = parseTree;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var isValidString = function isValidString(param) {
	  return typeof param === 'string' && param.length > 0;
	};

	var startsWith = function startsWith(string, start) {
	  return string[0] === start;
	};

	var isSelector = function isSelector(param) {
	  return isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));
	};

	var node = function node(h) {
	  return function (tagName) {
	    return function (first) {
	      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	      }

	      if (isSelector(first)) {
	        return h.apply(undefined, [tagName + first].concat(rest));
	      } else {
	        return h.apply(undefined, [tagName, first].concat(rest));
	      }
	    };
	  };
	};

	var TAG_NAMES = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video'];

	exports['default'] = function (h) {
	  var createTag = node(h);
	  var exported = { TAG_NAMES: TAG_NAMES, isSelector: isSelector, createTag: createTag };
	  TAG_NAMES.forEach(function (n) {
	    exported[n] = createTag(n);
	  });
	  return exported;
	};

	module.exports = exports['default'];


/***/ },
/* 20 */
/***/ function(module, exports) {

	function updateClass(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldClass = oldVnode.data.class || {},
	      klass = vnode.data.class || {};
	  for (name in klass) {
	    cur = klass[name];
	    if (cur !== oldClass[name]) {
	      elm.classList[cur ? 'add' : 'remove'](name);
	    }
	  }
	}

	module.exports = {create: updateClass, update: updateClass};


/***/ },
/* 21 */
/***/ function(module, exports) {

	function updateProps(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur) {
	      elm[key] = cur;
	    }
	  }
	}

	module.exports = {create: updateProps, update: updateProps};


/***/ },
/* 22 */
/***/ function(module, exports) {

	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", 
	                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", 
	                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", 
	                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", 
	                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", 
	                "truespeed", "typemustmatch", "visible"];
	    
	var booleanAttrsDict = {};
	for(var i=0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}
	    
	function updateAttrs(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
	  
	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if(!cur && booleanAttrsDict[key])
	        elm.removeAttribute(key);
	      else
	        elm.setAttribute(key, cur);
	    }
	  }
	  //remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}

	module.exports = {create: updateAttrs, update: updateAttrs};


/***/ },
/* 23 */
/***/ function(module, exports) {

	var raf = requestAnimationFrame || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };

	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}

	function updateStyle(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldStyle = oldVnode.data.style || {},
	      style = vnode.data.style || {},
	      oldHasDel = 'delayed' in oldStyle;
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}

	function applyDestroyStyle(vnode) {
	  var style, name, elm = vnode.elm, s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}

	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
	      compStyle, style = s.remove, amount = 0, applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if(applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function(ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}

	module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _require = __webpack_require__(25);

	var makeHTTPDriver = _require.makeHTTPDriver;

	var CycleHTTPDriver = {
	  /**
	   * HTTP Driver factory.
	   *
	   * This is a function which, when called, returns a HTTP Driver for Cycle.js
	   * apps. The driver is also a function, and it takes an Observable of requests
	   * as input, and generates a metastream of responses.
	   *
	   * **Requests**. The Observable of requests should emit either strings or
	   * objects. If the Observable emits strings, those should be the URL of the
	   * remote resource over HTTP. If the Observable emits objects, these should be
	   * instructions how superagent should execute the request. These objects
	   * follow a structure similar to superagent's request API itself.
	   * `request` object properties:
	   *
	   * - `url` *(String)*: the remote resource path. **required**
	   * - `method` *(String)*: HTTP Method for the request (GET, POST, PUT, etc).
	   * - `query` *(Object)*: an object with the payload for `GET` or `POST`.
	   * - `send` *(Object)*: an object with the payload for `POST`.
	   * - `headers` *(Object)*: object specifying HTTP headers.
	   * - `accept` *(String)*: the Accept header.
	   * - `type` *(String)*: a short-hand for setting Content-Type.
	   * - `user` *(String)*: username for authentication.
	   * - `password` *(String)*: password for authentication.
	   * - `field` *(Object)*: object where key/values are Form fields.
	   * - `attach` *(Array)*: array of objects, where each object specifies `name`,
	   * `path`, and `filename` of a resource to upload.
	   * - `withCredentials` *(Boolean)*: enables the ability to send cookies from
	   * the origin.
	   * - `redirects` *(Number)*: number of redirects to follow.
	   * - `eager` *(Boolean)*: whether or not to execute the request regardless of
	   *   usage of its corresponding response. Default value is `false` (i.e.,
	   *   the request is lazy). Main use case is: set this option to `true` if you
	   *   send POST requests and you are not interested in its response.
	   *
	   * **Responses**. A metastream is an Observable of Observables. The response
	   * metastream emits Observables of responses. These Observables of responses
	   * have a `request` field attached to them (to the Observable object itself)
	   * indicating which request (from the driver input) generated this response
	   * Observable. The response Observables themselves emit the response object
	   * received through superagent.
	   *
	   * @param {Object} options an object with settings options that apply globally
	   * for all requests processed by the returned HTTP Driver function. The
	   * options are:
	   * - `eager` *(Boolean)*: execute the HTTP eagerly, even if its
	   *   response Observable is not subscribed to. Default: **false**.
	   * @return {Function} the HTTP Driver function
	   * @function makeHTTPDriver
	   */
	  makeHTTPDriver: makeHTTPDriver
	};

	module.exports = CycleHTTPDriver;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Rx = __webpack_require__(1);
	var superagent = __webpack_require__(26);

	function optionsToSuperagent(_ref) {
	  var url = _ref.url;
	  var _ref$send = _ref.send;
	  var send = _ref$send === undefined ? null : _ref$send;
	  var _ref$accept = _ref.accept;
	  var accept = _ref$accept === undefined ? null : _ref$accept;
	  var _ref$query = _ref.query;
	  var query = _ref$query === undefined ? null : _ref$query;
	  var _ref$user = _ref.user;
	  var user = _ref$user === undefined ? null : _ref$user;
	  var _ref$password = _ref.password;
	  var password = _ref$password === undefined ? null : _ref$password;
	  var _ref$field = _ref.field;
	  var field = _ref$field === undefined ? null : _ref$field;
	  var _ref$attach = _ref.attach;
	  var attach = _ref$attach === undefined ? null : _ref$attach;
	  var _ref$withCredentials = _ref.withCredentials;
	  var // if valid, should be an array
	  withCredentials = _ref$withCredentials === undefined ? false : _ref$withCredentials;
	  var _ref$headers = _ref.headers;
	  var headers = _ref$headers === undefined ? {} : _ref$headers;
	  var _ref$redirects = _ref.redirects;
	  var redirects = _ref$redirects === undefined ? 5 : _ref$redirects;
	  var _ref$type = _ref.type;
	  var type = _ref$type === undefined ? "json" : _ref$type;
	  var _ref$method = _ref.method;
	  var method = _ref$method === undefined ? "get" : _ref$method;

	  if (typeof url !== "string") {
	    throw new Error("Please provide a `url` property in the request options.");
	  }
	  var lowerCaseMethod = method.toLowerCase();
	  var sanitizedMethod = lowerCaseMethod === "delete" ? "del" : lowerCaseMethod;

	  var request = superagent[sanitizedMethod](url);
	  if (typeof request.redirects === "function") {
	    request = request.redirects(redirects);
	  }
	  request = request.type(type);
	  if (send !== null) {
	    request = request.send(send);
	  }
	  if (accept !== null) {
	    request = request.accept(accept);
	  }
	  if (query !== null) {
	    request = request.query(query);
	  }
	  if (withCredentials) {
	    request = request.withCredentials();
	  }
	  if (user !== null && password !== null) {
	    request = request.auth(user, password);
	  }
	  for (var key in headers) {
	    if (headers.hasOwnProperty(key)) {
	      request = request.set(key, headers[key]);
	    }
	  }
	  if (field !== null) {
	    for (var key in field) {
	      if (field.hasOwnProperty(key)) {
	        request = request.field(key, field[key]);
	      }
	    }
	  }
	  if (attach !== null) {
	    for (var i = attach.length - 1; i >= 0; i--) {
	      var a = attach[i];
	      request = request.attach(a.name, a.path, a.filename);
	    }
	  }
	  return request;
	}

	function urlToSuperagent(url) {
	  return superagent.get(url);
	}

	function createResponse$(reqOptions) {
	  return Rx.Observable.create(function (observer) {
	    var request = optionsToSuperagent(reqOptions);

	    try {
	      request.end(function (err, res) {
	        if (err) {
	          observer.onError(err);
	        } else {
	          observer.onNext(res);
	          observer.onCompleted();
	        }
	      });
	    } catch (err) {
	      observer.onError(err);
	    }

	    return function onDispose() {
	      request.abort();
	    };
	  });
	}

	function normalizeRequestOptions(reqOptions) {
	  if (typeof reqOptions === "string") {
	    return { url: reqOptions };
	  } else if (typeof reqOptions === "object") {
	    return reqOptions;
	  } else {
	    throw new Error("Observable of requests given to HTTP Driver must emit " + "either URL strings or objects with parameters.");
	  }
	}

	function isolateSink(request$, scope) {
	  return request$.map(function (req) {
	    if (typeof req === "string") {
	      return { url: req, _namespace: [scope] };
	    }
	    req._namespace = req._namespace || [];
	    req._namespace.push(scope);
	    return req;
	  });
	}

	function isolateSource(response$$, scope) {
	  var isolatedResponse$$ = response$$.filter(function (res$) {
	    return Array.isArray(res$.request._namespace) && res$.request._namespace.indexOf(scope) !== -1;
	  });
	  isolatedResponse$$.isolateSource = isolateSource;
	  isolatedResponse$$.isolateSink = isolateSink;
	  return isolatedResponse$$;
	}

	function makeHTTPDriver() {
	  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? { eager: false } : arguments[0];

	  var _ref2$eager = _ref2.eager;
	  var eager = _ref2$eager === undefined ? false : _ref2$eager;

	  return function httpDriver(request$) {
	    var response$$ = request$.map(function (request) {
	      var reqOptions = normalizeRequestOptions(request);
	      var response$ = createResponse$(reqOptions);
	      if (eager || reqOptions.eager) {
	        response$ = response$.replay(null, 1);
	        response$.connect();
	      }
	      response$.request = reqOptions;
	      return response$;
	    }).replay(null, 1);
	    response$$.connect();
	    response$$.isolateSource = isolateSource;
	    response$$.isolateSink = isolateSink;
	    return response$$;
	  };
	}

	module.exports = {
	  optionsToSuperagent: optionsToSuperagent,
	  urlToSuperagent: urlToSuperagent,
	  createResponse$: createResponse$,

	  makeHTTPDriver: makeHTTPDriver
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(27);
	var reduce = __webpack_require__(28);

	/**
	 * Root reference for iframes.
	 */

	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  root = this;
	}

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return obj === Object(obj);
	}

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(obj[key]));
	    }
	  }
	  return pairs.join('&');
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Force given parser
	 * 
	 * Sets the body parser no matter type.
	 * 
	 * @param {Function}
	 * @api public
	 */

	Response.prototype.parse = function(fn){
	  this.parser = fn;
	  return this;
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype.parseBody = function(str){
	  var parse = this.parser || request.parse[this.type];
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }

	  var type = status / 100 | 0;

	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  Emitter.call(this);
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this._header = {};
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      return self.callback(err);
	    }

	    self.emit('response', res);

	    if (err) {
	      return self.callback(err, res);
	    }

	    if (res.status >= 200 && res.status < 300) {
	      return self.callback(err, res);
	    }

	    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	    new_err.original = err;
	    new_err.response = res;
	    new_err.status = res.status;

	    self.callback(new_err, res);
	  });
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Allow for extension
	 */

	Request.prototype.use = function(fn) {
	  fn(this);
	  return this;
	}

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.clearTimeout = function(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */

	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Get case-insensitive header `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 */

	Request.prototype.getHeader = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass){
	  var str = btoa(user + ':' + pass);
	  this.set('Authorization', 'Basic ' + str);
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.field = function(name, val){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(name, val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(field, file, filename);
	  return this;
	};

	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // querystring
	 *       request.get('/search')
	 *         .end(callback)
	 *
	 *       // multiple data "writes"
	 *       request.get('/search')
	 *         .send({ search: 'query' })
	 *         .send({ range: '1..5' })
	 *         .send({ order: 'desc' })
	 *         .end(callback)
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"})
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this.getHeader('Content-Type');

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this.getHeader('Content-Type');
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj || isHost(data)) return this;
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
	  err.crossDomain = true;
	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }

	    if (0 == status) {
	      if (self.timedout) return self.timeoutError();
	      if (self.aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }

	  // initiate request
	  xhr.open(this.method, this.url, true);

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var contentType = this.getHeader('Content-Type');
	    var serialize = request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  // send stuff
	  this.emit('request', this);
	  xhr.send(data);
	  return this;
	};

	/**
	 * Faux promise support
	 *
	 * @param {Function} fulfill
	 * @param {Function} reject
	 * @return {Request}
	 */

	Request.prototype.then = function (fulfill, reject) {
	  return this.end(function(err, res) {
	    err ? reject(err) : fulfill(res);
	  });
	}

	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }

	  return new Request(method, url);
	}

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.del = function(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * Expose `request`.
	 */

	module.exports = request;


/***/ },
/* 27 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */

	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];

	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* global require */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Rx = __webpack_require__(1);

	var _require = __webpack_require__(30);

	var createHistory = _require.createHistory;
	var createHashHistory = _require.createHashHistory;
	var useQueries = _require.useQueries;
	var useBasename = _require.useBasename;

	var _require2 = __webpack_require__(58);

	var filterLinks = _require2.filterLinks;
	var supportsHistory = _require2.supportsHistory;

	function makeHistory(hash, queries, options) {
	  var useHash = hash || !supportsHistory();
	  if (useHash && queries) {
	    return useQueries(useBasename(createHashHistory))(options);
	  }
	  if (useHash && !queries) {
	    return useBasename(createHashHistory)(options);
	  }
	  if (!useHash && queries) {
	    return useQueries(useBasename(createHistory))(options);
	  }
	  if (!useHash && !queries) {
	    return useBasename(createHistory)(options);
	  }
	}

	function createPushState(history, basename) {
	  return function pushState(url) {
	    if ("string" === typeof url) {
	      history.pushState({}, url.replace(basename, ""));
	    } else if ("object" === typeof url) {
	      var _url$state = url.state;
	      var state = _url$state === undefined ? {} : _url$state;
	      var path = url.path;
	      var _url$query = url.query;
	      var query = _url$query === undefined ? {} : _url$query;

	      history.pushState(state, path.replace(basename, ""), query);
	    } else {
	      throw new Error("History Driver input must be a string or\n        object but received " + typeof url);
	    }
	  };
	}

	function createHistorySubject(history) {
	  var subject = new Rx.BehaviorSubject();

	  // Append methods for convenience.
	  // To be removed if unneeded.
	  Object.keys(history).forEach(function (key) {
	    if (key !== "listen") {
	      subject[key] = history[key];
	    }
	  });

	  return subject;
	}

	function makeHistoryDriver(config) {
	  var _ref = config || {};

	  var _ref$hash = _ref.hash;
	  var hash = _ref$hash === undefined ? false : _ref$hash;
	  var _ref$queries = _ref.queries;
	  var queries = _ref$queries === undefined ? true : _ref$queries;

	  var options = _objectWithoutProperties(_ref, ["hash", "queries"]);

	  var history = makeHistory(hash, queries, options);
	  var historySubject = createHistorySubject(history);

	  return function historyDriver(url$) {
	    url$.subscribe(createPushState(history, options.basename || ""));

	    history.listen(function (location) {
	      return historySubject.onNext(location);
	    });

	    return historySubject;
	  };
	}

	function makeServerHistoryDriver(startingLocation) {
	  var _ref2 = startingLocation || {};

	  var _ref2$pathname = _ref2.pathname;
	  var pathname = _ref2$pathname === undefined ? "/" : _ref2$pathname;
	  var _ref2$query = _ref2.query;
	  var query = _ref2$query === undefined ? {} : _ref2$query;
	  var _ref2$search = _ref2.search;
	  var search = _ref2$search === undefined ? "" : _ref2$search;
	  var _ref2$state = _ref2.state;
	  var state = _ref2$state === undefined ? {} : _ref2$state;
	  var _ref2$action = _ref2.action;
	  var action = _ref2$action === undefined ? "POP" : _ref2$action;
	  var _ref2$key = _ref2.key;
	  var key = _ref2$key === undefined ? "" : _ref2$key;

	  return function historyDriver() {
	    return new Rx.BehaviorSubject({
	      pathname: pathname,
	      query: query,
	      search: search,
	      state: state,
	      action: action,
	      key: key
	    });
	  };
	}

	exports.makeHistoryDriver = makeHistoryDriver;
	exports.makeServerHistoryDriver = makeServerHistoryDriver;
	exports.filterLinks = filterLinks;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _deprecate = __webpack_require__(31);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var _createLocation2 = __webpack_require__(32);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _createBrowserHistory = __webpack_require__(37);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	exports.createHistory = _createBrowserHistory2['default'];

	var _createHashHistory2 = __webpack_require__(49);

	var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);

	exports.createHashHistory = _createHashHistory3['default'];

	var _createMemoryHistory2 = __webpack_require__(50);

	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

	exports.createMemoryHistory = _createMemoryHistory3['default'];

	var _useBasename2 = __webpack_require__(51);

	var _useBasename3 = _interopRequireDefault(_useBasename2);

	exports.useBasename = _useBasename3['default'];

	var _useBeforeUnload2 = __webpack_require__(52);

	var _useBeforeUnload3 = _interopRequireDefault(_useBeforeUnload2);

	exports.useBeforeUnload = _useBeforeUnload3['default'];

	var _useQueries2 = __webpack_require__(53);

	var _useQueries3 = _interopRequireDefault(_useQueries2);

	exports.useQueries = _useQueries3['default'];

	var _Actions2 = __webpack_require__(33);

	var _Actions3 = _interopRequireDefault(_Actions2);

	exports.Actions = _Actions3['default'];

	// deprecated

	var _enableBeforeUnload2 = __webpack_require__(56);

	var _enableBeforeUnload3 = _interopRequireDefault(_enableBeforeUnload2);

	exports.enableBeforeUnload = _enableBeforeUnload3['default'];

	var _enableQueries2 = __webpack_require__(57);

	var _enableQueries3 = _interopRequireDefault(_enableQueries2);

	exports.enableQueries = _enableQueries3['default'];
	var createLocation = _deprecate2['default'](_createLocation3['default'], 'Using createLocation without a history instance is deprecated; please use history.createLocation instead');
	exports.createLocation = createLocation;

/***/ },
/* 31 */
/***/ function(module, exports) {

	//import warning from 'warning'

	"use strict";

	exports.__esModule = true;
	function deprecate(fn) {
	  return fn;
	  //return function () {
	  //  warning(false, '[history] ' + message)
	  //  return fn.apply(this, arguments)
	  //}
	}

	exports["default"] = deprecate;
	module.exports = exports["default"];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Actions = __webpack_require__(33);

	var _parsePath = __webpack_require__(34);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	  if (typeof location === 'string') location = _parsePath2['default'](location);

	  if (typeof action === 'object') {
	    //warning(
	    //  false,
	    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
	    //  'location descriptor instead'
	    //)

	    location = _extends({}, location, { state: action });

	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }

	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}

	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';

	exports.__esModule = true;
	var PUSH = 'PUSH';

	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';

	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';

	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(35);

	var _warning2 = _interopRequireDefault(_warning);

	var _extractPath = __webpack_require__(36);

	var _extractPath2 = _interopRequireDefault(_extractPath);

	function parsePath(path) {
	  var pathname = _extractPath2['default'](path);
	  var search = '';
	  var hash = '';

	  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}

	exports['default'] = parsePath;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);

	  if (match == null) return string;

	  return string.substring(match[0].length);
	}

	exports["default"] = extractPath;
	module.exports = exports["default"];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(38);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(33);

	var _ExecutionEnvironment = __webpack_require__(39);

	var _DOMUtils = __webpack_require__(40);

	var _DOMStateStorage = __webpack_require__(41);

	var _createDOMHistory = __webpack_require__(42);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	var _parsePath = __webpack_require__(34);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

	  var forceRefresh = options.forceRefresh;

	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;

	  function getCurrentLocation(historyState) {
	    historyState = historyState || window.history.state || {};

	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;

	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();

	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	      transitionTo(getCurrentLocation(event.state));
	    }

	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    _DOMStateStorage.saveState(key, state);

	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };

	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopPopStateListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopPopStateListener();
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}

	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}

	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}

	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}

	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}

	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}

	function go(n) {
	  if (n) window.history.go(n);
	}

	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */

	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  // FIXME: Work around our browser history not working correctly on Chrome
	  // iOS: https://github.com/rackt/react-router/issues/2565
	  if (ua.indexOf('CriOS') !== -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */

	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(35);

	var _warning2 = _interopRequireDefault(_warning);

	var KeyPrefix = '@@History/';
	var QuotaExceededError = 'QuotaExceededError';
	var SecurityError = 'SecurityError';

	function createKey(key) {
	  return KeyPrefix + key;
	}

	function saveState(key, state) {
	  try {
	    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

	      return;
	    }

	    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

	      return;
	    }

	    throw error;
	  }
	}

	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

	      return null;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(38);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(39);

	var _DOMUtils = __webpack_require__(40);

	var _createHistory = __webpack_require__(43);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));

	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

	    return history.listen(listener);
	  }

	  return _extends({}, history, {
	    listen: listen
	  });
	}

	exports['default'] = createDOMHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _deepEqual = __webpack_require__(44);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _AsyncUtils = __webpack_require__(47);

	var _Actions = __webpack_require__(33);

	var _createLocation2 = __webpack_require__(32);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _runTransitionHook = __webpack_require__(48);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _parsePath = __webpack_require__(34);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(31);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}

	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}

	var DefaultKeyLength = 6;

	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var keyLength = options.keyLength;
	  var getUserConfirmation = options.getUserConfirmation;

	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

	  var transitionHooks = [];

	  function listenBefore(hook) {
	    transitionHooks.push(hook);

	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }

	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;

	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }

	  function updateLocation(newLocation) {
	    var current = getCurrent();

	    location = newLocation;

	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }

	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }

	  function listen(listener) {
	    changeListeners.push(listener);

	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }

	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }

	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }

	  var pendingLocation = undefined;

	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);

	          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
	        }

	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }

	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }

	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }

	  function goBack() {
	    go(-1);
	  }

	  function goForward() {
	    go(1);
	  }

	  function createKey() {
	    return createRandomKey(keyLength);
	  }

	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;

	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;

	    var result = pathname;

	    if (search) result += search;

	    if (hash) result += hash;

	    return result;
	  }

	  function createHref(location) {
	    return createPath(location);
	  }

	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

	    if (typeof action === 'object') {
	      //warning(
	      //  false,
	      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
	      //  'location descriptor instead'
	      //)

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      location = _extends({}, location, { state: action });

	      action = key;
	      key = arguments[3] || createKey();
	    }

	    return _createLocation3['default'](location, action, key);
	  }

	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }

	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }

	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);

	    push(_extends({ state: state }, path));
	  }

	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);

	    replace(_extends({ state: state }, path));
	  }

	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,

	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}

	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(45);
	var isArguments = __webpack_require__(46);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 45 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 46 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;

	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) return;

	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }

	  next();
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(35);

	var _warning2 = _interopRequireDefault(_warning);

	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}

	exports['default'] = runTransitionHook;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(35);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(38);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(33);

	var _ExecutionEnvironment = __webpack_require__(39);

	var _DOMUtils = __webpack_require__(40);

	var _DOMStateStorage = __webpack_require__(41);

	var _createDOMHistory = __webpack_require__(42);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	var _parsePath = __webpack_require__(34);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}

	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();

	  if (isAbsolutePath(path)) return true;

	  _DOMUtils.replaceHashPath('/' + path);

	  return false;
	}

	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}

	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}

	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}

	var DefaultQueryKey = '_k';

	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

	  var queryKey = options.queryKey;

	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();

	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);

	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

	      transitionTo(getCurrentLocation());
	    }

	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    var path = (basename || '') + pathname + search;

	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }

	    var currentHash = _DOMUtils.getHashPath();

	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopHashChangeListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function push(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.push(location);
	  }

	  function replace(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replace(location);
	  }

	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

	  function go(n) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

	    history.go(n);
	  }

	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopHashChangeListener();
	  }

	  // deprecated
	  function pushState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.pushState(state, path);
	  }

	  // deprecated
	  function replaceState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replaceState(state, path);
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,

	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}

	exports['default'] = createHashHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(35);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(38);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(33);

	var _createHistory = __webpack_require__(43);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	var _parsePath = __webpack_require__(34);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}

	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }

	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));

	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;

	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }

	  entries = entries.map(function (entry) {
	    var key = history.createKey();

	    if (typeof entry === 'string') return { pathname: entry, key: key };

	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });

	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });

	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }

	  var storage = createStateStorage(entries);

	  function saveState(key, state) {
	    storage[key] = state;
	  }

	  function readState(key) {
	    return storage[key];
	  }

	  function getCurrentLocation() {
	    var entry = entries[current];
	    var key = entry.key;
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;

	    var path = (basename || '') + pathname + (search || '');

	    var state = undefined;
	    if (key) {
	      state = readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	      entry.key = key;
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }

	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }

	      current += n;

	      var currentLocation = getCurrentLocation();

	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }

	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;

	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);

	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }

	  return history;
	}

	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _ExecutionEnvironment = __webpack_require__(39);

	var _runTransitionHook = __webpack_require__(48);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _extractPath = __webpack_require__(36);

	var _extractPath2 = _interopRequireDefault(_extractPath);

	var _parsePath = __webpack_require__(34);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(31);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var basename = options.basename;

	    var historyOptions = _objectWithoutProperties(options, ['basename']);

	    var history = createHistory(historyOptions);

	    // Automatically use the value of <base href> in HTML
	    // documents as basename if it's not explicitly given.
	    if (basename == null && _ExecutionEnvironment.canUseDOM) {
	      var base = document.getElementsByTagName('base')[0];

	      if (base) basename = _extractPath2['default'](base.href);
	    }

	    function addBasename(location) {
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    }

	    function prependBasename(location) {
	      if (!basename) return location;

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;

	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }

	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }

	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }

	    function replace(location) {
	      history.replace(prependBasename(location));
	    }

	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }

	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }

	    function createLocation() {
	      return addBasename(history.createLocation.apply(history, arguments));
	    }

	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      push(_extends({ state: state }, path));
	    }

	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      replace(_extends({ state: state }, path));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(35);

	var _warning2 = _interopRequireDefault(_warning);

	var _ExecutionEnvironment = __webpack_require__(39);

	var _DOMUtils = __webpack_require__(40);

	var _deprecate = __webpack_require__(31);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function startBeforeUnloadListener(getBeforeUnloadPromptMessage) {
	  function listener(event) {
	    var message = getBeforeUnloadPromptMessage();

	    if (typeof message === 'string') {
	      (event || window.event).returnValue = message;
	      return message;
	    }
	  }

	  _DOMUtils.addEventListener(window, 'beforeunload', listener);

	  return function () {
	    _DOMUtils.removeEventListener(window, 'beforeunload', listener);
	  };
	}

	/**
	 * Returns a new createHistory function that can be used to create
	 * history objects that know how to use the beforeunload event in web
	 * browsers to cancel navigation.
	 */
	function useBeforeUnload(createHistory) {
	  return function (options) {
	    var history = createHistory(options);

	    var stopBeforeUnloadListener = undefined;
	    var beforeUnloadHooks = [];

	    function getBeforeUnloadPromptMessage() {
	      var message = undefined;

	      for (var i = 0, len = beforeUnloadHooks.length; message == null && i < len; ++i) {
	        message = beforeUnloadHooks[i].call();
	      }return message;
	    }

	    function listenBeforeUnload(hook) {
	      beforeUnloadHooks.push(hook);

	      if (beforeUnloadHooks.length === 1) {
	        if (_ExecutionEnvironment.canUseDOM) {
	          stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
	        } else {
	          process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'listenBeforeUnload only works in DOM environments') : undefined;
	        }
	      }

	      return function () {
	        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
	          return item !== hook;
	        });

	        if (beforeUnloadHooks.length === 0 && stopBeforeUnloadListener) {
	          stopBeforeUnloadListener();
	          stopBeforeUnloadListener = null;
	        }
	      };
	    }

	    // deprecated
	    function registerBeforeUnloadHook(hook) {
	      if (_ExecutionEnvironment.canUseDOM && beforeUnloadHooks.indexOf(hook) === -1) {
	        beforeUnloadHooks.push(hook);

	        if (beforeUnloadHooks.length === 1) stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
	      }
	    }

	    // deprecated
	    function unregisterBeforeUnloadHook(hook) {
	      if (beforeUnloadHooks.length > 0) {
	        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
	          return item !== hook;
	        });

	        if (beforeUnloadHooks.length === 0) stopBeforeUnloadListener();
	      }
	    }

	    return _extends({}, history, {
	      listenBeforeUnload: listenBeforeUnload,

	      registerBeforeUnloadHook: _deprecate2['default'](registerBeforeUnloadHook, 'registerBeforeUnloadHook is deprecated; use listenBeforeUnload instead'),
	      unregisterBeforeUnloadHook: _deprecate2['default'](unregisterBeforeUnloadHook, 'unregisterBeforeUnloadHook is deprecated; use the callback returned from listenBeforeUnload instead')
	    });
	  };
	}

	exports['default'] = useBeforeUnload;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _warning = __webpack_require__(35);

	var _warning2 = _interopRequireDefault(_warning);

	var _queryString = __webpack_require__(54);

	var _runTransitionHook = __webpack_require__(48);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _parsePath = __webpack_require__(34);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(31);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var SEARCH_BASE_KEY = '$searchBase';

	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}

	var defaultParseQueryString = _queryString.parse;

	function isNestedObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;

	    var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);

	    var history = createHistory(historyOptions);

	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;

	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }

	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.

	      return location;
	    }

	    function appendQuery(location, query) {
	      var _extends2;

	      var queryString = undefined;
	      if (!query || (queryString = stringifyQuery(query)) === '') return location;

	      process.env.NODE_ENV !== 'production' ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }

	      var search = searchBase + (searchBase ? '&' : '?') + queryString;

	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }

	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }

	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }

	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }

	    function createPath(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createPath is deprecated; use a location descriptor instead'
	      //)
	      return history.createPath(appendQuery(location, query || location.query));
	    }

	    function createHref(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createHref is deprecated; use a location descriptor instead'
	      //)
	      return history.createHref(appendQuery(location, query || location.query));
	    }

	    function createLocation() {
	      return addQuery(history.createLocation.apply(history, arguments));
	    }

	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      push(_extends({ state: state }, path, { query: query }));
	    }

	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      replace(_extends({ state: state }, path, { query: query }));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useQueries;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(55);

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return {};
		}

		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, {});
	};

	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}

			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _deprecate = __webpack_require__(31);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var _useBeforeUnload = __webpack_require__(52);

	var _useBeforeUnload2 = _interopRequireDefault(_useBeforeUnload);

	exports['default'] = _deprecate2['default'](_useBeforeUnload2['default'], 'enableBeforeUnload is deprecated, use useBeforeUnload instead');
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _deprecate = __webpack_require__(31);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var _useQueries = __webpack_require__(53);

	var _useQueries2 = _interopRequireDefault(_useQueries);

	exports['default'] = _deprecate2['default'](_useQueries2['default'], 'enableQueries is deprecated, use useQueries instead');
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports) {

	/* global window, navigator, location */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function supportsHistory() {
	  var ua = navigator.userAgent;

	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    {
	      return false;
	    }
	  }

	  // Return the regular check
	  return window.history && 'pushState' in window.history;
	}

	/*eslint-disable */
	function which(e) {
	  e = e || window.event;
	  return null === e.which ? e.button : e.which;
	}

	/**
	 * Check if `href` is the same origin.
	 */

	function sameOrigin(href) {
	  var origin = location.protocol + '//' + location.hostname;
	  if (location.port) origin += ':' + location.port;
	  return href && 0 === href.indexOf(origin);
	}

	var filterLinks = function filterLinks(e) {
	  if (1 !== which(e)) return false;

	  if (e.metaKey || e.ctrlKey || e.shiftKey) return false;
	  if (e.defaultPrevented) return true;

	  // ensure link
	  var el = e.target;
	  while (el && 'A' !== el.nodeName) el = el.parentNode;
	  if (!el || 'A' !== el.nodeName) return false;

	  // Ignore if tag has
	  // 1. "download" attribute
	  // 2. rel="external" attribute
	  if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return false;

	  // ensure non-hash for the same path
	  var link = el.getAttribute('href');

	  // Check for mailto: in the href
	  if (link && link.indexOf('mailto:') > -1) return false;

	  // check target
	  if (el.target) return false;

	  // x-origin
	  if (!sameOrigin(el.href)) return false;

	  e.preventDefault();
	  return true;
	};
	/*eslint-enable */

	exports.filterLinks = filterLinks;
	exports.supportsHistory = supportsHistory;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _routes = __webpack_require__(60);

	var _routes2 = _interopRequireDefault(_routes);

	var _switchPath2 = __webpack_require__(72);

	var _switchPath3 = _interopRequireDefault(_switchPath2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Content(sources) {
	  var state$ = sources.History
	  //.startWith({pathname: '/'})
	  .map(function (location) {
	    //Pass current url into router to get the appropriate value

	    var _switchPath = (0, _switchPath3.default)(location.pathname, _routes2.default);

	    var value = _switchPath.value;
	    //If function returned, pass it the sources object

	    if (typeof value === 'function') {
	      return value(sources);
	    }
	    //else just return the route value, which must be DOM.
	    return { DOM: value };
	  }).do(function (x) {
	    var hasDOM = x.DOM ? true : false;
	    var hasHTTP = x.HTTP ? true : false;
	    console.log('Content state emitted - DOM: ' + hasDOM + ', HTTP: ' + hasHTTP);
	  }).share();

	  return {
	    DOM: state$.pluck('DOM').do(function () {
	      console.log('Content DOM plucked');
	    }),
	    HTTP: state$.pluck('HTTP').do(function () {
	      console.log('Content HTTP plucked');
	    }).filter(function (x) {
	      return x;
	    }).flatMapLatest(function (x) {
	      return x;
	    }).do(function () {
	      console.log('Content HTTP filtered');
	    })
	  };
	}

	exports.default = Content;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cycleSnabbdom = __webpack_require__(5);

	var _isolate = __webpack_require__(61);

	var _isolate2 = _interopRequireDefault(_isolate);

	var _ColorChange = __webpack_require__(62);

	var _ColorChange2 = _interopRequireDefault(_ColorChange);

	var _GithubSearch = __webpack_require__(64);

	var _GithubSearch2 = _interopRequireDefault(_GithubSearch);

	var _HeroComplex = __webpack_require__(66);

	var _HeroComplex2 = _interopRequireDefault(_HeroComplex);

	var _HeroSimple = __webpack_require__(70);

	var _HeroSimple2 = _interopRequireDefault(_HeroSimple);

	var _HeroTests = __webpack_require__(71);

	var _HeroTests2 = _interopRequireDefault(_HeroTests);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = {
	  '/': _ColorChange2.default,
	  '/github': (0, _isolate2.default)(_GithubSearch2.default),
	  '/hero-complex': _HeroComplex2.default,
	  '/hero-simple': _HeroSimple2.default,
	  '/hero-tests': _HeroTests2.default,
	  '/just-dom': (0, _cycleSnabbdom.h)('h1', {}, 'This route only returns a <h1>.'),
	  '*': _ColorChange2.default
	};

	exports.default = routes;

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";

	var counter = 0;

	function newScope() {
	  return "cycle" + ++counter;
	}

	/**
	 * Takes a `dataflowComponent` function and an optional `scope` string, and
	 * returns a scoped version of the `dataflowComponent` function.
	 *
	 * When the scoped dataflow component is invoked, each source provided to the
	 * scoped dataflowComponent is isolated to the scope using
	 * `source.isolateSource(source, scope)`, if possible. Likewise, the sinks
	 * returned from the scoped dataflow component are isolate to the scope using
	 * `source.isolateSink(sink, scope)`.
	 *
	 * If the `scope` is not provided, a new scope will be automatically created.
	 * This means that while **`isolate(dataflowComponent, scope)` is pure**
	 * (referentially transparent), **`isolate(dataflowComponent)` is impure**
	 * (not referentially transparent). Two calls to `isolate(Foo, bar)` will
	 * generate two indistinct dataflow components. But, two calls to `isolate(Foo)`
	 * will generate two distinct dataflow components.
	 *
	 * Note that both `isolateSource()` and `isolateSink()` are static members of
	 * `source`. The reason for this is that drivers produce `source` while the
	 * application produces `sink`, and it's the driver's responsibility to
	 * implement `isolateSource()` and `isolateSink()`.
	 *
	 * @param {Function} dataflowComponent a function that takes `sources` as input
	 * and outputs a collection of `sinks`.
	 * @param {String} scope an optional string that is used to isolate each
	 * `sources` and `sinks` when the returned scoped dataflow component is invoked.
	 * @return {Function} the scoped dataflow component function that, as the
	 * original `dataflowComponent` function, takes `sources` and returns `sinks`.
	 * @function isolate
	 */
	function isolate(dataflowComponent) {
	  var scope = arguments.length <= 1 || arguments[1] === undefined ? newScope() : arguments[1];

	  if (typeof dataflowComponent !== "function") {
	    throw new Error("First argument given to isolate() must be a " + "'dataflowComponent' function");
	  }
	  if (typeof scope !== "string") {
	    throw new Error("Second argument given to isolate() must be a " + "string for 'scope'");
	  }
	  return function scopedDataflowComponent(sources) {
	    var scopedSources = {};
	    for (var key in sources) {
	      if (sources.hasOwnProperty(key) && typeof sources[key].isolateSource === "function") {
	        scopedSources[key] = sources[key].isolateSource(sources[key], scope);
	      } else if (sources.hasOwnProperty(key)) {
	        scopedSources[key] = sources[key];
	      }
	    }

	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      rest[_key - 1] = arguments[_key];
	    }

	    var sinks = dataflowComponent.apply(undefined, [scopedSources].concat(rest));
	    var scopedSinks = {};
	    for (var key in sinks) {
	      if (sinks.hasOwnProperty(key) && sources.hasOwnProperty(key) && typeof sources[key].isolateSink === "function") {
	        scopedSinks[key] = sources[key].isolateSink(sinks[key], scope);
	      } else if (sinks.hasOwnProperty(key)) {
	        scopedSinks[key] = sinks[key];
	      }
	    }
	    return scopedSinks;
	  };
	}

	isolate.reset = function () {
	  return counter = 0;
	};

	module.exports = isolate;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cycleSnabbdom = __webpack_require__(5);

	var _rx = __webpack_require__(1);

	var _rx2 = _interopRequireDefault(_rx);

	var _styles = __webpack_require__(63);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var colors = [{ bg: 'White', font: 'Black' }, { bg: 'Gray', font: 'White' }, { bg: 'Green', font: 'Yellow' }, { bg: 'Red', font: 'Black' }, { bg: 'Black', font: 'White' }];

	var increment = 1;

	function nextColorIndex(curr, inc) {
	  var newColor = curr + inc;
	  if (newColor < 0) {
	    return colors.length - 1;
	  }
	  if (newColor > colors.length - 1) {
	    return 0;
	  }
	  return newColor;
	}

	function ColorChange(_ref) {
	  var DOM = _ref.DOM;

	  var action$ = _rx2.default.Observable.merge(DOM.select('button.colorBtn.next').events('click').map(increment), DOM.select('button.colorBtn.prev').events('click').map(-increment)).do(function (x) {
	    return console.log('Color change action emitted: ' + x);
	  });

	  var color$ = action$.startWith(0).scan(nextColorIndex).do(function (x) {
	    return console.log('Colors index emitted: ' + x);
	  });

	  var vTree$ = color$.map(function (color) {
	    var nextBg = nextColorIndex(color, increment);
	    var prevBg = nextColorIndex(color, -increment);

	    return (0, _cycleSnabbdom.h)('div.page-wrapper', { key: 'colorpage', style: _styles.fadeInOutStyle }, [(0, _cycleSnabbdom.h)('div.page', {}, [(0, _cycleSnabbdom.h)('div.color-change-container.flexcenter', { style: { backgroundColor: colors[color].bg } }, [(0, _cycleSnabbdom.h)('h3', { style: { color: colors[color].font } }, 'Magic Color Changer'), (0, _cycleSnabbdom.h)('em', { style: { color: colors[color].font } }, 'Cycle (get it?) through 5 colors.'), (0, _cycleSnabbdom.h)('button.colorBtn.next', {}, 'Go to ' + colors[nextBg].bg), (0, _cycleSnabbdom.h)('button.colorBtn.prev', {}, 'Back to ' + colors[prevBg].bg)])])]);
	  }).do(function () {
	    return console.log('Colors DOM emitted');
	  });

	  return { DOM: vTree$ };
	}

	exports.default = ColorChange;

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var fadeInOutStyle = exports.fadeInOutStyle = {
	  opacity: 0,
	  transition: 'opacity 0.5s ease-in-out',
	  delayed: {
	    opacity: 1
	  },
	  remove: {
	    opacity: 0
	  },
	  destroy: {
	    opacity: 0
	  }
	};

	var fadeOutStyle = exports.fadeOutStyle = {
	  opacity: 1,
	  transition: 'opacity 0.5s ease-in-out',
	  remove: {
	    opacity: 0
	  },
	  destroy: {
	    opacity: 0
	  }
	};

	var fadeInStyle = exports.fadeInStyle = {
	  opacity: 0,
	  transition: 'opacity 0.5s ease-in-out',
	  delayed: {
	    opacity: 1
	  }
	};

	var exitAbsolutely = exports.exitAbsolutely = {
	  opacity: '0',
	  delayed: { opacity: '1' },
	  remove: { opacity: '0', position: 'absolute' }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rx = __webpack_require__(1);

	var _rx2 = _interopRequireDefault(_rx);

	var _cycleSnabbdom = __webpack_require__(5);

	var _styles = __webpack_require__(63);

	var _loading = __webpack_require__(65);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function resultView(_ref) {
	  var id = _ref.id;
	  var _ref$html_url = _ref.html_url;
	  var html_url = _ref$html_url === undefined ? 'https://github.com/' : _ref$html_url;
	  var _ref$full_name = _ref.full_name;
	  var full_name = _ref$full_name === undefined ? 'Unknown Repo Name' : _ref$full_name;
	  var _ref$description = _ref.description;
	  var description = _ref$description === undefined ? 'No description given.' : _ref$description;
	  var _ref$owner = _ref.owner;
	  var owner = _ref$owner === undefined ? {
	    html_url: 'https://github.com/',
	    avatar_url: '',
	    login: '?'
	  } : _ref$owner;

	  var html = (0, _cycleSnabbdom.h)('div.search-result', {
	    key: id,
	    style: {
	      opacity: 0, transform: 'translateY(-100px)',
	      delayed: { opacity: 1, transform: 'translateY(0px)' },
	      remove: { opacity: 0, transform: 'translateY(-100px)' }
	    }
	  }, [(0, _cycleSnabbdom.h)('a.gh-owner-link', { props: { href: owner.html_url } }, [(0, _cycleSnabbdom.h)('img.gh-avatar', { props: { src: owner.avatar_url } }), owner.login]), (0, _cycleSnabbdom.h)('a.gh-link', { props: { href: html_url } }, [(0, _cycleSnabbdom.h)('h1', {}, full_name), description])]);
	  return html;
	}

	function githubSearch(_ref2) {
	  var DOM = _ref2.DOM;
	  var HTTP = _ref2.HTTP;

	  var GITHUB_SEARCH_API = 'https://api.github.com/search/repositories?q=';

	  // Requests for Github repositories happen when the input field changes,
	  // debounced by 500ms, ignoring empty input field.
	  var searchRequest$ = DOM.select('.field').events('input').do(function () {
	    console.log('GH input changed');
	  }).debounce(500).map(function (ev) {
	    return ev.target.value.trim();
	  }) //added trim to reduce useless searches
	  .filter(function (query) {
	    return query.length > 0;
	  }).map(function (q) {
	    return GITHUB_SEARCH_API + encodeURI(q);
	  }).do(function (x) {
	    return console.log('GH search request emitted: ' + x);
	  }).share(); //needed because multiple observables will subscribe

	  // Convert the stream of HTTP responses to virtual DOM elements.
	  var searchResponse$ = HTTP.filter(function (res$) {
	    return res$ && res$.request.url.indexOf(GITHUB_SEARCH_API) === 0;
	  }).flatMapLatest(function (x) {
	    return x;
	  }) //Needed because HTTP gives an Observable when you map it
	  .map(function (res) {
	    return res.body.items;
	  }).startWith([]).do(function (x) {
	    return console.log('GH search response emitted: ' + x.length + ' items');
	  }).share(); //needed because multiple observables will subscribe

	  //loading indication.  true if request is newer than response
	  var loading$ = searchRequest$.map(true).merge(searchResponse$.map(false)).startWith(false).do(function (x) {
	    return console.log('GH loading status emitted: ' + x);
	  });

	  //Combined state observable which triggers view updates
	  var state$ = _rx2.default.Observable.combineLatest(searchResponse$, loading$, function (res, loading) {
	    return { results: res, loading: loading };
	  }).do(function () {
	    return console.log('GH state emitted');
	  });

	  //Convert state to DOM
	  var vtree$ = state$.map(function (_ref3) {
	    var results = _ref3.results;
	    var loading = _ref3.loading;
	    return (0, _cycleSnabbdom.h)('div.page-wrapper', { key: 'ghpage', style: _styles.fadeInOutStyle }, [(0, _cycleSnabbdom.h)('div.page.github-search-container', {}, [(0, _cycleSnabbdom.h)('label.label', {}, 'Search:'), (0, _cycleSnabbdom.h)('input.field', { props: { type: 'text' } }), (0, _cycleSnabbdom.h)('hr'), (0, _cycleSnabbdom.h)('section.search-results', {}, results.map(resultView).concat(loading ? (0, _loading2.default)() : null))])]);
	  }).do(function () {
	    return console.log('GH DOM emitted');
	  });

	  return {
	    DOM: vtree$,
	    HTTP: searchRequest$
	  };
	}

	exports.default = githubSearch;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cycleSnabbdom = __webpack_require__(5);

	var _styles = __webpack_require__(63);

	var _styles2 = _interopRequireDefault(_styles);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function loadingSpinner() {
	  return (0, _cycleSnabbdom.h)('div.spinner-container', { style: _styles2.default }, [(0, _cycleSnabbdom.h)('div.spinner', [(0, _cycleSnabbdom.h)('div.rect1'), (0, _cycleSnabbdom.h)('div.rect2'), (0, _cycleSnabbdom.h)('div.rect3'), (0, _cycleSnabbdom.h)('div.rect4'), (0, _cycleSnabbdom.h)('div.rect5')])]);
	}

	exports.default = loadingSpinner;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _List = __webpack_require__(67);

	var _List2 = _interopRequireDefault(_List);

	var _Detail = __webpack_require__(69);

	var _Detail2 = _interopRequireDefault(_Detail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import Rx from 'rx'

	function mapContent(sources, action) {
	  switch (action.view) {
	    case 'list':
	      console.log('Hero: Show the list view!');
	      return (0, _List2.default)(sources);
	    case 'details':
	      console.log('Hero: Show the details view!');
	      return (0, _Detail2.default)(sources, action.url);
	    default:
	      console.log('Hero: Show the list view! (default)');
	      return (0, _List2.default)(sources);
	  }
	}

	function HeroComplex(sources) {
	  //User intents
	  var listItemClick$ = sources.DOM.select('.hero-item').events('click').filter(function (ev) {
	    return ev.target.detailUrl;
	  }).map(function (ev) {
	    return {
	      view: 'details',
	      url: ev.target.detailUrl
	    };
	  });

	  var detailCloseClick$ = sources.DOM.select('.detail-close').events('click').map(function () {
	    return {
	      view: 'list'
	    };
	  });

	  var action$ = listItemClick$.merge(detailCloseClick$).startWith({ view: 'list' });

	  var state$ = action$.map(function (action) {
	    return mapContent(sources, action);
	  }).shareReplay(1);

	  var heroContent = {
	    DOM: state$.filter(function (x) {
	      return x.DOM;
	    }).map(function (x) {
	      return x.DOM;
	    }).do(function () {
	      console.log('Hero: Content DOM mapped');
	    }),
	    HTTP: state$.filter(function (x) {
	      return x.HTTP;
	    }).map(function (x) {
	      return x.HTTP;
	    }).do(function () {
	      console.log('Hero: Content HTTP mapped');
	    }).filter(function (x) {
	      return x;
	    }).flatMapLatest(function (x) {
	      return x;
	    }).do(function () {
	      console.log('Hero: Content HTTP filtered');
	    })
	  };

	  return heroContent; //sinks
	}

	exports.default = HeroComplex;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rx = __webpack_require__(1);

	var _rx2 = _interopRequireDefault(_rx);

	var _cycleSnabbdom = __webpack_require__(5);

	var _utils = __webpack_require__(68);

	var _loading = __webpack_require__(65);

	var _loading2 = _interopRequireDefault(_loading);

	var _styles = __webpack_require__(63);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function resultView(_ref) {
	  var id = _ref.id;
	  var _ref$url = _ref.url;
	  var url = _ref$url === undefined ? 'https://api.github.com/' : _ref$url;
	  var _ref$full_name = _ref.full_name;
	  var full_name = _ref$full_name === undefined ? 'Unknown Repo Name' : _ref$full_name;
	  var _ref$description = _ref.description;
	  var description = _ref$description === undefined ? 'No description given.' : _ref$description;
	  var _ref$owner = _ref.owner;
	  var owner = _ref$owner === undefined ? {
	    html_url: 'https://github.com/',
	    avatar_url: '',
	    login: '?'
	  } : _ref$owner;

	  var html = (0, _cycleSnabbdom.h)('article.hero.hero-item', {
	    key: id,
	    props: {
	      detailUrl: url
	    }
	  }, //hero: {id: `repo${id}`},
	  [(0, _cycleSnabbdom.h)('img.hero', { props: { src: owner.avatar_url }, hero: { id: 'repo' + id } }), (0, _cycleSnabbdom.h)('h1.hero.repo', {}, full_name), (0, _cycleSnabbdom.h)('div.small', {}, description), (0, _cycleSnabbdom.h)('div.small', {}, 'by ' + owner.login)]);
	  return html;
	}

	function HeroList(_ref2) {
	  var HTTP = _ref2.HTTP;

	  var GET_REQUEST_URL = 'https://api.github.com/users/cyclejs/repos';

	  //Send HTTP request to get data for the page
	  //.shareReplay(1) is needed because this observable
	  //immediately emmits its value before anything can
	  //subscribe to it.
	  var dataRequest$ = _rx2.default.Observable.just(GET_REQUEST_URL).do(function () {
	    return console.log('Hero list: Search request subscribed');
	  }).shareReplay(1);

	  // Convert the stream of HTTP responses to virtual DOM elements.
	  var dataResponse$ = HTTP.filter(function (res$) {
	    return (0, _utils.checkRequestUrl)(res$, GET_REQUEST_URL);
	  }).flatMapLatest(function (x) {
	    return x;
	  }) //Needed because HTTP gives an Observable when you map it
	  .map(function (res) {
	    return res.body;
	  }).startWith([]).do(function (x) {
	    return console.log('Hero list: HTTP response emitted: ' + x.length + ' items');
	  }).share();

	  //loading indication.  true if request is newer than response
	  var loading$ = dataRequest$.map(true).merge(dataResponse$.map(false)).do(function (x) {
	    return console.log('Hero List: loading status emitted: ' + x);
	  });

	  //Combined state observable which triggers view updates
	  var state$ = _rx2.default.Observable.combineLatest(dataResponse$, loading$, function (res, loading) {
	    return { results: res, loading: loading };
	  }).do(function () {
	    return console.log('Hero List: state emitted');
	  });

	  //Map state into DOM elements
	  var vtree$ = state$.map(function (_ref3) {
	    var results = _ref3.results;
	    var loading = _ref3.loading;
	    return (0, _cycleSnabbdom.h)('div.page-wrapper', { key: 'herolistpage', style: _styles.fadeInStyle }, [(0, _cycleSnabbdom.h)('div', { style: { height: '100%', overflow: 'auto' } }, [(0, _cycleSnabbdom.h)('h1', {}, 'Repo List'), (0, _cycleSnabbdom.h)('section.flex', {}, results.map(resultView).concat(loading ? (0, _loading2.default)() : null))])]);
	  }).do(function () {
	    return console.log('Hero list: DOM emitted');
	  });

	  return {
	    DOM: vtree$,
	    HTTP: dataRequest$
	  };
	}

	exports.default = HeroList;

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.checkRequestUrl = checkRequestUrl;
	function checkRequestUrl(res$, url) {
	  try {
	    return res$.request.url.indexOf(url) === 0;
	  } catch (e) {
	    return false;
	  }
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rx = __webpack_require__(1);

	var _rx2 = _interopRequireDefault(_rx);

	var _cycleSnabbdom = __webpack_require__(5);

	var _utils = __webpack_require__(68);

	var _styles = __webpack_require__(63);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import loadingSpinner from '../../global/loading'

	function detailView(_ref) {
	  var id = _ref.id;
	  var _ref$full_name = _ref.full_name;
	  var full_name = _ref$full_name === undefined ? 'Unknown Repo Name' : _ref$full_name;
	  var _ref$description = _ref.description;
	  var description = _ref$description === undefined ? 'No description given.' : _ref$description;
	  var _ref$stargazers_count = _ref.stargazers_count;
	  var stargazers_count = _ref$stargazers_count === undefined ? '?' : _ref$stargazers_count;
	  var _ref$language = _ref.language;
	  var language = _ref$language === undefined ? '?' : _ref$language;
	  var _ref$owner = _ref.owner;
	  var owner = _ref$owner === undefined ? {
	    avatar_url: '',
	    login: '?'
	  } : _ref$owner;

	  var html = (0, _cycleSnabbdom.h)('div.hero-detail.hero', {}, [(0, _cycleSnabbdom.h)('img.hero-details-avatar.hero', { props: { src: owner.avatar_url }, hero: { id: 'repo' + id } }), (0, _cycleSnabbdom.h)('h3', {}, owner.login), (0, _cycleSnabbdom.h)('h1', {}, full_name), (0, _cycleSnabbdom.h)('span', {}, 'Stars: ' + stargazers_count + '  -  Language: ' + language), (0, _cycleSnabbdom.h)('p', {}, description), (0, _cycleSnabbdom.h)('button.detail-close', {}, 'Back to List')]);
	  return html;
	}

	function HeroDetail(_ref2) {
	  var HTTP = _ref2.HTTP;
	  var repoUrl = arguments.length <= 1 || arguments[1] === undefined ? 'https://api.github.com/repos/paldepind/snabbdom' : arguments[1];

	  var GET_REQUEST_URL = repoUrl;

	  //Send HTTP request to get data for the page
	  var searchRequest$ = _rx2.default.Observable.just(GET_REQUEST_URL).do(function (x) {
	    return console.log('Hero Detail: Sent GET request to: ' + x);
	  });

	  // Convert the stream of HTTP responses to virtual DOM elements.
	  var searchResponse$ = HTTP.filter(function (res$) {
	    return (0, _utils.checkRequestUrl)(res$, GET_REQUEST_URL);
	  }).flatMapLatest(function (x) {
	    return x;
	  }) //Needed because HTTP gives an Observable when you map it
	  .map(function (res) {
	    return res.body;
	  }).do(function () {
	    return console.log('Hero Detail: HTTP response emitted');
	  });

	  //Map current state to DOM elements
	  var vtree$ = searchResponse$.filter(function (results) {
	    return results;
	  }) //ignore any null or undefined responses
	  .map(function (results) {
	    return (0, _cycleSnabbdom.h)('div.page-wrapper', { key: 'herodetailpage', style: _styles.fadeInOutStyle }, [(0, _cycleSnabbdom.h)('h1', {}, 'Repo Details'), (0, _cycleSnabbdom.h)('div.page.hero-detail-container', {}, [detailView(results)])]);
	  }).do(function () {
	    return console.log('Hero Detail: DOM emitted');
	  });

	  return {
	    DOM: vtree$,
	    HTTP: searchRequest$
	  };
	}

	exports.default = HeroDetail;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cycleSnabbdom = __webpack_require__(5);

	var _styles = __webpack_require__(63);

	var HERO_ID = 'test-hero-simple';
	var HERO_TEXT = 'HERO';

	var falseView = (0, _cycleSnabbdom.h)('div.falsebox.hero', {
	  style: {
	    position: 'absolute', //needed because the two boxes must overlap during transition
	    width: '100px', height: '100px',
	    backgroundColor: 'rgb(255,107,64)',
	    margin: '1rem', padding: '1rem',
	    borderRadius: '3px',
	    boxShadow: '1px 1px 2px 0px black',
	    opacity: '0',
	    delayed: { opacity: '1' },
	    remove: { opacity: '0' }
	  }
	}, [(0, _cycleSnabbdom.h)('span.falsetext.hero', { hero: { id: HERO_ID } }, HERO_TEXT)]);

	var trueView = (0, _cycleSnabbdom.h)('div.truebox.hero', {
	  style: {
	    position: 'absolute', //needed because the two boxes must overlap during transition
	    width: '300px', height: '200px',
	    backgroundColor: 'rgb(123,73,17)',
	    margin: '5rem', padding: '1rem',
	    borderRadius: '3px',
	    boxShadow: '1px 1px 2px 0px black',
	    opacity: '0',
	    delayed: { opacity: '1' },
	    remove: { opacity: '0' }
	  }
	}, [(0, _cycleSnabbdom.h)('span.truetext.hero', { hero: { id: HERO_ID } }, HERO_TEXT)]);

	var view = function view(toggled) {
	  return (0, _cycleSnabbdom.h)('div.page', { key: 'heroSimplePage', style: _styles.fadeInOutStyle }, [(0, _cycleSnabbdom.h)('input#box1', { props: { type: 'checkbox' } }), 'Toggle me', (0, _cycleSnabbdom.h)('div#box-wrapper', { style: { position: 'relative' } }, [toggled ? trueView : falseView])]);
	};

	function HeroSimple(_ref) {
	  var DOM = _ref.DOM;

	  var vTree$ = DOM.select('input').events('change').map(function (ev) {
	    return ev.target.checked;
	  }).startWith(false).do(function (x) {
	    console.log('Checkbox value changed to ' + x);
	  }).map(view);

	  return { DOM: vTree$ };
	}

	exports.default = HeroSimple;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cycleSnabbdom = __webpack_require__(5);

	var _styles = __webpack_require__(63);

	var HERO_ID_KITTY1 = 'heroKitty1';
	var HERO_ID_KITTY2 = 'heroKitty2';
	var HERO_H1 = 'heroH1';
	var HERO_SPAN = 'heroSpan';
	var HERO_P_FIXED = 'heroPFixed';
	var HERO_P_PERCENT = 'heroPPercent';
	var HERO_SHADOWY = 'heroShadowy';

	var falseView = (0, _cycleSnabbdom.h)('div.page-wrapper.false', { style: _styles.fadeInOutStyle }, [(0, _cycleSnabbdom.h)('div.row', {}, [(0, _cycleSnabbdom.h)('div.col', {}, [(0, _cycleSnabbdom.h)('img.fixed.hero', { props: { src: 'img/kitty1.jpg' }, hero: { id: HERO_ID_KITTY1 } }), (0, _cycleSnabbdom.h)('p.hero', { hero: { id: HERO_P_FIXED } }, 'Image with fixed sizing.')]), (0, _cycleSnabbdom.h)('div.col', {}, [(0, _cycleSnabbdom.h)('img.percent.hero', { props: { src: 'img/kitty2.jpg' }, hero: { id: HERO_ID_KITTY2 } }), (0, _cycleSnabbdom.h)('p.hero', { hero: { id: HERO_P_PERCENT } }, 'Image with percent sizing.')]), (0, _cycleSnabbdom.h)('div.col.whitetext', {}, [(0, _cycleSnabbdom.h)('h1.hero', { hero: { id: HERO_H1 } }, 'Big Text.'), (0, _cycleSnabbdom.h)('div.shadowy1.hero', { hero: { id: HERO_SHADOWY } }, [])]), (0, _cycleSnabbdom.h)('div.col', {}, [(0, _cycleSnabbdom.h)('span.small.hero', { hero: { id: HERO_SPAN } }, 'Small text.'), (0, _cycleSnabbdom.h)('p', {}, 'Left justified')])])]);

	var trueView = (0, _cycleSnabbdom.h)('div.page-wrapper.true', { style: _styles.fadeInOutStyle }, [(0, _cycleSnabbdom.h)('div', { style: { height: '150px', background: 'red' } }, []), (0, _cycleSnabbdom.h)('div.row', {}, [(0, _cycleSnabbdom.h)('div.col', {}, [(0, _cycleSnabbdom.h)('img.fixed.hero', { props: { src: 'img/kitty2.jpg' }, hero: { id: HERO_ID_KITTY2 } }), (0, _cycleSnabbdom.h)('p.hero', { hero: { id: HERO_P_FIXED } }, 'Image with fixed sizing.')]), (0, _cycleSnabbdom.h)('div.col-center', {}, [(0, _cycleSnabbdom.h)('span.small.hero', { hero: { id: HERO_SPAN } }, 'Small text.'), (0, _cycleSnabbdom.h)('p', {}, 'Centered')]), (0, _cycleSnabbdom.h)('div.col', {}, [(0, _cycleSnabbdom.h)('p.hero', { hero: { id: HERO_P_PERCENT } }, 'Image with percent sizing.'), (0, _cycleSnabbdom.h)('img.percent.hero', { props: { src: 'img/kitty1.jpg' }, hero: { id: HERO_ID_KITTY1 } })]), (0, _cycleSnabbdom.h)('div.col-right', {}, [(0, _cycleSnabbdom.h)('div.shadowy2.hero', { hero: { id: HERO_SHADOWY } }, []), (0, _cycleSnabbdom.h)('h1.hero.small', { hero: { id: HERO_H1 } }, 'Big Text.')])])]);

	var view = function view(value) {
	  return (0, _cycleSnabbdom.h)('div.heroTests', {}, [(0, _cycleSnabbdom.h)('input.clickme', { props: { type: 'checkbox' } }), 'Click Me!', (0, _cycleSnabbdom.h)('div', { style: { position: 'relative' } }, [value ? trueView : falseView])]);
	};

	function HeroTests(_ref) {
	  var DOM = _ref.DOM;

	  var checked$ = DOM.select('.clickme').events('change').map(function (ev) {
	    return ev.target.checked;
	  }).startWith(false);

	  var vTree$ = checked$.map(view);

	  return { DOM: vTree$ };
	}

	exports.default = HeroTests;

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	function isPattern(candidate) {
	  return typeof candidate === "string" && (candidate.charAt(0) === "/" || candidate === "*");
	}

	function isRouteConfigurationObject(routes) {
	  if (typeof routes !== "object") {
	    return false;
	  }
	  for (var path in routes) {
	    if (routes.hasOwnProperty(path)) {
	      return isPattern(path);
	    }
	  }
	}

	function unprefixed(fullStr, prefix) {
	  return fullStr.split(prefix)[1];
	}

	function matchesWithParams(sourcePath, pattern) {
	  var sourceParts = sourcePath.split("/").filter(function (s) {
	    return s.length > 0;
	  });
	  var patternParts = pattern.split("/").filter(function (s) {
	    return s.length > 0;
	  });
	  var params = patternParts.map(function (patternPart, index) {
	    if (patternPart.match(/:\w+/) !== null) {
	      return sourceParts[index];
	    } else {
	      return null;
	    }
	  }).filter(function (x) {
	    return x !== null;
	  });
	  var matched = patternParts.every(function (part, i) {
	    return part.match(/:\w+/) !== null || part === sourceParts[i];
	  });
	  return matched ? params : [];
	}

	function validateSwitchPathPreconditions(sourcePath, routes) {
	  if (typeof sourcePath !== "string") {
	    throw new Error("Invalid source path. We expected to see a string given " + "as the sourcePath (first argument) to switchPath.");
	  }
	  if (!isRouteConfigurationObject(routes)) {
	    throw new Error("Invalid routes object. We expected to see a routes " + "configuration object where keys are strings that look like '/foo'. " + "These keys must start with a slash '/'.");
	  }
	}

	function validatePatternPreconditions(pattern) {
	  if (!isPattern(pattern)) {
	    throw new Error("Paths in route configuration must be strings that start " + "with a slash '/'.");
	  }
	}

	function isNormalPattern(routes, pattern) {
	  if (pattern === "*" || !routes.hasOwnProperty(pattern)) {
	    return false;
	  }
	  return true;
	}

	function handleTrailingSlash(paramsFn) {
	  if (isRouteConfigurationObject(paramsFn)) {
	    return paramsFn["/"];
	  }
	  return paramsFn;
	}

	function getParamsFnValue(paramFn, params) {
	  var _paramFn = handleTrailingSlash(paramFn);
	  if (typeof _paramFn !== "function") {
	    return _paramFn;
	  }
	  return _paramFn.apply(null, params);
	}

	function splitPath(path) {
	  var pathParts = path.split("/");
	  if (pathParts[pathParts.length - 1] === "") {
	    pathParts.pop();
	  }
	  return pathParts;
	}

	function validatePath(sourcePath, matchedPath) {
	  if (matchedPath === null) {
	    return "";
	  }
	  var sourceParts = splitPath(sourcePath);
	  var matchedParts = splitPath(matchedPath);
	  var validPath = sourceParts.map(function (part, index) {
	    if (part !== matchedParts[index]) {
	      return null;
	    }
	    return part;
	  }).filter(function (x) {
	    return x !== null;
	  }).join("/");
	  return validPath;
	}

	function validate(_ref) {
	  var sourcePath = _ref.sourcePath;
	  var matchedPath = _ref.matchedPath;
	  var value = _ref.value;
	  var routes = _ref.routes;

	  var validPath = validatePath(sourcePath, matchedPath);
	  if (!validPath) {
	    validPath = !routes["*"] ? null : sourcePath;
	    var validValue = !validPath ? null : routes["*"];
	    return {
	      validPath: validPath,
	      validValue: validValue
	    };
	  }
	  return { validPath: validPath, validValue: value };
	}

	function betterMatch(candidate, reference) {
	  if (candidate === null) {
	    return false;
	  }
	  if (reference === null) {
	    return true;
	  }
	  return candidate.length >= reference.length;
	}

	function switchPath(sourcePath, routes) {
	  validateSwitchPathPreconditions(sourcePath, routes);
	  var matchedPath = null;
	  var value = null;
	  for (var pattern in routes) {
	    if (!isNormalPattern(routes, pattern)) {
	      continue;
	    }
	    validatePatternPreconditions(pattern);
	    if (sourcePath.search(pattern) === 0 && betterMatch(pattern, matchedPath)) {
	      matchedPath = pattern;
	      value = routes[pattern];
	    }
	    var params = matchesWithParams(sourcePath, pattern);
	    if (params.length > 0 && betterMatch(sourcePath, matchedPath)) {
	      matchedPath = sourcePath;
	      value = getParamsFnValue(routes[pattern], params);
	    }
	    if (isRouteConfigurationObject(routes[pattern]) && params.length === 0) {
	      var child = switchPath(unprefixed(sourcePath, pattern), routes[pattern]);
	      var nestedPath = pattern + child.path;
	      if (child.path !== null && betterMatch(nestedPath, matchedPath)) {
	        matchedPath = nestedPath;
	        value = child.value;
	      }
	    }
	    if (pattern === sourcePath) {
	      return { path: pattern, value: handleTrailingSlash(routes[pattern]) };
	    }
	  }

	  var _validate = validate({
	    sourcePath: sourcePath,
	    matchedPath: matchedPath,
	    value: value,
	    routes: routes
	  });

	  var validPath = _validate.validPath;
	  var validValue = _validate.validValue;

	  return { path: validPath, value: validValue };
	}

	module.exports = switchPath;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(74);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(76)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js!./app.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(75)();
	// imports


	// module
	exports.push([module.id, "* {\n  box-sizing: border-box; }\n\nhtml, body {\n  height: 100%;\n  margin: 0; }\n\nh1 {\n  margin: 0; }\n\nmain {\n  display: block;\n  /* ie sucks */ }\n\nbody {\n  background-color: #96aa82;\n  font-family: Helvetica, Sans;\n  padding: 0; }\n\na {\n  color: inherit;\n  text-decoration: none; }\n\nheader {\n  background: #3c3c3c;\n  line-height: 2rem;\n  margin-bottom: 1rem;\n  box-shadow: 1px 1px 1px 1px black;\n  color: white;\n  padding: 0.2rem 1rem; }\n  header select {\n    padding: 0.2rem; }\n  header a {\n    display: inline-block;\n    margin: 0.25rem;\n    padding: 0.0em 0.5em;\n    border-radius: 3px;\n    background: rgba(200, 255, 200, 0.2);\n    -webkit-transition: background-color 0.3s ease;\n    transition: background-color 0.3s ease; }\n    header a:hover {\n      background: rgba(200, 255, 200, 0.5); }\n\n.app-wrapper {\n  position: relative;\n  height: 100%; }\n\n.content-holder {\n  height: calc(100% - 3rem);\n  position: relative; }\n\n.page-wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0; }\n\n.page {\n  max-width: 960px;\n  margin: 0 auto;\n  position: relative; }\n\n.flexcenter {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n.colorBtn {\n  border: none;\n  position: relative;\n  top: 0px;\n  background-color: #e6fae6;\n  padding: 1rem;\n  border-radius: 2px;\n  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.75);\n  margin: 1rem;\n  width: 25%;\n  -webkit-transition: background-color 0.25s ease-in-out;\n  transition: background-color 0.25s ease-in-out; }\n  .colorBtn:hover {\n    background-color: white; }\n\n.color-change-container {\n  -webkit-transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;\n  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;\n  padding: 2rem;\n  box-shadow: 1px 1px 2px 0px black; }\n\n.github-search-container {\n  background: white;\n  padding: 1rem;\n  box-shadow: 1px 1px 2px 0px black;\n  height: calc(100% - 1rem);\n  color: #3c3c3c; }\n  .github-search-container .label {\n    margin-right: 0.5rem; }\n  .github-search-container .field {\n    background: none;\n    border: none;\n    border-bottom: 2px solid #3c3c3c;\n    padding: 0.25rem;\n    font-size: 1rem; }\n\n.search-results {\n  position: relative;\n  overflow-y: auto;\n  height: calc(100% - 1rem*2); }\n\n.search-result {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #f5faf5;\n  border: 1px solid #649664;\n  color: black;\n  padding: 0.5rem;\n  margin-bottom: 0.25rem;\n  -webkit-transition: opacity 0.5s ease-in-out, -webkit-transform 0.5s linear;\n  transition: opacity 0.5s ease-in-out, -webkit-transform 0.5s linear;\n  transition: opacity 0.5s ease-in-out, transform 0.5s linear;\n  transition: opacity 0.5s ease-in-out, transform 0.5s linear, -webkit-transform 0.5s linear; }\n\n.gh-owner-link {\n  padding: 0.25rem;\n  text-align: center;\n  width: 15%; }\n  .gh-owner-link .gh-avatar {\n    display: block;\n    width: 50px;\n    height: 50px;\n    margin: 0.25rem auto; }\n\n.gh-link {\n  width: 85%;\n  padding: 0.25rem; }\n  .gh-link h1 {\n    font-size: 1.2rem;\n    margin: 0; }\n\n/* HERO TRANSITION STUFF */\n.hero {\n  -webkit-transition: opacity 1s ease-in-out, -webkit-transform 1s ease-in-out;\n  transition: opacity 1s ease-in-out, -webkit-transform 1s ease-in-out;\n  transition: transform 1s ease-in-out, opacity 1s ease-in-out;\n  transition: transform 1s ease-in-out, opacity 1s ease-in-out, -webkit-transform 1s ease-in-out; }\n\n.falsetext, .truetext {\n  color: white; }\n\n.flex {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n.hero-item {\n  display: block;\n  text-align: center;\n  padding: 1rem;\n  margin: 1rem;\n  width: 200px;\n  background-color: rgba(255, 255, 255, 0.6);\n  box-shadow: 1px 2px 5px -1px black; }\n  .hero-item img {\n    height: 75px; }\n  .hero-item .repo {\n    font-size: 1.2rem;\n    font-weight: 600;\n    margin: 0; }\n  .hero-item .small {\n    font-size: 0.9rem;\n    color: #646464; }\n\n.hero-details-avatar {\n  display: block;\n  width: 100px;\n  height: 100px;\n  margin: 0.5rem auto; }\n\n.hero-detail {\n  text-align: center;\n  background-color: rgba(255, 255, 255, 0.6);\n  padding: 1rem;\n  box-shadow: 1px 1px 2px 0px black;\n  margin: 1rem;\n  color: #3c3c3c; }\n  .hero-detail button {\n    background-color: rgba(255, 255, 255, 0.7);\n    border: 1px solid #3c3c3c;\n    color: #3c3c3c;\n    font-size: 1rem;\n    padding: 0.5rem 1rem;\n    -webkit-transition: background-color 0.3s ease;\n    transition: background-color 0.3s ease; }\n    .hero-detail button:hover {\n      background-color: white; }\n\n/* HERO TESTS EXAMPLE */\n.heroTests .row {\n  width: 100%;\n  background: pink;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-flow: row nowrap;\n      -ms-flex-flow: row nowrap;\n          flex-flow: row nowrap;\n  -webkit-box-align: space-between;\n  -webkit-align-items: space-between;\n      -ms-flex-align: space-between;\n          align-items: space-between; }\n\n.heroTests .col {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: left;\n  padding: 1rem; }\n\n.heroTests .col-center {\n  -webkit-box-flex: 2;\n  -webkit-flex: 2;\n      -ms-flex: 2;\n          flex: 2;\n  text-align: center;\n  padding: 1rem;\n  background: lime; }\n\n.heroTests .col-right {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: right;\n  padding: 1rem;\n  background: #ffffc8; }\n\n.heroTests img.fixed {\n  width: 100px;\n  height: 200px; }\n\n.heroTests img.percent {\n  width: 50%;\n  height: auto; }\n\n.heroTests .small {\n  font-size: 0.5rem; }\n\n.heroTests .whitetext {\n  color: white; }\n\n.heroTests .shadowy1 {\n  box-shadow: 1px 1px 2px 0px black;\n  width: 75%;\n  height: 100px;\n  background: white; }\n\n.heroTests .shadowy2 {\n  box-shadow: 1px 1px 2px 0px black;\n  width: 10%;\n  height: 15px;\n  background: white; }\n\n/* loading spinner */\n/* from https://github.com/tobiasahlin/SpinKit */\n.spinner-container {\n  position: absolute;\n  background-color: rgba(255, 255, 255, 0.5);\n  z-index: 10;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  -webkit-transition: opacity 0.2s linear;\n  transition: opacity 0.2s linear; }\n\n.spinner {\n  margin: 10% auto;\n  width: 30%;\n  height: 15%;\n  text-align: center;\n  font-size: 10px; }\n\n.spinner > div {\n  background-color: #96aa82;\n  height: 100%;\n  width: 8%;\n  margin: 2%;\n  display: inline-block;\n  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n  animation: sk-stretchdelay 1.2s infinite ease-in-out; }\n\n.spinner .rect2 {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s; }\n\n.spinner .rect3 {\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s; }\n\n.spinner .rect4 {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s; }\n\n.spinner .rect5 {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s; }\n\n@-webkit-keyframes sk-stretchdelay {\n  0%, 40%, 100% {\n    -webkit-transform: scaleY(0.4); }\n  20% {\n    -webkit-transform: scaleY(1); } }\n\n@keyframes sk-stretchdelay {\n  0%, 40%, 100% {\n    transform: scaleY(0.4);\n    -webkit-transform: scaleY(0.4); }\n  20% {\n    transform: scaleY(1);\n    -webkit-transform: scaleY(1); } }\n", ""]);

	// exports


/***/ },
/* 75 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	/*eslint-disable */
	/* global requestAnimationFrame */
	var raf = window && window.requestAnimationFrame || setTimeout;
	var nextFrame = function nextFrame(fn) {
	  raf(function () {
	    raf(fn);
	  });
	};

	function setNextFrame(obj, prop, val) {
	  nextFrame(function () {
	    obj[prop] = val;
	  });
	}

	function getTextNodeRect(textNode) {
	  var rect;
	  if (document.createRange) {
	    var range = document.createRange();
	    range.selectNodeContents(textNode);
	    if (range.getBoundingClientRect) {
	      rect = range.getBoundingClientRect();
	    }
	  }
	  return rect;
	}

	function calcTransformOrigin(isTextNode, textRect, boundingRect) {
	  if (isTextNode) {
	    if (textRect) {
	      //calculate pixels to center of text from left edge of bounding box
	      var relativeCenterX = textRect.left + textRect.width / 2 - boundingRect.left;
	      var relativeCenterY = textRect.top + textRect.height / 2 - boundingRect.top;
	      return relativeCenterX + 'px ' + relativeCenterY + 'px';
	    }
	  }
	  return '0 0'; //top left
	}

	function getTextDx(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return oldTextRect.left + oldTextRect.width / 2 - (newTextRect.left + newTextRect.width / 2);
	  }
	  return 0;
	}
	function getTextDy(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return oldTextRect.top + oldTextRect.height / 2 - (newTextRect.top + newTextRect.height / 2);
	  }
	  return 0;
	}

	function isTextElement(elm) {
	  return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
	}

	var removed, created;

	function pre(oldVnode, vnode) {
	  removed = {};
	  created = [];
	}

	function create(oldVnode, vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    created.push(hero.id);
	    created.push(vnode);
	  }
	}

	function destroy(vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    var elm = vnode.elm;
	    vnode.isTextNode = isTextElement(elm); //is this a text node?
	    vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
	    vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
	    var computedStyle = window.getComputedStyle(elm, null); //get current styles (includes inherited properties)
	    vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
	    removed[hero.id] = vnode;
	  }
	}

	function post() {
	  var i, id, newElm, oldVnode, oldElm, hRatio, wRatio, oldRect, newRect, dx, dy, origTransform, origTransition, newStyle, oldStyle, newComputedStyle, isTextNode, newTextRect, oldTextRect;
	  for (i = 0; i < created.length; i += 2) {
	    id = created[i];
	    newElm = created[i + 1].elm;
	    oldVnode = removed[id];
	    if (oldVnode) {
	      isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
	      newStyle = newElm.style;
	      newComputedStyle = window.getComputedStyle(newElm, null); //get full computed style for new element
	      oldElm = oldVnode.elm;
	      oldStyle = oldElm.style;
	      //Overall element bounding boxes
	      newRect = newElm.getBoundingClientRect();
	      oldRect = oldVnode.boundingRect; //previously saved bounding rect
	      //Text node bounding boxes & distances
	      if (isTextNode) {
	        newTextRect = getTextNodeRect(newElm.childNodes[0]);
	        oldTextRect = oldVnode.textRect;
	        dx = getTextDx(oldTextRect, newTextRect);
	        dy = getTextDy(oldTextRect, newTextRect);
	      } else {
	        //Calculate distances between old & new positions
	        dx = oldRect.left - newRect.left;
	        dy = oldRect.top - newRect.top;
	      }
	      hRatio = newRect.height / Math.max(oldRect.height, 1);
	      wRatio = isTextNode ? hRatio : newRect.width / Math.max(oldRect.width, 1); //text scales based on hRatio
	      // Animate new element
	      origTransform = newStyle.transform;
	      origTransition = newStyle.transition;
	      if (newComputedStyle.display === 'inline') //inline elements cannot be transformed
	        newStyle.display = 'inline-block'; //this does not appear to have any negative side effects
	      newStyle.transition = origTransition + 'transform 0s';
	      newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
	      newStyle.opacity = '0';
	      newStyle.transform = origTransform + 'translate(' + dx + 'px, ' + dy + 'px) ' + 'scale(' + 1 / wRatio + ', ' + 1 / hRatio + ')';
	      setNextFrame(newStyle, 'transition', origTransition);
	      setNextFrame(newStyle, 'transform', origTransform);
	      setNextFrame(newStyle, 'opacity', '1');
	      // Animate old element
	      for (var key in oldVnode.savedStyle) {
	        //re-apply saved inherited properties
	        if (parseInt(key) != key) {
	          var ms = key.substring(0, 2) === 'ms';
	          var moz = key.substring(0, 3) === 'moz';
	          var webkit = key.substring(0, 6) === 'webkit';
	          if (!ms && !moz && !webkit) //ignore prefixed style properties
	            oldStyle[key] = oldVnode.savedStyle[key];
	        }
	      }
	      oldStyle.position = 'absolute';
	      oldStyle.top = oldRect.top + 'px'; //start at existing position
	      oldStyle.left = oldRect.left + 'px';
	      oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.margin = 0; //Margin on hero element leads to incorrect positioning
	      oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
	      oldStyle.transform = '';
	      oldStyle.opacity = '1';
	      document.body.appendChild(oldElm);
	      setNextFrame(oldStyle, 'transform', 'translate(' + -dx + 'px, ' + -dy + 'px) scale(' + wRatio + ', ' + hRatio + ')'); //scale must be on far right for translate to be correct
	      setNextFrame(oldStyle, 'opacity', '0');
	      oldElm.addEventListener('transitionend', function (ev) {
	        if (ev.propertyName === 'transform') document.body.removeChild(ev.target);
	      });
	    }
	  }
	  removed = created = undefined;
	}

	module.exports = { pre: pre, create: create, destroy: destroy, post: post };
	/*eslint-enable */

/***/ }
/******/ ]);