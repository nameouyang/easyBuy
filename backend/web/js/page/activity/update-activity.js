$(function () {
    $(document).on('click', '#activity-submit', function (e) {
        e.preventDefault();
        let id = $(this).data('id'); 
        $.post("/activity/coupon-activity/update?id=" + id, $('#activity-form').serialize(),
        function (data) {
            if (data.code == 0) {
                Utils.Toastr.Success('成功', data.msg);
                window.location.href = '/activity/coupon-activity/index';
            } else {
                Utils.Toastr.Error('失败', data.msg);
            }
        },
        "json");
    });

    displayOrgRatio();
    $(document).on('change', 'input[name="org_scope"]', function (e) {
        displayOrgRatio();
    });

    displayTypeSet();
    $(document).on('change', 'input[name="type"]', function (e) {
        displayTypeSet();
        displayCouponPeriod();
    });

    displayCouponPeriod();
    $(document).on('change', 'input[name="period_type"]', function (e) {
        displayCouponPeriod();
    });

    function displayTypeSet()
    {
        if (parseInt($('input[name="type"]:checked').val()) == 1) {
            $('#bargain_goods').hide();
            $('#include_goods').show();
            $('#exclude_goods').show();
            $('#quantity').show();
            $('#amount').show();
            $('#coupon_id').show();
            $('#send_type').hide();
            $('#quantity_limit').hide();
            $('#gift_skus').hide();
            $('#gift_skus-table').hide();
            $('#gift_type').hide();
            $('#pool').hide();
            $('#limit-buy').hide();
            $('#limit-sold').hide();
            $('#include_batch').hide();
            $('#level').hide();
            $('#exclusive').hide();
        } else if (parseInt($('input[name="type"]:checked').val()) == 2){
            $('#bargain_goods').hide();
            $('#include_goods').show();
            $('#exclude_goods').hide();
            $('#quantity').hide();
            $('#amount').hide();
            $('#coupon_id').hide();
            $('#send_type').hide();
            $('#quantity_limit').hide();
            $('#gift_skus').show();
            $('#gift_skus-table').show();
            $('#gift_type').hide();
            $('#pool').hide();
            $('#limit-buy').show();
            $('#limit-sold').show();
            $('#include_batch').hide();
            $('#level').show();
            $('#exclusive').show();
        } else if (parseInt($('input[name="type"]:checked').val()) == 3){
            $('#bargain_goods').hide();
            $('#include_goods').hide();
            $('#exclude_goods').hide();
            $('#quantity').hide();
            $('#amount').hide();
            $('#coupon_id').show();
            $('#send_type').show();
            $('#quantity_limit').hide();
            $('#gift_skus').hide();
            $('#gift_skus-table').hide();
            $('#gift_type').hide();
            $('#pool').show();
            $('#limit-buy').hide();
            $('#limit-sold').hide();
            $('#include_batch').hide();
            $('#level').hide();
            $('#exclusive').hide();
        } else if (parseInt($('input[name="type"]:checked').val()) == 4){
            $('#bargain_goods').show();
            $('#include_goods').show();
            $('#exclude_goods').show();
            $('#quantity').hide();
            $('#amount').show();
            $('#coupon_id').hide();
            $('#send_type').hide();
            $('#quantity_limit').show();
            $('#gift_skus').hide();
            $('#gift_skus-table').hide();
            $('#gift_type').hide();
            $('#pool').hide();
            $('#limit-buy').hide();
            $('#limit-sold').hide();
            $('#include_batch').hide();
            $('#level').hide();
            $('#exclusive').hide();
        }else if (parseInt($('input[name="type"]:checked').val()) == 6){
            $('#bargain_goods').hide();
            $('#exclude_goods').show();
            $('#include_goods').hide();
            $('#quantity').hide();
            $('#amount').show();
            $('#coupon_id').hide();
            $('#send_type').hide();
            $('#quantity_limit').show();
            $('#gift_skus').show();
            $('#gift_skus-table').show();
            $('#gift_type').hide();
            $('#pool').hide();
            $('#limit-buy').hide();
            $('#limit-sold').hide();
            $('#include_batch').hide();
            $('#level').hide();
            $('#exclusive').hide();
        }else if (parseInt($('input[name="type"]:checked').val()) == 7){
            $('#bargain_goods').hide();
            $('#exclude_goods').hide();
            $('#include_goods').hide();
            $('#quantity').hide();
            $('#amount').hide();
            $('#coupon_id').hide();
            $('#send_type').hide();
            $('#quantity_limit').hide();
            $('#gift_skus').hide();
            $('#gift_skus-table').hide();
            $('#gift_type').hide();
            $('#pool').hide();
            $('#limit-buy').show();
            $('#limit-sold').show();
            $('#include_batch').show();
            $('#level').hide();
            $('#exclusive').hide();
        }
        // $('#org_scope label').each(function() {
        //     if ($(this).find('input').val() == 1 || $(this).find('input').val() == 3) {
        //         $(this).hide();
        //     }
        // });
    }

    function displayOrgRatio()
    {
        if (parseInt($('input[name="org_scope"]:checked').val()) == 4) {
            $('#org').show();
        } else {
            $('#org').hide();
        }
    }

    function displayCouponPeriod()
    {

        var typeVal = parseInt($('input[name="type"]:checked').val());
        $('#level').hide();
        if (typeVal == 2 || typeVal == 4 || typeVal == 6 || typeVal == 7) {
            $('#period_type').hide();
            $('#period_start').hide();
            $('#period_end').hide();
            $('#valid_for').hide();
            if(typeVal==2){
                $('#level').show();
            }
            if(typeVal==7){
                $('#include_batch').show();
            }else{
                $('#include_batch').hide();
            }
            if(typeVal == 2 || typeVal == 7){
                $('#limit-buy').show();
                $('#limit-sold').show();
            }else{
                $('#limit-buy').hide();
                $('#limit-sold').hide();
            }
        } else {
            $('#period_type').show();
            $('#limit-buy').hide();
            $('#limit-sold').hide();
            $('#include_batch').hide();
            if (parseInt($('input[name="period_type"]:checked').val()) == 1) {
                $('#period_start').show();
                $('#period_end').show();
                $('#valid_for').hide();
            } else {
                $('#period_start').hide();
                $('#period_end').hide();
                $('#valid_for').show();
            }
        }
    }

    $(document).on('click', '#add-gift-group', function (e) {
        let skus = $('#gift-goods').val();
        let index = $(".gift-tr").last().data('index');
        if (!index) {
            index = 0;
        };
        index++;

        // 清空商品输入框
        $('#gift-goods').select2("val", "");

        if (skus) {
            $('#gift-box').append('<tr class="gift-tr" id="li-' + index + '" data-index="' + index + '"><td><input type="hidden" name="gift_skus[' + index + ']" value="' + skus + '"/>' + skus 
                + '</td><td><button class="btn btn-icon white btn-icon-sm remove-goods" data-index="' + index + '"type="button"><i class="fa fa-minus"></i></button></td>><tr>');
        }
    });

    $(document).on('click', ".remove-goods", function (e) {
        let index = $(this).data('index');
        $(this).parents('#li-' + index).remove();
    });

    let activityId= $('#activity-submit').data('id');
    if (activityId) {
        $.post({
            url: '/activity/coupon-activity/get-gift?id=' + activityId,
            dataType: 'json',
            success: function (ret) {
                console.log(ret);
                if (ret.code === 0) {
                    for (let x in ret.data) {
                        let index = parseInt(x) + 1; 
                        $('#gift-box').append('<tr class="gift-tr" id="li-' + index + '" data-index="' + index + '"><td><input type="hidden" name="gift_skus[' + index + ']" value="' + ret.data[x] + '"/>' + ret.data[x] 
                            + '</td><td><button class="btn btn-icon white btn-icon-sm remove-goods" data-index="' + index + '"type="button"><i class="fa fa-minus"></i></button></td>><tr>');
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Utils.Toastr.Error('异常', '系统错误:' + textStatus);
            }
        });  
    }

});
