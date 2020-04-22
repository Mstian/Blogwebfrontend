import store from '../store/index';
export function checkLogin() { //判断是否登录
    if (store.state.uid) {
        return true;
    } else {
        return false;
    }
}
export function formmatTime(timestamp) { //时间戳格式转换
    var time = Number(timestamp);
    if (time) {
        var date = new Date(time)
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + (date.getDate()) + " " : date.getDate();
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ":";
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ":";
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + "  " + h + m + s;
    }
}

export function checkUrl(url) { //验证链接
    var urlRegExp = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (urlRegExp.test(url)) {
        return true;
    } else {
        return false;
    }
}