$(function () {

    $('#back-btn').on('click', function () {
        window.history.back();
    });

    $.extend({
        commonAjaxSubmitBefore: function () {
            $('#common-ajax-submit-btn').attr("disabled", true);
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
        },
        commonAjaxSubmitAfter: function (data) {
            layer.closeAll();
        }
    });
});

