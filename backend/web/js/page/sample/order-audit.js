$(function () {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $(document).off('submit', '#sample-scan-form');
        $(this).removeData("bs.modal");
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });

    $(document).on('click', '#auditok', function () {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var remark = $('#audit-remark').val();
        if(remark == ''){
            remark = '通过';
        }
        var id = $('#order_id').val();
        $(this).attr("disabled", true);
        $.post('audit?id='+id, {'pass':1,'remark': remark}, function (rs) {
            if (rs.code == 0) {
                layer.closeAll();
                $('#m-a-a-a').modal('hide');
                window.location.reload();
            }else{
                layer.closeAll();
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });

    $(document).on('click', '#auditnok', function () {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var remark = $('#audit-remark').val();
        if(remark == ''){
            Utils.Toastr.Info('提示', '请输入驳回原因');
            return;
        }
        var id = $('#order_id').val();
        $(this).attr("disabled", true);
        $.post('audit?id='+id, {'pass':0,'remark': remark}, function (rs) {
            if (rs.code == 0) {
                layer.closeAll();
                $('#m-a-a-a').modal('hide');
                window.location.reload();
            }else{
                layer.closeAll();
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });

    $(document).on('click', '#re-push', function () {
        var url = $(this).data('url');
        layer.confirm('您确定推送订单到buy系统吗?', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.ajax({
                url: url,
                type: 'get',
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

    $(document).on('mouseenter', "[data-toggle='popover']", function () {
        $(this).popover("show");
    }).on('mouseleave', "[data-toggle='popover']", function () {
        $(this).popover("hide");
    });

    $(document).on('ready pjax:success', function() {
        $('.ajax-close-order').on('click', function(e) {
            if (confirm('是否要关闭订单吗？')) {
                $.ajax({
                    url: $(this).attr('href'),
                    type: 'post',
                }).done(function(data) {
                    if(data.code == 0){
                        Utils.Toastr.Success('成功', data.msg);
                        window.location.reload();
                    }else{
                        if(data.msg){
                            Utils.Toastr.Error('错误', data.msg);
                        }

                    }
                });
            }
            return false;
        });
    });

});