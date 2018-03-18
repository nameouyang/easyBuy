$(function () {

    $(document).on('click', '#create-couponThanksGivingDistribute', function () {

        $.ajax({
            cache: false,
            type: "POST",
            url: '/activity/coupon-thanks-giving/send',
            data: $('#couponThanksGivingDistribute-form').serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code == 10113 || data.code == 10114  || data.code == 10112) {
                    Utils.Toastr.Info('错误', '错误信息：' + data.msg);
                }
                if (data.alert != "") {
                    setTimeout(function () {
                        $('#error_div').css('display', 'block');
                        $("#error_title").html('<span class="text-danger"><strong>错误信息</strong><span>');
                        $('#error_content').html(data.alert);
                    }, 1000);
                } else {
                    $('#error_div').css('display', 'none');
                }

                $('#search-couponThanksGivingList').click();
            }
        });

    });
    
    $(document).on('click', '#search-couponThanksGivingList', function () {
        $.ajax({
            cache: false,
            type: "GET",
            url: '/activity/coupon-thanks-giving/list',
            data: $('#couponThanksGivingDistribute-form').serialize(),
            dataType: 'html',
            success: function (data) {
                if(data.code == 10114){
                    Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg + '<br/>' + data.data);
                }else {
                    $('.list-content').html(data);
                }
            }
        });

    });

    $(document).on('click', '#create-couponDistribute', function () {

        $.ajax({
            cache: false,
            type: "POST",
            url: $('#couponDistribute-form').attr('action'),
            data: $('#couponDistribute-form').serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    if (data.msg == "\u63a5\u6536\u6210\u529f") {
                        Utils.Toastr.Success('成功', data.msg + '<br/>' + '成功发放' + data.amount + '张');
                    } else {
                        Utils.Toastr.Info('错误', '错误信息：' + data.msg);
                    }

                    $("#coupondistribute-activity_id").val(0);
                    $("#select2-coupondistribute-activity_id-container").html('请选择活动编号');
                    $("#coupondistribute-customer_id").val("");
                    $("#coupondistribute-from_order_id").val("");
                    $("#coupondistribute-remark").val("");
                    $("#coupondistribute-reissue").prop("checked", false);

                }
                else {
                    Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg + '<br/>' + data.data);
                }
                if (data.alert != "") {
                    setTimeout(function () {
                        $('#error_div').css('display', 'block');
                        $("#error_title").html('<span class="text-danger"><strong>错误信息</strong><span>');
                        $('#error_content').html(data.alert);
                    }, 1000);
                } else {
                    $('#error_div').css('display', 'none');
                }
            }
        });

    });

    $(document).on('click', '#create-couponMultiDistribute', function () {

        $.ajax({
            cache: false,
            type: "POST",
            url: $('#couponMultiDistribute-form').attr('action'),
            data: $('#couponMultiDistribute-form').serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Info('提示', data.msg);
                    $("#couponMultiDistribute-select").val(0);
                    $(".select2-selection__rendered").html('请选择活动编号');
                    $("#couponMultiDistribute-coupon_info").val("");
                    $("#couponMultiDistribute-remark").val("");
                    $("#couponMultiDistribute-amount").val(1);
                    $("#couponMultiDistribute-reissue").prop("checked", false);
                    if (data.alert != "") {
                        setTimeout(function () {
                            $('#multi-error_div').css('display', 'block');
                            $("#multi-error_title").html('<span class="text-danger"><strong>错误信息</strong><span>');
                            $('#multi-error_content').html("");
                            for (var i = 0; i < data.alert.length; i++) {
                                $('#multi-error_content').append(data.alert[i] + '<br/>');
                            }
                        }, 1000);
                    } else {
                        $('#multi-error_div').css('display', 'none');
                    }
                }
                else {
                    var repeatInfo = "";
                    for(var i in data.data) {//不使用过滤
                        repeatInfo += (parseInt(i)+1) + ":" + data.data[i]+ '<br/>';
                    }
                    Utils.Toastr.Info('错误：' + data.code, data.msg + '<br/>' + repeatInfo);
                }
            }
        });
    });
    $(document).on('click','#cancel-couponDistribute',function(){
        $("#coupondistribute-activity_id").val(0);
        $("#select2-coupondistribute-activity_id-container").html('请选择活动编号');
        $("#coupondistribute-customer_id").val("");
        $("#coupondistribute-from_order_id").val("");
        $("#coupondistribute-remark").val("");
        $("#coupondistribute-reissue").prop("checked",false);
        $(".help-block").html("");
        $(".form-group").removeClass("has-error");
        $('#error_div').css('display', 'none');
    });
    $(document).on('click','#cancel-couponMultiDistribute',function(){
        $("#couponMultiDistribute-select").val(0);
        $(".select2-selection__rendered").html('请选择活动编号');
        $("#couponMultiDistribute-coupon_info").val("");
        $("#couponMultiDistribute-remark").val("");
        $("#couponMultiDistribute-amount").val(1);
        $("#couponMultiDistribute-reissue").prop("checked", false);
        $(".help-block").html("");
        $(".form-group").removeClass("has-error");
        $('#multi-error_div').css('display', 'none');
    });
});
