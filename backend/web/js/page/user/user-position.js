/**
 * Created by hanlu on 2017/2/9.
 */

$(function($){
    $.extend({
        initThirdPlugins: function () {
            if ($('.date').length > 0) {
                $('.date').datetimepicker({
                    viewMode: 'days',
                    format: 'YYYY-MM-DD',
                    locale: 'zh-cn'
                });
            }
        }});
});
$(function(){
    //创建用户
    $(document).on('click','#user-position-create',function(){
        $.ajax({
            cache: true,
            type: "POST",
            url: '/user-position/create',
            data:$('#userPositionCreate-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','添加用户成功');
                    self.location.reload();
                }else if ( data.code == 10001 ){
                    Utils.Toastr.Warning('提示',data.msg);
                    self.location.reload();
                }
                else{
                    Utils.Toastr.Warning('提示',data.msg);
                }
            }
        });

    });
});
$(function(){
    $(document).on('click', "#user-position-update", function()
    {
        $.ajax({
            cache: true,
            type: "POST",
            url: '/user-position/update',
            data:$('#userPositionUpdate-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','修改用户成功');
                    self.location.reload();
                }else if ( data.code == 10001 ){
                    Utils.Toastr.Warning('提示',data.msg);
                    self.location.reload();
                }
                else{
                    Utils.Toastr.Warning('提示',data.msg);
                }
            }
        })
    });

});
