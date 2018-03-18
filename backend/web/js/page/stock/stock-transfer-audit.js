$(function () {
    $(document).on('mouseover', '#td-exp', function(){
        $('#div-exp-more').show();
    });
    $(document).on('mouseout', '#td-exp', function(){
        $('#div-exp-more').hide();
    });
    $(document).on('click', '#transfer-audit-pass', function () {
        var dataId = $(this).attr('data-id');
        layer.confirm('确认通过此单据?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {

            var selectedGoods = {};
            $("input[name^='quantity']").each(function () {
                var goods_id = $(this).attr('data-sku');
                var quantity = $(this).val();
                selectedGoods[goods_id] = quantity;
            });

            postAuditResult(dataId, 1, '',selectedGoods);
            layer.close(index);
        }, function () {
        });
    });

    $(document).on('click', '#transfer-audit-reject', function () {
        var dataId = $(this).attr('data-id');
        layer.prompt({title: '请填写驳回的原因', formType: 2}, function (text, index) {
            postAuditResult(dataId, 4, text,'');
            layer.close(index);
        });
    });


    $(document).on('click', '#back-list', function () {
        window.location.href = '/mistock/in-out-stock/stock-transfer-apply-search';
    });






    function postAuditResult(transferId, status, reason,selectedGoods) {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.post("/mistock/in-out-stock/audit?id=" + transferId, {'status': status, 'reason': reason,'selectedGoods':selectedGoods}, function (rs) {
            if (rs.code == 0) {
                layer.close(layerIndex);
                Utils.Toastr.Success('审核成功', rs.msg);
                window.location.href = '/mistock/in-out-stock/stock-transfer-apply-search';
            } else {
                layer.close(layerIndex);
                Utils.Toastr.Error('审核失败', rs.msg);

            }
        }, "json");
    }
});
