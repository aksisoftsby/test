function str_replace(search, replace, subject, countObj) { // eslint-disable-line camelcase
    var i = 0
    var j = 0
    var temp = ''
    var repl = ''
    var sl = 0
    var fl = 0
    var f = [].concat(search)
    var r = [].concat(replace)
    var s = subject
    var ra = Object.prototype.toString.call(r) === '[object Array]'
    var sa = Object.prototype.toString.call(s) === '[object Array]'
    s = [].concat(s)
    var $global = (typeof window !== 'undefined' ? window : global)
    $global.$locutus = $global.$locutus || {}
    var $locutus = $global.$locutus
    $locutus.php = $locutus.php || {}
    if (typeof (search) === 'object' && typeof (replace) === 'string') {
        temp = replace
        replace = []
        for (i = 0; i < search.length; i += 1) {
            replace[i] = temp
        }
        temp = ''
        r = [].concat(replace)
        ra = Object.prototype.toString.call(r) === '[object Array]'
    }
    if (typeof countObj !== 'undefined') {
        countObj.value = 0
    }
    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + ''
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
            s[i] = (temp).split(f[j]).join(repl)
            if (typeof countObj !== 'undefined') {
                countObj.value += ((temp.split(f[j])).length - 1)
            }
        }
    }
    return sa ? s : s[0]
}

var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}
if (!$_GET["chart"]) {
    $_GET = {chart: "R_100"};
}
// console.log($_GET);
var __volatilityName = "";
if (
        $_GET.chart == "R_100" ||
        $_GET.chart == "R_10" ||
        $_GET.chart == "R_50" ||
        $_GET.chart == "R_25" ||
        $_GET.chart == "R_75" ||
        $_GET.chart == "RDBEAR" ||
        $_GET.chart == "RDBULL"
        ) {
    __volatilityName = "Volatility Index " + str_replace("R_", "", $_GET.chart);
} else {
    __volatilityName = "Forex " + str_replace("frx", "", $_GET.chart);
}

var binarytool_symbol = $_GET.chart;
var binarytool_selltime = parseFloat($_GET.sell);
var binarytool_buytime = parseFloat($_GET.buy);
var binarytool_start = (binarytool_selltime + 10) - 3500;
