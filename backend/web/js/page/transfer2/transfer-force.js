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
            var failedListObj = data.data;
            $('.force-tr-task').each(function () {
                var dataTaskProp = $(this).attr('data-task-key');
                if (dataTaskProp in failedListObj) {
                    if (isNaN(parseInt(failedListObj[dataTaskProp])))
                    {
                        $(this).html('<span class="label rounded danger">' + failedListObj[dataTaskProp] + '</span>');
                    } else {
                        $(this).next("td").html(failedListObj[dataTaskProp]);
                        $(this).html('<span class="label rounded success">已创建</span>');
                    }
                }
            });
            layer.closeAll();
        }
    });

});

