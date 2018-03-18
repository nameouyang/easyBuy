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
    $(document).on('click', '#transfer-print-detail', function () {
        var dataId = $(this).attr('data-id');
        window.location.href = '/transfer2/transfer/print-detail?id='+dataId;
    });
    $(document).on('click', '#transfer-print-sn', function () {
        var dataId = $(this).attr('data-id');
        window.location.href = '/transfer2/transfer/print-sn?id='+dataId;
    });
    $(document).on('click', '#transfer-print-express', function () {
        var dataId = $(this).attr('data-id');
        window.location.href = '/transfer2/organization-express/print-express?id='+dataId;
    });

    $("#btn-batch-audit").on("click", function () {
        var keys = $("#grid").yiiGridView("getSelectedRows");
        var data = new Object();
        data.data = keys;
        console.log(data);
        $.ajax({
            type: 'POST',
            url: '/transfer2/transfer/batch-audit',
            data: data,
            error: function (data) {
                Utils.Toastr.Error('网络问题');
                //window.location.href = '/transfer2/transfer/batch-audit?status=10';
            },
            success: function (data) {
                if (0 == data.code) {
                    Utils.Toastr.Success('审核成功', data.msg);
                    window.location.href = '/transfer2/transfer/batch-audit?status=10';
                }
                else {
                    Utils.Toastr.Error('审核失败', data.msg);
                   // window.location.href = '/transfer2/transfer/batch-audit?status=10';
                }
            },
        });
    });

    function postAuditResult(transferId, status, reason) {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var type = $('#transfer_type').text();

        $.post("/transfer2/transfer/audit?id=" + transferId + '', {'status': status, 'reason': reason,'type' : type}, function (rs) {
            if (rs.code == 0) {
                layer.close(layerIndex);
                Utils.Toastr.Success('审核成功', rs.msg);
                window.location.href = '/transfer2/transfer/index';
            } else {
                layer.close(layerIndex);
                Utils.Toastr.Error('审核失败', rs.msg);

            }
        }, "json");
    }
});
