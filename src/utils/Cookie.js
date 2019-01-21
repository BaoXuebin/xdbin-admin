export const deleteCookie = (name) => {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};

export const getCookie = (name) => {
    const arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}