
$(function () {
    $(document).on('click', '#btn-submit-code', function () {
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
                    window.location.reload();

                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10002)
                {
                    Utils.Toastr.Error('提示', data.msg);
                }
            }
        });
    });
});
