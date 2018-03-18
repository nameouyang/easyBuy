/**
 * Created by liupingli@xiaomi.com on 18-1-22.
 */

$(function () {


    var skuList= [];
    $(document).on('change', '#reduce-goods', function (e) {
        $(this).attr('disabled',true);
        let sku = $('#reduce-goods').val();
        if($.inArray(sku, skuList) !== -1){
            Utils.Toastr.Info('查询失败', '此活动中存在多条同一SKU申请，请修改核对后提交。');
            $(this).attr('disabled',false);
            return false;
        }
        if (sku) {
            $.post({
                url: '/giveaway/giveawayset/get-goods-info',
                data: {sku:sku},
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 0) {
                        $('#goodsPrice').val(ret.data.price);

                    } else {
                        Utils.Toastr.Info('查询失败', ret.msg);
                    }
                    $('#reduce-goods').attr('disabled',false);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误:' + textStatus);
                    $('#reduce-goods').attr('disabled',false);
                }
            });
        }
    });

    //添加调拨商品的js
    $(document).on('click', '#goods-create', function () {
        $.ajax({
            cache: true,
            type: "POST",
            url: '/giveaway/giveawayset/create',
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
    $(document).on('click', '#goods-create-tvs', function () {

            let bigV = $('#headquartersValue').val();
            let littleV = $('#regionValue').val();
            if (bigV && littleV ) {
                if (parseInt(littleV) > parseInt(bigV)) {
                    Utils.Toastr.Error('区域阈值不能大于总部阈值');
                    return false;
                }
            }

            $.ajax({
            cache: true,
            type: "POST",
            url: '/giveaway/giveawayset/create-tvs',
            data: $('#goodsCreateTvs-form').serialize(),

            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', '设置额度成功');
                    self.location.reload();
                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '设置额度失败');
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

