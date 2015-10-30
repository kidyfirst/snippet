/**
 * Created by timlv on 2015/10/29.
 */
/*
include copy function  you can search github:tapable
 */
function copyProperties(from, to) {
    for(var key in from)
        to[key] = from[key];
    return to;
}