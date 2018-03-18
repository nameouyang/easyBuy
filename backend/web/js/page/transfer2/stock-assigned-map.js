$(function () {
    $('#stock-amap-table').dataTable(dtConfig);
    $(document).on('change', '#warehouse_select, #org_select', function () {
        var warehouseId = $('#warehouse_select').val();
        var orgId = $('#org_select').val();
        if (warehouseId == '' || orgId == '') {
            return;
        }
        reloadTable(warehouseId, orgId);
    });


    function reloadTable(warehouseId, orgId) {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var dataTable = $('#stock-amap-table').dataTable();
        dataTable.fnClearTable();
        dataTable.api().ajax.url(dtConfig.ajax.url + '&warehouseId=' + warehouseId + '&orgId=' + orgId).load(function () {
            layer.close(layerIndex);
        });

    }

    $('#transfer_one_button').click(function () {
        if ($('#warehouse_select').val() && $('#org_select').val() && $('input:checked').size() > 0) {
            $('#transfer_one_submit').submit();
        }
        return false;
    });

    $(".checkall").click(function () {
        var check = $(this).prop("checked");
        $(".checkchild").prop("checked", check);
    });

});