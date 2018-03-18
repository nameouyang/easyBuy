$(function () {
    $(document).on('click', '#auditok', function () {
        var remark = $('#audit-remark').val();
        if (remark == '') {
            remark = '通过';
        }
        var id = $('#order_id').val();
        $.post('audit?id=' + id, {'pass': 1, 'remark': remark}, function (rs) {
            if (rs.code == 0) {
                history.back(-1)
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });

    $(document).on('click', '#auditnok', function () {
        var remark = $('#audit-remark').val();
        if (remark == '') {
            Utils.Toastr.Info('提示', '请输入驳回原因');
            return;
        }
        var id = $('#order_id').val();
        $.post('audit?id=' + id, {'pass': 0, 'remark': remark}, function (rs) {
            if (rs.code == 0) {
                history.back(-1);
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });

    $(document).on('click', '#top-order', function () {
        var url = $(this).data('url');
        layer.confirm('您确定置顶该订单吗?', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.ajax({
                url: url,
                type: 'get',
                success: function (ret) {
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
        }, function () {

        });
    });

    $(document).on('click', '#close-order', function () {
        var url = $(this).data('url');
        layer.confirm('您确定关闭该订单吗?', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.ajax({
                url: url,
                type: 'get',
                success: function (ret) {
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
        }, function () {

        });
    });

    $(document).on('click', '#delay-order', function () {
        var url = $(this).data('url');
        layer.confirm('您确定延期该订单吗?', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.ajax({
                url: url,
                type: 'get',
                success: function (ret) {
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
        }, function () {

        });
    });

    $(document).on('click', '.warehouse-change', function () {
        var value = $(this).data('value');
        var url = 'adjust?id='+value;
        var warehouse_id = $('#warehouse' + value).val();
        var csrfToken = $('#_csrf').val();
        layer.confirm('您确定修改该订单仓库吗?', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.ajax({
                url: url,
                type: 'post',
                data: {warehouse_id:warehouse_id, '_csrf':csrfToken},
                success: function (ret) {
                    if (0 === ret.code) {
                        Utils.Toastr.Success('成功', ret.msg);
                        window.location.reload();
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
});