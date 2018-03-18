$(function () {

    if(typeof(Clipboard) != "undefined" && $('.btn').exist){
        var clipboard = new Clipboard('.btn');
        clipboard.on('success', function(e) {
            Utils.Toastr.Success('','复制成功');
            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            Utils.Toastr.Info('','复制失败');
        });
    }

})

$('#btn_generate').click(function () {
    var appId = $('#appmanage-app_id').val();
    var appKey = $('#appmanage-app_key').val();
    var data = 'app_id=' + appId + '&app_key=' + appKey;
    $.post({
            url: 'generate',
            data: data,
            dataType: 'json',
            success: function (ret) {
                console.log(ret);
                if (ret.code === 200) {
                    Utils.Toastr.Success('成功', '生成成功');
                    $('#appmanage-app_key').attr('type', "text").val(ret.data.appKey);
                    $('#btn_app_key').find('span').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close').attr('status', 0);
                } else {
                    Utils.Toastr.Info('错误', ret.msg);
                }
            },
            error: function () {
                Utils.Toastr.Error('异常', '系统错误');
            }
        }
    );
});

