/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 118);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

var some$1 = some;

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var keys$1 = keys;

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

var indexOf$1 = indexOf;

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            __webpack_require__(127)("./" + name);
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) { }
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys$1(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) { // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];

            if (match[1].substr(0,3) !== momentDay) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2: // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') +
        'P' +
        (Y ? Y + 'Y' : '') +
        (M ? M + 'M' : '') +
        (D ? D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? h + 'H' : '') +
        (m ? m + 'M' : '') +
        (s ? s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.18.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(129)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Afrikaans [af]
//! author : Werner Mollentze : https://github.com/wernerm

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var af = moment.defineLocale('af', {
    months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
    monthsShort : 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
    weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
    weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
    weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
    meridiemParse: /vm|nm/i,
    isPM : function (input) {
        return /^nm$/i.test(input);
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 12) {
            return isLower ? 'vm' : 'VM';
        } else {
            return isLower ? 'nm' : 'NM';
        }
    },
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Vandag om] LT',
        nextDay : '[Môre om] LT',
        nextWeek : 'dddd [om] LT',
        lastDay : '[Gister om] LT',
        lastWeek : '[Laas] dddd [om] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'oor %s',
        past : '%s gelede',
        s : '\'n paar sekondes',
        m : '\'n minuut',
        mm : '%d minute',
        h : '\'n uur',
        hh : '%d ure',
        d : '\'n dag',
        dd : '%d dae',
        M : '\'n maand',
        MM : '%d maande',
        y : '\'n jaar',
        yy : '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
    },
    week : {
        dow : 1, // Maandag is die eerste dag van die week.
        doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
    }
});

return af;

})));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Algeria) [ar-dz]
//! author : Noureddine LOUAHEDJ : https://github.com/noureddineme

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var arDz = moment.defineLocale('ar-dz', {
    months : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'في %s',
        past : 'منذ %s',
        s : 'ثوان',
        m : 'دقيقة',
        mm : '%d دقائق',
        h : 'ساعة',
        hh : '%d ساعات',
        d : 'يوم',
        dd : '%d أيام',
        M : 'شهر',
        MM : '%d أشهر',
        y : 'سنة',
        yy : '%d سنوات'
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 4  // The week that contains Jan 1st is the first week of the year.
    }
});

return arDz;

})));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Kuwait) [ar-kw]
//! author : Nusret Parlak: https://github.com/nusretparlak

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var arKw = moment.defineLocale('ar-kw', {
    months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'في %s',
        past : 'منذ %s',
        s : 'ثوان',
        m : 'دقيقة',
        mm : '%d دقائق',
        h : 'ساعة',
        hh : '%d ساعات',
        d : 'يوم',
        dd : '%d أيام',
        M : 'شهر',
        MM : '%d أشهر',
        y : 'سنة',
        yy : '%d سنوات'
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return arKw;

})));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Lybia) [ar-ly]
//! author : Ali Hmer: https://github.com/kikoanis

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0'
};
var pluralForm = function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
};
var plurals = {
    s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
    m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
    h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
    d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
    M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
    y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
};
var pluralize = function (u) {
    return function (number, withoutSuffix, string, isFuture) {
        var f = pluralForm(number),
            str = plurals[u][pluralForm(number)];
        if (f === 2) {
            str = str[withoutSuffix ? 0 : 1];
        }
        return str.replace(/%d/i, number);
    };
};
var months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر'
];

var arLy = moment.defineLocale('ar-ly', {
    months : months,
    monthsShort : months,
    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'D/\u200FM/\u200FYYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM : function (input) {
        return 'م' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ص';
        } else {
            return 'م';
        }
    },
    calendar : {
        sameDay: '[اليوم عند الساعة] LT',
        nextDay: '[غدًا عند الساعة] LT',
        nextWeek: 'dddd [عند الساعة] LT',
        lastDay: '[أمس عند الساعة] LT',
        lastWeek: 'dddd [عند الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'بعد %s',
        past : 'منذ %s',
        s : pluralize('s'),
        m : pluralize('m'),
        mm : pluralize('m'),
        h : pluralize('h'),
        hh : pluralize('h'),
        d : pluralize('d'),
        dd : pluralize('d'),
        M : pluralize('M'),
        MM : pluralize('M'),
        y : pluralize('y'),
        yy : pluralize('y')
    },
    preparse: function (string) {
        return string.replace(/\u200f/g, '').replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return arLy;

})));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Morocco) [ar-ma]
//! author : ElFadili Yassine : https://github.com/ElFadiliY
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var arMa = moment.defineLocale('ar-ma', {
    months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
    weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'في %s',
        past : 'منذ %s',
        s : 'ثوان',
        m : 'دقيقة',
        mm : '%d دقائق',
        h : 'ساعة',
        hh : '%d ساعات',
        d : 'يوم',
        dd : '%d أيام',
        M : 'شهر',
        MM : '%d أشهر',
        y : 'سنة',
        yy : '%d سنوات'
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return arMa;

})));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic (Saudi Arabia) [ar-sa]
//! author : Suhail Alkowaileet : https://github.com/xsoh

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠'
};
var numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0'
};

var arSa = moment.defineLocale('ar-sa', {
    months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM : function (input) {
        return 'م' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ص';
        } else {
            return 'م';
        }
    },
    calendar : {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'في %s',
        past : 'منذ %s',
        s : 'ثوان',
        m : 'دقيقة',
        mm : '%d دقائق',
        h : 'ساعة',
        hh : '%d ساعات',
        d : 'يوم',
        dd : '%d أيام',
        M : 'شهر',
        MM : '%d أشهر',
        y : 'سنة',
        yy : '%d سنوات'
    },
    preparse: function (string) {
        return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
            return numberMap[match];
        }).replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return arSa;

})));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale  :  Arabic (Tunisia) [ar-tn]
//! author : Nader Toukabri : https://github.com/naderio

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var arTn = moment.defineLocale('ar-tn', {
    months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[اليوم على الساعة] LT',
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'في %s',
        past: 'منذ %s',
        s: 'ثوان',
        m: 'دقيقة',
        mm: '%d دقائق',
        h: 'ساعة',
        hh: '%d ساعات',
        d: 'يوم',
        dd: '%d أيام',
        M: 'شهر',
        MM: '%d أشهر',
        y: 'سنة',
        yy: '%d سنوات'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});

return arTn;

})));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Arabic [ar]
//! author : Abdel Said: https://github.com/abdelsaid
//! author : Ahmed Elkhatib
//! author : forabi https://github.com/forabi

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠'
};
var numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0'
};
var pluralForm = function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
};
var plurals = {
    s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
    m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
    h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
    d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
    M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
    y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
};
var pluralize = function (u) {
    return function (number, withoutSuffix, string, isFuture) {
        var f = pluralForm(number),
            str = plurals[u][pluralForm(number)];
        if (f === 2) {
            str = str[withoutSuffix ? 0 : 1];
        }
        return str.replace(/%d/i, number);
    };
};
var months = [
    'كانون الثاني يناير',
    'شباط فبراير',
    'آذار مارس',
    'نيسان أبريل',
    'أيار مايو',
    'حزيران يونيو',
    'تموز يوليو',
    'آب أغسطس',
    'أيلول سبتمبر',
    'تشرين الأول أكتوبر',
    'تشرين الثاني نوفمبر',
    'كانون الأول ديسمبر'
];

var ar = moment.defineLocale('ar', {
    months : months,
    monthsShort : months,
    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'D/\u200FM/\u200FYYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM : function (input) {
        return 'م' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ص';
        } else {
            return 'م';
        }
    },
    calendar : {
        sameDay: '[اليوم عند الساعة] LT',
        nextDay: '[غدًا عند الساعة] LT',
        nextWeek: 'dddd [عند الساعة] LT',
        lastDay: '[أمس عند الساعة] LT',
        lastWeek: 'dddd [عند الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'بعد %s',
        past : 'منذ %s',
        s : pluralize('s'),
        m : pluralize('m'),
        mm : pluralize('m'),
        h : pluralize('h'),
        hh : pluralize('h'),
        d : pluralize('d'),
        dd : pluralize('d'),
        M : pluralize('M'),
        MM : pluralize('M'),
        y : pluralize('y'),
        yy : pluralize('y')
    },
    preparse: function (string) {
        return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
            return numberMap[match];
        }).replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return ar;

})));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Azerbaijani [az]
//! author : topchiyev : https://github.com/topchiyev

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var suffixes = {
    1: '-inci',
    5: '-inci',
    8: '-inci',
    70: '-inci',
    80: '-inci',
    2: '-nci',
    7: '-nci',
    20: '-nci',
    50: '-nci',
    3: '-üncü',
    4: '-üncü',
    100: '-üncü',
    6: '-ncı',
    9: '-uncu',
    10: '-uncu',
    30: '-uncu',
    60: '-ıncı',
    90: '-ıncı'
};

var az = moment.defineLocale('az', {
    months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
    monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
    weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
    weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
    weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[bugün saat] LT',
        nextDay : '[sabah saat] LT',
        nextWeek : '[gələn həftə] dddd [saat] LT',
        lastDay : '[dünən] LT',
        lastWeek : '[keçən həftə] dddd [saat] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s sonra',
        past : '%s əvvəl',
        s : 'birneçə saniyyə',
        m : 'bir dəqiqə',
        mm : '%d dəqiqə',
        h : 'bir saat',
        hh : '%d saat',
        d : 'bir gün',
        dd : '%d gün',
        M : 'bir ay',
        MM : '%d ay',
        y : 'bir il',
        yy : '%d il'
    },
    meridiemParse: /gecə|səhər|gündüz|axşam/,
    isPM : function (input) {
        return /^(gündüz|axşam)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'gecə';
        } else if (hour < 12) {
            return 'səhər';
        } else if (hour < 17) {
            return 'gündüz';
        } else {
            return 'axşam';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
    ordinal : function (number) {
        if (number === 0) {  // special case for zero
            return number + '-ıncı';
        }
        var a = number % 10,
            b = number % 100 - a,
            c = number >= 100 ? 100 : null;
        return number + (suffixes[a] || suffixes[b] || suffixes[c]);
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return az;

})));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Belarusian [be]
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion Elensúle : https://github.com/Oire

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
        'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
        'dd': 'дзень_дні_дзён',
        'MM': 'месяц_месяцы_месяцаў',
        'yy': 'год_гады_гадоў'
    };
    if (key === 'm') {
        return withoutSuffix ? 'хвіліна' : 'хвіліну';
    }
    else if (key === 'h') {
        return withoutSuffix ? 'гадзіна' : 'гадзіну';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}

var be = moment.defineLocale('be', {
    months : {
        format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
        standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
    },
    monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
    weekdays : {
        format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
        standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
        isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
    },
    weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
    weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY г.',
        LLL : 'D MMMM YYYY г., HH:mm',
        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
    },
    calendar : {
        sameDay: '[Сёння ў] LT',
        nextDay: '[Заўтра ў] LT',
        lastDay: '[Учора ў] LT',
        nextWeek: function () {
            return '[У] dddd [ў] LT';
        },
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return '[У мінулую] dddd [ў] LT';
                case 1:
                case 2:
                case 4:
                    return '[У мінулы] dddd [ў] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'праз %s',
        past : '%s таму',
        s : 'некалькі секунд',
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : relativeTimeWithPlural,
        hh : relativeTimeWithPlural,
        d : 'дзень',
        dd : relativeTimeWithPlural,
        M : 'месяц',
        MM : relativeTimeWithPlural,
        y : 'год',
        yy : relativeTimeWithPlural
    },
    meridiemParse: /ночы|раніцы|дня|вечара/,
    isPM : function (input) {
        return /^(дня|вечара)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ночы';
        } else if (hour < 12) {
            return 'раніцы';
        } else if (hour < 17) {
            return 'дня';
        } else {
            return 'вечара';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
            case 'w':
            case 'W':
                return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
            case 'D':
                return number + '-га';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return be;

})));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bulgarian [bg]
//! author : Krasen Borisov : https://github.com/kraz

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var bg = moment.defineLocale('bg', {
    months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
    monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
    weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
    weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
    weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'D.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY H:mm',
        LLLL : 'dddd, D MMMM YYYY H:mm'
    },
    calendar : {
        sameDay : '[Днес в] LT',
        nextDay : '[Утре в] LT',
        nextWeek : 'dddd [в] LT',
        lastDay : '[Вчера в] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 6:
                    return '[В изминалата] dddd [в] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[В изминалия] dddd [в] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'след %s',
        past : 'преди %s',
        s : 'няколко секунди',
        m : 'минута',
        mm : '%d минути',
        h : 'час',
        hh : '%d часа',
        d : 'ден',
        dd : '%d дни',
        M : 'месец',
        MM : '%d месеца',
        y : 'година',
        yy : '%d години'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
    ordinal : function (number) {
        var lastDigit = number % 10,
            last2Digits = number % 100;
        if (number === 0) {
            return number + '-ев';
        } else if (last2Digits === 0) {
            return number + '-ен';
        } else if (last2Digits > 10 && last2Digits < 20) {
            return number + '-ти';
        } else if (lastDigit === 1) {
            return number + '-ви';
        } else if (lastDigit === 2) {
            return number + '-ри';
        } else if (lastDigit === 7 || lastDigit === 8) {
            return number + '-ми';
        } else {
            return number + '-ти';
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return bg;

})));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bengali [bn]
//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '0': '০'
};
var numberMap = {
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
    '০': '0'
};

var bn = moment.defineLocale('bn', {
    months : 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
    monthsShort : 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
    weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
    weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
    weekdaysMin : 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
    longDateFormat : {
        LT : 'A h:mm সময়',
        LTS : 'A h:mm:ss সময়',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm সময়',
        LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
    },
    calendar : {
        sameDay : '[আজ] LT',
        nextDay : '[আগামীকাল] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[গতকাল] LT',
        lastWeek : '[গত] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s পরে',
        past : '%s আগে',
        s : 'কয়েক সেকেন্ড',
        m : 'এক মিনিট',
        mm : '%d মিনিট',
        h : 'এক ঘন্টা',
        hh : '%d ঘন্টা',
        d : 'এক দিন',
        dd : '%d দিন',
        M : 'এক মাস',
        MM : '%d মাস',
        y : 'এক বছর',
        yy : '%d বছর'
    },
    preparse: function (string) {
        return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if ((meridiem === 'রাত' && hour >= 4) ||
                (meridiem === 'দুপুর' && hour < 5) ||
                meridiem === 'বিকাল') {
            return hour + 12;
        } else {
            return hour;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'রাত';
        } else if (hour < 10) {
            return 'সকাল';
        } else if (hour < 17) {
            return 'দুপুর';
        } else if (hour < 20) {
            return 'বিকাল';
        } else {
            return 'রাত';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return bn;

})));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tibetan [bo]
//! author : Thupten N. Chakrishar : https://github.com/vajradog

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '༡',
    '2': '༢',
    '3': '༣',
    '4': '༤',
    '5': '༥',
    '6': '༦',
    '7': '༧',
    '8': '༨',
    '9': '༩',
    '0': '༠'
};
var numberMap = {
    '༡': '1',
    '༢': '2',
    '༣': '3',
    '༤': '4',
    '༥': '5',
    '༦': '6',
    '༧': '7',
    '༨': '8',
    '༩': '9',
    '༠': '0'
};

var bo = moment.defineLocale('bo', {
    months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
    monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
    weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
    weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
    weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
    longDateFormat : {
        LT : 'A h:mm',
        LTS : 'A h:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm',
        LLLL : 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar : {
        sameDay : '[དི་རིང] LT',
        nextDay : '[སང་ཉིན] LT',
        nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
        lastDay : '[ཁ་སང] LT',
        lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ལ་',
        past : '%s སྔན་ལ',
        s : 'ལམ་སང',
        m : 'སྐར་མ་གཅིག',
        mm : '%d སྐར་མ',
        h : 'ཆུ་ཚོད་གཅིག',
        hh : '%d ཆུ་ཚོད',
        d : 'ཉིན་གཅིག',
        dd : '%d ཉིན་',
        M : 'ཟླ་བ་གཅིག',
        MM : '%d ཟླ་བ',
        y : 'ལོ་གཅིག',
        yy : '%d ལོ'
    },
    preparse: function (string) {
        return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
                (meridiem === 'ཉིན་གུང' && hour < 5) ||
                meridiem === 'དགོང་དག') {
            return hour + 12;
        } else {
            return hour;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'མཚན་མོ';
        } else if (hour < 10) {
            return 'ཞོགས་ཀས';
        } else if (hour < 17) {
            return 'ཉིན་གུང';
        } else if (hour < 20) {
            return 'དགོང་དག';
        } else {
            return 'མཚན་མོ';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return bo;

})));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Breton [br]
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function relativeTimeWithMutation(number, withoutSuffix, key) {
    var format = {
        'mm': 'munutenn',
        'MM': 'miz',
        'dd': 'devezh'
    };
    return number + ' ' + mutation(format[key], number);
}
function specialMutationForYears(number) {
    switch (lastNumber(number)) {
        case 1:
        case 3:
        case 4:
        case 5:
        case 9:
            return number + ' bloaz';
        default:
            return number + ' vloaz';
    }
}
function lastNumber(number) {
    if (number > 9) {
        return lastNumber(number % 10);
    }
    return number;
}
function mutation(text, number) {
    if (number === 2) {
        return softMutation(text);
    }
    return text;
}
function softMutation(text) {
    var mutationTable = {
        'm': 'v',
        'b': 'v',
        'd': 'z'
    };
    if (mutationTable[text.charAt(0)] === undefined) {
        return text;
    }
    return mutationTable[text.charAt(0)] + text.substring(1);
}

var br = moment.defineLocale('br', {
    months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
    monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
    weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
    weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
    weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'h[e]mm A',
        LTS : 'h[e]mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D [a viz] MMMM YYYY',
        LLL : 'D [a viz] MMMM YYYY h[e]mm A',
        LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
    },
    calendar : {
        sameDay : '[Hiziv da] LT',
        nextDay : '[Warc\'hoazh da] LT',
        nextWeek : 'dddd [da] LT',
        lastDay : '[Dec\'h da] LT',
        lastWeek : 'dddd [paset da] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'a-benn %s',
        past : '%s \'zo',
        s : 'un nebeud segondennoù',
        m : 'ur vunutenn',
        mm : relativeTimeWithMutation,
        h : 'un eur',
        hh : '%d eur',
        d : 'un devezh',
        dd : relativeTimeWithMutation,
        M : 'ur miz',
        MM : relativeTimeWithMutation,
        y : 'ur bloaz',
        yy : specialMutationForYears
    },
    dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
    ordinal : function (number) {
        var output = (number === 1) ? 'añ' : 'vet';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return br;

})));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Bosnian [bs]
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan Marković

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function translate(number, withoutSuffix, key) {
    var result = number + ' ';
    switch (key) {
        case 'm':
            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
        case 'mm':
            if (number === 1) {
                result += 'minuta';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'minute';
            } else {
                result += 'minuta';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'jedan sat' : 'jednog sata';
        case 'hh':
            if (number === 1) {
                result += 'sat';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'sata';
            } else {
                result += 'sati';
            }
            return result;
        case 'dd':
            if (number === 1) {
                result += 'dan';
            } else {
                result += 'dana';
            }
            return result;
        case 'MM':
            if (number === 1) {
                result += 'mjesec';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'mjeseca';
            } else {
                result += 'mjeseci';
            }
            return result;
        case 'yy':
            if (number === 1) {
                result += 'godina';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'godine';
            } else {
                result += 'godina';
            }
            return result;
    }
}

var bs = moment.defineLocale('bs', {
    months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd, D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay  : '[danas u] LT',
        nextDay  : '[sutra u] LT',
        nextWeek : function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[jučer u] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                case 3:
                    return '[prošlu] dddd [u] LT';
                case 6:
                    return '[prošle] [subote] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prošli] dddd [u] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'prije %s',
        s      : 'par sekundi',
        m      : translate,
        mm     : translate,
        h      : translate,
        hh     : translate,
        d      : 'dan',
        dd     : translate,
        M      : 'mjesec',
        MM     : translate,
        y      : 'godinu',
        yy     : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return bs;

})));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Catalan [ca]
//! author : Juan G. Hurtado : https://github.com/juanghurtado

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ca = moment.defineLocale('ca', {
    months : {
        standalone: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
        format: 'de gener_de febrer_de març_d\'abril_de maig_de juny_de juliol_d\'agost_de setembre_d\'octubre_de novembre_de desembre'.split('_'),
        isFormat: /D[oD]?(\s)+MMMM/
    },
    monthsShort : 'gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
    monthsParseExact : true,
    weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
    weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
    weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD/MM/YYYY',
        LL : '[el] D MMMM [de] YYYY',
        ll : 'D MMM YYYY',
        LLL : '[el] D MMMM [de] YYYY [a les] H:mm',
        lll : 'D MMM YYYY, H:mm',
        LLLL : '[el] dddd D MMMM [de] YYYY [a les] H:mm',
        llll : 'ddd D MMM YYYY, H:mm'
    },
    calendar : {
        sameDay : function () {
            return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        nextDay : function () {
            return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        lastDay : function () {
            return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'd\'aquí %s',
        past : 'fa %s',
        s : 'uns segons',
        m : 'un minut',
        mm : '%d minuts',
        h : 'una hora',
        hh : '%d hores',
        d : 'un dia',
        dd : '%d dies',
        M : 'un mes',
        MM : '%d mesos',
        y : 'un any',
        yy : '%d anys'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
    ordinal : function (number, period) {
        var output = (number === 1) ? 'r' :
            (number === 2) ? 'n' :
            (number === 3) ? 'r' :
            (number === 4) ? 't' : 'è';
        if (period === 'w' || period === 'W') {
            output = 'a';
        }
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return ca;

})));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Czech [cs]
//! author : petrbela : https://github.com/petrbela

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_');
var monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
function plural(n) {
    return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
}
function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':  // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
        case 'm':  // a minute / in a minute / a minute ago
            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'minuty' : 'minut');
            } else {
                return result + 'minutami';
            }
            break;
        case 'h':  // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'hodiny' : 'hodin');
            } else {
                return result + 'hodinami';
            }
            break;
        case 'd':  // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'dny' : 'dní');
            } else {
                return result + 'dny';
            }
            break;
        case 'M':  // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'měsíce' : 'měsíců');
            } else {
                return result + 'měsíci';
            }
            break;
        case 'y':  // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'roky' : 'let');
            } else {
                return result + 'lety';
            }
            break;
    }
}

var cs = moment.defineLocale('cs', {
    months : months,
    monthsShort : monthsShort,
    monthsParse : (function (months, monthsShort) {
        var i, _monthsParse = [];
        for (i = 0; i < 12; i++) {
            // use custom parser to solve problem with July (červenec)
            _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
        }
        return _monthsParse;
    }(months, monthsShort)),
    shortMonthsParse : (function (monthsShort) {
        var i, _shortMonthsParse = [];
        for (i = 0; i < 12; i++) {
            _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
        }
        return _shortMonthsParse;
    }(monthsShort)),
    longMonthsParse : (function (months) {
        var i, _longMonthsParse = [];
        for (i = 0; i < 12; i++) {
            _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
        }
        return _longMonthsParse;
    }(months)),
    weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
    weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
    weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
    longDateFormat : {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd D. MMMM YYYY H:mm',
        l : 'D. M. YYYY'
    },
    calendar : {
        sameDay: '[dnes v] LT',
        nextDay: '[zítra v] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[v neděli v] LT';
                case 1:
                case 2:
                    return '[v] dddd [v] LT';
                case 3:
                    return '[ve středu v] LT';
                case 4:
                    return '[ve čtvrtek v] LT';
                case 5:
                    return '[v pátek v] LT';
                case 6:
                    return '[v sobotu v] LT';
            }
        },
        lastDay: '[včera v] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[minulou neděli v] LT';
                case 1:
                case 2:
                    return '[minulé] dddd [v] LT';
                case 3:
                    return '[minulou středu v] LT';
                case 4:
                case 5:
                    return '[minulý] dddd [v] LT';
                case 6:
                    return '[minulou sobotu v] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'za %s',
        past : 'před %s',
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse : /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return cs;

})));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chuvash [cv]
//! author : Anatoly Mironov : https://github.com/mirontoli

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var cv = moment.defineLocale('cv', {
    months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
    monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
    weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
    weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
    weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
        LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
        LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
    },
    calendar : {
        sameDay: '[Паян] LT [сехетре]',
        nextDay: '[Ыран] LT [сехетре]',
        lastDay: '[Ӗнер] LT [сехетре]',
        nextWeek: '[Ҫитес] dddd LT [сехетре]',
        lastWeek: '[Иртнӗ] dddd LT [сехетре]',
        sameElse: 'L'
    },
    relativeTime : {
        future : function (output) {
            var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
            return output + affix;
        },
        past : '%s каялла',
        s : 'пӗр-ик ҫеккунт',
        m : 'пӗр минут',
        mm : '%d минут',
        h : 'пӗр сехет',
        hh : '%d сехет',
        d : 'пӗр кун',
        dd : '%d кун',
        M : 'пӗр уйӑх',
        MM : '%d уйӑх',
        y : 'пӗр ҫул',
        yy : '%d ҫул'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
    ordinal : '%d-мӗш',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return cv;

})));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Welsh [cy]
//! author : Robert Allen : https://github.com/robgallen
//! author : https://github.com/ryangreaves

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var cy = moment.defineLocale('cy', {
    months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
    monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
    weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
    weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
    weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
    weekdaysParseExact : true,
    // time formats are the same as en-gb
    longDateFormat: {
        LT: 'HH:mm',
        LTS : 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Heddiw am] LT',
        nextDay: '[Yfory am] LT',
        nextWeek: 'dddd [am] LT',
        lastDay: '[Ddoe am] LT',
        lastWeek: 'dddd [diwethaf am] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'mewn %s',
        past: '%s yn ôl',
        s: 'ychydig eiliadau',
        m: 'munud',
        mm: '%d munud',
        h: 'awr',
        hh: '%d awr',
        d: 'diwrnod',
        dd: '%d diwrnod',
        M: 'mis',
        MM: '%d mis',
        y: 'blwyddyn',
        yy: '%d flynedd'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
    // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
    ordinal: function (number) {
        var b = number,
            output = '',
            lookup = [
                '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
                'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
            ];
        if (b > 20) {
            if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
                output = 'fed'; // not 30ain, 70ain or 90ain
            } else {
                output = 'ain';
            }
        } else if (b > 0) {
            output = lookup[b];
        }
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return cy;

})));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Danish [da]
//! author : Ulrik Nielsen : https://github.com/mrbase

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var da = moment.defineLocale('da', {
    months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
    weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH:mm',
        LLLL : 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
    },
    calendar : {
        sameDay : '[i dag kl.] LT',
        nextDay : '[i morgen kl.] LT',
        nextWeek : 'på dddd [kl.] LT',
        lastDay : '[i går kl.] LT',
        lastWeek : '[i] dddd[s kl.] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'om %s',
        past : '%s siden',
        s : 'få sekunder',
        m : 'et minut',
        mm : '%d minutter',
        h : 'en time',
        hh : '%d timer',
        d : 'en dag',
        dd : '%d dage',
        M : 'en måned',
        MM : '%d måneder',
        y : 'et år',
        yy : '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return da;

})));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German (Austria) [de-at]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [number + ' Tage', number + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [number + ' Monate', number + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var deAt = moment.defineLocale('de-at', {
    months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH:mm',
        LLLL : 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime : {
        future : 'in %s',
        past : 'vor %s',
        s : 'ein paar Sekunden',
        m : processRelativeTime,
        mm : '%d Minuten',
        h : processRelativeTime,
        hh : '%d Stunden',
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return deAt;

})));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German (Switzerland) [de-ch]
//! author : sschueller : https://github.com/sschueller

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


// based on: https://www.bk.admin.ch/dokumentation/sprachen/04915/05016/index.html?lang=de#

function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [number + ' Tage', number + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [number + ' Monate', number + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var deCh = moment.defineLocale('de-ch', {
    months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort : 'Jan._Febr._März_April_Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH.mm',
        LLLL : 'dddd, D. MMMM YYYY HH.mm'
    },
    calendar : {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime : {
        future : 'in %s',
        past : 'vor %s',
        s : 'ein paar Sekunden',
        m : processRelativeTime,
        mm : '%d Minuten',
        h : processRelativeTime,
        hh : '%d Stunden',
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return deCh;

})));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [number + ' Tage', number + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [number + ' Monate', number + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var de = moment.defineLocale('de', {
    months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH:mm',
        LLLL : 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime : {
        future : 'in %s',
        past : 'vor %s',
        s : 'ein paar Sekunden',
        m : processRelativeTime,
        mm : '%d Minuten',
        h : processRelativeTime,
        hh : '%d Stunden',
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return de;

})));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Maldivian [dv]
//! author : Jawish Hameed : https://github.com/jawish

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = [
    'ޖެނުއަރީ',
    'ފެބްރުއަރީ',
    'މާރިޗު',
    'އޭޕްރީލު',
    'މޭ',
    'ޖޫން',
    'ޖުލައި',
    'އޯގަސްޓު',
    'ސެޕްޓެމްބަރު',
    'އޮކްޓޯބަރު',
    'ނޮވެމްބަރު',
    'ޑިސެމްބަރު'
];
var weekdays = [
    'އާދިއްތަ',
    'ހޯމަ',
    'އަންގާރަ',
    'ބުދަ',
    'ބުރާސްފަތި',
    'ހުކުރު',
    'ހޮނިހިރު'
];

var dv = moment.defineLocale('dv', {
    months : months,
    monthsShort : months,
    weekdays : weekdays,
    weekdaysShort : weekdays,
    weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
    longDateFormat : {

        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'D/M/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /މކ|މފ/,
    isPM : function (input) {
        return 'މފ' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'މކ';
        } else {
            return 'މފ';
        }
    },
    calendar : {
        sameDay : '[މިއަދު] LT',
        nextDay : '[މާދަމާ] LT',
        nextWeek : 'dddd LT',
        lastDay : '[އިއްޔެ] LT',
        lastWeek : '[ފާއިތުވި] dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'ތެރޭގައި %s',
        past : 'ކުރިން %s',
        s : 'ސިކުންތުކޮޅެއް',
        m : 'މިނިޓެއް',
        mm : 'މިނިޓު %d',
        h : 'ގަޑިއިރެއް',
        hh : 'ގަޑިއިރު %d',
        d : 'ދުވަހެއް',
        dd : 'ދުވަސް %d',
        M : 'މަހެއް',
        MM : 'މަސް %d',
        y : 'އަހަރެއް',
        yy : 'އަހަރު %d'
    },
    preparse: function (string) {
        return string.replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/,/g, '،');
    },
    week : {
        dow : 7,  // Sunday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return dv;

})));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Greek [el]
//! author : Aggelos Karalias : https://github.com/mehiel

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}


var el = moment.defineLocale('el', {
    monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
    monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
    months : function (momentToFormat, format) {
        if (!momentToFormat) {
            return this._monthsNominativeEl;
        } else if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
            return this._monthsGenitiveEl[momentToFormat.month()];
        } else {
            return this._monthsNominativeEl[momentToFormat.month()];
        }
    },
    monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
    weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
    weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
    weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'μμ' : 'ΜΜ';
        } else {
            return isLower ? 'πμ' : 'ΠΜ';
        }
    },
    isPM : function (input) {
        return ((input + '').toLowerCase()[0] === 'μ');
    },
    meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendarEl : {
        sameDay : '[Σήμερα {}] LT',
        nextDay : '[Αύριο {}] LT',
        nextWeek : 'dddd [{}] LT',
        lastDay : '[Χθες {}] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 6:
                    return '[το προηγούμενο] dddd [{}] LT';
                default:
                    return '[την προηγούμενη] dddd [{}] LT';
            }
        },
        sameElse : 'L'
    },
    calendar : function (key, mom) {
        var output = this._calendarEl[key],
            hours = mom && mom.hours();
        if (isFunction(output)) {
            output = output.apply(mom);
        }
        return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
    },
    relativeTime : {
        future : 'σε %s',
        past : '%s πριν',
        s : 'λίγα δευτερόλεπτα',
        m : 'ένα λεπτό',
        mm : '%d λεπτά',
        h : 'μία ώρα',
        hh : '%d ώρες',
        d : 'μία μέρα',
        dd : '%d μέρες',
        M : 'ένας μήνας',
        MM : '%d μήνες',
        y : 'ένας χρόνος',
        yy : '%d χρόνια'
    },
    dayOfMonthOrdinalParse: /\d{1,2}η/,
    ordinal: '%dη',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4st is the first week of the year.
    }
});

return el;

})));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Australia) [en-au]
//! author : Jared Morse : https://github.com/jarcoal

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enAu = moment.defineLocale('en-au', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enAu;

})));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Canada) [en-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enCa = moment.defineLocale('en-ca', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'YYYY-MM-DD',
        LL : 'MMMM D, YYYY',
        LLL : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

return enCa;

})));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (United Kingdom) [en-gb]
//! author : Chris Gedrim : https://github.com/chrisgedrim

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enGb = moment.defineLocale('en-gb', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enGb;

})));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (Ireland) [en-ie]
//! author : Chris Cartlidge : https://github.com/chriscartlidge

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enIe = moment.defineLocale('en-ie', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enIe;

})));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : English (New Zealand) [en-nz]
//! author : Luke McGregor : https://github.com/lukemcgregor

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enNz = moment.defineLocale('en-nz', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enNz;

})));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Esperanto [eo]
//! author : Colin Dean : https://github.com/colindean
//! author : Mia Nordentoft Imperatori : https://github.com/miestasmia
//! comment : miestasmia corrected the translation by colindean

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var eo = moment.defineLocale('eo', {
    months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
    weekdays : 'dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato'.split('_'),
    weekdaysShort : 'dim_lun_mard_merk_ĵaŭ_ven_sab'.split('_'),
    weekdaysMin : 'di_lu_ma_me_ĵa_ve_sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'D[-a de] MMMM, YYYY',
        LLL : 'D[-a de] MMMM, YYYY HH:mm',
        LLLL : 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
    },
    meridiemParse: /[ap]\.t\.m/i,
    isPM: function (input) {
        return input.charAt(0).toLowerCase() === 'p';
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'p.t.m.' : 'P.T.M.';
        } else {
            return isLower ? 'a.t.m.' : 'A.T.M.';
        }
    },
    calendar : {
        sameDay : '[Hodiaŭ je] LT',
        nextDay : '[Morgaŭ je] LT',
        nextWeek : 'dddd [je] LT',
        lastDay : '[Hieraŭ je] LT',
        lastWeek : '[pasinta] dddd [je] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'post %s',
        past : 'antaŭ %s',
        s : 'sekundoj',
        m : 'minuto',
        mm : '%d minutoj',
        h : 'horo',
        hh : '%d horoj',
        d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
        dd : '%d tagoj',
        M : 'monato',
        MM : '%d monatoj',
        y : 'jaro',
        yy : '%d jaroj'
    },
    dayOfMonthOrdinalParse: /\d{1,2}a/,
    ordinal : '%da',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return eo;

})));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Spanish (Dominican Republic) [es-do]

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

var esDo = moment.defineLocale('es-do', {
    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortDot;
        } else if (/-MMM-/.test(format)) {
            return monthsShort[m.month()];
        } else {
            return monthsShortDot[m.month()];
        }
    },
    monthsParseExact : true,
    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY h:mm A',
        LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
    },
    calendar : {
        sameDay : function () {
            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextDay : function () {
            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastDay : function () {
            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'en %s',
        past : 'hace %s',
        s : 'unos segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return esDo;

})));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Spanish [es]
//! author : Julio Napurí : https://github.com/julionc

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

var es = moment.defineLocale('es', {
    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortDot;
        } else if (/-MMM-/.test(format)) {
            return monthsShort[m.month()];
        } else {
            return monthsShortDot[m.month()];
        }
    },
    monthsParseExact : true,
    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY H:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar : {
        sameDay : function () {
            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextDay : function () {
            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastDay : function () {
            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'en %s',
        past : 'hace %s',
        s : 'unos segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return es;

})));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Estonian [et]
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
        'm' : ['ühe minuti', 'üks minut'],
        'mm': [number + ' minuti', number + ' minutit'],
        'h' : ['ühe tunni', 'tund aega', 'üks tund'],
        'hh': [number + ' tunni', number + ' tundi'],
        'd' : ['ühe päeva', 'üks päev'],
        'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
        'MM': [number + ' kuu', number + ' kuud'],
        'y' : ['ühe aasta', 'aasta', 'üks aasta'],
        'yy': [number + ' aasta', number + ' aastat']
    };
    if (withoutSuffix) {
        return format[key][2] ? format[key][2] : format[key][1];
    }
    return isFuture ? format[key][0] : format[key][1];
}

var et = moment.defineLocale('et', {
    months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
    monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
    weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
    weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
    weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
    longDateFormat : {
        LT   : 'H:mm',
        LTS : 'H:mm:ss',
        L    : 'DD.MM.YYYY',
        LL   : 'D. MMMM YYYY',
        LLL  : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd, D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay  : '[Täna,] LT',
        nextDay  : '[Homme,] LT',
        nextWeek : '[Järgmine] dddd LT',
        lastDay  : '[Eile,] LT',
        lastWeek : '[Eelmine] dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s pärast',
        past   : '%s tagasi',
        s      : processRelativeTime,
        m      : processRelativeTime,
        mm     : processRelativeTime,
        h      : processRelativeTime,
        hh     : processRelativeTime,
        d      : processRelativeTime,
        dd     : '%d päeva',
        M      : processRelativeTime,
        MM     : processRelativeTime,
        y      : processRelativeTime,
        yy     : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return et;

})));


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Basque [eu]
//! author : Eneko Illarramendi : https://github.com/eillarra

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var eu = moment.defineLocale('eu', {
    months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
    monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
    monthsParseExact : true,
    weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
    weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
    weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'YYYY[ko] MMMM[ren] D[a]',
        LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
        LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
        l : 'YYYY-M-D',
        ll : 'YYYY[ko] MMM D[a]',
        lll : 'YYYY[ko] MMM D[a] HH:mm',
        llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
    },
    calendar : {
        sameDay : '[gaur] LT[etan]',
        nextDay : '[bihar] LT[etan]',
        nextWeek : 'dddd LT[etan]',
        lastDay : '[atzo] LT[etan]',
        lastWeek : '[aurreko] dddd LT[etan]',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s barru',
        past : 'duela %s',
        s : 'segundo batzuk',
        m : 'minutu bat',
        mm : '%d minutu',
        h : 'ordu bat',
        hh : '%d ordu',
        d : 'egun bat',
        dd : '%d egun',
        M : 'hilabete bat',
        MM : '%d hilabete',
        y : 'urte bat',
        yy : '%d urte'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return eu;

})));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Persian [fa]
//! author : Ebrahim Byagowi : https://github.com/ebraminio

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
    '0': '۰'
};
var numberMap = {
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
    '۰': '0'
};

var fa = moment.defineLocale('fa', {
    months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
    weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
    weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    meridiemParse: /قبل از ظهر|بعد از ظهر/,
    isPM: function (input) {
        return /بعد از ظهر/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'قبل از ظهر';
        } else {
            return 'بعد از ظهر';
        }
    },
    calendar : {
        sameDay : '[امروز ساعت] LT',
        nextDay : '[فردا ساعت] LT',
        nextWeek : 'dddd [ساعت] LT',
        lastDay : '[دیروز ساعت] LT',
        lastWeek : 'dddd [پیش] [ساعت] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'در %s',
        past : '%s پیش',
        s : 'چند ثانیه',
        m : 'یک دقیقه',
        mm : '%d دقیقه',
        h : 'یک ساعت',
        hh : '%d ساعت',
        d : 'یک روز',
        dd : '%d روز',
        M : 'یک ماه',
        MM : '%d ماه',
        y : 'یک سال',
        yy : '%d سال'
    },
    preparse: function (string) {
        return string.replace(/[۰-۹]/g, function (match) {
            return numberMap[match];
        }).replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    dayOfMonthOrdinalParse: /\d{1,2}م/,
    ordinal : '%dم',
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12 // The week that contains Jan 1st is the first week of the year.
    }
});

return fa;

})));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Finnish [fi]
//! author : Tarmo Aidantausta : https://github.com/bleadof

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' ');
var numbersFuture = [
        'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
        numbersPast[7], numbersPast[8], numbersPast[9]
    ];
function translate(number, withoutSuffix, key, isFuture) {
    var result = '';
    switch (key) {
        case 's':
            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
        case 'm':
            return isFuture ? 'minuutin' : 'minuutti';
        case 'mm':
            result = isFuture ? 'minuutin' : 'minuuttia';
            break;
        case 'h':
            return isFuture ? 'tunnin' : 'tunti';
        case 'hh':
            result = isFuture ? 'tunnin' : 'tuntia';
            break;
        case 'd':
            return isFuture ? 'päivän' : 'päivä';
        case 'dd':
            result = isFuture ? 'päivän' : 'päivää';
            break;
        case 'M':
            return isFuture ? 'kuukauden' : 'kuukausi';
        case 'MM':
            result = isFuture ? 'kuukauden' : 'kuukautta';
            break;
        case 'y':
            return isFuture ? 'vuoden' : 'vuosi';
        case 'yy':
            result = isFuture ? 'vuoden' : 'vuotta';
            break;
    }
    result = verbalNumber(number, isFuture) + ' ' + result;
    return result;
}
function verbalNumber(number, isFuture) {
    return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
}

var fi = moment.defineLocale('fi', {
    months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
    monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
    weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
    weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
    weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD.MM.YYYY',
        LL : 'Do MMMM[ta] YYYY',
        LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
        LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
        l : 'D.M.YYYY',
        ll : 'Do MMM YYYY',
        lll : 'Do MMM YYYY, [klo] HH.mm',
        llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
    },
    calendar : {
        sameDay : '[tänään] [klo] LT',
        nextDay : '[huomenna] [klo] LT',
        nextWeek : 'dddd [klo] LT',
        lastDay : '[eilen] [klo] LT',
        lastWeek : '[viime] dddd[na] [klo] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s päästä',
        past : '%s sitten',
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fi;

})));


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Faroese [fo]
//! author : Ragnar Johannesen : https://github.com/ragnar123

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var fo = moment.defineLocale('fo', {
    months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
    weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
    weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
    weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D. MMMM, YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Í dag kl.] LT',
        nextDay : '[Í morgin kl.] LT',
        nextWeek : 'dddd [kl.] LT',
        lastDay : '[Í gjár kl.] LT',
        lastWeek : '[síðstu] dddd [kl] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'um %s',
        past : '%s síðani',
        s : 'fá sekund',
        m : 'ein minutt',
        mm : '%d minuttir',
        h : 'ein tími',
        hh : '%d tímar',
        d : 'ein dagur',
        dd : '%d dagar',
        M : 'ein mánaði',
        MM : '%d mánaðir',
        y : 'eitt ár',
        yy : '%d ár'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fo;

})));


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French (Canada) [fr-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var frCa = moment.defineLocale('fr-ca', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal : function (number, period) {
        switch (period) {
            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'D':
            case 'DDD':
            case 'd':
                return number + (number === 1 ? 'er' : 'e');

            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return number + (number === 1 ? 're' : 'e');
        }
    }
});

return frCa;

})));


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French (Switzerland) [fr-ch]
//! author : Gaspard Bucher : https://github.com/gaspard

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var frCh = moment.defineLocale('fr-ch', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal : function (number, period) {
        switch (period) {
            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'D':
            case 'DDD':
            case 'd':
                return number + (number === 1 ? 'er' : 'e');

            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return number + (number === 1 ? 're' : 'e');
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return frCh;

})));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var fr = moment.defineLocale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal : function (number, period) {
        switch (period) {
            // TODO: Return 'e' when day of month > 1. Move this case inside
            // block for masculine words below.
            // See https://github.com/moment/moment/issues/3375
            case 'D':
                return number + (number === 1 ? 'er' : '');

            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
                return number + (number === 1 ? 'er' : 'e');

            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return number + (number === 1 ? 're' : 'e');
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fr;

})));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Frisian [fy]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_');
var monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

var fy = moment.defineLocale('fy', {
    months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortWithDots;
        } else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[m.month()];
        } else {
            return monthsShortWithDots[m.month()];
        }
    },
    monthsParseExact : true,
    weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
    weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
    weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[hjoed om] LT',
        nextDay: '[moarn om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[juster om] LT',
        lastWeek: '[ôfrûne] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'oer %s',
        past : '%s lyn',
        s : 'in pear sekonden',
        m : 'ien minút',
        mm : '%d minuten',
        h : 'ien oere',
        hh : '%d oeren',
        d : 'ien dei',
        dd : '%d dagen',
        M : 'ien moanne',
        MM : '%d moannen',
        y : 'ien jier',
        yy : '%d jierren'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return fy;

})));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Scottish Gaelic [gd]
//! author : Jon Ashdown : https://github.com/jonashdown

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = [
    'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
];

var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

var gd = moment.defineLocale('gd', {
    months : months,
    monthsShort : monthsShort,
    monthsParseExact : true,
    weekdays : weekdays,
    weekdaysShort : weekdaysShort,
    weekdaysMin : weekdaysMin,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[An-diugh aig] LT',
        nextDay : '[A-màireach aig] LT',
        nextWeek : 'dddd [aig] LT',
        lastDay : '[An-dè aig] LT',
        lastWeek : 'dddd [seo chaidh] [aig] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'ann an %s',
        past : 'bho chionn %s',
        s : 'beagan diogan',
        m : 'mionaid',
        mm : '%d mionaidean',
        h : 'uair',
        hh : '%d uairean',
        d : 'latha',
        dd : '%d latha',
        M : 'mìos',
        MM : '%d mìosan',
        y : 'bliadhna',
        yy : '%d bliadhna'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(d|na|mh)/,
    ordinal : function (number) {
        var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return gd;

})));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Galician [gl]
//! author : Juan G. Hurtado : https://github.com/juanghurtado

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var gl = moment.defineLocale('gl', {
    months : 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
    monthsShort : 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays : 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
    weekdaysShort : 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
    weekdaysMin : 'do_lu_ma_mé_xo_ve_sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY H:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar : {
        sameDay : function () {
            return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
        },
        nextDay : function () {
            return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
        },
        lastDay : function () {
            return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
        },
        lastWeek : function () {
            return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : function (str) {
            if (str.indexOf('un') === 0) {
                return 'n' + str;
            }
            return 'en ' + str;
        },
        past : 'hai %s',
        s : 'uns segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'unha hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un ano',
        yy : '%d anos'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return gl;

})));


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Konkani Latin script [gom-latn]
//! author : The Discoverer : https://github.com/WikiDiscoverer

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        's': ['thodde secondanim', 'thodde second'],
        'm': ['eka mintan', 'ek minute'],
        'mm': [number + ' mintanim', number + ' mintam'],
        'h': ['eka horan', 'ek hor'],
        'hh': [number + ' horanim', number + ' hor'],
        'd': ['eka disan', 'ek dis'],
        'dd': [number + ' disanim', number + ' dis'],
        'M': ['eka mhoinean', 'ek mhoino'],
        'MM': [number + ' mhoineanim', number + ' mhoine'],
        'y': ['eka vorsan', 'ek voros'],
        'yy': [number + ' vorsanim', number + ' vorsam']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var gomLatn = moment.defineLocale('gom-latn', {
    months : 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
    monthsShort : 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son\'var'.split('_'),
    weekdaysShort : 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
    weekdaysMin : 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'A h:mm [vazta]',
        LTS : 'A h:mm:ss [vazta]',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY A h:mm [vazta]',
        LLLL : 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
        llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
    },
    calendar : {
        sameDay: '[Aiz] LT',
        nextDay: '[Faleam] LT',
        nextWeek: '[Ieta to] dddd[,] LT',
        lastDay: '[Kal] LT',
        lastWeek: '[Fatlo] dddd[,] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s',
        past : '%s adim',
        s : processRelativeTime,
        m : processRelativeTime,
        mm : processRelativeTime,
        h : processRelativeTime,
        hh : processRelativeTime,
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er)/,
    ordinal : function (number, period) {
        switch (period) {
            // the ordinal 'er' only applies to day of the month
            case 'D':
                return number + 'er';
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
            case 'w':
            case 'W':
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    },
    meridiemParse: /rati|sokalli|donparam|sanje/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'rati') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'sokalli') {
            return hour;
        } else if (meridiem === 'donparam') {
            return hour > 12 ? hour : hour + 12;
        } else if (meridiem === 'sanje') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'rati';
        } else if (hour < 12) {
            return 'sokalli';
        } else if (hour < 16) {
            return 'donparam';
        } else if (hour < 20) {
            return 'sanje';
        } else {
            return 'rati';
        }
    }
});

return gomLatn;

})));


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hebrew [he]
//! author : Tomer Cohen : https://github.com/tomer
//! author : Moshe Simantov : https://github.com/DevelopmentIL
//! author : Tal Ater : https://github.com/TalAter

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var he = moment.defineLocale('he', {
    months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
    monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
    weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
    weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
    weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [ב]MMMM YYYY',
        LLL : 'D [ב]MMMM YYYY HH:mm',
        LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
        l : 'D/M/YYYY',
        ll : 'D MMM YYYY',
        lll : 'D MMM YYYY HH:mm',
        llll : 'ddd, D MMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[היום ב־]LT',
        nextDay : '[מחר ב־]LT',
        nextWeek : 'dddd [בשעה] LT',
        lastDay : '[אתמול ב־]LT',
        lastWeek : '[ביום] dddd [האחרון בשעה] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'בעוד %s',
        past : 'לפני %s',
        s : 'מספר שניות',
        m : 'דקה',
        mm : '%d דקות',
        h : 'שעה',
        hh : function (number) {
            if (number === 2) {
                return 'שעתיים';
            }
            return number + ' שעות';
        },
        d : 'יום',
        dd : function (number) {
            if (number === 2) {
                return 'יומיים';
            }
            return number + ' ימים';
        },
        M : 'חודש',
        MM : function (number) {
            if (number === 2) {
                return 'חודשיים';
            }
            return number + ' חודשים';
        },
        y : 'שנה',
        yy : function (number) {
            if (number === 2) {
                return 'שנתיים';
            } else if (number % 10 === 0 && number !== 10) {
                return number + ' שנה';
            }
            return number + ' שנים';
        }
    },
    meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
    isPM : function (input) {
        return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 5) {
            return 'לפנות בוקר';
        } else if (hour < 10) {
            return 'בבוקר';
        } else if (hour < 12) {
            return isLower ? 'לפנה"צ' : 'לפני הצהריים';
        } else if (hour < 18) {
            return isLower ? 'אחה"צ' : 'אחרי הצהריים';
        } else {
            return 'בערב';
        }
    }
});

return he;

})));


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hindi [hi]
//! author : Mayank Singhal : https://github.com/mayanksinghal

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
};
var numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};

var hi = moment.defineLocale('hi', {
    months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
    monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
    monthsParseExact: true,
    weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
    weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
    longDateFormat : {
        LT : 'A h:mm बजे',
        LTS : 'A h:mm:ss बजे',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm बजे',
        LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
    },
    calendar : {
        sameDay : '[आज] LT',
        nextDay : '[कल] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[कल] LT',
        lastWeek : '[पिछले] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s में',
        past : '%s पहले',
        s : 'कुछ ही क्षण',
        m : 'एक मिनट',
        mm : '%d मिनट',
        h : 'एक घंटा',
        hh : '%d घंटे',
        d : 'एक दिन',
        dd : '%d दिन',
        M : 'एक महीने',
        MM : '%d महीने',
        y : 'एक वर्ष',
        yy : '%d वर्ष'
    },
    preparse: function (string) {
        return string.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
    meridiemParse: /रात|सुबह|दोपहर|शाम/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'रात') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'सुबह') {
            return hour;
        } else if (meridiem === 'दोपहर') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'शाम') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'रात';
        } else if (hour < 10) {
            return 'सुबह';
        } else if (hour < 17) {
            return 'दोपहर';
        } else if (hour < 20) {
            return 'शाम';
        } else {
            return 'रात';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return hi;

})));


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Croatian [hr]
//! author : Bojan Marković : https://github.com/bmarkovic

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function translate(number, withoutSuffix, key) {
    var result = number + ' ';
    switch (key) {
        case 'm':
            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
        case 'mm':
            if (number === 1) {
                result += 'minuta';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'minute';
            } else {
                result += 'minuta';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'jedan sat' : 'jednog sata';
        case 'hh':
            if (number === 1) {
                result += 'sat';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'sata';
            } else {
                result += 'sati';
            }
            return result;
        case 'dd':
            if (number === 1) {
                result += 'dan';
            } else {
                result += 'dana';
            }
            return result;
        case 'MM':
            if (number === 1) {
                result += 'mjesec';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'mjeseca';
            } else {
                result += 'mjeseci';
            }
            return result;
        case 'yy':
            if (number === 1) {
                result += 'godina';
            } else if (number === 2 || number === 3 || number === 4) {
                result += 'godine';
            } else {
                result += 'godina';
            }
            return result;
    }
}

var hr = moment.defineLocale('hr', {
    months : {
        format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
        standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
    },
    monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
    monthsParseExact: true,
    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd, D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay  : '[danas u] LT',
        nextDay  : '[sutra u] LT',
        nextWeek : function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[jučer u] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                case 3:
                    return '[prošlu] dddd [u] LT';
                case 6:
                    return '[prošle] [subote] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prošli] dddd [u] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'prije %s',
        s      : 'par sekundi',
        m      : translate,
        mm     : translate,
        h      : translate,
        hh     : translate,
        d      : 'dan',
        dd     : translate,
        M      : 'mjesec',
        MM     : translate,
        y      : 'godinu',
        yy     : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return hr;

})));


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Hungarian [hu]
//! author : Adam Brunner : https://github.com/adambrunner

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
function translate(number, withoutSuffix, key, isFuture) {
    var num = number,
        suffix;
    switch (key) {
        case 's':
            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
        case 'm':
            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
        case 'mm':
            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
        case 'h':
            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
        case 'hh':
            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
        case 'd':
            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
        case 'dd':
            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
        case 'M':
            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
        case 'MM':
            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
        case 'y':
            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
        case 'yy':
            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
    }
    return '';
}
function week(isFuture) {
    return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
}

var hu = moment.defineLocale('hu', {
    months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
    monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
    weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
    weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
    weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'YYYY.MM.DD.',
        LL : 'YYYY. MMMM D.',
        LLL : 'YYYY. MMMM D. H:mm',
        LLLL : 'YYYY. MMMM D., dddd H:mm'
    },
    meridiemParse: /de|du/i,
    isPM: function (input) {
        return input.charAt(1).toLowerCase() === 'u';
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 12) {
            return isLower === true ? 'de' : 'DE';
        } else {
            return isLower === true ? 'du' : 'DU';
        }
    },
    calendar : {
        sameDay : '[ma] LT[-kor]',
        nextDay : '[holnap] LT[-kor]',
        nextWeek : function () {
            return week.call(this, true);
        },
        lastDay : '[tegnap] LT[-kor]',
        lastWeek : function () {
            return week.call(this, false);
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s múlva',
        past : '%s',
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return hu;

})));


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Armenian [hy-am]
//! author : Armendarabyan : https://github.com/armendarabyan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var hyAm = moment.defineLocale('hy-am', {
    months : {
        format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
        standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
    },
    monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
    weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
    weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY թ.',
        LLL : 'D MMMM YYYY թ., HH:mm',
        LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
    },
    calendar : {
        sameDay: '[այսօր] LT',
        nextDay: '[վաղը] LT',
        lastDay: '[երեկ] LT',
        nextWeek: function () {
            return 'dddd [օրը ժամը] LT';
        },
        lastWeek: function () {
            return '[անցած] dddd [օրը ժամը] LT';
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s հետո',
        past : '%s առաջ',
        s : 'մի քանի վայրկյան',
        m : 'րոպե',
        mm : '%d րոպե',
        h : 'ժամ',
        hh : '%d ժամ',
        d : 'օր',
        dd : '%d օր',
        M : 'ամիս',
        MM : '%d ամիս',
        y : 'տարի',
        yy : '%d տարի'
    },
    meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
    isPM: function (input) {
        return /^(ցերեկվա|երեկոյան)$/.test(input);
    },
    meridiem : function (hour) {
        if (hour < 4) {
            return 'գիշերվա';
        } else if (hour < 12) {
            return 'առավոտվա';
        } else if (hour < 17) {
            return 'ցերեկվա';
        } else {
            return 'երեկոյան';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'DDD':
            case 'w':
            case 'W':
            case 'DDDo':
                if (number === 1) {
                    return number + '-ին';
                }
                return number + '-րդ';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return hyAm;

})));


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Indonesian [id]
//! author : Mohammad Satrio Utomo : https://github.com/tyok
//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var id = moment.defineLocale('id', {
    months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
    weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
    weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
    weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [pukul] HH.mm',
        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|siang|sore|malam/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'siang') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'sore' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'siang';
        } else if (hours < 19) {
            return 'sore';
        } else {
            return 'malam';
        }
    },
    calendar : {
        sameDay : '[Hari ini pukul] LT',
        nextDay : '[Besok pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kemarin pukul] LT',
        lastWeek : 'dddd [lalu pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dalam %s',
        past : '%s yang lalu',
        s : 'beberapa detik',
        m : 'semenit',
        mm : '%d menit',
        h : 'sejam',
        hh : '%d jam',
        d : 'sehari',
        dd : '%d hari',
        M : 'sebulan',
        MM : '%d bulan',
        y : 'setahun',
        yy : '%d tahun'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return id;

})));


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Icelandic [is]
//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(n) {
    if (n % 100 === 11) {
        return true;
    } else if (n % 10 === 1) {
        return false;
    }
    return true;
}
function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':
            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
        case 'm':
            return withoutSuffix ? 'mínúta' : 'mínútu';
        case 'mm':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
            } else if (withoutSuffix) {
                return result + 'mínúta';
            }
            return result + 'mínútu';
        case 'hh':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
            }
            return result + 'klukkustund';
        case 'd':
            if (withoutSuffix) {
                return 'dagur';
            }
            return isFuture ? 'dag' : 'degi';
        case 'dd':
            if (plural(number)) {
                if (withoutSuffix) {
                    return result + 'dagar';
                }
                return result + (isFuture ? 'daga' : 'dögum');
            } else if (withoutSuffix) {
                return result + 'dagur';
            }
            return result + (isFuture ? 'dag' : 'degi');
        case 'M':
            if (withoutSuffix) {
                return 'mánuður';
            }
            return isFuture ? 'mánuð' : 'mánuði';
        case 'MM':
            if (plural(number)) {
                if (withoutSuffix) {
                    return result + 'mánuðir';
                }
                return result + (isFuture ? 'mánuði' : 'mánuðum');
            } else if (withoutSuffix) {
                return result + 'mánuður';
            }
            return result + (isFuture ? 'mánuð' : 'mánuði');
        case 'y':
            return withoutSuffix || isFuture ? 'ár' : 'ári';
        case 'yy':
            if (plural(number)) {
                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
            }
            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
    }
}

var is = moment.defineLocale('is', {
    months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
    monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
    weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
    weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
    weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY [kl.] H:mm',
        LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
    },
    calendar : {
        sameDay : '[í dag kl.] LT',
        nextDay : '[á morgun kl.] LT',
        nextWeek : 'dddd [kl.] LT',
        lastDay : '[í gær kl.] LT',
        lastWeek : '[síðasta] dddd [kl.] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'eftir %s',
        past : 'fyrir %s síðan',
        s : translate,
        m : translate,
        mm : translate,
        h : 'klukkustund',
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return is;

})));


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Italian [it]
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var it = moment.defineLocale('it', {
    months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
    monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
    weekdays : 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
    weekdaysShort : 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
    weekdaysMin : 'do_lu_ma_me_gi_ve_sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Oggi alle] LT',
        nextDay: '[Domani alle] LT',
        nextWeek: 'dddd [alle] LT',
        lastDay: '[Ieri alle] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[la scorsa] dddd [alle] LT';
                default:
                    return '[lo scorso] dddd [alle] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : function (s) {
            return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
        },
        past : '%s fa',
        s : 'alcuni secondi',
        m : 'un minuto',
        mm : '%d minuti',
        h : 'un\'ora',
        hh : '%d ore',
        d : 'un giorno',
        dd : '%d giorni',
        M : 'un mese',
        MM : '%d mesi',
        y : 'un anno',
        yy : '%d anni'
    },
    dayOfMonthOrdinalParse : /\d{1,2}º/,
    ordinal: '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return it;

})));


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Japanese [ja]
//! author : LI Long : https://github.com/baryon

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ja = moment.defineLocale('ja', {
    months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
    weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
    weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY/MM/DD',
        LL : 'YYYY年M月D日',
        LLL : 'YYYY年M月D日 HH:mm',
        LLLL : 'YYYY年M月D日 HH:mm dddd',
        l : 'YYYY/MM/DD',
        ll : 'YYYY年M月D日',
        lll : 'YYYY年M月D日 HH:mm',
        llll : 'YYYY年M月D日 HH:mm dddd'
    },
    meridiemParse: /午前|午後/i,
    isPM : function (input) {
        return input === '午後';
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return '午前';
        } else {
            return '午後';
        }
    },
    calendar : {
        sameDay : '[今日] LT',
        nextDay : '[明日] LT',
        nextWeek : '[来週]dddd LT',
        lastDay : '[昨日] LT',
        lastWeek : '[前週]dddd LT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse : /\d{1,2}日/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            default:
                return number;
        }
    },
    relativeTime : {
        future : '%s後',
        past : '%s前',
        s : '数秒',
        m : '1分',
        mm : '%d分',
        h : '1時間',
        hh : '%d時間',
        d : '1日',
        dd : '%d日',
        M : '1ヶ月',
        MM : '%dヶ月',
        y : '1年',
        yy : '%d年'
    }
});

return ja;

})));


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Javanese [jv]
//! author : Rony Lantip : https://github.com/lantip
//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var jv = moment.defineLocale('jv', {
    months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
    weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
    weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
    weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [pukul] HH.mm',
        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /enjing|siyang|sonten|ndalu/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'enjing') {
            return hour;
        } else if (meridiem === 'siyang') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
            return hour + 12;
        }
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'enjing';
        } else if (hours < 15) {
            return 'siyang';
        } else if (hours < 19) {
            return 'sonten';
        } else {
            return 'ndalu';
        }
    },
    calendar : {
        sameDay : '[Dinten puniko pukul] LT',
        nextDay : '[Mbenjang pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kala wingi pukul] LT',
        lastWeek : 'dddd [kepengker pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'wonten ing %s',
        past : '%s ingkang kepengker',
        s : 'sawetawis detik',
        m : 'setunggal menit',
        mm : '%d menit',
        h : 'setunggal jam',
        hh : '%d jam',
        d : 'sedinten',
        dd : '%d dinten',
        M : 'sewulan',
        MM : '%d wulan',
        y : 'setaun',
        yy : '%d taun'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return jv;

})));


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Georgian [ka]
//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ka = moment.defineLocale('ka', {
    months : {
        standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
        format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
    },
    monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
    weekdays : {
        standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
        format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
        isFormat: /(წინა|შემდეგ)/
    },
    weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
    weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[დღეს] LT[-ზე]',
        nextDay : '[ხვალ] LT[-ზე]',
        lastDay : '[გუშინ] LT[-ზე]',
        nextWeek : '[შემდეგ] dddd LT[-ზე]',
        lastWeek : '[წინა] dddd LT-ზე',
        sameElse : 'L'
    },
    relativeTime : {
        future : function (s) {
            return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
                s.replace(/ი$/, 'ში') :
                s + 'ში';
        },
        past : function (s) {
            if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
                return s.replace(/(ი|ე)$/, 'ის უკან');
            }
            if ((/წელი/).test(s)) {
                return s.replace(/წელი$/, 'წლის უკან');
            }
        },
        s : 'რამდენიმე წამი',
        m : 'წუთი',
        mm : '%d წუთი',
        h : 'საათი',
        hh : '%d საათი',
        d : 'დღე',
        dd : '%d დღე',
        M : 'თვე',
        MM : '%d თვე',
        y : 'წელი',
        yy : '%d წელი'
    },
    dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
    ordinal : function (number) {
        if (number === 0) {
            return number;
        }
        if (number === 1) {
            return number + '-ლი';
        }
        if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
            return 'მე-' + number;
        }
        return number + '-ე';
    },
    week : {
        dow : 1,
        doy : 7
    }
});

return ka;

})));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kazakh [kk]
//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var suffixes = {
    0: '-ші',
    1: '-ші',
    2: '-ші',
    3: '-ші',
    4: '-ші',
    5: '-ші',
    6: '-шы',
    7: '-ші',
    8: '-ші',
    9: '-шы',
    10: '-шы',
    20: '-шы',
    30: '-шы',
    40: '-шы',
    50: '-ші',
    60: '-шы',
    70: '-ші',
    80: '-ші',
    90: '-шы',
    100: '-ші'
};

var kk = moment.defineLocale('kk', {
    months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
    monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
    weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
    weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
    weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Бүгін сағат] LT',
        nextDay : '[Ертең сағат] LT',
        nextWeek : 'dddd [сағат] LT',
        lastDay : '[Кеше сағат] LT',
        lastWeek : '[Өткен аптаның] dddd [сағат] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ішінде',
        past : '%s бұрын',
        s : 'бірнеше секунд',
        m : 'бір минут',
        mm : '%d минут',
        h : 'бір сағат',
        hh : '%d сағат',
        d : 'бір күн',
        dd : '%d күн',
        M : 'бір ай',
        MM : '%d ай',
        y : 'бір жыл',
        yy : '%d жыл'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
    ordinal : function (number) {
        var a = number % 10,
            b = number >= 100 ? 100 : null;
        return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return kk;

})));


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Cambodian [km]
//! author : Kruy Vanna : https://github.com/kruyvanna

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var km = moment.defineLocale('km', {
    months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
    monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
    weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
    weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
    weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS : 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
        nextDay: '[ស្អែក ម៉ោង] LT',
        nextWeek: 'dddd [ម៉ោង] LT',
        lastDay: '[ម្សិលមិញ ម៉ោង] LT',
        lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%sទៀត',
        past: '%sមុន',
        s: 'ប៉ុន្មានវិនាទី',
        m: 'មួយនាទី',
        mm: '%d នាទី',
        h: 'មួយម៉ោង',
        hh: '%d ម៉ោង',
        d: 'មួយថ្ងៃ',
        dd: '%d ថ្ងៃ',
        M: 'មួយខែ',
        MM: '%d ខែ',
        y: 'មួយឆ្នាំ',
        yy: '%d ឆ្នាំ'
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});

return km;

})));


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kannada [kn]
//! author : Rajeev Naik : https://github.com/rajeevnaikte

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '೧',
    '2': '೨',
    '3': '೩',
    '4': '೪',
    '5': '೫',
    '6': '೬',
    '7': '೭',
    '8': '೮',
    '9': '೯',
    '0': '೦'
};
var numberMap = {
    '೧': '1',
    '೨': '2',
    '೩': '3',
    '೪': '4',
    '೫': '5',
    '೬': '6',
    '೭': '7',
    '೮': '8',
    '೯': '9',
    '೦': '0'
};

var kn = moment.defineLocale('kn', {
    months : 'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split('_'),
    monthsShort : 'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬ_ಅಕ್ಟೋಬ_ನವೆಂಬ_ಡಿಸೆಂಬ'.split('_'),
    monthsParseExact: true,
    weekdays : 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
    weekdaysShort : 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
    weekdaysMin : 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
    longDateFormat : {
        LT : 'A h:mm',
        LTS : 'A h:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm',
        LLLL : 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar : {
        sameDay : '[ಇಂದು] LT',
        nextDay : '[ನಾಳೆ] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[ನಿನ್ನೆ] LT',
        lastWeek : '[ಕೊನೆಯ] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ನಂತರ',
        past : '%s ಹಿಂದೆ',
        s : 'ಕೆಲವು ಕ್ಷಣಗಳು',
        m : 'ಒಂದು ನಿಮಿಷ',
        mm : '%d ನಿಮಿಷ',
        h : 'ಒಂದು ಗಂಟೆ',
        hh : '%d ಗಂಟೆ',
        d : 'ಒಂದು ದಿನ',
        dd : '%d ದಿನ',
        M : 'ಒಂದು ತಿಂಗಳು',
        MM : '%d ತಿಂಗಳು',
        y : 'ಒಂದು ವರ್ಷ',
        yy : '%d ವರ್ಷ'
    },
    preparse: function (string) {
        return string.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'ರಾತ್ರಿ') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'ಬೆಳಿಗ್ಗೆ') {
            return hour;
        } else if (meridiem === 'ಮಧ್ಯಾಹ್ನ') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'ಸಂಜೆ') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ರಾತ್ರಿ';
        } else if (hour < 10) {
            return 'ಬೆಳಿಗ್ಗೆ';
        } else if (hour < 17) {
            return 'ಮಧ್ಯಾಹ್ನ';
        } else if (hour < 20) {
            return 'ಸಂಜೆ';
        } else {
            return 'ರಾತ್ರಿ';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
    ordinal : function (number) {
        return number + 'ನೇ';
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return kn;

})));


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Korean [ko]
//! author : Kyungwook, Park : https://github.com/kyungw00k
//! author : Jeeeyul Lee <jeeeyul@gmail.com>

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ko = moment.defineLocale('ko', {
    months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
    weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
    weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
    weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
    longDateFormat : {
        LT : 'A h:mm',
        LTS : 'A h:mm:ss',
        L : 'YYYY.MM.DD',
        LL : 'YYYY년 MMMM D일',
        LLL : 'YYYY년 MMMM D일 A h:mm',
        LLLL : 'YYYY년 MMMM D일 dddd A h:mm',
        l : 'YYYY.MM.DD',
        ll : 'YYYY년 MMMM D일',
        lll : 'YYYY년 MMMM D일 A h:mm',
        llll : 'YYYY년 MMMM D일 dddd A h:mm'
    },
    calendar : {
        sameDay : '오늘 LT',
        nextDay : '내일 LT',
        nextWeek : 'dddd LT',
        lastDay : '어제 LT',
        lastWeek : '지난주 dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s 후',
        past : '%s 전',
        s : '몇 초',
        ss : '%d초',
        m : '1분',
        mm : '%d분',
        h : '한 시간',
        hh : '%d시간',
        d : '하루',
        dd : '%d일',
        M : '한 달',
        MM : '%d달',
        y : '일 년',
        yy : '%d년'
    },
    dayOfMonthOrdinalParse : /\d{1,2}일/,
    ordinal : '%d일',
    meridiemParse : /오전|오후/,
    isPM : function (token) {
        return token === '오후';
    },
    meridiem : function (hour, minute, isUpper) {
        return hour < 12 ? '오전' : '오후';
    }
});

return ko;

})));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Kyrgyz [ky]
//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';



var suffixes = {
    0: '-чү',
    1: '-чи',
    2: '-чи',
    3: '-чү',
    4: '-чү',
    5: '-чи',
    6: '-чы',
    7: '-чи',
    8: '-чи',
    9: '-чу',
    10: '-чу',
    20: '-чы',
    30: '-чу',
    40: '-чы',
    50: '-чү',
    60: '-чы',
    70: '-чи',
    80: '-чи',
    90: '-чу',
    100: '-чү'
};

var ky = moment.defineLocale('ky', {
    months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
    monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
    weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
    weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
    weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Бүгүн саат] LT',
        nextDay : '[Эртең саат] LT',
        nextWeek : 'dddd [саат] LT',
        lastDay : '[Кече саат] LT',
        lastWeek : '[Өткен аптанын] dddd [күнү] [саат] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ичинде',
        past : '%s мурун',
        s : 'бирнече секунд',
        m : 'бир мүнөт',
        mm : '%d мүнөт',
        h : 'бир саат',
        hh : '%d саат',
        d : 'бир күн',
        dd : '%d күн',
        M : 'бир ай',
        MM : '%d ай',
        y : 'бир жыл',
        yy : '%d жыл'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
    ordinal : function (number) {
        var a = number % 10,
            b = number >= 100 ? 100 : null;
        return number + (suffixes[number] || suffixes[a] || suffixes[b]);
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return ky;

})));


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Luxembourgish [lb]
//! author : mweimerskirch : https://github.com/mweimerskirch
//! author : David Raison : https://github.com/kwisatz

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eng Minutt', 'enger Minutt'],
        'h': ['eng Stonn', 'enger Stonn'],
        'd': ['een Dag', 'engem Dag'],
        'M': ['ee Mount', 'engem Mount'],
        'y': ['ee Joer', 'engem Joer']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}
function processFutureTime(string) {
    var number = string.substr(0, string.indexOf(' '));
    if (eifelerRegelAppliesToNumber(number)) {
        return 'a ' + string;
    }
    return 'an ' + string;
}
function processPastTime(string) {
    var number = string.substr(0, string.indexOf(' '));
    if (eifelerRegelAppliesToNumber(number)) {
        return 'viru ' + string;
    }
    return 'virun ' + string;
}
/**
 * Returns true if the word before the given number loses the '-n' ending.
 * e.g. 'an 10 Deeg' but 'a 5 Deeg'
 *
 * @param number {integer}
 * @returns {boolean}
 */
function eifelerRegelAppliesToNumber(number) {
    number = parseInt(number, 10);
    if (isNaN(number)) {
        return false;
    }
    if (number < 0) {
        // Negative Number --> always true
        return true;
    } else if (number < 10) {
        // Only 1 digit
        if (4 <= number && number <= 7) {
            return true;
        }
        return false;
    } else if (number < 100) {
        // 2 digits
        var lastDigit = number % 10, firstDigit = number / 10;
        if (lastDigit === 0) {
            return eifelerRegelAppliesToNumber(firstDigit);
        }
        return eifelerRegelAppliesToNumber(lastDigit);
    } else if (number < 10000) {
        // 3 or 4 digits --> recursively check first digit
        while (number >= 10) {
            number = number / 10;
        }
        return eifelerRegelAppliesToNumber(number);
    } else {
        // Anything larger than 4 digits: recursively check first n-3 digits
        number = number / 1000;
        return eifelerRegelAppliesToNumber(number);
    }
}

var lb = moment.defineLocale('lb', {
    months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
    weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'H:mm [Auer]',
        LTS: 'H:mm:ss [Auer]',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm [Auer]',
        LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
    },
    calendar: {
        sameDay: '[Haut um] LT',
        sameElse: 'L',
        nextDay: '[Muer um] LT',
        nextWeek: 'dddd [um] LT',
        lastDay: '[Gëschter um] LT',
        lastWeek: function () {
            // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
            switch (this.day()) {
                case 2:
                case 4:
                    return '[Leschten] dddd [um] LT';
                default:
                    return '[Leschte] dddd [um] LT';
            }
        }
    },
    relativeTime : {
        future : processFutureTime,
        past : processPastTime,
        s : 'e puer Sekonnen',
        m : processRelativeTime,
        mm : '%d Minutten',
        h : processRelativeTime,
        hh : '%d Stonnen',
        d : processRelativeTime,
        dd : '%d Deeg',
        M : processRelativeTime,
        MM : '%d Méint',
        y : processRelativeTime,
        yy : '%d Joer'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return lb;

})));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Lao [lo]
//! author : Ryan Hart : https://github.com/ryanhart2

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var lo = moment.defineLocale('lo', {
    months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
    monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
    weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
    weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
    weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
    isPM: function (input) {
        return input === 'ຕອນແລງ';
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ຕອນເຊົ້າ';
        } else {
            return 'ຕອນແລງ';
        }
    },
    calendar : {
        sameDay : '[ມື້ນີ້ເວລາ] LT',
        nextDay : '[ມື້ອື່ນເວລາ] LT',
        nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
        lastDay : '[ມື້ວານນີ້ເວລາ] LT',
        lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'ອີກ %s',
        past : '%sຜ່ານມາ',
        s : 'ບໍ່ເທົ່າໃດວິນາທີ',
        m : '1 ນາທີ',
        mm : '%d ນາທີ',
        h : '1 ຊົ່ວໂມງ',
        hh : '%d ຊົ່ວໂມງ',
        d : '1 ມື້',
        dd : '%d ມື້',
        M : '1 ເດືອນ',
        MM : '%d ເດືອນ',
        y : '1 ປີ',
        yy : '%d ປີ'
    },
    dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
    ordinal : function (number) {
        return 'ທີ່' + number;
    }
});

return lo;

})));


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Lithuanian [lt]
//! author : Mindaugas Mozūras : https://github.com/mmozuras

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var units = {
    'm' : 'minutė_minutės_minutę',
    'mm': 'minutės_minučių_minutes',
    'h' : 'valanda_valandos_valandą',
    'hh': 'valandos_valandų_valandas',
    'd' : 'diena_dienos_dieną',
    'dd': 'dienos_dienų_dienas',
    'M' : 'mėnuo_mėnesio_mėnesį',
    'MM': 'mėnesiai_mėnesių_mėnesius',
    'y' : 'metai_metų_metus',
    'yy': 'metai_metų_metus'
};
function translateSeconds(number, withoutSuffix, key, isFuture) {
    if (withoutSuffix) {
        return 'kelios sekundės';
    } else {
        return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
    }
}
function translateSingular(number, withoutSuffix, key, isFuture) {
    return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
}
function special(number) {
    return number % 10 === 0 || (number > 10 && number < 20);
}
function forms(key) {
    return units[key].split('_');
}
function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    if (number === 1) {
        return result + translateSingular(number, withoutSuffix, key[0], isFuture);
    } else if (withoutSuffix) {
        return result + (special(number) ? forms(key)[1] : forms(key)[0]);
    } else {
        if (isFuture) {
            return result + forms(key)[1];
        } else {
            return result + (special(number) ? forms(key)[1] : forms(key)[2]);
        }
    }
}
var lt = moment.defineLocale('lt', {
    months : {
        format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
        standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
        isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
    },
    monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
    weekdays : {
        format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
        standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
        isFormat: /dddd HH:mm/
    },
    weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
    weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'YYYY [m.] MMMM D [d.]',
        LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
        l : 'YYYY-MM-DD',
        ll : 'YYYY [m.] MMMM D [d.]',
        lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
    },
    calendar : {
        sameDay : '[Šiandien] LT',
        nextDay : '[Rytoj] LT',
        nextWeek : 'dddd LT',
        lastDay : '[Vakar] LT',
        lastWeek : '[Praėjusį] dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'po %s',
        past : 'prieš %s',
        s : translateSeconds,
        m : translateSingular,
        mm : translate,
        h : translateSingular,
        hh : translate,
        d : translateSingular,
        dd : translate,
        M : translateSingular,
        MM : translate,
        y : translateSingular,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}-oji/,
    ordinal : function (number) {
        return number + '-oji';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return lt;

})));


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Kristaps Karlsons : https://github.com/skakri
//! author : Jānis Elmeris : https://github.com/JanisE

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var units = {
    'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
    'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
    'h': 'stundas_stundām_stunda_stundas'.split('_'),
    'hh': 'stundas_stundām_stunda_stundas'.split('_'),
    'd': 'dienas_dienām_diena_dienas'.split('_'),
    'dd': 'dienas_dienām_diena_dienas'.split('_'),
    'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
    'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
    'y': 'gada_gadiem_gads_gadi'.split('_'),
    'yy': 'gada_gadiem_gads_gadi'.split('_')
};
/**
 * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
 */
function format(forms, number, withoutSuffix) {
    if (withoutSuffix) {
        // E.g. "21 minūte", "3 minūtes".
        return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
    } else {
        // E.g. "21 minūtes" as in "pēc 21 minūtes".
        // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
        return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
    }
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    return number + ' ' + format(units[key], number, withoutSuffix);
}
function relativeTimeWithSingular(number, withoutSuffix, key) {
    return format(units[key], number, withoutSuffix);
}
function relativeSeconds(number, withoutSuffix) {
    return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
}

var lv = moment.defineLocale('lv', {
    months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
    monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
    weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
    weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
    weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY.',
        LL : 'YYYY. [gada] D. MMMM',
        LLL : 'YYYY. [gada] D. MMMM, HH:mm',
        LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
    },
    calendar : {
        sameDay : '[Šodien pulksten] LT',
        nextDay : '[Rīt pulksten] LT',
        nextWeek : 'dddd [pulksten] LT',
        lastDay : '[Vakar pulksten] LT',
        lastWeek : '[Pagājušā] dddd [pulksten] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'pēc %s',
        past : 'pirms %s',
        s : relativeSeconds,
        m : relativeTimeWithSingular,
        mm : relativeTimeWithPlural,
        h : relativeTimeWithSingular,
        hh : relativeTimeWithPlural,
        d : relativeTimeWithSingular,
        dd : relativeTimeWithPlural,
        M : relativeTimeWithSingular,
        MM : relativeTimeWithPlural,
        y : relativeTimeWithSingular,
        yy : relativeTimeWithPlural
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return lv;

})));


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Montenegrin [me]
//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var translator = {
    words: { //Different grammatical cases
        m: ['jedan minut', 'jednog minuta'],
        mm: ['minut', 'minuta', 'minuta'],
        h: ['jedan sat', 'jednog sata'],
        hh: ['sat', 'sata', 'sati'],
        dd: ['dan', 'dana', 'dana'],
        MM: ['mjesec', 'mjeseca', 'mjeseci'],
        yy: ['godina', 'godine', 'godina']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var me = moment.defineLocale('me', {
    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact : true,
    weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[danas u] LT',
        nextDay: '[sjutra u] LT',

        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedjelju] [u] LT';
                case 3:
                    return '[u] [srijedu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[juče u] LT',
        lastWeek : function () {
            var lastWeekDays = [
                '[prošle] [nedjelje] [u] LT',
                '[prošlog] [ponedjeljka] [u] LT',
                '[prošlog] [utorka] [u] LT',
                '[prošle] [srijede] [u] LT',
                '[prošlog] [četvrtka] [u] LT',
                '[prošlog] [petka] [u] LT',
                '[prošle] [subote] [u] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'prije %s',
        s      : 'nekoliko sekundi',
        m      : translator.translate,
        mm     : translator.translate,
        h      : translator.translate,
        hh     : translator.translate,
        d      : 'dan',
        dd     : translator.translate,
        M      : 'mjesec',
        MM     : translator.translate,
        y      : 'godinu',
        yy     : translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return me;

})));


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Maori [mi]
//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var mi = moment.defineLocale('mi', {
    months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
    monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
    monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
    weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
    weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
    weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [i] HH:mm',
        LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
    },
    calendar: {
        sameDay: '[i teie mahana, i] LT',
        nextDay: '[apopo i] LT',
        nextWeek: 'dddd [i] LT',
        lastDay: '[inanahi i] LT',
        lastWeek: 'dddd [whakamutunga i] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'i roto i %s',
        past: '%s i mua',
        s: 'te hēkona ruarua',
        m: 'he meneti',
        mm: '%d meneti',
        h: 'te haora',
        hh: '%d haora',
        d: 'he ra',
        dd: '%d ra',
        M: 'he marama',
        MM: '%d marama',
        y: 'he tau',
        yy: '%d tau'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return mi;

})));


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Macedonian [mk]
//! author : Borislav Mickov : https://github.com/B0k0

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var mk = moment.defineLocale('mk', {
    months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
    monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
    weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
    weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
    weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'D.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY H:mm',
        LLLL : 'dddd, D MMMM YYYY H:mm'
    },
    calendar : {
        sameDay : '[Денес во] LT',
        nextDay : '[Утре во] LT',
        nextWeek : '[Во] dddd [во] LT',
        lastDay : '[Вчера во] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 6:
                    return '[Изминатата] dddd [во] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[Изминатиот] dddd [во] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'после %s',
        past : 'пред %s',
        s : 'неколку секунди',
        m : 'минута',
        mm : '%d минути',
        h : 'час',
        hh : '%d часа',
        d : 'ден',
        dd : '%d дена',
        M : 'месец',
        MM : '%d месеци',
        y : 'година',
        yy : '%d години'
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
    ordinal : function (number) {
        var lastDigit = number % 10,
            last2Digits = number % 100;
        if (number === 0) {
            return number + '-ев';
        } else if (last2Digits === 0) {
            return number + '-ен';
        } else if (last2Digits > 10 && last2Digits < 20) {
            return number + '-ти';
        } else if (lastDigit === 1) {
            return number + '-ви';
        } else if (lastDigit === 2) {
            return number + '-ри';
        } else if (lastDigit === 7 || lastDigit === 8) {
            return number + '-ми';
        } else {
            return number + '-ти';
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return mk;

})));


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malayalam [ml]
//! author : Floyd Pink : https://github.com/floydpink

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ml = moment.defineLocale('ml', {
    months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
    monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
    monthsParseExact : true,
    weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
    weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
    weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
    longDateFormat : {
        LT : 'A h:mm -നു',
        LTS : 'A h:mm:ss -നു',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm -നു',
        LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
    },
    calendar : {
        sameDay : '[ഇന്ന്] LT',
        nextDay : '[നാളെ] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[ഇന്നലെ] LT',
        lastWeek : '[കഴിഞ്ഞ] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s കഴിഞ്ഞ്',
        past : '%s മുൻപ്',
        s : 'അൽപ നിമിഷങ്ങൾ',
        m : 'ഒരു മിനിറ്റ്',
        mm : '%d മിനിറ്റ്',
        h : 'ഒരു മണിക്കൂർ',
        hh : '%d മണിക്കൂർ',
        d : 'ഒരു ദിവസം',
        dd : '%d ദിവസം',
        M : 'ഒരു മാസം',
        MM : '%d മാസം',
        y : 'ഒരു വർഷം',
        yy : '%d വർഷം'
    },
    meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if ((meridiem === 'രാത്രി' && hour >= 4) ||
                meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
                meridiem === 'വൈകുന്നേരം') {
            return hour + 12;
        } else {
            return hour;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'രാത്രി';
        } else if (hour < 12) {
            return 'രാവിലെ';
        } else if (hour < 17) {
            return 'ഉച്ച കഴിഞ്ഞ്';
        } else if (hour < 20) {
            return 'വൈകുന്നേരം';
        } else {
            return 'രാത്രി';
        }
    }
});

return ml;

})));


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Marathi [mr]
//! author : Harshad Kale : https://github.com/kalehv
//! author : Vivek Athalye : https://github.com/vnathalye

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
};
var numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};

function relativeTimeMr(number, withoutSuffix, string, isFuture)
{
    var output = '';
    if (withoutSuffix) {
        switch (string) {
            case 's': output = 'काही सेकंद'; break;
            case 'm': output = 'एक मिनिट'; break;
            case 'mm': output = '%d मिनिटे'; break;
            case 'h': output = 'एक तास'; break;
            case 'hh': output = '%d तास'; break;
            case 'd': output = 'एक दिवस'; break;
            case 'dd': output = '%d दिवस'; break;
            case 'M': output = 'एक महिना'; break;
            case 'MM': output = '%d महिने'; break;
            case 'y': output = 'एक वर्ष'; break;
            case 'yy': output = '%d वर्षे'; break;
        }
    }
    else {
        switch (string) {
            case 's': output = 'काही सेकंदां'; break;
            case 'm': output = 'एका मिनिटा'; break;
            case 'mm': output = '%d मिनिटां'; break;
            case 'h': output = 'एका तासा'; break;
            case 'hh': output = '%d तासां'; break;
            case 'd': output = 'एका दिवसा'; break;
            case 'dd': output = '%d दिवसां'; break;
            case 'M': output = 'एका महिन्या'; break;
            case 'MM': output = '%d महिन्यां'; break;
            case 'y': output = 'एका वर्षा'; break;
            case 'yy': output = '%d वर्षां'; break;
        }
    }
    return output.replace(/%d/i, number);
}

var mr = moment.defineLocale('mr', {
    months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
    monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
    monthsParseExact : true,
    weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
    weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
    longDateFormat : {
        LT : 'A h:mm वाजता',
        LTS : 'A h:mm:ss वाजता',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm वाजता',
        LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
    },
    calendar : {
        sameDay : '[आज] LT',
        nextDay : '[उद्या] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[काल] LT',
        lastWeek: '[मागील] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future: '%sमध्ये',
        past: '%sपूर्वी',
        s: relativeTimeMr,
        m: relativeTimeMr,
        mm: relativeTimeMr,
        h: relativeTimeMr,
        hh: relativeTimeMr,
        d: relativeTimeMr,
        dd: relativeTimeMr,
        M: relativeTimeMr,
        MM: relativeTimeMr,
        y: relativeTimeMr,
        yy: relativeTimeMr
    },
    preparse: function (string) {
        return string.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'रात्री') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'सकाळी') {
            return hour;
        } else if (meridiem === 'दुपारी') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'सायंकाळी') {
            return hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'रात्री';
        } else if (hour < 10) {
            return 'सकाळी';
        } else if (hour < 17) {
            return 'दुपारी';
        } else if (hour < 20) {
            return 'सायंकाळी';
        } else {
            return 'रात्री';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return mr;

})));


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malay [ms-my]
//! note : DEPRECATED, the correct one is [ms]
//! author : Weldan Jamili : https://github.com/weldan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var msMy = moment.defineLocale('ms-my', {
    months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
    weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
    weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
    weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [pukul] HH.mm',
        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'tengahari') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'petang' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'tengahari';
        } else if (hours < 19) {
            return 'petang';
        } else {
            return 'malam';
        }
    },
    calendar : {
        sameDay : '[Hari ini pukul] LT',
        nextDay : '[Esok pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kelmarin pukul] LT',
        lastWeek : 'dddd [lepas pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dalam %s',
        past : '%s yang lepas',
        s : 'beberapa saat',
        m : 'seminit',
        mm : '%d minit',
        h : 'sejam',
        hh : '%d jam',
        d : 'sehari',
        dd : '%d hari',
        M : 'sebulan',
        MM : '%d bulan',
        y : 'setahun',
        yy : '%d tahun'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return msMy;

})));


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Malay [ms]
//! author : Weldan Jamili : https://github.com/weldan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ms = moment.defineLocale('ms', {
    months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
    weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
    weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
    weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [pukul] HH.mm',
        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
    },
    meridiemParse: /pagi|tengahari|petang|malam/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'pagi') {
            return hour;
        } else if (meridiem === 'tengahari') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'petang' || meridiem === 'malam') {
            return hour + 12;
        }
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'tengahari';
        } else if (hours < 19) {
            return 'petang';
        } else {
            return 'malam';
        }
    },
    calendar : {
        sameDay : '[Hari ini pukul] LT',
        nextDay : '[Esok pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kelmarin pukul] LT',
        lastWeek : 'dddd [lepas pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dalam %s',
        past : '%s yang lepas',
        s : 'beberapa saat',
        m : 'seminit',
        mm : '%d minit',
        h : 'sejam',
        hh : '%d jam',
        d : 'sehari',
        dd : '%d hari',
        M : 'sebulan',
        MM : '%d bulan',
        y : 'setahun',
        yy : '%d tahun'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return ms;

})));


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Burmese [my]
//! author : Squar team, mysquar.com
//! author : David Rossellat : https://github.com/gholadr
//! author : Tin Aung Lin : https://github.com/thanyawzinmin

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '၁',
    '2': '၂',
    '3': '၃',
    '4': '၄',
    '5': '၅',
    '6': '၆',
    '7': '၇',
    '8': '၈',
    '9': '၉',
    '0': '၀'
};
var numberMap = {
    '၁': '1',
    '၂': '2',
    '၃': '3',
    '၄': '4',
    '၅': '5',
    '၆': '6',
    '၇': '7',
    '၈': '8',
    '၉': '9',
    '၀': '0'
};

var my = moment.defineLocale('my', {
    months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
    monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
    weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
    weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
    weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[ယနေ.] LT [မှာ]',
        nextDay: '[မနက်ဖြန်] LT [မှာ]',
        nextWeek: 'dddd LT [မှာ]',
        lastDay: '[မနေ.က] LT [မှာ]',
        lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'လာမည့် %s မှာ',
        past: 'လွန်ခဲ့သော %s က',
        s: 'စက္ကန်.အနည်းငယ်',
        m: 'တစ်မိနစ်',
        mm: '%d မိနစ်',
        h: 'တစ်နာရီ',
        hh: '%d နာရီ',
        d: 'တစ်ရက်',
        dd: '%d ရက်',
        M: 'တစ်လ',
        MM: '%d လ',
        y: 'တစ်နှစ်',
        yy: '%d နှစ်'
    },
    preparse: function (string) {
        return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 1st is the first week of the year.
    }
});

return my;

})));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Norwegian Bokmål [nb]
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var nb = moment.defineLocale('nb', {
    months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
    monthsParseExact : true,
    weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
    weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY [kl.] HH:mm',
        LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar : {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'dddd [kl.] LT',
        lastDay: '[i går kl.] LT',
        lastWeek: '[forrige] dddd [kl.] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'om %s',
        past : '%s siden',
        s : 'noen sekunder',
        m : 'ett minutt',
        mm : '%d minutter',
        h : 'en time',
        hh : '%d timer',
        d : 'en dag',
        dd : '%d dager',
        M : 'en måned',
        MM : '%d måneder',
        y : 'ett år',
        yy : '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return nb;

})));


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Nepalese [ne]
//! author : suvash : https://github.com/suvash

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
};
var numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};

var ne = moment.defineLocale('ne', {
    months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
    monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
    monthsParseExact : true,
    weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
    weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
    weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'Aको h:mm बजे',
        LTS : 'Aको h:mm:ss बजे',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, Aको h:mm बजे',
        LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
    },
    preparse: function (string) {
        return string.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'राति') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'बिहान') {
            return hour;
        } else if (meridiem === 'दिउँसो') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'साँझ') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 3) {
            return 'राति';
        } else if (hour < 12) {
            return 'बिहान';
        } else if (hour < 16) {
            return 'दिउँसो';
        } else if (hour < 20) {
            return 'साँझ';
        } else {
            return 'राति';
        }
    },
    calendar : {
        sameDay : '[आज] LT',
        nextDay : '[भोलि] LT',
        nextWeek : '[आउँदो] dddd[,] LT',
        lastDay : '[हिजो] LT',
        lastWeek : '[गएको] dddd[,] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%sमा',
        past : '%s अगाडि',
        s : 'केही क्षण',
        m : 'एक मिनेट',
        mm : '%d मिनेट',
        h : 'एक घण्टा',
        hh : '%d घण्टा',
        d : 'एक दिन',
        dd : '%d दिन',
        M : 'एक महिना',
        MM : '%d महिना',
        y : 'एक बर्ष',
        yy : '%d बर्ष'
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return ne;

})));


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Dutch (Belgium) [nl-be]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

var nlBe = moment.defineLocale('nl-be', {
    months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortWithDots;
        } else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[m.month()];
        } else {
            return monthsShortWithDots[m.month()];
        }
    },

    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,

    weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'over %s',
        past : '%s geleden',
        s : 'een paar seconden',
        m : 'één minuut',
        mm : '%d minuten',
        h : 'één uur',
        hh : '%d uur',
        d : 'één dag',
        dd : '%d dagen',
        M : 'één maand',
        MM : '%d maanden',
        y : 'één jaar',
        yy : '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return nlBe;

})));


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Dutch [nl]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

var nl = moment.defineLocale('nl', {
    months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort : function (m, format) {
        if (!m) {
            return monthsShortWithDots;
        } else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[m.month()];
        } else {
            return monthsShortWithDots[m.month()];
        }
    },

    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,

    weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'over %s',
        past : '%s geleden',
        s : 'een paar seconden',
        m : 'één minuut',
        mm : '%d minuten',
        h : 'één uur',
        hh : '%d uur',
        d : 'één dag',
        dd : '%d dagen',
        M : 'één maand',
        MM : '%d maanden',
        y : 'één jaar',
        yy : '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return nl;

})));


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Nynorsk [nn]
//! author : https://github.com/mechuwind

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var nn = moment.defineLocale('nn', {
    months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
    weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
    weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
    weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY [kl.] H:mm',
        LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar : {
        sameDay: '[I dag klokka] LT',
        nextDay: '[I morgon klokka] LT',
        nextWeek: 'dddd [klokka] LT',
        lastDay: '[I går klokka] LT',
        lastWeek: '[Føregåande] dddd [klokka] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'om %s',
        past : '%s sidan',
        s : 'nokre sekund',
        m : 'eit minutt',
        mm : '%d minutt',
        h : 'ein time',
        hh : '%d timar',
        d : 'ein dag',
        dd : '%d dagar',
        M : 'ein månad',
        MM : '%d månader',
        y : 'eit år',
        yy : '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return nn;

})));


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Punjabi (India) [pa-in]
//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '੧',
    '2': '੨',
    '3': '੩',
    '4': '੪',
    '5': '੫',
    '6': '੬',
    '7': '੭',
    '8': '੮',
    '9': '੯',
    '0': '੦'
};
var numberMap = {
    '੧': '1',
    '੨': '2',
    '੩': '3',
    '੪': '4',
    '੫': '5',
    '੬': '6',
    '੭': '7',
    '੮': '8',
    '੯': '9',
    '੦': '0'
};

var paIn = moment.defineLocale('pa-in', {
    // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
    months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
    monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
    weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
    weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
    weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
    longDateFormat : {
        LT : 'A h:mm ਵਜੇ',
        LTS : 'A h:mm:ss ਵਜੇ',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
        LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
    },
    calendar : {
        sameDay : '[ਅਜ] LT',
        nextDay : '[ਕਲ] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[ਕਲ] LT',
        lastWeek : '[ਪਿਛਲੇ] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s ਵਿੱਚ',
        past : '%s ਪਿਛਲੇ',
        s : 'ਕੁਝ ਸਕਿੰਟ',
        m : 'ਇਕ ਮਿੰਟ',
        mm : '%d ਮਿੰਟ',
        h : 'ਇੱਕ ਘੰਟਾ',
        hh : '%d ਘੰਟੇ',
        d : 'ਇੱਕ ਦਿਨ',
        dd : '%d ਦਿਨ',
        M : 'ਇੱਕ ਮਹੀਨਾ',
        MM : '%d ਮਹੀਨੇ',
        y : 'ਇੱਕ ਸਾਲ',
        yy : '%d ਸਾਲ'
    },
    preparse: function (string) {
        return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
    meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'ਰਾਤ') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'ਸਵੇਰ') {
            return hour;
        } else if (meridiem === 'ਦੁਪਹਿਰ') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'ਸ਼ਾਮ') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ਰਾਤ';
        } else if (hour < 10) {
            return 'ਸਵੇਰ';
        } else if (hour < 17) {
            return 'ਦੁਪਹਿਰ';
        } else if (hour < 20) {
            return 'ਸ਼ਾਮ';
        } else {
            return 'ਰਾਤ';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return paIn;

})));


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Polish [pl]
//! author : Rafal Hirsz : https://github.com/evoL

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
var monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
function plural(n) {
    return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
}
function translate(number, withoutSuffix, key) {
    var result = number + ' ';
    switch (key) {
        case 'm':
            return withoutSuffix ? 'minuta' : 'minutę';
        case 'mm':
            return result + (plural(number) ? 'minuty' : 'minut');
        case 'h':
            return withoutSuffix  ? 'godzina'  : 'godzinę';
        case 'hh':
            return result + (plural(number) ? 'godziny' : 'godzin');
        case 'MM':
            return result + (plural(number) ? 'miesiące' : 'miesięcy');
        case 'yy':
            return result + (plural(number) ? 'lata' : 'lat');
    }
}

var pl = moment.defineLocale('pl', {
    months : function (momentToFormat, format) {
        if (!momentToFormat) {
            return monthsNominative;
        } else if (format === '') {
            // Hack: if format empty we know this is used to generate
            // RegExp by moment. Give then back both valid forms of months
            // in RegExp ready format.
            return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
        } else if (/D MMMM/.test(format)) {
            return monthsSubjective[momentToFormat.month()];
        } else {
            return monthsNominative[momentToFormat.month()];
        }
    },
    monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
    weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
    weekdaysShort : 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
    weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Dziś o] LT',
        nextDay: '[Jutro o] LT',
        nextWeek: '[W] dddd [o] LT',
        lastDay: '[Wczoraj o] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[W zeszłą niedzielę o] LT';
                case 3:
                    return '[W zeszłą środę o] LT';
                case 6:
                    return '[W zeszłą sobotę o] LT';
                default:
                    return '[W zeszły] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'za %s',
        past : '%s temu',
        s : 'kilka sekund',
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : '1 dzień',
        dd : '%d dni',
        M : 'miesiąc',
        MM : translate,
        y : 'rok',
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return pl;

})));


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Portuguese (Brazil) [pt-br]
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var ptBr = moment.defineLocale('pt-br', {
    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'em %s',
        past : '%s atrás',
        s : 'poucos segundos',
        m : 'um minuto',
        mm : '%d minutos',
        h : 'uma hora',
        hh : '%d horas',
        d : 'um dia',
        dd : '%d dias',
        M : 'um mês',
        MM : '%d meses',
        y : 'um ano',
        yy : '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal : '%dº'
});

return ptBr;

})));


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Portuguese [pt]
//! author : Jefferson : https://github.com/jalex79

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var pt = moment.defineLocale('pt', {
    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays : 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY HH:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'em %s',
        past : 'há %s',
        s : 'segundos',
        m : 'um minuto',
        mm : '%d minutos',
        h : 'uma hora',
        hh : '%d horas',
        d : 'um dia',
        dd : '%d dias',
        M : 'um mês',
        MM : '%d meses',
        y : 'um ano',
        yy : '%d anos'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return pt;

})));


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Romanian [ro]
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
            'mm': 'minute',
            'hh': 'ore',
            'dd': 'zile',
            'MM': 'luni',
            'yy': 'ani'
        },
        separator = ' ';
    if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
        separator = ' de ';
    }
    return number + separator + format[key];
}

var ro = moment.defineLocale('ro', {
    months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
    monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
    weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
    weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY H:mm',
        LLLL : 'dddd, D MMMM YYYY H:mm'
    },
    calendar : {
        sameDay: '[azi la] LT',
        nextDay: '[mâine la] LT',
        nextWeek: 'dddd [la] LT',
        lastDay: '[ieri la] LT',
        lastWeek: '[fosta] dddd [la] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'peste %s',
        past : '%s în urmă',
        s : 'câteva secunde',
        m : 'un minut',
        mm : relativeTimeWithPlural,
        h : 'o oră',
        hh : relativeTimeWithPlural,
        d : 'o zi',
        dd : relativeTimeWithPlural,
        M : 'o lună',
        MM : relativeTimeWithPlural,
        y : 'un an',
        yy : relativeTimeWithPlural
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return ro;

})));


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Russian [ru]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
//! author : Коренберг Марк : https://github.com/socketpair

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
        'hh': 'час_часа_часов',
        'dd': 'день_дня_дней',
        'MM': 'месяц_месяца_месяцев',
        'yy': 'год_года_лет'
    };
    if (key === 'm') {
        return withoutSuffix ? 'минута' : 'минуту';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}
var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

// http://new.gramota.ru/spravka/rules/139-prop : § 103
// Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
var ru = moment.defineLocale('ru', {
    months : {
        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
    },
    monthsShort : {
        // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
        format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
        standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
    },
    weekdays : {
        standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
        format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
        isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
    },
    weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,

    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

    // копия предыдущего
    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

    // полные названия с падежами
    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

    // Выражение, которое соотвествует только сокращённым формам
    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY г.',
        LLL : 'D MMMM YYYY г., HH:mm',
        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
    },
    calendar : {
        sameDay: '[Сегодня в] LT',
        nextDay: '[Завтра в] LT',
        lastDay: '[Вчера в] LT',
        nextWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В следующее] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В следующий] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В следующую] dddd [в] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd [в] LT';
                } else {
                    return '[В] dddd [в] LT';
                }
            }
        },
        lastWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В прошлое] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В прошлый] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В прошлую] dddd [в] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd [в] LT';
                } else {
                    return '[В] dddd [в] LT';
                }
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'через %s',
        past : '%s назад',
        s : 'несколько секунд',
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : 'час',
        hh : relativeTimeWithPlural,
        d : 'день',
        dd : relativeTimeWithPlural,
        M : 'месяц',
        MM : relativeTimeWithPlural,
        y : 'год',
        yy : relativeTimeWithPlural
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM : function (input) {
        return /^(дня|вечера)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ночи';
        } else if (hour < 12) {
            return 'утра';
        } else if (hour < 17) {
            return 'дня';
        } else {
            return 'вечера';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-й';
            case 'D':
                return number + '-го';
            case 'w':
            case 'W':
                return number + '-я';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return ru;

})));


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Sindhi [sd]
//! author : Narain Sagar : https://github.com/narainsagar

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = [
    'جنوري',
    'فيبروري',
    'مارچ',
    'اپريل',
    'مئي',
    'جون',
    'جولاءِ',
    'آگسٽ',
    'سيپٽمبر',
    'آڪٽوبر',
    'نومبر',
    'ڊسمبر'
];
var days = [
    'آچر',
    'سومر',
    'اڱارو',
    'اربع',
    'خميس',
    'جمع',
    'ڇنڇر'
];

var sd = moment.defineLocale('sd', {
    months : months,
    monthsShort : months,
    weekdays : days,
    weekdaysShort : days,
    weekdaysMin : days,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd، D MMMM YYYY HH:mm'
    },
    meridiemParse: /صبح|شام/,
    isPM : function (input) {
        return 'شام' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'صبح';
        }
        return 'شام';
    },
    calendar : {
        sameDay : '[اڄ] LT',
        nextDay : '[سڀاڻي] LT',
        nextWeek : 'dddd [اڳين هفتي تي] LT',
        lastDay : '[ڪالهه] LT',
        lastWeek : '[گزريل هفتي] dddd [تي] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s پوء',
        past : '%s اڳ',
        s : 'چند سيڪنڊ',
        m : 'هڪ منٽ',
        mm : '%d منٽ',
        h : 'هڪ ڪلاڪ',
        hh : '%d ڪلاڪ',
        d : 'هڪ ڏينهن',
        dd : '%d ڏينهن',
        M : 'هڪ مهينو',
        MM : '%d مهينا',
        y : 'هڪ سال',
        yy : '%d سال'
    },
    preparse: function (string) {
        return string.replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/,/g, '،');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return sd;

})));


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Northern Sami [se]
//! authors : Bård Rolstad Henriksen : https://github.com/karamell

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';



var se = moment.defineLocale('se', {
    months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
    monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
    weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
    weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
    weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'MMMM D. [b.] YYYY',
        LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
        LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
    },
    calendar : {
        sameDay: '[otne ti] LT',
        nextDay: '[ihttin ti] LT',
        nextWeek: 'dddd [ti] LT',
        lastDay: '[ikte ti] LT',
        lastWeek: '[ovddit] dddd [ti] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s geažes',
        past : 'maŋit %s',
        s : 'moadde sekunddat',
        m : 'okta minuhta',
        mm : '%d minuhtat',
        h : 'okta diimmu',
        hh : '%d diimmut',
        d : 'okta beaivi',
        dd : '%d beaivvit',
        M : 'okta mánnu',
        MM : '%d mánut',
        y : 'okta jahki',
        yy : '%d jagit'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return se;

})));


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Sinhalese [si]
//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


/*jshint -W100*/
var si = moment.defineLocale('si', {
    months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
    monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
    weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
    weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
    weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'a h:mm',
        LTS : 'a h:mm:ss',
        L : 'YYYY/MM/DD',
        LL : 'YYYY MMMM D',
        LLL : 'YYYY MMMM D, a h:mm',
        LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
    },
    calendar : {
        sameDay : '[අද] LT[ට]',
        nextDay : '[හෙට] LT[ට]',
        nextWeek : 'dddd LT[ට]',
        lastDay : '[ඊයේ] LT[ට]',
        lastWeek : '[පසුගිය] dddd LT[ට]',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%sකින්',
        past : '%sකට පෙර',
        s : 'තත්පර කිහිපය',
        m : 'මිනිත්තුව',
        mm : 'මිනිත්තු %d',
        h : 'පැය',
        hh : 'පැය %d',
        d : 'දිනය',
        dd : 'දින %d',
        M : 'මාසය',
        MM : 'මාස %d',
        y : 'වසර',
        yy : 'වසර %d'
    },
    dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
    ordinal : function (number) {
        return number + ' වැනි';
    },
    meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
    isPM : function (input) {
        return input === 'ප.ව.' || input === 'පස් වරු';
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'ප.ව.' : 'පස් වරු';
        } else {
            return isLower ? 'පෙ.ව.' : 'පෙර වරු';
        }
    }
});

return si;

})));


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Slovak [sk]
//! author : Martin Minka : https://github.com/k2s
//! based on work of petrbela : https://github.com/petrbela

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_');
var monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
function plural(n) {
    return (n > 1) && (n < 5);
}
function translate(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':  // a few seconds / in a few seconds / a few seconds ago
            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
        case 'm':  // a minute / in a minute / a minute ago
            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'minúty' : 'minút');
            } else {
                return result + 'minútami';
            }
            break;
        case 'h':  // an hour / in an hour / an hour ago
            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
        case 'hh': // 9 hours / in 9 hours / 9 hours ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'hodiny' : 'hodín');
            } else {
                return result + 'hodinami';
            }
            break;
        case 'd':  // a day / in a day / a day ago
            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
        case 'dd': // 9 days / in 9 days / 9 days ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'dni' : 'dní');
            } else {
                return result + 'dňami';
            }
            break;
        case 'M':  // a month / in a month / a month ago
            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
        case 'MM': // 9 months / in 9 months / 9 months ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'mesiace' : 'mesiacov');
            } else {
                return result + 'mesiacmi';
            }
            break;
        case 'y':  // a year / in a year / a year ago
            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
        case 'yy': // 9 years / in 9 years / 9 years ago
            if (withoutSuffix || isFuture) {
                return result + (plural(number) ? 'roky' : 'rokov');
            } else {
                return result + 'rokmi';
            }
            break;
    }
}

var sk = moment.defineLocale('sk', {
    months : months,
    monthsShort : monthsShort,
    weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
    weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
    weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
    longDateFormat : {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay: '[dnes o] LT',
        nextDay: '[zajtra o] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[v nedeľu o] LT';
                case 1:
                case 2:
                    return '[v] dddd [o] LT';
                case 3:
                    return '[v stredu o] LT';
                case 4:
                    return '[vo štvrtok o] LT';
                case 5:
                    return '[v piatok o] LT';
                case 6:
                    return '[v sobotu o] LT';
            }
        },
        lastDay: '[včera o] LT',
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[minulú nedeľu o] LT';
                case 1:
                case 2:
                    return '[minulý] dddd [o] LT';
                case 3:
                    return '[minulú stredu o] LT';
                case 4:
                case 5:
                    return '[minulý] dddd [o] LT';
                case 6:
                    return '[minulú sobotu o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'za %s',
        past : 'pred %s',
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return sk;

})));


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Slovenian [sl]
//! author : Robert Sedovšek : https://github.com/sedovsek

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var result = number + ' ';
    switch (key) {
        case 's':
            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
        case 'm':
            return withoutSuffix ? 'ena minuta' : 'eno minuto';
        case 'mm':
            if (number === 1) {
                result += withoutSuffix ? 'minuta' : 'minuto';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
            } else {
                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
            }
            return result;
        case 'h':
            return withoutSuffix ? 'ena ura' : 'eno uro';
        case 'hh':
            if (number === 1) {
                result += withoutSuffix ? 'ura' : 'uro';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'uri' : 'urama';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'ure' : 'urami';
            } else {
                result += withoutSuffix || isFuture ? 'ur' : 'urami';
            }
            return result;
        case 'd':
            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
        case 'dd':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
            } else {
                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
            }
            return result;
        case 'M':
            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
        case 'MM':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
            } else {
                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
            }
            return result;
        case 'y':
            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
        case 'yy':
            if (number === 1) {
                result += withoutSuffix || isFuture ? 'leto' : 'letom';
            } else if (number === 2) {
                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
            } else if (number < 5) {
                result += withoutSuffix || isFuture ? 'leta' : 'leti';
            } else {
                result += withoutSuffix || isFuture ? 'let' : 'leti';
            }
            return result;
    }
}

var sl = moment.defineLocale('sl', {
    months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
    weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
    weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY H:mm',
        LLLL : 'dddd, D. MMMM YYYY H:mm'
    },
    calendar : {
        sameDay  : '[danes ob] LT',
        nextDay  : '[jutri ob] LT',

        nextWeek : function () {
            switch (this.day()) {
                case 0:
                    return '[v] [nedeljo] [ob] LT';
                case 3:
                    return '[v] [sredo] [ob] LT';
                case 6:
                    return '[v] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[v] dddd [ob] LT';
            }
        },
        lastDay  : '[včeraj ob] LT',
        lastWeek : function () {
            switch (this.day()) {
                case 0:
                    return '[prejšnjo] [nedeljo] [ob] LT';
                case 3:
                    return '[prejšnjo] [sredo] [ob] LT';
                case 6:
                    return '[prejšnjo] [soboto] [ob] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[prejšnji] dddd [ob] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'čez %s',
        past   : 'pred %s',
        s      : processRelativeTime,
        m      : processRelativeTime,
        mm     : processRelativeTime,
        h      : processRelativeTime,
        hh     : processRelativeTime,
        d      : processRelativeTime,
        dd     : processRelativeTime,
        M      : processRelativeTime,
        MM     : processRelativeTime,
        y      : processRelativeTime,
        yy     : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return sl;

})));


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Albanian [sq]
//! author : Flakërim Ismani : https://github.com/flakerimi
//! author : Menelion Elensúle : https://github.com/Oire
//! author : Oerd Cukalla : https://github.com/oerd

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var sq = moment.defineLocale('sq', {
    months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
    monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
    weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
    weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
    weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
    weekdaysParseExact : true,
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Sot në] LT',
        nextDay : '[Nesër në] LT',
        nextWeek : 'dddd [në] LT',
        lastDay : '[Dje në] LT',
        lastWeek : 'dddd [e kaluar në] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'në %s',
        past : '%s më parë',
        s : 'disa sekonda',
        m : 'një minutë',
        mm : '%d minuta',
        h : 'një orë',
        hh : '%d orë',
        d : 'një ditë',
        dd : '%d ditë',
        M : 'një muaj',
        MM : '%d muaj',
        y : 'një vit',
        yy : '%d vite'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return sq;

})));


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Serbian Cyrillic [sr-cyrl]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var translator = {
    words: { //Different grammatical cases
        m: ['један минут', 'једне минуте'],
        mm: ['минут', 'минуте', 'минута'],
        h: ['један сат', 'једног сата'],
        hh: ['сат', 'сата', 'сати'],
        dd: ['дан', 'дана', 'дана'],
        MM: ['месец', 'месеца', 'месеци'],
        yy: ['година', 'године', 'година']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var srCyrl = moment.defineLocale('sr-cyrl', {
    months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
    monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
    monthsParseExact: true,
    weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
    weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
    weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[данас у] LT',
        nextDay: '[сутра у] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[у] [недељу] [у] LT';
                case 3:
                    return '[у] [среду] [у] LT';
                case 6:
                    return '[у] [суботу] [у] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[у] dddd [у] LT';
            }
        },
        lastDay  : '[јуче у] LT',
        lastWeek : function () {
            var lastWeekDays = [
                '[прошле] [недеље] [у] LT',
                '[прошлог] [понедељка] [у] LT',
                '[прошлог] [уторка] [у] LT',
                '[прошле] [среде] [у] LT',
                '[прошлог] [четвртка] [у] LT',
                '[прошлог] [петка] [у] LT',
                '[прошле] [суботе] [у] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'за %s',
        past   : 'пре %s',
        s      : 'неколико секунди',
        m      : translator.translate,
        mm     : translator.translate,
        h      : translator.translate,
        hh     : translator.translate,
        d      : 'дан',
        dd     : translator.translate,
        M      : 'месец',
        MM     : translator.translate,
        y      : 'годину',
        yy     : translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return srCyrl;

})));


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Serbian [sr]
//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var translator = {
    words: { //Different grammatical cases
        m: ['jedan minut', 'jedne minute'],
        mm: ['minut', 'minute', 'minuta'],
        h: ['jedan sat', 'jednog sata'],
        hh: ['sat', 'sata', 'sati'],
        dd: ['dan', 'dana', 'dana'],
        MM: ['mesec', 'meseca', 'meseci'],
        yy: ['godina', 'godine', 'godina']
    },
    correctGrammaticalCase: function (number, wordKey) {
        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
    },
    translate: function (number, withoutSuffix, key) {
        var wordKey = translator.words[key];
        if (key.length === 1) {
            return withoutSuffix ? wordKey[0] : wordKey[1];
        } else {
            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
        }
    }
};

var sr = moment.defineLocale('sr', {
    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
    weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
    weekdaysParseExact : true,
    longDateFormat: {
        LT: 'H:mm',
        LTS : 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[danas u] LT',
        nextDay: '[sutra u] LT',
        nextWeek: function () {
            switch (this.day()) {
                case 0:
                    return '[u] [nedelju] [u] LT';
                case 3:
                    return '[u] [sredu] [u] LT';
                case 6:
                    return '[u] [subotu] [u] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[juče u] LT',
        lastWeek : function () {
            var lastWeekDays = [
                '[prošle] [nedelje] [u] LT',
                '[prošlog] [ponedeljka] [u] LT',
                '[prošlog] [utorka] [u] LT',
                '[prošle] [srede] [u] LT',
                '[prošlog] [četvrtka] [u] LT',
                '[prošlog] [petka] [u] LT',
                '[prošle] [subote] [u] LT'
            ];
            return lastWeekDays[this.day()];
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'pre %s',
        s      : 'nekoliko sekundi',
        m      : translator.translate,
        mm     : translator.translate,
        h      : translator.translate,
        hh     : translator.translate,
        d      : 'dan',
        dd     : translator.translate,
        M      : 'mesec',
        MM     : translator.translate,
        y      : 'godinu',
        yy     : translator.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return sr;

})));


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : siSwati [ss]
//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';



var ss = moment.defineLocale('ss', {
    months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
    monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
    weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
    weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
    weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Namuhla nga] LT',
        nextDay : '[Kusasa nga] LT',
        nextWeek : 'dddd [nga] LT',
        lastDay : '[Itolo nga] LT',
        lastWeek : 'dddd [leliphelile] [nga] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'nga %s',
        past : 'wenteka nga %s',
        s : 'emizuzwana lomcane',
        m : 'umzuzu',
        mm : '%d emizuzu',
        h : 'lihora',
        hh : '%d emahora',
        d : 'lilanga',
        dd : '%d emalanga',
        M : 'inyanga',
        MM : '%d tinyanga',
        y : 'umnyaka',
        yy : '%d iminyaka'
    },
    meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'ekuseni';
        } else if (hours < 15) {
            return 'emini';
        } else if (hours < 19) {
            return 'entsambama';
        } else {
            return 'ebusuku';
        }
    },
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'ekuseni') {
            return hour;
        } else if (meridiem === 'emini') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
            if (hour === 0) {
                return 0;
            }
            return hour + 12;
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal : '%d',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return ss;

})));


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var sv = moment.defineLocale('sv', {
    months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
    weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
    weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY [kl.] HH:mm',
        LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
        lll : 'D MMM YYYY HH:mm',
        llll : 'ddd D MMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Idag] LT',
        nextDay: '[Imorgon] LT',
        lastDay: '[Igår] LT',
        nextWeek: '[På] dddd LT',
        lastWeek: '[I] dddd[s] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'om %s',
        past : 'för %s sedan',
        s : 'några sekunder',
        m : 'en minut',
        mm : '%d minuter',
        h : 'en timme',
        hh : '%d timmar',
        d : 'en dag',
        dd : '%d dagar',
        M : 'en månad',
        MM : '%d månader',
        y : 'ett år',
        yy : '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'e' :
            (b === 1) ? 'a' :
            (b === 2) ? 'a' :
            (b === 3) ? 'e' : 'e';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return sv;

})));


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Swahili [sw]
//! author : Fahad Kassim : https://github.com/fadsel

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var sw = moment.defineLocale('sw', {
    months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
    weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
    weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
    weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[leo saa] LT',
        nextDay : '[kesho saa] LT',
        nextWeek : '[wiki ijayo] dddd [saat] LT',
        lastDay : '[jana] LT',
        lastWeek : '[wiki iliyopita] dddd [saat] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s baadaye',
        past : 'tokea %s',
        s : 'hivi punde',
        m : 'dakika moja',
        mm : 'dakika %d',
        h : 'saa limoja',
        hh : 'masaa %d',
        d : 'siku moja',
        dd : 'masiku %d',
        M : 'mwezi mmoja',
        MM : 'miezi %d',
        y : 'mwaka mmoja',
        yy : 'miaka %d'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return sw;

})));


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tamil [ta]
//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var symbolMap = {
    '1': '௧',
    '2': '௨',
    '3': '௩',
    '4': '௪',
    '5': '௫',
    '6': '௬',
    '7': '௭',
    '8': '௮',
    '9': '௯',
    '0': '௦'
};
var numberMap = {
    '௧': '1',
    '௨': '2',
    '௩': '3',
    '௪': '4',
    '௫': '5',
    '௬': '6',
    '௭': '7',
    '௮': '8',
    '௯': '9',
    '௦': '0'
};

var ta = moment.defineLocale('ta', {
    months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
    monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
    weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
    weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
    weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, HH:mm',
        LLLL : 'dddd, D MMMM YYYY, HH:mm'
    },
    calendar : {
        sameDay : '[இன்று] LT',
        nextDay : '[நாளை] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[நேற்று] LT',
        lastWeek : '[கடந்த வாரம்] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s இல்',
        past : '%s முன்',
        s : 'ஒரு சில விநாடிகள்',
        m : 'ஒரு நிமிடம்',
        mm : '%d நிமிடங்கள்',
        h : 'ஒரு மணி நேரம்',
        hh : '%d மணி நேரம்',
        d : 'ஒரு நாள்',
        dd : '%d நாட்கள்',
        M : 'ஒரு மாதம்',
        MM : '%d மாதங்கள்',
        y : 'ஒரு வருடம்',
        yy : '%d ஆண்டுகள்'
    },
    dayOfMonthOrdinalParse: /\d{1,2}வது/,
    ordinal : function (number) {
        return number + 'வது';
    },
    preparse: function (string) {
        return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // refer http://ta.wikipedia.org/s/1er1
    meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
    meridiem : function (hour, minute, isLower) {
        if (hour < 2) {
            return ' யாமம்';
        } else if (hour < 6) {
            return ' வைகறை';  // வைகறை
        } else if (hour < 10) {
            return ' காலை'; // காலை
        } else if (hour < 14) {
            return ' நண்பகல்'; // நண்பகல்
        } else if (hour < 18) {
            return ' எற்பாடு'; // எற்பாடு
        } else if (hour < 22) {
            return ' மாலை'; // மாலை
        } else {
            return ' யாமம்';
        }
    },
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'யாமம்') {
            return hour < 2 ? hour : hour + 12;
        } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
            return hour;
        } else if (meridiem === 'நண்பகல்') {
            return hour >= 10 ? hour : hour + 12;
        } else {
            return hour + 12;
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return ta;

})));


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Telugu [te]
//! author : Krishna Chaitanya Thota : https://github.com/kcthota

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var te = moment.defineLocale('te', {
    months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
    monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
    monthsParseExact : true,
    weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
    weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
    weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
    longDateFormat : {
        LT : 'A h:mm',
        LTS : 'A h:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY, A h:mm',
        LLLL : 'dddd, D MMMM YYYY, A h:mm'
    },
    calendar : {
        sameDay : '[నేడు] LT',
        nextDay : '[రేపు] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[నిన్న] LT',
        lastWeek : '[గత] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s లో',
        past : '%s క్రితం',
        s : 'కొన్ని క్షణాలు',
        m : 'ఒక నిమిషం',
        mm : '%d నిమిషాలు',
        h : 'ఒక గంట',
        hh : '%d గంటలు',
        d : 'ఒక రోజు',
        dd : '%d రోజులు',
        M : 'ఒక నెల',
        MM : '%d నెలలు',
        y : 'ఒక సంవత్సరం',
        yy : '%d సంవత్సరాలు'
    },
    dayOfMonthOrdinalParse : /\d{1,2}వ/,
    ordinal : '%dవ',
    meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'రాత్రి') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'ఉదయం') {
            return hour;
        } else if (meridiem === 'మధ్యాహ్నం') {
            return hour >= 10 ? hour : hour + 12;
        } else if (meridiem === 'సాయంత్రం') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'రాత్రి';
        } else if (hour < 10) {
            return 'ఉదయం';
        } else if (hour < 17) {
            return 'మధ్యాహ్నం';
        } else if (hour < 20) {
            return 'సాయంత్రం';
        } else {
            return 'రాత్రి';
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});

return te;

})));


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tetun Dili (East Timor) [tet]
//! author : Joshua Brooks : https://github.com/joshbrooks
//! author : Onorio De J. Afonso : https://github.com/marobo

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var tet = moment.defineLocale('tet', {
    months : 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez'.split('_'),
    weekdays : 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu'.split('_'),
    weekdaysShort : 'Dom_Seg_Ters_Kua_Kint_Sext_Sab'.split('_'),
    weekdaysMin : 'Do_Seg_Te_Ku_Ki_Sex_Sa'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Ohin iha] LT',
        nextDay: '[Aban iha] LT',
        nextWeek: 'dddd [iha] LT',
        lastDay: '[Horiseik iha] LT',
        lastWeek: 'dddd [semana kotuk] [iha] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'iha %s',
        past : '%s liuba',
        s : 'minutu balun',
        m : 'minutu ida',
        mm : 'minutus %d',
        h : 'horas ida',
        hh : 'horas %d',
        d : 'loron ida',
        dd : 'loron %d',
        M : 'fulan ida',
        MM : 'fulan %d',
        y : 'tinan ida',
        yy : 'tinan %d'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return tet;

})));


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Thai [th]
//! author : Kridsada Thanabulpong : https://github.com/sirn

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var th = moment.defineLocale('th', {
    months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
    monthsShort : 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
    monthsParseExact: true,
    weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
    weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
    weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'H:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY เวลา H:mm',
        LLLL : 'วันddddที่ D MMMM YYYY เวลา H:mm'
    },
    meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
    isPM: function (input) {
        return input === 'หลังเที่ยง';
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ก่อนเที่ยง';
        } else {
            return 'หลังเที่ยง';
        }
    },
    calendar : {
        sameDay : '[วันนี้ เวลา] LT',
        nextDay : '[พรุ่งนี้ เวลา] LT',
        nextWeek : 'dddd[หน้า เวลา] LT',
        lastDay : '[เมื่อวานนี้ เวลา] LT',
        lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'อีก %s',
        past : '%sที่แล้ว',
        s : 'ไม่กี่วินาที',
        m : '1 นาที',
        mm : '%d นาที',
        h : '1 ชั่วโมง',
        hh : '%d ชั่วโมง',
        d : '1 วัน',
        dd : '%d วัน',
        M : '1 เดือน',
        MM : '%d เดือน',
        y : '1 ปี',
        yy : '%d ปี'
    }
});

return th;

})));


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Tagalog (Philippines) [tl-ph]
//! author : Dan Hagman : https://github.com/hagmandan

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var tlPh = moment.defineLocale('tl-ph', {
    months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
    monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
    weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
    weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
    weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'MM/D/YYYY',
        LL : 'MMMM D, YYYY',
        LLL : 'MMMM D, YYYY HH:mm',
        LLLL : 'dddd, MMMM DD, YYYY HH:mm'
    },
    calendar : {
        sameDay: 'LT [ngayong araw]',
        nextDay: '[Bukas ng] LT',
        nextWeek: 'LT [sa susunod na] dddd',
        lastDay: 'LT [kahapon]',
        lastWeek: 'LT [noong nakaraang] dddd',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'sa loob ng %s',
        past : '%s ang nakalipas',
        s : 'ilang segundo',
        m : 'isang minuto',
        mm : '%d minuto',
        h : 'isang oras',
        hh : '%d oras',
        d : 'isang araw',
        dd : '%d araw',
        M : 'isang buwan',
        MM : '%d buwan',
        y : 'isang taon',
        yy : '%d taon'
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal : function (number) {
        return number;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return tlPh;

})));


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Klingon [tlh]
//! author : Dominika Kruk : https://github.com/amaranthrose

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

function translateFuture(output) {
    var time = output;
    time = (output.indexOf('jaj') !== -1) ?
    time.slice(0, -3) + 'leS' :
    (output.indexOf('jar') !== -1) ?
    time.slice(0, -3) + 'waQ' :
    (output.indexOf('DIS') !== -1) ?
    time.slice(0, -3) + 'nem' :
    time + ' pIq';
    return time;
}

function translatePast(output) {
    var time = output;
    time = (output.indexOf('jaj') !== -1) ?
    time.slice(0, -3) + 'Hu’' :
    (output.indexOf('jar') !== -1) ?
    time.slice(0, -3) + 'wen' :
    (output.indexOf('DIS') !== -1) ?
    time.slice(0, -3) + 'ben' :
    time + ' ret';
    return time;
}

function translate(number, withoutSuffix, string, isFuture) {
    var numberNoun = numberAsNoun(number);
    switch (string) {
        case 'mm':
            return numberNoun + ' tup';
        case 'hh':
            return numberNoun + ' rep';
        case 'dd':
            return numberNoun + ' jaj';
        case 'MM':
            return numberNoun + ' jar';
        case 'yy':
            return numberNoun + ' DIS';
    }
}

function numberAsNoun(number) {
    var hundred = Math.floor((number % 1000) / 100),
    ten = Math.floor((number % 100) / 10),
    one = number % 10,
    word = '';
    if (hundred > 0) {
        word += numbersNouns[hundred] + 'vatlh';
    }
    if (ten > 0) {
        word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
    }
    if (one > 0) {
        word += ((word !== '') ? ' ' : '') + numbersNouns[one];
    }
    return (word === '') ? 'pagh' : word;
}

var tlh = moment.defineLocale('tlh', {
    months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
    monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
    monthsParseExact : true,
    weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[DaHjaj] LT',
        nextDay: '[wa’leS] LT',
        nextWeek: 'LLL',
        lastDay: '[wa’Hu’] LT',
        lastWeek: 'LLL',
        sameElse: 'L'
    },
    relativeTime : {
        future : translateFuture,
        past : translatePast,
        s : 'puS lup',
        m : 'wa’ tup',
        mm : translate,
        h : 'wa’ rep',
        hh : translate,
        d : 'wa’ jaj',
        dd : translate,
        M : 'wa’ jar',
        MM : translate,
        y : 'wa’ DIS',
        yy : translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return tlh;

})));


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Turkish [tr]
//! authors : Erhan Gundogan : https://github.com/erhangundogan,
//!           Burak Yiğit Kaya: https://github.com/BYK

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var suffixes = {
    1: '\'inci',
    5: '\'inci',
    8: '\'inci',
    70: '\'inci',
    80: '\'inci',
    2: '\'nci',
    7: '\'nci',
    20: '\'nci',
    50: '\'nci',
    3: '\'üncü',
    4: '\'üncü',
    100: '\'üncü',
    6: '\'ncı',
    9: '\'uncu',
    10: '\'uncu',
    30: '\'uncu',
    60: '\'ıncı',
    90: '\'ıncı'
};

var tr = moment.defineLocale('tr', {
    months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
    monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
    weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
    weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
    weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[bugün saat] LT',
        nextDay : '[yarın saat] LT',
        nextWeek : '[haftaya] dddd [saat] LT',
        lastDay : '[dün] LT',
        lastWeek : '[geçen hafta] dddd [saat] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s sonra',
        past : '%s önce',
        s : 'birkaç saniye',
        m : 'bir dakika',
        mm : '%d dakika',
        h : 'bir saat',
        hh : '%d saat',
        d : 'bir gün',
        dd : '%d gün',
        M : 'bir ay',
        MM : '%d ay',
        y : 'bir yıl',
        yy : '%d yıl'
    },
    dayOfMonthOrdinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
    ordinal : function (number) {
        if (number === 0) {  // special case for zero
            return number + '\'ıncı';
        }
        var a = number % 10,
            b = number % 100 - a,
            c = number >= 100 ? 100 : null;
        return number + (suffixes[a] || suffixes[b] || suffixes[c]);
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return tr;

})));


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Talossan [tzl]
//! author : Robin van der Vliet : https://github.com/robin0van0der0v
//! author : Iustì Canun

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


// After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
// This is currently too difficult (maybe even impossible) to add.
var tzl = moment.defineLocale('tzl', {
    months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
    weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
    weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
    weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
    longDateFormat : {
        LT : 'HH.mm',
        LTS : 'HH.mm.ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM [dallas] YYYY',
        LLL : 'D. MMMM [dallas] YYYY HH.mm',
        LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
    },
    meridiemParse: /d\'o|d\'a/i,
    isPM : function (input) {
        return 'd\'o' === input.toLowerCase();
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'd\'o' : 'D\'O';
        } else {
            return isLower ? 'd\'a' : 'D\'A';
        }
    },
    calendar : {
        sameDay : '[oxhi à] LT',
        nextDay : '[demà à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[ieiri à] LT',
        lastWeek : '[sür el] dddd [lasteu à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'osprei %s',
        past : 'ja%s',
        s : processRelativeTime,
        m : processRelativeTime,
        mm : processRelativeTime,
        h : processRelativeTime,
        hh : processRelativeTime,
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        's': ['viensas secunds', '\'iensas secunds'],
        'm': ['\'n míut', '\'iens míut'],
        'mm': [number + ' míuts', '' + number + ' míuts'],
        'h': ['\'n þora', '\'iensa þora'],
        'hh': [number + ' þoras', '' + number + ' þoras'],
        'd': ['\'n ziua', '\'iensa ziua'],
        'dd': [number + ' ziuas', '' + number + ' ziuas'],
        'M': ['\'n mes', '\'iens mes'],
        'MM': [number + ' mesen', '' + number + ' mesen'],
        'y': ['\'n ar', '\'iens ar'],
        'yy': [number + ' ars', '' + number + ' ars']
    };
    return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
}

return tzl;

})));


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Central Atlas Tamazight Latin [tzm-latn]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var tzmLatn = moment.defineLocale('tzm-latn', {
    months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
    monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
    weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[asdkh g] LT',
        nextDay: '[aska g] LT',
        nextWeek: 'dddd [g] LT',
        lastDay: '[assant g] LT',
        lastWeek: 'dddd [g] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'dadkh s yan %s',
        past : 'yan %s',
        s : 'imik',
        m : 'minuḍ',
        mm : '%d minuḍ',
        h : 'saɛa',
        hh : '%d tassaɛin',
        d : 'ass',
        dd : '%d ossan',
        M : 'ayowr',
        MM : '%d iyyirn',
        y : 'asgas',
        yy : '%d isgasn'
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return tzmLatn;

})));


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Central Atlas Tamazight [tzm]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var tzm = moment.defineLocale('tzm', {
    months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
    monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
    weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS: 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
        nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
        nextWeek: 'dddd [ⴴ] LT',
        lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
        lastWeek: 'dddd [ⴴ] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
        past : 'ⵢⴰⵏ %s',
        s : 'ⵉⵎⵉⴽ',
        m : 'ⵎⵉⵏⵓⴺ',
        mm : '%d ⵎⵉⵏⵓⴺ',
        h : 'ⵙⴰⵄⴰ',
        hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
        d : 'ⴰⵙⵙ',
        dd : '%d oⵙⵙⴰⵏ',
        M : 'ⴰⵢoⵓⵔ',
        MM : '%d ⵉⵢⵢⵉⵔⵏ',
        y : 'ⴰⵙⴳⴰⵙ',
        yy : '%d ⵉⵙⴳⴰⵙⵏ'
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});

return tzm;

})));


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Ukrainian [uk]
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elensúle : https://github.com/Oire

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
        'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
        'dd': 'день_дні_днів',
        'MM': 'місяць_місяці_місяців',
        'yy': 'рік_роки_років'
    };
    if (key === 'm') {
        return withoutSuffix ? 'хвилина' : 'хвилину';
    }
    else if (key === 'h') {
        return withoutSuffix ? 'година' : 'годину';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}
function weekdaysCaseReplace(m, format) {
    var weekdays = {
        'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
        'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
        'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
    };

    if (!m) {
        return weekdays['nominative'];
    }

    var nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
        'accusative' :
        ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
            'genitive' :
            'nominative');
    return weekdays[nounCase][m.day()];
}
function processHoursFunction(str) {
    return function () {
        return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
    };
}

var uk = moment.defineLocale('uk', {
    months : {
        'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
        'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
    },
    monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
    weekdays : weekdaysCaseReplace,
    weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY р.',
        LLL : 'D MMMM YYYY р., HH:mm',
        LLLL : 'dddd, D MMMM YYYY р., HH:mm'
    },
    calendar : {
        sameDay: processHoursFunction('[Сьогодні '),
        nextDay: processHoursFunction('[Завтра '),
        lastDay: processHoursFunction('[Вчора '),
        nextWeek: processHoursFunction('[У] dddd ['),
        lastWeek: function () {
            switch (this.day()) {
                case 0:
                case 3:
                case 5:
                case 6:
                    return processHoursFunction('[Минулої] dddd [').call(this);
                case 1:
                case 2:
                case 4:
                    return processHoursFunction('[Минулого] dddd [').call(this);
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'за %s',
        past : '%s тому',
        s : 'декілька секунд',
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : 'годину',
        hh : relativeTimeWithPlural,
        d : 'день',
        dd : relativeTimeWithPlural,
        M : 'місяць',
        MM : relativeTimeWithPlural,
        y : 'рік',
        yy : relativeTimeWithPlural
    },
    // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
    meridiemParse: /ночі|ранку|дня|вечора/,
    isPM: function (input) {
        return /^(дня|вечора)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ночі';
        } else if (hour < 12) {
            return 'ранку';
        } else if (hour < 17) {
            return 'дня';
        } else {
            return 'вечора';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
            case 'w':
            case 'W':
                return number + '-й';
            case 'D':
                return number + '-го';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return uk;

})));


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Urdu [ur]
//! author : Sawood Alam : https://github.com/ibnesayeed
//! author : Zack : https://github.com/ZackVision

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var months = [
    'جنوری',
    'فروری',
    'مارچ',
    'اپریل',
    'مئی',
    'جون',
    'جولائی',
    'اگست',
    'ستمبر',
    'اکتوبر',
    'نومبر',
    'دسمبر'
];
var days = [
    'اتوار',
    'پیر',
    'منگل',
    'بدھ',
    'جمعرات',
    'جمعہ',
    'ہفتہ'
];

var ur = moment.defineLocale('ur', {
    months : months,
    monthsShort : months,
    weekdays : days,
    weekdaysShort : days,
    weekdaysMin : days,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd، D MMMM YYYY HH:mm'
    },
    meridiemParse: /صبح|شام/,
    isPM : function (input) {
        return 'شام' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return 'صبح';
        }
        return 'شام';
    },
    calendar : {
        sameDay : '[آج بوقت] LT',
        nextDay : '[کل بوقت] LT',
        nextWeek : 'dddd [بوقت] LT',
        lastDay : '[گذشتہ روز بوقت] LT',
        lastWeek : '[گذشتہ] dddd [بوقت] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s بعد',
        past : '%s قبل',
        s : 'چند سیکنڈ',
        m : 'ایک منٹ',
        mm : '%d منٹ',
        h : 'ایک گھنٹہ',
        hh : '%d گھنٹے',
        d : 'ایک دن',
        dd : '%d دن',
        M : 'ایک ماہ',
        MM : '%d ماہ',
        y : 'ایک سال',
        yy : '%d سال'
    },
    preparse: function (string) {
        return string.replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/,/g, '،');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return ur;

})));


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Uzbek Latin [uz-latn]
//! author : Rasulbek Mirzayev : github.com/Rasulbeeek

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var uzLatn = moment.defineLocale('uz-latn', {
    months : 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
    monthsShort : 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
    weekdays : 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
    weekdaysShort : 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
    weekdaysMin : 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'D MMMM YYYY, dddd HH:mm'
    },
    calendar : {
        sameDay : '[Bugun soat] LT [da]',
        nextDay : '[Ertaga] LT [da]',
        nextWeek : 'dddd [kuni soat] LT [da]',
        lastDay : '[Kecha soat] LT [da]',
        lastWeek : '[O\'tgan] dddd [kuni soat] LT [da]',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'Yaqin %s ichida',
        past : 'Bir necha %s oldin',
        s : 'soniya',
        m : 'bir daqiqa',
        mm : '%d daqiqa',
        h : 'bir soat',
        hh : '%d soat',
        d : 'bir kun',
        dd : '%d kun',
        M : 'bir oy',
        MM : '%d oy',
        y : 'bir yil',
        yy : '%d yil'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return uzLatn;

})));


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Uzbek [uz]
//! author : Sardor Muminov : https://github.com/muminoff

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var uz = moment.defineLocale('uz', {
    months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
    monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
    weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
    weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
    weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'D MMMM YYYY, dddd HH:mm'
    },
    calendar : {
        sameDay : '[Бугун соат] LT [да]',
        nextDay : '[Эртага] LT [да]',
        nextWeek : 'dddd [куни соат] LT [да]',
        lastDay : '[Кеча соат] LT [да]',
        lastWeek : '[Утган] dddd [куни соат] LT [да]',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'Якин %s ичида',
        past : 'Бир неча %s олдин',
        s : 'фурсат',
        m : 'бир дакика',
        mm : '%d дакика',
        h : 'бир соат',
        hh : '%d соат',
        d : 'бир кун',
        dd : '%d кун',
        M : 'бир ой',
        MM : '%d ой',
        y : 'бир йил',
        yy : '%d йил'
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 4th is the first week of the year.
    }
});

return uz;

})));


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Vietnamese [vi]
//! author : Bang Nguyen : https://github.com/bangnk

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var vi = moment.defineLocale('vi', {
    months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
    monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
    monthsParseExact : true,
    weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
    weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysParseExact : true,
    meridiemParse: /sa|ch/i,
    isPM : function (input) {
        return /^ch$/i.test(input);
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 12) {
            return isLower ? 'sa' : 'SA';
        } else {
            return isLower ? 'ch' : 'CH';
        }
    },
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM [năm] YYYY',
        LLL : 'D MMMM [năm] YYYY HH:mm',
        LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
        l : 'DD/M/YYYY',
        ll : 'D MMM YYYY',
        lll : 'D MMM YYYY HH:mm',
        llll : 'ddd, D MMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Hôm nay lúc] LT',
        nextDay: '[Ngày mai lúc] LT',
        nextWeek: 'dddd [tuần tới lúc] LT',
        lastDay: '[Hôm qua lúc] LT',
        lastWeek: 'dddd [tuần rồi lúc] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s tới',
        past : '%s trước',
        s : 'vài giây',
        m : 'một phút',
        mm : '%d phút',
        h : 'một giờ',
        hh : '%d giờ',
        d : 'một ngày',
        dd : '%d ngày',
        M : 'một tháng',
        MM : '%d tháng',
        y : 'một năm',
        yy : '%d năm'
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal : function (number) {
        return number;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return vi;

})));


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Pseudo [x-pseudo]
//! author : Andrew Hood : https://github.com/andrewhood125

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var xPseudo = moment.defineLocale('x-pseudo', {
    months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
    monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
    monthsParseExact : true,
    weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
    weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
    weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd, D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[T~ódá~ý át] LT',
        nextDay : '[T~ómó~rró~w át] LT',
        nextWeek : 'dddd [át] LT',
        lastDay : '[Ý~ést~érdá~ý át] LT',
        lastWeek : '[L~ást] dddd [át] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'í~ñ %s',
        past : '%s á~gó',
        s : 'á ~féw ~sécó~ñds',
        m : 'á ~míñ~úté',
        mm : '%d m~íñú~tés',
        h : 'á~ñ hó~úr',
        hh : '%d h~óúrs',
        d : 'á ~dáý',
        dd : '%d d~áýs',
        M : 'á ~móñ~th',
        MM : '%d m~óñt~hs',
        y : 'á ~ýéár',
        yy : '%d ý~éárs'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return xPseudo;

})));


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Yoruba Nigeria [yo]
//! author : Atolagbe Abisoye : https://github.com/andela-batolagbe

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var yo = moment.defineLocale('yo', {
    months : 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
    monthsShort : 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
    weekdays : 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
    weekdaysShort : 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
    weekdaysMin : 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Ònì ni] LT',
        nextDay : '[Ọ̀la ni] LT',
        nextWeek : 'dddd [Ọsẹ̀ tón\'bọ] [ni] LT',
        lastDay : '[Àna ni] LT',
        lastWeek : 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'ní %s',
        past : '%s kọjá',
        s : 'ìsẹjú aayá die',
        m : 'ìsẹjú kan',
        mm : 'ìsẹjú %d',
        h : 'wákati kan',
        hh : 'wákati %d',
        d : 'ọjọ́ kan',
        dd : 'ọjọ́ %d',
        M : 'osù kan',
        MM : 'osù %d',
        y : 'ọdún kan',
        yy : 'ọdún %d'
    },
    dayOfMonthOrdinalParse : /ọjọ́\s\d{1,2}/,
    ordinal : 'ọjọ́ %d',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4 // The week that contains Jan 4th is the first week of the year.
    }
});

return yo;

})));


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var zhCn = moment.defineLocale('zh-cn', {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY年MMMD日',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日Ah点mm分',
        LLLL : 'YYYY年MMMD日ddddAh点mm分',
        l : 'YYYY年MMMD日',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日 HH:mm',
        llll : 'YYYY年MMMD日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
                meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime : {
        future : '%s内',
        past : '%s前',
        s : '几秒',
        m : '1 分钟',
        mm : '%d 分钟',
        h : '1 小时',
        hh : '%d 小时',
        d : '1 天',
        dd : '%d 天',
        M : '1 个月',
        MM : '%d 个月',
        y : '1 年',
        yy : '%d 年'
    },
    week : {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return zhCn;

})));


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (Hong Kong) [zh-hk]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris
//! author : Konstantin : https://github.com/skfd

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var zhHk = moment.defineLocale('zh-hk', {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY年MMMD日',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日 HH:mm',
        LLLL : 'YYYY年MMMD日dddd HH:mm',
        l : 'YYYY年MMMD日',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日 HH:mm',
        llll : 'YYYY年MMMD日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
            return hour;
        } else if (meridiem === '中午') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd' :
            case 'D' :
            case 'DDD' :
                return number + '日';
            case 'M' :
                return number + '月';
            case 'w' :
            case 'W' :
                return number + '週';
            default :
                return number;
        }
    },
    relativeTime : {
        future : '%s內',
        past : '%s前',
        s : '幾秒',
        m : '1 分鐘',
        mm : '%d 分鐘',
        h : '1 小時',
        hh : '%d 小時',
        d : '1 天',
        dd : '%d 天',
        M : '1 個月',
        MM : '%d 個月',
        y : '1 年',
        yy : '%d 年'
    }
});

return zhHk;

})));


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration
//! locale : Chinese (Taiwan) [zh-tw]
//! author : Ben : https://github.com/ben-lin
//! author : Chris Lam : https://github.com/hehachris

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var zhTw = moment.defineLocale('zh-tw', {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY年MMMD日',
        LL : 'YYYY年MMMD日',
        LLL : 'YYYY年MMMD日 HH:mm',
        LLLL : 'YYYY年MMMD日dddd HH:mm',
        l : 'YYYY年MMMD日',
        ll : 'YYYY年MMMD日',
        lll : 'YYYY年MMMD日 HH:mm',
        llll : 'YYYY年MMMD日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
            return hour;
        } else if (meridiem === '中午') {
            return hour >= 11 ? hour : hour + 12;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd' :
            case 'D' :
            case 'DDD' :
                return number + '日';
            case 'M' :
                return number + '月';
            case 'w' :
            case 'W' :
                return number + '週';
            default :
                return number;
        }
    },
    relativeTime : {
        future : '%s內',
        past : '%s前',
        s : '幾秒',
        m : '1 分鐘',
        mm : '%d 分鐘',
        h : '1 小時',
        hh : '%d 小時',
        d : '1 天',
        dd : '%d 天',
        M : '1 個月',
        MM : '%d 個月',
        y : '1 年',
        yy : '%d 年'
    }
});

return zhTw;

})));


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(120).Buffer))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _webtraderCharts = __webpack_require__(117);

var _webtraderCharts2 = _interopRequireDefault(_webtraderCharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_webtraderCharts2.default.init({
   appId: 11,
   lang: 'en', // default is 'en'
   server: 'wss://ws.binaryws.com/websockets/v3'
});

var $parent = (0, _jquery2.default)('#container');

var chart = _webtraderCharts2.default.chartWindow.addNewChart($parent, {
   "instrumentCode": "R_100",
   "instrumentName": "Volatility index 100",
   "showInstrumentName": true,
   "timePeriod": "1m",
   "type": "candlestick",
   "indicators": [],
   "overlays": []
});
var chart2 = _webtraderCharts2.default.chartWindow.addNewChart((0, _jquery2.default)('#container3'), {
   "instrumentCode": binarytool_symbol,
   "instrumentName": "Volatility index " + binarytool_symbol,
   "showInstrumentName": true,
   "timePeriod": "1t",
   "type": "line",
   "start": binarytool_start,
   "indicators": [
//   {
//	   "id": "rsi",
//	   "name": "Relative Strength Index",
//	   "options": {
//             "period": 14,
//             "strokeWidth": 1,
//             "dashStyle": "Solid"
//       }
//   },
   {
	   "id": "macd",
	   "name": "MACD",
	   "options": {
		    "fastMaType": "EMA",
		    "slowMaType": "EMA",
		    "signalMaType": "EMA",
		    "fastPeriod": 12,
			"slowPeriod": 26,
			"signalPeriod": 9,
             "strokeWidth": 1,
             "dashStyle": "Solid"
       }
   },{
	   "id": "ema",
	   "name": "EMA 50",
	   "options": {
			"period": 50,
             "strokeWidth": 1,
             "dashStyle": "Solid"
       }
   },{
	   "id": "ema",
	   "name": "EMA 200",
	   "options": {
			"period": 200,
             "strokeWidth": 2,
             "dashStyle": "Solid"
       }
   }	
//   {
//	   "id": "dc",
//	   "name": "Donchian Channel",
//	   "options": {
//			"period": 21,
//             "strokeWidth": 1,
//             "dashStyle": "Solid"
//       }
//   }
   ],
   "overlays": [],
   "delayAmount": 1,
   // "useUTC": false,
   // "timezoneOffset": "-6",
});

// chart.events.anyChange = () => console.log(chart.data());
// chart2.events.anyChange = () => console.log(chart.data()); 

// This is a test for a timing issue in need to fix.
var run_timing_issue_test = function run_timing_issue_test() {
   var configs = [{
      "type": "line",
      "timePeriod": "1m",
      "instrumentCode": "RDBULL",
      "instrumentName": "Bull Market Index",
      "showInstrumentName": true, // default is false
      "showOverlays": false, // default is true
      "indicators": [{
         "id": "cks",
         "name": "Chande Kroll Stop",
         "options": {
            "period": 10, "maxMinPeriod": 20,
            "multiplier": 3, "longStopStroke": "#00C176",
            "shortStopStroke": "#FF003C", "strokeWidth": 1,
            "dashStyle": "Solid"
         }
      }]
   }, {
      "instrumentCode": "GDAXI",
      "instrumentName": "German Index",
      "timePeriod": "1d",
      "type": "candlestick",
      "indicators": [],
      "overlays": []
   }];

   var chart = null;
   var rerender = function rerender() {
      chart && chart.actions.destroy();
      var config = configs[Math.random() > 0.5 ? 1 : 0];
      chart = _webtraderCharts2.default.chartWindow.addNewChart($parent, config);
      var timeout = Math.random() * 2500;
      console.log(timeout | 0);
      if (!window.stop_test) setTimeout(rerender, timeout | 0);
   };
   rerender();
};
// run_timing_issue_test();

var run_display_results_test = function run_display_results_test() {
   var add_stuff_to_chart = function add_stuff_to_chart(epoch, quote, chart) {
      var rand = Math.random();
      if (rand < .1) chart.draw.startTime(epoch * 1000);else if (rand < .2) chart.draw.entrySpot(epoch * 1000);else if (rand < .3) chart.draw.endTime(epoch * 1000);else if (rand < .4) chart.draw.exitSpot(epoch * 1000);else if (rand < .5) {
         chart.draw.barrier({ from: epoch * 1000, value: quote });
         setTimeout(function () {
            chart.draw.barrier({ from: epoch * 1000, to: (epoch + 30) * 1000, value: quote });
         }, 30 * 1000);
      }
   };
   _webtraderCharts2.default.liveapi.events.on('ohlc', function (e, data) {
      var epoch = data.ohlc.epoch * 1;
      var quote = data.ohlc.close * 1;
      if (data.ohlc.symbol === 'R_50') add_stuff_to_chart(epoch, quote, chart2);
   });
   _webtraderCharts2.default.liveapi.events.on('tick', function (e, data) {
      var epoch = data.tick.epoch * 1;
      var quote = data.tick.quote * 1;
      add_stuff_to_chart(epoch, quote, chart2);
   });
};

var last_epoch = 0;
var minMax = { max: 0, min: 1000 * 1000 };
_webtraderCharts2.default.liveapi.events.on('ohlc', function (e, data) {
   if (data.ohlc.symbol === 'R_50') {
      var quote = data.ohlc.close * 1;
      minMax.max = Math.max(minMax.max, quote);
      minMax.min = Math.min(minMax.min, quote);
   }
   last_epoch = data.ohlc.epoch * 1;
});
_webtraderCharts2.default.liveapi.events.on('tick', function (e, data) {
   if (data.tick.symbol === 'R_50') {
      var quote = data.tick.quote * 1;
      minMax.max = Math.max(minMax.max, quote);
      minMax.min = Math.min(minMax.min, quote);
   }
   last_epoch = data.tick.epoch * 1;
});

var btns = (0, _jquery2.default)('#container3 .display-results-buttons').hide();
var barrier_confs = [];
btns.find('.start-time').on('click', function () {
   var epoch = last_epoch * 1000;
   var value = minMax.min + Math.random() * (minMax.max - minMax.min);
   // chart2.draw.startTime(epoch);
   console.log(binarytool_buytime * 1000);
   // chart2.draw.startTime(binarytool_buytime * 1000);
   var conf = { from: epoch - 1000 * 2, to: null, value: value.toFixed(4) * 1 };
   // barrier_confs.push(conf);
   // chart2.draw.barrier(conf);
});
btns.find('.end-time').on('click', function () {
   var epoch = last_epoch * 1000;
   chart2.draw.endTime(epoch);
   barrier_confs.forEach(function (conf) {
      conf.to = epoch + 1000 * 2;
      chart2.draw.barrier(conf);
   });
   barrier_confs = [];
});
btns.find('.entry-spot').on('click', function () {
   var epoch = last_epoch * 1000;
   chart2.draw.entrySpot(epoch);
});
btns.find('.exit-spot').on('click', function () {
   var epoch = last_epoch * 1000;
   // chart2.draw.exitSpot(epoch);
   console.log(binarytool_selltime * 1000);
   chart2.draw.exitSpot(binarytool_selltime * 1000);
});

btns.find('.start-time').click();
chart2.draw.startTime(binarytool_buytime*1000);
chart2.draw.entrySpot(binarytool_buytime*1000);
chart2.draw.endTime(binarytool_selltime*1000);
chart2.draw.exitSpot(binarytool_selltime*1000);

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(119)
var ieee754 = __webpack_require__(125)
var isArray = __webpack_require__(126)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(128)))

/***/ }),
/* 121 */
/***/ (function(module, exports) {

/*
 Highcharts JS v5.0.10 (2017-03-31)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(y){"object"===typeof module&&module.exports?module.exports=y:y(Highcharts)})(function(y){(function(a){function p(a,b){this.init(a,b)}var r=a.CenteredSeriesMixin,v=a.each,m=a.extend,k=a.merge,h=a.splat;m(p.prototype,{coll:"pane",init:function(a,b){this.chart=b;this.background=[];b.pane.push(this);this.setOptions(a)},setOptions:function(a){this.options=k(this.defaultOptions,this.chart.angular?{background:{}}:void 0,a)},render:function(){var a=this.options,b=this.options.background,d=this.chart.renderer;
this.group||(this.group=d.g("pane-group").attr({zIndex:a.zIndex||0}).add());this.updateCenter();if(b)for(b=h(b),a=Math.max(b.length,this.background.length||0),d=0;d<a;d++)b[d]?this.renderBackground(k(this.defaultBackgroundOptions,b[d]),d):this.background[d]&&(this.background[d]=this.background[d].destroy(),this.background.splice(d,1))},renderBackground:function(a,b){var d="animate";this.background[b]||(this.background[b]=this.chart.renderer.path().add(this.group),d="attr");this.background[b][d]({d:this.axis.getPlotBandPath(a.from,
a.to,a)}).attr({fill:a.backgroundColor,stroke:a.borderColor,"stroke-width":a.borderWidth,"class":"highcharts-pane "+(a.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(a){this.center=(a||this.axis||{}).center=
r.getCenter.call(this)},update:function(a,b){k(!0,this.options,a);this.setOptions(this.options);this.render();v(this.chart.axes,function(d){d.pane===this&&(d.pane=null,d.update({},b))},this)}});a.Pane=p})(y);(function(a){var p=a.each,r=a.extend,v=a.map,m=a.merge,k=a.noop,h=a.pick,t=a.pInt,b=a.wrap,d,e,g=a.Axis.prototype;a=a.Tick.prototype;d={getOffset:k,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:k,setCategories:k,setTitle:k};e={defaultRadialGaugeOptions:{labels:{align:"center",
x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(c){c=
this.options=m(this.defaultOptions,this.defaultRadialOptions,c);c.plotBands||(c.plotBands=[])},getOffset:function(){g.getOffset.call(this);this.chart.axisOffset[this.side]=0},getLinePath:function(c,b){c=this.center;var d=this.chart,f=h(b,c[2]/2-this.offset);this.isCircular||void 0!==b?b=this.chart.renderer.symbols.arc(this.left+c[0],this.top+c[1],f,f,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}):(b=this.postTranslate(this.angleRad,f),b=["M",c[0]+d.plotLeft,c[1]+d.plotTop,"L",b.x,
b.y]);return b},setAxisTranslation:function(){g.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===h(this.userMax,this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||
0},setAxisSize:function(){g.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*h(this.sector,1)/2)},getPosition:function(c,b){return this.postTranslate(this.isCircular?this.translate(c):this.angleRad,h(this.isCircular?b:this.translate(c),this.center[2]/2)-this.offset)},postTranslate:function(c,b){var d=this.chart,f=this.center;c=this.startAngleRad+c;return{x:d.plotLeft+
f[0]+Math.cos(c)*b,y:d.plotTop+f[1]+Math.sin(c)*b}},getPlotBandPath:function(c,b,d){var f=this.center,n=this.startAngleRad,a=f[2]/2,e=[h(d.outerRadius,"100%"),d.innerRadius,h(d.thickness,10)],g=Math.min(this.offset,0),u=/%$/,k,m=this.isCircular;"polygon"===this.options.gridLineInterpolation?f=this.getPlotLinePath(c).concat(this.getPlotLinePath(b,!0)):(c=Math.max(c,this.min),b=Math.min(b,this.max),m||(e[0]=this.translate(c),e[1]=this.translate(b)),e=v(e,function(c){u.test(c)&&(c=t(c,10)*a/100);return c}),
"circle"!==d.shape&&m?(c=n+this.translate(c),b=n+this.translate(b)):(c=-Math.PI/2,b=1.5*Math.PI,k=!0),e[0]-=g,e[2]-=g,f=this.chart.renderer.symbols.arc(this.left+f[0],this.top+f[1],e[0],e[0],{start:Math.min(c,b),end:Math.max(c,b),innerR:h(e[1],e[0]-e[2]),open:k}));return f},getPlotLinePath:function(c,b){var d=this,f=d.center,e=d.chart,a=d.getPosition(c),g,t,h;d.isCircular?h=["M",f[0]+e.plotLeft,f[1]+e.plotTop,"L",a.x,a.y]:"circle"===d.options.gridLineInterpolation?(c=d.translate(c))&&(h=d.getLinePath(0,
c)):(p(e.xAxis,function(c){c.pane===d.pane&&(g=c)}),h=[],c=d.translate(c),f=g.tickPositions,g.autoConnect&&(f=f.concat([f[0]])),b&&(f=[].concat(f).reverse()),p(f,function(b,d){t=g.getPosition(b,c);h.push(d?"L":"M",t.x,t.y)}));return h},getTitlePosition:function(){var c=this.center,b=this.chart,d=this.options.title;return{x:b.plotLeft+c[0]+(d.x||0),y:b.plotTop+c[1]-{high:.5,middle:.25,low:0}[d.align]*c[2]+(d.y||0)}}};b(g,"init",function(c,b,a){var f=b.angular,n=b.polar,g=a.isX,t=f&&g,x,k=b.options,
p=this.pane=b.pane[a.pane||0],z=p.options;if(f){if(r(this,t?d:e),x=!g)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else n&&(r(this,e),this.defaultRadialOptions=(x=g)?this.defaultRadialXOptions:m(this.defaultYAxisOptions,this.defaultRadialYOptions));f||n?(this.isRadial=!0,b.inverted=!1,k.chart.zoomType=null):this.isRadial=!1;x&&(p.axis=this);c.call(this,b,a);t||!f&&!n||(c=this.options,this.angleRad=(c.angle||0)*Math.PI/180,this.startAngleRad=(z.startAngle-90)*Math.PI/180,this.endAngleRad=
(h(z.endAngle,z.startAngle+360)-90)*Math.PI/180,this.offset=c.offset||0,this.isCircular=x)});b(g,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,1))});b(a,"getPosition",function(b,d,e,a,l){var c=this.axis;return c.getPosition?c.getPosition(e):b.call(this,d,e,a,l)});b(a,"getLabelPosition",function(b,d,e,a,l,g,t,k,u){var c=this.axis,f=g.y,n=20,q=g.align,w=(c.translate(this.pos)+c.startAngleRad+Math.PI/2)/Math.PI*180%360;c.isRadial?(b=c.getPosition(this.pos,
c.center[2]/2+h(g.distance,-25)),"auto"===g.rotation?a.attr({rotation:w}):null===f&&(f=c.chart.renderer.fontMetrics(a.styles.fontSize).b-a.getBBox().height/2),null===q&&(c.isCircular?(this.label.getBBox().width>c.len*c.tickInterval/(c.max-c.min)&&(n=0),q=w>n&&w<180-n?"left":w>180+n&&w<360-n?"right":"center"):q="center",a.attr({align:q})),b.x+=g.x,b.y+=f):b=b.call(this,d,e,a,l,g,t,k,u);return b});b(a,"getMarkPath",function(b,d,e,a,l,g,t){var c=this.axis;c.isRadial?(b=c.getPosition(this.pos,c.center[2]/
2+a),d=["M",d,e,"L",b.x,b.y]):d=b.call(this,d,e,a,l,g,t);return d})})(y);(function(a){var p=a.each,r=a.noop,v=a.pick,m=a.Series,k=a.seriesType,h=a.seriesTypes;k("arearange","area",{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:!1}}},
{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(a){return[a.low,a.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(a){var b=this.chart,d=this.xAxis.postTranslate(a.rectPlotX,this.yAxis.len-a.plotHigh);a.plotHighX=d.x-b.plotLeft;a.plotHigh=d.y-b.plotTop},translate:function(){var a=this,b=a.yAxis,d=!!a.modifyValue;h.area.prototype.translate.apply(a);p(a.points,function(e){var g=e.low,c=e.high,f=e.plotY;null===c||null===g?e.isNull=!0:
(e.plotLow=f,e.plotHigh=b.translate(d?a.modifyValue(c,e):c,0,1,0,1),d&&(e.yBottom=e.plotHigh))});this.chart.polar&&p(this.points,function(b){a.highToXY(b)})},getGraphPath:function(a){var b=[],d=[],e,g=h.area.prototype.getGraphPath,c,f,n;n=this.options;var w=this.chart.polar&&!1!==n.connectEnds,l=n.step;a=a||this.points;for(e=a.length;e--;)c=a[e],c.isNull||w||a[e+1]&&!a[e+1].isNull||d.push({plotX:c.plotX,plotY:c.plotY,doCurve:!1}),f={polarPlotY:c.polarPlotY,rectPlotX:c.rectPlotX,yBottom:c.yBottom,
plotX:v(c.plotHighX,c.plotX),plotY:c.plotHigh,isNull:c.isNull},d.push(f),b.push(f),c.isNull||w||a[e-1]&&!a[e-1].isNull||d.push({plotX:c.plotX,plotY:c.plotY,doCurve:!1});a=g.call(this,a);l&&(!0===l&&(l="left"),n.step={left:"right",center:"center",right:"left"}[l]);b=g.call(this,b);d=g.call(this,d);n.step=l;n=[].concat(a,b);this.chart.polar||"M"!==d[0]||(d[0]="L");this.graphPath=n;this.areaPath=this.areaPath.concat(a,d);n.isArea=!0;n.xMap=a.xMap;this.areaPath.xMap=a.xMap;return n},drawDataLabels:function(){var a=
this.data,b=a.length,d,e=[],g=m.prototype,c=this.options.dataLabels,f=c.align,n=c.verticalAlign,w=c.inside,l,q,h=this.chart.inverted;if(c.enabled||this._hasPointLabels){for(d=b;d--;)if(l=a[d])q=w?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.y=l.high,l._plotY=l.plotY,l.plotY=l.plotHigh,e[d]=l.dataLabel,l.dataLabel=l.dataLabelUpper,l.below=q,h?f||(c.align=q?"right":"left"):n||(c.verticalAlign=q?"top":"bottom"),c.x=c.xHigh,c.y=c.yHigh;g.drawDataLabels&&g.drawDataLabels.apply(this,arguments);for(d=b;d--;)if(l=
a[d])q=w?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.dataLabelUpper=l.dataLabel,l.dataLabel=e[d],l.y=l.low,l.plotY=l._plotY,l.below=!q,h?f||(c.align=q?"left":"right"):n||(c.verticalAlign=q?"bottom":"top"),c.x=c.xLow,c.y=c.yLow;g.drawDataLabels&&g.drawDataLabels.apply(this,arguments)}c.align=f;c.verticalAlign=n},alignDataLabel:function(){h.column.prototype.alignDataLabel.apply(this,arguments)},setStackedPoints:r,getSymbol:r,drawPoints:r})})(y);(function(a){var p=a.seriesType;p("areasplinerange","arearange",
null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(y);(function(a){var p=a.defaultPlotOptions,r=a.each,v=a.merge,m=a.noop,k=a.pick,h=a.seriesType,t=a.seriesTypes.column.prototype;h("columnrange","arearange",v(p.column,p.arearange,{lineWidth:1,pointRange:null}),{translate:function(){var b=this,d=b.yAxis,a=b.xAxis,g=a.startAngleRad,c,f=b.chart,n=b.xAxis.isRadial,w;t.translate.apply(b);r(b.points,function(e){var l=e.shapeArgs,h=b.options.minPointLength,x,u;e.plotHigh=w=d.translate(e.high,
0,1,0,1);e.plotLow=e.plotY;u=w;x=k(e.rectPlotY,e.plotY)-w;Math.abs(x)<h?(h-=x,x+=h,u-=h/2):0>x&&(x*=-1,u-=x);n?(c=e.barX+g,e.shapeType="path",e.shapeArgs={d:b.polarArc(u+x,u,c,c+e.pointWidth)}):(l.height=x,l.y=u,e.tooltipPos=f.inverted?[d.len+d.pos-f.plotLeft-u-x/2,a.len+a.pos-f.plotTop-l.x-l.width/2,x]:[a.left-f.plotLeft+l.x+l.width/2,d.pos-f.plotTop+u+x/2,x])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:m,crispCol:t.crispCol,drawPoints:t.drawPoints,drawTracker:t.drawTracker,
getColumnMetrics:t.getColumnMetrics,animate:function(){return t.animate.apply(this,arguments)},polarArc:function(){return t.polarArc.apply(this,arguments)},pointAttribs:t.pointAttribs})})(y);(function(a){var p=a.each,r=a.isNumber,v=a.merge,m=a.pick,k=a.pInt,h=a.Series,t=a.seriesType,b=a.TrackerMixin;t("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},
{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var b=this.yAxis,a=this.options,g=b.center;this.generatePoints();p(this.points,function(c){var d=v(a.dial,c.dial),e=k(m(d.radius,80))*g[2]/200,w=k(m(d.baseLength,70))*e/100,l=k(m(d.rearLength,10))*e/100,q=d.baseWidth||3,h=d.topWidth||1,x=a.overshoot,u=b.startAngleRad+b.translate(c.y,null,null,null,!0);r(x)?(x=x/180*Math.PI,u=Math.max(b.startAngleRad-
x,Math.min(b.endAngleRad+x,u))):!1===a.wrap&&(u=Math.max(b.startAngleRad,Math.min(b.endAngleRad,u)));u=180*u/Math.PI;c.shapeType="path";c.shapeArgs={d:d.path||["M",-l,-q/2,"L",w,-q/2,e,-h/2,e,h/2,w,q/2,-l,q/2,"z"],translateX:g[0],translateY:g[1],rotation:u};c.plotX=g[0];c.plotY=g[1]})},drawPoints:function(){var b=this,a=b.yAxis.center,g=b.pivot,c=b.options,f=c.pivot,n=b.chart.renderer;p(b.points,function(d){var a=d.graphic,f=d.shapeArgs,e=f.d,g=v(c.dial,d.dial);a?(a.animate(f),f.d=e):(d.graphic=n[d.shapeType](f).attr({rotation:f.rotation,
zIndex:1}).addClass("highcharts-dial").add(b.group),d.graphic.attr({stroke:g.borderColor||"none","stroke-width":g.borderWidth||0,fill:g.backgroundColor||"#000000"}))});g?g.animate({translateX:a[0],translateY:a[1]}):(b.pivot=n.circle(0,0,m(f.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(a[0],a[1]).add(b.group),b.pivot.attr({"stroke-width":f.borderWidth||0,stroke:f.borderColor||"#cccccc",fill:f.backgroundColor||"#000000"}))},animate:function(b){var d=this;b||(p(d.points,function(b){var c=
b.graphic;c&&(c.attr({rotation:180*d.yAxis.startAngleRad/Math.PI}),c.animate({rotation:b.shapeArgs.rotation},d.options.animation))}),d.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);h.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(b,a){h.prototype.setData.call(this,b,!1);this.processData();this.generatePoints();m(a,!0)&&this.chart.redraw()},drawTracker:b&&b.drawTrackerPoint},
{setState:function(b){this.state=b}})})(y);(function(a){var p=a.each,r=a.noop,v=a.pick,m=a.seriesType,k=a.seriesTypes;m("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,
medianWidth:2,states:{hover:{brightness:-.3}},whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",pointAttribs:function(a){var h=this.options,b=a&&a.color||this.color;return{fill:a.fillColor||h.fillColor||b,stroke:h.lineColor||b,"stroke-width":h.lineWidth||0}},drawDataLabels:r,translate:function(){var a=this.yAxis,m=this.pointArrayMap;k.column.prototype.translate.apply(this);p(this.points,function(b){p(m,
function(d){null!==b[d]&&(b[d+"Plot"]=a.translate(b[d],0,1,0,1))})})},drawPoints:function(){var a=this,k=a.options,b=a.chart.renderer,d,e,g,c,f,n,w=0,l,q,m,x,u=!1!==a.doQuartiles,r,z=a.options.whiskerLength;p(a.points,function(h){var A=h.graphic,p=A?"animate":"attr",t=h.shapeArgs,y={},D={},H={},I=h.color||a.color;void 0!==h.plotY&&(l=t.width,q=Math.floor(t.x),m=q+l,x=Math.round(l/2),d=Math.floor(u?h.q1Plot:h.lowPlot),e=Math.floor(u?h.q3Plot:h.lowPlot),g=Math.floor(h.highPlot),c=Math.floor(h.lowPlot),
A||(h.graphic=A=b.g("point").add(a.group),h.stem=b.path().addClass("highcharts-boxplot-stem").add(A),z&&(h.whiskers=b.path().addClass("highcharts-boxplot-whisker").add(A)),u&&(h.box=b.path(void 0).addClass("highcharts-boxplot-box").add(A)),h.medianShape=b.path(void 0).addClass("highcharts-boxplot-median").add(A)),y.stroke=h.stemColor||k.stemColor||I,y["stroke-width"]=v(h.stemWidth,k.stemWidth,k.lineWidth),y.dashstyle=h.stemDashStyle||k.stemDashStyle,h.stem.attr(y),z&&(D.stroke=h.whiskerColor||k.whiskerColor||
I,D["stroke-width"]=v(h.whiskerWidth,k.whiskerWidth,k.lineWidth),h.whiskers.attr(D)),u&&(A=a.pointAttribs(h),h.box.attr(A)),H.stroke=h.medianColor||k.medianColor||I,H["stroke-width"]=v(h.medianWidth,k.medianWidth,k.lineWidth),h.medianShape.attr(H),n=h.stem.strokeWidth()%2/2,w=q+x+n,h.stem[p]({d:["M",w,e,"L",w,g,"M",w,d,"L",w,c]}),u&&(n=h.box.strokeWidth()%2/2,d=Math.floor(d)+n,e=Math.floor(e)+n,q+=n,m+=n,h.box[p]({d:["M",q,e,"L",q,d,"L",m,d,"L",m,e,"L",q,e,"z"]})),z&&(n=h.whiskers.strokeWidth()%2/
2,g+=n,c+=n,r=/%$/.test(z)?x*parseFloat(z)/100:z/2,h.whiskers[p]({d:["M",w-r,g,"L",w+r,g,"M",w-r,c,"L",w+r,c]})),f=Math.round(h.medianPlot),n=h.medianShape.strokeWidth()%2/2,f+=n,h.medianShape[p]({d:["M",q,f,"L",m,f]}))})},setStackedPoints:r})})(y);(function(a){var p=a.each,r=a.noop,v=a.seriesType,m=a.seriesTypes;v("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:m.arearange?function(){var a=this.pointValKey;m.arearange.prototype.drawDataLabels.call(this);p(this.data,function(h){h.y=h[a]})}:r,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||m.column.prototype.getColumnMetrics.call(this)}})})(y);(function(a){var p=a.correctFloat,r=a.isNumber,v=a.pick,m=a.Point,k=a.Series,
h=a.seriesType,t=a.seriesTypes;h("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",translate:function(){var b=this.options,a=this.yAxis,e,g,c,f,n,h,l,q,k,m,u=v(b.minPointLength,5),r=u/2,z=b.threshold,y=b.stacking,B;t.column.prototype.translate.apply(this);q=k=z;g=this.points;e=0;for(b=g.length;e<b;e++)c=g[e],l=this.processedYData[e],f=c.shapeArgs,n=y&&a.stacks[(this.negStacks&&l<z?"-":
"")+this.stackKey],B=this.getStackIndicator(B,c.x,this.index),m=n?n[c.x].points[B.key]:[0,l],c.isSum?c.y=p(l):c.isIntermediateSum&&(c.y=p(l-k)),h=Math.max(q,q+c.y)+m[0],f.y=a.toPixels(h,!0),c.isSum?(f.y=a.toPixels(m[1],!0),f.height=Math.min(a.toPixels(m[0],!0),a.len)-f.y):c.isIntermediateSum?(f.y=a.toPixels(m[1],!0),f.height=Math.min(a.toPixels(k,!0),a.len)-f.y,k=m[1]):(f.height=0<l?a.toPixels(q,!0)-f.y:a.toPixels(q,!0)-a.toPixels(q-l,!0),q+=n&&n[c.x]?n[c.x].total:l),0>f.height&&(f.y+=f.height,f.height*=
-1),c.plotY=f.y=Math.round(f.y)-this.borderWidth%2/2,f.height=Math.max(Math.round(f.height),.001),c.yBottom=f.y+f.height,f.height<=u&&!c.isNull?(f.height=u,f.y-=r,c.plotY=f.y,c.minPointLengthOffset=0>c.y?-r:r):c.minPointLengthOffset=0,f=c.plotY+(c.negative?f.height:0),this.chart.inverted?c.tooltipPos[0]=a.len-f:c.tooltipPos[1]=f},processData:function(b){var a=this.yData,e=this.options.data,g,c=a.length,f,n,h,l,q,m;n=f=h=l=this.options.threshold||0;for(m=0;m<c;m++)q=a[m],g=e&&e[m]?e[m]:{},"sum"===
q||g.isSum?a[m]=p(n):"intermediateSum"===q||g.isIntermediateSum?a[m]=p(f):(n+=q,f+=q),h=Math.min(n,h),l=Math.max(n,l);k.prototype.processData.call(this,b);this.options.stacking||(this.dataMin=h,this.dataMax=l)},toYData:function(b){return b.isSum?0===b.x?null:"sum":b.isIntermediateSum?0===b.x?null:"intermediateSum":b.y},pointAttribs:function(b,a){var d=this.options.upColor;d&&!b.options.color&&(b.color=0<b.y?d:null);b=t.column.prototype.pointAttribs.call(this,b,a);delete b.dashstyle;return b},getGraphPath:function(){return["M",
0,0]},getCrispPath:function(){var b=this.data,a=b.length,e=this.graph.strokeWidth()+this.borderWidth,e=Math.round(e)%2/2,g=[],c,f,n;for(n=1;n<a;n++)f=b[n].shapeArgs,c=b[n-1].shapeArgs,f=["M",c.x+c.width,c.y+b[n-1].minPointLengthOffset+e,"L",f.x,c.y+b[n-1].minPointLengthOffset+e],0>b[n-1].y&&(f[2]+=c.height,f[5]+=c.height),g=g.concat(f);return g},drawGraph:function(){k.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){var b=this.options,a,e;k.prototype.setStackedPoints.apply(this,
arguments);a=this.stackedYData?this.stackedYData.length:0;for(e=1;e<a;e++)b.data[e].isSum||b.data[e].isIntermediateSum||(this.stackedYData[e]+=this.stackedYData[e-1])},getExtremes:function(){if(this.options.stacking)return k.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var b=m.prototype.getClassName.call(this);this.isSum?b+=" highcharts-sum":this.isIntermediateSum&&(b+=" highcharts-intermediate-sum");return b},isValid:function(){return r(this.y,!0)||this.isSum||this.isIntermediateSum}})})(y);
(function(a){var p=a.Series,r=a.seriesType,v=a.seriesTypes;r("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=p.prototype.getGraphPath.call(this),k=a.length+1;k--;)(k===a.length||"M"===a[k])&&0<k&&a.splice(k,0,"z");return this.areaPath=a},drawGraph:function(){this.options.fillColor=this.color;v.area.prototype.drawGraph.call(this)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,
drawTracker:p.prototype.drawTracker,setStackedPoints:a.noop})})(y);(function(a){var p=a.arrayMax,r=a.arrayMin,v=a.Axis,m=a.color,k=a.each,h=a.isNumber,t=a.noop,b=a.pick,d=a.pInt,e=a.Point,g=a.Series,c=a.seriesType,f=a.seriesTypes;c("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},
tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["markerGroup","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(a,c){var d=b(this.options.marker.fillOpacity,.5);a=g.prototype.pointAttribs.call(this,a,c);1!==d&&(a.fill=m(a.fill).setOpacity(d).get("rgba"));return a},getRadii:function(b,a,c,d){var f,e,g,n=this.zData,h=[],l=this.options,q=
"width"!==l.sizeBy,k=l.zThreshold,m=a-b;e=0;for(f=n.length;e<f;e++)g=n[e],l.sizeByAbsoluteValue&&null!==g&&(g=Math.abs(g-k),a=Math.max(a-k,Math.abs(b-k)),b=0),null===g?g=null:g<b?g=c/2-1:(g=0<m?(g-b)/m:.5,q&&0<=g&&(g=Math.sqrt(g)),g=Math.ceil(c+g*(d-c))/2),h.push(g);this.radii=h},animate:function(b){var a=this.options.animation;b||(k(this.points,function(b){var c=b.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:b.plotX,y:b.plotY,width:1,height:1}),c.animate(d,a))}),
this.animate=null)},translate:function(){var b,c=this.data,d,e,g=this.radii;f.scatter.prototype.translate.call(this);for(b=c.length;b--;)d=c[b],e=g?g[b]:0,h(e)&&e>=this.minPxSize/2?(d.marker=a.extend(d.marker,{radius:e,width:2*e,height:2*e}),d.dlBox={x:d.plotX-e,y:d.plotY-e,width:2*e,height:2*e}):d.shapeArgs=d.plotY=d.dlBox=void 0},alignDataLabel:f.column.prototype.alignDataLabel,buildKDTree:t,applyZones:t},{haloPath:function(b){return e.prototype.haloPath.call(this,0===b?0:(this.marker?this.marker.radius||
0:0)+b)},ttBelow:!1});v.prototype.beforePadding=function(){var a=this,c=this.len,f=this.chart,e=0,g=c,m=this.isXAxis,t=m?"xData":"yData",v=this.min,y={},J=Math.min(f.plotWidth,f.plotHeight),B=Number.MAX_VALUE,E=-Number.MAX_VALUE,F=this.max-v,C=c/F,G=[];k(this.series,function(c){var e=c.options;!c.bubblePadding||!c.visible&&f.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,G.push(c),m&&(k(["minSize","maxSize"],function(b){var a=e[b],c=/%$/.test(a),a=d(a);y[b]=c?J*a/100:a}),c.minPxSize=y.minSize,
c.maxPxSize=Math.max(y.maxSize,y.minSize),c=c.zData,c.length&&(B=b(e.zMin,Math.min(B,Math.max(r(c),!1===e.displayNegative?e.zThreshold:-Number.MAX_VALUE))),E=b(e.zMax,Math.max(E,p(c))))))});k(G,function(b){var c=b[t],d=c.length,f;m&&b.getRadii(B,E,b.minPxSize,b.maxPxSize);if(0<F)for(;d--;)h(c[d])&&a.dataMin<=c[d]&&c[d]<=a.dataMax&&(f=b.radii[d],e=Math.min((c[d]-v)*C-f,e),g=Math.max((c[d]-v)*C+f,g))});G.length&&0<F&&!this.isLog&&(g-=c,C*=(c+e-g)/c,k([["min","userMin",e],["max","userMax",g]],function(c){void 0===
b(a.options[c[0]],a[c[1]])&&(a[c[0]]+=c[2]/C)}))}})(y);(function(a){function p(b,a){var d=this.chart,g=this.options.animation,c=this.group,f=this.markerGroup,h=this.xAxis.center,k=d.plotLeft,l=d.plotTop;d.polar?d.renderer.isSVG&&(!0===g&&(g={}),a?(b={translateX:h[0]+k,translateY:h[1]+l,scaleX:.001,scaleY:.001},c.attr(b),f&&f.attr(b)):(b={translateX:k,translateY:l,scaleX:1,scaleY:1},c.animate(b,g),f&&f.animate(b,g),this.animate=null)):b.call(this,a)}var r=a.each,v=a.pick,m=a.seriesTypes,k=a.wrap,h=
a.Series.prototype,t=a.Pointer.prototype;h.searchPointByAngle=function(b){var a=this.chart,e=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(b.chartX-e[0]-a.plotLeft,b.chartY-e[1]-a.plotTop)})};h.getConnectors=function(b,a,e,g){var c,d,h,k,l,m,p,r;d=g?1:0;c=0<=a&&a<=b.length-1?a:0>a?b.length-1+a:0;a=0>c-1?b.length-(1+d):c-1;d=c+1>b.length-1?d:c+1;h=b[a];d=b[d];k=h.plotX;h=h.plotY;l=d.plotX;m=d.plotY;d=b[c].plotX;c=b[c].plotY;k=(1.5*d+k)/2.5;h=(1.5*c+h)/2.5;l=(1.5*
d+l)/2.5;p=(1.5*c+m)/2.5;m=Math.sqrt(Math.pow(k-d,2)+Math.pow(h-c,2));r=Math.sqrt(Math.pow(l-d,2)+Math.pow(p-c,2));k=Math.atan2(h-c,k-d);p=Math.PI/2+(k+Math.atan2(p-c,l-d))/2;Math.abs(k-p)>Math.PI/2&&(p-=Math.PI);k=d+Math.cos(p)*m;h=c+Math.sin(p)*m;l=d+Math.cos(Math.PI+p)*r;p=c+Math.sin(Math.PI+p)*r;d={rightContX:l,rightContY:p,leftContX:k,leftContY:h,plotX:d,plotY:c};e&&(d.prevPointCont=this.getConnectors(b,a,!1,g));return d};k(h,"buildKDTree",function(b){this.chart.polar&&(this.kdByAngle?this.searchPoint=
this.searchPointByAngle:this.options.findNearestPointBy="xy");b.apply(this)});h.toXY=function(b){var a,e=this.chart,g=b.plotX;a=b.plotY;b.rectPlotX=g;b.rectPlotY=a;a=this.xAxis.postTranslate(b.plotX,this.yAxis.len-a);b.plotX=b.polarPlotX=a.x-e.plotLeft;b.plotY=b.polarPlotY=a.y-e.plotTop;this.kdByAngle?(e=(g/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>e&&(e+=360),b.clientX=e):b.clientX=b.plotX};m.spline&&(k(m.spline.prototype,"getPointSpline",function(a,d,e,g){this.chart.polar?g?(a=this.getConnectors(d,
g,!0,this.connectEnds),a=["C",a.prevPointCont.rightContX,a.prevPointCont.rightContY,a.leftContX,a.leftContY,a.plotX,a.plotY]):a=["M",e.plotX,e.plotY]:a=a.call(this,d,e,g);return a}),m.areasplinerange&&(m.areasplinerange.prototype.getPointSpline=m.spline.prototype.getPointSpline));k(h,"translate",function(a){var b=this.chart;a.call(this);if(b.polar&&(this.kdByAngle=b.tooltip&&b.tooltip.shared,!this.preventPostTranslate))for(a=this.points,b=a.length;b--;)this.toXY(a[b])});k(h,"getGraphPath",function(a,
d){var b=this,g,c,f;if(this.chart.polar){d=d||this.points;for(g=0;g<d.length;g++)if(!d[g].isNull){c=g;break}!1!==this.options.connectEnds&&void 0!==c&&(this.connectEnds=!0,d.splice(d.length,0,d[c]),f=!0);r(d,function(a){void 0===a.polarPlotY&&b.toXY(a)})}g=a.apply(this,[].slice.call(arguments,1));f&&d.pop();return g});k(h,"animate",p);m.column&&(m=m.column.prototype,m.polarArc=function(a,d,e,g){var b=this.xAxis.center,f=this.yAxis.len;return this.chart.renderer.symbols.arc(b[0],b[1],f-d,null,{start:e,
end:g,innerR:f-v(a,f)})},k(m,"animate",p),k(m,"translate",function(a){var b=this.xAxis,e=b.startAngleRad,g,c,f;this.preventPostTranslate=!0;a.call(this);if(b.isRadial)for(g=this.points,f=g.length;f--;)c=g[f],a=c.barX+e,c.shapeType="path",c.shapeArgs={d:this.polarArc(c.yBottom,c.plotY,a,a+c.pointWidth)},this.toXY(c),c.tooltipPos=[c.plotX,c.plotY],c.ttBelow=c.plotY>b.center[1]}),k(m,"alignDataLabel",function(a,d,e,g,c,f){this.chart.polar?(a=d.rectPlotX/Math.PI*180,null===g.align&&(g.align=20<a&&160>
a?"left":200<a&&340>a?"right":"center"),null===g.verticalAlign&&(g.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),h.alignDataLabel.call(this,d,e,g,c,f)):a.call(this,d,e,g,c,f)}));k(t,"getCoordinates",function(a,d){var b=this.chart,g={xAxis:[],yAxis:[]};b.polar?r(b.axes,function(a){var c=a.isXAxis,e=a.center,h=d.chartX-e[0]-b.plotLeft,e=d.chartY-e[1]-b.plotTop;g[c?"xAxis":"yAxis"].push({axis:a,value:a.translate(c?Math.PI-Math.atan2(h,e):Math.sqrt(Math.pow(h,2)+Math.pow(e,2)),!0)})}):
g=a.call(this,d);return g});k(a.Chart.prototype,"getAxes",function(b){this.pane||(this.pane=[]);r(a.splat(this.options.pane),function(b){new a.Pane(b,this)},this);b.call(this)});k(a.Chart.prototype,"drawChartBox",function(a){a.call(this);r(this.pane,function(a){a.render()})});k(a.Chart.prototype,"get",function(b,d){return a.find(this.pane,function(a){return a.options.id===d})||b.call(this,d)})})(y)});


/***/ }),
/* 122 */
/***/ (function(module, exports) {

/*
 Highstock JS v5.0.10 (2017-03-31)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(K,a){"object"===typeof module&&module.exports?module.exports=K.document?a(K):a:K.Highcharts=a(K)})("undefined"!==typeof window?window:this,function(K){K=function(){var a=window,D=a.document,C=a.navigator&&a.navigator.userAgent||"",G=D&&D.createElementNS&&!!D.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,H=/(edge|msie|trident)/i.test(C)&&!window.opera,v=!G,l=/Firefox/.test(C),r=l&&4>parseInt(C.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highstock",
version:"5.0.10",deg2rad:2*Math.PI/360,doc:D,hasBidiBug:r,hasTouch:D&&void 0!==D.documentElement.ontouchstart,isMS:H,isWebKit:/AppleWebKit/.test(C),isFirefox:l,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(C),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:G,vml:v,win:a,charts:[],marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){}}}();(function(a){var D=[],C=a.charts,G=a.doc,H=a.win;a.error=function(v,l){v=a.isNumber(v)?"Highcharts error #"+
v+": www.highcharts.com/errors/"+v:v;if(l)throw Error(v);H.console&&console.log(v)};a.Fx=function(a,l,r){this.options=l;this.elem=a;this.prop=r};a.Fx.prototype={dSetter:function(){var a=this.paths[0],l=this.paths[1],r=[],w=this.now,q=a.length,n;if(1===w)r=this.toD;else if(q===l.length&&1>w)for(;q--;)n=parseFloat(a[q]),r[q]=isNaN(n)?a[q]:w*parseFloat(l[q]-n)+n;else r=l;this.elem.attr("d",r,null,!0)},update:function(){var a=this.elem,l=this.prop,r=this.now,w=this.options.step;if(this[l+"Setter"])this[l+
"Setter"]();else a.attr?a.element&&a.attr(l,r,null,!0):a.style[l]=r+this.unit;w&&w.call(a,r,this)},run:function(a,l,r){var v=this,q=function(a){return q.stopped?!1:v.step(a)},n;this.startTime=+new Date;this.start=a;this.end=l;this.unit=r;this.now=this.start;this.pos=0;q.elem=this.elem;q.prop=this.prop;q()&&1===D.push(q)&&(q.timerId=setInterval(function(){for(n=0;n<D.length;n++)D[n]()||D.splice(n--,1);D.length||clearInterval(q.timerId)},13))},step:function(a){var l=+new Date,v,w=this.options;v=this.elem;
var q=w.complete,n=w.duration,f=w.curAnim,c;if(v.attr&&!v.element)v=!1;else if(a||l>=n+this.startTime){this.now=this.end;this.pos=1;this.update();a=f[this.prop]=!0;for(c in f)!0!==f[c]&&(a=!1);a&&q&&q.call(v);v=!1}else this.pos=w.easing((l-this.startTime)/n),this.now=this.start+(this.end-this.start)*this.pos,this.update(),v=!0;return v},initPath:function(v,l,r){function w(a){var b,k;for(B=a.length;B--;)b="M"===a[B]||"L"===a[B],k=/[a-zA-Z]/.test(a[B+3]),b&&k&&a.splice(B+1,0,a[B+1],a[B+2],a[B+1],a[B+
2])}function q(a,d){for(;a.length<t;){a[0]=d[t-a.length];var k=a.slice(0,b);[].splice.apply(a,[0,0].concat(k));p&&(k=a.slice(a.length-b),[].splice.apply(a,[a.length,0].concat(k)),B--)}a[0]="M"}function n(a,d){for(var k=(t-a.length)/b;0<k&&k--;)h=a.slice().splice(a.length/x-b,b*x),h[0]=d[t-b-k*b],z&&(h[b-6]=h[b-2],h[b-5]=h[b-1]),[].splice.apply(a,[a.length/x,0].concat(h)),p&&k--}l=l||"";var f,c=v.startX,e=v.endX,z=-1<l.indexOf("C"),b=z?7:3,t,h,B;l=l.split(" ");r=r.slice();var p=v.isArea,x=p?2:1,k;
z&&(w(l),w(r));if(c&&e){for(B=0;B<c.length;B++)if(c[B]===e[0]){f=B;break}else if(c[0]===e[e.length-c.length+B]){f=B;k=!0;break}void 0===f&&(l=[])}l.length&&a.isNumber(f)&&(t=r.length+f*x*b,k?(q(l,r),n(r,l)):(q(r,l),n(l,r)));return[l,r]}};a.extend=function(a,l){var v;a||(a={});for(v in l)a[v]=l[v];return a};a.merge=function(){var v,l=arguments,r,w={},q=function(n,f){var c,e;"object"!==typeof n&&(n={});for(e in f)f.hasOwnProperty(e)&&(c=f[e],a.isObject(c,!0)&&"renderTo"!==e&&"number"!==typeof c.nodeType?
n[e]=q(n[e]||{},c):n[e]=f[e]);return n};!0===l[0]&&(w=l[1],l=Array.prototype.slice.call(l,2));r=l.length;for(v=0;v<r;v++)w=q(w,l[v]);return w};a.pInt=function(a,l){return parseInt(a,l||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(v,l){return v&&"object"===typeof v&&(!l||!a.isArray(v))};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=
function(a,l){for(var v=a.length;v--;)if(a[v]===l){a.splice(v,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(v,l,r){var w,q;if(a.isString(l))a.defined(r)?v.setAttribute(l,r):v&&v.getAttribute&&(q=v.getAttribute(l));else if(a.defined(l)&&a.isObject(l))for(w in l)v.setAttribute(w,l[w]);return q};a.splat=function(v){return a.isArray(v)?v:[v]};a.syncTimeout=function(a,l,r){if(l)return setTimeout(a,l,r);a.call(0,r)};a.pick=function(){var a=arguments,l,r,w=a.length;for(l=
0;l<w;l++)if(r=a[l],void 0!==r&&null!==r)return r};a.css=function(v,l){a.isMS&&!a.svg&&l&&void 0!==l.opacity&&(l.filter="alpha(opacity\x3d"+100*l.opacity+")");a.extend(v.style,l)};a.createElement=function(v,l,r,w,q){v=G.createElement(v);var n=a.css;l&&a.extend(v,l);q&&n(v,{padding:0,border:"none",margin:0});r&&n(v,r);w&&w.appendChild(v);return v};a.extendClass=function(v,l){var r=function(){};r.prototype=new v;a.extend(r.prototype,l);return r};a.pad=function(a,l,r){return Array((l||2)+1-String(a).length).join(r||
0)+a};a.relativeLength=function(a,l){return/%$/.test(a)?l*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,l,r){var w=a[l];a[l]=function(){var a=Array.prototype.slice.call(arguments),n=arguments,f=this;f.proceed=function(){w.apply(f,arguments.length?arguments:n)};a.unshift(w);a=r.apply(this,a);f.proceed=null;return a}};a.getTZOffset=function(v){var l=a.Date;return 6E4*(l.hcGetTimezoneOffset&&l.hcGetTimezoneOffset(v)||l.hcTimezoneOffset||0)};a.dateFormat=function(v,l,r){if(!a.defined(l)||isNaN(l))return a.defaultOptions.lang.invalidDate||
"";v=a.pick(v,"%Y-%m-%d %H:%M:%S");var w=a.Date,q=new w(l-a.getTZOffset(l)),n,f=q[w.hcGetHours](),c=q[w.hcGetDay](),e=q[w.hcGetDate](),z=q[w.hcGetMonth](),b=q[w.hcGetFullYear](),t=a.defaultOptions.lang,h=t.weekdays,B=t.shortWeekdays,p=a.pad,w=a.extend({a:B?B[c]:h[c].substr(0,3),A:h[c],d:p(e),e:p(e,2," "),w:c,b:t.shortMonths[z],B:t.months[z],m:p(z+1),y:b.toString().substr(2,2),Y:b,H:p(f),k:f,I:p(f%12||12),l:f%12||12,M:p(q[w.hcGetMinutes]()),p:12>f?"AM":"PM",P:12>f?"am":"pm",S:p(q.getSeconds()),L:p(Math.round(l%
1E3),3)},a.dateFormats);for(n in w)for(;-1!==v.indexOf("%"+n);)v=v.replace("%"+n,"function"===typeof w[n]?w[n](l):w[n]);return r?v.substr(0,1).toUpperCase()+v.substr(1):v};a.formatSingle=function(v,l){var r=/\.([0-9])/,w=a.defaultOptions.lang;/f$/.test(v)?(r=(r=v.match(r))?r[1]:-1,null!==l&&(l=a.numberFormat(l,r,w.decimalPoint,-1<v.indexOf(",")?w.thousandsSep:""))):l=a.dateFormat(v,l);return l};a.format=function(v,l){for(var r="{",w=!1,q,n,f,c,e=[],z;v;){r=v.indexOf(r);if(-1===r)break;q=v.slice(0,
r);if(w){q=q.split(":");n=q.shift().split(".");c=n.length;z=l;for(f=0;f<c;f++)z=z[n[f]];q.length&&(z=a.formatSingle(q.join(":"),z));e.push(z)}else e.push(q);v=v.slice(r+1);r=(w=!w)?"}":"{"}e.push(v);return e.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(v,l,r,w,q){var n,f=v;r=a.pick(r,1);n=v/r;l||(l=q?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===w&&(1===r?l=a.grep(l,function(a){return 0===a%1}):.1>=r&&(l=[1/r])));
for(w=0;w<l.length&&!(f=l[w],q&&f*r>=v||!q&&n<=(l[w]+(l[w+1]||l[w]))/2);w++);return f=a.correctFloat(f*r,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,l){var r=a.length,w,q;for(q=0;q<r;q++)a[q].safeI=q;a.sort(function(a,f){w=l(a,f);return 0===w?a.safeI-f.safeI:w});for(q=0;q<r;q++)delete a[q].safeI};a.arrayMin=function(a){for(var l=a.length,r=a[0];l--;)a[l]<r&&(r=a[l]);return r};a.arrayMax=function(a){for(var l=a.length,r=a[0];l--;)a[l]>r&&(r=a[l]);return r};a.destroyObjectProperties=
function(a,l){for(var r in a)a[r]&&a[r]!==l&&a[r].destroy&&a[r].destroy(),delete a[r]};a.discardElement=function(v){var l=a.garbageBin;l||(l=a.createElement("div"));v&&l.appendChild(v);l.innerHTML=""};a.correctFloat=function(a,l){return parseFloat(a.toPrecision(l||14))};a.setAnimation=function(v,l){l.renderer.globalAnimation=a.pick(v,l.options.chart.animation,!0)};a.animObject=function(v){return a.isObject(v)?a.merge(v):{duration:v?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,
day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(v,l,r,w){v=+v||0;l=+l;var q=a.defaultOptions.lang,n=(v.toString().split(".")[1]||"").length,f,c;-1===l?l=Math.min(n,20):a.isNumber(l)||(l=2);c=(Math.abs(v)+Math.pow(10,-Math.max(l,n)-1)).toFixed(l);n=String(a.pInt(c));f=3<n.length?n.length%3:0;r=a.pick(r,q.decimalPoint);w=a.pick(w,q.thousandsSep);v=(0>v?"-":"")+(f?n.substr(0,f)+w:"");v+=n.substr(f).replace(/(\d{3})(?=\d)/g,"$1"+w);l&&(v+=r+c.slice(-l));return v};Math.easeInOutSine=
function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(v,l){return"width"===l?Math.min(v.offsetWidth,v.scrollWidth)-a.getStyle(v,"padding-left")-a.getStyle(v,"padding-right"):"height"===l?Math.min(v.offsetHeight,v.scrollHeight)-a.getStyle(v,"padding-top")-a.getStyle(v,"padding-bottom"):(v=H.getComputedStyle(v,void 0))&&a.pInt(v.getPropertyValue(l))};a.inArray=function(a,l){return l.indexOf?l.indexOf(a):[].indexOf.call(l,a)};a.grep=function(a,l){return[].filter.call(a,l)};a.find=function(a,
l){return[].find.call(a,l)};a.map=function(a,l){for(var r=[],w=0,q=a.length;w<q;w++)r[w]=l.call(a[w],a[w],w,a);return r};a.offset=function(a){var l=G.documentElement;a=a.getBoundingClientRect();return{top:a.top+(H.pageYOffset||l.scrollTop)-(l.clientTop||0),left:a.left+(H.pageXOffset||l.scrollLeft)-(l.clientLeft||0)}};a.stop=function(a,l){for(var r=D.length;r--;)D[r].elem!==a||l&&l!==D[r].prop||(D[r].stopped=!0)};a.each=function(a,l,r){return Array.prototype.forEach.call(a,l,r)};a.addEvent=function(v,
l,r){function w(a){a.target=a.srcElement||H;r.call(v,a)}var q=v.hcEvents=v.hcEvents||{};v.addEventListener?v.addEventListener(l,r,!1):v.attachEvent&&(v.hcEventsIE||(v.hcEventsIE={}),v.hcEventsIE[r.toString()]=w,v.attachEvent("on"+l,w));q[l]||(q[l]=[]);q[l].push(r);return function(){a.removeEvent(v,l,r)}};a.removeEvent=function(v,l,r){function w(a,c){v.removeEventListener?v.removeEventListener(a,c,!1):v.attachEvent&&(c=v.hcEventsIE[c.toString()],v.detachEvent("on"+a,c))}function q(){var a,c;if(v.nodeName)for(c in l?
(a={},a[l]=!0):a=f,a)if(f[c])for(a=f[c].length;a--;)w(c,f[c][a])}var n,f=v.hcEvents,c;f&&(l?(n=f[l]||[],r?(c=a.inArray(r,n),-1<c&&(n.splice(c,1),f[l]=n),w(l,r)):(q(),f[l]=[])):(q(),v.hcEvents={}))};a.fireEvent=function(v,l,r,w){var q;q=v.hcEvents;var n,f;r=r||{};if(G.createEvent&&(v.dispatchEvent||v.fireEvent))q=G.createEvent("Events"),q.initEvent(l,!0,!0),a.extend(q,r),v.dispatchEvent?v.dispatchEvent(q):v.fireEvent(l,q);else if(q)for(q=q[l]||[],n=q.length,r.target||a.extend(r,{preventDefault:function(){r.defaultPrevented=
!0},target:v,type:l}),l=0;l<n;l++)(f=q[l])&&!1===f.call(v,r)&&r.preventDefault();w&&!r.defaultPrevented&&w(r)};a.animate=function(v,l,r){var w,q="",n,f,c;a.isObject(r)||(w=arguments,r={duration:w[2],easing:w[3],complete:w[4]});a.isNumber(r.duration)||(r.duration=400);r.easing="function"===typeof r.easing?r.easing:Math[r.easing]||Math.easeInOutSine;r.curAnim=a.merge(l);for(c in l)a.stop(v,c),f=new a.Fx(v,r,c),n=null,"d"===c?(f.paths=f.initPath(v,v.d,l.d),f.toD=l.d,w=0,n=1):v.attr?w=v.attr(c):(w=parseFloat(a.getStyle(v,
c))||0,"opacity"!==c&&(q="px")),n||(n=l[c]),n&&n.match&&n.match("px")&&(n=n.replace(/px/g,"")),f.run(w,n,q)};a.seriesType=function(v,l,r,w,q){var n=a.getOptions(),f=a.seriesTypes;n.plotOptions[v]=a.merge(n.plotOptions[l],r);f[v]=a.extendClass(f[l]||function(){},w);f[v].prototype.type=v;q&&(f[v].prototype.pointClass=a.extendClass(a.Point,q));return f[v]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),l=0;return function(){return"highcharts-"+a+"-"+l++}}();H.jQuery&&(H.jQuery.fn.highcharts=
function(){var v=[].slice.call(arguments);if(this[0])return v[0]?(new (a[a.isString(v[0])?v.shift():"Chart"])(this[0],v[0],v[1]),this):C[a.attr(this[0],"data-highcharts-chart")]});G&&!G.defaultView&&(a.getStyle=function(v,l){var r={width:"clientWidth",height:"clientHeight"}[l];if(v.style[l])return a.pInt(v.style[l]);"opacity"===l&&(l="filter");if(r)return v.style.zoom=1,Math.max(v[r]-2*a.getStyle(v,"padding"),0);v=v.currentStyle[l.replace(/\-(\w)/g,function(a,q){return q.toUpperCase()})];"filter"===
l&&(v=v.replace(/alpha\(opacity=([0-9]+)\)/,function(a,q){return q/100}));return""===v?1:a.pInt(v)});Array.prototype.forEach||(a.each=function(a,l,r){for(var w=0,q=a.length;w<q;w++)if(!1===l.call(r,a[w],w,a))return w});Array.prototype.indexOf||(a.inArray=function(a,l){var r,w=0;if(l)for(r=l.length;w<r;w++)if(l[w]===a)return w;return-1});Array.prototype.filter||(a.grep=function(a,l){for(var r=[],w=0,q=a.length;w<q;w++)l(a[w],w)&&r.push(a[w]);return r});Array.prototype.find||(a.find=function(a,l){var r,
w=a.length;for(r=0;r<w;r++)if(l(a[r],r))return a[r]})})(K);(function(a){var D=a.each,C=a.isNumber,G=a.map,H=a.merge,v=a.pInt;a.Color=function(l){if(!(this instanceof a.Color))return new a.Color(l);this.init(l)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[v(a[1]),v(a[2]),v(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[v(a[1]),
v(a[2]),v(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(l){var r,w,q,n;if((this.input=l=this.names[l&&l.toLowerCase?l.toLowerCase():""]||l)&&l.stops)this.stops=G(l.stops,function(f){return new a.Color(f[1])});else if(l&&"#"===l[0]&&(r=l.length,l=parseInt(l.substr(1),16),7===r?w=[(l&16711680)>>16,(l&65280)>>8,l&255,1]:4===r&&(w=[(l&3840)>>4|(l&3840)>>8,(l&240)>>4|l&240,(l&15)<<4|l&15,1])),!w)for(q=this.parsers.length;q--&&!w;)n=this.parsers[q],(r=n.regex.exec(l))&&(w=n.parse(r));
this.rgba=w||[]},get:function(a){var l=this.input,w=this.rgba,q;this.stops?(q=H(l),q.stops=[].concat(q.stops),D(this.stops,function(n,f){q.stops[f]=[q.stops[f][0],n.get(a)]})):q=w&&C(w[0])?"rgb"===a||!a&&1===w[3]?"rgb("+w[0]+","+w[1]+","+w[2]+")":"a"===a?w[3]:"rgba("+w.join(",")+")":l;return q},brighten:function(a){var l,w=this.rgba;if(this.stops)D(this.stops,function(q){q.brighten(a)});else if(C(a)&&0!==a)for(l=0;3>l;l++)w[l]+=v(255*a),0>w[l]&&(w[l]=0),255<w[l]&&(w[l]=255);return this},setOpacity:function(a){this.rgba[3]=
a;return this}};a.color=function(l){return new a.Color(l)}})(K);(function(a){var D,C,G=a.addEvent,H=a.animate,v=a.attr,l=a.charts,r=a.color,w=a.css,q=a.createElement,n=a.defined,f=a.deg2rad,c=a.destroyObjectProperties,e=a.doc,z=a.each,b=a.extend,t=a.erase,h=a.grep,B=a.hasTouch,p=a.inArray,x=a.isArray,k=a.isFirefox,F=a.isMS,d=a.isObject,u=a.isString,m=a.isWebKit,y=a.merge,J=a.noop,E=a.pick,I=a.pInt,g=a.removeEvent,L=a.stop,R=a.svg,O=a.SVG_NS,M=a.symbolSizes,P=a.win;D=a.SVGElement=function(){return this};
D.prototype={opacity:1,SVG_NS:O,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),init:function(a,g){this.element="span"===g?q(g):e.createElementNS(this.SVG_NS,g);this.renderer=a},animate:function(A,g,b){g=a.animObject(E(g,this.renderer.globalAnimation,!0));0!==g.duration?(b&&(g.complete=b),H(this,A,g)):(this.attr(A,null,b),g.step&&g.step.call(this));return this},colorGradient:function(A,g,b){var k=this.renderer,
d,m,c,h,L,E,F,u,Q,p,t,e=[],I;A.radialGradient?m="radialGradient":A.linearGradient&&(m="linearGradient");if(m){c=A[m];L=k.gradients;F=A.stops;p=b.radialReference;x(c)&&(A[m]=c={x1:c[0],y1:c[1],x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===m&&p&&!n(c.gradientUnits)&&(h=c,c=y(c,k.getRadialAttr(p,h),{gradientUnits:"userSpaceOnUse"}));for(t in c)"id"!==t&&e.push(t,c[t]);for(t in F)e.push(F[t]);e=e.join(",");L[e]?p=L[e].attr("id"):(c.id=p=a.uniqueKey(),L[e]=E=k.createElement(m).attr(c).add(k.defs),
E.radAttr=h,E.stops=[],z(F,function(A){0===A[1].indexOf("rgba")?(d=a.color(A[1]),u=d.get("rgb"),Q=d.get("a")):(u=A[1],Q=1);A=k.createElement("stop").attr({offset:A[0],"stop-color":u,"stop-opacity":Q}).add(E);E.stops.push(A)}));I="url("+k.url+"#"+p+")";b.setAttribute(g,I);b.gradient=e;A.toString=function(){return I}}},applyTextOutline:function(A){var g=this.element,b,k,d,m,c;-1!==A.indexOf("contrast")&&(A=A.replace(/contrast/g,this.renderer.getContrast(g.style.fill)));A=A.split(" ");k=A[A.length-1];
if((d=A[0])&&"none"!==d&&a.svg){this.fakeTS=!0;A=[].slice.call(g.getElementsByTagName("tspan"));this.ySetter=this.xSetter;d=d.replace(/(^[\d\.]+)(.*?)$/g,function(a,A,g){return 2*A+g});for(c=A.length;c--;)b=A[c],"highcharts-text-outline"===b.getAttribute("class")&&t(A,g.removeChild(b));m=g.firstChild;z(A,function(a,A){0===A&&(a.setAttribute("x",g.getAttribute("x")),A=g.getAttribute("y"),a.setAttribute("y",A||0),null===A&&g.setAttribute("y",0));a=a.cloneNode(1);v(a,{"class":"highcharts-text-outline",
fill:k,stroke:k,"stroke-width":d,"stroke-linejoin":"round"});g.insertBefore(a,m)})}},attr:function(a,g,b,k){var A,d=this.element,m,c=this,h;"string"===typeof a&&void 0!==g&&(A=a,a={},a[A]=g);if("string"===typeof a)c=(this[a+"Getter"]||this._defaultGetter).call(this,a,d);else{for(A in a)g=a[A],h=!1,k||L(this,A),this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(A)&&(m||(this.symbolAttr(a),m=!0),h=!0),!this.rotation||"x"!==A&&"y"!==A||(this.doTransform=!0),h||(h=this[A+
"Setter"]||this._defaultSetter,h.call(this,g,A,d),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(A)&&this.updateShadows(A,g,h));this.doTransform&&(this.updateTransform(),this.doTransform=!1)}b&&b();return c},updateShadows:function(a,g,b){for(var A=this.shadows,k=A.length;k--;)b.call(A[k],"height"===a?Math.max(g-(A[k].cutHeight||0),0):"d"===a?this.d:g,a,A[k])},addClass:function(a,g){var A=this.attr("class")||"";-1===A.indexOf(a)&&(g||(a=(A+(A?" ":"")+a).replace("  "," ")),
this.attr("class",a));return this},hasClass:function(a){return-1!==v(this.element,"class").indexOf(a)},removeClass:function(a){v(this.element,"class",(v(this.element,"class")||"").replace(a,""));return this},symbolAttr:function(a){var A=this;z("x y r start end width height innerR anchorX anchorY".split(" "),function(g){A[g]=E(a[g],A[g])});A.attr({d:A.renderer.symbols[A.symbolName](A.x,A.y,A.width,A.height,A)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":
"none")},crisp:function(a,g){var A,b={},k;g=g||a.strokeWidth||0;k=Math.round(g)%2/2;a.x=Math.floor(a.x||this.x||0)+k;a.y=Math.floor(a.y||this.y||0)+k;a.width=Math.floor((a.width||this.width||0)-2*k);a.height=Math.floor((a.height||this.height||0)-2*k);n(a.strokeWidth)&&(a.strokeWidth=g);for(A in a)this[A]!==a[A]&&(this[A]=b[A]=a[A]);return b},css:function(a){var A=this.styles,g={},k=this.element,d,m="",c=!A,h=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);if(A)for(d in a)a[d]!==
A[d]&&(g[d]=a[d],c=!0);if(c){A&&(a=b(A,g));A=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===k.nodeName.toLowerCase()&&I(a.width);this.styles=a;A&&!R&&this.renderer.forExport&&delete a.width;if(F&&!R)w(this.element,a);else{A=function(a,A){return"-"+A.toLowerCase()};for(d in a)-1===p(d,h)&&(m+=d.replace(/([A-Z])/g,A)+":"+a[d]+";");m&&v(k,"style",m)}this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this},strokeWidth:function(){return this["stroke-width"]||
0},on:function(a,g){var A=this,b=A.element;B&&"click"===a?(b.ontouchstart=function(a){A.touchEventFired=Date.now();a.preventDefault();g.call(b,a)},b.onclick=function(a){(-1===P.navigator.userAgent.indexOf("Android")||1100<Date.now()-(A.touchEventFired||0))&&g.call(b,a)}):b["on"+a]=g;return this},setRadialReference:function(a){var A=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;A&&A.radAttr&&A.animate(this.renderer.getRadialAttr(a,A.radAttr));return this},translate:function(a,
g){return this.attr({translateX:a,translateY:g})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,g=this.translateY||0,b=this.scaleX,k=this.scaleY,d=this.inverted,m=this.rotation,c=this.element;d&&(a+=this.width,g+=this.height);a=["translate("+a+","+g+")"];d?a.push("rotate(90) scale(-1,1)"):m&&a.push("rotate("+m+" "+(c.getAttribute("x")||0)+" "+(c.getAttribute("y")||0)+")");(n(b)||n(k))&&a.push("scale("+E(b,1)+" "+E(k,1)+")");
a.length&&c.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,g,b){var A,k,d,m,c={};k=this.renderer;d=k.alignedObjects;var h,y;if(a){if(this.alignOptions=a,this.alignByTranslate=g,!b||u(b))this.alignTo=A=b||"renderer",t(d,this),d.push(this),b=null}else a=this.alignOptions,g=this.alignByTranslate,A=this.alignTo;b=E(b,k[A],k);A=a.align;k=a.verticalAlign;d=(b.x||0)+(a.x||0);m=(b.y||0)+(a.y||0);"right"===A?h=1:"center"===
A&&(h=2);h&&(d+=(b.width-(a.width||0))/h);c[g?"translateX":"x"]=Math.round(d);"bottom"===k?y=1:"middle"===k&&(y=2);y&&(m+=(b.height-(a.height||0))/y);c[g?"translateY":"y"]=Math.round(m);this[this.placed?"animate":"attr"](c);this.placed=!0;this.alignAttr=c;return this},getBBox:function(a,g){var A,k=this.renderer,d,m=this.element,c=this.styles,h,y=this.textStr,L,F=k.cache,u=k.cacheKeys,p;g=E(g,this.rotation);d=g*f;h=c&&c.fontSize;void 0!==y&&(p=y.toString(),-1===p.indexOf("\x3c")&&(p=p.replace(/[0-9]/g,
"0")),p+=["",g||0,h,c&&c.width,c&&c.textOverflow].join());p&&!a&&(A=F[p]);if(!A){if(m.namespaceURI===this.SVG_NS||k.forExport){try{(L=this.fakeTS&&function(a){z(m.querySelectorAll(".highcharts-text-outline"),function(A){A.style.display=a})})&&L("none"),A=m.getBBox?b({},m.getBBox()):{width:m.offsetWidth,height:m.offsetHeight},L&&L("")}catch(U){}if(!A||0>A.width)A={width:0,height:0}}else A=this.htmlGetBBox();k.isSVG&&(a=A.width,k=A.height,c&&"11px"===c.fontSize&&17===Math.round(k)&&(A.height=k=14),
g&&(A.width=Math.abs(k*Math.sin(d))+Math.abs(a*Math.cos(d)),A.height=Math.abs(k*Math.cos(d))+Math.abs(a*Math.sin(d))));if(p&&0<A.height){for(;250<u.length;)delete F[u.shift()];F[p]||u.push(p);F[p]=A}}return A},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var A=this;A.animate({opacity:0},{duration:a||150,complete:function(){A.attr({y:-9999})}})},add:function(a){var A=this.renderer,g=this.element,
b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&A.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:A.box).appendChild(g);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var A=a.parentNode;A&&A.removeChild(a)},destroy:function(){var a=this,g=a.element||{},b=a.renderer.isSVG&&"SPAN"===g.nodeName&&a.parentGroup,k,d;g.onclick=g.onmouseout=g.onmouseover=g.onmousemove=g.point=null;L(a);a.clipPath&&(z(a.element.ownerSVGElement.querySelectorAll("[clip-path]"),
function(g){-1<g.getAttribute("clip-path").indexOf(a.clipPath.element.id)&&g.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(d=0;d<a.stops.length;d++)a.stops[d]=a.stops[d].destroy();a.stops=null}a.safeRemoveChild(g);for(a.destroyShadows();b&&b.div&&0===b.div.childNodes.length;)g=b.parentGroup,a.safeRemoveChild(b.div),delete b.div,b=g;a.alignTo&&t(a.renderer.alignedObjects,a);for(k in a)delete a[k];return null},shadow:function(a,g,b){var A=[],k,d,m=this.element,c,h,
y,L;if(!a)this.destroyShadows();else if(!this.shadows){h=E(a.width,3);y=(a.opacity||.15)/h;L=this.parentInverted?"(-1,-1)":"("+E(a.offsetX,1)+", "+E(a.offsetY,1)+")";for(k=1;k<=h;k++)d=m.cloneNode(0),c=2*h+1-2*k,v(d,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":y*k,"stroke-width":c,transform:"translate"+L,fill:"none"}),b&&(v(d,"height",Math.max(v(d,"height")-c,0)),d.cutHeight=c),g?g.element.appendChild(d):m.parentNode.insertBefore(d,m),A.push(d);this.shadows=A}return this},destroyShadows:function(){z(this.shadows||
[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=E(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,g,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");b.setAttribute(g,a);this[g]=a},dashstyleSetter:function(a){var g,A=this["stroke-width"];
"inherit"===A&&(A=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(g=a.length;g--;)a[g]=I(a[g])*A;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},
opacitySetter:function(a,g,b){this[g]=a;b.setAttribute(g,a)},titleSetter:function(a){var g=this.element.getElementsByTagName("title")[0];g||(g=e.createElementNS(this.SVG_NS,"title"),this.element.appendChild(g));g.firstChild&&g.removeChild(g.firstChild);g.appendChild(e.createTextNode(String(E(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,g,b){"string"===typeof a?b.setAttribute(g,
a):a&&this.colorGradient(a,g,b)},visibilitySetter:function(a,g,b){"inherit"===a?b.removeAttribute(g):b.setAttribute(g,a)},zIndexSetter:function(a,g){var A=this.renderer,b=this.parentGroup,k=(b||A).element||A.box,d,m=this.element,c;d=this.added;var h;n(a)&&(m.zIndex=a,a=+a,this[g]===a&&(d=!1),this[g]=a);if(d){(a=this.zIndex)&&b&&(b.handleZ=!0);g=k.childNodes;for(h=0;h<g.length&&!c;h++)b=g[h],d=b.zIndex,b!==m&&(I(d)>a||!n(a)&&n(d)||0>a&&!n(d)&&k!==A.box)&&(k.insertBefore(m,b),c=!0);c||k.appendChild(m)}return c},
_defaultSetter:function(a,g,b){b.setAttribute(g,a)}};D.prototype.yGetter=D.prototype.xGetter;D.prototype.translateXSetter=D.prototype.translateYSetter=D.prototype.rotationSetter=D.prototype.verticalAlignSetter=D.prototype.scaleXSetter=D.prototype.scaleYSetter=function(a,g){this[g]=a;this.doTransform=!0};D.prototype["stroke-widthSetter"]=D.prototype.strokeSetter=function(a,g,b){this[g]=a;this.stroke&&this["stroke-width"]?(D.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",
this["stroke-width"]),this.hasStroke=!0):"stroke-width"===g&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),this.hasStroke=!1)};C=a.SVGRenderer=function(){this.init.apply(this,arguments)};C.prototype={Element:D,SVG_NS:O,init:function(a,g,b,d,c,h){var A;d=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(d));A=d.element;a.appendChild(A);-1===a.innerHTML.indexOf("xmlns")&&v(A,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=A;this.boxWrapper=d;this.alignedObjects=
[];this.url=(k||m)&&e.getElementsByTagName("base").length?P.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(e.createTextNode("Created with Highstock 5.0.10"));this.defs=this.createElement("defs").add();this.allowHTML=h;this.forExport=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(g,b,!1);var y;k&&a.getBoundingClientRect&&(g=function(){w(a,{left:0,top:0});
y=a.getBoundingClientRect();w(a,{left:Math.ceil(y.left)-y.left+"px",top:Math.ceil(y.top)-y.top+"px"})},g(),this.unSubPixelFix=G(P,"resize",g))},getStyle:function(a){return this.style=b({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();c(this.gradients||
{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var g=new this.Element;g.init(this,a);return g},draw:J,getRadialAttr:function(a,g){return{cx:a[0]-a[2]/2+g.cx*a[2],cy:a[1]-a[2]/2+g.cy*a[2],r:g.r*a[2]}},getSpanWidth:function(a,g){var b=a.getBBox(!0).width;!R&&this.forExport&&(b=this.measureSpanWidth(g.firstChild.data,a.styles));return b},applyEllipsis:function(a,g,b,d){var k=this.getSpanWidth(a,g),
A=k>d,k=b,m,c=0,h=b.length,y=function(a){g.removeChild(g.firstChild);a&&g.appendChild(e.createTextNode(a))};if(A){for(;c<=h;)m=Math.ceil((c+h)/2),k=b.substring(0,m)+"\u2026",y(k),k=this.getSpanWidth(a,g),c===h?c=h+1:k>d?h=m-1:c=m;0===h&&y("")}return A},buildText:function(a){var g=a.element,b=this,k=b.forExport,d=E(a.textStr,"").toString(),m=-1!==d.indexOf("\x3c"),A=g.childNodes,c,y,L,F,p=v(g,"x"),u=a.styles,x=a.textWidth,t=u&&u.lineHeight,B=u&&u.textOutline,f=u&&"ellipsis"===u.textOverflow,J=u&&"nowrap"===
u.whiteSpace,q=u&&u.fontSize,n,l,r=A.length,u=x&&!a.added&&this.box,M=function(a){var d;d=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:q||b.style.fontSize||12;return t?I(t):b.fontMetrics(d,a.getAttribute("style")?a:g).h};n=[d,f,J,t,B,q,x].join();if(n!==a.textCache){for(a.textCache=n;r--;)g.removeChild(A[r]);m||B||f||x||-1!==d.indexOf(" ")?(c=/<.*class="([^"]+)".*>/,y=/<.*style="([^"]+)".*>/,L=/<.*href="(http[^"]+)".*>/,u&&u.appendChild(g),d=m?d.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,
'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[d],d=h(d,function(a){return""!==a}),z(d,function(d,m){var A,h=0;d=d.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");A=d.split("|||");z(A,function(d){if(""!==d||1===A.length){var E={},u=e.createElementNS(b.SVG_NS,"tspan"),t,I;c.test(d)&&(t=d.match(c)[1],v(u,"class",t));y.test(d)&&(I=d.match(y)[1].replace(/(;| |^)color([ :])/,
"$1fill$2"),v(u,"style",I));L.test(d)&&!k&&(v(u,"onclick",'location.href\x3d"'+d.match(L)[1]+'"'),w(u,{cursor:"pointer"}));d=(d.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==d){u.appendChild(e.createTextNode(d));h?E.dx=0:m&&null!==p&&(E.x=p);v(u,E);g.appendChild(u);!h&&l&&(!R&&k&&w(u,{display:"block"}),v(u,"dy",M(u)));if(x){E=d.replace(/([^\^])-/g,"$1- ").split(" ");t=1<A.length||m||1<E.length&&!J;var z=[],B,q=M(u),n=a.rotation;for(f&&(F=b.applyEllipsis(a,
u,d,x));!f&&t&&(E.length||z.length);)a.rotation=0,B=b.getSpanWidth(a,u),d=B>x,void 0===F&&(F=d),d&&1!==E.length?(u.removeChild(u.firstChild),z.unshift(E.pop())):(E=z,z=[],E.length&&!J&&(u=e.createElementNS(O,"tspan"),v(u,{dy:q,x:p}),I&&v(u,"style",I),g.appendChild(u)),B>x&&(x=B)),E.length&&u.appendChild(e.createTextNode(E.join(" ").replace(/- /g,"-")));a.rotation=n}h++}}});l=l||g.childNodes.length}),F&&a.attr("title",a.textStr),u&&u.removeChild(g),B&&a.applyTextOutline&&a.applyTextOutline(B)):g.appendChild(e.createTextNode(d.replace(/&lt;/g,
"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=r(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,g,d,k,m,c,h,L,E){var A=this.label(a,g,d,E,null,null,null,null,"button"),u=0;A.attr(y({padding:8,r:2},m));var p,x,t,e;m=y({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},m);p=m.style;delete m.style;c=y(m,{fill:"#e6e6e6"},c);x=c.style;delete c.style;h=y(m,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},
h);t=h.style;delete h.style;L=y(m,{style:{color:"#cccccc"}},L);e=L.style;delete L.style;G(A.element,F?"mouseover":"mouseenter",function(){3!==u&&A.setState(1)});G(A.element,F?"mouseout":"mouseleave",function(){3!==u&&A.setState(u)});A.setState=function(a){1!==a&&(A.state=u=a);A.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);A.attr([m,c,h,L][a||0]).css([p,x,t,e][a||0])};A.attr(m).css(b({cursor:"default"},
p));return A.on("click",function(a){3!==u&&k.call(A,a)})},crispLine:function(a,g){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-g%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+g%2/2);return a},path:function(a){var g={fill:"none"};x(a)?g.d=a:d(a)&&b(g,a);return this.createElement("path").attr(g)},circle:function(a,g,b){a=d(a)?a:{x:a,y:g,r:b};g=this.createElement("circle");g.xSetter=g.ySetter=function(a,g,d){d.setAttribute("c"+g,a)};return g.attr(a)},arc:function(a,g,b,k,m,c){d(a)?(k=a,g=k.y,b=k.r,a=k.x):
k={innerR:k,start:m,end:c};a=this.symbol("arc",a,g,b,b,k);a.r=b;return a},rect:function(a,g,b,k,m,c){m=d(a)?a.r:m;var h=this.createElement("rect");a=d(a)?a:void 0===a?{}:{x:a,y:g,width:Math.max(b,0),height:Math.max(k,0)};void 0!==c&&(a.strokeWidth=c,a=h.crisp(a));a.fill="none";m&&(a.r=m);h.rSetter=function(a,g,b){v(b,{rx:a,ry:a})};return h.attr(a)},setSize:function(a,g,b){var d=this.alignedObjects,k=d.length;this.width=a;this.height=g;for(this.boxWrapper.animate({width:a,height:g},{step:function(){this.attr({viewBox:"0 0 "+
this.attr("width")+" "+this.attr("height")})},duration:E(b,!0)?void 0:0});k--;)d[k].align()},g:function(a){var g=this.createElement("g");return a?g.attr({"class":"highcharts-"+a}):g},image:function(a,g,d,k,m){var c={preserveAspectRatio:"none"};1<arguments.length&&b(c,{x:g,y:d,width:k,height:m});c=this.createElement("image").attr(c);c.element.setAttributeNS?c.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):c.element.setAttribute("hc-svg-href",a);return c},symbol:function(a,g,d,k,m,
c){var h=this,A,y=this.symbols[a],L=n(g)&&y&&this.symbols[a](Math.round(g),Math.round(d),k,m,c),u=/^url\((.*?)\)$/,F,p;y?(A=this.path(L),A.attr("fill","none"),b(A,{symbolName:a,x:g,y:d,width:k,height:m}),c&&b(A,c)):u.test(a)&&(F=a.match(u)[1],A=this.image(F),A.imgwidth=E(M[F]&&M[F].width,c&&c.width),A.imgheight=E(M[F]&&M[F].height,c&&c.height),p=function(){A.attr({width:A.width,height:A.height})},z(["width","height"],function(a){A[a+"Setter"]=function(a,g){var d={},b=this["img"+g],k="width"===g?"translateX":
"translateY";this[g]=a;n(b)&&(this.element&&this.element.setAttribute(g,b),this.alignByTranslate||(d[k]=((this[g]||0)-b)/2,this.attr(d)))}}),n(g)&&A.attr({x:g,y:d}),A.isImg=!0,n(A.imgwidth)&&n(A.imgheight)?p():(A.attr({width:0,height:0}),q("img",{onload:function(){var a=l[h.chartIndex];0===this.width&&(w(this,{position:"absolute",top:"-999em"}),e.body.appendChild(this));M[F]={width:this.width,height:this.height};A.imgwidth=this.width;A.imgheight=this.height;A.element&&p();this.parentNode&&this.parentNode.removeChild(this);
h.imgCount--;if(!h.imgCount&&a&&a.onload)a.onload()},src:F}),this.imgCount++));return A},symbols:{circle:function(a,g,b,d){return this.arc(a+b/2,g+d/2,b/2,d/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,g,b,d){return["M",a,g,"L",a+b,g,a+b,g+d,a,g+d,"Z"]},triangle:function(a,g,b,d){return["M",a+b/2,g,"L",a+b,g+d,a,g+d,"Z"]},"triangle-down":function(a,g,b,d){return["M",a,g,"L",a+b,g,a+b/2,g+d,"Z"]},diamond:function(a,g,b,d){return["M",a+b/2,g,"L",a+b,g+d/2,a+b/2,g+d,a,g+d/2,"Z"]},arc:function(a,
g,b,d,k){var m=k.start,c=k.r||b,h=k.r||d||b,y=k.end-.001;b=k.innerR;d=k.open;var A=Math.cos(m),L=Math.sin(m),E=Math.cos(y),y=Math.sin(y);k=k.end-m<Math.PI?0:1;c=["M",a+c*A,g+h*L,"A",c,h,0,k,1,a+c*E,g+h*y];n(b)&&c.push(d?"M":"L",a+b*E,g+b*y,"A",b,b,0,k,0,a+b*A,g+b*L);c.push(d?"":"Z");return c},callout:function(a,g,b,d,k){var m=Math.min(k&&k.r||0,b,d),c=m+6,h=k&&k.anchorX;k=k&&k.anchorY;var y;y=["M",a+m,g,"L",a+b-m,g,"C",a+b,g,a+b,g,a+b,g+m,"L",a+b,g+d-m,"C",a+b,g+d,a+b,g+d,a+b-m,g+d,"L",a+m,g+d,"C",
a,g+d,a,g+d,a,g+d-m,"L",a,g+m,"C",a,g,a,g,a+m,g];h&&h>b?k>g+c&&k<g+d-c?y.splice(13,3,"L",a+b,k-6,a+b+6,k,a+b,k+6,a+b,g+d-m):y.splice(13,3,"L",a+b,d/2,h,k,a+b,d/2,a+b,g+d-m):h&&0>h?k>g+c&&k<g+d-c?y.splice(33,3,"L",a,k+6,a-6,k,a,k-6,a,g+m):y.splice(33,3,"L",a,d/2,h,k,a,d/2,a,g+m):k&&k>d&&h>a+c&&h<a+b-c?y.splice(23,3,"L",h+6,g+d,h,g+d+6,h-6,g+d,a+m,g+d):k&&0>k&&h>a+c&&h<a+b-c&&y.splice(3,3,"L",h-6,g,h,g-6,h+6,g,b-m,g);return y}},clipRect:function(g,b,d,k){var m=a.uniqueKey(),c=this.createElement("clipPath").attr({id:m}).add(this.defs);
g=this.rect(g,b,d,k,0).add(c);g.id=m;g.clipPath=c;g.count=0;return g},text:function(a,g,b,d){var k=!R&&this.forExport,m={};if(d&&(this.allowHTML||!this.forExport))return this.html(a,g,b);m.x=Math.round(g||0);b&&(m.y=Math.round(b));if(a||0===a)m.text=a;a=this.createElement("text").attr(m);k&&a.css({position:"absolute"});d||(a.xSetter=function(a,g,b){var d=b.getElementsByTagName("tspan"),k,m=b.getAttribute(g),c;for(c=0;c<d.length;c++)k=d[c],k.getAttribute(g)===m&&k.setAttribute(g,a);b.setAttribute(g,
a)});return a},fontMetrics:function(a,g){a=a||g&&g.style&&g.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?I(a):/em/.test(a)?parseFloat(a)*(g?this.fontMetrics(null,g.parentNode).f:16):12;g=24>a?a+3:Math.round(1.2*a);return{h:g,b:Math.round(.8*g),f:a}},rotCorr:function(a,g,b){var d=a;g&&b&&(d=Math.max(d*Math.cos(g*f),4));return{x:-a/3*Math.sin(g*f),y:d}},label:function(d,k,m,c,h,L,E,u,F){var A=this,p=A.g("button"!==F&&"label"),x=p.text=A.text("",0,0,E).attr({zIndex:1}),t,e,I=0,B=3,
f=0,J,R,O,q,l,w={},r,M,Q=/^url\((.*?)\)$/.test(c),v=Q,P,S,N,T;F&&p.addClass("highcharts-"+F);v=Q;P=function(){return(r||0)%2/2};S=function(){var a=x.element.style,g={};e=(void 0===J||void 0===R||l)&&n(x.textStr)&&x.getBBox();p.width=(J||e.width||0)+2*B+f;p.height=(R||e.height||0)+2*B;M=B+A.fontMetrics(a&&a.fontSize,x).b;v&&(t||(p.box=t=A.symbols[c]||Q?A.symbol(c):A.rect(),t.addClass(("button"===F?"":"highcharts-label-box")+(F?" highcharts-"+F+"-box":"")),t.add(p),a=P(),g.x=a,g.y=(u?-M:0)+a),g.width=
Math.round(p.width),g.height=Math.round(p.height),t.attr(b(g,w)),w={})};N=function(){var a=f+B,g;g=u?0:M;n(J)&&e&&("center"===l||"right"===l)&&(a+={center:.5,right:1}[l]*(J-e.width));if(a!==x.x||g!==x.y)x.attr("x",a),void 0!==g&&x.attr("y",g);x.x=a;x.y=g};T=function(a,g){t?t.attr(a,g):w[a]=g};p.onAdd=function(){x.add(p);p.attr({text:d||0===d?d:"",x:k,y:m});t&&n(h)&&p.attr({anchorX:h,anchorY:L})};p.widthSetter=function(g){J=a.isNumber(g)?g:null};p.heightSetter=function(a){R=a};p["text-alignSetter"]=
function(a){l=a};p.paddingSetter=function(a){n(a)&&a!==B&&(B=p.padding=a,N())};p.paddingLeftSetter=function(a){n(a)&&a!==f&&(f=a,N())};p.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==I&&(I=a,e&&p.attr({x:O}))};p.textSetter=function(a){void 0!==a&&x.textSetter(a);S();N()};p["stroke-widthSetter"]=function(a,g){a&&(v=!0);r=this["stroke-width"]=a;T(g,a)};p.strokeSetter=p.fillSetter=p.rSetter=function(a,g){"fill"===g&&a&&(v=!0);T(g,a)};p.anchorXSetter=function(a,g){h=a;T(g,Math.round(a)-
P()-O)};p.anchorYSetter=function(a,g){L=a;T(g,a-q)};p.xSetter=function(a){p.x=a;I&&(a-=I*((J||e.width)+2*B));O=Math.round(a);p.attr("translateX",O)};p.ySetter=function(a){q=p.y=Math.round(a);p.attr("translateY",q)};var C=p.css;return b(p,{css:function(a){if(a){var g={};a=y(a);z(p.textProps,function(b){void 0!==a[b]&&(g[b]=a[b],delete a[b])});x.css(g)}return C.call(p,a)},getBBox:function(){return{width:e.width+2*B,height:e.height+2*B,x:e.x-B,y:e.y-B}},shadow:function(a){a&&(S(),t&&t.shadow(a));return p},
destroy:function(){g(p.element,"mouseenter");g(p.element,"mouseleave");x&&(x=x.destroy());t&&(t=t.destroy());D.prototype.destroy.call(p);p=A=S=N=T=null}})}};a.Renderer=C})(K);(function(a){var D=a.attr,C=a.createElement,G=a.css,H=a.defined,v=a.each,l=a.extend,r=a.isFirefox,w=a.isMS,q=a.isWebKit,n=a.pInt,f=a.SVGRenderer,c=a.win,e=a.wrap;l(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===
a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=l(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,h=this.translateY||0,e=this.x||0,p=this.y||0,x=this.textAlign||"left",k={left:0,center:.5,right:1}[x],F=this.styles;
G(b,{marginLeft:c,marginTop:h});this.shadows&&v(this.shadows,function(a){G(a,{marginLeft:c+1,marginTop:h+1})});this.inverted&&v(b.childNodes,function(d){a.invertChild(d,b)});if("SPAN"===b.tagName){var d=this.rotation,u=n(this.textWidth),m=F&&F.whiteSpace,y=[d,x,b.innerHTML,this.textWidth,this.textAlign].join();y!==this.cTT&&(F=a.fontMetrics(b.style.fontSize).b,H(d)&&this.setSpanRotation(d,k,F),G(b,{width:"",whiteSpace:m||"nowrap"}),b.offsetWidth>u&&/[ \-]/.test(b.textContent||b.innerText)&&G(b,{width:u+
"px",display:"block",whiteSpace:m||"normal"}),this.getSpanCorrection(b.offsetWidth,F,k,d,x));G(b,{left:e+(this.xCorr||0)+"px",top:p+(this.yCorr||0)+"px"});q&&(F=b.offsetHeight);this.cTT=y}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,t){var h={},e=w?"-ms-transform":q?"-webkit-transform":r?"MozTransform":c.opera?"-o-transform":"";h[e]=h.transform="rotate("+a+"deg)";h[e+(r?"Origin":"-origin")]=h.transformOrigin=100*b+"% "+t+"px";G(this.element,h)},getSpanCorrection:function(a,b,c){this.xCorr=
-a*c;this.yCorr=-b}});l(f.prototype,{html:function(a,b,c){var h=this.createElement("span"),t=h.element,p=h.renderer,x=p.isSVG,k=function(a,b){v(["opacity","visibility"],function(d){e(a,d+"Setter",function(a,d,k,c){a.call(this,d,k,c);b[k]=d})})};h.textSetter=function(a){a!==t.innerHTML&&delete this.bBox;t.innerHTML=this.textStr=a;h.htmlUpdateTransform()};x&&k(h,h.element.style);h.xSetter=h.ySetter=h.alignSetter=h.rotationSetter=function(a,b){"align"===b&&(b="textAlign");h[b]=a;h.htmlUpdateTransform()};
h.attr({text:a,x:Math.round(b),y:Math.round(c)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});t.style.whiteSpace="nowrap";h.css=h.htmlCss;x&&(h.add=function(a){var b,c=p.box.parentNode,m=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)m.push(a),a=a.parentGroup;v(m.reverse(),function(a){var d,y=D(a.element,"class");y&&(y={className:y});b=a.div=a.div||C("div",y,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,
opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||c);d=b.style;l(a,{on:function(){h.on.apply({element:m[0].div},arguments);return a},translateXSetter:function(b,g){d.left=b+"px";a[g]=b;a.doTransform=!0},translateYSetter:function(b,g){d.top=b+"px";a[g]=b;a.doTransform=!0}});k(a,d)})}}else b=c;b.appendChild(t);h.added=!0;h.alignOnAdd&&h.htmlUpdateTransform();return h});return h}})})(K);(function(a){var D,C,G=a.createElement,H=a.css,v=a.defined,l=a.deg2rad,r=a.discardElement,w=a.doc,
q=a.each,n=a.erase,f=a.extend;D=a.extendClass;var c=a.isArray,e=a.isNumber,z=a.isObject,b=a.merge;C=a.noop;var t=a.pick,h=a.pInt,B=a.SVGElement,p=a.SVGRenderer,x=a.win;a.svg||(C={docMode8:w&&8===w.documentMode,init:function(a,b){var d=["\x3c",b,' filled\x3d"f" stroked\x3d"f"'],k=["position: ","absolute",";"],m="div"===b;("shape"===b||m)&&k.push("left:0;top:0;width:1px;height:1px;");k.push("visibility: ",m?"hidden":"visible");d.push(' style\x3d"',k.join(""),'"/\x3e');b&&(d=m||"span"===b||"img"===b?
d.join(""):a.prepVML(d),this.element=G(d));this.renderer=a},add:function(a){var b=this.renderer,d=this.element,k=b.box,m=a&&a.inverted,k=a?a.element||a:k;a&&(this.parentGroup=a);m&&b.invertChild(d,k);k.appendChild(d);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:B.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*l),d=
Math.sin(a*l);H(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",b,", M12\x3d",-d,", M21\x3d",d,", M22\x3d",b,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,d,c,m){var k=c?Math.cos(c*l):1,h=c?Math.sin(c*l):0,p=t(this.elemHeight,this.element.offsetHeight),u;this.xCorr=0>k&&-a;this.yCorr=0>h&&-p;u=0>k*h;this.xCorr+=h*b*(u?1-d:d);this.yCorr-=k*b*(c?u?d:1-d:1);m&&"left"!==m&&(this.xCorr-=a*d*(0>k?-1:1),c&&(this.yCorr-=p*d*(0>h?-1:1)),H(this.element,
{textAlign:m}))},pathToVML:function(a){for(var b=a.length,d=[];b--;)e(a[b])?d[b]=Math.round(10*a[b])-5:"Z"===a[b]?d[b]="x":(d[b]=a[b],!a.isArc||"wa"!==a[b]&&"at"!==a[b]||(d[b+5]===d[b+7]&&(d[b+7]+=a[b+7]>a[b+5]?1:-1),d[b+6]===d[b+8]&&(d[b+8]+=a[b+8]>a[b+6]?1:-1)));return d.join(" ")||"x"},clip:function(a){var b=this,d;a?(d=a.members,n(d,b),d.push(b),b.destroyClip=function(){n(d,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:b.docMode8?"inherit":"rect(auto)"});return b.css(a)},css:B.prototype.htmlCss,
safeRemoveChild:function(a){a.parentNode&&r(a)},destroy:function(){this.destroyClip&&this.destroyClip();return B.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=x.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var d;a=a.split(/[ ,]/);d=a.length;if(9===d||11===d)a[d-4]=a[d-2]=h(a[d-2])-10*b;return a.join(" ")},shadow:function(a,b,d){var c=[],k,y=this.element,p=this.renderer,E,x=y.style,g,L=y.path,e,F,B,f;L&&"string"!==typeof L.value&&(L=
"x");F=L;if(a){B=t(a.width,3);f=(a.opacity||.15)/B;for(k=1;3>=k;k++)e=2*B+1-2*k,d&&(F=this.cutOffPath(L.value,e+.5)),g=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',e,'" filled\x3d"false" path\x3d"',F,'" coordsize\x3d"10 10" style\x3d"',y.style.cssText,'" /\x3e'],E=G(p.prepVML(g),null,{left:h(x.left)+t(a.offsetX,1),top:h(x.top)+t(a.offsetY,1)}),d&&(E.cutOff=e+1),g=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',f*k,'"/\x3e'],G(p.prepVML(g),null,null,E),b?b.element.appendChild(E):
y.parentNode.insertBefore(E,y),c.push(E);this.shadows=c}return this},updateShadows:C,setAttr:function(a,b){this.docMode8?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,d){(d.getElementsByTagName("stroke")[0]||G(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,d))[b]=a||"solid";this[b]=a},dSetter:function(a,b,d){var c=this.shadows;a=a||[];this.d=a.join&&a.join(" ");d.path=a=this.pathToVML(a);if(c)for(d=
c.length;d--;)c[d].path=c[d].cutOff?this.cutOffPath(a,c[d].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,d){var c=d.nodeName;"SPAN"===c?d.style.color=a:"IMG"!==c&&(d.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,d,b,this)))},"fill-opacitySetter":function(a,b,d){G(this.renderer.prepVML(["\x3c",b.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,d)},opacitySetter:C,rotationSetter:function(a,b,d){d=d.style;this[b]=d[b]=a;d.left=-Math.round(Math.sin(a*l)+1)+"px";d.top=Math.round(Math.cos(a*
l))+"px"},strokeSetter:function(a,b,d){this.setAttr("strokecolor",this.renderer.color(a,d,b,this))},"stroke-widthSetter":function(a,b,d){d.stroked=!!a;this[b]=a;e(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,d){"inherit"===a&&(a="visible");this.shadows&&q(this.shadows,function(d){d.style[b]=a});"DIV"===d.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(d.style[b]=a?"visible":"hidden"),b="top");d.style[b]=a},xSetter:function(a,
b,d){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):d.style[b]=a},zIndexSetter:function(a,b,d){d.style[b]=a}},C["stroke-opacitySetter"]=C["fill-opacitySetter"],a.VMLElement=C=D(B,C),C.prototype.ySetter=C.prototype.widthSetter=C.prototype.heightSetter=C.prototype.xSetter,C={Element:C,isIE8:-1<x.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,d){var c,m;this.alignedObjects=[];c=this.createElement("div").css({position:"relative"});m=c.element;
a.appendChild(c.element);this.isVML=!0;this.box=m;this.boxWrapper=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,d,!1);if(!w.namespaces.hcv){w.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{w.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(y){w.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},
isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,d,c){var m=this.createElement(),k=z(a);return f(m,{members:[],count:0,left:(k?a.x:a)+1,top:(k?a.y:b)+1,width:(k?a.width:d)-1,height:(k?a.height:c)-1,getCSS:function(a){var b=a.element,d=b.nodeName,g=a.inverted,c=this.top-("shape"===d?b.offsetTop:0),m=this.left,b=m+this.width,k=c+this.height,c={clip:"rect("+Math.round(g?m:c)+"px,"+Math.round(g?k:b)+"px,"+Math.round(g?b:k)+"px,"+Math.round(g?c:m)+"px)"};!g&&a.docMode8&&"DIV"===d&&
f(c,{width:b+"px",height:k+"px"});return c},updateClipping:function(){q(m.members,function(a){a.element&&a.css(m.getCSS(a))})}})},color:function(b,c,d,h){var m=this,k,p=/^rgba/,E,x,g="none";b&&b.linearGradient?x="gradient":b&&b.radialGradient&&(x="pattern");if(x){var L,u,t=b.linearGradient||b.radialGradient,e,B,A,F,f,z="";b=b.stops;var n,l=[],w=function(){E=['\x3cfill colors\x3d"'+l.join(",")+'" opacity\x3d"',A,'" o:opacity2\x3d"',B,'" type\x3d"',x,'" ',z,'focus\x3d"100%" method\x3d"any" /\x3e'];
G(m.prepVML(E),null,null,c)};e=b[0];n=b[b.length-1];0<e[0]&&b.unshift([0,e[1]]);1>n[0]&&b.push([1,n[1]]);q(b,function(g,b){p.test(g[1])?(k=a.color(g[1]),L=k.get("rgb"),u=k.get("a")):(L=g[1],u=1);l.push(100*g[0]+"% "+L);b?(A=u,F=L):(B=u,f=L)});if("fill"===d)if("gradient"===x)d=t.x1||t[0]||0,b=t.y1||t[1]||0,e=t.x2||t[2]||0,t=t.y2||t[3]||0,z='angle\x3d"'+(90-180*Math.atan((t-b)/(e-d))/Math.PI)+'"',w();else{var g=t.r,r=2*g,v=2*g,C=t.cx,D=t.cy,H=c.radialReference,K,g=function(){H&&(K=h.getBBox(),C+=(H[0]-
K.x)/K.width-.5,D+=(H[1]-K.y)/K.height-.5,r*=H[2]/K.width,v*=H[2]/K.height);z='src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+r+","+v+'" origin\x3d"0.5,0.5" position\x3d"'+C+","+D+'" color2\x3d"'+f+'" ';w()};h.added?g():h.onAdd=g;g=F}else g=L}else p.test(b)&&"IMG"!==c.tagName?(k=a.color(b),h[d+"-opacitySetter"](k.get("a"),d,c),g=k.get("rgb")):(g=c.getElementsByTagName(d),g.length&&(g[0].opacity=1,g[0].type="solid"),g=b);return g},prepVML:function(a){var b=this.isIE8;a=a.join("");
b?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:p.prototype.html,path:function(a){var b={coordsize:"10 10"};c(a)?b.d=a:z(a)&&f(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,d){var c=this.symbol("circle");
z(a)&&(d=a.r,b=a.y,a=a.x);c.isCircle=!0;c.r=d;return c.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},image:function(a,b,d,c,m){var h=this.createElement("img").attr({src:a});1<arguments.length&&h.attr({x:b,y:d,width:c,height:m});return h},createElement:function(a){return"rect"===a?this.symbol(a):p.prototype.createElement.call(this,a)},invertChild:function(a,b){var d=this;b=b.style;var c="IMG"===a.tagName&&a.style;
H(a,{flip:"x",left:h(b.width)-(c?h(c.top):1),top:h(b.height)-(c?h(c.left):1),rotation:-90});q(a.childNodes,function(b){d.invertChild(b,a)})},symbols:{arc:function(a,b,d,c,m){var h=m.start,k=m.end,p=m.r||d||c;d=m.innerR;c=Math.cos(h);var x=Math.sin(h),g=Math.cos(k),L=Math.sin(k);if(0===k-h)return["x"];h=["wa",a-p,b-p,a+p,b+p,a+p*c,b+p*x,a+p*g,b+p*L];m.open&&!d&&h.push("e","M",a,b);h.push("at",a-d,b-d,a+d,b+d,a+d*g,b+d*L,a+d*c,b+d*x,"x","e");h.isArc=!0;return h},circle:function(a,b,d,c,m){m&&v(m.r)&&
(d=c=2*m.r);m&&m.isCircle&&(a-=d/2,b-=c/2);return["wa",a,b,a+d,b+c,a+d,b+c/2,a+d,b+c/2,"e"]},rect:function(a,b,d,c,m){return p.prototype.symbols[v(m)&&m.r?"callout":"square"].call(0,a,b,d,c,m)}}},a.VMLRenderer=D=function(){this.init.apply(this,arguments)},D.prototype=b(p.prototype,C),a.Renderer=D);p.prototype.measureSpanWidth=function(a,b){var d=w.createElement("span");a=w.createTextNode(a);d.appendChild(a);H(d,b);this.box.appendChild(d);b=d.offsetWidth;r(d);return b}})(K);(function(a){function D(){var q=
a.defaultOptions.global,n=w.moment;if(q.timezone){if(n)return function(a){return-n.tz(a,q.timezone).utcOffset()};a.error(25)}return q.useUTC&&q.getTimezoneOffset}function C(){var q=a.defaultOptions.global,n,f=q.useUTC,c=f?"getUTC":"get",e=f?"setUTC":"set";a.Date=n=q.Date||w.Date;n.hcTimezoneOffset=f&&q.timezoneOffset;n.hcGetTimezoneOffset=D();n.hcMakeTime=function(a,b,c,h,e,p){var x;f?(x=n.UTC.apply(0,arguments),x+=v(x)):x=(new n(a,b,r(c,1),r(h,0),r(e,0),r(p,0))).getTime();return x};H("Minutes Hours Day Date Month FullYear".split(" "),
function(a){n["hcGet"+a]=c+a});H("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){n["hcSet"+a]=e+a})}var G=a.color,H=a.each,v=a.getTZOffset,l=a.merge,r=a.pick,w=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),
shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.10/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},
position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},
itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,
dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:G("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(q){a.defaultOptions=l(!0,a.defaultOptions,q);C();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;C()})(K);
(function(a){var D=a.arrayMax,C=a.arrayMin,G=a.defined,H=a.destroyObjectProperties,v=a.each,l=a.erase,r=a.merge,w=a.pick;a.PlotLineOrBand=function(a,n){this.axis=a;n&&(this.options=n,this.id=n.id)};a.PlotLineOrBand.prototype={render:function(){var a=this,n=a.axis,f=n.horiz,c=a.options,e=c.label,z=a.label,b=c.to,t=c.from,h=c.value,B=G(t)&&G(b),p=G(h),x=a.svgElem,k=!x,F=[],d,u=c.color,m=w(c.zIndex,0),y=c.events,F={"class":"highcharts-plot-"+(B?"band ":"line ")+(c.className||"")},J={},E=n.chart.renderer,
I=B?"bands":"lines",g=n.log2lin;n.isLog&&(t=g(t),b=g(b),h=g(h));p?(F={stroke:u,"stroke-width":c.width},c.dashStyle&&(F.dashstyle=c.dashStyle)):B&&(u&&(F.fill=u),c.borderWidth&&(F.stroke=c.borderColor,F["stroke-width"]=c.borderWidth));J.zIndex=m;I+="-"+m;(u=n.plotLinesAndBandsGroups[I])||(n.plotLinesAndBandsGroups[I]=u=E.g("plot-"+I).attr(J).add());k&&(a.svgElem=x=E.path().attr(F).add(u));if(p)F=n.getPlotLinePath(h,x.strokeWidth());else if(B)F=n.getPlotBandPath(t,b,c);else return;if(k&&F&&F.length){if(x.attr({d:F}),
y)for(d in c=function(g){x.on(g,function(b){y[g].apply(a,[b])})},y)c(d)}else x&&(F?(x.show(),x.animate({d:F})):(x.hide(),z&&(a.label=z=z.destroy())));e&&G(e.text)&&F&&F.length&&0<n.width&&0<n.height&&!F.flat?(e=r({align:f&&B&&"center",x:f?!B&&4:10,verticalAlign:!f&&B&&"middle",y:f?B?16:10:B?6:-4,rotation:f&&!B&&90},e),this.renderLabel(e,F,B,m)):z&&z.hide();return a},renderLabel:function(a,n,f,c){var e=this.label,z=this.axis.chart.renderer;e||(e={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+
(f?"band":"line")+"-label "+(a.className||"")},e.zIndex=c,this.label=e=z.text(a.text,0,0,a.useHTML).attr(e).add(),e.css(a.style));c=[n[1],n[4],f?n[6]:n[1]];n=[n[2],n[5],f?n[7]:n[2]];f=C(c);z=C(n);e.align(a,!1,{x:f,y:z,width:D(c)-f,height:D(n)-z});e.show()},destroy:function(){l(this.axis.plotLinesAndBands,this);delete this.axis;H(this)}};a.AxisPlotLineOrBandExtension={getPlotBandPath:function(a,n){var f=this.getPlotLinePath(n,null,null,!0),c=this.getPlotLinePath(a,null,null,!0),e=this.horiz,z=1;a=
a<this.min&&n<this.min||a>this.max&&n>this.max;c&&f?(a&&(c.flat=c.toString()===f.toString(),z=0),c.push(e&&f[4]===c[4]?f[4]+z:f[4],e||f[5]!==c[5]?f[5]:f[5]+z,e&&f[1]===c[1]?f[1]+z:f[1],e||f[2]!==c[2]?f[2]:f[2]+z)):c=null;return c},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(l,n){var f=(new a.PlotLineOrBand(this,l)).render(),c=this.userOptions;f&&(n&&(c[n]=c[n]||[],c[n].push(l)),
this.plotLinesAndBands.push(f));return f},removePlotBandOrLine:function(a){for(var n=this.plotLinesAndBands,f=this.options,c=this.userOptions,e=n.length;e--;)n[e].id===a&&n[e].destroy();v([f.plotLines||[],c.plotLines||[],f.plotBands||[],c.plotBands||[]],function(c){for(e=c.length;e--;)c[e].id===a&&l(c,c[e])})}}})(K);(function(a){var D=a.correctFloat,C=a.defined,G=a.destroyObjectProperties,H=a.isNumber,v=a.merge,l=a.pick,r=a.deg2rad;a.Tick=function(a,l,n,f){this.axis=a;this.pos=l;this.type=n||"";this.isNew=
!0;n||f||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,q=a.options,n=a.chart,f=a.categories,c=a.names,e=this.pos,z=q.labels,b=a.tickPositions,t=e===b[0],h=e===b[b.length-1],c=f?l(f[e],c[e],e):e,f=this.label,b=b.info,B;a.isDatetimeAxis&&b&&(B=q.dateTimeLabelFormats[b.higherRanks[e]||b.unitName]);this.isFirst=t;this.isLast=h;q=a.labelFormatter.call({axis:a,chart:n,isFirst:t,isLast:h,dateTimeLabelFormat:B,value:a.isLog?D(a.lin2log(c)):c});C(f)?f&&f.attr({text:q}):(this.labelLength=
(this.label=f=C(q)&&z.enabled?n.renderer.text(q,0,0,z.useHTML).css(v(z.style)).add(a.labelGroup):null)&&f.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var q=this.axis,n=a.x,f=q.chart.chartWidth,c=q.chart.spacing,e=l(q.labelLeft,Math.min(q.pos,c[3])),c=l(q.labelRight,Math.max(q.pos+q.len,f-c[1])),z=this.label,b=this.rotation,t={left:0,center:.5,right:1}[q.labelAlign],h=z.getBBox().width,
B=q.getSlotWidth(),p=B,x=1,k,F={};if(b)0>b&&n-t*h<e?k=Math.round(n/Math.cos(b*r)-e):0<b&&n+t*h>c&&(k=Math.round((f-n)/Math.cos(b*r)));else if(f=n+(1-t)*h,n-t*h<e?p=a.x+p*(1-t)-e:f>c&&(p=c-a.x+p*t,x=-1),p=Math.min(B,p),p<B&&"center"===q.labelAlign&&(a.x+=x*(B-p-t*(B-Math.min(h,p)))),h>p||q.autoRotation&&(z.styles||{}).width)k=p;k&&(F.width=k,(q.options.labels.style||{}).textOverflow||(F.textOverflow="ellipsis"),z.css(F))},getPosition:function(a,l,n,f){var c=this.axis,e=c.chart,z=f&&e.oldChartHeight||
e.chartHeight;return{x:a?c.translate(l+n,null,null,f)+c.transB:c.left+c.offset+(c.opposite?(f&&e.oldChartWidth||e.chartWidth)-c.right-c.left:0),y:a?z-c.bottom+c.offset-(c.opposite?c.height:0):z-c.translate(l+n,null,null,f)-c.transB}},getLabelPosition:function(a,l,n,f,c,e,z,b){var t=this.axis,h=t.transA,B=t.reversed,p=t.staggerLines,x=t.tickRotCorr||{x:0,y:0},k=c.y;C(k)||(k=0===t.side?n.rotation?-8:-n.getBBox().height:2===t.side?x.y+8:Math.cos(n.rotation*r)*(x.y-n.getBBox(!1,0).height/2));a=a+c.x+
x.x-(e&&f?e*h*(B?-1:1):0);l=l+k-(e&&!f?e*h*(B?1:-1):0);p&&(n=z/(b||1)%p,t.opposite&&(n=p-n-1),l+=t.labelOffset/p*n);return{x:a,y:Math.round(l)}},getMarkPath:function(a,l,n,f,c,e){return e.crispLine(["M",a,l,"L",a+(c?0:-n),l+(c?n:0)],f)},renderGridLine:function(a,l,n){var f=this.axis,c=f.options,e=this.gridLine,z={},b=this.pos,t=this.type,h=f.tickmarkOffset,B=f.chart.renderer,p=t?t+"Grid":"grid",x=c[p+"LineWidth"],k=c[p+"LineColor"],c=c[p+"LineDashStyle"];e||(z.stroke=k,z["stroke-width"]=x,c&&(z.dashstyle=
c),t||(z.zIndex=1),a&&(z.opacity=0),this.gridLine=e=B.path().attr(z).addClass("highcharts-"+(t?t+"-":"")+"grid-line").add(f.gridGroup));if(!a&&e&&(a=f.getPlotLinePath(b+h,e.strokeWidth()*n,a,!0)))e[this.isNew?"attr":"animate"]({d:a,opacity:l})},renderMark:function(a,q,n){var f=this.axis,c=f.options,e=f.chart.renderer,z=this.type,b=z?z+"Tick":"tick",t=f.tickSize(b),h=this.mark,B=!h,p=a.x;a=a.y;var x=l(c[b+"Width"],!z&&f.isXAxis?1:0),c=c[b+"Color"];t&&(f.opposite&&(t[0]=-t[0]),B&&(this.mark=h=e.path().addClass("highcharts-"+
(z?z+"-":"")+"tick").add(f.axisGroup),h.attr({stroke:c,"stroke-width":x})),h[B?"attr":"animate"]({d:this.getMarkPath(p,a,t[0],h.strokeWidth()*n,f.horiz,e),opacity:q}))},renderLabel:function(a,q,n,f){var c=this.axis,e=c.horiz,z=c.options,b=this.label,t=z.labels,h=t.step,B=c.tickmarkOffset,p=!0,x=a.x;a=a.y;b&&H(x)&&(b.xy=a=this.getLabelPosition(x,a,b,e,t,B,f,h),this.isFirst&&!this.isLast&&!l(z.showFirstLabel,1)||this.isLast&&!this.isFirst&&!l(z.showLastLabel,1)?p=!1:!e||c.isRadial||t.step||t.rotation||
q||0===n||this.handleOverflow(a),h&&f%h&&(p=!1),p&&H(a.y)?(a.opacity=n,b[this.isNew?"attr":"animate"](a)):b.attr("y",-9999),this.isNew=!1)},render:function(a,q,n){var f=this.axis,c=f.horiz,e=this.getPosition(c,this.pos,f.tickmarkOffset,q),z=e.x,b=e.y,f=c&&z===f.pos+f.len||!c&&b===f.pos?-1:1;n=l(n,1);this.isActive=!0;this.renderGridLine(q,n,f);this.renderMark(e,n,f);this.renderLabel(e,q,n,a)},destroy:function(){G(this,this.axis)}}})(K);(function(a){var D=a.addEvent,C=a.animObject,G=a.arrayMax,H=a.arrayMin,
v=a.AxisPlotLineOrBandExtension,l=a.color,r=a.correctFloat,w=a.defaultOptions,q=a.defined,n=a.deg2rad,f=a.destroyObjectProperties,c=a.each,e=a.extend,z=a.fireEvent,b=a.format,t=a.getMagnitude,h=a.grep,B=a.inArray,p=a.isArray,x=a.isNumber,k=a.isString,F=a.merge,d=a.normalizeTickInterval,u=a.pick,m=a.PlotLineOrBand,y=a.removeEvent,J=a.splat,E=a.syncTimeout,I=a.Tick;a.Axis=function(){this.init.apply(this,arguments)};a.Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",
minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",
lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},
defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,b){var g=b.isX;this.chart=a;this.horiz=a.inverted?!g:g;this.isXAxis=g;this.coll=this.coll||(g?"xAxis":"yAxis");this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,c=d.type;this.labelFormatter=d.labels.formatter||
this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.reversed=d.reversed;this.visible=!1!==d.visible;this.zoomEnabled=!1!==d.zoomEnabled;this.hasNames="category"===c||!0===d.categories;this.categories=d.categories||this.hasNames;this.names=this.names||[];this.plotLinesAndBandsGroups={};this.isLog="logarithmic"===c;this.isDatetimeAxis="datetime"===c;this.positiveValuesOnly=this.isLog&&!this.allowNegativeLog;this.isLinked=q(d.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks=
{};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=u(d.crosshair,J(a.options.tooltip.crosshairs)[g?0:1],!1);var m;b=this.options.events;-1===B(this,a.axes)&&(g?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];a.inverted&&g&&void 0===this.reversed&&
(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(m in b)D(this,m,b[m]);this.lin2log=d.linearToLogConverter||this.lin2log;this.isLog&&(this.val2lin=this.log2lin,this.lin2val=this.lin2log)},setOptions:function(a){this.options=F(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],F(w[this.coll],a))},defaultLabelFormatter:function(){var g=
this.axis,d=this.value,c=g.categories,m=this.dateTimeLabelFormat,h=w.lang,k=h.numericSymbols,h=h.numericSymbolMagnitude||1E3,p=k&&k.length,y,E=g.options.labels.format,g=g.isLog?Math.abs(d):g.tickInterval;if(E)y=b(E,this);else if(c)y=d;else if(m)y=a.dateFormat(m,d);else if(p&&1E3<=g)for(;p--&&void 0===y;)c=Math.pow(h,p+1),g>=c&&0===10*d%c&&null!==k[p]&&0!==d&&(y=a.numberFormat(d/c,-1)+k[p]);void 0===y&&(y=1E4<=Math.abs(d)?a.numberFormat(d,-1):a.numberFormat(d,-1,void 0,""));return y},getSeriesExtremes:function(){var a=
this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();c(a.series,function(g){if(g.visible||!b.options.chart.ignoreHiddenSeries){var d=g.options,c=d.threshold,m;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=c&&(c=null);if(a.isXAxis)d=g.xData,d.length&&(g=H(d),x(g)||g instanceof Date||(d=h(d,function(a){return x(a)}),g=H(d)),a.dataMin=Math.min(u(a.dataMin,d[0]),g),a.dataMax=Math.max(u(a.dataMax,d[0]),G(d)));else if(g.getExtremes(),
m=g.dataMax,g=g.dataMin,q(g)&&q(m)&&(a.dataMin=Math.min(u(a.dataMin,g),g),a.dataMax=Math.max(u(a.dataMax,m),m)),q(c)&&(a.threshold=c),!d.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,b,d,c,m,h){var g=this.linkedParent||this,k=1,p=0,y=c?g.oldTransA:g.transA;c=c?g.oldMin:g.min;var L=g.minPixelPadding;m=(g.isOrdinal||g.isBroken||g.isLog&&m)&&g.lin2val;y||(y=g.transA);d&&(k*=-1,p=g.len);g.reversed&&(k*=-1,p-=k*(g.sector||g.len));b?(a=(a*k+p-L)/y+c,m&&(a=g.lin2val(a))):
(m&&(a=g.val2lin(a)),a=k*(a-c)*y+p+k*L+(x(h)?y*h:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,d,c,m){var g=this.chart,h=this.left,k=this.top,y,p,L=d&&g.oldChartHeight||g.chartHeight,E=d&&g.oldChartWidth||g.chartWidth,t;y=this.transB;var e=function(a,b,g){if(a<b||a>g)c?a=Math.min(Math.max(b,a),g):t=!0;return a};m=u(m,this.translate(a,
null,null,d));a=d=Math.round(m+y);y=p=Math.round(L-m-y);x(m)?this.horiz?(y=k,p=L-this.bottom,a=d=e(a,h,h+this.width)):(a=h,d=E-this.right,y=p=e(y,k,k+this.height)):t=!0;return t&&!c?null:g.renderer.crispLine(["M",a,y,"L",d,p],b||1)},getLinearTickPositions:function(a,b,d){var g,c=r(Math.floor(b/a)*a);d=r(Math.ceil(d/a)*a);var m=[];if(this.single)return[b];for(b=c;b<=d;){m.push(b);b=r(b+a);if(b===g)break;g=b}return m},getMinorTickPositions:function(){var a=this,b=a.options,d=a.tickPositions,m=a.minorTickInterval,
h=[],k=a.pointRangePadding||0,y=a.min-k,k=a.max+k,p=k-y;if(p&&p/m<a.len/3)if(a.isLog)c(this.paddedTicks,function(b,g,d){g&&h.push.apply(h,a.getLogTickPositions(m,d[g-1],d[g],!0))});else if(a.isDatetimeAxis&&"auto"===b.minorTickInterval)h=h.concat(a.getTimeTicks(a.normalizeTimeTickInterval(m),y,k,b.startOfWeek));else for(b=y+(d[0]-y)%m;b<=k&&b!==h[0];b+=m)h.push(b);0!==h.length&&a.trimTicks(h);return h},adjustForMinRange:function(){var a=this.options,b=this.min,d=this.max,m,h=this.dataMax-this.dataMin>=
this.minRange,k,y,p,E,x,t;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(q(a.min)||q(a.max)?this.minRange=null:(c(this.series,function(a){E=a.xData;for(y=x=a.xIncrement?1:E.length-1;0<y;y--)if(p=E[y]-E[y-1],void 0===k||p<k)k=p}),this.minRange=Math.min(5*k,this.dataMax-this.dataMin)));d-b<this.minRange&&(t=this.minRange,m=(t-d+b)/2,m=[b-m,u(a.min,b-m)],h&&(m[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=G(m),d=[b+t,u(a.max,b+t)],h&&(d[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),
d=H(d),d-b<t&&(m[0]=d-t,m[1]=u(a.min,d-t),b=G(m)));this.min=b;this.max=d},getClosest:function(){var a;this.categories?a=1:c(this.series,function(b){var g=b.closestPointRange,d=b.visible||!b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip&&q(g)&&d&&(a=q(a)?Math.min(a,g):g)});return a},nameToX:function(a){var b=p(this.categories),g=b?this.categories:this.names,d=a.options.x,c;a.series.requireSorting=!1;q(d)||(d=!1===this.options.uniqueNames?a.series.autoIncrement():B(a.name,g));-1===d?b||
(c=g.length):c=d;void 0!==c&&(this.names[c]=a.name);return c},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=void 0,c(this.series||[],function(b){b.xIncrement=null;if(!b.points||b.isDirtyData)b.processData(),b.generatePoints();c(b.points,function(g,d){var c;g.options&&(c=a.nameToX(g),void 0!==c&&c!==g.x&&(g.x=c,b.xData[d]=c))})}))},setAxisTranslation:function(a){var b=this,g=b.max-b.min,d=b.axisPointRange||0,m,h=0,y=0,p=b.linkedParent,E=!!b.categories,x=
b.transA,t=b.isXAxis;if(t||E||d)m=b.getClosest(),p?(h=p.minPointOffset,y=p.pointRangePadding):c(b.series,function(a){var g=E?1:t?u(a.options.pointRange,m,0):b.axisPointRange||0;a=a.options.pointPlacement;d=Math.max(d,g);b.single||(h=Math.max(h,k(a)?0:g/2),y=Math.max(y,"on"===a?0:g))}),p=b.ordinalSlope&&m?b.ordinalSlope/m:1,b.minPointOffset=h*=p,b.pointRangePadding=y*=p,b.pointRange=Math.min(d,g),t&&(b.closestPointRange=m);a&&(b.oldTransA=x);b.translationSlope=b.transA=x=b.options.staticScale||b.len/
(g+y||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=x*h},minFromRange:function(){return this.max-this.range},setTickInterval:function(b){var g=this,m=g.chart,h=g.options,k=g.isLog,y=g.log2lin,p=g.isDatetimeAxis,E=g.isXAxis,e=g.isLinked,I=h.maxPadding,B=h.minPadding,f=h.tickInterval,F=h.tickPixelInterval,J=g.categories,l=g.threshold,n=g.softThreshold,w,v,C,D;p||J||e||this.getTickAmount();C=u(g.userMin,h.min);D=u(g.userMax,h.max);e?(g.linkedParent=m[g.coll][h.linkedTo],m=g.linkedParent.getExtremes(),
g.min=u(m.min,m.dataMin),g.max=u(m.max,m.dataMax),h.type!==g.linkedParent.options.type&&a.error(11,1)):(!n&&q(l)&&(g.dataMin>=l?(w=l,B=0):g.dataMax<=l&&(v=l,I=0)),g.min=u(C,w,g.dataMin),g.max=u(D,v,g.dataMax));k&&(g.positiveValuesOnly&&!b&&0>=Math.min(g.min,u(g.dataMin,g.min))&&a.error(10,1),g.min=r(y(g.min),15),g.max=r(y(g.max),15));g.range&&q(g.max)&&(g.userMin=g.min=C=Math.max(g.min,g.minFromRange()),g.userMax=D=g.max,g.range=null);z(g,"foundExtremes");g.beforePadding&&g.beforePadding();g.adjustForMinRange();
!(J||g.axisPointRange||g.usePercentage||e)&&q(g.min)&&q(g.max)&&(y=g.max-g.min)&&(!q(C)&&B&&(g.min-=y*B),!q(D)&&I&&(g.max+=y*I));x(h.softMin)&&(g.min=Math.min(g.min,h.softMin));x(h.softMax)&&(g.max=Math.max(g.max,h.softMax));x(h.floor)&&(g.min=Math.max(g.min,h.floor));x(h.ceiling)&&(g.max=Math.min(g.max,h.ceiling));n&&q(g.dataMin)&&(l=l||0,!q(C)&&g.min<l&&g.dataMin>=l?g.min=l:!q(D)&&g.max>l&&g.dataMax<=l&&(g.max=l));g.tickInterval=g.min===g.max||void 0===g.min||void 0===g.max?1:e&&!f&&F===g.linkedParent.options.tickPixelInterval?
f=g.linkedParent.tickInterval:u(f,this.tickAmount?(g.max-g.min)/Math.max(this.tickAmount-1,1):void 0,J?1:(g.max-g.min)*F/Math.max(g.len,F));E&&!b&&c(g.series,function(a){a.processData(g.min!==g.oldMin||g.max!==g.oldMax)});g.setAxisTranslation(!0);g.beforeSetTickPositions&&g.beforeSetTickPositions();g.postProcessTickInterval&&(g.tickInterval=g.postProcessTickInterval(g.tickInterval));g.pointRange&&!f&&(g.tickInterval=Math.max(g.pointRange,g.tickInterval));b=u(h.minTickInterval,g.isDatetimeAxis&&g.closestPointRange);
!f&&g.tickInterval<b&&(g.tickInterval=b);p||k||f||(g.tickInterval=d(g.tickInterval,null,t(g.tickInterval),u(h.allowDecimals,!(.5<g.tickInterval&&5>g.tickInterval&&1E3<g.max&&9999>g.max)),!!this.tickAmount));this.tickAmount||(g.tickInterval=g.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,d=a.tickPositions,c=a.tickPositioner,m=a.startOnTick,h=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval=
"auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.single=this.min===this.max&&q(this.min)&&!this.tickAmount&&!1!==a.allowDecimals;this.tickPositions=b=d&&d.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,
this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,c&&(c=c.apply(this,[this.min,this.max])))&&(this.tickPositions=b=c);this.paddedTicks=b.slice(0);this.trimTicks(b,m,h);this.isLinked||(this.single&&(this.min-=.5,this.max+=.5),d||c||this.adjustTickAmount())},trimTicks:function(a,b,d){var g=a[0],c=a[a.length-1],m=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==g)this.min=g;else for(;this.min-m>a[0];)a.shift();if(d)this.max=c;else for(;this.max+m<a[a.length-1];)a.pop();
0===a.length&&q(g)&&a.push((c+g)/2)}},alignToOthers:function(){var a={},b,d=this.options;!1===this.chart.options.chart.alignTicks||!1===d.alignTicks||this.isLog||c(this.chart[this.coll],function(g){var d=g.options,d=[g.horiz?d.left:d.top,d.width,d.height,d.pane].join();g.series.length&&(a[d]?b=!0:a[d]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,d=a.tickPixelInterval;!q(a.tickInterval)&&this.len<d&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&
(b=Math.ceil(this.len/d)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,d=this.tickAmount,c=this.finalTickAmt,m=b&&b.length;if(m<d){for(;b.length<d;)b.push(r(b[b.length-1]+a));this.transA*=(m-1)/(d-1);this.max=b[b.length-1]}else m>d&&(this.tickInterval*=2,this.setTickPositions());if(q(c)){for(a=d=b.length;a--;)(3===c&&1===a%2||2>=c&&0<a&&a<d-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,b;this.oldMin=
this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;c(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=
b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,d,m,h){var g=this,k=g.chart;d=u(d,!0);c(g.series,function(a){delete a.kdTree});h=e(h,{min:a,max:b});z(g,"setExtremes",h,function(){g.userMin=a;g.userMax=b;g.eventArgs=h;d&&k.redraw(m)})},zoom:function(a,b){var g=this.dataMin,d=this.dataMax,c=this.options,m=Math.min(g,u(c.min,g)),c=Math.max(d,u(c.max,d));if(a!==this.min||b!==this.max)this.allowZoomOutside||(q(g)&&(a<m&&(a=m),a>c&&(a=c)),
q(d)&&(b<m&&(b=m),b>c&&(b=c))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,d=b.offsets||[0,0,0,0],c=this.horiz,m=u(b.width,a.plotWidth-d[3]+d[1]),h=u(b.height,a.plotHeight-d[0]+d[2]),k=u(b.top,a.plotTop+d[0]),b=u(b.left,a.plotLeft+d[3]),d=/%$/;d.test(h)&&(h=Math.round(parseFloat(h)/100*a.plotHeight));d.test(k)&&(k=Math.round(parseFloat(k)/100*a.plotHeight+a.plotTop));this.left=b;this.top=k;
this.width=m;this.height=h;this.bottom=a.chartHeight-h-k;this.right=a.chartWidth-m-b;this.len=Math.max(c?m:h,0);this.pos=c?b:k},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?r(b(this.min)):this.min,max:a?r(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,g=this.lin2log,d=b?g(this.min):this.min,b=b?g(this.max):this.max;null===a?a=d:d>a?a=d:b<a&&(a=b);return this.translate(a,0,
1,0,1)},autoLabelAlign:function(a){a=(u(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,g=b[a+"Length"],d=u(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(d&&g)return"inside"===b[a+"Position"]&&(g=-g),[g,d]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,
d=this.tickInterval,m=d,h=this.len/(((this.categories?1:0)+this.max-this.min)/d),k,y=a.rotation,p=this.labelMetrics(),E,x=Number.MAX_VALUE,t,e=function(a){a/=h||1;a=1<a?Math.ceil(a):1;return a*d};b?(t=!a.staggerLines&&!a.step&&(q(y)?[y]:h<u(a.autoRotationLimit,80)&&a.autoRotation))&&c(t,function(a){var b;if(a===y||a&&-90<=a&&90>=a)E=e(Math.abs(p.h/Math.sin(n*a))),b=E+Math.abs(a/360),b<x&&(x=b,k=a,m=E)}):a.step||(m=e(p.h));this.autoRotation=t;this.labelRotation=u(k,y);return m},getSlotWidth:function(){var a=
this.chart,b=this.horiz,d=this.options.labels,c=Math.max(this.tickPositions.length-(this.categories?0:1),1),m=a.margin[3];return b&&2>(d.step||0)&&!d.rotation&&(this.staggerLines||1)*this.len/c||!b&&(m&&m-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,d=this.tickPositions,m=this.ticks,h=this.options.labels,y=this.horiz,p=this.getSlotWidth(),E=Math.max(1,Math.round(p-2*(h.padding||5))),t={},x=this.labelMetrics(),e=h.style&&h.style.textOverflow,u,I=0,B,f;k(h.rotation)||
(t.rotation=h.rotation||0);c(d,function(a){(a=m[a])&&a.labelLength>I&&(I=a.labelLength)});this.maxLabelLength=I;if(this.autoRotation)I>E&&I>x.h?t.rotation=this.labelRotation:this.labelRotation=0;else if(p&&(u={width:E+"px"},!e))for(u.textOverflow="clip",B=d.length;!y&&B--;)if(f=d[B],E=m[f].label)E.styles&&"ellipsis"===E.styles.textOverflow?E.css({textOverflow:"clip"}):m[f].labelLength>p&&E.css({width:p+"px"}),E.getBBox().height>this.len/d.length-(x.h-x.f)&&(E.specCss={textOverflow:"ellipsis"});t.rotation&&
(u={width:(I>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},e||(u.textOverflow="ellipsis"));if(this.labelAlign=h.align||this.autoLabelAlign(this.labelRotation))t.align=this.labelAlign;c(d,function(a){var b=(a=m[a])&&a.label;b&&(b.attr(t),u&&b.css(F(u,b.specCss)),delete b.specCss,a.rotation=t.rotation)});this.tickRotCorr=b.rotCorr(x.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||q(this.min)&&q(this.max)&&!!this.tickPositions},addTitle:function(a){var b=
this.chart.renderer,g=this.horiz,d=this.opposite,c=this.options.title,m;this.axisTitle||((m=c.textAlign)||(m=(g?{low:"left",middle:"center",high:"right"}:{low:d?"right":"left",middle:"center",high:d?"left":"right"})[c.align]),this.axisTitle=b.text(c.text,0,0,c.useHTML).attr({zIndex:7,rotation:c.rotation||0,align:m}).addClass("highcharts-axis-title").css(c.style).add(this.axisGroup),this.axisTitle.isNew=!0);this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():
b[a]=new I(this,a)},getOffset:function(){var a=this,b=a.chart,d=b.renderer,m=a.options,h=a.tickPositions,k=a.ticks,y=a.horiz,p=a.side,E=b.inverted?[1,0,3,2][p]:p,t,x,e=0,I,B=0,f=m.title,z=m.labels,F=0,J=b.axisOffset,b=b.clipOffset,l=[-1,1,1,-1][p],n,r=m.className,w=a.axisParent,v=this.tickSize("tick");t=a.hasData();a.showAxis=x=t||u(m.showEmpty,!0);a.staggerLines=a.horiz&&z.staggerLines;a.axisGroup||(a.gridGroup=d.g("grid").attr({zIndex:m.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+
"-grid "+(r||"")).add(w),a.axisGroup=d.g("axis").attr({zIndex:m.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(r||"")).add(w),a.labelGroup=d.g("axis-labels").attr({zIndex:z.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(r||"")).add(w));if(t||a.isLinked)c(h,function(b,g){a.generateTick(b,g)}),a.renderUnsquish(),!1===z.reserveSpace||0!==p&&2!==p&&{1:"left",3:"right"}[p]!==a.labelAlign&&"center"!==a.labelAlign||c(h,function(a){F=Math.max(k[a].getLabelSize(),F)}),
a.staggerLines&&(F*=a.staggerLines,a.labelOffset=F*(a.opposite?-1:1));else for(n in k)k[n].destroy(),delete k[n];f&&f.text&&!1!==f.enabled&&(a.addTitle(x),x&&(e=a.axisTitle.getBBox()[y?"height":"width"],I=f.offset,B=q(I)?0:u(f.margin,y?5:10)));a.renderLine();a.offset=l*u(m.offset,J[p]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};d=0===p?-a.labelMetrics().h:2===p?a.tickRotCorr.y:0;B=Math.abs(F)+B;F&&(B=B-d+l*(y?u(z.y,a.tickRotCorr.y+8*l):z.x));a.axisTitleMargin=u(I,B);J[p]=Math.max(J[p],a.axisTitleMargin+
e+l*a.offset,B,t&&h.length&&v?v[0]+l*a.offset:0);m=m.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[E]=Math.max(b[E],m)},getLinePath:function(a){var b=this.chart,g=this.opposite,d=this.offset,c=this.horiz,m=this.left+(g?this.width:0)+d,d=b.chartHeight-this.bottom-(g?this.height:0)+d;g&&(a*=-1);return b.renderer.crispLine(["M",c?this.left:m,c?d:this.top,"L",c?b.chartWidth-this.right:m,c?d:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,d=this.top,c=this.len,m=this.options.title,h=a?b:d,k=this.opposite,y=this.offset,p=m.x||0,E=m.y||0,t=this.chart.renderer.fontMetrics(m.style&&m.style.fontSize,this.axisTitle).f,c={low:h+(a?0:c),middle:h+c/2,high:h+(a?c:0)}[m.align],b=(a?d+this.height:b)+(a?1:-1)*(k?-1:1)*this.axisTitleMargin+(2===this.side?t:0);return{x:a?c+p:b+(k?this.width:
0)+y+p,y:a?b+E-(k?this.height:0)+y:c+E}},renderMinorTick:function(a){var b=this.chart.hasRendered&&x(this.oldMin),g=this.minorTicks;g[a]||(g[a]=new I(this,a,"minor"));b&&g[a].isNew&&g[a].render(null,!0);g[a].render(null,!1,1)},renderTick:function(a,b){var g=this.isLinked,d=this.ticks,c=this.chart.hasRendered&&x(this.oldMin);if(!g||a>=this.min&&a<=this.max)d[a]||(d[a]=new I(this,a)),c&&d[a].isNew&&d[a].render(b,!0,.1),d[a].render(b)},render:function(){var a=this,b=a.chart,d=a.options,h=a.isLog,k=a.lin2log,
y=a.isLinked,p=a.tickPositions,t=a.axisTitle,x=a.ticks,e=a.minorTicks,u=a.alternateBands,B=d.stackLabels,f=d.alternateGridColor,z=a.tickmarkOffset,F=a.axisLine,J=a.showAxis,l=C(b.renderer.globalAnimation),n,q;a.labelEdge.length=0;a.overlap=!1;c([x,e,u],function(a){for(var b in a)a[b].isActive=!1});if(a.hasData()||y)a.minorTickInterval&&!a.categories&&c(a.getMinorTickPositions(),function(b){a.renderMinorTick(b)}),p.length&&(c(p,function(b,d){a.renderTick(b,d)}),z&&(0===a.min||a.single)&&(x[-1]||(x[-1]=
new I(a,-1,null,!0)),x[-1].render(-1))),f&&c(p,function(d,g){q=void 0!==p[g+1]?p[g+1]+z:a.max-z;0===g%2&&d<a.max&&q<=a.max+(b.polar?-z:z)&&(u[d]||(u[d]=new m(a)),n=d+z,u[d].options={from:h?k(n):n,to:h?k(q):q,color:f},u[d].render(),u[d].isActive=!0)}),a._addedPlotLB||(c((d.plotLines||[]).concat(d.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0);c([x,e,u],function(a){var d,g,c=[],m=l.duration;for(d in a)a[d].isActive||(a[d].render(d,!1,0),a[d].isActive=!1,c.push(d));E(function(){for(g=
c.length;g--;)a[c[g]]&&!a[c[g]].isActive&&(a[c[g]].destroy(),delete a[c[g]])},a!==u&&b.hasRendered&&m?m:0)});F&&(F[F.isPlaced?"animate":"attr"]({d:this.getLinePath(F.strokeWidth())}),F.isPlaced=!0,F[J?"show":"hide"](!0));t&&J&&(t[t.isNew?"attr":"animate"](a.getTitlePosition()),t.isNew=!1);B&&B.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),c(this.plotLinesAndBands,function(a){a.render()}));c(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),
destroy:function(a){var b=this,d=b.stacks,g,m=b.plotLinesAndBands,h,k;a||y(b);for(g in d)f(d[g]),d[g]=null;c([b.ticks,b.minorTicks,b.alternateBands],function(a){f(a)});if(m)for(a=m.length;a--;)m[a].destroy();c("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){b[a]&&(b[a]=b[a].destroy())});for(h in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[h]=b.plotLinesAndBandsGroups[h].destroy();for(k in b)b.hasOwnProperty(k)&&-1===B(k,b.keepProps)&&delete b[k]},
drawCrosshair:function(a,b){var d,g=this.crosshair,c=u(g.snap,!0),m,h=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(q(b)||!c)?(c?q(b)&&(m=this.isXAxis?b.plotX:this.len-b.plotY):m=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),q(m)&&(d=this.getPlotLinePath(b&&(this.isXAxis?b.x:u(b.stackY,b.y)),null,null,null,m)||null),q(d)?(b=this.categories&&!this.isRadial,h||(this.cross=h=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":
"thin ")+g.className).attr({zIndex:u(g.zIndex,2)}).add(),h.attr({stroke:g.color||(b?l("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":u(g.width,1)}),g.dashStyle&&h.attr({dashstyle:g.dashStyle})),h.show().attr({d:d}),b&&!g.width&&h.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}};e(a.Axis.prototype,v)})(K);(function(a){var D=a.Axis,C=a.Date,G=a.dateFormat,H=a.defaultOptions,v=a.defined,
l=a.each,r=a.extend,w=a.getMagnitude,q=a.getTZOffset,n=a.normalizeTickInterval,f=a.pick,c=a.timeUnits;D.prototype.getTimeTicks=function(a,z,b,t){var h=[],e={},p=H.global.useUTC,x,k=new C(z-Math.abs(q(z))),F=C.hcMakeTime,d=a.unitRange,u=a.count,m;if(v(z)){k[C.hcSetMilliseconds](d>=c.second?0:u*Math.floor(k.getMilliseconds()/u));if(d>=c.second)k[C.hcSetSeconds](d>=c.minute?0:u*Math.floor(k.getSeconds()/u));if(d>=c.minute)k[C.hcSetMinutes](d>=c.hour?0:u*Math.floor(k[C.hcGetMinutes]()/u));if(d>=c.hour)k[C.hcSetHours](d>=
c.day?0:u*Math.floor(k[C.hcGetHours]()/u));if(d>=c.day)k[C.hcSetDate](d>=c.month?1:u*Math.floor(k[C.hcGetDate]()/u));d>=c.month&&(k[C.hcSetMonth](d>=c.year?0:u*Math.floor(k[C.hcGetMonth]()/u)),x=k[C.hcGetFullYear]());if(d>=c.year)k[C.hcSetFullYear](x-x%u);if(d===c.week)k[C.hcSetDate](k[C.hcGetDate]()-k[C.hcGetDay]()+f(t,1));x=k[C.hcGetFullYear]();t=k[C.hcGetMonth]();var y=k[C.hcGetDate](),J=k[C.hcGetHours]();if(C.hcTimezoneOffset||C.hcGetTimezoneOffset)m=(!p||!!C.hcGetTimezoneOffset)&&(b-z>4*c.month||
q(z)!==q(b)),k=k.getTime(),k=new C(k+q(k));p=k.getTime();for(z=1;p<b;)h.push(p),p=d===c.year?F(x+z*u,0):d===c.month?F(x,t+z*u):!m||d!==c.day&&d!==c.week?m&&d===c.hour?F(x,t,y,J+z*u):p+d*u:F(x,t,y+z*u*(d===c.day?1:7)),z++;h.push(p);d<=c.hour&&1E4>h.length&&l(h,function(a){0===a%18E5&&"000000000"===G("%H%M%S%L",a)&&(e[a]="day")})}h.info=r(a,{higherRanks:e,totalRange:d*u});return h};D.prototype.normalizeTimeTickInterval=function(a,f){var b=f||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",
[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];f=b[b.length-1];var t=c[f[0]],h=f[1],e;for(e=0;e<b.length&&!(f=b[e],t=c[f[0]],h=f[1],b[e+1]&&a<=(t*h[h.length-1]+c[b[e+1][0]])/2);e++);t===c.year&&a<5*t&&(h=[1,2,5]);a=n(a/t,h,"year"===f[0]?Math.max(w(a/t),1):1);return{unitRange:t,count:a,unitName:f[0]}}})(K);(function(a){var D=a.Axis,C=a.getMagnitude,G=a.map,H=a.normalizeTickInterval,v=a.pick;D.prototype.getLogTickPositions=
function(a,r,w,q){var n=this.options,f=this.len,c=this.lin2log,e=this.log2lin,z=[];q||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),z=this.getLinearTickPositions(a,r,w);else if(.08<=a)for(var f=Math.floor(r),b,t,h,B,p,n=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<w+1&&!p;f++)for(t=n.length,b=0;b<t&&!p;b++)h=e(c(f)*n[b]),h>r&&(!q||B<=w)&&void 0!==B&&z.push(B),B>w&&(p=!0),B=h;else r=c(r),w=c(w),a=n[q?"minorTickInterval":"tickInterval"],a=v("auto"===a?null:a,this._minorAutoInterval,
n.tickPixelInterval/(q?5:1)*(w-r)/((q?f/this.tickPositions.length:f)||1)),a=H(a,null,C(a)),z=G(this.getLinearTickPositions(a,r,w),e),q||(this._minorAutoInterval=a/5);q||(this.tickInterval=a);return z};D.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};D.prototype.lin2log=function(a){return Math.pow(10,a)}})(K);(function(a){var D=a.dateFormat,C=a.each,G=a.extend,H=a.format,v=a.isNumber,l=a.map,r=a.merge,w=a.pick,q=a.splat,n=a.syncTimeout,f=a.timeUnits;a.Tooltip=function(){this.init.apply(this,
arguments)};a.Tooltip.prototype={init:function(a,e){this.chart=a;this.options=e;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=e.split&&!a.inverted;this.shared=e.shared||this.split},cleanSplit:function(a){C(this.chart.series,function(c){var e=c&&c.tt;e&&(!e.isActive||a?c.tt=e.destroy():e.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,e=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,e.shape||"callout",null,null,e.useHTML,
null,"tooltip").attr({padding:e.padding,r:e.borderRadius}),this.label.attr({fill:e.backgroundColor,"stroke-width":e.borderWidth}).css(e.style).shadow(e.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();this.init(this.chart,r(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},
move:function(a,e,f,b){var c=this,h=c.now,B=!1!==c.options.animation&&!c.isHidden&&(1<Math.abs(a-h.x)||1<Math.abs(e-h.y)),p=c.followPointer||1<c.len;G(h,{x:B?(2*h.x+a)/3:a,y:B?(h.y+e)/2:e,anchorX:p?void 0:B?(2*h.anchorX+f)/3:f,anchorY:p?void 0:B?(h.anchorY+b)/2:b});c.getLabel().attr(h);B&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){c&&c.move(a,e,f,b)},32))},hide:function(a){var c=this;clearTimeout(this.hideTimer);a=w(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=
n(function(){c.getLabel()[a?"fadeOut":"hide"]();c.isHidden=!0},a))},getAnchor:function(a,e){var c,b=this.chart,t=b.inverted,h=b.plotTop,f=b.plotLeft,p=0,x=0,k,F;a=q(a);c=a[0].tooltipPos;this.followPointer&&e&&(void 0===e.chartX&&(e=b.pointer.normalize(e)),c=[e.chartX-b.plotLeft,e.chartY-h]);c||(C(a,function(a){k=a.series.yAxis;F=a.series.xAxis;p+=a.plotX+(!t&&F?F.left-f:0);x+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!t&&k?k.top-h:0)}),p/=a.length,x/=a.length,c=[t?b.plotWidth-x:p,this.shared&&
!t&&1<a.length&&e?e.chartY-h:t?b.plotHeight-p:x]);return l(c,Math.round)},getPosition:function(a,e,f){var b=this.chart,c=this.distance,h={},B=f.h||0,p,x=["y",b.chartHeight,e,f.plotY+b.plotTop,b.plotTop,b.plotTop+b.plotHeight],k=["x",b.chartWidth,a,f.plotX+b.plotLeft,b.plotLeft,b.plotLeft+b.plotWidth],F=!this.followPointer&&w(f.ttBelow,!b.inverted===!!f.negative),d=function(a,b,d,g,m,k){var p=d<g-c,y=g+c+d<b,E=g-c-d;g+=c;if(F&&y)h[a]=g;else if(!F&&p)h[a]=E;else if(p)h[a]=Math.min(k-d,0>E-B?E:E-B);
else if(y)h[a]=Math.max(m,g+B+d>b?g:g+B);else return!1},u=function(a,b,d,g){var m;g<c||g>b-c?m=!1:h[a]=g<d/2?1:g>b-d/2?b-d-2:g-d/2;return m},m=function(a){var b=x;x=k;k=b;p=a},y=function(){!1!==d.apply(0,x)?!1!==u.apply(0,k)||p||(m(!0),y()):p?h.x=h.y=0:(m(!0),y())};(b.inverted||1<this.len)&&m();y();return h},defaultFormatter:function(a){var c=this.points||q(this),f;f=[a.tooltipFooterHeaderFormatter(c[0])];f=f.concat(a.bodyFormatter(c));f.push(a.tooltipFooterHeaderFormatter(c[0],!0));return f},refresh:function(a,
e){var c,b=this.options,t,h=a,f,p={},x=[];c=b.formatter||this.defaultFormatter;var p=this.shared,k;clearTimeout(this.hideTimer);this.followPointer=q(h)[0].series.tooltipOptions.followPointer;f=this.getAnchor(h,e);e=f[0];t=f[1];!p||h.series&&h.series.noSharedTooltip?p=h.getLabelConfig():(C(h,function(a){a.setState("hover");x.push(a.getLabelConfig())}),p={x:h[0].category,y:h[0].y},p.points=x,h=h[0]);this.len=x.length;p=c.call(p,this);k=h.series;this.distance=w(k.tooltipOptions.distance,16);!1===p?this.hide():
(c=this.getLabel(),this.isHidden&&c.attr({opacity:1}).show(),this.split?this.renderSplit(p,a):(c.attr({text:p&&p.join?p.join(""):p}),c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+w(h.colorIndex,k.colorIndex)),c.attr({stroke:b.borderColor||h.color||k.color||"#666666"}),this.updatePosition({plotX:e,plotY:t,negative:h.negative,ttBelow:h.ttBelow,h:f[2]||0})),this.isHidden=!1)},renderSplit:function(c,e){var f=this,b=[],t=this.chart,h=t.renderer,B=!0,p=this.options,x,k=this.getLabel();
C(c.slice(0,e.length+1),function(a,d){d=e[d-1]||{isHeader:!0,plotX:e[0].plotX};var c=d.series||f,m=c.tt,y=d.series||{},F="highcharts-color-"+w(d.colorIndex,y.colorIndex,"none");m||(c.tt=m=h.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+F).attr({padding:p.padding,r:p.borderRadius,fill:p.backgroundColor,stroke:d.color||y.color||"#333333","stroke-width":p.borderWidth}).add(k));m.isActive=!0;m.attr({text:a});m.css(p.style);a=m.getBBox();y=a.width+m.strokeWidth();d.isHeader?(x=a.height,
y=Math.max(0,Math.min(d.plotX+t.plotLeft-y/2,t.chartWidth-y))):y=d.plotX+t.plotLeft-w(p.distance,16)-y;0>y&&(B=!1);a=(d.series&&d.series.yAxis&&d.series.yAxis.pos)+(d.plotY||0);a-=t.plotTop;b.push({target:d.isHeader?t.plotHeight+x:a,rank:d.isHeader?1:0,size:c.tt.getBBox().height+1,point:d,x:y,tt:m})});this.cleanSplit();a.distribute(b,t.plotHeight+x);C(b,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:B||b.isHeader?a.x:b.plotX+t.plotLeft+w(p.distance,
16),y:a.pos+t.plotTop,anchorX:b.isHeader?b.plotX+t.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+t.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var c=this.chart,f=this.getLabel(),f=(this.options.positioner||this.getPosition).call(this,f.width,f.height,a);this.move(Math.round(f.x),Math.round(f.y||0),a.plotX+c.plotLeft,a.plotY+c.plotTop)},getDateFormat:function(a,e,z,b){var c=D("%m-%d %H:%M:%S.%L",e),h,B,p={millisecond:15,second:12,minute:9,hour:6,day:3},x="millisecond";for(B in f){if(a===
f.week&&+D("%w",e)===z&&"00:00:00.000"===c.substr(6)){B="week";break}if(f[B]>a){B=x;break}if(p[B]&&c.substr(p[B])!=="01-01 00:00:00.000".substr(p[B]))break;"week"!==B&&(x=B)}B&&(h=b[B]);return h},getXDateFormat:function(a,e,f){e=e.dateTimeLabelFormats;var b=f&&f.closestPointRange;return(b?this.getDateFormat(b,a.x,f.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(a,e){var c=e?"footer":"header";e=a.series;var b=e.tooltipOptions,t=b.xDateFormat,h=e.xAxis,f=h&&"datetime"===
h.options.type&&v(a.key),c=b[c+"Format"];f&&!t&&(t=this.getXDateFormat(a,b,h));f&&t&&(c=c.replace("{point.key}","{point.key:"+t+"}"));return H(c,{point:a,series:e})},bodyFormatter:function(a){return l(a,function(a){var c=a.series.tooltipOptions;return(c.pointFormatter||a.point.tooltipFormatter).call(a.point,c.pointFormat)})}}})(K);(function(a){var D=a.addEvent,C=a.attr,G=a.charts,H=a.color,v=a.css,l=a.defined,r=a.doc,w=a.each,q=a.extend,n=a.fireEvent,f=a.offset,c=a.pick,e=a.removeEvent,z=a.splat,
b=a.Tooltip,t=a.win;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,t){this.options=t;this.chart=a;this.runChartClick=t.chart.events&&!!t.chart.events.click;this.pinchDown=[];this.lastValidTouch={};b&&t.tooltip.enabled&&(a.tooltip=new b(a,t.tooltip),this.followTouchMove=c(t.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,h=b.options.chart,x=h.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(x=c(h.pinchType,x));this.zoomX=a=/x/.test(x);
this.zoomY=x=/y/.test(x);this.zoomHor=a&&!b||x&&b;this.zoomVert=x&&!b||a&&b;this.hasZoom=a||x},normalize:function(a,b){var c,h;a=a||t.event;a.target||(a.target=a.srcElement);h=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=f(this.chart.container));void 0===h.pageX?(c=Math.max(a.x,a.clientX-b.left),b=a.y):(c=h.pageX-b.left,b=h.pageY-b.top);return q(a,{chartX:Math.round(c),chartY:Math.round(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};w(this.chart.axes,
function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},getKDPoints:function(a,b,p){var h=[],k,t,d;w(a,function(a){k=a.noSharedTooltip&&b;t=!b&&a.directTouch;a.visible&&!t&&c(a.options.enableMouseTracking,!0)&&(d=a.searchPoint(p,!k&&0>a.options.findNearestPointBy.indexOf("y")))&&d.series&&h.push(d)});h.sort(function(a,d){var c=a.distX-d.distX,m=a.dist-d.dist,h=(d.series.group&&d.series.group.zIndex)-(a.series.group&&a.series.group.zIndex);
return 0!==c&&b?c:0!==m?m:0!==h?h:a.series.index>d.series.index?-1:1});if(b&&h[0]&&!h[0].series.noSharedTooltip)for(a=h.length;a--;)(h[a].x!==h[0].x||h[a].series.noSharedTooltip)&&h.splice(a,1);return h},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getHoverData:function(b,t,p,x,k,e){var d=b,h=t,m;x?k?(m=[],w(p,function(a){var b=a.noSharedTooltip&&k,h=!k&&a.directTouch;a.visible&&!b&&!h&&c(a.options.enableMouseTracking,!0)&&(a=a.searchKDTree({clientX:d.clientX,
plotY:d.plotY},!b&&1===a.kdDimensions))&&a.series&&m.push(a)}),0===m.length&&(m=[d])):m=[d]:h&&!h.stickyTracking?(k||(p=[h]),m=this.getKDPoints(p,k,e),d=a.find(m,function(a){return a.series===h})):(b=a.grep(p,function(a){return a.stickyTracking}),m=this.getKDPoints(b,k,e),h=(d=m[0])&&d.series,k&&(m=this.getKDPoints(p,k,e)));m.sort(function(a,b){return a.series.index-b.series.index});return{hoverPoint:d,hoverSeries:h,hoverPoints:m}},runPointActions:function(b,t){var h=this.chart,x=h.tooltip,k=x?x.shared:
!1,e=t||h.hoverPoint,d=e&&e.series||h.hoverSeries;t=this.getHoverData(e,d,h.series,!!t||!k&&d&&d.directTouch,k,b);var f,m,e=t.hoverPoint;f=(d=t.hoverSeries)&&d.tooltipOptions.followPointer;m=(k=k&&e&&!e.series.noSharedTooltip)?t.hoverPoints:e?[e]:[];if(e&&(e!==h.hoverPoint||x&&x.isHidden)){w(h.hoverPoints||[],function(b){-1===a.inArray(b,m)&&b.setState()});w(m||[],function(a){a.setState("hover")});if(h.hoverSeries!==d)d.onMouseOver();d&&!d.directTouch&&(h.hoverPoint&&h.hoverPoint.firePointEvent("mouseOut"),
e.firePointEvent("mouseOver"));h.hoverPoints=m;h.hoverPoint=e;x&&x.refresh(k?m:e,b)}else f&&x&&!x.isHidden&&(e=x.getAnchor([{}],b),x.updatePosition({plotX:e[0],plotY:e[1]}));this.unDocMouseMove||(this.unDocMouseMove=D(r,"mousemove",function(b){var d=G[a.hoverChartIndex];if(d)d.pointer.onDocumentMouseMove(b)}));w(h.axes,function(a){c(a.crosshair.snap,!0)?w(m,function(d){d.series[a.coll]===a&&a.drawCrosshair(b,d)}):a.drawCrosshair(b)})},reset:function(a,b){var c=this.chart,h=c.hoverSeries,k=c.hoverPoint,
t=c.hoverPoints,d=c.tooltip,e=d&&d.shared?t:k;a&&e&&w(z(e),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)d&&e&&(d.refresh(e),k&&(k.setState(k.state,!0),w(c.axes,function(a){a.crosshair&&a.drawCrosshair(null,k)})));else{if(k)k.onMouseOut();t&&w(t,function(a){a.setState()});if(h)h.onMouseOut();d&&d.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());w(c.axes,function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,
b){var c=this.chart,h;w(c.series,function(k){h=a||k.getPlotBox();k.xAxis&&k.xAxis.zoomEnabled&&k.group&&(k.group.attr(h),k.markerGroup&&(k.markerGroup.attr(h),k.markerGroup.clip(b?c.clipRect:null)),k.dataLabelsGroup&&k.dataLabelsGroup.attr(h))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,h=a.chartX,k=a.chartY,
t=this.zoomHor,d=this.zoomVert,e=b.plotLeft,m=b.plotTop,y=b.plotWidth,f=b.plotHeight,E,I=this.selectionMarker,g=this.mouseDownX,n=this.mouseDownY,z=c.panKey&&a[c.panKey+"Key"];I&&I.touch||(h<e?h=e:h>e+y&&(h=e+y),k<m?k=m:k>m+f&&(k=m+f),this.hasDragged=Math.sqrt(Math.pow(g-h,2)+Math.pow(n-k,2)),10<this.hasDragged&&(E=b.isInsidePlot(g-e,n-m),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&E&&!z&&!I&&(this.selectionMarker=I=b.renderer.rect(e,m,t?1:y,d?1:f,0).attr({fill:c.selectionMarkerFill||H("#335cad").setOpacity(.25).get(),
"class":"highcharts-selection-marker",zIndex:7}).add()),I&&t&&(h-=g,I.attr({width:Math.abs(h),x:(0<h?0:h)+g})),I&&d&&(h=k-n,I.attr({height:Math.abs(h),y:(0<h?0:h)+n})),E&&!I&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,c=this.chart,h=this.hasPinched;if(this.selectionMarker){var k={originalEvent:a,xAxis:[],yAxis:[]},t=this.selectionMarker,d=t.attr?t.attr("x"):t.x,e=t.attr?t.attr("y"):t.y,m=t.attr?t.attr("width"):t.width,y=t.attr?t.attr("height"):t.height,f;if(this.hasDragged||h)w(c.axes,
function(c){if(c.zoomEnabled&&l(c.min)&&(h||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var p=c.horiz,g="touchend"===a.type?c.minPixelPadding:0,t=c.toValue((p?d:e)+g),p=c.toValue((p?d+m:e+y)-g);k[c.coll].push({axis:c,min:Math.min(t,p),max:Math.max(t,p)});f=!0}}),f&&n(c,"selection",k,function(a){c.zoom(q(a,h?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();h&&this.scaleGroups()}c&&(v(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=
this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=
G[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;l(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var c;a;){if(c=
C(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,h=b.plotLeft,k=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,
"highcharts-tracker")?(n(c.series,"click",q(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(q(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-h,a.chartY-k)&&n(b,"click",a)))},setDOMEvents:function(){var b=this,c=b.chart.container;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};D(c,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&D(r,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(c.ontouchstart=
function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&D(r,"touchend",b.onDocumentTouchEnd))},destroy:function(){var b;this.unDocMouseMove&&this.unDocMouseMove();e(this.chart.container,"mouseleave",this.onContainerMouseLeave);a.chartCount||(e(r,"mouseup",this.onDocumentMouseUp),e(r,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(b in this)this[b]=null}}})(K);(function(a){var D=a.charts,C=a.each,G=a.extend,H=a.map,
v=a.noop,l=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,l,q,n,f,c){this.zoomHor&&this.pinchTranslateDirection(!0,a,l,q,n,f,c);this.zoomVert&&this.pinchTranslateDirection(!1,a,l,q,n,f,c)},pinchTranslateDirection:function(a,l,q,n,f,c,e,z){var b=this.chart,t=a?"x":"y",h=a?"X":"Y",B="chart"+h,p=a?"width":"height",x=b["plot"+(a?"Left":"Top")],k,F,d=z||1,u=b.inverted,m=b.bounds[a?"h":"v"],y=1===l.length,J=l[0][B],E=q[0][B],I=!y&&l[1][B],g=!y&&q[1][B],r;q=function(){!y&&20<Math.abs(J-I)&&(d=z||
Math.abs(E-g)/Math.abs(J-I));F=(x-E)/d+J;k=b["plot"+(a?"Width":"Height")]/d};q();l=F;l<m.min?(l=m.min,r=!0):l+k>m.max&&(l=m.max-k,r=!0);r?(E-=.8*(E-e[t][0]),y||(g-=.8*(g-e[t][1])),q()):e[t]=[E,g];u||(c[t]=F-x,c[p]=k);c=u?1/d:d;f[p]=k;f[t]=l;n[u?a?"scaleY":"scaleX":"scale"+h]=d;n["translate"+h]=c*x+(E-c*J)},pinch:function(a){var r=this,q=r.chart,n=r.pinchDown,f=a.touches,c=f.length,e=r.lastValidTouch,z=r.hasZoom,b=r.selectionMarker,t={},h=1===c&&(r.inClass(a.target,"highcharts-tracker")&&q.runTrackerClick||
r.runChartClick),B={};1<c&&(r.initiated=!0);z&&r.initiated&&!h&&a.preventDefault();H(f,function(a){return r.normalize(a)});"touchstart"===a.type?(C(f,function(a,b){n[b]={chartX:a.chartX,chartY:a.chartY}}),e.x=[n[0].chartX,n[1]&&n[1].chartX],e.y=[n[0].chartY,n[1]&&n[1].chartY],C(q.axes,function(a){if(a.zoomEnabled){var b=q.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,h=a.toPixels(l(a.options.min,a.dataMin)),d=a.toPixels(l(a.options.max,a.dataMax)),t=Math.max(h,d);b.min=Math.min(a.pos,Math.min(h,d)-
c);b.max=Math.max(a.pos+a.len,t+c)}}),r.res=!0):r.followTouchMove&&1===c?this.runPointActions(r.normalize(a)):n.length&&(b||(r.selectionMarker=b=G({destroy:v,touch:!0},q.plotBox)),r.pinchTranslate(n,f,t,b,B,e),r.hasPinched=z,r.scaleGroups(t,B),r.res&&(r.res=!1,this.reset(!1,0)))},touch:function(r,v){var q=this.chart,n,f;if(q.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=q.index;1===r.touches.length?(r=this.normalize(r),(f=q.isInsidePlot(r.chartX-q.plotLeft,
r.chartY-q.plotTop))&&!q.openMenu?(v&&this.runPointActions(r),"touchmove"===r.type&&(v=this.pinchDown,n=v[0]?4<=Math.sqrt(Math.pow(v[0].chartX-r.chartX,2)+Math.pow(v[0].chartY-r.chartY,2)):!1),l(n,!0)&&this.pinch(r)):v&&this.reset()):2===r.touches.length&&this.pinch(r)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(l){D[a.hoverChartIndex]&&D[a.hoverChartIndex].pointer.drop(l)}})})(K);(function(a){var D=
a.addEvent,C=a.charts,G=a.css,H=a.doc,v=a.extend,l=a.noop,r=a.Pointer,w=a.removeEvent,q=a.win,n=a.wrap;if(q.PointerEvent||q.MSPointerEvent){var f={},c=!!q.PointerEvent,e=function(){var a,c=[];c.item=function(a){return this[a]};for(a in f)f.hasOwnProperty(a)&&c.push({pageX:f[a].pageX,pageY:f[a].pageY,target:f[a].target});return c},z=function(b,c,h,f){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!C[a.hoverChartIndex]||(f(b),f=C[a.hoverChartIndex].pointer,f[c]({type:h,target:b.currentTarget,
preventDefault:l,touches:e()}))};v(r.prototype,{onContainerPointerDown:function(a){z(a,"onContainerTouchStart","touchstart",function(a){f[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){z(a,"onContainerTouchMove","touchmove",function(a){f[a.pointerId]={pageX:a.pageX,pageY:a.pageY};f[a.pointerId].target||(f[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){z(a,"onDocumentTouchEnd","touchend",function(a){delete f[a.pointerId]})},
batchMSEvents:function(a){a(this.chart.container,c?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,c?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(H,c?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});n(r.prototype,"init",function(a,c,h){a.call(this,c,h);this.hasZoom&&G(c.container,{"-ms-touch-action":"none","touch-action":"none"})});n(r.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(D)});
n(r.prototype,"destroy",function(a){this.batchMSEvents(w);a.call(this)})}})(K);(function(a){var D,C=a.addEvent,G=a.css,H=a.discardElement,v=a.defined,l=a.each,r=a.isFirefox,w=a.marginNames,q=a.merge,n=a.pick,f=a.setAnimation,c=a.stableSort,e=a.win,z=a.wrap;D=a.Legend=function(a,c){this.init(a,c)};D.prototype={init:function(a,c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=n(a.padding,
8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=q(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=n(a.symbolWidth,16);this.pages=[]},update:function(a,c){var b=this.chart;this.setOptions(q(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;n(c,!0)&&b.redraw()},colorizeItem:function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");
var b=this.options,e=a.legendItem,p=a.legendLine,t=a.legendSymbol,k=this.itemHiddenStyle.color,b=c?b.itemStyle.color:k,f=c?a.color||k:k,d=a.options&&a.options.marker,u={fill:f},m;e&&e.css({fill:b,color:b});p&&p.attr({stroke:f});if(t){if(d&&t.isMarker&&(u=a.pointAttribs(),!c))for(m in u)u[m]=k;t.attr(u)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,e=a._legendItemPos,p=e[0],e=e[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?p:this.legendWidth-p-2*c-4,e);f&&(f.x=
p,f.y=e)},destroyItem:function(a){var b=a.checkbox;l(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&H(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}l(this.getAllItems(),function(b){l(["legendItem","legendGroup"],a,b)});l("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,c,e=this.clipHeight||this.legendHeight,
p=this.titleHeight;b&&(c=b.translateY,l(this.allItems,function(h){var k=h.checkbox,t;k&&(t=c+p+k.y+(a||0)+3,G(k,{left:b.translateX+h.checkboxOffset+k.x-20+"px",top:t+"px",display:t>c-6&&t<c+e-6?"":"none"}))}))},renderTitle:function(){var a=this.padding,c=this.options.title,h=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(c.style).add(this.group)),a=this.title.getBBox(),h=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:h}));
this.titleHeight=h},setText:function(b){var c=this.options;b.legendItem.attr({text:c.labelFormat?a.format(c.labelFormat,b):c.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,c=b.renderer,e=this.options,p="horizontal"===e.layout,f=this.symbolWidth,k=e.symbolPadding,l=this.itemStyle,d=this.itemHiddenStyle,u=this.padding,m=p?n(e.itemDistance,20):0,y=!e.rtl,J=e.width,E=e.itemMarginBottom||0,I=this.itemMarginTop,g=a.legendItem,z=!a.series,r=!z&&a.series.drawLegendSymbol?a.series:a,v=r.options,
v=this.createCheckboxForItem&&v&&v.showCheckbox,w=e.useHTML,P=a.options.className;g||(a.legendGroup=c.g("legend-item").addClass("highcharts-"+r.type+"-series highcharts-color-"+a.colorIndex+(P?" "+P:"")+(z?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=g=c.text("",y?f+k:-k,this.baseline||0,w).css(q(a.visible?l:d)).attr({align:y?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(l=l.fontSize,this.fontMetrics=c.fontMetrics(l,g),this.baseline=this.fontMetrics.f+
3+I,g.attr("y",this.baseline)),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,r.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,g,w),v&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);this.setText(a);c=g.getBBox();f=a.checkboxOffset=e.itemWidth||a.legendItemWidth||f+k+c.width+m+(v?20:0);this.itemHeight=k=Math.round(a.legendItemHeight||c.height||this.symbolHeight);p&&this.itemX-u+f>(J||b.spacingBox.width-2*u-e.x)&&(this.itemX=u,this.itemY+=I+this.lastLineHeight+
E,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,f);this.lastItemY=I+this.itemY+E;this.lastLineHeight=Math.max(k,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];p?this.itemX+=f:(this.itemY+=I+k+E,this.lastLineHeight=k);this.offsetWidth=J||Math.max((p?this.itemX-u-m:f)+u,this.offsetWidth)},getAllItems:function(){var a=[];l(this.chart.series,function(b){var c=b&&b.options;b&&n(c.showInLegend,v(c.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===c.legendType?
b.data:b)))});return a},adjustMargins:function(a,c){var b=this.chart,e=this.options,p=e.align.charAt(0)+e.verticalAlign.charAt(0)+e.layout.charAt(0);e.floating||l([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(h,k){h.test(p)&&!v(a[k])&&(b[w[k]]=Math.max(b[w[k]],b.legend[(k+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][k]*e[k%2?"x":"y"]+n(e.margin,12)+c[k]))})},render:function(){var a=this,e=a.chart,h=e.renderer,f=a.group,p,x,k,n,d=a.box,u=a.options,m=a.padding;a.itemX=m;a.itemY=
a.initialItemY;a.offsetWidth=0;a.lastItemY=0;f||(a.group=f=h.g("legend").attr({zIndex:7}).add(),a.contentGroup=h.g().attr({zIndex:1}).add(f),a.scrollGroup=h.g().add(a.contentGroup));a.renderTitle();p=a.getAllItems();c(p,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});u.reversed&&p.reverse();a.allItems=p;a.display=x=!!p.length;a.lastLineHeight=0;l(p,function(b){a.renderItem(b)});k=(u.width||a.offsetWidth)+m;n=a.lastItemY+a.lastLineHeight+a.titleHeight;
n=a.handleOverflow(n);n+=m;d||(a.box=d=h.rect().addClass("highcharts-legend-box").attr({r:u.borderRadius}).add(f),d.isNew=!0);d.attr({stroke:u.borderColor,"stroke-width":u.borderWidth||0,fill:u.backgroundColor||"none"}).shadow(u.shadow);0<k&&0<n&&(d[d.isNew?"attr":"animate"](d.crisp({x:0,y:0,width:k,height:n},d.strokeWidth())),d.isNew=!1);d[x?"show":"hide"]();a.legendWidth=k;a.legendHeight=n;l(p,function(b){a.positionItem(b)});x&&f.align(q(u,{width:k,height:n}),!0,"spacingBox");e.isResizing||this.positionCheckboxes()},
handleOverflow:function(a){var b=this,c=this.chart,e=c.renderer,p=this.options,f=p.y,k=this.padding,c=c.spacingBox.height+("top"===p.verticalAlign?-f:f)-k,f=p.maxHeight,z,d=this.clipRect,u=p.navigation,m=n(u.animation,!0),y=u.arrowSize||12,J=this.nav,E=this.pages,I,g=this.allItems,q=function(a){a?d.attr({height:a}):d&&(b.clipRect=d.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+k+"px,9999px,"+(k+a)+"px,0)":"auto")};"horizontal"!==p.layout||"middle"===
p.verticalAlign||p.floating||(c/=2);f&&(c=Math.min(c,f));E.length=0;a>c&&!1!==u.enabled?(this.clipHeight=z=Math.max(c-20-this.titleHeight-k,0),this.currentPage=n(this.currentPage,1),this.fullHeight=a,l(g,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var d=E.length;if(!d||c-E[d-1]>z&&(I||c)!==E[d-1])E.push(I||c),d++;b===g.length-1&&c+a-E[d-1]>z&&E.push(c);c!==I&&(I=c)}),d||(d=b.clipRect=e.clipRect(0,k,9999,0),b.contentGroup.clip(d)),q(z),J||(this.nav=J=e.g().attr({zIndex:1}).add(this.group),
this.up=e.symbol("triangle",0,0,y,y).on("click",function(){b.scroll(-1,m)}).add(J),this.pager=e.text("",15,10).addClass("highcharts-legend-navigation").css(u.style).add(J),this.down=e.symbol("triangle-down",0,0,y,y).on("click",function(){b.scroll(1,m)}).add(J)),b.scroll(0),a=c):J&&(q(),this.nav=J.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var b=this.pages,e=b.length;a=this.currentPage+a;var p=this.clipHeight,t=this.options.navigation,k=this.pager,
n=this.padding;a>e&&(a=e);0<a&&(void 0!==c&&f(c,this.chart),this.nav.attr({translateX:n,translateY:p+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),k.attr({text:a+"/"+e}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===e?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?t.inactiveColor:t.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===
e?t.inactiveColor:t.activeColor}).css({cursor:a===e?"default":"pointer"}),c=-b[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:c}),this.currentPage=a,this.positionCheckboxes(c))}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.symbolHeight,e=a.options.squareSymbol;c.legendSymbol=this.chart.renderer.rect(e?(a.symbolWidth-b)/2:0,a.baseline-b+1,e?b:a.symbolWidth,b,n(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var b=
this.options,c=b.marker,e=a.symbolWidth,p=a.symbolHeight,f=p/2,k=this.chart.renderer,l=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var d;d={"stroke-width":b.lineWidth||0};b.dashStyle&&(d.dashstyle=b.dashStyle);this.legendLine=k.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr(d).add(l);c&&!1!==c.enabled&&(b=Math.min(n(c.radius,f),f),0===this.symbol.indexOf("url")&&(c=q(c,{width:p,height:p}),b=0),this.legendSymbol=c=k.symbol(this.symbol,e/2-b,a-b,2*b,2*b,c).addClass("highcharts-point").add(l),
c.isMarker=!0)}};(/Trident\/7\.0/.test(e.navigator.userAgent)||r)&&z(D.prototype,"positionItem",function(a,c){var b=this,e=function(){c._legendItemPos&&a.call(b,c)};e();setTimeout(e)})})(K);(function(a){var D=a.addEvent,C=a.animate,G=a.animObject,H=a.attr,v=a.doc,l=a.Axis,r=a.createElement,w=a.defaultOptions,q=a.discardElement,n=a.charts,f=a.css,c=a.defined,e=a.each,z=a.extend,b=a.find,t=a.fireEvent,h=a.getStyle,B=a.grep,p=a.isNumber,x=a.isObject,k=a.isString,F=a.Legend,d=a.marginNames,u=a.merge,
m=a.Pointer,y=a.pick,J=a.pInt,E=a.removeEvent,I=a.seriesTypes,g=a.splat,L=a.svg,R=a.syncTimeout,O=a.win,M=a.Renderer,P=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new P(a,b,c)};P.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(k(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var d,g=b.series;b.series=null;d=u(w,b);d.series=b.series=g;this.userOptions=b;b=d.chart;g=b.events;this.margin=[];
this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var m;this.index=n.length;n.push(this);a.chartCount++;if(g)for(m in g)D(this,m,g[m]);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;this.firstRender()},initSeries:function(b){var c=this.options.chart;(c=I[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=
this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,d=this.series,g=this.pointer,m=this.legend,k=this.isDirtyLegend,h,y,p=this.hasCartesianSeries,f=this.isDirtyBox,E,x=this.renderer,u=x.isHidden(),I=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);u&&this.cloneRenderTo();this.layOutTitles();
for(b=d.length;b--;)if(E=d[b],E.options.stacking&&(h=!0,E.isDirty)){y=!0;break}if(y)for(b=d.length;b--;)E=d[b],E.options.stacking&&(E.isDirty=!0);e(d,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),k=!0);a.isDirtyData&&t(a,"updatedData")});k&&m.options.enabled&&(m.render(),this.isDirtyLegend=!1);h&&this.getStacks();p&&e(c,function(a){a.updateNames();a.setScale()});this.getMargins();p&&(e(c,function(a){a.isDirty&&(f=!0)}),e(c,function(a){var b=a.min+","+a.max;
a.extKey!==b&&(a.extKey=b,I.push(function(){t(a,"afterSetExtremes",z(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(f||h)&&a.redraw()}));f&&this.drawChartBox();t(this,"predraw");e(d,function(a){(f||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});g&&g.reset(!0);x.draw();t(this,"redraw");t(this,"render");u&&this.cloneRenderTo(!0);e(I,function(a){a.call()})},get:function(a){function c(b){return b.id===a||b.options&&b.options.id===a}var d,g=this.series,m;d=b(this.axes,c)||b(this.series,c);
for(m=0;!d&&m<g.length;m++)d=b(g[m].points||[],c);return d},getAxes:function(){var a=this,b=this.options,c=b.xAxis=g(b.xAxis||{}),b=b.yAxis=g(b.yAxis||{});e(c,function(a,b){a.index=b;a.isX=!0});e(b,function(a,b){a.index=b});c=c.concat(b);e(c,function(b){new l(a,b)})},getSelectedPoints:function(){var a=[];e(this.series,function(b){a=a.concat(B(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return B(this.series,function(a){return a.selected})},setTitle:function(a,
b,c){var d=this,g=d.options,m;m=g.title=u({style:{color:"#333333",fontSize:g.isStock?"16px":"18px"}},g.title,a);g=g.subtitle=u({style:{color:"#666666"}},g.subtitle,b);e([["title",a,m],["subtitle",b,g]],function(a,b){var c=a[0],g=d[c],m=a[1];a=a[2];g&&m&&(d[c]=g=g.destroy());a&&a.text&&!g&&(d[c]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&a,b&&a)},d[c].css(a.style))});d.layOutTitles(c)},layOutTitles:function(a){var b=
0,c,d=this.renderer,g=this.spacingBox;e(["title","subtitle"],function(a){var c=this[a],m=this.options[a],k;c&&(k=m.style.fontSize,k=d.fontMetrics(k,c).b,c.css({width:(m.width||g.width+m.widthAdjust)+"px"}).align(z({y:b+k+("title"===a?-3:2)},m),!1,"spacingBox"),m.floating||m.verticalAlign||(b=Math.ceil(b+c.getBBox(m.useHTML).height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=c,this.hasRendered&&y(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=
this.options.chart,d=b.width,b=b.height,g=this.renderToClone||this.renderTo;c(d)||(this.containerWidth=h(g,"width"));c(b)||(this.containerHeight=h(g,"height"));this.chartWidth=Math.max(0,d||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||this.containerHeight||400)},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;if(a){if(b){for(;b.childNodes.length;)this.renderTo.appendChild(b.firstChild);q(b);delete this.renderToClone}}else c&&c.parentNode===
this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),f(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),v.body.appendChild(b),c&&b.appendChild(c)},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,d=c.chart,g,m;b=this.renderTo;var h=a.uniqueKey(),y;b||(this.renderTo=b=d.renderTo);k(b)&&(this.renderTo=b=v.getElementById(b));
b||a.error(13,!0);g=J(H(b,"data-highcharts-chart"));p(g)&&n[g]&&n[g].hasRendered&&n[g].destroy();H(b,"data-highcharts-chart",this.index);b.innerHTML="";d.skipClone||b.offsetWidth||this.cloneRenderTo();this.getChartSize();g=this.chartWidth;m=this.chartHeight;y=z({position:"relative",overflow:"hidden",width:g+"px",height:m+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},d.style);this.container=b=r("div",{id:h},y,this.renderToClone||b);this._cursor=b.style.cursor;
this.renderer=new (a[d.renderer]||M)(b,g,m,null,d.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(d.className);this.renderer.setStyle(d.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,d=this.margin,g=this.titleOffset;this.resetMargins();g&&!c(d[0])&&(this.plotTop=Math.max(this.plotTop,g+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(d,b);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||
0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],g=a.margin;a.hasCartesianSeries&&e(a.axes,function(a){a.visible&&a.getOffset()});e(d,function(d,m){c(g[m])||(a[d]+=b[m])});a.setChartSize()},reflow:function(a){var b=this,d=b.options.chart,g=b.renderTo,m=c(d.width),k=d.width||h(g,"width"),d=d.height||h(g,"height"),g=a?a.target:O;if(!m&&!b.isPrinting&&k&&d&&(g===O||g===v)){if(k!==
b.containerWidth||d!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=R(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=k;b.containerHeight=d}},initReflow:function(){var a=this,b;b=D(O,"resize",function(b){a.reflow(b)});D(a,"destroy",b)},setSize:function(b,c,d){var g=this,m=g.renderer;g.isResizing+=1;a.setAnimation(d,g);g.oldChartHeight=g.chartHeight;g.oldChartWidth=g.chartWidth;void 0!==b&&(g.options.chart.width=b);void 0!==c&&(g.options.chart.height=
c);g.getChartSize();b=m.globalAnimation;(b?C:f)(g.container,{width:g.chartWidth+"px",height:g.chartHeight+"px"},b);g.setChartSize(!0);m.setSize(g.chartWidth,g.chartHeight,d);e(g.axes,function(a){a.isDirty=!0;a.setScale()});g.isDirtyLegend=!0;g.isDirtyBox=!0;g.layOutTitles();g.getMargins();g.redraw(d);g.oldChartHeight=null;t(g,"resize");R(function(){g&&t(g,"endResize",null,function(){--g.isResizing})},G(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,g=
this.chartHeight,m=this.options.chart,k=this.spacing,h=this.clipOffset,y,p,f,E;this.plotLeft=y=Math.round(this.plotLeft);this.plotTop=p=Math.round(this.plotTop);this.plotWidth=f=Math.max(0,Math.round(d-y-this.marginRight));this.plotHeight=E=Math.max(0,Math.round(g-p-this.marginBottom));this.plotSizeX=b?E:f;this.plotSizeY=b?f:E;this.plotBorderWidth=m.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:k[3],y:k[0],width:d-k[3]-k[1],height:g-k[0]-k[2]};this.plotBox=c.plotBox={x:y,y:p,width:f,height:E};
d=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(d,h[3])/2);c=Math.ceil(Math.max(d,h[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(d,h[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(d,h[2])/2-c))};a||e(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;e(["margin","spacing"],function(c){var d=b[c],g=x(d)?d:[d,d,d,d];e(["Top","Right","Bottom","Left"],function(d,m){a[c][m]=y(b[c+d],g[m])})});
e(d,function(b,c){a[b]=y(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,g=this.chartBackground,m=this.plotBackground,k=this.plotBorder,h,y=this.plotBGImage,e=a.backgroundColor,p=a.plotBackgroundColor,f=a.plotBackgroundImage,E,t=this.plotLeft,x=this.plotTop,u=this.plotWidth,I=this.plotHeight,n=this.plotBox,l=this.clipRect,z=this.clipBox,J="animate";g||(this.chartBackground=
g=b.rect().addClass("highcharts-background").add(),J="attr");h=a.borderWidth||0;E=h+(a.shadow?8:0);e={fill:e||"none"};if(h||g["stroke-width"])e.stroke=a.borderColor,e["stroke-width"]=h;g.attr(e).shadow(a.shadow);g[J]({x:E/2,y:E/2,width:c-E-h%2,height:d-E-h%2,r:a.borderRadius});J="animate";m||(J="attr",this.plotBackground=m=b.rect().addClass("highcharts-plot-background").add());m[J](n);m.attr({fill:p||"none"}).shadow(a.plotShadow);f&&(y?y.animate(n):this.plotBGImage=b.image(f,t,x,u,I).add());l?l.animate({width:z.width,
height:z.height}):this.clipRect=b.clipRect(z);J="animate";k||(J="attr",this.plotBorder=k=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());k.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});k[J](k.crisp({x:t,y:x,width:u,height:I},-k.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,g,m;e(["inverted","angular","polar"],function(k){c=I[b.type||b.defaultSeriesType];m=b[k]||c&&c.prototype[k];
for(g=d&&d.length;!m&&g--;)(c=I[d[g].type])&&c.prototype[k]&&(m=!0);a[k]=m})},linkSeries:function(){var a=this,b=a.series;e(b,function(a){a.linkedSeries.length=0});e(b,function(b){var c=b.options.linkedTo;k(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=y(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){e(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;
b.items&&e(b.items,function(c){var d=z(b.style,c.style),g=J(d.left)+a.plotLeft,m=J(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,g,m).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,d,g,m;this.setTitle();this.legend=new F(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;d=this.plotHeight-=21;e(a,function(a){a.setScale()});this.getAxisMargins();g=1.1<c/this.plotWidth;m=
1.05<d/this.plotHeight;if(g||m)e(a,function(a){(a.horiz&&g||!a.horiz&&m)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&e(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=u(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=
this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(O.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,d=b.series,g=b.container,m,k=g&&g.parentNode;t(b,"destroy");n[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");E(b);for(m=c.length;m--;)c[m]=
c[m].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(m=d.length;m--;)d[m]=d[m].destroy();e("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});g&&(g.innerHTML="",E(g),k&&q(g));for(m in b)delete b[m]},isReadyToRender:function(){var a=this;return L||O!=O.top||"complete"===v.readyState?!0:(v.attachEvent("onreadystatechange",
function(){v.detachEvent("onreadystatechange",a.firstRender);"complete"===v.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();t(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();e(b.series||[],function(b){a.initSeries(b)});a.linkSeries();t(a,"beforeRender");m&&(a.pointer=new m(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.cloneRenderTo(!0)}},onload:function(){e([this.callback].concat(this.callbacks),
function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);t(this,"load");t(this,"render");c(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}}})(K);(function(a){var D,C=a.each,G=a.extend,H=a.erase,v=a.fireEvent,l=a.format,r=a.isArray,w=a.isNumber,q=a.pick,n=a.removeEvent;D=a.Point=function(){};D.prototype={init:function(a,c,e){this.series=a;this.color=a.color;this.applyOptions(c,e);a.options.colorByPoint?(c=a.options.colors||a.chart.options.colors,this.color=this.color||
c[a.colorCounter],c=c.length,e=a.colorCounter,a.colorCounter++,a.colorCounter===c&&(a.colorCounter=0)):e=a.colorIndex;this.colorIndex=q(this.colorIndex,e);a.chart.pointCount++;return this},applyOptions:function(a,c){var e=this.series,f=e.options.pointValKey||e.pointValKey;a=D.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;f&&(this.y=this[f]);this.isNull=q(this.isValid&&!this.isValid(),null===this.x||!w(this.y,!0));this.selected&&
(this.state="select");"name"in this&&void 0===c&&e.xAxis&&e.xAxis.hasNames&&(this.x=e.xAxis.nameToX(this));void 0===this.x&&e&&(this.x=void 0===c?e.autoIncrement(this):c);return this},optionsToObject:function(a){var c={},e=this.series,f=e.options.keys,b=f||e.pointArrayMap||["y"],t=b.length,h=0,n=0;if(w(a)||null===a)c[b[0]]=a;else if(r(a))for(!f&&a.length>t&&(e=typeof a[0],"string"===e?c.name=a[0]:"number"===e&&(c.x=a[0]),h++);n<t;)f&&void 0===a[h]||(c[b[n]]=a[h]),h++,n++;else"object"===typeof a&&
(c=a,a.dataLabels&&(e._hasPointLabels=!0),a.marker&&(e._hasPointMarkers=!0));return c},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=
this.series,c=a.zones,a=a.zoneAxis||"y",e=0,n;for(n=c[e];this[a]>=n.value;)n=c[++e];n&&n.color&&!this.options.color&&(this.color=n.color);return n},destroy:function(){var a=this.series.chart,c=a.hoverPoints,e;a.pointCount--;c&&(this.setState(),H(c,this),c.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)n(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(e in this)this[e]=null},destroyElements:function(){for(var a=["graphic",
"dataLabel","dataLabelUpper","connector","shadowGroup"],c,e=6;e--;)c=a[e],this[c]&&(this[c]=this[c].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var c=this.series,e=c.tooltipOptions,f=q(e.valueDecimals,""),b=e.valuePrefix||"",t=e.valueSuffix||"";C(c.pointArrayMap||["y"],function(c){c=
"{point."+c;if(b||t)a=a.replace(c+"}",b+c+"}"+t);a=a.replace(c+"}",c+":,."+f+"f}")});return l(a,{point:this,series:this.series})},firePointEvent:function(a,c,e){var f=this,b=this.series.options;(b.point.events[a]||f.options&&f.options.events&&f.options.events[a])&&this.importEvents();"click"===a&&b.allowPointSelect&&(e=function(a){f.select&&f.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});v(this,a,c,e)},visible:!0}})(K);(function(a){var D=a.addEvent,C=a.animObject,G=a.arrayMax,H=a.arrayMin,v=a.correctFloat,
l=a.Date,r=a.defaultOptions,w=a.defaultPlotOptions,q=a.defined,n=a.each,f=a.erase,c=a.extend,e=a.fireEvent,z=a.grep,b=a.isArray,t=a.isNumber,h=a.isString,B=a.merge,p=a.pick,x=a.removeEvent,k=a.splat,F=a.SVGElement,d=a.syncTimeout,u=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",
lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},
{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var d=this,m,k,g=a.series,h;d.chart=a;d.options=b=d.setOptions(b);d.linkedSeries=[];d.bindAxes();c(d,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});k=b.events;for(m in k)D(d,m,k[m]);if(k&&k.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;d.getColor();
d.getSymbol();n(d.parallelArrays,function(a){d[a+"Data"]=[]});d.setData(b.data,!1);d.isCartesian&&(a.hasCartesianSeries=!0);g.length&&(h=g[g.length-1]);d._i=p(h&&h._i,-1)+1;a.orderSeries(this.insert(g))},insert:function(a){var b=this.options.index,c;if(t(b)){for(c=a.length;c--;)if(b>=p(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return p(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,k;n(b.axisTypes||[],function(m){n(d[m],
function(a){k=a.options;if(c[m]===k.index||void 0!==c[m]&&c[m]===k.id||void 0===c[m]&&0===k.index)b.insert(a.series),b[m]=a,a.isDirty=!0});b[m]||b.optionalAxis===m||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,m=t(b)?function(d){var g="y"===d&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=g}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};n(c.parallelArrays,m)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,
b=p(b,a.pointStart,0);this.pointInterval=c=p(this.pointInterval,a.pointInterval,1);d&&(a=new l(b),"day"===d?a=+a[l.hcSetDate](a[l.hcGetDate]()+c):"month"===d?a=+a[l.hcSetMonth](a[l.hcGetMonth]()+c):"year"===d&&(a=+a[l.hcSetFullYear](a[l.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},m=c[this.type];this.userOptions=a;c=B(m,c.series,a);this.tooltipOptions=B(r.tooltip,r.plotOptions[this.type].tooltip,
b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);this.stickyTracking=p(a.stickyTracking,d[this.type]&&d[this.type].stickyTracking,d.series&&d.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:c.stickyTracking);null===m.marker&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative",
color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&q(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,c){var d,m=this.chart,g=this.userOptions,k=a+"Index",h=a+"Counter",e=c?c.length:p(m.options.chart[a+"Count"],m[a+"Count"]);b||(d=p(g[k],g["_"+k]),q(d)||(m.series.length||(m[h]=0),g["_"+k]=d=m[h]%e,m[h]+=1),c&&(b=c[d]));void 0!==d&&(this[k]=d);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",
this.options.color||w[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(c,d,k,e){var m=this,g=m.points,y=g&&g.length||0,E,f=m.options,x=m.chart,u=null,l=m.xAxis,z=f.turboThreshold,F=this.xData,q=this.yData,r=(E=m.pointArrayMap)&&E.length;c=c||[];E=c.length;d=p(d,!0);if(!1!==e&&E&&y===E&&!m.cropped&&!m.hasGroupedData&&m.visible)n(c,function(a,
b){g[b].update&&a!==f.data[b]&&g[b].update(a,!1,null,!1)});else{m.xIncrement=null;m.colorCounter=0;n(this.parallelArrays,function(a){m[a+"Data"].length=0});if(z&&E>z){for(k=0;null===u&&k<E;)u=c[k],k++;if(t(u))for(k=0;k<E;k++)F[k]=this.autoIncrement(),q[k]=c[k];else if(b(u))if(r)for(k=0;k<E;k++)u=c[k],F[k]=u[0],q[k]=u.slice(1,r+1);else for(k=0;k<E;k++)u=c[k],F[k]=u[0],q[k]=u[1];else a.error(12)}else for(k=0;k<E;k++)void 0!==c[k]&&(u={series:m},m.pointClass.prototype.applyOptions.apply(u,[c[k]]),m.updateParallelArrays(u,
k));h(q[0])&&a.error(14,!0);m.data=[];m.options.data=m.userOptions.data=c;for(k=y;k--;)g[k]&&g[k].destroy&&g[k].destroy();l&&(l.minRange=l.userMinRange);m.isDirty=x.isDirtyBox=!0;m.isDirtyData=!!g;k=!1}"point"===f.legendType&&(this.processData(),this.generatePoints());d&&x.redraw(k)},processData:function(b){var c=this.xData,d=this.yData,m=c.length,k;k=0;var g,h,e=this.xAxis,p,f=this.options;p=f.cropThreshold;var t=this.getExtremesFromAll||f.getExtremesFromAll,u=this.isCartesian,f=e&&e.val2lin,x=e&&
e.isLog,n,l;if(u&&!this.isDirty&&!e.isDirty&&!this.yAxis.isDirty&&!b)return!1;e&&(b=e.getExtremes(),n=b.min,l=b.max);if(u&&this.sorted&&!t&&(!p||m>p||this.forceCrop))if(c[m-1]<n||c[0]>l)c=[],d=[];else if(c[0]<n||c[m-1]>l)k=this.cropData(this.xData,this.yData,n,l),c=k.xData,d=k.yData,k=k.start,g=!0;for(p=c.length||1;--p;)m=x?f(c[p])-f(c[p-1]):c[p]-c[p-1],0<m&&(void 0===h||m<h)?h=m:0>m&&this.requireSorting&&a.error(15);this.cropped=g;this.cropStart=k;this.processedXData=c;this.processedYData=d;this.closestPointRange=
h},cropData:function(a,b,c,d){var m=a.length,g=0,k=m,h=p(this.cropShoulder,1),e;for(e=0;e<m;e++)if(a[e]>=c){g=Math.max(0,e-h);break}for(c=e;c<m;c++)if(a[c]>d){k=c+h;break}return{xData:a.slice(g,k),yData:b.slice(g,k),start:g,end:k}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,h=this.processedYData,g=this.pointClass,e=d.length,p=this.cropStart||0,f,t=this.hasGroupedData,u,x=[],n;b||t||(b=[],b.length=a.length,b=this.data=b);for(n=0;n<e;n++)f=p+n,t?(u=(new g).init(this,
[d[n]].concat(k(h[n]))),u.dataGroup=this.groupMap[n]):(u=b[f])||void 0===a[f]||(b[f]=u=(new g).init(this,a[f],d[n])),u&&(u.index=f,x[n]=u);if(b&&(e!==(c=b.length)||t))for(n=0;n<c;n++)n!==p||t||(n+=e),b[n]&&(b[n].destroyElements(),b[n].plotX=void 0);this.data=b;this.points=x},getExtremes:function(a){var c=this.yAxis,d=this.processedXData,m,k=[],g=0;m=this.xAxis.getExtremes();var h=m.min,e=m.max,p,f,u,x;a=a||this.stackedYData||this.processedYData||[];m=a.length;for(x=0;x<m;x++)if(f=d[x],u=a[x],p=(t(u,
!0)||b(u))&&(!c.positiveValuesOnly||u.length||0<u),f=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(d[x]||f)>=h&&(d[x]||f)<=e,p&&f)if(p=u.length)for(;p--;)null!==u[p]&&(k[g++]=u[p]);else k[g++]=u;this.dataMin=H(k);this.dataMax=G(k)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,k=this.yAxis,g=this.points,h=g.length,e=!!this.modifyValue,f=a.pointPlacement,u="between"===f||t(f),
x=a.threshold,n=a.startFromThreshold?x:0,l,z,F,r,B=Number.MAX_VALUE;"between"===f&&(f=.5);t(f)&&(f*=p(a.pointRange||c.pointRange));for(a=0;a<h;a++){var w=g[a],C=w.x,D=w.y;z=w.low;var G=b&&k.stacks[(this.negStacks&&D<(n?0:x)?"-":"")+this.stackKey],H;k.positiveValuesOnly&&null!==D&&0>=D&&(w.isNull=!0);w.plotX=l=v(Math.min(Math.max(-1E5,c.translate(C,0,0,0,1,f,"flags"===this.type)),1E5));b&&this.visible&&!w.isNull&&G&&G[C]&&(r=this.getStackIndicator(r,C,this.index),H=G[C],D=H.points[r.key],z=D[0],D=
D[1],z===n&&r.key===G[C].base&&(z=p(x,k.min)),k.positiveValuesOnly&&0>=z&&(z=null),w.total=w.stackTotal=H.total,w.percentage=H.total&&w.y/H.total*100,w.stackY=D,H.setOffset(this.pointXOffset||0,this.barW||0));w.yBottom=q(z)?k.translate(z,0,1,0,1):null;e&&(D=this.modifyValue(D,w));w.plotY=z="number"===typeof D&&Infinity!==D?Math.min(Math.max(-1E5,k.translate(D,0,1,0,1)),1E5):void 0;w.isInside=void 0!==z&&0<=z&&z<=k.len&&0<=l&&l<=c.len;w.clientX=u?v(c.translate(C,0,0,0,1,f)):l;w.negative=w.y<(x||0);
w.category=d&&void 0!==d[w.x]?d[w.x]:w.x;w.isNull||(void 0!==F&&(B=Math.min(B,Math.abs(l-F))),F=l);w.zone=this.zones.length&&w.getZone()}this.closestPointRangePx=B},getValidPoints:function(a,b){var c=this.chart;return z(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,m=b.inverted,g=this.clipBox,k=g||b.clipBox,h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,k.height,
c.xAxis,c.yAxis].join(),e=b[h],p=b[h+"m"];e||(a&&(k.width=0,b[h+"m"]=p=d.clipRect(-99,m?-b.plotLeft:-b.plotTop,99,m?b.chartWidth:b.chartHeight)),b[h]=e=d.clipRect(k),e.count={length:0});a&&!e.count[this.index]&&(e.count[this.index]=!0,e.count.length+=1);!1!==c.clip&&(this.group.clip(a||g?e:b.clipRect),this.markerGroup.clip(p),this.sharedClipKey=h);a||(e.count[this.index]&&(delete e.count[this.index],--e.count.length),0===e.count.length&&h&&b[h]&&(g||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},
animate:function(a){var b=this.chart,c=C(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();e(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,c,d,k,g,h=this.options.marker,e,f,u,x,n=this.markerGroup,l=p(h.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*h.radius);if(!1!==h.enabled||this._hasPointMarkers)for(d=
0;d<a.length;d++)k=a[d],c=k.plotY,g=k.graphic,e=k.marker||{},f=!!k.marker,u=l&&void 0===e.enabled||e.enabled,x=k.isInside,u&&t(c)&&null!==k.y?(c=p(e.symbol,this.symbol),k.hasImage=0===c.indexOf("url"),u=this.markerAttribs(k,k.selected&&"select"),g?g[x?"show":"hide"](!0).animate(u):x&&(0<u.width||k.hasImage)&&(k.graphic=g=b.renderer.symbol(c,u.x,u.y,u.width,u.height,f?e:h).add(n)),g&&g.attr(this.pointAttribs(k,k.selected&&"select")),g&&g.addClass(k.getClassName(),!0)):g&&(k.graphic=g.destroy())},markerAttribs:function(a,
b){var c=this.options.marker,d=a.marker||{},m=p(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],m=p(b&&b.radius,c&&c.radius,m+(c&&c.radiusPlus||0)));a.hasImage&&(m=0);a={x:Math.floor(a.plotX)-m,y:a.plotY-m};m&&(a.width=a.height=2*m);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,m=d&&d.marker||{},g=this.color,k=d&&d.color,h=a&&a.color,d=p(m.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;g=k||a||h||g;a=m.fillColor||c.fillColor||g;g=m.lineColor||c.lineColor||
g;b&&(c=c.states[b],b=m.states&&m.states[b]||{},d=p(b.lineWidth,c.lineWidth,d+p(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,g=b.lineColor||c.lineColor||g);return{stroke:g,"stroke-width":d,fill:a}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(u.navigator.userAgent),d,k=a.data||[],g,h,p;e(a,"destroy");x(a);n(a.axisTypes||[],function(b){(p=a[b])&&p.series&&(f(p.series,a),p.isDirty=p.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(d=k.length;d--;)(g=
k[d])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);for(h in a)a[h]instanceof F&&!a[h].survive&&(d=c&&"group"===h?"hide":"destroy",a[h][d]());b.hoverSeries===a&&(b.hoverSeries=null);f(b.series,a);b.orderSeries();for(h in a)delete a[h]},getGraphPath:function(a,b,c){var d=this,m=d.options,g=m.step,k,h=[],e=[],p;a=a||d.points;(k=a.reversed)&&a.reverse();(g={right:1,center:2}[g]||g&&3)&&k&&(g=4-g);!m.connectNulls||b||c||(a=this.getValidPoints(a));n(a,function(k,f){var u=k.plotX,
x=k.plotY,t=a[f-1];(k.leftCliff||t&&t.rightCliff)&&!c&&(p=!0);k.isNull&&!q(b)&&0<f?p=!m.connectNulls:k.isNull&&!b?p=!0:(0===f||p?f=["M",k.plotX,k.plotY]:d.getPointSpline?f=d.getPointSpline(a,k,f):g?(f=1===g?["L",t.plotX,x]:2===g?["L",(t.plotX+u)/2,t.plotY,"L",(t.plotX+u)/2,x]:["L",u,t.plotY],f.push("L",u,x)):f=["L",u,x],e.push(k.x),g&&e.push(k.x),h.push.apply(h,f),p=!1)});h.xMap=e;return d.graphPath=h},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),
d=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];n(this.zones,function(c,g){d.push(["zone-graph-"+g,"highcharts-graph highcharts-zone-graph-"+g+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});n(d,function(d,g){var k=d[0],m=a[k];m?(m.endX=c.xMap,m.animate({d:c})):c.length&&(a[k]=a.chart.renderer.path(c).addClass(d[1]).attr({zIndex:1}).add(a.group),m={stroke:d[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},d[3]?m.dashstyle=d[3]:"square"!==b.linecap&&
(m["stroke-linecap"]=m["stroke-linejoin"]="round"),m=a[k].attr(m).shadow(2>g&&b.shadow));m&&(m.startX=c.xMap,m.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,k,g,h=this.clips||[],e,f=this.graph,u=this.area,x=Math.max(b.chartWidth,b.chartHeight),t=this[(this.zoneAxis||"y")+"Axis"],l,z,F=b.inverted,q,r,B,w,v=!1;d.length&&(f||u)&&t&&void 0!==t.min&&(z=t.reversed,q=t.horiz,f&&f.hide(),u&&u.hide(),l=t.getExtremes(),n(d,function(d,m){k=z?q?b.plotWidth:0:q?0:
t.toPixels(l.min);k=Math.min(Math.max(p(g,k),0),x);g=Math.min(Math.max(Math.round(t.toPixels(p(d.value,l.max),!0)),0),x);v&&(k=g=t.toPixels(l.max));r=Math.abs(k-g);B=Math.min(k,g);w=Math.max(k,g);t.isXAxis?(e={x:F?w:B,y:0,width:r,height:x},q||(e.x=b.plotHeight-e.x)):(e={x:0,y:F?w:B,width:x,height:r},q&&(e.y=b.plotWidth-e.y));F&&c.isVML&&(e=t.isXAxis?{x:0,y:z?B:w,height:e.width,width:b.chartWidth}:{x:e.y-b.plotLeft-b.spacingBox.x,y:0,width:e.height,height:b.chartHeight});h[m]?h[m].animate(e):(h[m]=
c.clipRect(e),f&&a["zone-graph-"+m].clip(h[m]),u&&a["zone-area-"+m].clip(h[m]));v=d.value>l.max}),this.clips=h)},invertGroups:function(a){function b(){n(["group","markerGroup"],function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,k;c.xAxis&&(k=D(d,"resize",b),D(c,"destroy",k),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,d,k){var g=this[a],m=!g;m&&(this[a]=g=this.chart.renderer.g(b).attr({zIndex:d||
.1}).add(k),g.addClass("highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||"")));g.attr({visibility:c})[m?"attr":"animate"](this.getPlotBox());return g},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,k=a.options,h=!!a.animate&&b.renderer.isSVG&&C(k.animation).duration,
g=a.visible?"inherit":"hidden",e=k.zIndex,p=a.hasRendered,f=b.seriesGroup,u=b.inverted;c=a.plotGroup("group","series",g,e,f);a.markerGroup=a.plotGroup("markerGroup","markers",g,e,f);h&&a.animate(!0);c.inverted=a.isCartesian?u:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(u);!1===k.clip||a.sharedClipKey||p||c.clip(b.clipRect);h&&a.animate();p||(a.animationTimeout=
d(function(){a.afterAnimate()},h));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,d=this.xAxis,k=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:p(d&&d.left,a.plotLeft),translateY:p(k&&k.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,k=this.chart.inverted;return this.searchKDTree({clientX:k?
c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:k?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,d,g){var k,m;if(m=c&&c.length)return k=b.kdAxisArray[d%g],c.sort(function(a,b){return a[k]-b[k]}),m=Math.floor(m/2),{point:c[m],left:a(c.slice(0,m),d+1,g),right:a(c.slice(m+1),d+1,g)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;d(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?
0:1)},searchKDTree:function(a,b){function c(a,b,h,e){var p=b.point,f=d.kdAxisArray[h%e],u,t,x=p;t=q(a[k])&&q(p[k])?Math.pow(a[k]-p[k],2):null;u=q(a[g])&&q(p[g])?Math.pow(a[g]-p[g],2):null;u=(t||0)+(u||0);p.dist=q(u)?Math.sqrt(u):Number.MAX_VALUE;p.distX=q(t)?Math.sqrt(t):Number.MAX_VALUE;f=a[f]-p[f];u=0>f?"left":"right";t=0>f?"right":"left";b[u]&&(u=c(a,b[u],h+1,e),x=u[m]<x[m]?u:p);b[t]&&Math.sqrt(f*f)<x[m]&&(a=c(a,b[t],h+1,e),x=a[m]<x[m]?a:x);return x}var d=this,k=this.kdAxisArray[0],g=this.kdAxisArray[1],
m=b?"distX":"dist";b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(K);(function(a){function D(a,f,c,e,l){var b=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=f;this.x=e;this.total=null;this.points={};this.stack=l;this.rightCliff=this.leftCliff=0;this.alignOptions={align:f.align||(b?c?"left":"right":"center"),verticalAlign:f.verticalAlign||(b?"middle":c?"bottom":"top"),y:q(f.y,b?4:c?
14:-6),x:q(f.x,b?c?-6:6:0)};this.textAlign=f.textAlign||(b?c?"right":"left":"center")}var C=a.Axis,G=a.Chart,H=a.correctFloat,v=a.defined,l=a.destroyObjectProperties,r=a.each,w=a.format,q=a.pick;a=a.Series;D.prototype={destroy:function(){l(this,this.axis)},render:function(a){var f=this.options,c=f.format,c=c?w(c,this):f.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,null,null,f.useHTML).css(f.style).attr({align:this.textAlign,
rotation:f.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,f){var c=this.axis,e=c.chart,n=e.inverted,b=c.reversed,b=this.isNegative&&!b||!this.isNegative&&b,t=c.translate(c.usePercentage?100:this.total,0,0,0,1),c=c.translate(0),c=Math.abs(t-c);a=e.xAxis[0].translate(this.x)+a;var h=e.plotHeight,n={x:n?b?t:t-c:a,y:n?h-a-f:b?h-t-c:h-t,width:n?c:f,height:n?f:c};if(f=this.label)f.align(this.alignOptions,null,n),n=f.alignAttr,f[!1===this.options.crop||e.isInsidePlot(n.x,n.y)?"show":"hide"](!0)}};
G.prototype.getStacks=function(){var a=this;r(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});r(a.series,function(f){!f.options.stacking||!0!==f.visible&&!1!==a.options.chart.ignoreHiddenSeries||(f.stackKey=f.type+q(f.options.stack,""))})};C.prototype.buildStacks=function(){var a=this.series,f,c=q(this.options.reversedStacks,!0),e=a.length,l;if(!this.isXAxis){this.usePercentage=!1;for(l=e;l--;)a[c?l:e-l-1].setStackedPoints();for(l=e;l--;)f=a[c?l:e-l-1],f.setStackCliffs&&
f.setStackCliffs();if(this.usePercentage)for(l=0;l<e;l++)a[l].setPercentStacks()}};C.prototype.renderStackTotals=function(){var a=this.chart,f=a.renderer,c=this.stacks,e,l,b=this.stackTotalGroup;b||(this.stackTotalGroup=b=f.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());b.translate(a.plotLeft,a.plotTop);for(e in c)for(l in a=c[e],a)a[l].render(b)};C.prototype.resetStacks=function(){var a=this.stacks,f,c;if(!this.isXAxis)for(f in a)for(c in a[f])a[f][c].touched<this.stacksTouched?(a[f][c].destroy(),
delete a[f][c]):(a[f][c].total=null,a[f][c].cum=null)};C.prototype.cleanStacks=function(){var a,f,c;if(!this.isXAxis)for(f in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(c in a[f])a[f][c].cum=a[f][c].total};a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,f=this.processedYData,c=[],e=f.length,l=this.options,b=l.threshold,t=l.startFromThreshold?b:0,h=l.stack,l=l.stacking,r=this.stackKey,
p="-"+r,x=this.negStacks,k=this.yAxis,F=k.stacks,d=k.oldStacks,u,m,y,w,E,I,g;k.stacksTouched+=1;for(E=0;E<e;E++)I=a[E],g=f[E],u=this.getStackIndicator(u,I,this.index),w=u.key,y=(m=x&&g<(t?0:b))?p:r,F[y]||(F[y]={}),F[y][I]||(d[y]&&d[y][I]?(F[y][I]=d[y][I],F[y][I].total=null):F[y][I]=new D(k,k.options.stackLabels,m,I,h)),y=F[y][I],null!==g&&(y.points[w]=y.points[this.index]=[q(y.cum,t)],v(y.cum)||(y.base=w),y.touched=k.stacksTouched,0<u.index&&!1===this.singleStacks&&(y.points[w][0]=y.points[this.index+
","+I+",0"][0])),"percent"===l?(m=m?r:p,x&&F[m]&&F[m][I]?(m=F[m][I],y.total=m.total=Math.max(m.total,y.total)+Math.abs(g)||0):y.total=H(y.total+(Math.abs(g)||0))):y.total=H(y.total+(g||0)),y.cum=q(y.cum,t)+(g||0),null!==g&&(y.points[w].push(y.cum),c[E]=y.cum);"percent"===l&&(k.usePercentage=!0);this.stackedYData=c;k.oldStacks={}}};a.prototype.setPercentStacks=function(){var a=this,f=a.stackKey,c=a.yAxis.stacks,e=a.processedXData,l;r([f,"-"+f],function(b){for(var f=e.length,h,n;f--;)if(h=e[f],l=a.getStackIndicator(l,
h,a.index,b),h=(n=c[b]&&c[b][h])&&n.points[l.key])n=n.total?100/n.total:0,h[0]=H(h[0]*n),h[1]=H(h[1]*n),a.stackedYData[f]=h[1]})};a.prototype.getStackIndicator=function(a,f,c,e){!v(a)||a.x!==f||e&&a.key!==e?a={x:f,index:0,key:e}:a.index++;a.key=[c,f,a.index].join();return a}})(K);(function(a){var D=a.addEvent,C=a.animate,G=a.Axis,H=a.createElement,v=a.css,l=a.defined,r=a.each,w=a.erase,q=a.extend,n=a.fireEvent,f=a.inArray,c=a.isNumber,e=a.isObject,z=a.merge,b=a.pick,t=a.Point,h=a.Series,B=a.seriesTypes,
p=a.setAnimation,x=a.splat;q(a.Chart.prototype,{addSeries:function(a,c,d){var k,m=this;a&&(c=b(c,!0),n(m,"addSeries",{options:a},function(){k=m.initSeries(a);m.isDirtyLegend=!0;m.linkSeries();c&&m.redraw(d)}));return k},addAxis:function(a,c,d,h){var k=c?"xAxis":"yAxis",e=this.options;a=z(a,{index:this[k].length,isX:c});new G(this,a);e[k]=x(e[k]||{});e[k].push(a);b(d,!0)&&this.redraw(h)},showLoading:function(a){var b=this,c=b.options,k=b.loadingDiv,m=c.loading,h=function(){k&&v(k,{left:b.plotLeft+
"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};k||(b.loadingDiv=k=H("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=H("span",{className:"highcharts-loading-inner"},null,k),D(b,"redraw",h));k.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;v(k,q(m.style,{zIndex:10}));v(b.loadingSpan,m.labelStyle);b.loadingShown||(v(k,{opacity:0,display:""}),C(k,{opacity:m.style.opacity||.5},{duration:m.showDuration||
0}));b.loadingShown=!0;h()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",C(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){v(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),update:function(a,h){var d,k={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},m=a.chart,e,p;if(m){z(!0,this.options.chart,m);"className"in m&&this.setClassName(m.className);if("inverted"in m||"polar"in m)this.propFromSeries(),e=!0;"alignTicks"in m&&(e=!0);for(d in m)m.hasOwnProperty(d)&&(-1!==f("chart."+d,this.propsRequireUpdateSeries)&&(p=!0),-1!==f(d,this.propsRequireDirtyBox)&&
(this.isDirtyBox=!0));"style"in m&&this.renderer.setStyle(m.style)}for(d in a){if(this[d]&&"function"===typeof this[d].update)this[d].update(a[d],!1);else if("function"===typeof this[k[d]])this[k[d]](a[d]);"chart"!==d&&-1!==f(d,this.propsRequireUpdateSeries)&&(p=!0)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&z(!0,this.options.plotOptions,a.plotOptions);r(["xAxis","yAxis","series","colorAxis","pane"],function(b){a[b]&&r(x(a[b]),function(a,c){(c=l(a.id)&&this.get(a.id)||this[b][c])&&c.coll===
b&&c.update(a,!1)},this)},this);e&&r(this.axes,function(a){a.update({},!1)});p&&r(this.series,function(a){a.update({},!1)});a.loading&&z(!0,this.options.loading,a.loading);d=m&&m.width;m=m&&m.height;c(d)&&d!==this.chartWidth||c(m)&&m!==this.chartHeight?this.setSize(d,m):b(h,!0)&&this.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});q(t.prototype,{update:function(a,c,d,h){function k(){p.applyOptions(a);null===p.y&&u&&(p.graphic=u.destroy());e(a,!0)&&(u&&u.element&&a&&a.marker&&a.marker.symbol&&
(p.graphic=u.destroy()),a&&a.dataLabels&&p.dataLabel&&(p.dataLabel=p.dataLabel.destroy()));x=p.index;f.updateParallelArrays(p,x);t.data[x]=e(t.data[x],!0)||e(a,!0)?p.options:a;f.isDirty=f.isDirtyData=!0;!f.fixedBox&&f.hasCartesianSeries&&(g.isDirtyBox=!0);"point"===t.legendType&&(g.isDirtyLegend=!0);c&&g.redraw(d)}var p=this,f=p.series,u=p.graphic,x,g=f.chart,t=f.options;c=b(c,!0);!1===h?k():p.firePointEvent("update",{options:a},k)},remove:function(a,b){this.series.removePoint(f(this,this.series.data),
a,b)}});q(h.prototype,{addPoint:function(a,c,d,h){var k=this.options,e=this.data,p=this.chart,f=this.xAxis,f=f&&f.hasNames&&f.names,u=k.data,g,x,t=this.xData,l,n;c=b(c,!0);g={series:this};this.pointClass.prototype.applyOptions.apply(g,[a]);n=g.x;l=t.length;if(this.requireSorting&&n<t[l-1])for(x=!0;l&&t[l-1]>n;)l--;this.updateParallelArrays(g,"splice",l,0,0);this.updateParallelArrays(g,l);f&&g.name&&(f[n]=g.name);u.splice(l,0,a);x&&(this.data.splice(l,0,null),this.processData());"point"===k.legendType&&
this.generatePoints();d&&(e[0]&&e[0].remove?e[0].remove(!1):(e.shift(),this.updateParallelArrays(g,"shift"),u.shift()));this.isDirtyData=this.isDirty=!0;c&&p.redraw(h)},removePoint:function(a,c,d){var k=this,m=k.data,h=m[a],e=k.points,f=k.chart,x=function(){e&&e.length===m.length&&e.splice(a,1);m.splice(a,1);k.options.data.splice(a,1);k.updateParallelArrays(h||{series:k},"splice",a,1);h&&h.destroy();k.isDirty=!0;k.isDirtyData=!0;c&&f.redraw()};p(d,f);c=b(c,!0);h?h.firePointEvent("remove",null,x):
x()},remove:function(a,c,d){function k(){m.destroy();h.isDirtyLegend=h.isDirtyBox=!0;h.linkSeries();b(a,!0)&&h.redraw(c)}var m=this,h=m.chart;!1!==d?n(m,"remove",null,k):k()},update:function(a,c){var d=this,k=this.chart,m=this.userOptions,h=this.oldType||this.type,e=a.type||m.type||k.options.chart.type,p=B[h].prototype,f=["group","markerGroup","dataLabelsGroup"],g;if(e&&e!==h||void 0!==a.zIndex)f.length=0;r(f,function(a){f[a]=d[a];delete d[a]});a=z(m,{animation:!1,index:this.index,pointStart:this.xData[0]},
{data:this.options.data},a);this.remove(!1,null,!1);for(g in p)this[g]=void 0;q(this,B[e||h].prototype);r(f,function(a){d[a]=f[a]});this.init(k,a);this.oldType=h;k.linkSeries();b(c,!0)&&k.redraw(!1)}});q(G.prototype,{update:function(a,c){var d=this.chart;a=d.options[this.coll][this.options.index]=z(this.userOptions,a);this.destroy(!0);this.init(d,q(a,{events:void 0}));d.isDirtyBox=!0;b(c,!0)&&d.redraw()},remove:function(a){for(var c=this.chart,d=this.coll,k=this.series,m=k.length;m--;)k[m]&&k[m].remove(!1);
w(c.axes,this);w(c[d],this);c.options[d].splice(this.options.index,1);r(c[d],function(a,b){a.options.index=b});this.destroy();c.isDirtyBox=!0;b(a,!0)&&c.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(K);(function(a){var D=a.color,C=a.each,G=a.map,H=a.pick,v=a.Series,l=a.seriesType;l("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var a=[],l=[],q=this.xAxis,n=this.yAxis,f=n.stacks[this.stackKey],
c={},e=this.points,z=this.index,b=n.series,t=b.length,h,B=H(n.options.reversedStacks,!0)?1:-1,p,x;if(this.options.stacking){for(p=0;p<e.length;p++)c[e[p].x]=e[p];for(x in f)null!==f[x].total&&l.push(x);l.sort(function(a,b){return a-b});h=G(b,function(){return this.visible});C(l,function(b,e){var d=0,k,m;if(c[b]&&!c[b].isNull)a.push(c[b]),C([-1,1],function(a){var d=1===a?"rightNull":"leftNull",x=0,u=f[l[e+a]];if(u)for(p=z;0<=p&&p<t;)k=u.points[p],k||(p===z?c[b][d]=!0:h[p]&&(m=f[b].points[p])&&(x-=
m[1]-m[0])),p+=B;c[b][1===a?"rightCliff":"leftCliff"]=x});else{for(p=z;0<=p&&p<t;){if(k=f[b].points[p]){d=k[1];break}p+=B}d=n.translate(d,0,1,0,1);a.push({isNull:!0,plotX:q.translate(b,0,0,0,1),x:b,plotY:d,yBottom:d})}})}return a},getGraphPath:function(a){var l=v.prototype.getGraphPath,q=this.options,n=q.stacking,f=this.yAxis,c,e,z=[],b=[],t=this.index,h,r=f.stacks[this.stackKey],p=q.threshold,x=f.getThreshold(q.threshold),k,q=q.connectNulls||"percent"===n,F=function(c,k,m){var d=a[c];c=n&&r[d.x].points[t];
var e=d[m+"Null"]||0;m=d[m+"Cliff"]||0;var u,l,d=!0;m||e?(u=(e?c[0]:c[1])+m,l=c[0]+m,d=!!e):!n&&a[k]&&a[k].isNull&&(u=l=p);void 0!==u&&(b.push({plotX:h,plotY:null===u?x:f.getThreshold(u),isNull:d,isCliff:!0}),z.push({plotX:h,plotY:null===l?x:f.getThreshold(l),doCurve:!1}))};a=a||this.points;n&&(a=this.getStackPoints());for(c=0;c<a.length;c++)if(e=a[c].isNull,h=H(a[c].rectPlotX,a[c].plotX),k=H(a[c].yBottom,x),!e||q)q||F(c,c-1,"left"),e&&!n&&q||(b.push(a[c]),z.push({x:c,plotX:h,plotY:k})),q||F(c,c+
1,"right");c=l.call(this,b,!0,!0);z.reversed=!0;e=l.call(this,z,!0,!0);e.length&&(e[0]="L");e=c.concat(e);l=l.call(this,b,!1,q);e.xMap=c.xMap;this.areaPath=e;return l},drawGraph:function(){this.areaPath=[];v.prototype.drawGraph.apply(this);var a=this,l=this.areaPath,q=this.options,n=[["area","highcharts-area",this.color,q.fillColor]];C(this.zones,function(f,c){n.push(["zone-area-"+c,"highcharts-area highcharts-zone-area-"+c+" "+f.className,f.color||a.color,f.fillColor||q.fillColor])});C(n,function(f){var c=
f[0],e=a[c];e?(e.endX=l.xMap,e.animate({d:l})):(e=a[c]=a.chart.renderer.path(l).addClass(f[1]).attr({fill:H(f[3],D(f[2]).setOpacity(H(q.fillOpacity,.75)).get()),zIndex:0}).add(a.group),e.isArea=!0);e.startX=l.xMap;e.shiftUnit=q.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var D=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,H){var v=G.plotX,l=G.plotY,r=a[H-1];H=a[H+1];var w,q,n,f;if(r&&!r.isNull&&!1!==r.doCurve&&!G.isCliff&&H&&!H.isNull&&
!1!==H.doCurve&&!G.isCliff){a=r.plotY;n=H.plotX;H=H.plotY;var c=0;w=(1.5*v+r.plotX)/2.5;q=(1.5*l+a)/2.5;n=(1.5*v+n)/2.5;f=(1.5*l+H)/2.5;n!==w&&(c=(f-q)*(n-v)/(n-w)+l-f);q+=c;f+=c;q>a&&q>l?(q=Math.max(a,l),f=2*l-q):q<a&&q<l&&(q=Math.min(a,l),f=2*l-q);f>H&&f>l?(f=Math.max(H,l),q=2*l-f):f<H&&f<l&&(f=Math.min(H,l),q=2*l-f);G.rightContX=n;G.rightContY=f}G=["C",D(r.rightContX,r.plotX),D(r.rightContY,r.plotY),D(w,v),D(q,l),v,l];r.rightContX=r.rightContY=null;return G}})})(K);(function(a){var D=a.seriesTypes.area.prototype,
C=a.seriesType;C("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:D.getStackPoints,getGraphPath:D.getGraphPath,setStackCliffs:D.setStackCliffs,drawGraph:D.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var D=a.animObject,C=a.color,G=a.each,H=a.extend,v=a.isNumber,l=a.merge,r=a.pick,w=a.Series,q=a.seriesType,n=a.svg;q("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,
states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){w.prototype.init.apply(this,arguments);var a=this,c=a.chart;c.hasRendered&&G(c.series,function(c){c.type===a.type&&(c.isDirty=!0)})},
getColumnMetrics:function(){var a=this,c=a.options,e=a.xAxis,l=a.yAxis,b=e.reversed,t,h={},n=0;!1===c.grouping?n=1:G(a.chart.series,function(b){var c=b.options,k=b.yAxis,m;b.type===a.type&&b.visible&&l.len===k.len&&l.pos===k.pos&&(c.stacking?(t=b.stackKey,void 0===h[t]&&(h[t]=n++),m=h[t]):!1!==c.grouping&&(m=n++),b.columnIndex=m)});var p=Math.min(Math.abs(e.transA)*(e.ordinalSlope||c.pointRange||e.closestPointRange||e.tickInterval||1),e.len),x=p*c.groupPadding,k=(p-2*x)/(n||1),c=Math.min(c.maxPointWidth||
e.len,r(c.pointWidth,k*(1-2*c.pointPadding)));a.columnMetrics={width:c,offset:(k-c)/2+(x+((a.columnIndex||0)+(b?1:0))*k-p/2)*(b?-1:1)};return a.columnMetrics},crispCol:function(a,c,e,l){var b=this.chart,f=this.borderWidth,h=-(f%2?.5:0),f=f%2?.5:1;b.inverted&&b.renderer.isVML&&(f+=1);this.options.crisp&&(e=Math.round(a+e)+h,a=Math.round(a)+h,e-=a);l=Math.round(c+l)+f;h=.5>=Math.abs(c)&&.5<l;c=Math.round(c)+f;l-=c;h&&l&&(--c,l+=1);return{x:a,y:c,width:e,height:l}},translate:function(){var a=this,c=
a.chart,e=a.options,l=a.dense=2>a.closestPointRange*a.xAxis.transA,l=a.borderWidth=r(e.borderWidth,l?0:1),b=a.yAxis,t=a.translatedThreshold=b.getThreshold(e.threshold),h=r(e.minPointLength,5),n=a.getColumnMetrics(),p=n.width,x=a.barW=Math.max(p,1+2*l),k=a.pointXOffset=n.offset;c.inverted&&(t-=.5);e.pointPadding&&(x=Math.ceil(x));w.prototype.translate.apply(a);G(a.points,function(e){var d=r(e.yBottom,t),f=999+Math.abs(d),f=Math.min(Math.max(-f,e.plotY),b.len+f),m=e.plotX+k,l=x,n=Math.min(f,d),E,q=
Math.max(f,d)-n;Math.abs(q)<h&&h&&(q=h,E=!b.reversed&&!e.negative||b.reversed&&e.negative,n=Math.abs(n-t)>h?d-h:t-(E?h:0));e.barX=m;e.pointWidth=p;e.tooltipPos=c.inverted?[b.len+b.pos-c.plotLeft-f,a.xAxis.len-m-l/2,q]:[m+l/2,f+b.pos-c.plotTop,q];e.shapeType="rect";e.shapeArgs=a.crispCol.apply(a,e.isNull?[e.plotX,b.len/2,0,0]:[m,n,l,q])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},
pointAttribs:function(a,c){var e=this.options,f,b=this.pointAttrToOptions||{};f=b.stroke||"borderColor";var t=b["stroke-width"]||"borderWidth",h=a&&a.color||this.color,n=a[f]||e[f]||this.color||h,p=a[t]||e[t]||this[t]||0,b=e.dashStyle;a&&this.zones.length&&(h=(h=a.getZone())&&h.color||a.options.color||this.color);c&&(a=l(e.states[c],a.options.states&&a.options.states[c]||{}),c=a.brightness,h=a.color||void 0!==c&&C(h).brighten(a.brightness).get()||h,n=a[f]||n,p=a[t]||p,b=a.dashStyle||b);f={fill:h,
stroke:n,"stroke-width":p};e.borderRadius&&(f.r=e.borderRadius);b&&(f.dashstyle=b);return f},drawPoints:function(){var a=this,c=this.chart,e=a.options,n=c.renderer,b=e.animationLimit||250,t;G(a.points,function(h){var f=h.graphic;if(v(h.plotY)&&null!==h.y){t=h.shapeArgs;if(f)f[c.pointCount<b?"animate":"attr"](l(t));else h.graphic=f=n[h.shapeType](t).add(h.group||a.group);f.attr(a.pointAttribs(h,h.selected&&"select")).shadow(e.shadow,null,e.stacking&&!e.borderRadius);f.addClass(h.getClassName(),!0)}else f&&
(h.graphic=f.destroy())})},animate:function(a){var c=this,e=this.yAxis,f=c.options,b=this.chart.inverted,t={};n&&(a?(t.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(f.threshold))),b?t.translateX=a-e.len:t.translateY=a,c.group.attr(t)):(t[b?"translateX":"translateY"]=e.pos,c.group.animate(t,H(D(c.options.animation),{step:function(a,b){c.group.attr({scaleY:Math.max(.001,b.pos)})}})),c.animate=null))},remove:function(){var a=this,c=a.chart;c.hasRendered&&G(c.series,function(c){c.type===
a.type&&(c.isDirty=!0)});w.prototype.remove.apply(a,arguments)}})})(K);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(K);(function(a){var D=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},
{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&D.prototype.drawGraph.call(this)}})})(K);(function(a){var D=a.pick,C=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,H=this.chart,v=2*(a.slicedOffset||0),l=H.plotWidth-2*v,H=H.plotHeight-2*v,r=a.center,r=[D(r[0],"50%"),D(r[1],"50%"),a.size||"100%",a.innerSize||0],w=Math.min(l,H),q,n;for(q=0;4>q;++q)n=
r[q],a=2>q||2===q&&/%$/.test(n),r[q]=C(n,[l,H,w,r[2]][q])+(a?v:0);r[3]>r[2]&&(r[3]=r[2]);return r}}})(K);(function(a){var D=a.addEvent,C=a.defined,G=a.each,H=a.extend,v=a.inArray,l=a.noop,r=a.pick,w=a.Point,q=a.Series,n=a.seriesType,f=a.setAnimation;n("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return null===this.y?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,
stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var c=this,f=c.points,b=c.startAngleRad;a||(G(f,function(a){var h=a.graphic,e=a.shapeArgs;h&&(h.attr({r:a.startR||c.center[3]/2,start:b,end:b}),h.animate({r:e.r,start:e.start,end:e.end},
c.options.animation))}),c.animate=null)},updateTotals:function(){var a,e=0,f=this.points,b=f.length,t,h=this.options.ignoreHiddenPoint;for(a=0;a<b;a++)t=f[a],0>t.y&&(t.y=null),e+=h&&!t.visible?0:t.y;this.total=e;for(a=0;a<b;a++)t=f[a],t.percentage=0<e&&(t.visible||!h)?t.y/e*100:0,t.total=e},generatePoints:function(){q.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var c=0,f=this.options,b=f.slicedOffset,t=b+(f.borderWidth||0),h,l,p,x=f.startAngle||
0,k=this.startAngleRad=Math.PI/180*(x-90),x=(this.endAngleRad=Math.PI/180*(r(f.endAngle,x+360)-90))-k,n=this.points,d=f.dataLabels.distance,f=f.ignoreHiddenPoint,u,m=n.length,y;a||(this.center=a=this.getCenter());this.getX=function(b,c){p=Math.asin(Math.min((b-a[1])/(a[2]/2+d),1));return a[0]+(c?-1:1)*Math.cos(p)*(a[2]/2+d)};for(u=0;u<m;u++){y=n[u];h=k+c*x;if(!f||y.visible)c+=y.percentage/100;l=k+c*x;y.shapeType="arc";y.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*h)/1E3,end:Math.round(1E3*
l)/1E3};p=(l+h)/2;p>1.5*Math.PI?p-=2*Math.PI:p<-Math.PI/2&&(p+=2*Math.PI);y.slicedTranslation={translateX:Math.round(Math.cos(p)*b),translateY:Math.round(Math.sin(p)*b)};h=Math.cos(p)*a[2]/2;l=Math.sin(p)*a[2]/2;y.tooltipPos=[a[0]+.7*h,a[1]+.7*l];y.half=p<-Math.PI/2||p>Math.PI/2?1:0;y.angle=p;t=Math.min(t,d/5);y.labelPos=[a[0]+h+Math.cos(p)*d,a[1]+l+Math.sin(p)*d,a[0]+h+Math.cos(p)*t,a[1]+l+Math.sin(p)*t,a[0]+h,a[1]+l,0>d?"center":y.half?"right":"left",p]}},drawGraph:null,drawPoints:function(){var a=
this,e=a.chart.renderer,f,b,t,h,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=e.g("shadow").add(a.group));G(a.points,function(c){if(null!==c.y){b=c.graphic;h=c.shapeArgs;f=c.getTranslate();var p=c.shadowGroup;l&&!p&&(p=c.shadowGroup=e.g("shadow").add(a.shadowGroup));p&&p.attr(f);t=a.pointAttribs(c,c.selected&&"select");b?b.setRadialReference(a.center).attr(t).animate(H(h,f)):(c.graphic=b=e[c.shapeType](h).setRadialReference(a.center).attr(f).add(a.group),c.visible||b.attr({visibility:"hidden"}),
b.attr(t).attr({"stroke-linejoin":"round"}).shadow(l,p));b.addClass(c.getClassName())}})},searchPoint:l,sortByAngle:function(a,e){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*e})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:l},{init:function(){w.prototype.init.apply(this,arguments);var a=this,e;a.name=r(a.name,"Slice");e=function(c){a.slice("select"===c.type)};D(a,"select",e);D(a,"unselect",e);return a},setVisible:function(a,
e){var c=this,b=c.series,f=b.chart,h=b.options.ignoreHiddenPoint;e=r(e,h);a!==c.visible&&(c.visible=c.options.visible=a=void 0===a?!c.visible:a,b.options.data[v(c,b.data)]=c.options,G(["graphic","dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)}),c.legendItem&&f.legend.colorizeItem(c,a),a||"hover"!==c.state||c.setState(""),h&&(b.isDirty=!0),e&&f.redraw())},slice:function(a,e,l){var b=this.series;f(l,b.chart);r(e,!0);this.sliced=this.options.sliced=C(a)?a:!this.sliced;
b.options.data[v(this,b.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var c=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:this.shapeArgs.r,start:c.start,end:c.end})}})})(K);(function(a){var D=a.addEvent,C=a.arrayMax,G=a.defined,H=a.each,
v=a.extend,l=a.format,r=a.map,w=a.merge,q=a.noop,n=a.pick,f=a.relativeLength,c=a.Series,e=a.seriesTypes,z=a.stableSort;a.distribute=function(a,c){function b(a,b){return a.target-b.target}var e,p=!0,f=a,k=[],l;l=0;for(e=a.length;e--;)l+=a[e].size;if(l>c){z(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(l=e=0;l<=c;)l+=a[e].size,e++;k=a.splice(e-1,a.length)}z(a,b);for(a=r(a,function(a){return{size:a.size,targets:[a.target]}});p;){for(e=a.length;e--;)p=a[e],l=(Math.min.apply(0,p.targets)+Math.max.apply(0,
p.targets))/2,p.pos=Math.min(Math.max(0,l-p.size/2),c-p.size);e=a.length;for(p=!1;e--;)0<e&&a[e-1].pos+a[e-1].size>a[e].pos&&(a[e-1].size+=a[e].size,a[e-1].targets=a[e-1].targets.concat(a[e].targets),a[e-1].pos+a[e-1].size>c&&(a[e-1].pos=c-a[e-1].size),a.splice(e,1),p=!0)}e=0;H(a,function(a){var b=0;H(a.targets,function(){f[e].pos=a.pos+b;b+=f[e].size;e++})});f.push.apply(f,k);z(f,b)};c.prototype.drawDataLabels=function(){var a=this,c=a.options,h=c.dataLabels,e=a.points,p,f,k=a.hasRendered||0,q,d,
u=n(h.defer,!0),m=a.chart.renderer;if(h.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(h),d=a.plotGroup("dataLabelsGroup","data-labels",u&&!k?"hidden":"visible",h.zIndex||6),u&&(d.attr({opacity:+k}),k||D(a,"afterAnimate",function(){a.visible&&d.show(!0);d[c.animation?"animate":"attr"]({opacity:1},{duration:200})})),f=h,H(e,function(b){var k,e=b.dataLabel,x,g,t,u=b.connector,y=!e,r;p=b.dlOptions||b.options&&b.options.dataLabels;if(k=n(p&&p.enabled,f.enabled)&&null!==b.y)for(g in h=
w(f,p),x=b.getLabelConfig(),q=h.format?l(h.format,x):h.formatter.call(x,h),r=h.style,t=h.rotation,r.color=n(h.color,r.color,a.color,"#000000"),"contrast"===r.color&&(b.contrastColor=m.getContrast(b.color||a.color),r.color=h.inside||0>h.distance||c.stacking?b.contrastColor:"#000000"),c.cursor&&(r.cursor=c.cursor),x={fill:h.backgroundColor,stroke:h.borderColor,"stroke-width":h.borderWidth,r:h.borderRadius||0,rotation:t,padding:h.padding,zIndex:1},x)void 0===x[g]&&delete x[g];!e||k&&G(q)?k&&G(q)&&(e?
x.text=q:(e=b.dataLabel=m[t?"text":"label"](q,0,-9999,h.shape,null,null,h.useHTML,null,"data-label"),e.addClass("highcharts-data-label-color-"+b.colorIndex+" "+(h.className||"")+(h.useHTML?"highcharts-tracker":""))),e.attr(x),e.css(r).shadow(h.shadow),e.added||e.add(d),a.alignDataLabel(b,e,h,null,y)):(b.dataLabel=e.destroy(),u&&(b.connector=u.destroy()))})};c.prototype.alignDataLabel=function(a,c,h,e,p){var b=this.chart,k=b.inverted,f=n(a.plotX,-9999),d=n(a.plotY,-9999),l=c.getBBox(),m,t=h.rotation,
q=h.align,E=this.visible&&(a.series.forceDL||b.isInsidePlot(f,Math.round(d),k)||e&&b.isInsidePlot(f,k?e.x+1:e.y+e.height-1,k)),r="justify"===n(h.overflow,"justify");E&&(m=h.style.fontSize,m=b.renderer.fontMetrics(m,c).b,e=v({x:k?b.plotWidth-d:f,y:Math.round(k?b.plotHeight-f:d),width:0,height:0},e),v(h,{width:l.width,height:l.height}),t?(r=!1,k=b.renderer.rotCorr(m,t),k={x:e.x+h.x+e.width/2+k.x,y:e.y+h.y+{top:0,middle:.5,bottom:1}[h.verticalAlign]*e.height},c[p?"attr":"animate"](k).attr({align:q}),
f=(t+720)%360,f=180<f&&360>f,"left"===q?k.y-=f?l.height:0:"center"===q?(k.x-=l.width/2,k.y-=l.height/2):"right"===q&&(k.x-=l.width,k.y-=f?0:l.height)):(c.align(h,null,e),k=c.alignAttr),r?a.isLabelJustified=this.justifyDataLabel(c,h,k,l,e,p):n(h.crop,!0)&&(E=b.isInsidePlot(k.x,k.y)&&b.isInsidePlot(k.x+l.width,k.y+l.height)),h.shape&&!t&&c.attr({anchorX:a.plotX,anchorY:a.plotY}));E||(c.attr({y:-9999}),c.placed=!1)};c.prototype.justifyDataLabel=function(a,c,e,f,p,l){var b=this.chart,h=c.align,d=c.verticalAlign,
x,m,t=a.box?0:a.padding||0;x=e.x+t;0>x&&("right"===h?c.align="left":c.x=-x,m=!0);x=e.x+f.width-t;x>b.plotWidth&&("left"===h?c.align="right":c.x=b.plotWidth-x,m=!0);x=e.y+t;0>x&&("bottom"===d?c.verticalAlign="top":c.y=-x,m=!0);x=e.y+f.height-t;x>b.plotHeight&&("top"===d?c.verticalAlign="bottom":c.y=b.plotHeight-x,m=!0);m&&(a.placed=!l,a.align(c,null,p));return m};e.pie&&(e.pie.prototype.drawDataLabels=function(){var b=this,e=b.data,h,f=b.chart,p=b.options.dataLabels,x=n(p.connectorPadding,10),k=n(p.connectorWidth,
1),l=f.plotWidth,d=f.plotHeight,u,m=p.distance,y=b.center,q=y[2]/2,E=y[1],z=0<m,g,v,w,D,M=[[],[]],G,A,Q,S,N=[0,0,0,0];b.visible&&(p.enabled||b._hasPointLabels)&&(H(e,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),c.prototype.drawDataLabels.apply(b),H(e,function(a){a.dataLabel&&a.visible&&(M[a.half].push(a),a.dataLabel._pos=null)}),H(M,function(c,k){var e,t,u=c.length,n,z,I;if(u)for(b.sortByAngle(c,
k-.5),0<m&&(e=Math.max(0,E-q-m),t=Math.min(E+q+m,f.plotHeight),n=r(c,function(a){if(a.dataLabel)return I=a.dataLabel.getBBox().height||21,{target:a.labelPos[1]-e+I/2,size:I,rank:a.y}}),a.distribute(n,t+I-e)),S=0;S<u;S++)h=c[S],w=h.labelPos,g=h.dataLabel,Q=!1===h.visible?"hidden":"inherit",z=w[1],n?void 0===n[S].pos?Q="hidden":(D=n[S].size,A=e+n[S].pos):A=z,G=p.justify?y[0]+(k?-1:1)*(q+m):b.getX(A<e+2||A>t-2?z:A,k),g._attr={visibility:Q,align:w[6]},g._pos={x:G+p.x+({left:x,right:-x}[w[6]]||0),y:A+
p.y-10},w.x=G,w.y=A,null===b.options.size&&(v=g.getBBox().width,z=null,G-v<x?(z=Math.round(v-G+x),N[3]=Math.max(z,N[3])):G+v>l-x&&(z=Math.round(G+v-l+x),N[1]=Math.max(z,N[1])),0>A-D/2?N[0]=Math.max(Math.round(-A+D/2),N[0]):A+D/2>d&&(N[2]=Math.max(Math.round(A+D/2-d),N[2])),g.sideOverflow=z)}),0===C(N)||this.verifyDataLabelOverflow(N))&&(this.placeDataLabels(),z&&k&&H(this.points,function(a){var c;u=a.connector;if((g=a.dataLabel)&&g._pos&&a.visible){Q=g._attr.visibility;if(c=!u)a.connector=u=f.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+
a.colorIndex).add(b.dataLabelsGroup),u.attr({"stroke-width":k,stroke:p.connectorColor||a.color||"#666666"});u[c?"attr":"animate"]({d:b.connectorPath(a.labelPos)});u.attr("visibility",Q)}else u&&(a.connector=u.destroy())}))},e.pie.prototype.connectorPath=function(a){var b=a.x,c=a.y;return n(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},e.pie.prototype.placeDataLabels=
function(){H(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},e.pie.prototype.alignDataLabel=q,e.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,e=c.center,p=c.minSize||80,l,k;null!==e[0]?l=Math.max(b[2]-Math.max(a[1],a[3]),
p):(l=Math.max(b[2]-a[1]-a[3],p),b[0]+=(a[3]-a[1])/2);null!==e[1]?l=Math.max(Math.min(l,b[2]-Math.max(a[0],a[2])),p):(l=Math.max(Math.min(l,b[2]-a[0]-a[2]),p),b[1]+=(a[0]-a[2])/2);l<b[2]?(b[2]=l,b[3]=Math.min(f(c.innerSize||0,l),l),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):k=!0;return k});e.column&&(e.column.prototype.alignDataLabel=function(a,e,h,f,p){var b=this.chart.inverted,k=a.series,l=a.dlBox||a.shapeArgs,d=n(a.below,a.plotY>n(this.translatedThreshold,k.yAxis.len)),u=n(h.inside,
!!this.options.stacking);l&&(f=w(l),0>f.y&&(f.height+=f.y,f.y=0),l=f.y+f.height-k.yAxis.len,0<l&&(f.height-=l),b&&(f={x:k.yAxis.len-f.y-f.height,y:k.xAxis.len-f.x-f.width,width:f.height,height:f.width}),u||(b?(f.x+=d?0:f.width,f.width=0):(f.y+=d?f.height:0,f.height=0)));h.align=n(h.align,!b||u?"center":d?"right":"left");h.verticalAlign=n(h.verticalAlign,b||u?"middle":d?"top":"bottom");c.prototype.alignDataLabel.call(this,a,e,h,f,p);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(K);
(function(a){var D=a.Chart,C=a.each,G=a.pick,H=a.addEvent;D.prototype.callbacks.push(function(a){function l(){var l=[];C(a.series||[],function(a){var q=a.options.dataLabels,n=a.dataLabelCollections||["dataLabel"];(q.enabled||a._hasPointLabels)&&!q.allowOverlap&&a.visible&&C(n,function(f){C(a.points,function(a){a[f]&&(a[f].labelrank=G(a.labelrank,a.shapeArgs&&a.shapeArgs.height),l.push(a[f]))})})});a.hideOverlappingLabels(l)}l();H(a,"redraw",l)});D.prototype.hideOverlappingLabels=function(a){var l=
a.length,r,w,q,n,f,c,e,z,b,t=function(a,b,c,e,k,f,d,l){return!(k>a+c||k+d<a||f>b+e||f+l<b)};for(w=0;w<l;w++)if(r=a[w])r.oldOpacity=r.opacity,r.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(w=0;w<l;w++)for(q=a[w],r=w+1;r<l;++r)if(n=a[r],q&&n&&q!==n&&q.placed&&n.placed&&0!==q.newOpacity&&0!==n.newOpacity&&(f=q.alignAttr,c=n.alignAttr,e=q.parentGroup,z=n.parentGroup,b=2*(q.box?0:q.padding),f=t(f.x+e.translateX,f.y+e.translateY,q.width-b,q.height-b,c.x+z.translateX,c.y+
z.translateY,n.width-b,n.height-b)))(q.labelrank<n.labelrank?q:n).newOpacity=0;C(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(K);(function(a){var D=a.addEvent,C=a.Chart,G=a.createElement,H=a.css,v=a.defaultOptions,l=a.defaultPlotOptions,r=a.each,w=a.extend,q=a.fireEvent,n=a.hasTouch,f=a.inArray,c=a.isObject,e=a.Legend,z=a.merge,b=a.pick,t=a.Point,h=a.Series,
B=a.seriesTypes,p=a.svg;a=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);if(void 0!==c)c.onMouseOver(a)};r(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(r(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(n)a[d].on("touchstart",
c);a.options.cursor&&a[d].css(H).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,m=a.chart,h=m.pointer,f=m.renderer,l=m.options.tooltip.snap,t=a.tracker,g,q=function(){if(m.hoverSeries!==a)a.onMouseOver()},z="rgba(192,192,192,"+(p?.0001:.002)+")";if(e&&!c)for(g=e+1;g--;)"M"===d[g]&&d.splice(g+1,0,d[g+1]-l,d[g+2],"L"),(g&&"M"===d[g]||g===e)&&d.splice(g,0,"L",d[g-2]+l,d[g-1]);t?
t.attr({d:d}):a.graph&&(a.tracker=f.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:z,fill:c?z:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*l),zIndex:2}).add(a.group),r([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",q).on("mouseout",function(a){h.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(n)a.on("touchstart",q)}))}};B.column&&(B.column.prototype.drawTracker=a.drawTrackerPoint);B.pie&&(B.pie.prototype.drawTracker=
a.drawTrackerPoint);B.scatter&&(B.scatter.prototype.drawTracker=a.drawTrackerPoint);w(e.prototype,{setItemEvents:function(a,b,c){var d=this,k=d.chart.renderer.boxWrapper,e="highcharts-legend-"+(a.series?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");k.addClass(e);b.css(d.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d.itemStyle:d.itemHiddenStyle);k.removeClass(e);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&
a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):q(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);D(a.checkbox,"click",function(b){q(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});v.legend.itemStyle.cursor="pointer";w(C.prototype,{showResetZoom:function(){var a=
this,b=v.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,m="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,m)},zoomOut:function(){var a=this;q(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var k,e=this.pointer,d=!1,h;!a||a.resetSelection?r(this.axes,function(a){k=
a.zoom()}):r(a.xAxis.concat(a.yAxis),function(a){var b=a.axis;e[b.isXAxis?"zoomX":"zoomY"]&&(k=b.zoom(a.min,a.max),b.displayBtn&&(d=!0))});h=this.resetZoomButton;d&&!h?this.showResetZoom():!d&&c(h)&&(this.resetZoomButton=h.destroy());k&&this.redraw(b(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,k;d&&r(d,function(a){a.setState()});r("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,e=a[d?"chartX":"chartY"],d=d?
"mouseDownX":"mouseDownY",m=c[d],h=(b.pointRange||0)/2,g=b.getExtremes(),f=b.toValue(m-e,!0)+h,h=b.toValue(m+b.len-e,!0)-h,p=h<f,m=p?h:f,f=p?f:h,p=b.toValue(b.toPixels(g.min)-b.minPixelPadding),h=b.toValue(b.toPixels(g.max)+b.minPixelPadding),p=Math.min(g.dataMin,p)-m,g=f-Math.max(g.dataMax,h);b.series.length&&0>p&&0>g&&(b.setExtremes(m,f,!1,!1,{trigger:"pan"}),k=!0);c[d]=e});k&&c.redraw(!1);H(c.container,{cursor:"move"})}});w(t.prototype,{select:function(a,c){var k=this,d=k.series,e=d.chart;a=b(a,
!k.selected);k.firePointEvent(a?"select":"unselect",{accumulate:c},function(){k.selected=k.options.selected=a;d.options.data[f(k,d.data)]=k.options;k.setState(a&&"select");c||r(e.getSelectedPoints(),function(a){a.selected&&a!==k&&(a.selected=a.options.selected=!1,d.options.data[f(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart.pointer;this.firePointEvent("mouseOver");b.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;
this.firePointEvent("mouseOut");r(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var a=z(this.series.options.point,this.options).events,b;this.events=a;for(b in a)D(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,c){var k=Math.floor(this.plotX),d=this.plotY,e=this.series,h=e.options.states[a]||{},f=l[e.type].marker&&e.options.marker,p=f&&!1===f.enabled,t=f&&f.states&&f.states[a]||{},n=!1===t.enabled,g=
e.stateMarkerGraphic,x=this.marker||{},q=e.chart,r=e.halo,z,v=f&&e.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===h.enabled||a&&(n||p&&!1===t.enabled)||a&&x.states&&x.states[a]&&!1===x.states[a].enabled)){v&&(z=e.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.attr(e.pointAttribs(this,a)),z&&this.graphic.animate(z,b(q.options.chart.animation,t.animation,
f.animation)),g&&g.hide();else{if(a&&t){f=x.symbol||e.symbol;g&&g.currentSymbol!==f&&(g=g.destroy());if(g)g[c?"animate":"attr"]({x:z.x,y:z.y});else f&&(e.stateMarkerGraphic=g=q.renderer.symbol(f,z.x,z.y,z.width,z.height).add(e.markerGroup),g.currentSymbol=f);g&&g.attr(e.pointAttribs(this,a))}g&&(g[a&&q.isInsidePlot(k,d,q.inverted)?"show":"hide"](),g.element.point=this)}(k=h.halo)&&k.size?(r||(e.halo=r=q.renderer.path().add(v?e.markerGroup:e.group)),r[c?"animate":"attr"]({d:this.haloPath(k.size)}),
r.attr({"class":"highcharts-halo highcharts-color-"+b(this.colorIndex,e.colorIndex)}),r.point=this,r.attr(w({fill:this.color||e.color,"fill-opacity":k.opacity,zIndex:-1},k.attributes))):r&&r.point&&r.point.haloPath&&r.animate({d:r.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});w(h.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&
q(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&q(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var c=this,e=c.options,d=c.graph,h=e.states,m=e.lineWidth,e=0;a=a||"";if(c.state!==a&&(r([c.group,c.markerGroup,c.dataLabelsGroup],function(b){b&&(c.state&&b.removeClass("highcharts-series-"+
c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!h[a]||!1!==h[a].enabled)&&(a&&(m=h[a].lineWidth||m+(h[a].lineWidthPlus||0)),d&&!d.dashstyle))for(m={"stroke-width":m},d.animate(m,b(c.chart.options.chart.animation,h[a]&&h[a].animation));c["zone-graph-"+e];)c["zone-graph-"+e].attr(m),e+=1},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,k,h=d.options.chart.ignoreHiddenSeries,f=c.visible;k=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!f:a)?"show":"hide";r(["group",
"dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][k]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&r(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});r(c.linkedSeries,function(b){b.setVisible(a,!1)});h&&(d.isDirtyBox=!0);!1!==b&&d.redraw();q(c,k)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===
a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);q(this,a?"select":"unselect")},drawTracker:a.drawTrackerGraph})})(K);(function(a){var D=a.Chart,C=a.each,G=a.inArray,H=a.isArray,v=a.isObject,l=a.pick,r=a.splat;D.prototype.setResponsive=function(l){var q=this.options.responsive,n=[],f=this.currentResponsive;q&&q.rules&&C(q.rules,function(c){void 0===c._id&&(c._id=a.uniqueKey());this.matchResponsiveRule(c,n,l)},this);var c=a.merge.apply(0,a.map(n,function(c){return a.find(q.rules,function(a){return a._id===
c}).chartOptions})),n=n.toString()||void 0;n!==(f&&f.ruleIds)&&(f&&this.update(f.undoOptions,l),n?(this.currentResponsive={ruleIds:n,mergedOptions:c,undoOptions:this.currentOptions(c)},this.update(c,l)):this.currentResponsive=void 0)};D.prototype.matchResponsiveRule=function(a,q){var n=a.condition;(n.callback||function(){return this.chartWidth<=l(n.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=l(n.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=l(n.minWidth,0)&&this.chartHeight>=l(n.minHeight,0)}).call(this)&&
q.push(a._id)};D.prototype.currentOptions=function(a){function l(a,c,e,n){var b,f;for(b in a)if(!n&&-1<G(b,["series","xAxis","yAxis"]))for(a[b]=r(a[b]),e[b]=[],f=0;f<a[b].length;f++)c[b][f]&&(e[b][f]={},l(a[b][f],c[b][f],e[b][f],n+1));else v(a[b])?(e[b]=H(a[b])?[]:{},l(a[b],c[b]||{},e[b],n+1)):e[b]=c[b]||null}var n={};l(a,this.options,n,0);return n}})(K);(function(a){var D=a.addEvent,C=a.Axis,G=a.Chart,H=a.css,v=a.dateFormat,l=a.defined,r=a.each,w=a.extend,q=a.noop,n=a.Series,f=a.timeUnits;a=a.wrap;
a(n.prototype,"init",function(a){var c;a.apply(this,Array.prototype.slice.call(arguments,1));(c=this.xAxis)&&c.options.ordinal&&D(this,"updatedData",function(){delete c.ordinalIndex})});a(C.prototype,"getTimeTicks",function(a,e,n,b,t,h,q,p){var c=0,k,r,d={},u,m,y,z=[],E=-Number.MAX_VALUE,w=this.options.tickPixelInterval;if(!this.options.ordinal&&!this.options.breaks||!h||3>h.length||void 0===n)return a.call(this,e,n,b,t);m=h.length;for(k=0;k<m;k++){y=k&&h[k-1]>b;h[k]<n&&(c=k);if(k===m-1||h[k+1]-h[k]>
5*q||y){if(h[k]>E){for(r=a.call(this,e,h[c],h[k],t);r.length&&r[0]<=E;)r.shift();r.length&&(E=r[r.length-1]);z=z.concat(r)}c=k+1}if(y)break}a=r.info;if(p&&a.unitRange<=f.hour){k=z.length-1;for(c=1;c<k;c++)v("%d",z[c])!==v("%d",z[c-1])&&(d[z[c]]="day",u=!0);u&&(d[z[0]]="day");a.higherRanks=d}z.info=a;if(p&&l(w)){p=a=z.length;k=[];var g;for(u=[];p--;)c=this.translate(z[p]),g&&(u[p]=g-c),k[p]=g=c;u.sort();u=u[Math.floor(u.length/2)];u<.6*w&&(u=null);p=z[a-1]>b?a-1:a;for(g=void 0;p--;)c=k[p],b=Math.abs(g-
c),g&&b<.8*w&&(null===u||b<.8*u)?(d[z[p]]&&!d[z[p+1]]?(b=p+1,g=c):b=p,z.splice(b,1)):g=c}return z});w(C.prototype,{beforeSetTickPositions:function(){var a,e=[],f=!1,b,l=this.getExtremes(),h=l.min,n=l.max,p,x=this.isXAxis&&!!this.options.breaks,l=this.options.ordinal,k=this.chart.options.chart.ignoreHiddenSeries;if(l||x){r(this.series,function(b,c){if(!(k&&!1===b.visible||!1===b.takeOrdinalPosition&&!x)&&(e=e.concat(b.processedXData),a=e.length,e.sort(function(a,b){return a-b}),a))for(c=a-1;c--;)e[c]===
e[c+1]&&e.splice(c,1)});a=e.length;if(2<a){b=e[1]-e[0];for(p=a-1;p--&&!f;)e[p+1]-e[p]!==b&&(f=!0);!this.options.keepOrdinalPadding&&(e[0]-h>b||n-e[e.length-1]>b)&&(f=!0)}f?(this.ordinalPositions=e,b=this.ordinal2lin(Math.max(h,e[0]),!0),p=Math.max(this.ordinal2lin(Math.min(n,e[e.length-1]),!0),1),this.ordinalSlope=n=(n-h)/(p-b),this.ordinalOffset=h-b*n):this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=void 0}this.isOrdinal=l&&f;this.groupIntervalFactor=null},val2lin:function(a,e){var c=
this.ordinalPositions;if(c){var b=c.length,f,h;for(f=b;f--;)if(c[f]===a){h=f;break}for(f=b-1;f--;)if(a>c[f]||0===f){a=(a-c[f])/(c[f+1]-c[f]);h=f+a;break}e=e?h:this.ordinalSlope*(h||0)+this.ordinalOffset}else e=a;return e},lin2val:function(a,e){var c=this.ordinalPositions;if(c){var b=this.ordinalSlope,f=this.ordinalOffset,h=c.length-1,l;if(e)0>a?a=c[0]:a>h?a=c[h]:(h=Math.floor(a),l=a-h);else for(;h--;)if(e=b*h+f,a>=e){b=b*(h+1)+f;l=(a-e)/(b-e);break}return void 0!==l&&void 0!==c[h]?c[h]+(l?l*(c[h+
1]-c[h]):0):a}return a},getExtendedPositions:function(){var a=this.chart,e=this.series[0].currentDataGrouping,f=this.ordinalIndex,b=e?e.count+e.unitName:"raw",l=this.getExtremes(),h,n;f||(f=this.ordinalIndex={});f[b]||(h={series:[],chart:a,getExtremes:function(){return{min:l.dataMin,max:l.dataMax}},options:{ordinal:!0},val2lin:C.prototype.val2lin,ordinal2lin:C.prototype.ordinal2lin},r(this.series,function(b){n={xAxis:h,xData:b.xData,chart:a,destroyGroupedData:q};n.options={dataGrouping:e?{enabled:!0,
forced:!0,approximation:"open",units:[[e.unitName,[e.count]]]}:{enabled:!1}};b.processData.apply(n);h.series.push(n)}),this.beforeSetTickPositions.apply(h),f[b]=h.ordinalPositions);return f[b]},getGroupIntervalFactor:function(a,e,f){var b;f=f.processedXData;var c=f.length,h=[];b=this.groupIntervalFactor;if(!b){for(b=0;b<c-1;b++)h[b]=f[b+1]-f[b];h.sort(function(a,b){return a-b});h=h[Math.floor(c/2)];a=Math.max(a,f[0]);e=Math.min(e,f[c-1]);this.groupIntervalFactor=b=c*h/(e-a)}return b},postProcessTickInterval:function(a){var c=
this.ordinalSlope;return c?this.options.breaks?this.closestPointRange:a/(c/this.closestPointRange):a}});C.prototype.ordinal2lin=C.prototype.val2lin;a(G.prototype,"pan",function(a,e){var c=this.xAxis[0],b=e.chartX,f=!1;if(c.options.ordinal&&c.series.length){var h=this.mouseDownX,l=c.getExtremes(),p=l.dataMax,n=l.min,k=l.max,q=this.hoverPoints,d=c.closestPointRange,h=(h-b)/(c.translationSlope*(c.ordinalSlope||d)),u={ordinalPositions:c.getExtendedPositions()},d=c.lin2val,m=c.val2lin,y;u.ordinalPositions?
1<Math.abs(h)&&(q&&r(q,function(a){a.setState()}),0>h?(q=u,y=c.ordinalPositions?c:u):(q=c.ordinalPositions?c:u,y=u),u=y.ordinalPositions,p>u[u.length-1]&&u.push(p),this.fixedRange=k-n,h=c.toFixedRange(null,null,d.apply(q,[m.apply(q,[n,!0])+h,!0]),d.apply(y,[m.apply(y,[k,!0])+h,!0])),h.min>=Math.min(l.dataMin,n)&&h.max<=Math.max(p,k)&&c.setExtremes(h.min,h.max,!0,!1,{trigger:"pan"}),this.mouseDownX=b,H(this.container,{cursor:"move"})):f=!0}else f=!0;f&&a.apply(this,Array.prototype.slice.call(arguments,
1))});n.prototype.gappedPath=function(){var a=this.options.gapSize,e=this.points.slice(),f=e.length-1;if(a&&0<f)for(;f--;)e[f+1].x-e[f].x>this.closestPointRange*a&&e.splice(f+1,0,{isNull:!0});return this.getGraphPath(e)}})(K);(function(a){function D(){return Array.prototype.slice.call(arguments,1)}function C(a){a.apply(this);this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,G(this.pointArrayMap,["y"]))}var G=a.pick,H=a.wrap,v=a.each,l=a.extend,r=a.isArray,w=a.fireEvent,q=a.Axis,n=a.Series;
l(q.prototype,{isInBreak:function(a,c){var e=a.repeat||Infinity,f=a.from,b=a.to-a.from;c=c>=f?(c-f)%e:e-(f-c)%e;return a.inclusive?c<=b:c<b&&0!==c},isInAnyBreak:function(a,c){var e=this.options.breaks,f=e&&e.length,b,l,h;if(f){for(;f--;)this.isInBreak(e[f],a)&&(b=!0,l||(l=G(e[f].showPoints,this.isXAxis?!1:!0)));h=b&&c?b&&!l:b}return h}});H(q.prototype,"setTickPositions",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));if(this.options.breaks){var c=this.tickPositions,e=this.tickPositions.info,
f=[],b;for(b=0;b<c.length;b++)this.isInAnyBreak(c[b])||f.push(c[b]);this.tickPositions=f;this.tickPositions.info=e}});H(q.prototype,"init",function(a,c,e){var f=this;e.breaks&&e.breaks.length&&(e.ordinal=!1);a.call(this,c,e);a=this.options.breaks;f.isBroken=r(a)&&!!a.length;f.isBroken&&(f.val2lin=function(a){var b=a,c,e;for(e=0;e<f.breakArray.length;e++)if(c=f.breakArray[e],c.to<=a)b-=c.len;else if(c.from>=a)break;else if(f.isInBreak(c,a)){b-=a-c.from;break}return b},f.lin2val=function(a){var b,c;
for(c=0;c<f.breakArray.length&&!(b=f.breakArray[c],b.from>=a);c++)b.to<a?a+=b.len:f.isInBreak(b,a)&&(a+=b.len);return a},f.setExtremes=function(a,c,e,f,p){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(c);)c-=this.closestPointRange;q.prototype.setExtremes.call(this,a,c,e,f,p)},f.setAxisTranslation=function(a){q.prototype.setAxisTranslation.call(this,a);var b=f.options.breaks;a=[];var c=[],e=0,p,l,k=f.userMin||f.min,n=f.userMax||f.max,d=G(f.pointRangePadding,0),u,m;for(m in b)l=
b[m],p=l.repeat||Infinity,f.isInBreak(l,k)&&(k+=l.to%p-k%p),f.isInBreak(l,n)&&(n-=n%p-l.from%p);for(m in b){l=b[m];u=l.from;for(p=l.repeat||Infinity;u-p>k;)u-=p;for(;u<k;)u+=p;for(;u<n;u+=p)a.push({value:u,move:"in"}),a.push({value:u+(l.to-l.from),move:"out",size:l.breakSize})}a.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});b=0;u=k;for(m in a)l=a[m],b+="in"===l.move?1:-1,1===b&&"in"===l.move&&(u=l.value),0===b&&(c.push({from:u,to:l.value,len:l.value-
u-(l.size||0)}),e+=l.value-u-(l.size||0));f.breakArray=c;f.unitLength=n-k-e+d;w(f,"afterBreaks");f.transA=f.options.staticScale?f.options.staticScale:(n-f.min+d)/f.unitLength*f.transA;d&&(f.minPixelPadding=f.transA*f.minPointOffset);f.min=k;f.max=n})});H(n.prototype,"generatePoints",function(a){a.apply(this,D(arguments));var c=this.xAxis,e=this.yAxis,f=this.points,b,l=f.length,h=this.options.connectNulls,n;if(c&&e&&(c.options.breaks||e.options.breaks))for(;l--;)b=f[l],n=null===b.y&&!1===h,n||!c.isInAnyBreak(b.x,
!0)&&!e.isInAnyBreak(b.y,!0)||(f.splice(l,1),this.data[l]&&this.data[l].destroyElements())});a.Series.prototype.drawBreaks=function(a,c){var e=this,f=e.points,b,l,h,n;a&&v(c,function(c){b=a.breakArray||[];l=a.isXAxis?a.min:G(e.options.threshold,a.min);v(f,function(e){n=G(e["stack"+c.toUpperCase()],e[c]);v(b,function(b){h=!1;if(l<b.from&&n>b.to||l>b.from&&n<b.from)h="pointBreak";else if(l<b.from&&n>b.from&&n<b.to||l>b.from&&n>b.to&&n<b.from)h="pointInBreak";h&&w(a,h,{point:e,brk:b})})})})};H(a.seriesTypes.column.prototype,
"drawPoints",C);H(a.Series.prototype,"drawPoints",C)})(K);(function(a){var D=a.arrayMax,C=a.arrayMin,G=a.Axis,H=a.defaultPlotOptions,v=a.defined,l=a.each,r=a.extend,w=a.format,q=a.isNumber,n=a.merge,f=a.pick,c=a.Point,e=a.Tooltip,z=a.wrap,b=a.Series.prototype,t=b.processData,h=b.generatePoints,B=b.destroy,p={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S",
"-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},x={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},
candlestick:{approximation:"ohlc",groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},k=a.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],F={sum:function(a){var b=a.length,c;if(!b&&a.hasNulls)c=null;else if(b)for(c=0;b--;)c+=a[b];return c},average:function(a){var b=a.length;a=F.sum(a);q(a)&&b&&(a/=b);return a},open:function(a){return a.length?
a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?D(a):a.hasNulls?null:void 0},low:function(a){return a.length?C(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,b,c,e){a=F.open(a);b=F.high(b);c=F.low(c);e=F.close(e);if(q(a)||q(b)||q(c)||q(e))return[a,b,c,e]},range:function(a,b){a=F.low(a);b=F.high(b);if(q(a)||q(b))return[a,b]}};b.groupData=function(a,b,c,e){var d=this.data,k=this.options.data,f=[],g=[],h=[],m=a.length,
p,l,n=!!b,u=[[],[],[],[]];e="function"===typeof e?e:F[e];var t=this.pointArrayMap,x=t&&t.length,r,y=0;for(r=l=0;r<=m&&!(a[r]>=c[0]);r++);for(r;r<=m;r++){for(;(void 0!==c[y+1]&&a[r]>=c[y+1]||r===m)&&(p=c[y],this.dataGroupInfo={start:l,length:u[0].length},l=e.apply(this,u),void 0!==l&&(f.push(p),g.push(l),h.push(this.dataGroupInfo)),l=r,u[0]=[],u[1]=[],u[2]=[],u[3]=[],y+=1,r!==m););if(r===m)break;if(t){p=this.cropStart+r;p=d&&d[p]||this.pointClass.prototype.applyOptions.apply({series:this},[k[p]]);
var v,w;for(v=0;v<x;v++)w=p[t[v]],q(w)?u[v].push(w):null===w&&(u[v].hasNulls=!0)}else p=n?b[r]:null,q(p)?u[0].push(p):null===p&&(u[0].hasNulls=!0)}return[f,g,h]};b.processData=function(){var a=this.chart,c=this.options.dataGrouping,e=!1!==this.allowDG&&c&&f(c.enabled,a.options.isStock),h=this.visible||!a.options.chart.ignoreHiddenSeries,p;this.forceCrop=e;this.groupPixelWidth=null;this.hasProcessed=!0;if(!1!==t.apply(this,arguments)&&e){this.destroyGroupedData();var l=this.processedXData,n=this.processedYData,
g=a.plotSizeX,a=this.xAxis,q=a.options.ordinal,r=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(r){this.isDirty=p=!0;var x=a.getExtremes(),e=x.min,x=x.max,q=q&&a.getGroupIntervalFactor(e,x,this)||1,g=r*(x-e)/g*q,r=a.getTimeTicks(a.normalizeTimeTickInterval(g,c.units||k),Math.min(e,l[0]),Math.max(x,l[l.length-1]),a.options.startOfWeek,l,this.closestPointRange),l=b.groupData.apply(this,[l,n,r,c.approximation]),n=l[0],q=l[1];if(c.smoothed){c=n.length-1;for(n[c]=Math.min(n[c],x);c--&&
0<c;)n[c]+=g/2;n[0]=Math.max(n[0],e)}this.currentDataGrouping=r.info;this.closestPointRange=r.info.totalRange;this.groupMap=l[2];v(n[0])&&n[0]<a.dataMin&&h&&(a.min===a.dataMin&&(a.min=n[0]),a.dataMin=n[0]);this.processedXData=n;this.processedYData=q}else this.currentDataGrouping=this.groupMap=null;this.hasGroupedData=p}};b.destroyGroupedData=function(){var a=this.groupedData;l(a||[],function(b,c){b&&(a[c]=b.destroy?b.destroy():null)});this.groupedData=null};b.generatePoints=function(){h.apply(this);
this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};z(c.prototype,"update",function(b){this.dataGroup?a.error(24):b.apply(this,[].slice.call(arguments,1))});z(e.prototype,"tooltipFooterHeaderFormatter",function(b,c,e){var d=c.series,k=d.tooltipOptions,f=d.options.dataGrouping,h=k.xDateFormat,g,m=d.xAxis,l=a.dateFormat;return m&&"datetime"===m.options.type&&f&&q(c.key)?(b=d.currentDataGrouping,f=f.dateTimeLabelFormats,b?(m=f[b.unitName],1===b.count?h=m[0]:(h=m[1],g=m[2])):
!h&&f&&(h=this.getXDateFormat(c,k,m)),h=l(h,c.key),g&&(h+=l(g,c.key+b.totalRange-1)),w(k[(e?"footer":"header")+"Format"],{point:r(c.point,{key:h}),series:d})):b.call(this,c,e)});b.destroy=function(){for(var a=this.groupedData||[],b=a.length;b--;)a[b]&&a[b].destroy();B.apply(this)};z(b,"setOptions",function(a,b){a=a.call(this,b);var c=this.type,d=this.chart.options.plotOptions,e=H[c].dataGrouping;x[c]&&(e||(e=n(p,x[c])),a.dataGrouping=n(e,d.series&&d.series.dataGrouping,d[c].dataGrouping,b.dataGrouping));
this.chart.options.isStock&&(this.requireSorting=!0);return a});z(G.prototype,"setScale",function(a){a.call(this);l(this.series,function(a){a.hasProcessed=!1})});G.prototype.getGroupPixelWidth=function(){var a=this.series,b=a.length,c,e=0,k=!1,h;for(c=b;c--;)(h=a[c].options.dataGrouping)&&(e=Math.max(e,h.groupPixelWidth));for(c=b;c--;)(h=a[c].options.dataGrouping)&&a[c].hasProcessed&&(b=(a[c].processedXData||a[c].data).length,a[c].groupPixelWidth||b>this.chart.plotSizeX/e||b&&h.forced)&&(k=!0);return k?
e:0};G.prototype.setDataGrouping=function(a,b){var c;b=f(b,!0);a||(a={forced:!1,units:null});if(this instanceof G)for(c=this.series.length;c--;)this.series[c].update({dataGrouping:a},!1);else l(this.chart.options.series,function(b){b.dataGrouping=a},!1);b&&this.chart.redraw()}})(K);(function(a){var D=a.each,C=a.Point,G=a.seriesType,H=a.seriesTypes;G("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},
threshold:null,states:{hover:{lineWidth:3}},stickyTracking:!0},{directTouch:!1,pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"high",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,l){l=H.column.prototype.pointAttribs.call(this,a,l);var r=this.options;delete l.fill;!a.options.color&&r.upColor&&a.open<a.close&&(l.stroke=r.upColor);return l},translate:function(){var a=this,l=a.yAxis,r=!!a.modifyValue,
w=["plotOpen","plotHigh","plotLow","plotClose","yBottom"];H.column.prototype.translate.apply(a);D(a.points,function(q){D([q.open,q.high,q.low,q.close,q.low],function(n,f){null!==n&&(r&&(n=a.modifyValue(n)),q[w[f]]=l.toPixels(n,!0))})})},drawPoints:function(){var a=this,l=a.chart;D(a.points,function(r){var w,q,n,f,c=r.graphic,e,v=!c;void 0!==r.plotY&&(c||(r.graphic=c=l.renderer.path().add(a.group)),c.attr(a.pointAttribs(r,r.selected&&"select")),q=c.strokeWidth()%2/2,e=Math.round(r.plotX)-q,n=Math.round(r.shapeArgs.width/
2),f=["M",e,Math.round(r.yBottom),"L",e,Math.round(r.plotY)],null!==r.open&&(w=Math.round(r.plotOpen)+q,f.push("M",e,w,"L",e-n,w)),null!==r.close&&(w=Math.round(r.plotClose)+q,f.push("M",e,w,"L",e+n,w)),c[v?"attr":"animate"]({d:f}).addClass(r.getClassName(),!0))})},animate:null},{getClassName:function(){return C.prototype.getClassName.call(this)+(this.open<this.close?" highcharts-point-up":" highcharts-point-down")}})})(K);(function(a){var D=a.defaultPlotOptions,C=a.each,G=a.merge,H=a.seriesType,
v=a.seriesTypes;H("candlestick","ohlc",G(D.column,{states:{hover:{lineWidth:2}},tooltip:D.ohlc.tooltip,threshold:null,lineColor:"#000000",lineWidth:1,upColor:"#ffffff",stickyTracking:!0}),{pointAttribs:function(a,r){var l=v.column.prototype.pointAttribs.call(this,a,r),q=this.options,n=a.open<a.close,f=q.lineColor||this.color;l["stroke-width"]=q.lineWidth;l.fill=a.options.color||(n?q.upColor||this.color:this.color);l.stroke=a.lineColor||(n?q.upLineColor||f:f);r&&(a=q.states[r],l.fill=a.color||l.fill,
l.stroke=a.lineColor||l.stroke,l["stroke-width"]=a.lineWidth||l["stroke-width"]);return l},drawPoints:function(){var a=this,r=a.chart;C(a.points,function(l){var q=l.graphic,n,f,c,e,v,b,t,h=!q;void 0!==l.plotY&&(q||(l.graphic=q=r.renderer.path().add(a.group)),q.attr(a.pointAttribs(l,l.selected&&"select")).shadow(a.options.shadow),v=q.strokeWidth()%2/2,b=Math.round(l.plotX)-v,n=l.plotOpen,f=l.plotClose,c=Math.min(n,f),n=Math.max(n,f),t=Math.round(l.shapeArgs.width/2),f=Math.round(c)!==Math.round(l.plotY),
e=n!==l.yBottom,c=Math.round(c)+v,n=Math.round(n)+v,v=[],v.push("M",b-t,n,"L",b-t,c,"L",b+t,c,"L",b+t,n,"Z","M",b,c,"L",b,f?Math.round(l.plotY):c,"M",b,n,"L",b,e?Math.round(l.yBottom):n),q[h?"attr":"animate"]({d:v}).addClass(l.getClassName(),!0))})}})})(K);(function(a){var D=a.addEvent,C=a.each,G=a.merge,H=a.noop,v=a.Renderer,l=a.seriesType,r=a.seriesTypes,w=a.TrackerMixin,q=a.VMLRenderer,n=a.SVGRenderer.prototype.symbols,f=a.stableSort;l("flags","column",{pointRange:0,shape:"flag",stackDistance:12,
textAlign:"center",tooltip:{pointFormat:"{point.text}\x3cbr/\x3e"},threshold:null,y:-30,fillColor:"#ffffff",lineWidth:1,states:{hover:{lineColor:"#000000",fillColor:"#ccd6eb"}},style:{fontSize:"11px",fontWeight:"bold"}},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:a.Series.prototype.init,pointAttribs:function(a,e){var c=this.options,b=a&&a.color||this.color,f=c.lineColor,h=a&&a.lineWidth;a=a&&a.fillColor||c.fillColor;e&&(a=c.states[e].fillColor,
f=c.states[e].lineColor,h=c.states[e].lineWidth);return{fill:a||b,stroke:f||b,"stroke-width":h||c.lineWidth||0}},translate:function(){r.column.prototype.translate.apply(this);var a=this.options,e=this.chart,l=this.points,b=l.length-1,n,h,q=a.onSeries;n=q&&e.get(q);var a=a.onKey||"y",q=n&&n.options.step,p=n&&n.points,x=p&&p.length,k=this.xAxis,v=this.yAxis,d=k.getExtremes(),u=0,m,y,w;if(n&&n.visible&&x)for(u=(n.pointXOffset||0)+(n.barW||0)/2,n=n.currentDataGrouping,y=p[x-1].x+(n?n.totalRange:0),f(l,
function(a,b){return a.x-b.x}),a="plot"+a[0].toUpperCase()+a.substr(1);x--&&l[b]&&!(n=l[b],m=p[x],m.x<=n.x&&void 0!==m[a]&&(n.x<=y&&(n.plotY=m[a],m.x<n.x&&!q&&(w=p[x+1])&&void 0!==w[a]&&(n.plotY+=(n.x-m.x)/(w.x-m.x)*(w[a]-m[a]))),b--,x++,0>b)););C(l,function(a,b){var c;void 0===a.plotY&&(a.x>=d.min&&a.x<=d.max?a.plotY=e.chartHeight-k.bottom-(k.opposite?k.height:0)+k.offset-v.top:a.shapeArgs={});a.plotX+=u;(h=l[b-1])&&h.plotX===a.plotX&&(void 0===h.stackIndex&&(h.stackIndex=0),c=h.stackIndex+1);a.stackIndex=
c})},drawPoints:function(){var c=this.points,e=this.chart,f=e.renderer,b,l,h=this.options,n=h.y,p,q,k,r,d,u,m,y=this.yAxis;for(q=c.length;q--;)k=c[q],m=k.plotX>this.xAxis.len,b=k.plotX,r=k.stackIndex,p=k.options.shape||h.shape,l=k.plotY,void 0!==l&&(l=k.plotY+n-(void 0!==r&&r*h.stackDistance)),d=r?void 0:k.plotX,u=r?void 0:k.plotY,r=k.graphic,void 0!==l&&0<=b&&!m?(r||(r=k.graphic=f.label("",null,null,p,null,null,h.useHTML).attr(this.pointAttribs(k)).css(G(h.style,k.style)).attr({align:"flag"===p?
"left":"center",width:h.width,height:h.height,"text-align":h.textAlign}).addClass("highcharts-point").add(this.markerGroup),k.graphic.div&&(k.graphic.div.point=k),r.shadow(h.shadow)),0<b&&(b-=r.strokeWidth()%2),r.attr({text:k.options.title||h.title||"A",x:b,y:l,anchorX:d,anchorY:u}),k.tooltipPos=e.inverted?[y.len+y.pos-e.plotLeft-l,this.xAxis.len-b]:[b,l+y.pos-e.plotTop]):r&&(k.graphic=r.destroy());h.useHTML&&a.wrap(this.markerGroup,"on",function(b){return a.SVGElement.prototype.on.apply(b.apply(this,
[].slice.call(arguments,1)),[].slice.call(arguments,1))})},drawTracker:function(){var a=this.points;w.drawTrackerPoint.apply(this);C(a,function(c){var e=c.graphic;e&&D(e.element,"mouseover",function(){0<c.stackIndex&&!c.raised&&(c._y=e.y,e.attr({y:c._y-8}),c.raised=!0);C(a,function(a){a!==c&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:H,buildKDTree:H,setClip:H});n.flag=function(a,e,f,b,l){return["M",l&&l.anchorX||a,l&&l.anchorY||e,"L",a,e+b,a,e,a+f,e,a+f,e+b,a,e+b,"Z"]};
C(["circle","square"],function(a){n[a+"pin"]=function(c,f,b,l,h){var e=h&&h.anchorX;h=h&&h.anchorY;"circle"===a&&l>b&&(c-=Math.round((l-b)/2),b=l);c=n[a](c,f,b,l);e&&h&&c.push("M",e,f>h?f:f+l,"L",e,h);return c}});v===q&&C(["flag","circlepin","squarepin"],function(a){q.prototype.symbols[a]=n[a]})})(K);(function(a){function D(a,b,c){this.init(a,b,c)}var C=a.addEvent,G=a.Axis,H=a.correctFloat,v=a.defaultOptions,l=a.defined,r=a.destroyObjectProperties,w=a.doc,q=a.each,n=a.fireEvent,f=a.hasTouch,c=a.isTouchDevice,
e=a.merge,z=a.pick,b=a.removeEvent,t=a.wrap,h,B={height:c?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:a.svg&&!c,margin:10,minWidth:6,step:.2,zIndex:3,barBackgroundColor:"#cccccc",barBorderWidth:1,barBorderColor:"#cccccc",buttonArrowColor:"#333333",buttonBackgroundColor:"#e6e6e6",buttonBorderColor:"#cccccc",buttonBorderWidth:1,rifleColor:"#333333",trackBackgroundColor:"#f2f2f2",trackBorderColor:"#f2f2f2",trackBorderWidth:1};v.scrollbar=e(!0,B,v.scrollbar);a.swapXY=h=function(a,b){var c=
a.length,e;if(b)for(b=0;b<c;b+=3)e=a[b+1],a[b+1]=a[b+2],a[b+2]=e;return a};D.prototype={init:function(a,b,c){this.scrollbarButtons=[];this.renderer=a;this.userOptions=b;this.options=e(B,b);this.chart=c;this.size=z(this.options.size,this.options.height);b.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var a=this.renderer,b=this.options,c=this.size,e;this.group=e=a.g("scrollbar").attr({zIndex:b.zIndex,translateY:-99999}).add();this.track=a.rect().addClass("highcharts-scrollbar-track").attr({x:0,
r:b.trackBorderRadius||0,height:c,width:c}).add(e);this.track.attr({fill:b.trackBackgroundColor,stroke:b.trackBorderColor,"stroke-width":b.trackBorderWidth});this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=a.g().add(e);this.scrollbar=a.rect().addClass("highcharts-scrollbar-thumb").attr({height:c,width:c,r:b.barBorderRadius||0}).add(this.scrollbarGroup);this.scrollbarRifles=a.path(h(["M",-3,c/4,"L",-3,2*c/3,"M",0,c/4,"L",0,2*c/3,"M",
3,c/4,"L",3,2*c/3],b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);this.scrollbar.attr({fill:b.barBackgroundColor,stroke:b.barBorderColor,"stroke-width":b.barBorderWidth});this.scrollbarRifles.attr({stroke:b.rifleColor,"stroke-width":1});this.scrollbarStrokeWidth=this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);this.drawScrollbarButton(1)},position:function(a,b,c,e){var d=
this.options.vertical,k=0,f=this.rendered?"animate":"attr";this.x=a;this.y=b+this.trackBorderWidth;this.width=c;this.xOffset=this.height=e;this.yOffset=k;d?(this.width=this.yOffset=c=k=this.size,this.xOffset=b=0,this.barWidth=e-2*c,this.x=a+=this.options.margin):(this.height=this.xOffset=e=b=this.size,this.barWidth=c-2*e,this.y+=this.options.margin);this.group[f]({translateX:a,translateY:this.y});this.track[f]({width:c,height:e});this.scrollbarButtons[1][f]({translateX:d?0:c-b,translateY:d?e-k:0})},
drawScrollbarButton:function(a){var b=this.renderer,c=this.scrollbarButtons,e=this.options,d=this.size,f;f=b.g().add(this.group);c.push(f);f=b.rect().addClass("highcharts-scrollbar-button").add(f);f.attr({stroke:e.buttonBorderColor,"stroke-width":e.buttonBorderWidth,fill:e.buttonBackgroundColor});f.attr(f.crisp({x:-.5,y:-.5,width:d+1,height:d+1,r:e.buttonBorderRadius},f.strokeWidth()));f=b.path(h(["M",d/2+(a?-1:1),d/2-3,"L",d/2+(a?-1:1),d/2+3,"L",d/2+(a?2:-2),d/2],e.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);
f.attr({fill:e.buttonArrowColor})},setRange:function(a,b){var c=this.options,e=c.vertical,d=c.minWidth,f=this.barWidth,h,p,n=this.rendered&&!this.hasDragged?"animate":"attr";l(f)&&(a=Math.max(a,0),h=Math.ceil(f*a),this.calculatedWidth=p=H(f*Math.min(b,1)-h),p<d&&(h=(f-d+p)*a,p=d),d=Math.floor(h+this.xOffset+this.yOffset),f=p/2-.5,this.from=a,this.to=b,e?(this.scrollbarGroup[n]({translateY:d}),this.scrollbar[n]({height:p}),this.scrollbarRifles[n]({translateY:f}),this.scrollbarTop=d,this.scrollbarLeft=
0):(this.scrollbarGroup[n]({translateX:d}),this.scrollbar[n]({width:p}),this.scrollbarRifles[n]({translateX:f}),this.scrollbarLeft=d,this.scrollbarTop=0),12>=p?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0),!1===c.showFull&&(0>=a&&1<=b?this.group.hide():this.group.show()),this.rendered=!0)},initEvents:function(){var a=this;a.mouseMoveHandler=function(b){var c=a.chart.pointer.normalize(b),e=a.options.vertical?"chartY":"chartX",d=a.initPositions;!a.grabbedCenter||b.touches&&0===b.touches[0][e]||
(c=a.cursorToScrollbarPosition(c)[e],e=a[e],e=c-e,a.hasDragged=!0,a.updatePosition(d[0]+e,d[1]+e),a.hasDragged&&n(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b}))};a.mouseUpHandler=function(b){a.hasDragged&&n(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b});a.grabbedCenter=a.hasDragged=a.chartX=a.chartY=null};a.mouseDownHandler=function(b){b=a.chart.pointer.normalize(b);b=a.cursorToScrollbarPosition(b);a.chartX=b.chartX;a.chartY=b.chartY;
a.initPositions=[a.from,a.to];a.grabbedCenter=!0};a.buttonToMinClick=function(b){var c=H(a.to-a.from)*a.options.step;a.updatePosition(H(a.from-c),H(a.to-c));n(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.buttonToMaxClick=function(b){var c=(a.to-a.from)*a.options.step;a.updatePosition(a.from+c,a.to+c);n(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.trackClick=function(b){var c=a.chart.pointer.normalize(b),e=a.to-a.from,d=a.y+a.scrollbarTop,f=a.x+a.scrollbarLeft;
a.options.vertical&&c.chartY>d||!a.options.vertical&&c.chartX>f?a.updatePosition(a.from+e,a.to+e):a.updatePosition(a.from-e,a.to-e);n(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})}},cursorToScrollbarPosition:function(a){var b=this.options,b=b.minWidth>this.calculatedWidth?b.minWidth:0;return{chartX:(a.chartX-this.x-this.xOffset)/(this.barWidth-b),chartY:(a.chartY-this.y-this.yOffset)/(this.barWidth-b)}},updatePosition:function(a,b){1<b&&(a=H(1-H(b-a)),b=1);0>a&&(b=H(b-a),a=0);
this.from=a;this.to=b},update:function(a){this.destroy();this.init(this.chart.renderer,e(!0,this.options,a),this.chart)},addEvents:function(){var a=this.options.inverted?[1,0]:[0,1],b=this.scrollbarButtons,c=this.scrollbarGroup.element,e=this.mouseDownHandler,d=this.mouseMoveHandler,h=this.mouseUpHandler,a=[[b[a[0]].element,"click",this.buttonToMinClick],[b[a[1]].element,"click",this.buttonToMaxClick],[this.track.element,"click",this.trackClick],[c,"mousedown",e],[w,"mousemove",d],[w,"mouseup",h]];
f&&a.push([c,"touchstart",e],[w,"touchmove",d],[w,"touchend",h]);q(a,function(a){C.apply(null,a)});this._events=a},removeEvents:function(){q(this._events,function(a){b.apply(null,a)});this._events=void 0},destroy:function(){var a=this.chart.scroller;this.removeEvents();q(["track","scrollbarRifles","scrollbar","scrollbarGroup","group"],function(a){this[a]&&this[a].destroy&&(this[a]=this[a].destroy())},this);a&&this===a.scrollbar&&(a.scrollbar=null,r(a.scrollbarButtons))}};t(G.prototype,"init",function(a){var b=
this;a.apply(b,Array.prototype.slice.call(arguments,1));b.options.scrollbar&&b.options.scrollbar.enabled&&(b.options.scrollbar.vertical=!b.horiz,b.options.startOnTick=b.options.endOnTick=!1,b.scrollbar=new D(b.chart.renderer,b.options.scrollbar,b.chart),C(b.scrollbar,"changed",function(a){var c=Math.min(z(b.options.min,b.min),b.min,b.dataMin),d=Math.max(z(b.options.max,b.max),b.max,b.dataMax)-c,e;b.horiz&&!b.reversed||!b.horiz&&b.reversed?(e=c+d*this.to,c+=d*this.from):(e=c+d*(1-this.from),c+=d*(1-
this.to));b.setExtremes(c,e,!0,!1,a)}))});t(G.prototype,"render",function(a){var b=Math.min(z(this.options.min,this.min),this.min,this.dataMin),c=Math.max(z(this.options.max,this.max),this.max,this.dataMax),e=this.scrollbar,d;a.apply(this,Array.prototype.slice.call(arguments,1));if(e){this.horiz?(e.position(this.left,this.top+this.height+2+this.chart.scrollbarsOffsets[1]+(this.opposite?0:this.axisTitleMargin+this.offset),this.width,this.height),d=1):(e.position(this.left+this.width+2+this.chart.scrollbarsOffsets[0]+
(this.opposite?this.axisTitleMargin+this.offset:0),this.top,this.width,this.height),d=0);if(!this.opposite&&!this.horiz||this.opposite&&this.horiz)this.chart.scrollbarsOffsets[d]+=this.scrollbar.size+this.scrollbar.options.margin;isNaN(b)||isNaN(c)||!l(this.min)||!l(this.max)?e.setRange(0,0):(d=(this.min-b)/(c-b),b=(this.max-b)/(c-b),this.horiz&&!this.reversed||!this.horiz&&this.reversed?e.setRange(d,b):e.setRange(1-b,1-d))}});t(G.prototype,"getOffset",function(a){var b=this.horiz?2:1,c=this.scrollbar;
a.apply(this,Array.prototype.slice.call(arguments,1));c&&(this.chart.scrollbarsOffsets=[0,0],this.chart.axisOffset[b]+=c.size+c.options.margin)});t(G.prototype,"destroy",function(a){this.scrollbar&&(this.scrollbar=this.scrollbar.destroy());a.apply(this,Array.prototype.slice.call(arguments,1))});a.Scrollbar=D})(K);(function(a){function D(a){this.init(a)}var C=a.addEvent,G=a.Axis,H=a.Chart,v=a.color,l=a.defaultOptions,r=a.defined,w=a.destroyObjectProperties,q=a.doc,n=a.each,f=a.erase,c=a.error,e=a.extend,
z=a.grep,b=a.hasTouch,t=a.isNumber,h=a.isObject,B=a.merge,p=a.pick,x=a.removeEvent,k=a.Scrollbar,F=a.Series,d=a.seriesTypes,u=a.wrap,m=a.swapXY,y=[].concat(a.defaultDataGroupingUnits),J=function(a){var b=z(arguments,t);if(b.length)return Math[a].apply(0,b)};y[4]=["day",[1,2,3,4]];y[5]=["week",[1,2,3]];d=void 0===d.areaspline?"line":"areaspline";e(l,{navigator:{height:40,margin:25,maskInside:!0,handles:{backgroundColor:"#f2f2f2",borderColor:"#999999"},maskFill:v("#6685c2").setOpacity(.3).get(),outlineColor:"#cccccc",
outlineWidth:1,series:{type:d,color:"#335cad",fillOpacity:.05,lineWidth:1,compare:null,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:y},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},pointRange:0,shadow:!1,threshold:null},xAxis:{className:"highcharts-navigator-xaxis",tickLength:0,lineWidth:0,gridLineColor:"#e6e6e6",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",
style:{color:"#999999"},x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",gridLineWidth:0,startOnTick:!1,endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});D.prototype={drawHandle:function(a,b,c,d){this.handles[b][d](c?{translateX:Math.round(this.left+this.height/2-8),translateY:Math.round(this.top+parseInt(a,10)+.5)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/
2-8)})},getHandlePath:function(a){return m(["M",-4.5,.5,"L",3.5,.5,"L",3.5,15.5,"L",-4.5,15.5,"L",-4.5,.5,"M",-1.5,4,"L",-1.5,12,"M",.5,4,"L",.5,12],a)},drawOutline:function(a,b,c,d){var g=this.navigatorOptions.maskInside,e=this.outline.strokeWidth(),f=e/2,e=e%2/2,h=this.outlineHeight,k=this.scrollbarHeight,m=this.size,l=this.left-k,n=this.top;c?(l-=f,c=n+b+e,b=n+a+e,a=["M",l+h,n-k-e,"L",l+h,c,"L",l,c,"L",l,b,"L",l+h,b,"L",l+h,n+m+k].concat(g?["M",l+h,c-f,"L",l+h,b+f]:[])):(a+=l+k-e,b+=l+k-e,n+=f,
a=["M",l,n,"L",a,n,"L",a,n+h,"L",b,n+h,"L",b,n,"L",l+m+2*k,n].concat(g?["M",a-f,n,"L",b+f,n]:[]));this.outline[d]({d:a})},drawMasks:function(a,b,c,d){var g=this.left,e=this.top,f=this.height,h,k,l,m;c?(l=[g,g,g],m=[e,e+a,e+b],k=[f,f,f],h=[a,b-a,this.size-b]):(l=[g,g+a,g+b],m=[e,e,e],k=[a,b-a,this.size-b],h=[f,f,f]);n(this.shades,function(a,b){a[d]({x:l[b],y:m[b],width:k[b],height:h[b]})})},renderElements:function(){var a=this,b=a.navigatorOptions,c=b.maskInside,d=a.chart,e=d.inverted,f=d.renderer,
h;a.navigatorGroup=h=f.g("navigator").attr({zIndex:8,visibility:"hidden"}).add();var k={cursor:e?"ns-resize":"ew-resize"};n([!c,c,!c],function(c,d){a.shades[d]=f.rect().addClass("highcharts-navigator-mask"+(1===d?"-inside":"-outside")).attr({fill:c?b.maskFill:"transparent"}).css(1===d&&k).add(h)});a.outline=f.path().addClass("highcharts-navigator-outline").attr({"stroke-width":b.outlineWidth,stroke:b.outlineColor}).add(h);n([0,1],function(c){a.handles[c]=f.path(a.getHandlePath(e)).attr({zIndex:7-
c}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+["left","right"][c]).add(h);var d=b.handles;a.handles[c].attr({fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":1}).css(k)})},update:function(a){this.destroy();B(!0,this.chart.options.navigator,this.options,a);this.init(this.chart)},render:function(a,b,c,d){var g=this.chart,e,f,h=this.scrollbarHeight,k,l=this.xAxis;e=this.navigatorEnabled;var m,n=this.rendered;f=g.inverted;var q=g.xAxis[0].minRange;if(!this.hasDragged||
r(c)){if(!t(a)||!t(b))if(n)c=0,d=l.width;else return;this.left=p(l.left,g.plotLeft+h+(f?g.plotWidth:0));this.size=m=k=p(l.len,(f?g.plotHeight:g.plotWidth)-2*h);g=f?h:k+2*h;c=p(c,l.toPixels(a,!0));d=p(d,l.toPixels(b,!0));t(c)&&Infinity!==Math.abs(c)||(c=0,d=g);a=l.toValue(c,!0);b=l.toValue(d,!0);if(Math.abs(b-a)<q)if(this.grabbedLeft)c=l.toPixels(b-q,!0);else if(this.grabbedRight)d=l.toPixels(a+q,!0);else return;this.zoomedMax=Math.min(Math.max(c,d,0),m);this.zoomedMin=Math.min(Math.max(this.fixedWidth?
this.zoomedMax-this.fixedWidth:Math.min(c,d),0),m);this.range=this.zoomedMax-this.zoomedMin;m=Math.round(this.zoomedMax);c=Math.round(this.zoomedMin);e&&(this.navigatorGroup.attr({visibility:"visible"}),n=n&&!this.hasDragged?"animate":"attr",this.drawMasks(c,m,f,n),this.drawOutline(c,m,f,n),this.drawHandle(c,0,f,n),this.drawHandle(m,1,f,n));this.scrollbar&&(f?(f=this.top-h,e=this.left-h+(e?0:this.height),h=k+2*h):(f=this.top+(e?this.height:-h),e=this.left-h),this.scrollbar.position(e,f,g,h),this.scrollbar.setRange(this.zoomedMin/
k,this.zoomedMax/k));this.rendered=!0}},addMouseEvents:function(){var a=this,c=a.chart,d=c.container,e=[],f,h;a.mouseMoveHandler=f=function(b){a.onMouseMove(b)};a.mouseUpHandler=h=function(b){a.onMouseUp(b)};e=a.getPartsEvents("mousedown");e.push(C(d,"mousemove",f),C(q,"mouseup",h));b&&(e.push(C(d,"touchmove",f),C(q,"touchend",h)),e.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=e;a.series&&a.series[0]&&e.push(C(a.series[0].xAxis,"foundExtremes",function(){c.navigator.modifyNavigatorAxisExtremes()}))},
getPartsEvents:function(a){var b=this,c=[];n(["shades","handles"],function(d){n(b[d],function(g,e){c.push(C(g.element,a,function(a){b[d+"Mousedown"](a,e)}))})});return c},shadesMousedown:function(a,b){a=this.chart.pointer.normalize(a);var c=this.chart,d=this.xAxis,e=this.zoomedMin,f=this.left,h=this.size,k=this.range,l=a.chartX,m;c.inverted&&(l=a.chartY,f=this.top);1===b?(this.grabbedCenter=l,this.fixedWidth=k,this.dragOffset=l-e):(a=l-f-k/2,0===b?a=Math.max(0,a):2===b&&a+k>=h&&(a=h-k,m=this.getUnionExtremes().dataMax),
a!==e&&(this.fixedWidth=k,b=d.toFixedRange(a,a+k,null,m),c.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,b.max),!0,null,{trigger:"navigator"})))},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);a=this.chart;var c=a.xAxis[0],d=a.inverted&&!c.reversed||!a.inverted&&c.reversed;0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=d?c.min:c.max):(this.grabbedRight=!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=d?c.max:c.min);a.fixedRange=null},
onMouseMove:function(a){var b=this,c=b.chart,d=b.left,e=b.navigatorSize,f=b.range,h=b.dragOffset,k=c.inverted;a.touches&&0===a.touches[0].pageX||(a=c.pointer.normalize(a),c=a.chartX,k&&(d=b.top,c=a.chartY),b.grabbedLeft?(b.hasDragged=!0,b.render(0,0,c-d,b.otherHandlePos)):b.grabbedRight?(b.hasDragged=!0,b.render(0,0,b.otherHandlePos,c-d)):b.grabbedCenter&&(b.hasDragged=!0,c<h?c=h:c>e+h-f&&(c=e+h-f),b.render(0,0,c-h,c-h+f)),b.hasDragged&&b.scrollbar&&b.scrollbar.options.liveRedraw&&(a.DOMType=a.type,
setTimeout(function(){b.onMouseUp(a)},0)))},onMouseUp:function(a){var b=this.chart,c=this.xAxis,d=this.scrollbar,e,f,h=a.DOMEvent||a;(!this.hasDragged||d&&d.hasDragged)&&"scrollbar"!==a.trigger||(this.zoomedMin===this.otherHandlePos?e=this.fixedExtreme:this.zoomedMax===this.otherHandlePos&&(f=this.fixedExtreme),this.zoomedMax===this.size&&(f=this.getUnionExtremes().dataMax),c=c.toFixedRange(this.zoomedMin,this.zoomedMax,e,f),r(c.min)&&b.xAxis[0].setExtremes(Math.min(c.min,c.max),Math.max(c.min,c.max),
!0,this.hasDragged?!1:null,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:h}));"mousemove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(n(this.eventsToUnbind,function(a){a()}),this.eventsToUnbind=void 0);this.removeBaseSeriesEvents()},removeBaseSeriesEvents:function(){var a=this.baseSeries||[];this.navigatorEnabled&&a[0]&&!1!==
this.navigatorOptions.adaptToUpdatedData&&(n(a,function(a){x(a,"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&x(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(a){var b=a.options,c=b.navigator,d=c.enabled,e=b.scrollbar,f=e.enabled,b=d?c.height:0,h=f?e.height:0;this.handles=[];this.shades=[];this.chart=a;this.setBaseSeries();this.height=b;this.scrollbarHeight=h;this.scrollbarEnabled=f;this.navigatorEnabled=d;this.navigatorOptions=c;this.scrollbarOptions=e;this.outlineHeight=
b+h;this.opposite=p(c.opposite,!d&&a.inverted);var l=this,e=l.baseSeries,f=a.xAxis.length,m=a.yAxis.length,n=e&&e[0]&&e[0].xAxis||a.xAxis[0];a.extraMargin={type:l.opposite?"plotTop":"marginBottom",value:(d||!a.inverted?l.outlineHeight:0)+c.margin};a.inverted&&(a.extraMargin.type=l.opposite?"marginRight":"plotLeft");a.isDirtyBox=!0;l.navigatorEnabled?(l.xAxis=new G(a,B({breaks:n.options.breaks,ordinal:n.options.ordinal},c.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",isX:!0,type:"datetime",
index:f,offset:0,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},a.inverted?{offsets:[h,0,-h,0],width:b}:{offsets:[0,-h,0,h],height:b})),l.yAxis=new G(a,B(c.yAxis,{id:"navigator-y-axis",alignTicks:!1,offset:0,index:m,zoomEnabled:!1},a.inverted?{width:b}:{height:b})),e||c.series.data?l.addBaseSeries():0===a.series.length&&u(a,"redraw",function(b,c){0<a.series.length&&!l.series&&(l.setBaseSeries(),a.redraw=b);b.call(a,c)}),l.renderElements(),l.addMouseEvents()):
l.xAxis={translate:function(b,c){var d=a.xAxis[0],g=d.getExtremes(),e=d.len-2*h,f=J("min",d.options.min,g.dataMin),d=J("max",d.options.max,g.dataMax)-f;return c?b*d/e+f:e*(b-f)/d},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,!0)},toFixedRange:G.prototype.toFixedRange,fake:!0};a.options.scrollbar.enabled&&(a.scrollbar=l.scrollbar=new k(a.renderer,B(a.options.scrollbar,{margin:l.navigatorEnabled?0:10,vertical:a.inverted}),a),C(l.scrollbar,"changed",function(b){var c=
l.size,d=c*this.to,c=c*this.from;l.hasDragged=l.scrollbar.hasDragged;l.render(0,0,c,d);(a.options.scrollbar.liveRedraw||"mousemove"!==b.DOMType)&&setTimeout(function(){l.onMouseUp(b)})}));l.addBaseSeriesEvents();l.addChartEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],c=this.xAxis,d=c.options,e=b.options,f;a&&null===b.dataMin||(f={dataMin:p(d&&d.min,J("min",e.min,b.dataMin,c.dataMin,c.min)),dataMax:p(d&&d.max,J("max",e.max,b.dataMax,c.dataMax,c.max))});return f},setBaseSeries:function(a){var b=
this.chart,c;a=a||b.options&&b.options.navigator.baseSeries||0;this.series&&(this.removeBaseSeriesEvents(),n(this.series,function(a){a.destroy()}));c=this.baseSeries=[];n(b.series||[],function(b,d){(b.options.showInNavigator||(d===a||b.options.id===a)&&!1!==b.options.showInNavigator)&&c.push(b)});this.xAxis&&!this.xAxis.fake&&this.addBaseSeries()},addBaseSeries:function(){var a=this,b=a.chart,c=a.series=[],d=a.baseSeries,e,f,h=a.navigatorOptions.series,k,l={enableMouseTracking:!1,index:null,group:"nav",
padXAxis:!1,xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0};d?n(d,function(d,g){l.name="Navigator "+(g+1);e=d.options||{};k=e.navigatorOptions||{};f=B(e,l,h,k);g=k.data||h.data;a.hasNavigatorData=a.hasNavigatorData||!!g;f.data=g||e.data&&e.data.slice(0);d.navigatorSeries=b.initSeries(f);c.push(d.navigatorSeries)}):(f=B(h,l),f.data=h.data,a.hasNavigatorData=!!f.data,c.push(b.initSeries(f)));this.addBaseSeriesEvents()},addBaseSeriesEvents:function(){var a=
this,b=a.baseSeries||[];b[0]&&b[0].xAxis&&C(b[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);!1!==this.navigatorOptions.adaptToUpdatedData&&n(b,function(b){b.xAxis&&C(b,"updatedData",this.updatedDataHandler);C(b,"remove",function(){this.navigatorSeries&&(f(a.series,this.navigatorSeries),this.navigatorSeries.remove(!1),delete this.navigatorSeries)})},this)},modifyNavigatorAxisExtremes:function(){var a=this.xAxis,b;a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===
a.max||(a.min=b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),c=b.dataMin,d=b.dataMax,b=b.max-b.min,e=a.stickToMin,f=a.stickToMax,h,k,l=a.series&&a.series[0],m=!!this.setExtremes;this.eventArgs&&"rangeSelectorButton"===this.eventArgs.trigger||(e&&(k=c,h=k+b),f&&(h=d,e||(k=Math.max(h-b,l&&l.xData?l.xData[0]:-Number.MAX_VALUE))),m&&(e||f)&&t(k)&&(this.min=this.userMin=k,this.max=this.userMax=h));a.stickToMin=a.stickToMax=null},updatedDataHandler:function(){var a=
this.chart.navigator,b=this.navigatorSeries;a.stickToMin=t(this.xAxis.min)&&this.xAxis.min<=this.xData[0];a.stickToMax=Math.round(a.zoomedMax)>=Math.round(a.size);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){C(this.chart,"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);b&&a.render(b.min,b.max)})},destroy:function(){this.removeEvents();this.xAxis&&
(f(this.chart.xAxis,this.xAxis),f(this.chart.axes,this.xAxis));this.yAxis&&(f(this.chart.yAxis,this.yAxis),f(this.chart.axes,this.yAxis));n(this.series||[],function(a){a.destroy&&a.destroy()});n("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),function(a){this[a]&&this[a].destroy&&this[a].destroy();this[a]=null},this);n([this.handles],function(a){w(a)},this)}};a.Navigator=D;u(G.prototype,"zoom",function(a,b,c){var d=this.chart,
e=d.options,g=e.chart.zoomType,f=e.navigator,e=e.rangeSelector,h;this.isXAxis&&(f&&f.enabled||e&&e.enabled)&&("x"===g?d.resetZoomButton="blocked":"y"===g?h=!1:"xy"===g&&(d=this.previousZoom,r(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom)));return void 0!==h?h:a.call(this,b,c)});u(H.prototype,"init",function(a,b,c){C(this,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=this.navigator=new D(this)});a.call(this,
b,c)});u(H.prototype,"setChartSize",function(a){var b=this.legend,c=this.navigator,d,e,f,h;a.apply(this,[].slice.call(arguments,1));c&&(e=b.options,f=c.xAxis,h=c.yAxis,d=c.scrollbarHeight,this.inverted?(c.left=c.opposite?this.chartWidth-d-c.height:this.spacing[3]+d,c.top=this.plotTop+d):(c.left=this.plotLeft+d,c.top=c.navigatorOptions.top||this.chartHeight-c.height-d-this.spacing[2]-("bottom"===e.verticalAlign&&e.enabled&&!e.floating?b.legendHeight+p(e.margin,10):0)),f&&h&&(this.inverted?f.options.left=
h.options.left=c.left:f.options.top=h.options.top=c.top,f.setAxisSize(),h.setAxisSize()))});u(F.prototype,"addPoint",function(a,b,d,e,f){var g=this.options.turboThreshold;g&&this.xData.length>g&&h(b,!0)&&this.chart.navigator&&c(20,!0);a.call(this,b,d,e,f)});u(H.prototype,"addSeries",function(a,b,c,d){a=a.call(this,b,!1,d);this.navigator&&this.navigator.setBaseSeries();p(c,!0)&&this.redraw();return a});u(F.prototype,"update",function(a,b,c){a.call(this,b,!1);this.chart.navigator&&this.chart.navigator.setBaseSeries();
p(c,!0)&&this.chart.redraw()});H.prototype.callbacks.push(function(a){var b=a.navigator;b&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))})})(K);(function(a){function D(a){this.init(a)}var C=a.addEvent,G=a.Axis,H=a.Chart,v=a.css,l=a.createElement,r=a.dateFormat,w=a.defaultOptions,q=w.global.useUTC,n=a.defined,f=a.destroyObjectProperties,c=a.discardElement,e=a.each,z=a.extend,b=a.fireEvent,t=a.Date,h=a.isNumber,B=a.merge,p=a.pick,x=a.pInt,k=a.splat,F=a.wrap;z(w,{rangeSelector:{buttonTheme:{"stroke-width":0,
width:28,height:18,padding:2,zIndex:7},height:35,inputPosition:{align:"right"},labelStyle:{color:"#666666"}}});w.lang=B(w.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});D.prototype={clickButton:function(a,b){var c=this,d=c.chart,f=c.buttonOptions[a],l=d.xAxis[0],n=d.scroller&&d.scroller.getUnionExtremes()||l||{},g=n.dataMin,r=n.dataMax,t,u=l&&Math.round(Math.min(l.max,p(r,l.max))),v=f.type,w,n=f._range,x,z,B,D=f.dataGrouping;if(null!==g&&null!==r){d.fixedRange=n;D&&
(this.forcedDataGrouping=!0,G.prototype.setDataGrouping.call(l||{chart:this.chart},D,!1));if("month"===v||"year"===v)l?(v={range:f,max:u,dataMin:g,dataMax:r},t=l.minFromRange.call(v),h(v.newMax)&&(u=v.newMax)):n=f;else if(n)t=Math.max(u-n,g),u=Math.min(t+n,r);else if("ytd"===v)if(l)void 0===r&&(g=Number.MAX_VALUE,r=Number.MIN_VALUE,e(d.series,function(a){a=a.xData;g=Math.min(a[0],g);r=Math.max(a[a.length-1],r)}),b=!1),u=c.getYTDExtremes(r,g,q),t=x=u.min,u=u.max;else{C(d,"beforeRender",function(){c.clickButton(a)});
return}else"all"===v&&l&&(t=g,u=r);c.setSelected(a);l?l.setExtremes(t,u,p(b,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:f}):(w=k(d.options.xAxis)[0],B=w.range,w.range=n,z=w.min,w.min=x,C(d,"load",function(){w.range=B;w.min=z}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],
init:function(a){var c=this,d=a.options.rangeSelector,f=d.buttons||[].concat(c.defaultButtons),h=d.selected,k=function(){var a=c.minInput,d=c.maxInput;a&&a.blur&&b(a,"blur");d&&d.blur&&b(d,"blur")};c.chart=a;c.options=d;c.buttons=[];a.extraTopMargin=d.height;c.buttonOptions=f;this.unMouseDown=C(a.container,"mousedown",k);this.unResize=C(a,"resize",k);e(f,c.computeButtonRange);void 0!==h&&f[h]&&this.clickButton(h,!1);C(a,"load",function(){C(a.xAxis[0],"setExtremes",function(b){this.max-this.min!==
a.fixedRange&&"rangeSelectorButton"!==b.trigger&&"updatedData"!==b.trigger&&c.forcedDataGrouping&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=this.chart,b=a.xAxis[0],c=Math.round(b.max-b.min),f=!b.hasVisibleSeries,a=a.scroller&&a.scroller.getUnionExtremes()||b,k=a.dataMin,l=a.dataMax,a=this.getYTDExtremes(l,k,q),n=a.min,g=a.max,p=this.selected,r=h(p),t=this.options.allButtonsEnabled,v=this.buttons;e(this.buttonOptions,function(a,d){var e=a._range,h=a.type,m=a.count||1;a=v[d];
var q=0;d=d===p;var u=e>l-k,y=e<b.minRange,w=!1,x=!1,e=e===c;("month"===h||"year"===h)&&c>=864E5*{month:28,year:365}[h]*m&&c<=864E5*{month:31,year:366}[h]*m?e=!0:"ytd"===h?(e=g-n===c,w=!d):"all"===h&&(e=b.max-b.min>=l-k,x=!d&&r&&e);h=!t&&(u||y||x||f);e=d&&e||e&&!r&&!w;h?q=3:e&&(r=!0,q=2);a.state!==q&&a.setState(q)})},computeButtonRange:function(a){var b=a.type,c=a.count||1,d={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(d[b])a._range=d[b]*c;else if("month"===b||"year"===
b)a._range=864E5*{month:30,year:365}[b]*c},setInputValue:function(a,b){var c=this.chart.options.rangeSelector,d=this[a+"Input"];n(b)&&(d.previousValue=d.HCTime,d.HCTime=b);d.value=r(c.inputEditDateFormat||"%Y-%m-%d",d.HCTime);this[a+"DateBox"].attr({text:r(c.inputDateFormat||"%b %e, %Y",d.HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];v(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},
hideInput:function(a){v(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function b(){var a=p.value,b=(k.inputDateParser||Date.parse)(a),e=d.xAxis[0],g=d.scroller&&d.scroller.xAxis?d.scroller.xAxis:e,f=g.dataMin,g=g.dataMax;b!==p.previousValue&&(p.previousValue=b,h(b)||(b=a.split("-"),b=Date.UTC(x(b[0]),x(b[1])-1,x(b[2]))),h(b)&&(q||(b+=6E4*(new Date).getTimezoneOffset()),n?b>c.maxInput.HCTime?b=void 0:b<f&&(b=f):b<c.minInput.HCTime?b=void 0:b>g&&(b=
g),void 0!==b&&e.setExtremes(n?b:e.min,n?e.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}var c=this,d=c.chart,e=d.renderer.style||{},f=d.renderer,k=d.options.rangeSelector,g=c.div,n="min"===a,p,r,t=this.inputGroup;this[a+"Label"]=r=f.label(w.lang[n?"rangeSelectorFrom":"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(t);t.offset+=r.width+5;this[a+"DateBox"]=f=f.label("",t.offset).addClass("highcharts-range-input").attr({padding:2,width:k.inputBoxWidth||
90,height:k.inputBoxHeight||17,stroke:k.inputBoxBorderColor||"#cccccc","stroke-width":1,"text-align":"center"}).on("click",function(){c.showInput(a);c[a+"Input"].focus()}).add(t);t.offset+=f.width+(n?10:0);this[a+"Input"]=p=l("input",{name:a,className:"highcharts-range-selector",type:"text"},{top:d.plotTop+"px"},g);r.css(B(e,k.labelStyle));f.css(B({color:"#333333"},e,k.inputStyle));v(p,z({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:e.fontSize,fontFamily:e.fontFamily,
left:"-9em"},k.inputStyle));p.onfocus=function(){c.showInput(a)};p.onblur=function(){c.hideInput(a)};p.onchange=b;p.onkeypress=function(a){13===a.keyCode&&b()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a=p((b.buttonPosition||{}).y,a.plotTop-a.axisOffset[0]-b.height);return{buttonTop:a,inputTop:a-10}},getYTDExtremes:function(a,b,c){var d=new t(a),e=d[t.hcGetFullYear]();c=c?t.UTC(e,0,1):+new t(e,0,1);b=Math.max(b||0,c);d=d.getTime();return{max:Math.min(a||d,d),min:b}},render:function(a,
b){var c=this,d=c.chart,f=d.renderer,h=d.container,k=d.options,g=k.exporting&&!1!==k.exporting.enabled&&k.navigation&&k.navigation.buttonOptions,q=k.rangeSelector,r=c.buttons,k=w.lang,t=c.div,t=c.inputGroup,u=q.buttonTheme,v=q.buttonPosition||{},x=q.inputEnabled,B=u&&u.states,C=d.plotLeft,D,F=this.getPosition(),G=c.group,H=c.rendered;!1!==q.enabled&&(H||(c.group=G=f.g("range-selector-buttons").add(),c.zoomText=f.text(k.rangeSelectorZoom,p(v.x,C),15).css(q.labelStyle).add(G),D=p(v.x,C)+c.zoomText.getBBox().width+
5,e(c.buttonOptions,function(a,b){r[b]=f.button(a.text,D,0,function(){c.clickButton(b);c.isActive=!0},u,B&&B.hover,B&&B.select,B&&B.disabled).attr({"text-align":"center"}).add(G);D+=r[b].width+p(q.buttonSpacing,5)}),!1!==x&&(c.div=t=l("div",null,{position:"relative",height:0,zIndex:1}),h.parentNode.insertBefore(t,h),c.inputGroup=t=f.g("input-group").add(),t.offset=0,c.drawInput("min"),c.drawInput("max"))),c.updateButtonStates(),G[H?"animate":"attr"]({translateY:F.buttonTop}),!1!==x&&(t.align(z({y:F.inputTop,
width:t.offset,x:g&&F.inputTop<(g.y||0)+g.height-d.spacing[0]?-40:0},q.inputPosition),!0,d.spacingBox),n(x)||(d=G.getBBox(),t[t.alignAttr.translateX<d.x+d.width+10?"hide":"show"]()),c.setInputValue("min",a),c.setInputValue("max",b)),c.rendered=!0)},update:function(a){var b=this.chart;B(!0,b.options.rangeSelector,a);this.destroy();this.init(b)},destroy:function(){var a=this.minInput,b=this.maxInput,e;this.unMouseDown();this.unResize();f(this.buttons);a&&(a.onfocus=a.onblur=a.onchange=null);b&&(b.onfocus=
b.onblur=b.onchange=null);for(e in this)this[e]&&"chart"!==e&&(this[e].destroy?this[e].destroy():this[e].nodeType&&c(this[e])),this[e]!==D.prototype[e]&&(this[e]=null)}};G.prototype.toFixedRange=function(a,b,c,e){var d=this.chart&&this.chart.fixedRange;a=p(c,this.translate(a,!0,!this.horiz));b=p(e,this.translate(b,!0,!this.horiz));c=d&&(b-a)/d;.7<c&&1.3>c&&(e?a=b-d:b=a+d);h(a)||(a=b=void 0);return{min:a,max:b}};G.prototype.minFromRange=function(){var a=this.range,b={month:"Month",year:"FullYear"}[a.type],
c,e=this.max,f,k,l=function(a,c){var d=new Date(a);d["set"+b](d["get"+b]()+c);return d.getTime()-a};h(a)?(c=e-a,k=a):(c=e+l(e,-a.count),this.chart&&(this.chart.fixedRange=e-c));f=p(this.dataMin,Number.MIN_VALUE);h(c)||(c=f);c<=f&&(c=f,void 0===k&&(k=l(c,a.count)),this.newMax=Math.min(c+k,this.dataMax));h(e)||(c=void 0);return c};F(H.prototype,"init",function(a,b,c){C(this,"init",function(){this.options.rangeSelector.enabled&&(this.rangeSelector=new D(this))});a.call(this,b,c)});H.prototype.callbacks.push(function(a){function b(){c=
a.xAxis[0].getExtremes();h(c.min)&&d.render(c.min,c.max)}var c,d=a.rangeSelector,e,f;d&&(f=C(a.xAxis[0],"afterSetExtremes",function(a){d.render(a.min,a.max)}),e=C(a,"redraw",b),b());C(a,"destroy",function(){d&&(e(),f())})});a.RangeSelector=D})(K);(function(a){var D=a.arrayMax,C=a.arrayMin,G=a.Axis,H=a.Chart,v=a.defined,l=a.each,r=a.extend,w=a.format,q=a.inArray,n=a.isNumber,f=a.isString,c=a.map,e=a.merge,z=a.pick,b=a.Point,t=a.Renderer,h=a.Series,B=a.splat,p=a.SVGRenderer,x=a.VMLRenderer,k=a.wrap,
F=h.prototype,d=F.init,u=F.processData,m=b.prototype.tooltipFormatter;a.StockChart=a.stockChart=function(b,d,h){var k=f(b)||b.nodeName,g=arguments[k?1:0],l=g.series,m=a.getOptions(),n,p=z(g.navigator&&g.navigator.enabled,m.navigator.enabled,!0),q=p?{startOnTick:!1,endOnTick:!1}:null,r={marker:{enabled:!1,radius:2}},t={shadow:!1,borderWidth:0};g.xAxis=c(B(g.xAxis||{}),function(a){return e({minPadding:0,maxPadding:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},m.xAxis,
a,{type:"datetime",categories:null},q)});g.yAxis=c(B(g.yAxis||{}),function(a){n=z(a.opposite,!0);return e({labels:{y:-2},opposite:n,showLastLabel:!1,title:{text:null}},m.yAxis,a)});g.series=null;g=e({chart:{panning:!0,pinchType:"x"},navigator:{enabled:p},scrollbar:{enabled:z(m.scrollbar.enabled,!0)},rangeSelector:{enabled:z(m.rangeSelector.enabled,!0)},title:{text:null},tooltip:{shared:!0,crosshairs:!0},legend:{enabled:!1},plotOptions:{line:r,spline:r,area:r,areaspline:r,arearange:r,areasplinerange:r,
column:t,columnrange:t,candlestick:t,ohlc:t}},g,{isStock:!0});g.series=l;return k?new H(b,g,h):new H(g,d)};k(G.prototype,"autoLabelAlign",function(a){var b=this.chart,c=this.options,b=b._labelPanes=b._labelPanes||{},d=this.options.labels;return this.chart.options.isStock&&"yAxis"===this.coll&&(c=c.top+","+c.height,!b[c]&&d.enabled)?(15===d.x&&(d.x=0),void 0===d.align&&(d.align="right"),b[c]=this,"right"):a.call(this,[].slice.call(arguments,1))});k(G.prototype,"destroy",function(a){var b=this.chart,
c=this.options&&this.options.top+","+this.options.height;c&&b._labelPanes&&b._labelPanes[c]===this&&delete b._labelPanes[c];return a.call(this,Array.prototype.slice.call(arguments,1))});k(G.prototype,"getPlotLinePath",function(a,b,d,e,g,h){var k=this,m=this.isLinked&&!this.series?this.linkedParent.series:this.series,p=k.chart,r=p.renderer,t=k.left,u=k.top,w,x,y,B,E=[],C=[],D,F;if("colorAxis"===k.coll)return a.apply(this,[].slice.call(arguments,1));C=function(a){var b="xAxis"===a?"yAxis":"xAxis";a=
k.options[b];return n(a)?[p[b][a]]:f(a)?[p.get(a)]:c(m,function(a){return a[b]})}(k.coll);l(k.isXAxis?p.yAxis:p.xAxis,function(a){if(v(a.options.id)?-1===a.options.id.indexOf("navigator"):1){var b=a.isXAxis?"yAxis":"xAxis",b=v(a.options[b])?p[b][a.options[b]]:p[b][0];k===b&&C.push(a)}});D=C.length?[]:[k.isXAxis?p.yAxis[0]:p.xAxis[0]];l(C,function(a){-1===q(a,D)&&D.push(a)});F=z(h,k.translate(b,null,null,e));n(F)&&(k.horiz?l(D,function(a){var b;x=a.pos;B=x+a.len;w=y=Math.round(F+k.transB);if(w<t||
w>t+k.width)g?w=y=Math.min(Math.max(t,w),t+k.width):b=!0;b||E.push("M",w,x,"L",y,B)}):l(D,function(a){var b;w=a.pos;y=w+a.len;x=B=Math.round(u+k.height-F);if(x<u||x>u+k.height)g?x=B=Math.min(Math.max(u,x),k.top+k.height):b=!0;b||E.push("M",w,x,"L",y,B)}));return 0<E.length?r.crispPolyLine(E,d||1):null});G.prototype.getPlotBandPath=function(a,b){b=this.getPlotLinePath(b,null,null,!0);a=this.getPlotLinePath(a,null,null,!0);var c=[],d;if(a&&b)if(a.toString()===b.toString())c=a,c.flat=!0;else for(d=0;d<
a.length;d+=6)c.push("M",a[d+1],a[d+2],"L",a[d+4],a[d+5],b[d+4],b[d+5],b[d+1],b[d+2],"z");else c=null;return c};p.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};t===x&&(x.prototype.crispPolyLine=p.prototype.crispPolyLine);k(G.prototype,"hideCrosshair",function(a,b){a.call(this,b);this.crossLabel&&(this.crossLabel=this.crossLabel.hide())});k(G.prototype,
"drawCrosshair",function(a,b,c){var d,e;a.call(this,b,c);if(v(this.crosshair.label)&&this.crosshair.label.enabled&&this.cross){a=this.chart;var f=this.options.crosshair.label,h=this.horiz;d=this.opposite;e=this.left;var k=this.top,l=this.crossLabel,m,n=f.format,p="",q="inside"===this.options.tickPosition,t=!1!==this.crosshair.snap,u=0;b||(b=this.cross&&this.cross.e);m=h?"center":d?"right"===this.labelAlign?"right":"left":"left"===this.labelAlign?"left":"center";l||(l=this.crossLabel=a.renderer.label(null,
null,null,f.shape||"callout").addClass("highcharts-crosshair-label"+(this.series[0]&&" highcharts-color-"+this.series[0].colorIndex)).attr({align:f.align||m,padding:z(f.padding,8),r:z(f.borderRadius,3),zIndex:2}).add(this.labelGroup),l.attr({fill:f.backgroundColor||this.series[0]&&this.series[0].color||"#666666",stroke:f.borderColor||"","stroke-width":f.borderWidth||0}).css(r({color:"#ffffff",fontWeight:"normal",fontSize:"11px",textAlign:"center"},f.style)));h?(m=t?c.plotX+e:b.chartX,k+=d?0:this.height):
(m=d?this.width+e:0,k=t?c.plotY+k:b.chartY);n||f.formatter||(this.isDatetimeAxis&&(p="%b %d, %Y"),n="{value"+(p?":"+p:"")+"}");b=t?c[this.isXAxis?"x":"y"]:this.toValue(h?b.chartX:b.chartY);l.attr({text:n?w(n,{value:b}):f.formatter.call(this,b),x:m,y:k,visibility:"visible"});b=l.getBBox();if(h){if(q&&!d||!q&&d)k=l.y-b.height}else k=l.y-b.height/2;h?(d=e-b.x,e=e+this.width-b.x):(d="left"===this.labelAlign?e:0,e="right"===this.labelAlign?e+this.width:a.chartWidth);l.translateX<d&&(u=d-l.translateX);
l.translateX+b.width>=e&&(u=-(l.translateX+b.width-e));l.attr({x:m+u,y:k,anchorX:h?m:this.opposite?0:a.chartWidth,anchorY:h?this.opposite?a.chartHeight:0:k+b.height/2})}});F.init=function(){d.apply(this,arguments);this.setCompare(this.options.compare)};F.setCompare=function(a){this.modifyValue="value"===a||"percent"===a?function(b,c){var d=this.compareValue;if(void 0!==b&&void 0!==d)return b="value"===a?b-d:b/d*100-(100===this.options.compareBase?0:100),c&&(c.change=b),b}:null;this.userOptions.compare=
a;this.chart.hasRendered&&(this.isDirty=!0)};F.processData=function(){var a,b=-1,c,d,e,f;u.apply(this,arguments);if(this.xAxis&&this.processedYData)for(c=this.processedXData,d=this.processedYData,e=d.length,this.pointArrayMap&&(b=q("close",this.pointArrayMap),-1===b&&(b=q(this.pointValKey||"y",this.pointArrayMap))),a=0;a<e-1;a++)if(f=-1<b?d[a][b]:d[a],n(f)&&c[a+1]>=this.xAxis.min&&0!==f){this.compareValue=f;break}};k(F,"getExtremes",function(a){var b;a.apply(this,[].slice.call(arguments,1));this.modifyValue&&
(b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=C(b),this.dataMax=D(b))});G.prototype.setCompare=function(a,b){this.isXAxis||(l(this.series,function(b){b.setCompare(a)}),z(b,!0)&&this.chart.redraw())};b.prototype.tooltipFormatter=function(b){b=b.replace("{point.change}",(0<this.change?"+":"")+a.numberFormat(this.change,z(this.series.tooltipOptions.changeDecimals,2)));return m.apply(this,[b])};k(h.prototype,"render",function(a){this.chart.is3d&&this.chart.is3d()||this.chart.polar||
!this.xAxis||this.xAxis.isRadial||(!this.clipBox&&this.animate?(this.clipBox=e(this.chart.clipBox),this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]?this.chart[this.sharedClipKey].attr({width:this.xAxis.len,height:this.yAxis.len}):this.clipBox&&(this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len));a.call(this)})})(K);return K});


/***/ }),
/* 123 */
/***/ (function(module, exports) {

/*
 Highcharts JS v5.0.10 (2017-03-31)
 Exporting module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(k){"object"===typeof module&&module.exports?module.exports=k:k(Highcharts)})(function(k){(function(f){var k=f.defaultOptions,n=f.doc,A=f.Chart,w=f.addEvent,F=f.removeEvent,D=f.fireEvent,q=f.createElement,B=f.discardElement,u=f.css,p=f.merge,C=f.pick,h=f.each,r=f.extend,G=f.isTouchDevice,E=f.win,H=f.Renderer.prototype.symbols;r(k.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",
contextButtonTitle:"Chart context menu"});k.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};p(!0,k.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",background:"none",color:"#333333",fontSize:G?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",color:"#ffffff"},buttonOptions:{symbolFill:"#666666",
symbolStroke:"#666666",symbolStrokeWidth:3,theme:{fill:"#ffffff",stroke:"none",padding:5}}});k.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},
{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};f.post=function(a,b,e){var c;a=q("form",p({method:"post",action:a,enctype:"multipart/form-data"},e),{display:"none"},n.body);for(c in b)q("input",{type:"hidden",name:c,value:b[c]},null,a);a.submit();B(a)};r(A.prototype,{sanitizeSVG:function(a,b){if(b&&b.exporting&&b.exporting.allowHTML){var e=a.match(/<\/svg>(.*?$)/);e&&e[1]&&
(e='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+b.chart.width+'" height\x3d"'+b.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+e[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",a=a.replace("\x3c/svg\x3e",e+"\x3c/svg\x3e"))}a=a.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g,
" xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad");return a=a.replace(/<IMG /g,"\x3cimage ").replace(/<(\/?)TITLE>/g,"\x3c$1title\x3e").replace(/height=([^" ]+)/g,'height\x3d"$1"').replace(/width=([^" ]+)/g,'width\x3d"$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href\x3d"$1"/\x3e').replace(/ id=([^" >]+)/g,' id\x3d"$1"').replace(/class=([^" >]+)/g,
'class\x3d"$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},getChartHTML:function(){return this.container.innerHTML},getSVG:function(a){var b,e,c,v,m,g=p(this.options,a);n.createElementNS||(n.createElementNS=function(a,b){return n.createElement(b)});e=q("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},n.body);c=this.renderTo.style.width;m=this.renderTo.style.height;
c=g.exporting.sourceWidth||g.chart.width||/px$/.test(c)&&parseInt(c,10)||600;m=g.exporting.sourceHeight||g.chart.height||/px$/.test(m)&&parseInt(m,10)||400;r(g.chart,{animation:!1,renderTo:e,forExport:!0,renderer:"SVGRenderer",width:c,height:m});g.exporting.enabled=!1;delete g.data;g.series=[];h(this.series,function(a){v=p(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});v.isInternal||g.series.push(v)});h(this.axes,function(a){a.userOptions.internalKey||(a.userOptions.internalKey=
f.uniqueKey())});b=new f.Chart(g,this.callback);a&&h(["xAxis","yAxis","series"],function(c){var d={};a[c]&&(d[c]=a[c],b.update(d))});h(this.axes,function(a){var c=f.find(b.axes,function(b){return b.options.internalKey===a.userOptions.internalKey}),d=a.getExtremes(),e=d.userMin,d=d.userMax;!c||void 0===e&&void 0===d||c.setExtremes(e,d,!0,!1)});c=b.getChartHTML();c=this.sanitizeSVG(c,g);g=null;b.destroy();B(e);return c},getSVGForExport:function(a,b){var e=this.options.exporting;return this.getSVG(p({chart:{borderRadius:0}},
e.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||e.sourceWidth,sourceHeight:a&&a.sourceHeight||e.sourceHeight}}))},exportChart:function(a,b){b=this.getSVGForExport(a,b);a=p(this.options.exporting,a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale,svg:b},a.formAttributes)},print:function(){var a=this,b=a.container,e=[],c=b.parentNode,f=n.body,m=f.childNodes,g=a.options.exporting.printMaxWidth,d,t;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,
0);D(a,"beforePrint");if(t=g&&a.chartWidth>g)d=[a.options.chart.width,void 0,!1],a.setSize(g,void 0,!1);h(m,function(a,b){1===a.nodeType&&(e[b]=a.style.display,a.style.display="none")});f.appendChild(b);E.focus();E.print();setTimeout(function(){c.appendChild(b);h(m,function(a,b){1===a.nodeType&&(a.style.display=e[b])});a.isPrinting=!1;t&&a.setSize.apply(a,d);D(a,"afterPrint")},1E3)}},contextMenu:function(a,b,e,c,f,m,g){var d=this,t=d.options.navigation,v=d.chartWidth,k=d.chartHeight,p="cache-"+a,
l=d[p],x=Math.max(f,m),y,z;l||(d[p]=l=q("div",{className:a},{position:"absolute",zIndex:1E3,padding:x+"px"},d.container),y=q("div",{className:"highcharts-menu"},null,l),u(y,r({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},t.menuStyle)),z=function(){u(l,{display:"none"});g&&g.setState(0);d.openMenu=!1},d.exportEvents.push(w(l,"mouseleave",function(){l.hideTimer=setTimeout(z,500)}),w(l,"mouseenter",function(){clearTimeout(l.hideTimer)}),w(n,"mouseup",
function(b){d.pointer.inClass(b.target,a)||z()})),h(b,function(a){if(a){var b;a.separator?b=q("hr",null,null,y):(b=q("div",{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation();z();a.onclick&&a.onclick.apply(d,arguments)},innerHTML:a.text||d.options.lang[a.textKey]},null,y),b.onmouseover=function(){u(this,t.menuItemHoverStyle)},b.onmouseout=function(){u(this,t.menuItemStyle)},u(b,r({cursor:"pointer"},t.menuItemStyle)));d.exportDivElements.push(b)}}),d.exportDivElements.push(y,
l),d.exportMenuWidth=l.offsetWidth,d.exportMenuHeight=l.offsetHeight);b={display:"block"};e+d.exportMenuWidth>v?b.right=v-e-f-x+"px":b.left=e-x+"px";c+m+d.exportMenuHeight>k&&"top"!==g.alignOptions.verticalAlign?b.bottom=k-c-x+"px":b.top=c+m-x+"px";u(l,b);d.openMenu=!0},addButton:function(a){var b=this,e=b.renderer,c=p(b.options.navigation.buttonOptions,a),f=c.onclick,m=c.menuItems,g,d,k=c.symbolSize||12;b.btnCount||(b.btnCount=0);b.exportDivElements||(b.exportDivElements=[],b.exportSVGElements=[]);
if(!1!==c.enabled){var h=c.theme,n=h.states,q=n&&n.hover,n=n&&n.select,l;delete h.states;f?l=function(a){a.stopPropagation();f.call(b,a)}:m&&(l=function(){b.contextMenu(d.menuClassName,m,d.translateX,d.translateY,d.width,d.height,d);d.setState(2)});c.text&&c.symbol?h.paddingLeft=C(h.paddingLeft,25):c.text||r(h,{width:c.width,height:c.height,padding:0});d=e.button(c.text,0,0,l,h,q,n).addClass(a.className).attr({"stroke-linecap":"round",title:b.options.lang[c._titleKey],zIndex:3});d.menuClassName=a.menuClassName||
"highcharts-menu-"+b.btnCount++;c.symbol&&(g=e.symbol(c.symbol,c.symbolX-k/2,c.symbolY-k/2,k,k).addClass("highcharts-button-symbol").attr({zIndex:1}).add(d),g.attr({stroke:c.symbolStroke,fill:c.symbolFill,"stroke-width":c.symbolStrokeWidth||1}));d.add().align(r(c,{width:d.width,x:C(c.x,b.buttonOffset)}),!0,"spacingBox");b.buttonOffset+=(d.width+c.buttonSpacing)*("right"===c.align?-1:1);b.exportSVGElements.push(d,g)}},destroyExport:function(a){var b=a?a.target:this;a=b.exportSVGElements;var e=b.exportDivElements,
c=b.exportEvents,f;a&&(h(a,function(a,c){a&&(a.onclick=a.ontouchstart=null,f="cache-"+a.menuClassName,b[f]&&delete b[f],b.exportSVGElements[c]=a.destroy())}),a.length=0);e&&(h(e,function(a,c){clearTimeout(a.hideTimer);F(a,"mouseleave");b.exportDivElements[c]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null;B(a)}),e.length=0);c&&(h(c,function(a){a()}),c.length=0)}});H.menu=function(a,b,e,c){return["M",a,b+2.5,"L",a+e,b+2.5,"M",a,b+c/2+.5,"L",a+e,b+c/2+.5,"M",a,b+c-1.5,"L",a+e,b+c-1.5]};A.prototype.renderExporting=
function(){var a,b=this.options.exporting,e=b.buttons,c=this.isDirtyExporting||!this.exportSVGElements;this.buttonOffset=0;this.isDirtyExporting&&this.destroyExport();if(c&&!1!==b.enabled){this.exportEvents=[];for(a in e)this.addButton(e[a]);this.isDirtyExporting=!1}w(this,"destroy",this.destroyExport)};A.prototype.callbacks.push(function(a){a.renderExporting();w(a,"redraw",a.renderExporting);h(["exporting","navigation"],function(b){a[b]={update:function(e,c){a.isDirtyExporting=!0;p(!0,a.options[b],
e);C(c,!0)&&a.redraw()}}})})})(k)});


/***/ }),
/* 124 */
/***/ (function(module, exports) {

/*
 Highcharts JS v5.0.10 (2017-03-31)
 Client side exporting module

 (c) 2015 Torstein Honsi / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(n){"object"===typeof module&&module.exports?module.exports=n:n(Highcharts)})(function(n){(function(d){function n(a,d){var c=t.getElementsByTagName("head")[0],b=t.createElement("script");b.type="text/javascript";b.src=a;b.onload=d;b.onerror=function(){console.error("Error loading script",a)};c.appendChild(b)}var C=d.merge,e=d.win,r=e.navigator,t=e.document,z=d.each,w=e.URL||e.webkitURL||e,B=/Edge\/|Trident\/|MSIE /.test(r.userAgent),D=/Edge\/\d+/.test(r.userAgent),E=B?150:0;d.CanVGRenderer=
{};d.dataURLtoBlob=function(a){if(e.atob&&e.ArrayBuffer&&e.Uint8Array&&e.Blob&&w.createObjectURL){a=a.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/);for(var d=e.atob(a[3]),c=new e.ArrayBuffer(d.length),c=new e.Uint8Array(c),b=0;b<c.length;++b)c[b]=d.charCodeAt(b);a=new e.Blob([c],{type:a[1]});return w.createObjectURL(a)}};d.downloadURL=function(a,f){var c=t.createElement("a"),b;if(r.msSaveOrOpenBlob)r.msSaveOrOpenBlob(a,f);else{if(2E6<a.length&&(a=d.dataURLtoBlob(a),!a))throw"Data URL length limit reached";
if(void 0!==c.download)c.href=a,c.download=f,c.target="_blank",t.body.appendChild(c),c.click(),t.body.removeChild(c);else try{if(b=e.open(a,"chart"),void 0===b||null===b)throw"Failed to open window";}catch(u){e.location.href=a}}};d.svgToDataUrl=function(a){var d=-1<r.userAgent.indexOf("WebKit")&&0>r.userAgent.indexOf("Chrome");try{if(!d&&0>r.userAgent.toLowerCase().indexOf("firefox"))return w.createObjectURL(new e.Blob([a],{type:"image/svg+xml;charset-utf-16"}))}catch(c){}return"data:image/svg+xml;charset\x3dUTF-8,"+
encodeURIComponent(a)};d.imageToDataUrl=function(a,d,c,b,u,l,k,m,p){var g=new e.Image,h,f=function(){setTimeout(function(){var e=t.createElement("canvas"),f=e.getContext&&e.getContext("2d"),x;try{if(f){e.height=g.height*b;e.width=g.width*b;f.drawImage(g,0,0,e.width,e.height);try{x=e.toDataURL(d),u(x,d,c,b)}catch(F){h(a,d,c,b)}}else k(a,d,c,b)}finally{p&&p(a,d,c,b)}},E)},q=function(){m(a,d,c,b);p&&p(a,d,c,b)};h=function(){g=new e.Image;h=l;g.crossOrigin="Anonymous";g.onload=f;g.onerror=q;g.src=a};
g.onload=f;g.onerror=q;g.src=a};d.downloadSVGLocal=function(a,f,c,b){function u(b,a){a=new e.jsPDF("l","pt",[b.width.baseVal.value+2*a,b.height.baseVal.value+2*a]);e.svg2pdf(b,a,{removeInvalid:!0});return a.output("datauristring")}function l(){y.innerHTML=a;var e=y.getElementsByTagName("text"),g,f=y.getElementsByTagName("svg")[0].style;z(e,function(b){z(["font-family","font-size"],function(a){!b.style[a]&&f[a]&&(b.style[a]=f[a])});b.style["font-family"]=b.style["font-family"]&&b.style["font-family"].split(" ").splice(-1);
g=b.getElementsByTagName("title");z(g,function(a){b.removeChild(a)})});e=u(y.firstChild,0);try{d.downloadURL(e,v),b&&b()}catch(G){c()}}var k,m,p=!0,g,h=f.libURL||d.getOptions().exporting.libURL,y=t.createElement("div"),q=f.type||"image/png",v=(f.filename||"chart")+"."+("image/svg+xml"===q?"svg":q.split("/")[1]),A=f.scale||1,h="/"!==h.slice(-1)?h+"/":h;if("image/svg+xml"===q)try{r.msSaveOrOpenBlob?(m=new MSBlobBuilder,m.append(a),k=m.getBlob("image/svg+xml")):k=d.svgToDataUrl(a),d.downloadURL(k,v),
b&&b()}catch(x){c()}else"application/pdf"===q?e.jsPDF&&e.svg2pdf?l():(p=!0,n(h+"jspdf.js",function(){n(h+"svg2pdf.js",function(){l()})})):(k=d.svgToDataUrl(a),g=function(){try{w.revokeObjectURL(k)}catch(x){}},d.imageToDataUrl(k,q,{},A,function(a){try{d.downloadURL(a,v),b&&b()}catch(F){c()}},function(){var f=t.createElement("canvas"),u=f.getContext("2d"),l=a.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*A,k=a.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*A,m=function(){u.drawSvg(a,0,0,
l,k);try{d.downloadURL(r.msSaveOrOpenBlob?f.msToBlob():f.toDataURL(q),v),b&&b()}catch(H){c()}finally{g()}};f.width=l;f.height=k;e.canvg?m():(p=!0,n(h+"rgbcolor.js",function(){n(h+"canvg.js",function(){m()})}))},c,c,function(){p&&g()}))};d.Chart.prototype.getSVGForLocalExport=function(a,e,c,b){var f=this,l,k=0,m,p,g,h,n,q=function(a,d,c){++k;c.imageElement.setAttributeNS("http://www.w3.org/1999/xlink","href",a);k===l.length&&b(f.sanitizeSVG(m.innerHTML,p))};d.wrap(d.Chart.prototype,"getChartHTML",
function(b){var a=b.apply(this,Array.prototype.slice.call(arguments,1));p=this.options;m=this.container.cloneNode(!0);return a});f.getSVGForExport(a,e);l=m.getElementsByTagName("image");try{if(l.length)for(h=0,n=l.length;h<n;++h)g=l[h],d.imageToDataUrl(g.getAttributeNS("http://www.w3.org/1999/xlink","href"),"image/png",{imageElement:g},a.scale,q,c,c,c);else b(f.sanitizeSVG(m.innerHTML,p))}catch(v){c()}};d.Chart.prototype.exportChartLocal=function(a,e){var c=this,b=d.merge(c.options.exporting,a),f=
function(){if(!1===b.fallbackToExportServer)if(b.error)b.error(b);else throw"Fallback to export server disabled";else c.exportChart(b)};B&&("application/pdf"===b.type||c.container.getElementsByTagName("image").length&&"image/svg+xml"!==b.type)||D&&"image/svg+xml"!==b.type||"application/pdf"===b.type&&c.container.getElementsByTagName("image").length?f():c.getSVGForLocalExport(b,e,f,function(a){-1<a.indexOf("\x3cforeignObject")&&"image/svg+xml"!==b.type?f():d.downloadSVGLocal(a,b,f)})};C(!0,d.getOptions().exporting,
{libURL:"https://code.highcharts.com/5.0.10/lib/",buttons:{contextButton:{menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChartLocal()}},{textKey:"downloadJPEG",onclick:function(){this.exportChartLocal({type:"image/jpeg"})}},{textKey:"downloadSVG",onclick:function(){this.exportChartLocal({type:"image/svg+xml"})}},{textKey:"downloadPDF",onclick:function(){this.exportChartLocal({type:"application/pdf"})}}]}}})})(n)});


/***/ }),
/* 125 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 126 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 2,
	"./af.js": 2,
	"./ar": 9,
	"./ar-dz": 3,
	"./ar-dz.js": 3,
	"./ar-kw": 4,
	"./ar-kw.js": 4,
	"./ar-ly": 5,
	"./ar-ly.js": 5,
	"./ar-ma": 6,
	"./ar-ma.js": 6,
	"./ar-sa": 7,
	"./ar-sa.js": 7,
	"./ar-tn": 8,
	"./ar-tn.js": 8,
	"./ar.js": 9,
	"./az": 10,
	"./az.js": 10,
	"./be": 11,
	"./be.js": 11,
	"./bg": 12,
	"./bg.js": 12,
	"./bn": 13,
	"./bn.js": 13,
	"./bo": 14,
	"./bo.js": 14,
	"./br": 15,
	"./br.js": 15,
	"./bs": 16,
	"./bs.js": 16,
	"./ca": 17,
	"./ca.js": 17,
	"./cs": 18,
	"./cs.js": 18,
	"./cv": 19,
	"./cv.js": 19,
	"./cy": 20,
	"./cy.js": 20,
	"./da": 21,
	"./da.js": 21,
	"./de": 24,
	"./de-at": 22,
	"./de-at.js": 22,
	"./de-ch": 23,
	"./de-ch.js": 23,
	"./de.js": 24,
	"./dv": 25,
	"./dv.js": 25,
	"./el": 26,
	"./el.js": 26,
	"./en-au": 27,
	"./en-au.js": 27,
	"./en-ca": 28,
	"./en-ca.js": 28,
	"./en-gb": 29,
	"./en-gb.js": 29,
	"./en-ie": 30,
	"./en-ie.js": 30,
	"./en-nz": 31,
	"./en-nz.js": 31,
	"./eo": 32,
	"./eo.js": 32,
	"./es": 34,
	"./es-do": 33,
	"./es-do.js": 33,
	"./es.js": 34,
	"./et": 35,
	"./et.js": 35,
	"./eu": 36,
	"./eu.js": 36,
	"./fa": 37,
	"./fa.js": 37,
	"./fi": 38,
	"./fi.js": 38,
	"./fo": 39,
	"./fo.js": 39,
	"./fr": 42,
	"./fr-ca": 40,
	"./fr-ca.js": 40,
	"./fr-ch": 41,
	"./fr-ch.js": 41,
	"./fr.js": 42,
	"./fy": 43,
	"./fy.js": 43,
	"./gd": 44,
	"./gd.js": 44,
	"./gl": 45,
	"./gl.js": 45,
	"./gom-latn": 46,
	"./gom-latn.js": 46,
	"./he": 47,
	"./he.js": 47,
	"./hi": 48,
	"./hi.js": 48,
	"./hr": 49,
	"./hr.js": 49,
	"./hu": 50,
	"./hu.js": 50,
	"./hy-am": 51,
	"./hy-am.js": 51,
	"./id": 52,
	"./id.js": 52,
	"./is": 53,
	"./is.js": 53,
	"./it": 54,
	"./it.js": 54,
	"./ja": 55,
	"./ja.js": 55,
	"./jv": 56,
	"./jv.js": 56,
	"./ka": 57,
	"./ka.js": 57,
	"./kk": 58,
	"./kk.js": 58,
	"./km": 59,
	"./km.js": 59,
	"./kn": 60,
	"./kn.js": 60,
	"./ko": 61,
	"./ko.js": 61,
	"./ky": 62,
	"./ky.js": 62,
	"./lb": 63,
	"./lb.js": 63,
	"./lo": 64,
	"./lo.js": 64,
	"./lt": 65,
	"./lt.js": 65,
	"./lv": 66,
	"./lv.js": 66,
	"./me": 67,
	"./me.js": 67,
	"./mi": 68,
	"./mi.js": 68,
	"./mk": 69,
	"./mk.js": 69,
	"./ml": 70,
	"./ml.js": 70,
	"./mr": 71,
	"./mr.js": 71,
	"./ms": 73,
	"./ms-my": 72,
	"./ms-my.js": 72,
	"./ms.js": 73,
	"./my": 74,
	"./my.js": 74,
	"./nb": 75,
	"./nb.js": 75,
	"./ne": 76,
	"./ne.js": 76,
	"./nl": 78,
	"./nl-be": 77,
	"./nl-be.js": 77,
	"./nl.js": 78,
	"./nn": 79,
	"./nn.js": 79,
	"./pa-in": 80,
	"./pa-in.js": 80,
	"./pl": 81,
	"./pl.js": 81,
	"./pt": 83,
	"./pt-br": 82,
	"./pt-br.js": 82,
	"./pt.js": 83,
	"./ro": 84,
	"./ro.js": 84,
	"./ru": 85,
	"./ru.js": 85,
	"./sd": 86,
	"./sd.js": 86,
	"./se": 87,
	"./se.js": 87,
	"./si": 88,
	"./si.js": 88,
	"./sk": 89,
	"./sk.js": 89,
	"./sl": 90,
	"./sl.js": 90,
	"./sq": 91,
	"./sq.js": 91,
	"./sr": 93,
	"./sr-cyrl": 92,
	"./sr-cyrl.js": 92,
	"./sr.js": 93,
	"./ss": 94,
	"./ss.js": 94,
	"./sv": 95,
	"./sv.js": 95,
	"./sw": 96,
	"./sw.js": 96,
	"./ta": 97,
	"./ta.js": 97,
	"./te": 98,
	"./te.js": 98,
	"./tet": 99,
	"./tet.js": 99,
	"./th": 100,
	"./th.js": 100,
	"./tl-ph": 101,
	"./tl-ph.js": 101,
	"./tlh": 102,
	"./tlh.js": 102,
	"./tr": 103,
	"./tr.js": 103,
	"./tzl": 104,
	"./tzl.js": 104,
	"./tzm": 106,
	"./tzm-latn": 105,
	"./tzm-latn.js": 105,
	"./tzm.js": 106,
	"./uk": 107,
	"./uk.js": 107,
	"./ur": 108,
	"./ur.js": 108,
	"./uz": 110,
	"./uz-latn": 109,
	"./uz-latn.js": 109,
	"./uz.js": 110,
	"./vi": 111,
	"./vi.js": 111,
	"./x-pseudo": 112,
	"./x-pseudo.js": 112,
	"./yo": 113,
	"./yo.js": 113,
	"./zh-cn": 114,
	"./zh-cn.js": 114,
	"./zh-hk": 115,
	"./zh-hk.js": 115,
	"./zh-tw": 116,
	"./zh-tw.js": 116
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 127;

/***/ }),
/* 128 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map