/**
 * 全局通用方法
 * 使用方式：
 *  Utils.Foo.Bar();
 */
var Utils = {};

Utils.Toastr = (function(){     // 封装 Toastr
    var _init = false;
    var _options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    var _toastr = function(type,title,message){
        if(!_init){
            toastr.options = _options;
            _init = true;
        }
        toastr[type](message, title);
    }
    return {
        Success : function(title,message){
            _toastr('success',title,message);
        },
        Info : function(title,message){
            _toastr('info',title,message);
        },
        Warning : function(title,message){
            document.getElementById('system-sound-error').play();
            _toastr('warning',title,message);
        },
        Error : function(title,message){
            document.getElementById('system-sound-error').play();
            _toastr('error',title,message);
        }
    }
})();



/*
 * Cookie控制
 */
Utils.Cookie = {
    get:function(name){
        var cookieValue = "";
        var search = name + "=";
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = document.cookie.indexOf(";", offset);
                if (end == -1)
                    end = document.cookie.length;
                cookieValue = decodeURIComponent(document.cookie.substring(offset, end));
            }
        }
        return cookieValue;
    },
    set:function(name, value, hours){
        var expire = "";
        if (hours != null) {
            if(hours == -1 || value == ''){
                expire = "; expires=-1";
            }
            else{
                expire = new Date((new Date()).getTime() + hours * 3600000);
                expire = "; expires=" + expire.toUTCString();
            }
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expire + '; path=/';
    }
}

Utils.Html = {
    StopPropagation:function(e){
        if($.browser.msie){
            event.cancelBubble=true;
        }else{
            e.stopPropagation();
            e.preventDefault();
        }	//停止冒泡
    }
}