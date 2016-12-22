/**
 * Created by timlv on 2016/10/11.
 */
var reg = /[[a-z]{1}[a-z]+|[A-Z]{1}[a-z]+]*/g;
var abbreviate = function (k) {
    var v = k.match(reg), str = v.length>0?v[0]:"";
    for (var i = 1, l = v.length; i < l; i++) {
        str += v[i].substr(0, 1);
    }
    return str.toLowerCase();
};

//  "getLoadTime"  -> "glt"