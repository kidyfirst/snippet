/**
 * Created by timlv on 2015/10/30.
 */
function MemoryFileSystemError(err, path) {
    Error.call(this)
    if (Error.captureStackTrace)
        Error.captureStackTrace(this, arguments.callee)
    this.code = err.code;
    this.errno = err.errno;
    this.message = err.description;
    this.path = path;
}
MemoryFileSystemError.prototype = new Error();