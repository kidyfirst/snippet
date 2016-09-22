/**
 * Created by timlv on 2016/9/22.
 */
var event = {
    _handlers: {},
    on: function (event, handler) {
        if (!this._handlers[event]) {

            this._handlers[event] = [];
        }
        this._handlers[event].push(handler);

    },
    once: function (event, handler) {
        var self = this;

        function _handler() {
            self.off(event, _handler);
            handler.apply(self, arguments);
        }

        this.on(event, _handler);
    },
    trigger: function (eventType) {
        var self = this;
        if (!self._handlers[eventType]) {
            return;
        }
        var handlerArgs = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, len = self._handlers[eventType].length; i < len; i++) {
            self._handlers[eventType] && self._handlers[eventType][i] && self._handlers[eventType][i].apply(self, handlerArgs);
        }
        return self;
    },
    emit: function () {
        return this.trigger.apply(this, arguments);
    },
    off: function (event, handler) {
        if (!handler) {
            this._handlers[event] = [];
        }
        else {
            if (toString.call(this._handlers[event]) == '[object Array]') {
                for (var i = 0, len = this._handlers[event].length; i < len; ++i) {
                    if (this._handlers[event][i] == handler) {
                        this._handlers[event].splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
};