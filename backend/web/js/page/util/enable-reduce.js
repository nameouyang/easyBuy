$(function () {
    var $key = $('#couponactivity-id');
    var $form = $('#enable-reduce-form');
    $(document).on('click', '#enable-reduce', function () {
        if ($key.val() !== '' &&  window.confirm('你确定生效该直降活动吗？')) {
            $.ajax({
                cache: false,
                type: "POST",
                url:  'enable',
                data: $form.serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.code === 200) {
                        Utils.Toastr.Success('成功', '生效成功');
                    }
                    else {
                        Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg + '<br/>' + data.data);
                    }
                }
            });
        }
    });
});