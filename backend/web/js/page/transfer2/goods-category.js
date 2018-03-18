/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function() {

    //添加调拨商品分类的js
    $(document).on('click','#category-create',function(){

        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer2/category/create',
            data:$('#categoryCreate-form').serialize(),
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
    $(document).on('click','#category-update',function(){

        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer2/category/update',
            data:$('#categoryUpdate-form').serialize(),
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
    $(document).on('click','#category-delete',function(){

        if ( window.confirm('你确定要删除该分类么?')){

            var _url = $('#category-delete').attr('href');

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

