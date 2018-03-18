$(function ($) {
    $.extend({
        initThirdPlugins: function () {
            if ($('.date').length > 0) {
                $('.date').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    locale: 'zh-cn'
                });
            }
        }
    });

    $(document).on('submit', '#common-create-form, #common-edit-form', function () {
        var form = $(this);

        if (form.find('.has-error').length) {
            return false;
        }

        $.ajax({
            url: form.attr('action'),
            type: 'post',
            data: form.serialize(),
            success: function (ret) {
                if (ret.code === 0) {
                    Utils.Toastr.Success('成功', ret.msg);
                    // 转换弹窗
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

    // on 支持 pjax reload 后的 click
    $(document).on('click', '.ajaxCheck', function () {
        $.ajax({
            url: $(this).attr('data-url'),
            type: 'get',
            success: function (ret) {
                if (ret.code === 0) {
                    Utils.Toastr.Success('成功', ret.msg);
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