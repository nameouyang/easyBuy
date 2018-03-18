
$(function(){
    $("span.glyphicon-remove").click(function () {

        var orderNo = $(this).parent('a.close-order').attr('id');
        var srvType = $(this).parent('a.close-order').attr('rel');

        $.post("/aftersale/stock/close-service-order",
            {
                order_no: orderNo,
                srv_type: srvType
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','关闭成功');
                    window.location.href = '/aftersale/stock/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    Utils.Toastr.Error('失败','关闭失败');
                    self.location.reload();
                }
            }
        );

    });


});