function str_replace(e, t, n, r){var u = 0, o = 0, a = "", i = "", c = 0, s = 0, f = [].concat(e), l = [].concat(t), g = n, d = "[object Array]" === Object.prototype.toString.call(l), h = "[object Array]" === Object.prototype.toString.call(g); g = [].concat(g); var p = "undefined" != typeof window?window:global; p.$locutus = p.$locutus || {}; var D = p.$locutus; if (D.php = D.php || {}, "object" == typeof e && "string" == typeof t){for (a = t, t = [], u = 0; u < e.length; u += 1)t[u] = a; a = "", l = [].concat(t), d = "[object Array]" === Object.prototype.toString.call(l)}for (void 0 !== r && (r.value = 0), u = 0, c = g.length; u < c; u++)if ("" !== g[u])for (o = 0, s = f.length; o < s; o++)a = g[u] + "", i = d?void 0 !== l[o]?l[o]:"":l[0], g[u] = a.split(f[o]).join(i), void 0 !== r && (r.value += a.split(f[o]).length - 1); return h?g:g[0]}function time(){return Math.floor((new Date).getTime() / 1e3)}function strtotime(e, t){function n(e, t, n){var r, u = c[t]; void 0 !== u && (0 === (r = u - i.getDay())?r = 7 * n:r > 0 && "last" === e?r -= 7:r < 0 && "next" === e && (r += 7), i.setDate(i.getDate() + r))}var r, u, o, a, i, c, s, f, l, g, d; if (!e)return!1; e = e.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ").replace(/[\t\r\n]/g, "").toLowerCase(); var h = new RegExp(["^(\\d{1,4})", "([\\-\\.\\/:])", "(\\d{1,2})", "([\\-\\.\\/:])", "(\\d{1,4})", "(?:\\s(\\d{1,2}):(\\d{2})?:?(\\d{2})?)?", "(?:\\s([A-Z]+)?)?$"].join("")); if ((u = e.match(h)) && u[2] === u[4])if (u[1] > 1901)switch (u[2]){case"-":return!(u[3] > 12 || u[5] > 31) && new Date(u[1], parseInt(u[3], 10) - 1, u[5], u[6] || 0, u[7] || 0, u[8] || 0, u[9] || 0) / 1e3; case".":return!1; case"/":return!(u[3] > 12 || u[5] > 31) && new Date(u[1], parseInt(u[3], 10) - 1, u[5], u[6] || 0, u[7] || 0, u[8] || 0, u[9] || 0) / 1e3} else if (u[5] > 1901)switch (u[2]){case"-":case".":return!(u[3] > 12 || u[1] > 31) && new Date(u[5], parseInt(u[3], 10) - 1, u[1], u[6] || 0, u[7] || 0, u[8] || 0, u[9] || 0) / 1e3; case"/":return!(u[1] > 12 || u[3] > 31) && new Date(u[5], parseInt(u[1], 10) - 1, u[3], u[6] || 0, u[7] || 0, u[8] || 0, u[9] || 0) / 1e3} else switch (u[2]){case"-":return!(u[3] > 12 || u[5] > 31 || u[1] < 70 && u[1] > 38) && (a = u[1] >= 0 && u[1] <= 38? + u[1] + 2e3:u[1], new Date(a, parseInt(u[3], 10) - 1, u[5], u[6] || 0, u[7] || 0, u[8] || 0, u[9] || 0) / 1e3); case".":return u[5] >= 70?!(u[3] > 12 || u[1] > 31) && new Date(u[5], parseInt(u[3], 10) - 1, u[1], u[6] || 0, u[7] || 0, u[8] || 0, u[9] || 0) / 1e3:u[5] < 60 && !u[6] && (!(u[1] > 23 || u[3] > 59) && (o = new Date, new Date(o.getFullYear(), o.getMonth(), o.getDate(), u[1] || 0, u[3] || 0, u[5] || 0, u[9] || 0) / 1e3)); case"/":return!(u[1] > 12 || u[3] > 31 || u[5] < 70 && u[5] > 38) && (a = u[5] >= 0 && u[5] <= 38? + u[5] + 2e3:u[5], new Date(a, parseInt(u[1], 10) - 1, u[3], u[6] || 0, u[7] || 0, u[8] || 0, u[9] || 0) / 1e3); case":":return!(u[1] > 23 || u[3] > 59 || u[5] > 59) && (o = new Date, new Date(o.getFullYear(), o.getMonth(), o.getDate(), u[1] || 0, u[3] || 0, u[5] || 0) / 1e3)}if ("now" === e)return null === t || isNaN(t)?(new Date).getTime() / 1e3 | 0:0 | t; if (!isNaN(r = Date.parse(e)))return r / 1e3 | 0; if (h = new RegExp(["^([0-9]{4}-[0-9]{2}-[0-9]{2})", "[ t]", "([0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?)", "([\\+-][0-9]{2}(:[0-9]{2})?|z)"].join("")), (u = e.match(h)) && ("z" === u[4]?u[4] = "Z":u[4].match(/^([+-][0-9]{2})$/) && (u[4] = u[4] + ":00"), !isNaN(r = Date.parse(u[1] + "T" + u[2] + u[4]))))return r / 1e3 | 0; if (i = t?new Date(1e3 * t):new Date, c = {sun:0, mon:1, tue:2, wed:3, thu:4, fri:5, sat:6}, s = {yea:"FullYear", mon:"Month", day:"Date", hou:"Hours", min:"Minutes", sec:"Seconds"}, l = "(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)", g = "([+-]?\\d+\\s" + l + "|(last|next)\\s" + l + ")(\\sago)?", !(u = e.match(new RegExp(g, "gi"))))return!1; for (d = 0, f = u.length; d < f; d++)if (!function(e){var t = e.split(" "), r = t[0], u = t[1].substring(0, 3), o = /\d+/.test(r), a = "ago" === t[2], c = ("last" === r? - 1:1) * (a? - 1:1); if (o && (c *= parseInt(r, 10)), s.hasOwnProperty(u) && !t[1].match(/^mon(day|\.)?$/i))return i["set" + s[u]](i["get" + s[u]]() + c); if ("wee" === u)return i.setDate(i.getDate() + 7 * c); if ("next" === r || "last" === r)n(r, u, c); else if (!o)return!1; return!0}(u[d]))return!1; return i.getTime() / 1e3}function microtime(e){var t, n; return"undefined" != typeof performance && performance.now?(n = (performance.now() + performance.timing.navigationStart) / 1e3, e?n:(t = 0 | n, Math.round(1e6 * (n - t)) / 1e6 + " " + t)):(n = (Date.now?Date.now():(new Date).getTime()) / 1e3, e?n:(t = 0 | n, Math.round(1e3 * (n - t)) / 1e3 + " " + t))}function substr(e, t, n){var r = (e += "").length; if ("off" === (("undefined" != typeof require?require("../info/ini_get")("unicode.emantics"):void 0) || "off"))return t < 0 && (t += r), void 0 !== n && (r = n < 0?n + r:n + t), !(t >= e.length || t < 0 || t > r) && e.slice(t, r); var u = 0, o = !0, a = 0, i = 0, c = 0, s = ""; for (u = 0; u < e.length; u++)if (/[\uD800-\uDBFF]/.test(e.charAt(u)) && /[\uDC00-\uDFFF]/.test(e.charAt(u + 1))){o = !1; break}if (!o){if (t < 0)for (u = r - 1, a = t += r; u >= a; u--) / [\uDC00 - \uDFFF] / .test(e.charAt(u)) && /[\uD800-\uDBFF]/.test(e.charAt(u - 1)) && (t--, a--); else for (var f = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; null !== f.exec(e) && f.lastIndex - 2 < t; )t++; if (t >= r || t < 0)return!1; if (n < 0){for (u = r - 1, i = r += n; u >= i; u--) / [\uDC00 - \uDFFF] / .test(e.charAt(u)) && /[\uD800-\uDBFF]/.test(e.charAt(u - 1)) && (r--, i--); return!(t > r) && e.slice(t, r)}for (c = t + n, u = t; u < c; u++)s += e.charAt(u), /[\uD800-\uDBFF]/.test(e.charAt(u)) && /[\uDC00-\uDFFF]/.test(e.charAt(u + 1)) && c++; return s}}function count(e, t){var n, r = 0; if (null === e || void 0 === e)return 0; if (e.constructor !== Array && e.constructor !== Object)return 1; "COUNT_RECURSIVE" === t && (t = 1), 1 !== t && (t = 0); for (n in e)e.hasOwnProperty(n) && (r++, 1 !== t || !e[n] || e[n].constructor !== Array && e[n].constructor !== Object || (r += count(e[n], 1))); return r}function implode(e, t){var n = "", r = "", u = ""; if (1 === arguments.length && (t = e, e = ""), "object" == typeof t){if ("[object Array]" === Object.prototype.toString.call(t))return t.join(e); for (n in t)r += u + t[n], u = e; return r}return t}function trim(e, t){var n = [" ", "\n", "\r", "\t", "\f", "\v", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "​", "\u2028", "\u2029", "　"].join(""), r = 0, u = 0; for (e += "", t && (n = (t + "").replace(/([[\]().?/*{}+$^:])/g, "$1")), r = e.length, u = 0; u < r; u++)if ( - 1 === n.indexOf(e.charAt(u))){e = e.substring(u); break}for (u = (r = e.length) - 1; u >= 0; u--)if ( - 1 === n.indexOf(e.charAt(u))){e = e.substring(0, u + 1); break}return - 1 === n.indexOf(e.charAt(0))?e:""}function explode(e, t, n){if (arguments.length < 2 || void 0 === e || void 0 === t)return null; if ("" === e || !1 === e || null === e)return!1; if ("function" == typeof e || "object" == typeof e || "function" == typeof t || "object" == typeof t)return{0:""}; !0 === e && (e = "1"), e += ""; var r = (t += "").split(e); return void 0 === n?r:(0 === n && (n = 1), n > 0?n >= r.length?r:r.slice(0, n - 1).concat([r.slice(n - 1).join(e)]): - n >= r.length?[]:(r.splice(r.length + n), r))}function rand(e, t){var n = arguments.length; if (0 === n)e = 0, t = 2147483647; else if (1 === n)throw new Error("Warning: rand() expects exactly 2 parameters, 1 given"); return Math.floor(Math.random() * (t - e + 1)) + e}function date(e, t){var n, r, u = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], o = /\\?(.?)/gi, a = function(e, t){return r[e]?r[e]():t}, i = function(e, t){for (e = String(e); e.length < t; )e = "0" + e; return e}; r = {d:function(){return i(r.j(), 2)}, D:function(){return r.l().slice(0, 3)}, j:function(){return n.getDate()}, l:function(){return u[r.w()] + "day"}, N:function(){return r.w() || 7}, S:function(){var e = r.j(), t = e % 10; return t <= 3 && 1 === parseInt(e % 100 / 10, 10) && (t = 0), ["st", "nd", "rd"][t - 1] || "th"}, w:function(){return n.getDay()}, z:function(){var e = new Date(r.Y(), r.n() - 1, r.j()), t = new Date(r.Y(), 0, 1); return Math.round((e - t) / 864e5)}, W:function(){var e = new Date(r.Y(), r.n() - 1, r.j() - r.N() + 3), t = new Date(e.getFullYear(), 0, 4); return i(1 + Math.round((e - t) / 864e5 / 7), 2)}, F:function(){return u[6 + r.n()]}, m:function(){return i(r.n(), 2)}, M:function(){return r.F().slice(0, 3)}, n:function(){return n.getMonth() + 1}, t:function(){return new Date(r.Y(), r.n(), 0).getDate()}, L:function(){var e = r.Y(); return e % 4 == 0 & e % 100 != 0 | e % 400 == 0}, o:function(){var e = r.n(), t = r.W(); return r.Y() + (12 === e && t < 9?1:1 === e && t > 9? - 1:0)}, Y:function(){return n.getFullYear()}, y:function(){return r.Y().toString().slice( - 2)}, a:function(){return n.getHours() > 11?"pm":"am"}, A:function(){return r.a().toUpperCase()}, B:function(){var e = 3600 * n.getUTCHours(), t = 60 * n.getUTCMinutes(), r = n.getUTCSeconds(); return i(Math.floor((e + t + r + 3600) / 86.4) % 1e3, 3)}, g:function(){return r.G() % 12 || 12}, G:function(){return n.getHours()}, h:function(){return i(r.g(), 2)}, H:function(){return i(r.G(), 2)}, i:function(){return i(n.getMinutes(), 2)}, s:function(){return i(n.getSeconds(), 2)}, u:function(){return i(1e3 * n.getMilliseconds(), 6)}, e:function(){throw new Error("Not supported (see source code of date() for timezone on how to add support)")}, I:function(){return new Date(r.Y(), 0) - Date.UTC(r.Y(), 0) != new Date(r.Y(), 6) - Date.UTC(r.Y(), 6)?1:0}, O:function(){var e = n.getTimezoneOffset(), t = Math.abs(e); return(e > 0?"-":"+") + i(100 * Math.floor(t / 60) + t % 60, 4)}, P:function(){var e = r.O(); return e.substr(0, 3) + ":" + e.substr(3, 2)}, T:function(){return"UTC"}, Z:function(){return 60 * - n.getTimezoneOffset()}, c:function(){return"Y-m-d\\TH:i:sP".replace(o, a)}, r:function(){return"D, d M Y H:i:s O".replace(o, a)}, U:function(){return n / 1e3 | 0}}; return function(e, t){return n = void 0 === t?new Date:t instanceof Date?new Date(t):new Date(1e3 * t), e.replace(o, a)}(e, t)}
function strpos(haystack, needle, offset) {
//   example 1: strpos('Kevin van Zonneveld', 'e', 5);
//   returns 1: 14
var i = (haystack + '')
  .indexOf(needle, (offset || 0));
  return i === - 1 ? false : true;
}
function is_array (mixedVar) { // eslint-disable-line camelcase
//  discuss at: http://locutus.io/php/is_array/
// original by: Kevin van Zonneveld (http://kvz.io)
// improved by: Legaev Andrey
// improved by: Onno Marsman (https://twitter.com/onnomarsman)
// improved by: Brett Zamir (http://brett-zamir.me)
// improved by: Nathan Sepulveda
// improved by: Brett Zamir (http://brett-zamir.me)
// bugfixed by: Cord
// bugfixed by: Manish
// bugfixed by: Brett Zamir (http://brett-zamir.me)
//      note 1: In Locutus, javascript objects are like php associative arrays,
//      note 1: thus JavaScript objects will also
//      note 1: return true in this function (except for objects which inherit properties,
//      note 1: being thus used as objects),
//      note 1: unless you do ini_set('locutus.objectsAsArrays', 0),
//      note 1: in which case only genuine JavaScript arrays
//      note 1: will return true
//   example 1: is_array(['Kevin', 'van', 'Zonneveld'])
//   returns 1: true
//   example 2: is_array('Kevin van Zonneveld')
//   returns 2: false
//   example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
//   returns 3: true
//   example 4: ini_set('locutus.objectsAsArrays', 0)
//   example 4: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
//   returns 4: false
//   example 5: is_array(function tmp_a (){ this.name = 'Kevin' })
//   returns 5: false
var _getFuncName = function (fn) {
var name = (/\W*function\s+([\w$]+)\s*\(/).exec(fn)
  if (!name) {
return '(Anonymous)'
}
return name[1]
}
var _isArray = function (mixedVar) {
// return Object.prototype.toString.call(mixedVar) === '[object Array]';
// The above works, but let's do the even more stringent approach:
// (since Object.prototype.toString could be overridden)
// Null, Not an object, no length property so couldn't be an Array (or String)
if (!mixedVar || typeof mixedVar !== 'object' || typeof mixedVar.length !== 'number') {
return false
}
var len = mixedVar.length
  mixedVar[mixedVar.length] = 'bogus'
  // The only way I can think of to get around this (or where there would be trouble)
  // would be to have an object defined
  // with a custom "length" getter which changed behavior on each call
  // (or a setter to mess up the following below) or a custom
  // setter for numeric properties, but even that would need to listen for
  // specific indexes; but there should be no false negatives
  // and such a false positive would need to rely on later JavaScript
  // innovations like __defineSetter__
  if (len !== mixedVar.length) {
// We know it's an array since length auto-changed with the addition of a
// numeric property at its length end, so safely get rid of our bogus element
mixedVar.length -= 1
  return true
}
// Get rid of the property we added onto a non-array object; only possible
// side-effect is if the user adds back the property later, it will iterate
// this property in the older order placement in IE (an order which should not
// be depended on anyways)
delete mixedVar[mixedVar.length]
  return false
}
if (!mixedVar || typeof mixedVar !== 'object') {
return false
}
var isArray = _isArray(mixedVar)
  if (isArray) {
return true
}
var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.objectsAsArrays') : undefined) || 'on'
  if (iniVal === 'on') {
var asString = Object.prototype.toString.call(mixedVar)
  var asFunc = _getFuncName(mixedVar.constructor)
  if (asString === '[object Object]' && asFunc === 'Object') {
// Most likely a literal and intended as assoc. array
return true
}
}
return false
  }