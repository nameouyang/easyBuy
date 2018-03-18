$(function(){
    var status = sampleStatus;
    var statusArr = new Array();
    for(var i in status)
    {
        statusArr[i] = status[i];
    }
    $(document).on('click', "#update-sampleInfo", function(){
        $("#update-sampleInfo").attr("disabled", "disabled");
        var statusCode = $("input[name=status]:checked").val();
        layer.confirm('系统提示:<br>您确定要将样机状态修改为'+statusArr[statusCode]+'吗?</br>点击确认摁扭代表已经知道该状态的含义,</br>否则请点击取消摁扭.', {
            btn:['确定', '取消']
        },function(index){
            $.ajax({
                cache: false,
                type: "POST",
                url: $('#SampleInfo-form').attr('action'),
                data:$('#SampleInfo-form').serialize(),
                success: function(data) {
                    if ( data.code == 0 ){
                        Utils.Toastr.Success('成功','商品类型创建成功');
                        var url = document.referrer;
                        window.location.href = url;
                        layer.close(index);
                    }
                    else {
                        Utils.Toastr.Warning('提示', data.msg);
                        $("#update-sampleInfo").attr("disabled", false);
                        layer.close(index);
                    }
                }
            });
        }, function(){
            $("#update-sampleInfo").attr("disabled", false);
        });
    });

    $(document).on('click', "#sample_compensate", function(){
        $.ajax({
            cache: false,
            type: "POST",
            url: $('#compensate-form').attr('action'),
            data:$('#compensate-form').serialize(),
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','支付凭证成功');
                    window.location.reload();
                }
                else {
                    Utils.Toastr.Warning('提示', data.msg);
                }
            }
        });
        $("#sample_compensate").attr("disabled", true);
    });

    $(document).on('click', "#batch-del-btn",function(){
        layer.confirm('您确定要删除选中的项？', {
            btn: ['确定', '取消']
        }, function () {
            params = new Object();
            paramValue = new Array();
            $("input[name='rep_id[]']:checked").each(function () {
                paramValue.push($(this).val());
            });
            params.id = paramValue;
            if (0 == paramValue.length)
            {
                layer.msg('请选择您需要删除的项', {icon: 2});
                return;
            }
            $.ajax({
                url: $('#batch-del-btn').attr('data-url'),
                type: 'post',
                data: $.param(params),
                success: function (ret) {
                    layer.closeAll()
                    if (0 === ret.code)
                    {
                        Utils.Toastr.Success('成功', ret.msg);
                        $.pjax.reload({container: '#gridview-pjax'});
                    } else {
                        Utils.Toastr.Error('失败', ret.msg);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            });

        }, function () {

        });
    });
    $("#img_uploaded a").lightBox();

    $(document).on("change", ".goods-check", function(){
        var type = $(this).val();
        if(type == 0 || type == 2)
        {
            $("#remark").css("display", "none");
        }
        else
        {
            if(type == 1)
            {
                $("#sample-service").css("display", 'block');
                $("#sale-price").css("display", 'none');
            }
            else if(type == 4)
            {
                $("#sale-price").css("display", 'block');
                $("#sample-service").css("display", 'none');
            }
            else
            {
                $("#sample-service").css("display", 'none');
                $("#sale-price").css("display", 'none');
            }
            $("#remark").css("display", "block");
        }
        var id = $(".hidden-remark").data("id");
        var remark = $(".hidden-remark").val();
        if(type == id)
        {
            $("#info-remark").val(remark);
        }else {
            $("#info-remark").val("");
        }
    });
});


function alertFile()
{
    var sampleStatus = $("#status").val();
    if (sampleStatus == 1) {
        $("#upload-file").show();
    }
    else {
        $("#upload-file").hide();
    }
}
