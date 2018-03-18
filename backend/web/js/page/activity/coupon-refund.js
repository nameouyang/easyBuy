$(function () {

    $(document).on('click', '#create_couponRefund', function () {
        var form = $('#form_couponRefund');
        $.ajax({
            cache: false,
            type: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    if(data.msg == ''){
                        Utils.Toastr.Success('成功', '返还优惠券成功');
                    } else {
                        Utils.Toastr.Info('信息：', data.msg);
                    }

                    $('input').val('');
                }
                else {
                    Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg);
                }
            }
        });

    });
    $(document).on('click','#cancel_couponRefund',function(){
        $('input').val("");
        $(".help-block").html("");
        $(".form-group").removeClass("has-error");
        $('#error_div').css('display', 'none');
    });
});