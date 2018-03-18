$(function(){
    $(document).on('click', '#btn_submit', function(){
        $("#btn_submit").attr("disabled", true);
        var quota = new Object();
        quota.quotaInfo = $("#file-data").val();
        quota.allQuota = $("#all-quota").val();
        quota.goodsQuota = $("#goods-quota").val();
        $.ajax({
            data : quota,
            url : 'create',
            type : "POST",
            error: function()
            {
                Utils.Toastr.Error('错误', "网络问题");
            },
            success: function(data)
            {
                if(data.code == 0)
                {
                    Utils.Toastr.Success('成功',data.msg);
                    window.location.href = "/sample/area-quota/index";
                }
                else
                {
                    Utils.Toastr.Warning('提示',data.msg);
                    var errorData = data.data;
                    var errorCode;
                    for(errorCode in errorData)
                    {
                        $("#quota_error").after("<tr><td>"+errorCode+"</td><td>"+errorData[errorCode]+"</td><td></td></tr>");
                    }
                }
            },
        });
    });

    //更新总额度
    /*$("#update-quota").click(function(){
        layer.confirm('您确定要进行商品配额同步', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
            $.ajax({
                cache: false,
                url: $("#update-quota").attr('data-url'),
                type: "GET",
                data: 'act=1',
                error: function () {
                    Utils.Toastr.Error('错误', "网络问题");
                },
                success: function (data) {
                    if (data.code == 0) {
                        Utils.Toastr.Success('成功', data.msg);
                    }
                    else {
                        Utils.Toastr.Warning('提示', data.msg);
                    }
                    layer.close(layerIndex);
                },
            });
        });
    });*/

    $(document).on('click', '#btn_dispatch_submit', function(){
        $("#btn_dispatch_submit").attr("disabled", true);
        var quota = new Object();
        quota.data = $("#dispatch-data").val();

        $.ajax({
            data : quota,
            url : $("#common-ajax-form").attr('action'),
            type : "POST",
            error: function()
            {
                Utils.Toastr.Error('错误', "网络问题");
            },
            success: function(data)
            {
                if(data.code == 0)
                {
                    Utils.Toastr.Success('成功',data.msg);
                    window.location.href = "/sample/dispatch-list/index";
                }
                else
                {
                    var errorData = data.data;
                    var errorCode;
                    for(errorCode in errorData)
                    {
                        $("#error").after("<tr><td>"+errorCode+"</td><td>"+errorData[errorCode]+"</td><td></td></tr>");
                    }
                    Utils.Toastr.Warning('提示',data.msg);
                }
            },
        });
    });
});