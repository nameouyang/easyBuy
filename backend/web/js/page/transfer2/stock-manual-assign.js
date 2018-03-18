$(function () {
    if ($('#lack-stock-div').length > 0) {

        layer.open({
            type: 1,
            title: '缺货提示',
            area: ['800px', '500px'],
            content: $('#lack-stock-div').html()
        });


    }
    $('#back-btn').on('click', function () {
        window.history.back();
    });

    $.extend({
        commonAjaxSubmitBefore: function () {
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
        },
        commonAjaxSubmitAfter: function () {
            layer.closeAll();
        }
    });

});

