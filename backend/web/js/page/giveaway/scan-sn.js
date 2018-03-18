

$('#sc_input').keypress(function(event){
    var keynum = (event.keyCode ? event.keyCode : event.which);
    if(keynum == '13'){
        ScanCode();
    }
});

var snlists = {};

function ScanCode() {

    var search = $.trim($("#sc_input").val());

    $("#sc_input").val('');
    var order_id = $("#order_id").val();
    var layerIndex = layer.load(0, {
        shade: [0.2, '#000']
    });
    $.ajax({
        url: '/giveaway/index/scan-code',
        type: 'post',
        dataType: 'json',
        data: {'search':search,'order_id':order_id,'_csrf' : $('#_csrf').val()},
        async:false,
        success: function (ret) {
            layer.close(layerIndex);
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
                    console.log(num);
                    console.log(origin_num);
                    if(num==origin_num){
                        Utils.Toastr.Error('失败', '拣货量不能大于申请数量');
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
        }
    })

}




function resetNum(goods_id) {
    $("#sn_"+goods_id).attr("title",'');
    $("#have_num_"+goods_id).html('0');
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
            goods_list.push(goods)
        });
        if(!bol){
            Utils.Toastr.Error('失败', '申请数量跟拣货数量不一致');
            layer.close(layerIndex);
            $('#carry-submit').removeAttr("disabled");
            return;
        }

        params.goods_list = goods_list;


        $.ajax({
            cache: false,
            type: "POST",
            data: params,
            url: '/giveaway/index/delivery-giveaway',
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
                    window.location.href = '/giveaway/index/list';
                }else{
                    Utils.Toastr.Error('失败', ret.msg);
                    layer.close(layerIndex);
                    $(this).removeAttr("disabled");
                }
            }
        });



    });




});


