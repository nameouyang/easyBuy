/**
 * Created by wangchongshan@xiaomi.com on 17-5-10.
 */

$(function () {
    $(document).on('click', '.switchStatusButton', function (req) {

        var status = $(req.target).attr('status');
        var id = $(req.target).attr('id');
        $.ajax({
            cache: true,
            type: "POST",
            url: '/cms/article/switch-status',
            data: 'id='+ id + '&status=' + status,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    $(req.target).parent().children().toggleClass('primary');

                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '修改通告状态失败');
                    self.location.reload();
                }
            }
        });

    });

    $(document).on('click', '.typeSwitchStatusButton', function (req) {
        var status = $(req.target).attr('status');
        var id = $(req.target).attr('id');
        $.ajax({
            cache: true,
            type: "POST",
            url: '/cms/article/type-switch-status',
            data: 'id='+ id + '&status=' + status,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    $(req.target).parent().children().toggleClass('primary');

                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '修改通告类型状态失败');
                    self.location.reload();
                }
            }
        });

    });

});

