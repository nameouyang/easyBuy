$(function () {
    var $key = $('#pickingbill-picking_id');
    var $form = $('#close-picking-form');
    $(document).on('click', '#close-picking-bill', function () {
        if ($key.val() !== '' &&  window.confirm('你确定关闭吗？')) {
            $.ajax({
                cache: false,
                type: "POST",
                url:  'close',
                data: $form.serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.code === 200) {
                        Utils.Toastr.Success('成功', '关闭成功');
                    }
                    else {
                        Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg + '<br/>' + data.data);
                    }
                }
            });
        }
    });
});