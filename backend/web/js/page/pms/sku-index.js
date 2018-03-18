/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function () {

    $(document).on('click', '.switchStatusButton', function (event) {

        var data = $(event.target).data();
        console.log(data);
        $.ajax({
            cache: true,
            type: "POST",
            url: '/pms/sku/change-sale-status',
            data: data,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    $(event.target).parent().children().toggleClass('primary');
                } else {
                    Utils.Toastr.Info('提示', data.msg);
                }
            }
        });

    });

});

