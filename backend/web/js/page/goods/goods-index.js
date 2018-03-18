/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function () {

    $(document).on('click', '.switchStatusButton', function (req) {

        var sku = $(req.target).attr("sku");
        var status = $(req.target).attr('status');

        $.ajax({
            cache: true,
            type: "POST",
            url: '/goods/switch-status',
            data: 'sku='+ sku + '&status=' + status,
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
                    Utils.Toastr.Error('失败', '修改商品信息失败');
                    self.location.reload();
                }
            }
        });

    });

    $(document).on('click', '.switchMallButton', function (req) {

        var sku = $(req.target).attr("sku");
        var status = $(req.target).attr('status');

        $.ajax({
            cache: true,
            type: "POST",
            url: '/goods/switch-mall',
            data: 'sku='+ sku + '&status=' + status,
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
                    Utils.Toastr.Error('失败', '修改商品信息失败');
                    self.location.reload();
                }
            }
        });

    });

    //同步商品配送信息和保险信息
    $(document).on('click', '.syncProduct', function (req) {
        var sku = $(this).attr("sku");
        req.preventDefault();
        $.ajax({
            cache : true,
            type  : "POST",
            url   : $(this).attr('data-url'),
            data: 'sku='+ sku,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                } else if (data.code == 10001) {
                    Utils.Toastr.Error('提示', data.msg);
                }
            }
        });

    });

});

