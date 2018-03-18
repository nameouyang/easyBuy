$(function ($) {

    console.log($('#common-edit-form'));
    $.extend({
        initThirdPlugins: function () {
            if ($('.date').length > 0) {
                $('.date').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm:ss',
                    locale: 'zh-cn'
                });
            }
        }
    });


    $(document).on('submit', '#common-create-form', function () {
        var form = $(this);
        if (form.find('.has-error').length) {
            return false;
        }
        $.ajax({
            url: form.attr('action'),
            type: 'post',
            data: form.serialize(),
            success: function (ret) {
                if (0 === ret.code)
                {
                    Utils.Toastr.Success('成功', '添加数据成功');
                    $('#m-a-a-a').modal('toggle');
                    $.pjax.reload({container: '#gridview-pjax'});
                } else {
                    Utils.Toastr.Error('错误', ret.msg)
                }

            },
            error: function () {
                Utils.Toastr.Error('异常', '系统错误');
            }
        });
        return false;
    });


    $(document).on('submit', '#common-edit-form', function () {
        var form = $(this);

        if (form.find('.has-error').length) {
            return false;
        }
        $.ajax({
            url: form.attr('action'),
            type: 'post',
            data: form.serialize(),
            success: function (ret) {
                if (0 === ret.code)
                {
                    Utils.Toastr.Success('成功', '修改成功');
                    $('#m-a-a-a').modal('toggle');
                    $.pjax.reload({container: '#gridview-pjax'});
                } else {
                    Utils.Toastr.Error('错误', ret.msg)
                }

            },
            error: function () {
                Utils.Toastr.Error('异常', '系统错误');
            }
        });
        return false;
    });
});