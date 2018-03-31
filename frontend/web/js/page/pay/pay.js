$("#zhifu").click(function () {
    $("#pay_type").removeClass();
    $("#pay_type").addClass('zhifu');

});

$("#alipay_sm").click(function () {
    $("#pay_type").removeClass();
    $("#pay_type").addClass('alipay_sm');

});

$("#cft").click(function () {
    $("#pay_type").removeClass();
    $("#pay_type").addClass('cft');

});

$("#shouji").click(function () {
    $("#pay_type").removeClass();
    $("#pay_type").addClass('shouji');

});

$('#pay-btn').click(function (e) {
    /*txt=$("input").val();
    $.post("ali-pay",{suggest:txt},function(result){
        //alert(result);
        this.target = "_blank";
    });*/
    amount = $('#amount').val(); //金额
    tradeId = $('#trade-id').val();  //订单号
    if (amount == '' || amount == null || amount == undefined) {
        alert('订单金额不正确');
        return;
    }
    if (tradeId == '' || tradeId == null || tradeId == undefined) {
        alert('订单号不正确');
        return;
    }
    //console.log(amount, trade_id);
    $('#payform').submit();
});
