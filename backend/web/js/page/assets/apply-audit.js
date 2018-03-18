$(function () {
    $(document).on('click', '#apply_pass', function () {
        var remark = $('#audit-remark').val();
        if (remark == '') {
            remark = '通过';
        }
        var approveId = $('#approveId').val();
        $.post('/bpm/approve/approve', {'id': $('#approveId').val(), 'action': 1, 'comment' : remark, '_csrf' : $('#_csrf').val()}, function (rs) {
            if (rs.code == 200) {
                history.back(-1);
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });

    $(document).on('click', '#apply_reject', function () {
        var remark = $('#audit-remark').val();
        if (remark == '') {
            Utils.Toastr.Info('提示', '请输入驳回原因');
            return;
        }
        var approveId = $('#approveId').val();
        $.post('/bpm/approve/approve', {'id': $('#approveId').val(), 'action': 2, 'comment' : remark, '_csrf' : $('#_csrf').val()}, function (rs) {
            if (rs.code == 200) {
                history.back(-1);
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });


    $(document).on('click', '#close-order', function () {
        var url = $(this).data('url');
        layer.confirm('您确定关闭该申请吗?', {
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

    $(document).on('click', '#apply-instorage', function () {
        var url = $(this).data('url');
        layer.confirm('您确定确认收货并入库该吗?', {
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

    $(document).on('click', '#submit_again', function () {
        var id = $('#apply_id').val();
        layer.confirm('您确定重新提交该申请吗?', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.ajax({
                url: "submit?id="+id,
                type: 'get',
                success: function (ret) {
                    if (0 === ret.code) {
                        Utils.Toastr.Success('成功', ret.msg);
                        history.back(-1);
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

    $(document).on('click', '#apply_item_delete', function () {
        var deleteItemId = $(this).data('id');
        var data = new Object();
        data.id = deleteItemId;
        layer.confirm(
            '是否取消物料?',
            {'btn' : ['确定', '取消']},
            function(){
                $.ajax({
                    url:'delete-item',
                    type: "POST",
                    data : data,
                    error:function(){
                        Utils.Toastr.Error('异常', '系统错误');
                    },
                    success:function(data){
                        if(data.code == 0)
                        {
                            $("#apply_item_delete").parent().parent().remove();
                            Utils.Toastr.Success('Success', data.msg);
                        }
                        else
                        {
                            Utils.Toastr.Info('info', data.msg);
                        }
                    }
                });
            }, function(index){
                layer.close(index);
            }
        );

    });
});

function prom($id) {

    var apply_quantity = prompt("请输入申请数量", "");
    if (apply_quantity) {
        var data = new Object();
        data.id = $id;
        data.apply_quantity = apply_quantity;
        $.ajax({
            url: "change",
            type: 'post',
            data: data,
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
    }else{
        // Utils.Toastr.Info('提示', '请输入合同编号');
    }

}