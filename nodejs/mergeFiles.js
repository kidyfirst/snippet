/**
 * Created by timlv on 2016/3/17.
 */
//合并脚本
var fs = require("fs");
var path = require("path"); //不同的操作系统，其 文件目录 分割符是不一样的，不能直接使用 + "/"来实现
var curDir = process.cwd(); //当前目录
var Buffer = require('buffer').Buffer;
var now = new Date;
function mergeFiles(files,fileName,cb) {
    var writable = fs.createWriteStream(path.join(curDir, fileName), {
        encoding: "utf8"
    });
    writable.setMaxListeners(11); //默认只有添加11个事件，很容易爆栈
    files.forEach(function (fileName) {
        var filePath = path.join(curDir, fileName + ".js");
        var readable = fs.createReadStream(filePath);
        readable.on('data', function (chunk) {
            var str = chunk.toString("utf8");
            var offset = (new Buffer(str.slice(0, str.indexOf("!!")), "utf8")).length;
            //  chunk.write(" build in " + date + " \n", offset)
            //  readable.push("//都会插到新文件的最前面")
            //  writable.write("//都会插到新文件的最后面 ")
        });
        readable.pipe(writable);
        readable.on("readable", function () {
            writable.write("\n");
        });
        writable.on("finish", function () {
            cb();
        });
    });
}