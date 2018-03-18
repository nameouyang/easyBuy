
$(function () {

    //checkbox 全选框
    $("#rep_id_all").click(function () {
        var $brothers = $('input.has-value-selected');
        if (this.checked){
            $brothers.each(function () {
                if($(this).checked==false || $(this).checked==undefined){
                    $(this).trigger('click');
                    $(this).attr('checked', 'checked');
                    $(this).addClass('has-checked');
                }
            });
        }else{
            $brothers.removeAttr('checked');
            $brothers.removeClass('has-checked');
        }
    });

    //checkbox 选框
    $('input.has-value-selected').click(function () {
        var hasValue = $(this).hasClass('has-checked');
        if (hasValue){
            $(this).removeClass('has-checked');
        }else{
            $(this).addClass('has-checked');
        }
    });

    //提交按钮
    $("#create").click(function () {

        var sendOrgId = $("#send_org_id").val();
        var sendOrgName = $("#send_org_id").find("option:selected").text();
        var goodsType = $("select[name=goods_type]").val();
        var sendWarehouseType = $("select[name=send_warehouse_type]").val();
        var title = $("input[name=title]").val();
        var goodsArr = new Array();

        var $trRow = $('tr.tr_row');
        var flag = 0;

        $trRow.each(function () {
            var goods =  new Object();
            var stockNum = $(this).find('input[name=stock-num]').first().val();
            goods.sku  = $(this).find('input[name=sku]').first().val();
            goods.name = $(this).find('input[name=goods_name]').first().val();
            goods.price  = $(this).find('input[name=price]').first().val();
            goods.app_quantity  = $(this).find('input[name=apply_quantity]').first().val();
            if (parseInt(goods.app_quantity) <= 0){
                Utils.Toastr.Info('提示', goods.sku + '返库数量不能为零');
                flag = 1;
                return false;
            }
            if (parseInt(goods.app_quantity) > parseInt(stockNum)){
                Utils.Toastr.Info('提示', goods.sku + '返库数量不能大于当前库存数量');
                flag = 1;
                return false;
            }
            goods.unit_id  = $(this).find('input[name=unit_id]').first().val();
            goodsArr.push(goods);
        });
        if (sendOrgId == ''){
            Utils.Toastr.Info('提示',　'请选择发货机构');
            return false;
        }

        if(flag){
            return false;
        }
        layer.confirm('您选择的发货机构是:'+sendOrgName, {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            $("#create").attr('disabled', 'disabled');
            postCreateTransfer(sendOrgId, goodsType, goodsArr, sendWarehouseType, title, title);
            layer.close(index);
        });

    });
    
    function postCreateTransfer(sendOrgId, goodsType, goodsItem, sendWarehouseType, title, desc) {
        $.post("/aftersale/transfer/create",
            {
                goods_type: goodsType,
                send_warehouse_type: sendWarehouseType,
                title: title,
                desc: desc,
                goods_item: goodsItem,
                send_org_id: sendOrgId
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','创建成功');
                    window.location.href = '/aftersale/transfer/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                    setTimeout(function () {
                        $("#create").attr('disabled', false);
                    },3000);
                }else{
                    Utils.Toastr.Error('失败','创建失败');
                    setTimeout(function () {
                        $("#create").attr('disabled', false);
                    },3000);
                    //self.location.reload();
                }
            }
        );
    }

    //添加商品
    $("#add-goods").click(function () {
        var sendWarehouseType = $("select[name=send_warehouse_type]").val();
        var searchSku = $('input[name=search-sku]').val();
        var sendOrgId = $("#send_org_id").val();
        if(sendWarehouseType=='' || sendWarehouseType==null || sendWarehouseType==undefined || sendWarehouseType==false){
            Utils.Toastr.Info('提示', '请选择发货库');
            return false;
        }
        if (searchSku=='' || searchSku==null || searchSku==undefined || searchSku==false){
            Utils.Toastr.Info('提示', '请输入要搜索的SKU');
            return false;
        }
        if (sendOrgId == ''){
            Utils.Toastr.Info('提示',　'请选择发货机构');
            return false;
        }

        $.post("/aftersale/transfer/get-goods-list",
            {
                send_warehouse_type: sendWarehouseType,
                sku: searchSku,
                org_id: sendOrgId
            },
            function(result){
                if ( result.code == 200 ){
                    var goods = result.data;
                    var findKey = "input.has-value-" + goods.sku;
                    var hasAppend = $("tr.tr_row").find(findKey);
                    if(hasAppend.length>0){
                        Utils.Toastr.Info('提示', searchSku+'已在列表中');
                        return false;
                    }

                    var html = '<tr data-key="' + goods.sku + '" class="tr_row">';
                    html += '<td class="text-center">' + goods.sku + '<input type="hidden" class="has-value-' + goods.sku + '" name="sku" value="' + goods.sku + '"/>';
                    html += '</td>';
                    html += '<td class="name-21">' + goods.name + '<input type="hidden" name="goods_name" value="' + goods.name + '"/>';
                    html += '</td>';
                    html += '<td class="text-center">' + goods.price + '<input type="hidden" name="price" value="' + goods.price + '"/>';
                    html += '</td>';
                    html += '<td class="text-center">' + goods.stock_num + '<input type="hidden" name="stock-num" value="' + goods.stock_num + '"/>';
                    html += '</td>';
                    html += '<td class="text-center" style="width: 10%;">';
                    html += '<input min="0" max="'+ goods.stock_num +'" name="apply_quantity" class="md-input m-a-0 p-a-0 litter-height text-center td-n-input" data-sku="' + goods.sku + '" value="0" type="number" />';
                    html += '<td> <a title="删除"> <span class="glyphicon glyphicon-trash"></span></a></td>';
                    html += '<td><input type="hidden" name="unit_id" value="' + goods.unit_id + '"/></td></tr>';
                    $("#goods_data").append(html);
                }else if( result.code == 10001 || result.code == 10002 ){
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    Utils.Toastr.Error('失败','查询失败');
                }
            });
    });

    //发货
    $("#delivery").click(function () {
        var orderNo = $('input[name=order_no]').val();
        var deliveryId = $('#delivery_company').val();
        var deliveryNo = $('input[name=delivery_no]').val();

        var sender = $('#p11').val();
        var sendTel = $('#p12').val();
        var sendAddress = $('#p13').val();

        var accepter = $('#p21').val();
        var acceptTel = $('#p22').val();
        var acceptAddress = $('#p23').val();

        var deliveryPackage = $('input[name=delivery_package]').val();

        if(deliveryId=='' || deliveryId==null || deliveryId==undefined || deliveryId==false){
            Utils.Toastr.Info('提示', '请选择快递');
            return false;
        }

        if(deliveryId == 'sf' && deliveryPackage == ''){
            Utils.Toastr.Info('提示', '请填写快递包裹数');
            return false;
        }


        if(deliveryId == 'sf' && sender == ''){
            Utils.Toastr.Info('提示', '寄件人不能为空');
            return false;
        }
        if(deliveryId == 'sf' && sendTel == ''){
            Utils.Toastr.Info('提示', '寄件电话不能为空');
            return false;
        }
        if(deliveryId == 'sf' && sendAddress == ''){
            Utils.Toastr.Info('提示', '寄件地址不能为空');
            return false;
        }


        if(deliveryId == 'sf' && accepter == ''){
            Utils.Toastr.Info('提示', '收件人不能为空');
            return false;
        }
        if(deliveryId == 'sf' && acceptTel == ''){
            Utils.Toastr.Info('提示', '收件电话不能为空');
            return false;
        }
        if(deliveryId == 'sf' && acceptAddress == ''){
            Utils.Toastr.Info('提示', '收件地址不能为空');
            return false;
        }


        if (deliveryId == 'ems' && deliveryNo == ''){
            Utils.Toastr.Info('提示', '请填写快递单号');
            return false;
        }

        $(this).attr('disabled', 'disabled');
        $.post("/aftersale/transfer/delivery",
            {
                order_no: orderNo,
                delivery_id: deliveryId,
                delivery_no: deliveryNo,
                delivery_package: deliveryPackage,
                sender: sender,
                send_tel: sendTel,
                send_address: sendAddress,
                accepter: accepter,
                accept_tel: acceptTel,
                accept_address: acceptAddress
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','发货成功');
                    window.location.href = '/aftersale/transfer/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    $('#delivery').attr('disabled', false);
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    $('#delivery').attr('disabled', false);
                    Utils.Toastr.Error('失败','发货失败');
                    //self.location.reload();
                }
            });
    });

    //关闭工单
    $("#close-order").click(function () {
        var orderNo = $('input[name=order_no]').val();
        $(this).attr('disabled', 'disabled');
        $.post("/aftersale/transfer/close-order",
            {
                order_no: orderNo
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','关闭成功');
                    window.location.href = '/aftersale/transfer/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    $('#close-order').attr('disabled', false);
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    $('#close-order').attr('disabled', false);
                    Utils.Toastr.Error('失败','关闭失败');
                }
            });
    });

    //签收工单
    $("#sign-order").click(function () {
        var orderNo = $('input[name=order_no]').val();
        $(this).attr('disabled', 'disabled');
        $.post("/aftersale/transfer/sign",
            {
                order_no: orderNo
            },
            function(result){
                if ( result.code == 200 ){
                    Utils.Toastr.Success('成功','签收成功');
                    window.location.href = '/aftersale/transfer/index';
                }else if( result.code == 10001 || result.code == 10002 ){
                    $('#close-order').attr('disabled', false);
                    Utils.Toastr.Info('提示', result.msg);
                }else{
                    $('#close-order').attr('disabled', false);
                    Utils.Toastr.Error('失败','签收失败');
                }
            });
    });


    //删除框
    $("#goods_data").on('click', 'span.glyphicon-trash', function () {
        var childrens = $(this).children('tr.tr_row');
        if (childrens.length<1){
            $("#accept-org-type").val('');
            $("#transfer_type").attr('disabled', false);
        }
        var pTr = $(this).parent().parent().parent("tr.tr_row");
        pTr.remove();

    });

    //快递判断
    $('#delivery_company').change(function(){
        if($(this).val() == 'ems'){
            $('#delivery-detail').hide();
            $('#delivery_no').show();
        }else {
            if ($(this).val() == 'sf'){
                $('#delivery_no').hide();
                $('#p31').val('顺丰');
            }else{
                $('#p31').val('');
            }
            $('#delivery-detail').show();
        }

    });


});