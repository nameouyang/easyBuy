$('.waite_pay').click(function (e) {
    //e.preventDefault();
    $('.waite_pay').css('color', 'red')
})

$('.waite_send').click(function (e) {
    //e.preventDefault();
    $('.waite_send').css('color', 'red')
})

$('.waite_receive').click(function (e) {
    //e.preventDefault();
    $('.waite_receive').css('color', 'red')
})

$('.waite_evaluate').click(function (e) {
    //e.preventDefault();
    $('.waite_evaluate').css('color', 'red')
})


$("#search_btn").click(function(){
    if (jQuery("#sn").val()) {
        location.href = '?sn=' + jQuery("#sn").val();
    }
});
$("#selectStatus").change(function(){
    location.href = '?status=' + jQuery("#selectStatus").val();
});
$(".order-cancel").click(function(){
    var link = $(this).data('link');
    $.get(link, function(data, status) {
        if (status == "success") {
            //location.reload()

        }
    });
});
$(".order-delete").click(function(){
    var link = $(this).data('link');
    $.get(link, function(data, status) {
        if (status == "success") {
            alert('成功删除订单');
            location.reload()
        }
    });
});
