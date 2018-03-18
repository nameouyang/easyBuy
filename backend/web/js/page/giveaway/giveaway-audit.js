$(function () {

    $(document).on('click', '#pass', function () {
        var dataId = $(this).attr('data-id');
        var remark = $("#remark").val();
        var status = $("#status").val();
        var btn_type='1';

        layer.confirm('确认通过此申请?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            postAuditResult(dataId, status, remark, btn_type);
            layer.close(index);
        }, function () {
        });
    });

    $(document).on('click', '#reject', function () {
        var dataId = $(this).attr('data-id');
        var remark = $("#remark").val();
        var status = $("#status").val();
        var btn_type='2';

        if(remark==''){
            Utils.Toastr.Warning('审批原因为空', '请填写审批原因');
            return;
        }
        layer.confirm('确认驳回此申请?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            postAuditResult(dataId, status, remark, btn_type);
            layer.close(index);
        }, function () {
        });
    });


    $(document).on('click', '#back-list', function () {
        window.location.href = '/giveaway/index/list';
    });






    function postAuditResult(orderId, status, reason, btn_type) {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.post("/giveaway/index/audit?id=" + orderId, {'status': status, 'reason': reason, 'btn_type': btn_type}, function (rs) {
            if (rs.code == 0) {
                layer.close(layerIndex);
                Utils.Toastr.Success('审核成功', rs.msg);
                window.location.href = '/giveaway/index/list';
            } else {
                layer.close(layerIndex);
                Utils.Toastr.Error('审核失败', rs.msg);

            }
        }, "json");
    }
});
