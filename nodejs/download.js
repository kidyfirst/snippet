/**
 * Created by timlv on 2015/10/28.
 */
var auth = require('../../middlewares/auth'),
    fs = require("fs"),
    path = require("path"),
    _ = require('lodash');
//注册api
exports.register = function (router) {
    router.get('/learn/download', auth.check('order.list'),download);
};
var getAttachNameHeader = function(req,filename){
    var userAgent = (req.headers['user-agent']||'').toLowerCase();
    if(userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
        return  'attachment; filename='+encodeURIComponent(filename);
    } else if(userAgent.indexOf('firefox') >= 0) {
        return 'attachment; filename*="utf8\'\'' + encodeURIComponent(filename)+'"';
    } else {
        /* safari等其他非主流浏览器只能自求多福了 */
        return 'attachment; filename=' + new Buffer(filename).toString('binary');
    }
};
function *download(){
    var self = this;
    var filename = path.basename(this.query.file);
    var filePath = this.configs.download.path+filename;
    try {
        fs.accessSync(filePath, fs.R_OK | fs.W_OK);
        var fileStream = fs.createReadStream(filePath);
        //var file = fs.readFileSync(filePath, 'binary');
        self.set({
            'Content-Disposition': getAttachNameHeader(this.req, filename),
            'Content-Type': 'application/octet-stream'
        });
        self.body = fileStream;
    }catch(error){
        self.body = "the path is invalid.";
    }
}