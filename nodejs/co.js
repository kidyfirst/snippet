/**
 * Created by timlv on 2015/10/23.
 */
function cool(gen){
    return new Promise(function(resolve, reject) {
        var iter = gen();
        function onResolve(data) {
            try {
                var it = iter.next(data); // 进行一步迭代
                step(it);
            } catch (ex) {
                reject(ex); // 捕获到generator function内的异常，终止迭代
            }
        }
        function onReject(err) {
            try {
                var it = iter.throw(err);
                // 将yield表达式中的异步操作的错误抛进generator function，并继续迭代
                step(it);
            } catch (ex) {
                reject(ex); // generator function没有妥善处理异常，终止迭代
            }
        }
        function step(it) {
            if (it.done) {
                // 迭代已完成
                resolve(it.value);
                return;
            }
            var value = it.value;
            if (typeof value.then === 'function') {
                // 收到的是一个Promise
                value.then(onResolve, onReject);
            } else {
                // 收到的是一个值
                onResolve(value);
            }
        }

        onResolve(); // 开始迭代
    });
}


//test1
//function sleepRandom() {
//    return new Promise(function(resolve) {
//        var ms = Math.floor(Math.random() * 500);
//        setTimeout(resolve.bind(this, ms), ms); // Promise的返回值就是sleep的毫秒数
//    });
//}
//var boringJob = cool(function*() {
//    console.log(yield 'yield sync value');
//    for (var i=0; i<5; ++i) {
//        var ms = yield sleepRandom();
//        console.log(i, ms);
//    }
//    return 'success';
//});
//boringJob.then(function(data) {
//    console.log('finished:', data);
//}, function(err) {
//    console.log('failed:', err);
//});

//result
//yield sync value
//0 47
//1 343
//2 40
//3 339
//4 423
//finished: success

//test2
//function bad() {
//    return new Promise(function(resolve, reject) {
//        setTimeout(reject.bind(this, 'breaking bad'), 200);
//    });
//}
//var weakJob = cool(function*() {
//    console.log(yield 'yield sync value');
//    console.log(yield bad()); // bad()被reject后，其错误将会作为`yield bad()`语句的异常抛出
//    console.log(yield sleepRandom());
//    return 'success';
//});
//weakJob.then(function(data) {
//    console.log('finished:', data);
//}, function(err) {
//    console.log('failed:', err);
//});

//result 造成迭代终止
//yield sync value
//failed: breaking bad

//test2.1
//var robustJob = cool(function*() {
//    console.log(yield 'yield sync value');
//    try {
//        console.log(yield bad());
//    } catch (ex) {
//        console.log('caught exception:', ex); // 异常被处理了，不会造成迭代终止
//    }
//    console.log(yield sleepRandom());
//    return 'success';
//});
//robustJob.then(function(data) {
//    console.log('finished:', data);
//}, function(err) {
//    console.log('failed:', err);
//});