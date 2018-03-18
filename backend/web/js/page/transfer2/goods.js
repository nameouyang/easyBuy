/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function () {

    //添加调拨商品的js
    $(document).on('click', '#goods-create', function () {
        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer2/goods/create',
            data: $('#goodsCreate-form').serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                self.location.reload();
            },
            success: function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', '修改商品信息成功');
                    self.location.reload();
                } else if (data.code == 10001 || data.code == 10005 || data.code == 10002) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10004) {
                    Utils.Toastr.Error('失败', '修改商品信息失败');
                    self.location.reload();
                }
            }
        });

    });


    //修改调拨商品信息的js
    $(document).on('click', '#goods-update', function () {
        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer2/goods/update',
            data: $('#goodsUpdate-form').serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', '修改商品信息成功');
                    self.location.reload();
                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '修改商品信息失败');
                    self.location.reload();
                }
            }
        });

    });

    $("input[name='batchBtn']").on('click', function ()
    {
        if ($("input[name='goods_id[]']:checked").length < 1)
        {
            //Utils.Toastr.Info('提示', "请选择商品");
            //return;
        }
    });
    
    //修改调拨商品信息的js
    $(document).on('click', '#goods-batch-change-cate', function () {
        var postData = "";
        $("input[name='goods_id[]']:checked").each(function () {
            postData += "goods_id[]=" + this.value + "&"
        }
        );
        if (postData == '')
        {
            Utils.Toastr.Info('提示', "请选择需要修改的商品");
            return;
        }
        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer2/goods/batch-change-cate',
            data: $('#goods-batch-change-cate-form').serialize() + "&" + postData,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', '修改商品信息成功');
                    self.location.reload();
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

