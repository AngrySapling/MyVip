//获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
     return ( unescape(arr[2]));
    else
     return null;
   }
    
//设置cookie
export function setCookie (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
    
//删除cookie
export function delCookie (name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
//获取本地LocalStorage缓存
export function setItem (c_name,value) {
    window.localStorage.setItem(c_name,escape(value))
}
export function getItem(name) {
    return unescape(window.localStorage.getItem(name));
}
export function deleteItem(name){
    localStorage.removeItem(name);
}
//日期封装
export function isDate_repalce(oDate,id){
    let year1 = oDate.getFullYear();   //获取系统的年；
    let month1 = oDate.getMonth()+1 < 10 ? '0'+(oDate.getMonth()+1):oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
    let dates1 = oDate.getDate() < 10?'0'+oDate.getDate():oDate.getDate(); // 获取系统日，
    let hour1 = oDate.getHours()<10?'0'+oDate.getHours():oDate.getHours(); //获取系统时，
    let minutes1 = oDate.getMinutes()<10?'0'+oDate.getMinutes():oDate.getMinutes();//分
    let second1 = oDate.getSeconds()<10?'0'+oDate.getSeconds():oDate.getSeconds();//秒
    var isDates = '';
    if(id === 0){
        dates1 = oDate.getDate() < 10?'0'+oDate.getDate():oDate.getDate();
        isDates = year1 + '-' +month1 +'-'+ dates1+' '+'23:59';
    }else if(id === 1){
        isDates = year1 + '-' +month1 +'-'+ dates1 +' '+ hour1 +':'+ minutes1;
    }else if(id === 2){
        dates1 = oDate.getDate() < 10?'0'+oDate.getDate():oDate.getDate()-1;
        isDates = year1 + '-' +month1 +'-'+ dates1;
    }else{
        isDates = year1 + '-' +month1 +'-'+ dates1;
    }
    return isDates;
}