$(function () {
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

    $(document).on('click', '#batch-del-btn', function () {
        layer.confirm('您确定要删除选中的项？', {
            btn: ['确定', '取消']
        }, function () {
            params = new Object();
            paramValue = new Array();
            $("input[name='rep_id[]']:checked").each(function () {
                paramValue.push($(this).val());
            });
            params.id = paramValue;
            if (0 == paramValue.length)
            {
                layer.msg('请选择您需要删除的项', {icon: 2});
                return;
            }
            $.ajax({
                url: $('#batch-del-btn').attr('data-url'),
                type: 'post',
                data: $.param(params),
                success: function (ret) {
                    layer.closeAll()
                    if (0 === ret.code)
                    {
                        Utils.Toastr.Success('成功', ret.msg);
                        $.pjax.reload({container: '#gridview-pjax'});
                    } else {
                        Utils.Toastr.Error('失败', ret.msg);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            });

        }, function () {

        });
    });


    $(document).on('change', '#per-page', function ()
    {
        url = changeURLArg(window.location.href, 'per-page', $('#per-page').val());
        window.location.href = url;
    }
    );

});

function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}