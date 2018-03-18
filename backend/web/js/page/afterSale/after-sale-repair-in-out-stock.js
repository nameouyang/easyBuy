$(function(){

    $('body').on('hidden.bs.modal', '.modal', function () {
        $('#input-imei').blur();
        $('#input-imei')[0].blur();
        $(document).off('click', "#btn-imei-add");
        $(document).off('keydown', '#input-imei');
        $(document).off('submit', '#aftersale-transfer-scan');
        $(document).off('click', "a.glyphicon-trash");
        $(this).removeData("bs.modal");
        $("#m-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });

    $('body').on('shown.bs.modal', '.modal', function () {
        $('#input-imei').focus();
    });

    //提交按钮
    $("#inout-stock").click(function () {
        var orderNo = $("input[name=order-no]").val();
        var orgId = $("input[name=org-id]").val();
        var inStockGoodsArr = new Array();
        var outStockGoodsArr = new Array();

        var $inTrRow = $('tr.in-stock');
        var $outTrRow = $('tr.out-stock');
        $inTrRow.each(function () {
            var inStockGoods = new Object();
            inStockGoods.goodsId = $("input[name=in-stock-sku]").first().val();
            inStockGoods.sn = $("input[name=in-stock-sn]").first().val();
            inStockGoods.imei = $("input[name=in-stock-imei]").first().val();
            inStockGoods.price = $("input[name=goods-price]").first().val();
            inStockGoods.quantity = $("input[name=in-stock-quantity]").first().val();
            inStockGoodsArr.push(inStockGoods);
        });
        $outTrRow.each(function () {
            var outStockGoods = new Object();
            outStockGoods.isSerial = $("input[name=exc-is-serial]").first().val();
            outStockGoods.goodsId = $("input[name=out-stock-sku]").first().val();
            outStockGoods.sn = $("input[name=out-stock-sn]").first().val();
            outStockGoods.imei = $("input[name=out-stock-imei]").first().val();
            outStockGoods.quantity = $("input[name=out-stock-quantity]").first().val();
            outStockGoods.orgItemsId = $("input[name=org-items-id]").first().val();
            outStockGoods.orgGoodsId = $("input[name=org-sku]").first().val();
            outStockGoods.goodsName = $("input[name=out-stock-goods-name]").first().val();
            outStockGoods.orgPrice = $("input[name=goods-price]").first().val();
            outStockGoods.orgSn = $("input[name=org-sn]").first().val();
            outStockGoods.orgImei = $("input[name=org-imei]").first().val();
            if ( (outStockGoods.isSerial==='YES' || outStockGoods.isSerial==='Y')
                && (outStockGoods.sn==='' || outStockGoods.sn===null || outStockGoods.sn===undefined)
                && (outStockGoods.imei==='' || outStockGoods.imei===null || outStockGoods.imei===undefined) ){
                Utils.Toastr.Info('提示', '请扫描串号');
                return false;
            }
            outStockGoodsArr.push(outStockGoods);
        });
        $(this).attr('disabled', 'disabled');
        $.post("/aftersale/repair/in-out-stock",
            {
                order_no: orderNo,
                org_id: orgId,
                in_stock_goods: inStockGoodsArr,
                out_stock_goods: outStockGoodsArr
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','出入库成功');
                    window.location.href = '/aftersale/repair/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    setTimeout(function () {
                        $("#inout-stock").attr('disabled', false);
                    },2000);
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    setTimeout(function () {
                        $("#inout-stock").attr('disabled', false);
                    },2000);
                    Utils.Toastr.Error('失败','出入库失败');
                    //self.location.reload();
                }
            }
        );

    });

    $.extend({
        initThirdPlugins: function () {
            $(document).on('submit', '#aftersale-stock-scan', function () {
                return false;
            });
            $(document).on('keydown', '#input-imei', function (event) {
                if ($(this).attr('data-ta') == 0 && event.keyCode == 13) {
                    $('#btn-imei-add').click();
                    return;
                }
            });
            $(document).on('click', '#btn-imei-add', function () {
                var imei = $("#input-imei").val();
                $.post("/aftersale/repair/scan",
                    {
                        query: imei,
                        goods_id: $("#goods-id").val(),
                        org_id: $("#org-id").val()
                    },
                    function (result) {
                        if (result.code == 200) {
                            $("input[name=out-stock-sn]").val(result.data.sn);
                            $("input[name=out-stock-imei]").val(result.data.imei);
                            $("button.close").trigger('click');
                            Utils.Toastr.Success('成功', '扫描成功');
                        } else if (result.code == 10001 || result.code == 10002) {
                            Utils.Toastr.Info('提示', result.msg);
                        } else {
                            Utils.Toastr.Error('失败', '扫描失败');
                        }
                    }, "json");
            });

        }
    });


});