$(function () {
    $(document).on('mouseover', '#td-exp', function(){
        $('#div-exp-more').show();
    });
    $(document).on('mouseout', '#td-exp', function(){
        $('#div-exp-more').hide();
    });
    $(document).on('click', '#transfer-audit-pass', function () {
        var dataId = $(this).attr('data-id');
        layer.confirm('确认通过此调拨单?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            postAuditResult(dataId, 1, '');
            layer.close(index);
        }, function () {
        });
    });

    $(document).on('click', '#transfer-audit-reject', function () {
        var dataId = $(this).attr('data-id');
        layer.prompt({title: '请填写驳回的原因', formType: 2}, function (text, index) {
            postAuditResult(dataId, 0, text);
            layer.close(index);
        });
    });

    function postAuditResult(transferId, status, reason) {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.post("/sample/dispatch-list/audit?id=" + transferId, {'status': status, 'reason': reason}, function (rs) {
            if (rs.code == 0) {
                layer.close(layerIndex);
                Utils.Toastr.Success('审核成功', rs.msg);
                window.location.href = '/sample/dispatch-list/index';
            } else {
                layer.close(layerIndex);
                Utils.Toastr.Error('审核失败', rs.msg);

            }
        }, "json");
    }
});
