/**
 * Created by timlv on 2016/3/17.
 */
/*
创建文件夹或文件
 */
var fs = require('fs');
function mkdirSync(url,mode,cb){
    var path = require("path"), arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] == ".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        path.stat(cur,function(err, stat){
            if (err) {
                if (err.code == 'ENOENT') {//该文件夹不存在
                    fs.mkdir(cur, mode, function(err){
                        if(err){
                            cb(err);
                        }else{
                            if(arr.length){
                                inner(cur + "/"+arr.shift());
                            }else{
                                cb();
                            }
                        }
                    })
                }else{
                    cb(err);
                }
            }
        });
    }
    arr.length && inner(arr.shift());
}
//测试代码
mkdirSync("aaa/ddd/dd",0,function(e){
    if(e){
        console.log('出错了');
    }else{
        console.log("创建成功")
    }
});