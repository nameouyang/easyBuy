$(function () {
    $(document).on('mouseover', '.stock-amount-cell', function () {
        layer.closeAll();
        var orgId = $(this).attr('data-org-id');
        var goodsId = $(this).attr('data-goods-id');
        var contentId = $(this).attr('id');
        var layerIndex = layer.load(1, {
            shade: 0
        });
        $.ajax({
            type: "GET",
            url: '/transfer2/stock-org-best/get-assigned-stock-detail',
            data: 'orgId=' + orgId + '&goodsId=' + goodsId,
            error: function (request) {
                Utils.Toastr.Error('失败', '对不起，网络错误，请重试！');
            },
            success: function (data) {
                layer.close(layerIndex);
                if (0 == data.code) {
                    layer.tips(data.msg, '#' + contentId, {
                        tips: [1, '#3595CC'],
                        time: 4000
                    });
                }
            }
        });
    });

    //固定表头
    $('.table thead tr').css({'display':'block','position': 'relative'});
    $('.table thead tr th').css({'display':'block','float':'left'});
    $('.table tbody').css({'display':'block','overflow':'auto','height':'500px'});
    $('.table tbody tr').css({'text-align': 'center','display': 'block','position': 'relative'});
});