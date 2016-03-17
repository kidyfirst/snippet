/**
 * Created by timlv on 2015/10/29.
 */
/*
取出传入的参数 test.apply(this,1,2,3) - > [1,2,3]
 */
for(var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
}
Array.prototype.slice.call(arguments, 0);
/*
test.apply(this,1,2,3)
 */