$(function ($) {
    $('#clearCache').on('click', function(){
        $.get('/hipos/file/clear-cache', function() {
            Utils.Toastr.Success('成功', '刷新缓存成功');
        });
    });
});
