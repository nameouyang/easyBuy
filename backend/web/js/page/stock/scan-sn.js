

$('#sc_input').keypress(function(event){
    var keynum = (event.keyCode ? event.keyCode : event.which);
    if(keynum == '13'){
        ScanCode();
    }
});


$('#sc_input2').keypress(function(event){
    var keynum = (event.keyCode ? event.keyCode : event.which);
    if(keynum == '13'){
        ScanCode2();
    }
});



var snlists = {};

function ScanCode() {

    var search = $.trim($("#sc_input").val());

    $("#sc_input").val('');
    var layerIndex = layer.load(0, {
        shade: [0.2, '#000']
    });

    var stock_transfer_item_id = $("#stock_transfer_item_id").val();
    $.ajax({
        url: '/mistock/in-out-stock/scan-code',
        type: 'post',
        dataType: 'json',
        data: {'search':search,'type':'1','stock_transfer_item_id':stock_transfer_item_id,'_csrf' : $('#_csrf').val()},
        async:false,
        success: function (ret) {
            if(ret.code == 1){
                if(ret.type == 1){
                    $("#have_num_"+ret.sku).text($("#origin_num_"+ret.sku).text());
                    Utils.Toastr.Success('成功', '扫描成功');
                }else if(ret.type == 2){

                    var sn=ret.sn;
                    var sku=ret.sku;
                    var imei=ret.imei;

                    var num = $("#have_num_"+ret.sku).text();
                    var origin_num = $("#origin_num_"+ret.sku).text();
                    if(num==origin_num){
                        Utils.Toastr.Error('失败', '拣货量不能大于订单数量');
                        return false;
                    }

                    num = parseInt(num)+1;
                    $("#have_num_"+ret.sku).text(num);
                    var info=$("#sn_"+sku).attr("title");
                    info=info+sn+'-'+imei+';';
                    $("#sn_"+sku).attr("title",info);
                    Utils.Toastr.Success('成功', '扫描成功');

                }

            }else {
                Utils.Toastr.Error('失败', ret.msg);
            }
            layer.close(layerIndex);
        }
    })

}




function ScanCode2() {
    var search = $.trim($("#sc_input2").val());
    $("#sc_input2").val('');
    var layerIndex = layer.load(0, {
        shade: [0.2, '#000']
    });

    var stock_transfer_item_id = $("#stock_transfer_item_id").val();
    $.ajax({
        url: '/mistock/in-out-stock/scan-code',
        type: 'post',
        dataType: 'json',
        data: {'search':search,'type':'2','stock_transfer_item_id':stock_transfer_item_id,'_csrf' : $('#_csrf').val()},
        async:false,
        success: function (ret) {
            if(ret.code == 1){
                if(ret.type == 1){
                    $("#have_num2_"+ret.sku).text($("#origin_num2_"+ret.sku).text());
                    Utils.Toastr.Success('成功', '扫描成功');
                }else if(ret.type == 2){
                    var sn=ret.sn;
                    var sku=ret.sku;
                    var imei=ret.imei;
                    var num = $("#have_num2_"+ret.sku).text();
                    var origin_num = $("#origin_num2_"+ret.sku).text();
                    console.log(num);
                    console.log(origin_num);
                    if(num==origin_num){
                        Utils.Toastr.Error('失败', '拣货量不能大于申请数量');
                        return false;
                    }
                    num = parseInt(num)+1;
                    $("#have_num2_"+ret.sku).text(num);
                    var info=$("#sn2_"+sku).attr("title");
                    info=info+sn+'-'+imei+';';
                    $("#sn2_"+sku).attr("title",info);
                    Utils.Toastr.Success('成功', '扫描成功');
                }
            }else {
                Utils.Toastr.Error('失败', ret.msg);
            }
            layer.close(layerIndex);
        }
    })

}





function resetNum(goods_id) {
   //$("#sn_"+goods_id).html('');
    $("#sn_"+goods_id).attr("title",'');
    $("#have_num_"+goods_id).html('0');
}



function resetNum2(goods_id) {
    //$("#sn_"+goods_id).html('');
    $("#sn2_"+goods_id).attr("title",'');
    $("#have_num2_"+goods_id).html('0');
}



$(function () {


    $(document).on('click', '#carry-submit', function () {

        $(this).attr({"disabled":"disabled"});

        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        params = new Object();
        params._csrf = $('#_csrf').val();
        params.stock_transfer_item_id = $("#stock_transfer_item_id").val();

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
            url: '/mistock/in-out-stock/delivery-stock',
            async:false,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (ret) {
                $('#carry-submit').removeAttr("disabled");
                if(0 === ret.code){
                    Utils.Toastr.Success('成功', ret.msg);
                    layer.close(layerIndex);
                    window.location.href = '/mistock/in-out-stock/stock-transfer-apply-search';
                }else{
                    Utils.Toastr.Error('失败', ret.msg);
                    layer.close(layerIndex);
                    $(this).removeAttr("disabled");
                }
            }
        });



    });






    $(document).on('click', '#carry-submit2', function () {

        $(this).attr({"disabled":"disabled"});

        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        params = new Object();
        params._csrf = $('#_csrf').val();
        params.stock_transfer_item_id = $("#stock_transfer_item_id").val();

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
            goods_list.push(goods)
        });
        if(!bol){
            Utils.Toastr.Error('失败', '申请数量跟拣货数量不一致');
            layer.close(layerIndex);
            $('#carry-submit2').removeAttr("disabled");
            return;
        }



        var goods_list2 = new Array();
        var bol2 = true;

        $('.td_goods_id2').each(function () {
            var goods_id =  $(this).text();
            var goods = new Object();

            var origin_num =  $("#origin_num2_"+goods_id).text();
            var have_num =  $("#have_num2_"+goods_id).text();
            if(origin_num != have_num){
                bol2 = false;
                return false;
            }
            goods.goods_id = goods_id;
            goods.sn = $("#sn2_"+goods_id).attr('title');
            goods_list2.push(goods)
        });
        if(!bol2){
            Utils.Toastr.Error('失败', '转出商品的申请数量跟拣货数量不一致');
            layer.close(layerIndex);
            $('#carry-submit2').removeAttr("disabled");
            return;
        }

        params.goods_list2 = goods_list2;
        params.goods_list = goods_list;


        $.ajax({
            cache: false,
            type: "POST",
            data: params,
            url: '/mistock/in-out-stock/delivery-stock',
            async:false,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (ret) {
                $('#carry-submit2').removeAttr("disabled");
                if(0 === ret.code){
                    Utils.Toastr.Success('成功', ret.msg);
                    layer.close(layerIndex);
                    window.location.href = '/mistock/in-out-stock/stock-transfer-apply-search';
                }else{
                    Utils.Toastr.Error('失败', ret.msg);
                    layer.close(layerIndex);
                    $(this).removeAttr("disabled");
                }
            }
        });



    });









});


