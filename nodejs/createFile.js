/**
 * Created by timlv on 2016/3/17.
 */
var fs = require("fs");
var curDir = process.cwd(); //当前目录
function IsDirectoryError(err, path) {
    Error.call(this);
    if (Error.captureStackTrace)
        Error.captureStackTrace(this, arguments.callee);
    this.code = err.code;
    this.errno = err.errno;
    this.message = err.description;
    this.path = path;
}
IsDirectoryError.prototype = new Error();


function createFile(file,mode){
    fs.stat(file,function(err,stat){
        if(err) {
            if(err.code == 'ENOENT') {
                cb(fs.createWriteStream(
                    file,
                    {
                        encoding: "utf8",
                        mode: parseInt('0644', 8),
                        flags: 'a'//追加形式
                    }
                ));
            }else{
                cb(err);
            }
        }else {
            if (stat.isDirectory()) {
                cb(new IsDirectoryError({code:"EISDIR",errno:99,description:file+" is a directory."},path.resolve(curDir,file)));
            } else if (stat.isFile()) {
                cb(fs.createReadStream(file));
            }else{
                cb(stat);
            }
        }
    });
}