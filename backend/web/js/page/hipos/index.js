$(function ($) {
    $('#clearCache').on('click', function(){
        $.get('/hipos/release/clear-cache?platform=1', function() {
            Utils.Toastr.Success('成功', '刷新缓存成功'); 
        });
    });
    $('#clearAndroidCache').on('click', function(){
        $.get('/hipos/release/clear-cache?platform=4', function() {
            Utils.Toastr.Success('成功', '刷新缓存成功'); 
        });
    });
});
