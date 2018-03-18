// +----------------------------------------------------------------------
// | XIAOMI OMS
// +----------------------------------------------------------------------
// | Copyright (c) 2017 http://www.xiaomi.com/license/ rights reserved.
// +----------------------------------------------------------------------
// | Author: chenpingbin <chenpingbin@xiaomi.com>
// +----------------------------------------------------------------------
// | Time: 17-8-25 上午10:43
// +----------------------------------------------------------------------

$(function(){

    //新增对应关系
    $(document).on('click','#create-virtual-mapping',function(){
        $.ajax({
            cache: false,
            type: 'POST',
            url: '/transfer2/virtual-goods-mapping/create',
            data: $('#virtual-goods-mapping-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code === 200 ){
                    Utils.Toastr.Success('成功','添加对应关系成功');
                    window.location.href = '/transfer2/virtual-goods-mapping/index';
                }else if( data.code === 10001 || data.code === 10002 ){
                    Utils.Toastr.Info('提示',data.msg);
                }else{
                    Utils.Toastr.Error('失败','添加对应关系失败');
                    self.location.reload();
                }
            }
        });

    });

    //编辑对应关系
    $(document).on('click','#update-virtual-mapping',function(){
        $.ajax({
            cache: false,
            type: 'POST',
            url: '/transfer2/virtual-goods-mapping/update',
            data: $('#virtual-goods-mapping-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code === 200 ){
                    Utils.Toastr.Success('成功','添加对应关系成功');
                    window.location.href = '/transfer2/virtual-goods-mapping/index';
                }else if( data.code === 10001 || data.code === 10002 ){
                    Utils.Toastr.Info('提示',data.msg);
                }else{
                    Utils.Toastr.Error('失败','添加对应关系失败');
                    self.location.reload();
                }
            }
        });

    });

    //商品分类联动
    $('#virtualgoodsmapping-goods_catorgry').change(function(){
        var defOpt = '<option value="">请选择实物商品</option>';
        $.post('/transfer2/virtual-goods-mapping/get-goods-by-catorgry?cat_id='+$(this).val(),function(data){
            $('#virtualgoodsmapping-goods_sku').html(defOpt);
            $('#select2-virtualgoodsmapping-goods_sku-container').html('请选择实物商品');
            $('#select2-virtualgoodsmapping-goods_sku-container').attr('title','请选择实物商品');
            $('#virtualgoodsmapping-goods_sku').append(data);
        });
    });

    //虚拟商品分类联动
    $('#virtualgoodsmapping-virt_goods_catorgry').change(function(){
        var liChoice = $('div.field-virtualgoodsmapping-virt_goods_sku').find('span.select2-selection--multiple').find('ul.select2-selection__rendered').find('li.select2-selection__choice');
        $.post('/transfer2/virtual-goods-mapping/get-goods-by-catorgry?cat_id='+$(this).val(),function(data){
            liChoice.remove();
            $('#virtualgoodsmapping-virt_goods_sku').html(data);
        });
    });

});