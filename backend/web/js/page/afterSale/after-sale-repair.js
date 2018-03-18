$(function () {

    $("#delivery-btn").click(function () {
        var orderNo = $("#order-no").val();
        var deliveryId = $("#delivery-id").val();
        var deliveryNo = $("#delivery-no").val();
        var deliveryMethod;
        $('input[name="delivery-type"]:checked').each(function(){
            deliveryMethod = $(this).val();
        });
        $(this).attr('disabled', 'disabled');
        $.post("/aftersale/repair/delivery",
            {
                order_no: orderNo,
                delivery_id: deliveryId,
                delivery_no: deliveryNo,
                delivery_method: deliveryMethod
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','发货成功');
                    window.location.href = '/aftersale/repair/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                    setTimeout(function () {
                        $("#delivery-btn").attr('disabled', false);
                    },2000);
                }else{
                    Utils.Toastr.Error('失败','发货失败');
                    setTimeout(function () {
                        $("#delivery-btn").attr('disabled', false);
                    },2000);
                }
            }
        );
    })

    $("#close-btn").click(function () {
        var orderNo = $("#order-no").val();
        $(this).attr('disabled', 'disabled');
        $.post("/aftersale/repair/close-repair-order",
            {
                order_no: orderNo
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','关闭成功');
                    window.location.href = '/aftersale/repair/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                    setTimeout(function () {
                        $("#close-btn").attr('disabled', false);
                    },2000);
                }else{
                    Utils.Toastr.Error('失败','关闭失败');
                    setTimeout(function () {
                        $("#close-btn").attr('disabled', false);
                    },2000);
                }
            }
        );
    });

    $(document).on('click', '#confirm-btn', function () {
        var orderNo = $("#confirm-order-no").val();
        $(this).attr('disabled', 'disabled');
        $.post("/aftersale/repair/accept",
            {
                order_no: orderNo
            },
            function (result) {
                if (result.code == 200) {
                    Utils.Toastr.Success('成功', '收货成功');
                    $("button.close").trigger("click");
                    window.location.href = '/aftersale/repair/index';
                } else if (result.code == 10001 || result.code == 10002) {
                    Utils.Toastr.Info('提示', result.msg);
                    $('#confirm-btn').attr('disabled', false);
                } else {
                    Utils.Toastr.Error('失败', '收货失败');
                    $('#confirm-btn').attr('disabled', false);
                }
            }, "json");
    });

    $(document).on('click', '#send-confirm-btn', function () {
        var orderNo = $("#confirm-order-no").val();
        $(this).attr('disabled', 'disabled');
        $.post("/aftersale/repair/send-customer",
            {
                order_no: orderNo
            },
            function (result) {
                if (result.code == 200) {
                    $("button.close").trigger("click");
                    Utils.Toastr.Success('成功', '操作成功');
                    window.location.href = '/aftersale/repair/index';
                } else if (result.code == 10001 || result.code == 10002) {
                    Utils.Toastr.Info('提示', result.msg);
                    $('#confirm-order-no').attr('disabled', false);
                } else {
                    Utils.Toastr.Error('失败', '操作失败');
                    $('#confirm-order-no').attr('disabled', false);
                }
            }, "json");
    });


    $(document).on('click', '#cancel-btn', function () {
        $("button.close").trigger("click");
    });

});