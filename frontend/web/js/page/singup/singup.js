var code = 0;

$('#send_email').click(function (e) {
    e.preventDefault();
    var email = $('#signupform-email').val();
    var name = $('#signupform-username').val();
    var password = $('#signupform-password').val();


    if (!inputCheck(email, name, password)) {
        return;
    }

    $.post("get-email-code",{email:email},function(result){
        if (result.code === 200) {
            code = result.data.code;
            success_prompt("发送成功", 3000);
            //Utils.Toastr.Success('发送成功', result.msg);
        } else {
            fail_prompt("发送失败", 3000);
            // jQuery.alertWindow("保存成功");
            //Utils.Toastr.Info('发送失败', result.msg);
        }
    });

});

$('#submit_btn').click(function (e) {
    inputCode = $('#code').val();

    var email = $('#signupform-email').val();
    var name = $('#signupform-username').val();
    var password = $('#signupform-password').val();


    if (!inputCheck(email, name, password)) {
        return;
    }

    if ('' == inputCode || null == inputCode || undefined == inputCode) {
        fail_prompt("请输入验证码", 3000);
        return;
    }
    if (0 == code) {
        fail_prompt("请先获取验证码", 3000);
        return;
    } else if (parseInt(code) != parseInt(inputCode)) {
        fail_prompt("验证码不正确", 3000);
        return;
    }
    $.post("signup",$('#form-signup').serialize(),function(result){
        if (result.code === 200) {
            code = result.data.code;
            success_prompt(result.msg, 3000);
            window.location.href = 'index';
            //Utils.Toastr.Success('发送成功', result.msg);
        } else {
            fail_prompt(result.msg + ', ' + result.data.data, 3000);
            // jQuery.alertWindow("保存成功");
            //Utils.Toastr.Info('发送失败', result.msg);
        }
    });
});

/**
 * 邮箱验证
 * */
function checkEmail(email) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if(!reg.test(email)){ //正则验证不通过，格式不对
        return false;
    }else{
        return true;
    }
}

function inputCheck(email, name, password) {
    if ('' == name || null == name || undefined == name) {
        //alert('请输入用户名');
        fail_prompt("请输入用户名", 3000);
        return;
    }

    if ('' == email || null == email || undefined == email) {
        fail_prompt("请输入邮箱名称", 3000);
        // alert('请输入邮箱名称');
        return;
    }

    if ('' == password || null == password || undefined == password) {
        fail_prompt("请输入密码", 3000);
        // alert('请输入密码');
        return;
    }
    var isEmail = checkEmail(email);
    if (!isEmail) {
        fail_prompt("请输入正确的邮箱名称", 3000);
        // alert('请输入正确的邮箱名称');
        return;
    }
    return true;
}
function post(url, data, dataType) {
    $.post({
        url: '/activity/promotion/get-goods-info',
        data: {sku:sku},
        dataType: 'json',
        success: function (ret) {
            console.log(ret);
            if (ret.code === 0) {
                $('#reduce').append('<tr id="li-' + ret.data.sku +'"><td>' + ret.data.sku + '</td><td>' + ret.data.name + '</td><td>'
                    + ret.data.market_price + '</td><td>' + ret.data.price + '</td><td>' + ret.data.price + '</td><td><input type="number" name="reduce_goods[' + ret.data.sku + ']["reduce"]"></td><td><button class="btn btn-icon white btn-icon-sm remove-goods" data-sku=' + ret.data.sku + ' type="button"><i class="fa fa-minus"></i></button></td>><tr>');
            } else {
                Utils.Toastr.Info('查询失败', ret.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Utils.Toastr.Error('异常', '系统错误:' + textStatus);
        }
    });
}



