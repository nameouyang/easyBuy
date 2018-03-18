/**
 * Created by ouyang on 17-7-24.
 */
$(function () {
    $(document).on('click', '#create-member-tag', function () {
    var michat = $('#member-michat').val();
    var tagId = $('#tagId').val();
    if ('' == michat) {
        layer.msg('请输入新增的米聊号', {icon: 2});
        return;
    }
    $.ajax({
        url: $('#create-member-tag').attr('data-url'),
        type: 'post',
        data: {michat:michat,tagId:tagId},
        success: function (ret) {
            layer.closeAll()
            //alert(ret.msg);
            if (0 === ret.code) {
                Utils.Toastr.Success('成功', ret.msg);
                //$.pjax.reload({container: '#gridview-pjax'});
                window.location.reload();
            } else {
                Utils.Toastr.Error('失败', ret.msg);
            }
        },
        error: function () {
            Utils.Toastr.Error('异常', '系统错误');
        }
    });
    });
});