$(function(){
    //修改损益原因
    $(document).on('click', '#btn-submit', function(){
        $("#btn-submit").prop("disabled", true);
        layer.confirm('提交之后,数据将不能修改!!您确定要提交吗?', [
            '确定', '取消'
        ], function(index){
            $.ajax({
                type : "POST",
                url  : $("#edit-form").attr('action'),
                data : $("#edit-form").serialize(),
                cache : false,
                error: function(){
                    Utils.Toastr.Success('Error', "网络问题");
                },
                success:function(data){
                    layer.close(index);
                    if(data.code == 0)
                    {
                        Utils.Toastr.Success('Success', "保存成功");
                        window.location.href = "/stockcounting/stock-loss-order/index";
                    }
                    else
                    {
                        Utils.Toastr.Info('Info', data.msg);
                        $("#btn-submit").prop("disabled", false);
                    }
                }
            })
        }, function(){
            $("#btn-submit").prop("disabled", false);
        })
        $("#btn-submit").prop("disabled", false);

    });


    $(document).on('click', '#btn-back', function () {
        window.location.href = "/stockcounting/stock-loss-order/index";
    })


    //审核通过损益单
    $(document).on('click', '#btn-audit', function(){
        // $("#btn-audit").prop("disabled", true);
        var params = new Object();
        params.remark = $("#remark").val();
        params.status = $(this).attr('data-id');
        console.log(params.status);
        $.ajax({
            type : "POST",
            cache : false,
            url : $("#audit-form").attr('action'),
            data : params,
            error:function(){
                Utils.Toastr.Error('Error', "网络问题");
            },
            success:function(data){
                if(data.code == 0)
                {
                    Utils.Toastr.Success('Success', "审核成功");
                    window.location.href = "/stockcounting/stock-loss-order/index";
                }
                else
                {
                    Utils.Toastr.Info('Info', data.msg);
                    $("#btn-submit").prop("disabled", false);
                }
            }
        })
    });

});

