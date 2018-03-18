$(function () {

    $(document).on('click', '#batch-del-btn', function () {
        layer.confirm('您确定要删除选中的项？', {
            btn: ['确定', '取消']
        }, function () {
            params = new Object();
            paramValue = new Array();
            $("input[name='id[]']:checked").each(function () {
                paramValue.push($(this).val());
            });
            params.id = paramValue;
            if (0 == paramValue.length) {
                layer.msg('请选择您需要删除的项', {icon: 2});
                return;
            }
            if ($('#batch-del-btn').is('.move-member')) {
                $.ajax({
                    url: $('#batch-del-btn').attr('data-url'),
                    type: 'post',
                    data: $.param(params),
                    success: function (ret) {
                        layer.closeAll()
                        if (0 === ret.code) {
                            Utils.Toastr.Success('成功', ret.msg);
                            //$.pjax.reload({container: '#gridview-pjax'});
                            window.location.reload();
                        } else {
                            Utils.Toastr.Error('失败', ret.msg);
                        }
                    },
                    error: function () {
                        Utils.Toastr.Error('异常', '系统错误');
                    }
                });
            } else {
                $.ajax({
                    url: $('#batch-del-btn').attr('data-url'),
                    type: 'post',
                    data: $.param(params),
                    success: function (ret) {
                        layer.closeAll()
                        if (0 === ret.code) {
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
            }
        }, function () {

        });
    });

});