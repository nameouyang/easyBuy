$(function () {
    var type = $('#transfer_type').text();
    if(type == 3){
        $('#warehouse-select').hide();
    }

    // 取消调拨单 
    $(document).on('click', '.transfer-cancel', function () {
        $(this).attr("disabled", true);

        if (confirm('确认取消此调拨单?')) {
            var id = $(this).attr('data-id');

            $.post("/transfer2/transfer/cancel", {'id': id}, function (rs) {
                if (rs.code == 0) {
                    Utils.Toastr.Success('成功', rs.msg);
                    window.location.reload();
                } else {
                    Utils.Toastr.Warning('失败', rs.msg);
                }
            }, "json");
        }
    });
});
