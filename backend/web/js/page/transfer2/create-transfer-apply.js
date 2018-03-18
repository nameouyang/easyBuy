$(function () {
    function showSb(anTime) {
        if ($("#transfer-auto-apply-submit").isOnScreen(true)) {
            $(".fix-bar").fadeOut(anTime);
        } else {
            $(".fix-bar").fadeIn(anTime);
        }
    }

    $(document).on('mouseover', '.stock-amount-cell', function () {
        layer.closeAll();
        var orgId = $(this).attr('data-org-id');
        var goodsId = $(this).attr('data-goods-id');
        var contentId = $(this).attr('id');
        var layerIndex = layer.load(1, {
            shade: 0
        });
        $.ajax({
            type: "GET",
            url: '/transfer2/stock-org-best/get-assigned-stock-real-detail',
            data: 'orgId=' + orgId + '&goodsId=' + goodsId,
            error: function (request) {
                Utils.Toastr.Error('失败', '对不起，网络错误，请重试！');
            },
            success: function (data) {
                layer.close(layerIndex);
                if (0 == data.code) {
                    if(data.msg){
                        layer.tips(data.msg, '#' + contentId, {
                            tips: [1, '#3595CC'],
                            time: 4000
                        });
                    }
                }
            }
        });
    });

    $(document).on('scroll', window, function () {
        showSb(1000);
    });

    $(document).on('input', '.td-n-input', function () {
        var num = $(this).val();
        var goodsId = $(this).attr('data-sku');
        var sPrice = $('#td-sprice-' + goodsId).attr('data-price');
        var totalPrice = math.chain(sPrice).multiply(num).done();

        //如果金额小于1则行颜色至灰
        if (totalPrice < 1) {
            $(this).parent().parent().css('background', '#ABABAB');
        } else {
            $(this).parent().parent().css('background', '');
        }

        $('#td-tprice-' + goodsId).html('￥' + totalPrice.toFixed(2));
        $('#td-tprice-' + goodsId).attr('data-price', totalPrice.toFixed(2));
        calTotalPrice();
    });

    function calTotalPrice() {
        var totalPrice = math.chain(0.0);
        $('.td-tprice').each(function () {
            var stPrice = $(this).attr('data-price');
            totalPrice = totalPrice.add(stPrice);
        });
        var totalPriceNum = totalPrice.done();
        //var credit = $('#sp-jm-total').attr('data-price');
        //var leftPriceNum = math.chain(credit).subtract(totalPriceNum).done();
        //var leftPriceNumRound = math.round(leftPriceNum, 2);
        //$('#transfer-list-foot').append('<tr id="tr-list-pr-t"><td colspan="7" class="text-center">总计：<span id="tr-list-pr-t-st">' + math.round(totalPriceNum, 2) + '</span> 元， 剩余可用余额：<span id="tr-list-pr-t-lf">' + leftPriceNumRound + '</span> 元</td></tr>');
        $('#transfer-list-foot').empty();
        if($('#is_franchisee').val() == '1'){
            var price = $('#is_franchisee').attr('price');
            $('#transfer-list-foot').append('<tr id="tr-list-pr-t"><td colspan="10" class="text-left"><b>总计：<span id="tr-list-pr-t-st">￥' + totalPriceNum.toFixed(2) + '</span> 元 &nbsp;&nbsp; 剩余: ￥'+ (price - totalPriceNum.toFixed(2)).toFixed(2) +' 元</b></td></tr>');
        }else{
            $('#transfer-list-foot').append('<tr id="tr-list-pr-t"><td colspan="10" class="text-left"><b>总计：<span id="tr-list-pr-t-st">￥' + totalPriceNum.toFixed(2) + '</span> 元 </b></td></tr>');
        }
        $('#org_total_price').val(totalPriceNum.toFixed(2));
    }

    function transferAmountCheck() {
        var checkLine = 0;
        $('.md-input').each(function () {
            if ($(this).val() < 1) {
                checkLine++;
                $(this).parent().parent().css('background', '#ABABAB');
            }
        });
        return checkLine;
    }

    //拒绝调拨申请单
    $(document).on('click', '#transfer-auto-apply-reject-submit', function () {
        layer.confirm('确认拒绝调拨申请单?', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            $.post({
                    url: '/transfer2/transfer-auto-apply/audit-reject',
                    data: $('#transfer-auto-apply-form').serialize(),
                    dataType: 'json',
                    success: function (ret) {
                        console.log(ret);
                        if (ret.code === 200) {
                            alert('调拨申请单已驳回！如需补货，请使用补货申请！');
                            window.location.href = '/transfer2/transfer-auto-apply/index';
                        } else {
                            Utils.Toastr.Info(ret.msg, ret.data);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        Utils.Toastr.Error('异常', '系统错误:' + textStatus);
                    }
                }
            );
        }, function () {
            layer.close();
        });
    });

    //提交调拨申请单
    $(document).on('click', '#transfer-auto-apply-submit, #transfer-auto-apply-submit-fb', function () {
        var checkLine = transferAmountCheck();
        var html = checkLine ? '当前有 ' + checkLine + ' 件商品调拨数量为 0 ,确认提交申请单?' : '确认提交申请单?';

        layer.confirm(html, {
            btn: ['确认', '取消'] //按钮
        }, function () {
            layer.closeAll('dialog');
            var auto_apply_submit = $('#transfer-auto-apply-submit');
            var auto_apply_submit_fb = $('#transfer-auto-apply-submit-fb');
            auto_apply_submit.attr('disabled', true);
            auto_apply_submit_fb.attr('disabled', true);

            var apply_id = $('#apply_id').val();

            $.post({
                url: '/transfer2/transfer-auto-apply/audit',
                data: $('#transfer-auto-apply-form').serialize(),
                dataType: 'json',
                success: function (ret) {
                    console.log(ret);
                    if (ret.code === 200) {
                        window.location.href = '/transfer2/transfer-auto-apply/view?apply_id=' + apply_id;
                    } else {
                        layer.close();
                        auto_apply_submit.attr('disabled', false);
                        auto_apply_submit_fb.attr('disabled', false);
                        //layer.msg(ret.msg, {icon: 2});
                        Utils.Toastr.Error(ret.msg, ret.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    auto_apply_submit.attr('disabled', false);
                    auto_apply_submit_fb.attr('disabled', false);
                    //layer.msg('系统错误'+textStatus, {icon: 2});
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            });

        }, function () {
            layer.close();
        });
    });


    //初始化
    transferAmountCheck();
    showSb(0);
    calTotalPrice();
});
