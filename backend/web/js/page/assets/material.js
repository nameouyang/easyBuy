function selectShipmentType(obj) {
    var shipment_type = $('#material-shipment_type').val();
    if (shipment_type == 1) {
        $('#supplier').hide();
    } else if (shipment_type == 2) {
        $('#supplier').show();
    }
}


$(function () {
    $(document).on('click', '#material-create', function () {
        // $(this).attr({"disabled":"disabled"});
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        $.ajax({
            url: '/assets/material/create',
            type: 'post',
            data: {material_id: $('#material-material_id').val()},
            success: function (ret) {
                if (0 === ret.code) {
                    Utils.Toastr.Success('成功', ret.msg);
                    window.location.reload();
                } else {
                    Utils.Toastr.Info('失败', ret.msg);
                    layer.close(layerIndex);
                    $(this).removeAttr("disabled");
                }
            },
            error: function () {
                Utils.Toastr.Error('异常', '系统错误');
                layer.close(layerIndex);
                $(this).removeAttr("disabled");
            }
        });
    });
});


