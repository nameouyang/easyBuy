/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function () {

    $(document).on('click', '.switchStatusButton', function (req) {

        var productId = $(req.target).attr("productId");
        var status = $(req.target).attr('status');

        $.ajax({
            cache: true,
            type: "POST",
            url: '/product/switch-status',
            data: 'productId='+ productId + '&status=' + status,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', '修改商品信息成功');
                    $(req.target).parent().children().toggleClass('primary');

                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '修改商品信息失败');
                    self.location.reload();
                }
            }
        });

    });

});

