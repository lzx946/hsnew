/****公共属性或方法****/
var common = {
    /**
     * 当前浏览器的高度
     */
    heightBrower: document.documentElement.scrollHeight || document.body.scrollHeight,
    /**
     * 当前浏览器的宽度
     */
    widthBrower: document.documentElement.scrollWidth || document.body.scrollWidth,
    /**
     *token 用來检测是否登陆成功
     *成功不为空
     **/
    token: null,
    /**
     *身份标识，用来判断是专家或学员
     * 0为学员
     * 1为专家
     **/
    identityFlag: null,
    /**
     * 设置Cookie
     * @param {Object} c_name key
     * @param {Object} value value
     * @param {Object} expiredays 期限
     */
    setCookie: function(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    /**
     * 获取Cookie
     * @param {Object} c_name
     */
    getCookie: function(c_name) {
        if(document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if(c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if(c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    /**
     * 删除一个cookie
     * @param name
     */
    delCookie: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if(cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    },
    /**
     * 验证是否登陆
     */
    isLogin: function() {
        if(window.localStorage) {
            //登录成功
            if(localStorage.getItem("token")) {
                this.token = JSON.parse(localStorage.getItem("token"));
                this.identityFlag = localStorage.getItem("flag");
            } else if(sessionStorage.getItem("token")) {
                this.token = JSON.parse(sessionStorage.getItem("token"));
                this.identityFlag = sessionStorage.getItem("flag");
            }
        }
        //使用Cookie
        else {
            this.token = JSON.parse(getCookie('token'));
            this.identityFlag = getCookie('flag');
        }
    },
    /**
     * 注销登陆
     */
    logout: function() {
        /*使用Storage*/
        if(window.localStorage) {
            if(localStorage.getItem("token")) {
                localStorage.removeItem("token");
                this.token = null;
            } else if(sessionStorage.getItem("token")) {
                sessionStorage.removeItem("token");
                this.token = null;
            }
        }
        /*使用Cookie*/
        else {
            delCookie("token");
        }
        console.log("注销登陆")
    },
    isPC: function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for(var v = 0; v < Agents.length; v++) {
            if(userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    //判断当前浏览类型 
    BrowserType: function() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器 
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器 
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器 
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器 
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器 

        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return "IE7";
            } else if(fIEVersion == 8) {
                return "IE8";
            } else if(fIEVersion == 9) {
                return "IE9";
            } else if(fIEVersion == 10) {
                return "IE10";
            } else if(fIEVersion == 11) {
                return "IE11";
            } else {
                return "0"
            } //IE版本过低 
        } //isIE end 

        if(isFF) {
            return "FF";
        }
        if(isOpera) {
            return "Opera";
        }
        if(isSafari) {
            return "Safari";
        }
        if(isChrome) {
            return "Chrome";
        }
        if(isEdge) {
            return "Edge";
        }
    }, //myBrowser() end 

    //判断是否是IE浏览器 
    isIE: function() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
        if(isIE) {
            return "1";
        } else {
            return "-1";
        }
    },

    //判断是否是IE浏览器，包括Edge浏览器 
    IEVersion: function() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器 
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return "IE7";
            } else if(fIEVersion == 8) {
                return "IE8";
            } else if(fIEVersion == 9) {
                return "IE9";
            } else if(fIEVersion == 10) {
                return "IE10";
            } else if(fIEVersion == 11) {
                return "IE11";
            } else {
                return "0"
            } //IE版本过低 
        } else if(isEdge) {
            return "Edge";
        } else {
            return "-1"; //非IE 
        }
    }

}
/********************/

export {
    common
}