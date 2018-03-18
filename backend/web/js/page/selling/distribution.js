function ScanCode() {

    var search = $.trim($("#sc_input").val());
    var id = $("#order_id").val();
    $.ajax({
        url: '/selling/carry/scan-code',
        type: 'post',
        dataType: 'json',
        data: {'search':search,'id':id,'_csrf' : $('#_csrf').val()},
        async:false,
        success: function (ret) {
            if(ret.code == 1){
                if(ret.type == 1){
                    $("#have_num_"+ret.sku).text($("#origin_num_"+ret.sku).text());
                }else if(ret.type == 2){
                    var num = $("#have_num_"+ret.sku).text();
                    num = parseInt(num)+1;
                    $("#have_num_"+ret.sku).text(num);
                    var sn = $("#sn_"+ret.sku).attr('title');
                    sn += ret.sn+',';
                    $("#sn_"+ret.sku).attr('title',sn);
                    var imei = $("#imei_"+ret.sku).attr('title');
                    imei += ret.imei+',';
                    $("#imei_"+ret.sku).attr('title',imei);
                }
                $("#sc_input").val('');
            }else {
                Utils.Toastr.Error('失败', ret.msg);
            }
        }
    })

}

function resetNum(goods_id) {
    $("#have_num_"+goods_id).text('0');
    $("#sn_"+goods_id).attr('title','');
    $("#imei_"+goods_id).attr('title','');
}


$(function () {
    $(document).on('click', '#carry-submit', function () {

        $(this).attr({"disabled":"disabled"});

        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        params = new Object();
        params._csrf = $('#_csrf').val();
        params.order_id = $("#order_id").val();

        var goods_list = new Array();
        var bol = true;

        $('.td_goods_id').each(function () {
            var goods_id =  $(this).text();
            var goods = new Object();

            var origin_num =  $("#origin_num_"+goods_id).text();
            var have_num =  $("#have_num_"+goods_id).text();
            if(origin_num != have_num){
                bol = false;
                return false;
            }
            goods.goods_id = goods_id;
            goods.sn = $("#sn_"+goods_id).attr('title');
            goods.imei = $("#imei_"+goods_id).attr('title');
            goods_list.push(goods)
        });
        if(!bol){
            Utils.Toastr.Error('失败', '订单数量跟拣货数量不一致');
            layer.close(layerIndex);
            $('#carry-submit').removeAttr("disabled");
            return;
        }

        params.goods_list = goods_list;


        $.ajax({
            cache: false,
            type: "POST",
            data: params,
            url: '/selling/carry/delivery-store',
            async:false,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (ret) {
                $('#carry-submit').removeAttr("disabled");
                if(0 === ret.code){
                    //Utils.Toastr.Success('成功', ret.msg);
                    window.location.href = '/selling/carry/index';
                }else{
                    Utils.Toastr.Error('失败', ret.msg);
                    layer.close(layerIndex);
                    $(this).removeAttr("disabled");
                }

            }
        });

    });

});


