/**
 * Created by hanlu on 16-10-19.
 */

$(function() {

    // 添加门店和分仓关系
    $(document).on('click','#create-goodsTypeConfig',function(){

        $.ajax({
            cache: false,
            type: "POST",
            url: $('#goodsTypeConfig-form').attr('action'),
            data:$('#goodsTypeConfig-form').serialize(),
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','商品类型创建成功');
                    window.location.reload();
                }
                else if(data.code === 1000){
                    Utils.Toastr.Info("提示",data.msg);
                }else if( data.code == 10001 ) {
                    Utils.Toastr.Info('提示',data.msg);
                }else if( data.code == 10002 ) {
                    Utils.Toastr.Info('提示',data.msg);
                }
            }
        });

    });

    $(document).on('click','#update-goodsTypeConfig',function(){

        $.ajax({
            cache: false,
            type: "POST",
            url: $('#goodsTypeConfig-form').attr('action'),
            data:$('#goodsTypeConfig-form').serialize(),
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','商品类型更新成功');
                    window.location.reload();
                }else if( data.code == 10001 ){
                    Utils.Toastr.Info('提示','请选择本月或本月之后的日期');
                }
            }
        });

    });

});