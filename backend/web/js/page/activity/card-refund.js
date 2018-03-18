$(function () {

    $(document).on('click', '#create_cardRefund', function () {
        var form = $('#form_cardRefund');
        $.ajax({
            cache: false,
            type: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    $('input').val('');
                }
                else {
                    Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg);
                }
            }
        });

    });
    $(document).on('click','#cancel_cardRefund',function(){
        $('input').val("");
        $(".help-block").html("");
        $(".form-group").removeClass("has-error");
        $('#error_div').css('display', 'none');
    });
});
