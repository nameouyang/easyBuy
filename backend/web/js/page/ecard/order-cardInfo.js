/**
 * Created by chenguidong on 16-12-22.
 */

$(function () {
    $(".nav-item").click(function () {
        $(this).siblings().each(function () {
            $($(this).children('a').attr('data-target')).each(function () {
                $(this).css({"display":"none"});
            });
        });
        $($(this).children('a').attr('data-target')).each(function () {
            $(this).css({"display":"block"});
        });
        $(this).siblings().each(function () {
            $('.nav-item .nav-link[data-target="'+$(this).children('a').attr('data-target')+'"]').each(function () {
                $(this).removeClass('active')
            });
        });
        $('.nav-item .nav-link[data-target="'+$(this).children('a').attr('data-target')+'"]').each(function () {
            $(this).addClass('active')
        });
    });

    $(".order-card-search").on("click","button[type=submit]",function (e) {
        e.preventDefault();
        $(".order-card-search form input[name=orderId]").val($.trim($(".order-card-search form input[name=orderId]").val()));
        $(".order-card-search form").submit();
    })
});

