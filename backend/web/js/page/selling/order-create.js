function areaList(obj) {
    $.ajaxSettings.async = false;
    $area = $(obj).parents('.mi_location').find('.area');
    var optHtml = "<option vaule='-1'>请选择街道</option>";
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    if(re.test($(obj).val())){
        $.post("/address/get-child-region?id=" + $(obj).val(), function (data) {
            for (var key in data.data) {
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
        });
    }
    $area.html(optHtml);
    $area.addClass("option:first").prop("selected", 'selected');
    $area.trigger('change.select2');
}

function districtList(obj) {
    $.ajaxSettings.async = false;
    $district = $(obj).parents('.mi_location').find('.district');
    var optHtml = "<option vaule='-1'>请选择地区</option>";
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    if(re.test($(obj).val())){
        $.post("/address/get-child-region?id=" + $(obj).val(), function (data) {
            for (var key in data.data) {
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
        });
    }
    $district.html(optHtml);
    $district.addClass("option:first").prop("selected", 'selected');
    $district.trigger('change.select2');
}

function cityList(obj) {
    $.ajaxSettings.async = false;
    $city = $(obj).parents('.mi_location').find('.city');
    var optHtml = "<option value='-1'>请选择城市</option>";
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    if(re.test($(obj).val())){
        $.post("/address/get-child-region?id=" + $(obj).val(), function (data) {
            for (var key in data.data) {
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
        });
    }
    $city.html(optHtml);
    $city.addClass("option:first").prop("selected", 'selected');
    $city.trigger('change.select2');
}

function selectCustomer(obj) {
    $contact = $('.contact_purchase');
    $address = $('.contact_receipt');
    $invoice_address = $('.contact_invoice');
    $contact.html('');
    $address.html('');
    $.get("get-customer-info?id=" + $(obj).val(), function (data) {
        if (data.data.purchase_contacts) {
            var contactHtml = "<option value='-1'>请选择联系方式</option>";
            for (var key in data.data.purchase_contacts) {
                contactHtml += "<option value=" + data.data.purchase_contacts[key]['id'] + ">" + data.data.purchase_contacts[key]['info'] + "</option>";
            }
            $contact.html(contactHtml);
        }
        if (data.data.receipt_contacts) {
            var addressHtml = "<option value='-1'>请选择地址</option>";
            for (var key in data.data.receipt_contacts) {
                addressHtml += "<option value=" + data.data.receipt_contacts[key]['id'] + ">" + data.data.receipt_contacts[key]['info'] + "</option>";
            }
            $address.html(addressHtml);
        }
        if (data.data.invoice_contacts) {
            var addressHtml = "<option value='-1'>请选择地址</option>";
            for (var key in data.data.invoice_contacts) {
                addressHtml += "<option value=" + data.data.invoice_contacts[key]['id'] + ">" + data.data.invoice_contacts[key]['info'] + "</option>";
            }
            $invoice_address.html(addressHtml);
        }
        $('#invoice_title').val(data.data.cusinfo.name);
        $('#tax_num').val(data.data.cusinfo.tax_id);
        $('#regist_address').val(data.data.cusinfo.registered_address);
        $('#regist_tel').val(data.data.cusinfo.registered_telephone);
        $('#regist_bank_name').val(data.data.cusinfo.bank_name);
        $('#regist_bank_id').val(data.data.cusinfo.bank_account);
        $('#contract_no_hidden').val(data.data.contract_no);
        $('#contract_no').val(data.data.contract_no);

    });


    var shipment_type = $('#shipment_type').val();
    if(shipment_type && shipment_type != undefined){
        getGroupGoods(shipment_type);
    }
}

function selectContact(obj, index) {
    var obj_new = $('.contact' + index);
    $.get("get-contact-info?id=" + $(obj).val(), function (data) {
        if (data.data) {
            obj_new.find('.contact_name').val(data.data['user_name']);
            obj_new.find('.contact_tel').val(data.data['mobile']);
            obj_new.find('.contact_email').val(data.data['email']);
            if(index > 1){
                var address_new = $('.address' + index);
                $province = $(".address" + index + " .province");
                $city = $(".address" + index + " .city");
                $district = $(".address" + index + " .district");
                $area = $(".address" + index + " .area");
                $.ajaxSettings.async = false;
                $province.val(data.data.province)
                $province.trigger("change.select2");
                $city.val(data.data.city);
                $city.trigger("change.select2");
                $district.val(data.data.district);
                $district.trigger("change.select2");
                $area.val(data.data.area);
                $area.trigger("change.select2");
                address_new.find('.address-detail').val(data.data['address']);
                address_new.find('.zip-code').val(data.data['zip_code']);
            }
        }
    });
}

function selectShipment(obj) {
    var shipment_type = $('#shipment_type').val();
    if(shipment_type == 3){
        $('.warhouse').show();
    }else{
        $('.warhouse').hide();
    }
    getGroupGoods(shipment_type);
    calTotalPrice();
}

function selectAddress(obj, index) {
    var obj_new = $('.address' + index);
    $province = $(".address" + index + " .province");
    $city = $(".address" + index + " .city");
    $district = $(".address" + index + " .district");
    $area = $(".address" + index + " .area");
    $.get("get-address-info?id=" + $(obj).val() + '&index=' + index, function (data) {
        if (data.data) {
            $.ajaxSettings.async = false;
            $province.val(data.data.province)
            $province.trigger("change.select2");
            $city.val(data.data.city);
            $city.trigger("change.select2");
            $district.val(data.data.district);
            $district.trigger("change.select2");
            $area.val(data.data.area);
            $area.trigger("change.select2");
            obj_new.find('.address-detail').val(data.data['address']);
            obj_new.find('.zip-code').val(data.data['zip_code']);
        }
    });
}

function showJMSpCol(show, firstShow) {
    if (show) {
        if (firstShow && $('#transfer-list-foot').length > 0) {
            $('#transfer-list-foot').empty();
        }
        $('.tpl-nd-hide').show();
    } else {
        $('.tpl-nd-hide').hide();
    }

}

function autoChecked() {
    sku = sku.split(',');
    results = getAllNodes(categoryTree.getNodes());
    if (sku && results) {
        $.each(results, function (k, v) {
            if ($.inArray(String(v.id), sku) >= 0) {
                categoryTree.checkNode(v, true, true, true);
            }
        });
    }
    calTotalPrice();
}

function getGroupGoods(type) {

   var customer_id = $("#customer").val();

   if(!customer_id){
       Utils.Toastr.Error('提醒', '请优先选择客户');
       return;
   }
    $('#transfer-list').empty();
    $.ajax({
        cache: false,
        type: "GET",
        url: '/selling/group-order/get-group-goods-nodes?type='+type+'&customer_id='+customer_id,
        error: function (request) {
            Utils.Toastr.Error('失败', '网络错误');
            layer.close(layerIndex);
        },
        success: function (data) {
            categoryTreeVal = jQuery.parseJSON(data);
            categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
            $('#categoryTreeSearchInput').unbind();
        }
    });
}

function calTotalPrice() {
    var totalNum = 0;
    var totalGoodsPrice = 0;
    var totalFreight = 0;
    var totalPrice = 0;
    $('.td-tprice').each(function () {
        var goodsId = $(this).parent().find("td").first().attr('data-goods-id');
        var num = parseInt($('#quantity-' + goodsId).val());
        var apply_price = $('#apply_price-' + goodsId).val();
        var freight = $('#freight-' + goodsId).text();
        totalNum += num;
        totalGoodsPrice = math.round(totalGoodsPrice + math.round(num * apply_price, 2), 2);
        totalFreight = math.round(totalFreight + math.round(num * freight, 2), 2);
    });
    totalPrice = totalGoodsPrice + totalFreight;
    var optHtml = '<tr id="tr-list-pr-t"><td colspan="7" class="text-center">共选择' + '<font style="color: red">' + totalNum + '</font> ';
    optHtml += '件商品&nbsp&nbsp&nbsp&nbsp商品金额:' + '<font style="color: red">' + totalGoodsPrice + '</font> ' + '元';
    optHtml += '&nbsp&nbsp&nbsp&nbsp配送费:' + '<font style="color: red">' + totalFreight + '</font> '
    optHtml += '元&nbsp&nbsp&nbsp&nbsp应付金额:' + '<font style="color: red">' + totalPrice + '</font> ' + '元';
    $('#transfer-list-foot').html(optHtml);
}

function change_price(obj) { //活动价

    var activity_id = obj.value;
    var goodsId = $(obj).parent().parent().find("td").first().attr('data-goods-id');
    var shipment_type = $("#shipment_type").val();
    if(activity_id > 0 && (shipment_type == 1)){
        var freight = $('#freight-' + goodsId).text();
        $.ajax({
            url: '/selling/group-order/get-activity-freight',
            type: 'post',
            dataType: 'json',
            data: 'activity_id='+activity_id+'&goods_id='+goodsId,
            async:false,
            success: function (msg) {
                $('#freight-' + goodsId).text(msg);
            }
        })
        calTotalPrice();
    }else {

        if(shipment_type == 1){ //取运费去
            $.ajax({
                url: '/selling/group-order/get-goods-freight',
                type: 'post',
                dataType: 'json',
                data: 'goods_id='+goodsId,
                async:false,
                success: function (msg) {
                    $('#freight-' + goodsId).text(msg);
                }
            })
            calTotalPrice();
        }

    }


}

$(function () {
    if($('#shipment_type').val() !=='' ){
        getGroupGoods($('#shipment_type').val());
    }
    $(document).on('click', '.cancel-current', function () {
        if ($('#categoryTreeSearchInput').val() != '') {
            $('#categoryTreeSearchInput').val('');
            $.zTreeResearch();
        }
        categoryTree.checkNode(categoryTree.getNodeByTId($(this).attr('data-zt-tid')), false, true, true);
        calTotalPrice();
    });
    $(document).on('input', '.td-n-input', function () {
        calTotalPrice();
    });

    $(".radio_contract").change(function () {
        var contract_type = $('input:radio[name="contract_type"]:checked').val();
        if (contract_type == 1) {
            $('#contract_no').attr("readonly","readonly");
            $('#contract_no').val($('#contract_no_hidden').val());
        } else {
            $('#contract_no').removeAttr("readonly");
            $('#contract_no').val('');
        }
    });

    $(".radio_invoice").change(function () {
        var invoice_type = $('input:radio[name="invoice_type"]:checked').val();
        if (invoice_type == 2) {
            $('.invoice-info').show();
        } else {
            $('.invoice-info').hide();
        }
    });

    $.extend({
        categroryTreeAfterFly: function (treeNode, nansItem) {
            calTotalPrice();
        },
        categroryTreeAfterUncheck: function (treeNode, nansItem) {
            calTotalPrice();
        }
    });

    $(document).on('click', '#group-order-submit', function () {
        $(this).attr({"disabled":"disabled"});
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        params = new Object();
        params.customer_id = $('#customer').val();
        params.customer_name = $('#customer').find("option:selected").text();
        params.shipment_type = $('#shipment_type').val();
        params.warehouse_id = $('#warehouse_id').val();
        params.order_confirm_name = $('#order_confirm_name').val();
        params.order_confirm_tel = $('#order_confirm_tel').val();
        params.order_confirm_email = $('#order_confirm_email').val();
        params.consignee_name = $('#consignee_name').val();
        params.consignee_tel = $('#consignee_tel').val();
        params.email = $('#email').val();
        params.order_province = $('#order_province').val();
        params.order_city = $('#order_city').val();
        params.order_district = $('#order_district').val();
        params.order_area = $('#order_area').val();
        params.address = $('#address').val();
        params.zipcode = $('#zipcode').val();
        params.invoice_type = $('input:radio[name="invoice_type"]:checked').val();
        params.invoice_title = $('#invoice_title').val();
        params.tax_num = $('#tax_num').val();
        params.regist_address = $('#regist_address').val();
        params.regist_tel = $('#regist_tel').val();
        params.regist_bank_name = $('#regist_bank_name').val();
        params.regist_bank_id = $('#regist_bank_id').val();
        params.invoice_consignee_name = $('#invoice_consignee_name').val();
        params.invoice_consignee_tel = $('#invoice_consignee_tel').val();
        params.invoice_email = $('#invoice_email').val();
        params.invoice_province = $('#invoice_province').val();
        params.invoice_city = $('#invoice_city').val();
        params.invoice_district = $('#invoice_district').val();
        params.invoice_area = $('#invoice_area').val();
        params.invoice_address = $('#invoice_address').val();
        params.invoice_zipcode = $('#invoice_zipcode').val();
        params.contract_type = $('input:radio[name="contract_type"]:checked').val();
        params.contract_no = $('#contract_no').val();
        params.contract_proof = $('#contract_proof').val();
        params.remark = $('#remark').val();
        var goods_list = new Array();
        $('.td-tprice').each(function () {
            var goodsId = $(this).parent().find("td").first().attr('data-goods-id');
            var quantity = parseInt($('#quantity-' + goodsId).val());
            var apply_price = $('#apply_price-' + goodsId).val();
            var freight = $('#freight-' + goodsId).text();
            var origin_price = $('#origin_price-' + goodsId).text();
            var activity_id = $('#activity-' + goodsId).val();
            var goods = new Object();
            goods.goods_id = goodsId;
            goods.quantity = quantity;
            goods.apply_price = apply_price;
            goods.origin_price = origin_price;
            goods.shipment_expense = freight;
            goods.activity_id = activity_id;
            goods_list.push(goods)
        });
        params.goods_list = goods_list;
        $.ajax({
            cache: false,
            type: "POST",
            data: params,
            url: '/selling/group-order/create',
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (ret) {
                $('#group-order-submit').removeAttr("disabled");
                if(0 === ret.code){
                    Utils.Toastr.Success('成功', ret.msg);
                    window.history.go(-1);
                    window.location.href = document.referrer;//返回上一页并刷新
                }else{
                    Utils.Toastr.Error('失败', ret.msg);
                    layer.close(layerIndex);
                    $(this).removeAttr("disabled");
                }

            }
        });
    });

});


