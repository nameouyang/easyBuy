$(function () {

    $("#audit-agree").click(function () {
        var remark = $.trim($("#audit-remark").val());
        var orderNo = $("#order-no").val();
        if (remark=='' || remark==undefined || remark==null){
            Utils.Toastr.Info('提示', '审核意见不能空');
            return false;
        }

        $.post("/aftersale/approve/audit",
            {
                order_no: orderNo,
                remark: remark,
                audit: 'agree'
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','审核成功');
                    window.location.href = '/aftersale/approve/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    Utils.Toastr.Error('失败','审核失败');
                    self.location.reload();
                }
            }
        );
    });

    $("#audit-reject").click(function () {
        var remark = $.trim($("#audit-remark").val());
        var orderNo = $("#order-no").val();
        if (remark=='' || remark==undefined || remark==null){
            Utils.Toastr.Info('提示', '审核意见不能空');
            return false;
        }

        $.post("/aftersale/approve/audit",
            {
                order_no: orderNo,
                remark: remark,
                audit: 'reject'
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','审核成功');
                    window.location.href = '/aftersale/approve/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    Utils.Toastr.Error('失败','审核失败');
                    self.location.reload();
                }
            }
        );
    });

    $("#audit-close").click(function () {
        var orderNo = $("#order-no").val();

        $.post("/aftersale/approve/close",
            {
                order_no: orderNo
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','操作成功');
                    window.location.href = '/aftersale/approve/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    Utils.Toastr.Error('失败','操作失败');
                    self.location.reload();
                }
            }
        );
    });

});