$(function () {

    $("#create-method").click(function () {
        var organizationType = [];
        var repairMethod = [];
        $('input.organization-type:checked').each(function(i){
            organizationType.push($(this).val());
        });
        $('input.repair-method:checked').each(function(i){
            repairMethod.push($(this).val());
        });
        var goodsId = $("#goods-id").val();
        var status = $('input:radio[name="status"]:checked').val();
        if (organizationType.length<1){
            Utils.Toastr.Info('提示', '请勾选门店类型');
            return false;
        }
        if (goodsId=='' || goodsId==undefined || goodsId==null){
            Utils.Toastr.Info('提示', '请填写SKU');
            return false;
        }
        if (repairMethod.length<1){
            Utils.Toastr.Info('提示', '请勾选处理方式');
            return false;
        }

        if (status===undefined || status===null || status===''){
            Utils.Toastr.Info('提示', '请选择状态');
            return false;
        }

        $.post("/aftersale/repair-method/create",
            {
                organization_type: organizationType,
                goods_id: goodsId,
                repair_method: repairMethod,
                status:status
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','创建成功');
                    window.location.href = '/aftersale/repair-method/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    Utils.Toastr.Error('失败','创建失败');
                }
            }
        );
    });

    $("#update-method").click(function () {
        var organizationType = [];
        var repairMethod = [];
        $('input.organization-type:checked').each(function(i){
            organizationType.push($(this).val());
        });
        $('input.repair-method:checked').each(function(i){
            repairMethod.push($(this).val());
        });
        var goodsId = $("#goods-id").val();
        var status = $('input:radio[name="status"]:checked').val();
        if (organizationType.length<1){
            Utils.Toastr.Info('提示', '请勾选门店类型');
            return false;
        }
        if (repairMethod.length<1){
            Utils.Toastr.Info('提示', '请勾选处理方式');
            return false;
        }

        if (status===undefined || status===null || status===''){
            Utils.Toastr.Info('提示', '请选择状态');
            return false;
        }

        $.post("/aftersale/repair-method/update",
            {
                organization_type: organizationType,
                goods_id: goodsId,
                repair_method: repairMethod,
                status:status
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','更新成功');
                    window.location.href = '/aftersale/repair-method/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    Utils.Toastr.Error('失败','创建失败');
                }
            }
        );
    });

});