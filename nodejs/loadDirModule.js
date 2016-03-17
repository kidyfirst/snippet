/*
加载当前文件夹下的所有js文件
*/
var glob = require( 'glob' )
    , path = require( 'path' );
var routes = {};
glob.sync( './routes/**/*.js' ).forEach( function( file ) {
    routes[file] = require( path.resolve( file ) );
});


/*
 加载并执行某个文件夹下的js文件
 */
var includeAll = require('include-all');
module.exports = function () {
    var configs = includeAll({
        dirname: __dirname + '/../configs',
        filter: /(.+)\.js$/
    });
    return configs;
};


/*
 为某个对象加载一些插件
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