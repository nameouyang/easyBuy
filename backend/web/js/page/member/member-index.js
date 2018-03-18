/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function () {
    $.extend({
        initThirdPlugins: function () {
            if ($('.date').length > 0) {
                $('.date').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    locale: 'zh-cn'
                });
            }
        }
    });

    $(document).on('click', '.switchStatusButton', function (req) {

        var id = $(req.target).attr("id");
        var status = $(req.target).attr('status');
        $.ajax({
            cache: true,
            type: "POST",
            url: '/member/member-tag/switch-status',
            data: 'id='+ id + '&status=' + status,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    //$(req.target).parent().children().toggleClass('primary');
                    window.location.reload();
                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '修改状态失败');
                    self.location.reload();
                }
            }
        });

    });

});

