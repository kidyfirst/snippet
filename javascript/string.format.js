/**
 * Created by timlv on 2016/9/22.
 */
String.format = function () {
    var result = arguments[0];
    if (arguments.length > 1) {
        if (arguments.length == 2 && typeof (arguments[1]) == "object") {
            var args = arguments[1];
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 1; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + (i - 1) + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};