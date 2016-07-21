/**
 * Created by timlv on 2016/7/21.
 */
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
        },
        handleOrientation = function(evt) {
            var horizontalTranslate = 30;
            var verticalTranslate = 30;
            var robbins1 = doc.getElementById('robbins-1');
            var robbins2 = doc.getElementById('robbins-2');
            robbins1.style.transform = 'translate3d(' + evt.gamma / 90 * horizontalTranslate + 'px, '+ evt.beta / 90 * verticalTranslate +'px, 0)';
            robbins1.style.webkitTransform = 'translate3d(' + evt.gamma / 90 * horizontalTranslate + 'px, '+ evt.beta / 90 * verticalTranslate +'px, 0)';
            robbins2.style.transform = 'translate3d(' + (0 - evt.gamma) / 90 * horizontalTranslate + 'px, '+ (0 - evt.beta) / 90 * verticalTranslate +'px, 0)';
            robbins2.style.webkitTransform = 'translate3d(' + (0 - evt.gamma) / 90 * horizontalTranslate + 'px, '+ (0 - evt.beta) / 90 * verticalTranslate +'px, 0)';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    win.addEventListener('deviceorientation', handleOrientation);
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (doc.addEventListener) {
            doc.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (doc.attachEvent) {
            doc.attachEvent("WeixinJSBridgeReady", handleFontSize);
            doc.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) {
            // console.log(JSON.stringify(res));
        });
    }
})(document, window);