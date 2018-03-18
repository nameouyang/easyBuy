/**
 * Created by hanlu1@xiaomi.com on 16-11-3.
 */

function userStatus(e, status)
{
    var uid = $(this).attr('uid');
    var userstatus = status ? 1 : 0;
        $.ajax({
            cache: false,
            type: "POST",
            url: '/user/activate',
            data: 'uid=' + uid + '&status=' + userstatus,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', data.msg);
                    self.location.reload();
                }
            }
        });
}
