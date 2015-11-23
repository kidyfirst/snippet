/**
 * Created by timlv on 2015/4/9.
 */
define(function(require,exports, module){
    var Util = require("../../mod/util");
    var Audio = function(container,options,cb){
        this.opts = {
            auto:true,
            audio:"",
            effect:"easeIn",
            mutedClass:"audio_muted"
        };
        this.container = container;
        this.touchTimes = 0;
        this.time = new Date().getTime();
        Util.fn.extend(this.opts,options);
        this.callbacks = {};
        Util.fn.extend(this.callbacks,cb);
        this.init();
    };
    Audio.prototype = {
        init:function(){
            this.container.innerHTML = '<span class="audio"></span>'+
            '<audio preload="auto"'+(this.opts.auto?' autoplay="autoplay" ':' ')+'loop>'+
            '<source src="'+this.opts.audio+'" type="audio/mpeg"/>您的浏览器不支持 audio 标签</audio>';
            this.audioDom = Util.$("audio",this.container);
            this.audioBtnDom = Util.$(".audio",this.container);
            this.bindEvent();
        },
        volumeEffect:function(){
            var effectFunc = function(){};
            switch(this.opts.effect){
                case "easeIn":
                    effectFunc = function() {
                        var audioInterval = setInterval(function () {
                            var volume = self.audioDom.volume;
                            if (!volume) {
                                return;
                            }

                            if (volume >= 0.08) {
                                return;
                            }

                            if (volume) {
                                self.audioDom.volume += 0.02;
                            }
                        }, 1000);
                    };
                    break;
                default:
                    break;
            }
            return effectFunc;
        },
        trigger:function(type){
            var event = document.createEvent( 'HTMLEvents' );
            event.initEvent(type, true, true );
            this.audioBtnDom.dispatchEvent( event );
        },
        bindEvent:function(){
            var self = this;
            this.audioBtnDom.addEventListener('canplaythrough', function() {
                this.volume = 0.02;
                self.volumeEffect()();
            }, false);
            var audioHandle = function(event) {
                if (self.touchTimes === 0 && self.audioDom.paused) {
                    self.audioDom.play();
                    Util.dom.removeClass(self.audioBtnDom,self.opts.mutedClass);
                    self.touchTimes = 1;
                }else {
                    var timeGap = new Date().getTime() - self.time;
                    if (timeGap > 400) {
                        if (self.audioDom.paused) {
                            Util.dom.removeClass(self.audioBtnDom, self.opts.mutedClass);
                            self.audioDom.play();
                        } else {
                            Util.dom.addClass(self.audioBtnDom, self.opts.mutedClass);
                            self.audioDom.pause();
                        }
                        self.time = new Date().getTime();
                    }
                }
            };
            Util.dom.on(this.audioBtnDom,"click",function(e){
                audioHandle(e);
                if(!self.audioDom.paused){
                    Util.dom.unonWS("autoaudio");
                }
            });
            if(this.opts.auto){//如果自动播放无效，则只能绑定页面事件，用户有任何操作则触发音乐
                Util.dom.on(document,"ontouchstart.autoaudio",function(e){
                    if(self.audioDom.paused) {
                        audioHandle(e);
                        Util.dom.unonWS("autoaudio");
                    }
                },null,null,false);
                setTimeout(function(){//自动播放，如果失败，则模拟click事件触发
                    if(self.audioDom.paused) {
                        self.audioDom.play();
                        setTimeout(function () {
                            if (self.audioDom.paused) {
                                self.trigger("click");
                            }
                        }, 500)
                    }
                }, 2000);
            }
        }
    };
    module.exports = exports = Audio;
});