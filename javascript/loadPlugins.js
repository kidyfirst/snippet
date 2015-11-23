/**
 * Created by timlv on 2015/10/29.
 */
function loadPlugins(exports, path, plugins) {
    plugins.forEach(function(name) {
        Object.defineProperty(exports, name, {
            configurable: false,
            enumerable: true,
            get: function() {
                return require(path + "/" + name);
            }
        });
    });
}

/*
 loadPlugins
 var obj = {
 };
 loadPlugins(obj,".",["pluginA","pluginB"]);
 loadPlugins(obj.dependences={},".",["pluginA","pluginB"]);
 console.log(obj.pluginA);
 console.log(obj.dependences.pluginB);
 */