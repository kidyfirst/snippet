/**
 * Created by timlv on 2015/11/23.
 */
void function (global) {
    /**
     * Execute javascript code within specific scope
     * @param  {Function|String} fn Scoped function or expression
     * @param  {Object} imports     An object which defines required local variables
     * @return {Function}           Function that can be invoked to run code in specific scope
     */
    function scopedRunner(fn, imports) {
        var rfunc = /^function\s+(?:[^(]*)\(([^)]*)\)\s*{([^]*)}$/;
        var found = String(fn).match(rfunc) || [,,'return (' + fn + ');'];
        var args = found[1] || '';
        var stmt = found[2] || '';
        var body = Object.keys(imports || {}).reduce(function (ret, key, idx) {
            return ret + (idx ? ', ' : 'var ') + key + ' = $scope["' + key + '"]';
        }, '') + '; return function (' + args + ') {' + stmt + '};';
        return Function('$scope', body).call(null, imports);
    }
    // define `global.$eval`
    Object.defineProperty(global, '$eval', {
        value: function () {
            return scopedRunner.apply(null, arguments)();
        }
    });
    // define `Object.prototype.$eval`
    Object.defineProperty(Object.prototype, '$eval', {
        value: function (expr) {
            return global.$eval(expr, this);
        }
    });
}(function () { return this; }());