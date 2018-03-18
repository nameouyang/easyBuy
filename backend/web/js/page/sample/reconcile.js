$(function(){
   $("#sample-good-type").click(function(){
       var type = $("input[name='good-type']:checked").val();
       if(type == 2)
       {
           $("#goods-price").css('display', 'block');
           $("#goods-type").css('display', 'none');
           $("[name='goods-category-info[]']").attr('selected', false);
       }
       else if(type == 3)
       {
           $("#goods-type").css('display', 'block');
           $("#goods-price").css('display', 'none');
           $("[name='goods-price-info[]']").removeAttr("checked");
       }
       else {
           $("#goods-type").css('display', 'none');
           $("#goods-price").css('display', 'none');
           $("#goods-price-checked:checkbox").prop("checked", false);
           $("#goods-category-checked:checkbox").prop("checked", false);
       }

   });
   $("#org-type").click(function(){
       var orgType = $("input[name='select-org']:checked").val();
       if(orgType == 4)
       {
           $("#org").css('display', 'block');
           $("#org").css('width', '100px');
       }
       else {
           $("#org").css('display', 'none');
       }
   });

   $(document).on('change', '.good-check', function(event){
       var id = $(this).data("id");
       var url = "/sample/reconcile-order/" + $(this).data('url');
       var data = Object();
       data['data'] = $(this).val();
       var snName = 'sn['+id+']';
       data['sn'] = $("input[name=\'"+snName+"\']:checked").val();

       var pos = $(this).parent();
       $.ajax({
           url: url,
           type: "POST",
           data: data,
           cache: false,
           success: function (data) {
               if (data.code != 0) {
                   pos.next().children().text(data.msg);
               }
               else {
                   pos.next().children().text("");
               }
           },
       });
   });

   $(document).on("click", "#reconcile-create", function(){
       $.ajax({
           data: $("#common-create-form").serialize(),
           type: "POST",
           url: $("#common-create-form").data('action'),
           cache:false,
           error:function(){
               Utils.Toastr.Error('错误', '网络错误');
           },
           success:function(data){
               if(data.code == 0)
               {
                   Utils.Toastr.Success('成功', data.msg);
                   window.location.href = "/sample/reconcile-order/index";
               }
               else
               {
                   Utils.Toastr.Warning('提示', data.msg);
               }
           },
       });
   });

    /*$(document).on("click", "#checkAll", function(){
       if(this.checked)
       {
           $("input[name='selected']:checkbox").each(function(){
                $(this).prop("checked", true);
           })
       }
       else {
           $("input[name='selected']:checkbox").each(function(){
               $(this).prop("checked", false);
           })
       }
    });*/

    $(document).on("click", "#sample-selected-save", function(){
        layer.confirm('是否确定保存选中样品进行盘点', {
            btn:['确定', '取消']
        }, function(){
            $.ajax({
                data : $("#common-check").serialize(),
                url :  $("#sample-selected-save").data("url"),
                type : "POST",
                error:function(){
                    Utils.Toastr.Error('失败', "网络问题");
                },
                success:function(data)
                {
                    if(data.code == 0)
                    {
                        Utils.Toastr.Success("成功", data.msg);
                        location.reload();
                    }
                    else {
                        Utils.Toastr.Warning("提示", data.msg);
                    }
                }
            });
        }, function(){
            layer.close();
        });

    });

    $(document).on("click", "#check-sample", function(){
     /*$("#check-sample").attr("disabled", true);
     layer.confirm('是否提交盘点结果', {btn:['确定', '取消']}, function(){
         $.ajax({
             data : $("#common-check").serialize(),
             url  : $("#check-sample").data("url"),
             type : "POST",
             cache : false,
             error: function() {
                 Utils.Toastr.Error("错误", "网络问题");
             },
             success: function(data){
                 if(data.code == 0)
                 {
                     Utils.Toastr.Success("成功", data.msg);
                     location.href = "/sample/reconcile-order/index";
                 }
                 else {
                     $("#check-sample").attr("disabled", false);
                     Utils.Toastr.Warning("提示", data.msg);
                 }
             },
         });
     }, function(){
         $("#check-sample").attr("disabled", false);
     })*/
    });
    $(document).on('click', '#sample-service', function(){
        $("#sample-service").attr("disabled", true);
        layer.confirm('是否提交盘点结果', {btn:['确定', '取消']}, function(index) {
            $.ajax({
                data: $("#common-service").serialize(),
                url: $("#sample-service").data("url"),
                type: "POST",
                cache: false,
                error: function () {
                    Utils.Toastr.Error("错误", "网络问题");
                },
                success: function (data) {
                    if (data.code == 0) {
                        Utils.Toastr.Success("成功", data.msg);
                        location.href = "/sample/reconcile-order/index";
                    }
                    else {
                        Utils.Toastr.Warning("提示", data.msg);
                        $("#sample-service").attr("disabled", false);
                        layer.close(index);
                    }
                }
            })
        },
        function () {
            $("#sample-service").attr("disabled", false);
        })
    });

    $(document).on('mouseover', '.good_type_info', function(){
        var goodTypeInfo = $(this).attr("data-good-type-info");
        var id = $(this).attr('id');
        var layerIndex = layer.load(1, {
            shade: 0
        });
        layer.close(layerIndex);
        layer.tips(goodTypeInfo, "#"+id,
            {
                tips: [1, '#3595CC'],
                time: 4000
            });
    });

    $(document).on('click','.ajax-reset', function() {
        var msg = $(this).data('msg');
        var url = $(this).data('url');
        layer.confirm(msg, {btn: ['确定', '取消']}, function () {
            $.ajax({
                url: url,
                type: 'post',
            }).done(function (data) {
                if (data.code == 0) {
                    layer.closeAll();
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.reload();
                } else {
                    if (data.msg) {
                        layer.closeAll();
                        Utils.Toastr.Error('错误', data.msg);
                    }

                }
            });
        })
    });

    $(document).on('click', '#btn-close-order', function(){
        $("#btn-close").prop("disabled", true);
        layer.prompt({title: '输入盘点单大单号', formType: 1}, function(pass, index){
            layer.close(index);
            $.ajax({
                url: "/sample/reconcile-order/close-all-order?orderId="+pass,
                type : 'get',
                cache : false,
                error:function(){
                    Utils.Toastr.Error();
                },
                success : function(data){
                    if(data.code == 0)
                    {
                        Utils.Toastr.Success('Success', data.msg);
                        window.href.reload();
                        $("#btn-close").prop("disabled", false);
                    }
                    else
                    {
                        Utils.Toastr.Info('Info', data.msg);
                        $("#btn-close").prop("disabled", false);
                    }
                }
            });
        });
    });
});