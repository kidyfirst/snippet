/**
 * Created by timlv on 2016/9/28.
 */
this.disableContext = function(event) {
    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();
    return false;
};
window.addEventListener('contextmenu', this.disableContext);