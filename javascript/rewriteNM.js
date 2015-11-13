/**
 * Created by timlv on 2015/11/13.
 */
var Module = module.constructor;
var GlobalCache = Module._cache;
var path = require("path");
var rewrite = function(moduleName,funName,funBody){
    var cachedModule =  null;
    if(path.isAbsolute(moduleName)){
        cachedModule = GlobalCache[path]?GlobalCache[path].exports:null;
        if(!cachedModule){
            cachedModule = require(moduleName);
        }
    }
    if(cachedModule){
        var oldFunBody = null;
        if(typeof cachedModule == "function"&&cachedModule.prototype[funName]&&typeof funBody == "function"){//原型对像
            oldFunBody = cachedModule.prototype[funName];
            cachedModule.prototype[funName] = funBody;
            cachedModule.prototype["__origin_"+funName] = oldFunBody;
        }else if(typeof cachedModule == "object"&&cachedModule[funName]){
            oldFunBody = cachedModule[funName];
            cachedModule[funName] = funBody;
            cachedModule["__origin_"+funName] = oldFunBody;
        }
    }
};
module.exports = function(){
    //rewrite(path.join(__dirname,"../","node_modules/mysql","lib/Connection.js"),"end",function(options, callback) {
    //    if (typeof options === 'function') {
    //      callback = options;
    //      options = {};
    //    }
    //    this.destroy();
    //    callback();
    //});
};