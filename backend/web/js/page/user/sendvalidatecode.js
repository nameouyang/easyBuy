/**
 * Created by hanlu on 16-11-7.
 */

$(function () {

    $(document).on('click', '#btn-send-code', function () {

        $.ajax({
            cache: false,
            type: "get",
            url: '/user/send-code',
            data: 'id=' + $(this).attr('data-target-uid'),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    //Utils.Toastr.Success('成功', '发送邮件成功');
                    if (data.data == '') {
                        alert("验证码已发送到管理员邮箱，请联系管理员");
                    } else {
                        $("#confirm-code").val(data.data);
                    }

                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                }
            }
        });

    });

});
$(function () {
    $(document).on('click', '#btn-confirm-code', function () {
        var code = $("#confirm-code").val();
        $.ajax({
            cache: false,
            type: "post",
            url: $("#send-code-form").attr('action'),
            data: 'code=' + code,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = "/";

                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10001)
                {
                    Utils.Toastr.Info('提示', data.msg);
                }
            }
        });
    });
});
