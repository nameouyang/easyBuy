/**
 * Created by liupingli@xiaomi.com on 17-10-25.
 */

$(function() {

    //添加调拨商品规格的js
    $(document).on('click','#specification-create',function(){

        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer2/specification/create',
            data:$('#specificationCreate-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','添加调拨商品分类成功');
                    self.location.reload();
                }else if( data.code == 10001 || data.code == 10002 ){
                    Utils.Toastr.Info('提示',data.msg);
                }else if ( data.code == 10008 ){
                    Utils.Toastr.Error('失败','添加调拨商品分类失败');
                    self.location.reload();
                }
            }
        });

    });


    //修改调拨商品分类的js
    $(document).on('click','#specification-update',function(){

        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer2/specification/update',
            data:$('#specificationUpdate-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','修改调拨商品分类成功');
                    self.location.reload();
                }else if( data.code == 10002 || data.code == 10003 ){
                    Utils.Toastr.Info('提示',data.msg);
                }else if ( data.code == 10004 ){
                    Utils.Toastr.Error('失败','修改调拨商品分类失败');
                    self.location.reload();
                }
            }
        });

    });

    //删除调拨商品分类的js
    $(document).on('click','#specification-delete',function(){

        if ( window.confirm('你确定要删除该分类么?')){

            var _url = $('#specification-delete').attr('href');

            $.ajax({
                cache: true,
                type: "POST",
                url: _url,
                error: function(request) {
                    Utils.Toastr.Error('失败','网络错误');
                    self.location.reload();
                },
                success: function(data) {
                    if ( data.code == 0 ){
                        Utils.Toastr.Success('成功','删除调拨商品分类成功');
                        self.location.reload();
                    }else if( data.code == 10001 ){
                        Utils.Toastr.Info('提示',data.msg);
                    }else if ( data.code == 10002 ){
                        Utils.Toastr.Error('失败','删除调拨商品分类失败');
                        self.location.reload();
                    }
                }
            });
        }


    });
    $(document).on('pjax:success' ,function(){

    });


});

