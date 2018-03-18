$(function () {
    displayOrgRatio();
    $(document).on('change', 'input[name="org_scope"]', function (e) {
        displayOrgRatio();
    });

    displayTypeSet();
    $(document).on('change', 'input[name="type"]', function (e) {
        displayTypeSet();
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
});
