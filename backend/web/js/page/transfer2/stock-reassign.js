$(function () {
    $(document).on('click', '#load-stock', function () {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.ajax({
            type: "POST",
            url: $('#common-ajax-form').attr('action'),
            data: $('#common-ajax-form').serialize() + '&show_stock=1',
            error: function (request) {
                Utils.Toastr.Error('失败', '对不起，网络错误，请重试！');
            },
            success: function (data) {
                $('#reassign-list').empty();
                if (0 == data.code) {
                    var stockList = $.parseJSON(data.msg);
                    var stockListHtml = '';
                    stockList.forEach(function (stockInfo) {
                        stockListHtml += '<tr><td class="text-right">' + stockInfo.goods_id
                                + '</td><td class="text-left">' + stockInfo.goods_name
                                + '</td><td class="text-left">' + stockInfo.warehouse_name
                                + '</td><td class="text-right">' + stockInfo.amount
                                + '</td><td class="text-right"><input type="number" min="0" max="' + stockInfo.amount
                                + '" name="quantity[' + stockInfo.goods_id
                                + '][' + stockInfo.warehouse_id + ']" class="md-input m-a-0 p-a-0 litter-height text-center" data-sku="{' + stockInfo.goods_id
                                + '}" value="0"/>'
                                + '</td></tr>';
                    })
                    $('#reassign-list').html(stockListHtml);
                    layer.close(layerIndex);
                } else if (data.code > 0) {
                    Utils.Toastr.Info('提示', data.msg);
                    layer.close(layerIndex);

                } else
                {
                    Utils.Toastr.Error('失败', data.msg);
                    layer.close(layerIndex);
                }
            }
        });

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