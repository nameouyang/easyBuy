$(function () {
    $(document).on('click', '#batch-express-btn', function () {
        var params = new Array();
        $("input[name='rep_id[]']:checked").each(function () {
            params.push($(this).val());
        });
        if (0 == params.length) {
            layer.msg('请选择您需要发货的调拨单', {icon: 2});
            return;
        }
        layer.closeAll();
        $.post('/transfer2/xms-transfer/check', {'id': params}, function (rs) {
            if (rs.code == 200) {
                window.location.href = '/transfer2/xms-transfer/create-express?id='+params;
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });

    $(document).on('click', '#batch-express-btn-sys', function () {
        var params = new Array();
        $("input[name='rep_id[]']:checked").each(function () {
            params.push($(this).val());
        });
        if (0 == params.length) {
            layer.msg('请选择您需要发货的调拨单', {icon: 2});
            return;
        }
        layer.closeAll();
        $.post('/transfer2/xms-transfer-sys/check', {'id': params}, function (rs) {
            if (rs.code == 200) {
                window.location.href = '/transfer2/xms-transfer-sys/create-express?id='+params;
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });

    $(document).on('mouseover', '.express_status', function () {
        layer.closeAll();
        var express_no = $(this).attr('express_no');
        var contentId = $(this).attr('id');
        var layerIndex = layer.load(1, {
            shade: 0
        });
        $.ajax({
            type: "GET",
            url: '/transfer2/organization-express/get-express-status',
            data: 'express_no=' + express_no,
            error: function (request) {
                Utils.Toastr.Error('失败', '对不起，网络错误，请重试！');
            },
            success: function (data) {
                layer.close(layerIndex);
                if (0 == data.code) {
                    layer.tips(data.msg, '#' + contentId, {
                        tips: [1, '#3595CC'],
                        time: 4000
                    });
                }
            }
        });
    });

});


