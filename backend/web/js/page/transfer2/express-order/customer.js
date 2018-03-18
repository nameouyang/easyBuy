$(function(){
    if ($("input[name='s_type']:checked").val() == 2) {
        $("input[name='c_type']").each(function(index,item){
            if(this.checked==true){
                $(this).parent().css("display","block");
            }else{
                $(this).parent().css("display","none");
            }
        });
    }
    $(document).on('change', '#org-select', function(){
        var orgId = $(this).val();
        $.ajax({
                url : 'select-org?orgId='+orgId,
                type : "GET",
                cache : false,
                error: function(){
                     Utils.Toastr.Error('Error', '网络问题');
                },
                success:function(data){
                    if(data.code == 0)
                    {
                       // $("#name").text(data.data.name);
                       $("input[name='s_name']").val(data.data.name);
                       $("input[name='s_tel']").val(data.data.tel);
                       $("input[name='s_address']").val(data.data.address);
                       // $("#tel").text(data.data.tel);
                       // $("#address").text(data.data.address);
                       $("#org-id").val(data.data.id);
                    }
                    else
                    {
                        Utils.Toastr.Info('Info', data.msg);
                    }
                }
            }
        );
    });

    $(document).on('change', '#package-nums', function(){
        // console.log($('#package-nums').val());

    });

    $(document).on('click', "#create-order", function(){
        $("#create-order").prop('disabled', true);
        $.ajax({
            url : $("#customer-express-order-form").attr('action'),
            type : "POST",
            data : $("#customer-express-order-form").serialize(),
            cache :false,
            error:function(){
                Utils.Toastr.Error('Error', '网络问题');
            },
            success : function(data) {
                if(data.code == 0)
                {
                    layer.confirm("获取快递单号成功<br>"+data.data, {
                        btn : ['返回首页'],
                        icon:1,
                    },function(){
                        //返回到我的快递页面
                        window.location.href = "/transfer2/organization-express/index";
                    }, function(){
                        layer.alert("svdvdvdvdf");
                    })
                }
                else
                {
                    $("#create-order").prop('disabled', false);
                    Utils.Toastr.Info('info', data.msg);
                }
            }
        });

    });
})
