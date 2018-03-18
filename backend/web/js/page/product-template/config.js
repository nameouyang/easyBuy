$(function () {
    //添加加号，追加配置项
    $(document).on('click','.button-box-add',function () {
        var obj = $(this);
        $.ajax({
            type: "POST",
            url: '/product-template/add-config',
            data: {'name':obj.data('name')},
            dataType: "html",
            success: function(html){
                obj.hide();
                obj.parent().after(html);
                $(".tag-select").select2({
                    theme:'bootstrap'
                });
            }
        });
        return false;
    })

    //单击减号，移除配置项
    $(document).on('click','.button-box-minus',function () {
        var obj = $(this);
        if(obj.next().is(":hidden")){
            obj.parent().remove();
        }else{
            obj.parent().prev().find('.button-box-add').show();
            obj.parent().remove();
        }
    })

    //图片滑动显示删除按钮
    $('.holder').hover(function(){
        $(this).removeClass('.notactive');
        $('.notactive').stop().animate({'width':'189px'},400);
        //$(this).find('img').stop().animate({'top':'-35px'},400);
        $(this).stop().animate({'width':'189px'},400);
        $(this).find('.text').fadeIn(300);
    },function(){
        $('.notactive').stop().animate({'width':'189'},400);
        $(this).addClass('.notactive');
        $(this).find('.text').hide();
        //$(this).find('img').stop().animate({'top':'0px'},500);
        $(this).stop().animate({'width':'189px'},400);
    });

    //单击删除移除图片
    $(document).on('click','.banner-del-icon',function () {
        if(window.confirm('确定要删除么？')){
            var url = $(this).data('url');
            var id = $('#template_id').val();
            $.ajax({
                type: "POST",
                url: '/product-template/remove-pic?id='+id,
                data: {"pic":url,"name":"banner"},
                dataType: "json",
                success: function(data){
                    if(data.code == 0){
                        Utils.Toastr.Success('成功', '移除图片成功');
                        setInterval(function () {
                            window.location.reload();
                        },1000);
                    }else{
                        Utils.Toastr.Error('失败', '移除图片失败');
                    }
                }
            });
        }
        return false;
    });

    $(document).on('click','.poster-del-icon',function () {
        var url = $(this).data('url');
        var id = $('#template_id').val();
        $.ajax({
            type: "POST",
            url: '/product-template/remove-pic?id='+id,
            data: {"pic":url,"name":"poster"},
            dataType: "json",
            success: function(data){
                if(data.code == 0){
                    Utils.Toastr.Success('成功', '移除图片成功');
                    setInterval(function () {
                        window.location.reload();
                    },1000);
                }else{
                    Utils.Toastr.Error('失败', '移除图片失败');
                }
            }
        });
        return false;
    });

    $(document).on('click','#product-category-submit',function () {
        var id=$('#categoryId').data('template-id');
        var pic=$('#categoryId').data('pic');
        var categoryId=$('#categoryId').val();
        var firstTitle =$('#firstTitle').val();
        var secondTitle=$('#secondTitle').val();
        var thirdTitle =$('#thirdTitle').val();
        $.ajax({
            type: "POST",
            url: '/product-template/set-product?id='+id,
            data: {"pic":pic,"categoryId":categoryId,"firstTitle":firstTitle,"secondTitle":secondTitle,"thirdTitle":thirdTitle},
            dataType: "json",
            success: function(data){
                console.log(data);
                if(data.code == 0){
                    Utils.Toastr.Success('成功', '设置banner关联信息成功');
                    setInterval(function () {
                        window.location.reload();
                    },1000);
                }else{
                    Utils.Toastr.Error('失败', '设置banner关联信息失败');
                }
            }
        });
        return false;
    })
});