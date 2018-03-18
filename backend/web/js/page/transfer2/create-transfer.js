$(function () {
    categoryTreeVal = '';
    $(document).ready(function() {
        $('#org-list2').hide();
        $('#material-accept-org').hide();
        $('#goods-type-dev').hide();
    });
    $(document).on('change', '#warehouse_select1, #warehouse_select2, #org_select , #org_select2, #goods_type, [name="goodsType"], #type-list', function () {
        var warehouseId = '';
        var orgId = $('#org_select').val();
        var orgId2 = $('#org_select2').val();
        if ($('#type-list').val() == '4'){
            orgId2 = $('#material_accept_org').val();
        }

        $('#war_all_ids_list').hide();
        $('#war_part_ids_list').hide();

        if($('#type-list').val() == '1'){
            $('#war_part_ids_list').show();
            $("#warehouse-list").show();
            $("#warehouse-list").after($("#org-list"));
            $('#warehouse-list #warehouse-label').text('发货机构');
            $('#org-list #org-label').text('收货机构');
            $('#real-stock').show();
            $('#goods-type').show();
            $('#org-list2').hide();
            warehouseId = $('#warehouse_select1').val();
            $('#goods-type-dev').hide();
            $('#material-accept-org').hide();
        }

        if($('#type-list').val() == '2'){
            $('#war_all_ids_list').show();
            $("#warehouse-list").show();
            $("#org-list").after($("#warehouse-list"));
            $('#warehouse-list #warehouse-label').text('收货机构');
            $('#org-list #org-label').text('发货机构');
            $('#real-stock').hide();
            $('#goods-type').hide();
            $('#org-list2').hide();
            warehouseId = $('#warehouse_select2').val();
            $('#goods-type-dev').hide();
        }
        if($('#type-list').val() == '3'){
            $("#warehouse-list").hide();
            $('#org-list #org-label').text('发货机构');
            $('#real-stock').hide();
            $('#goods-type').hide();
            $("#org-list").after($("#org-list2"));
            $('#org-list2').show();
            $(".select2").width('100%');
            $('#goods-type-dev').hide();
            $('#material-accept-org').hide();
        }

        if ($('#type-list').val() == '4'){
            $("#warehouse-list").hide();
            $('#real-stock').hide();
            $('#goods-type').hide();
            $('#org-list2').hide();
            $("#org-list").after($("#material-accept-org"));
            $('#material-accept-org').show();
            $('#goods-type-dev').show();
            $(".select2").width('100%');
            $("#transfer-submit").text('提交');
        }

        if(orgId != 0){
            $.ajax({
                cache: false,
                type: "POST",
                url: '/transfer2/transfer-org-to-warehouse/get-org-add',
                data: 'org=' + orgId,
                error: function (request) {
                },
                success: function (data) {
                    var datas = jQuery.parseJSON(data);
                    var org = $('#org_select').val();
                    $('#org-addr').text('门店地址: '+datas);
                }
            });
        }
        if(orgId2 != 0){
            $.ajax({
                cache: false,
                type: "POST",
                url: '/transfer2/transfer-org-to-warehouse/get-org-add',
                data: 'org=' + orgId2,
                error: function (request) {
                },
                success: function (data) {
                    var datas = jQuery.parseJSON(data);
                    var org = $('#org_select2').val();
                    $('#org-addr2').text('门店地址: '+datas);
                }
            });
        }

        if (orgId == orgId2 && orgId!=0 &&orgId2!=0) {
            Utils.Toastr.Warning('加载失败', '同机构不能调拨');
            return;
        }
        if (warehouseId != '' && orgId != '' && $('#type-list').val() == '1') {//仓到店
            reloadCateTree(warehouseId, orgId, 1);
        }
        else if(warehouseId != '' && orgId != '' && $('#type-list').val() == '2') {//店到仓
            reloadCateTree(warehouseId, orgId, 2);
        }
        else if (orgId != '' && orgId2 != '' && $('#type-list').val() == '3') {//店到店
            reloadCateTree(orgId, orgId2, 3);
        }else if (orgId != '' && $('#type-list').val() == '4') {
            reloadCateTree(orgId, orgId, 4);
        }

    });

    $(document).on('click', '#transfer-submit, #transfer-submit-fb', function () {
        // 数据校验
        if ($("input[name^='quantity']").length == 0) {
            Utils.Toastr.Warning('商品为空', '请添加申请调拨的商品');
            return;
        }
        if($('#type-list').val() == ''){
            Utils.Toastr.Warning('业务类型为空', '请选择业务类型');
            return;
        }

        //调拨单商品行数限制
        if($('#transfer-list tr').size() > 40){
            Utils.Toastr.Warning('调拨单商品不能超过40行');
            return;
        }
        var transfer_type = $('#type-list').val();

        if(transfer_type == 3 && ($('#org_select').val() == $('#org_select2').val())){
            Utils.Toastr.Warning('门店不能相同');
            return;
        }
        var goodsType = $('#goods_type').val();
        if ($('#type-list').val() == '4' && goodsType == ''){
            Utils.Toastr.Warning('物品属性不能为空');
            return;
        }

        var selectedGoods = {};
        var checkPassed = true;
        $("input[name^='quantity']").each(function () {
            var goods_id = $(this).attr('data-sku');
            var quantity = $(this).val();
            if (parseInt(quantity) > parseInt($(this).attr('max'))) {
                Utils.Toastr.Warning('数量错误', goods_id + '本次调拨数量不能超过可调拨数量');
                $(this).focus();
                checkPassed = false;
                return;
            }
            selectedGoods[goods_id] = quantity;
        });

        if (!checkPassed) {
            return;
        }
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var urlToOrg = "/transfer2/transfer/create";
        var urlOrgToOrg = "/transfer2/transfer-org-to-org/create";
        var urlToWarehouse = '/transfer2/transfer-org-to-warehouse/create';
        var urlTransferMaterial = '/transfer2/transfer-material/create';
        var url = '';
        var warehouse = '';
        if(transfer_type == 1){
            url = urlToOrg;
            warehouse = $('#warehouse_select1').val();
        }
        else if(transfer_type == 2){
            url = urlToWarehouse;
            warehouse = $('#warehouse_select2').val();
        }
        else if (transfer_type == 4){
            url = urlTransferMaterial;
        }
        else {
            url = urlOrgToOrg;
        }
        // 店到店，获取收货门店信息
        var toOrg = transfer_type == 3 ?  $('#org_select2').val() :  '';
        $.post(url,
            {
                "selectedGoods": selectedGoods,
                "warehouse": warehouse,
                "org": $('#org_select').val(),
                // "ints": $('#ints_addr_select').val(),
                "remark": $("#remark").val(),
                "toOrg" : toOrg,
                "goodsType": goodsType
            },
            function (data) {
                if (data.code == 0 || data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = '/transfer2/transfer/index';

                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
                layer.close(layerIndex);
            },
            "json");
    });


    function reloadIntsAddr(orgId) {
        $('#ints_addr_select').empty();
        var intsItemHtml = '<option value="">请选择服务商地址（仅限送装一体商品）</option>';
        $.ajax({
            cache: false,
            type: "POST",
            url: '/transfer2/transfer/get-integrated-addr',
            data: 'org=' + orgId,
            error: function (request) {
            },
            success: function (data) {
                var datas = jQuery.parseJSON(data);
                datas.forEach(function (dataItem) {
                    intsItemHtml += '<option value="' + dataItem.id + '">' + dataItem.name + '</option>';
                });
                $('#ints_addr_select').append(intsItemHtml);
                $('#select2-ints_addr_select-container').attr('title', '请选择服务商地址（仅限送装一体商品）')
                $('#select2-ints_addr_select-container').text('请选择服务商地址（仅限送装一体商品）');
            }
        });
    }

    function reloadCateTree(warehouseId, orgId, type)
    {
        categoryTree.destroy();
        $('#transfer-list').empty();
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        //店到店warehouse为发货门店
        var instAddr = $('[name="goodsType"]:checked').val() == 1 ? '-1' : '';
        var goodsType = $('#goods_type').val();
        var urlToOrg = '/transfer2/transfer/get-transfer-goods-nodes';
        var urlOrgToOrg = '/transfer2/transfer-org-to-org/get-transfer-goods-nodes';
        var urlToWarehouse = '/transfer2/transfer-org-to-warehouse/get-transfer-goods-nodes';
        var urlMaterial = '/transfer2/transfer-material/get-transfer-goods-nodes';
        var url = '';
        if(type == 1){
            url = urlToOrg;
        } else if(type == 2){
            url = urlToWarehouse;
        }else if(type == 3) {
            url = urlOrgToOrg;
        }else if (type == 4) {
            url = urlMaterial;
        } else {

        }
        $.ajax({
            type: "POST",
            url: url,
            data: 'warehouse=' + warehouseId + '&org=' + orgId + '&ints=' + instAddr + '&goodsType=' + goodsType,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (data) {
                categoryTreeVal = jQuery.parseJSON(data);
                categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
                layer.close(layerIndex);
                if ($('#org_select').attr('data-t') == 0) {
                    if(type == 3){
                        getCredit(warehouseId);
                    }else　if(type == 4) {

                    } else {
                        getCredit(orgId);
                    }
                }
                if (type == 4){
                    showJMSpCol(true, true);
                }else {
                    showJMSpCol(isJM(orgId), true);
                }

                // autoChecked();
            }
        });

    }

    function isJM(orgId) {
        return orgId.indexOf('JM') == 0;
    }

    function getCredit(orgId)
    {
        $('#div-credit').hide();
        $('#div-credit-to-org').hide();
        if (isJM(orgId)) {
            $.ajax({
                cache: false,
                type: "GET",
                url: '/transfer2/transfer/get-credit',
                data: 'org=' + orgId,
                error: function (request) {
                },
                success: function (data) {
                    var ret = jQuery.parseJSON(data);
                    $('#sp-jm-total').attr('data-price', ret.total);
                    $('#sp-jm-total').html('￥' + ret.total + '元');
                    $('#div-credit').show();
                }
            });
        }
        var toOrgId =$('#org_select2').val();
        if($('#type-list').val() == '3' && isJM(toOrgId)){
            $.ajax({
                cache: false,
                type: "GET",
                url: '/transfer2/transfer/get-credit',
                data: 'org=' + toOrgId,
                error: function (request) {
                },
                success: function (data) {
                    var ret = jQuery.parseJSON(data);
                    $('#sp-jm-total-to-org').attr('data-price', ret.total);
                    $('#sp-jm-total-to-org').html('￥' + ret.total + '元');
                    $('#div-credit-to-org').show();
                }
            });
        }
    }

    function showSb(anTime) {
        if ($("#transfer-submit").isOnScreen(true)) {
            $(".fix-bar").fadeOut(anTime);
        } else {
            $(".fix-bar").fadeIn(anTime);
        }
    }
    showSb(0);
    $(document).on('scroll', window, function () {
        showSb(1000);
    });

    if ($('#org_select').attr('data-t') == 1) {
        var initOrgId = $('#org_select').val();
        getCredit(initOrgId);
        if (!isJM(initOrgId)) {
            showJMSpCol(false, false);
        }
    }
    $.extend({
        categroryTreeAfterFly: function (treeNode, nansItem) {
            var goodsId = nansItem.id;
            var orgId = $('#org_select').val();
            var orgId2 = $('#org_select2').val();
            var isJm = isJM(orgId);
            var isJm2 = isJM(orgId2);
            if($('#type-list').val() == 4){
                showJMSpCol(true, true);
            } else {
                showJMSpCol(isJm || isJm2, false);
            }

            if($('#type-list').val() != '1') {
                $('.real-amount').hide();
            }
            else {
                $('.real-amount').show();
            }
            if ((!isJm && !isJm2) && $('#type-list').val() != '4') {
                return;
            }
            var priceUrl = '/transfer2/transfer/get-goods-real-price';
            if ($('#type-list').val() == '4'){
                priceUrl = '/transfer2/transfer-material/get-goods-real-price';
            }
            $.ajax({
                cache: true,
                type: "POST",
                url: priceUrl,
                data: 'org=' + orgId + '&goods=' + goodsId,
                error: function (request) {
                },
                success: function (data) {
                    var ret = jQuery.parseJSON(data);
                    var price = ret.price;
                    $('#td-tprice-' + goodsId).html('￥0');
                    $('#td-sprice-' + goodsId).html('￥' + price);
                    $('#td-sprice-' + goodsId).attr('data-price', price);
                    var num = $('#td-sprice-' + goodsId).attr('data-num');
                    var totalPrice = math.chain(price).multiply(num).done();
                    $('#td-tprice-' + goodsId).html('￥' + math.round(totalPrice, 2));
                    $('#td-tprice-' + goodsId).attr('data-price', math.round(totalPrice, 2));
                    calTotalPrice();
                }
            });
        },
        categroryTreeAfterUncheck: function (treeNode, nansItem) {
            calTotalPrice();
        }
    });

    $(document).on('input', '.td-n-input', function () {
        var num = $(this).val();
        var goodsId = $(this).attr('data-sku');
        var sPrice = $('#td-sprice-' + goodsId).attr('data-price');
        var totalPrice = math.chain(sPrice).multiply(num).done();
        $('#td-tprice-' + goodsId).html('￥' + math.round(totalPrice, 2));
        $('#td-tprice-' + goodsId).attr('data-price', math.round(totalPrice, 2));
        calTotalPrice();
    });

    $(document).on('click', '.cancel-current', function () {
        if ($('#categoryTreeSearchInput').val() != '') {
            $('#categoryTreeSearchInput').val('');
            $.zTreeResearch();
        }
        categoryTree.checkNode(categoryTree.getNodeByTId($(this).attr('data-zt-tid')), false, true, true);
    });

    function calTotalPrice() {
        var orgId = $('#org_select').val();
        var orgId2 = $('#org_select2').val();
        var isJm = isJM(orgId);
        var isJm2 = isJM(orgId2);
        var totalPrice = math.chain(0.0);
        $('.td-tprice').each(function () {
            var stPrice = $(this).attr('data-price');
            totalPrice = totalPrice.add(stPrice);
        });
        var credit = $('#sp-jm-total').attr('data-price');
        var totalPriceNum = totalPrice.done();
        if($('#type-list').val() == 1){
            var leftPriceNum = math.chain(credit).subtract(totalPriceNum).done();
        }
        else {
            var leftPriceNum = math.chain(credit).add(totalPriceNum).done();
        }
        var leftPriceNumRound = math.round(leftPriceNum, 2);

        if ($('#tr-list-pr-t').length < 1 && isJm ) {
            $('#transfer-list-foot').append('<tr id="tr-list-pr-t"><td colspan="7" class="text-center">总计：<span id="tr-list-pr-t-st">' + math.round(totalPriceNum, 2) + '</span> 元， 剩余可用余额：<span id="tr-list-pr-t-lf">' + leftPriceNumRound + '</span> 元</td></tr>');
        } else {
            $('#tr-list-pr-t-st').html(math.round(totalPriceNum, 2));
            $('#tr-list-pr-t-lf').html(leftPriceNumRound);
        }
        if($('#type-list').val() == 3 && isJm2) {
            var creditToOrg = $('#sp-jm-total-to-org').attr('data-price');
            var leftPriceNumToOrg = math.chain(creditToOrg).subtract(totalPriceNum).done();
            var leftPriceNumRoundToOrg = math.round(leftPriceNumToOrg, 2);
            if ($('#tr-list-pr-t-to-org').length < 1) {
                $('#transfer-list-foot').append('<tr id="tr-list-pr-t-to-org"><td colspan="7" class="text-center">收货门店剩余可用余额：<span id="tr-list-pr-t-lf-to-org">' + leftPriceNumRoundToOrg + '</span> 元</td></tr>');
            }
            else {
                $('#tr-list-pr-t-lf-to-org').html(leftPriceNumRoundToOrg);
            }
            if (leftPriceNumRoundToOrg < 0) {
                $('#tr-list-pr-t-lf-to-org').addClass('text-danger');
            } else {
                $('#tr-list-pr-t-lf-to-org').removeClass('text-danger');
            }
        }
        if (leftPriceNumRound < 0) {
            $('#tr-list-pr-t-lf').addClass('text-danger');
        } else {
            $('#tr-list-pr-t-lf').removeClass('text-danger');
        }
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

    $(document).on('mouseover', '.td-tr-t', function () {
        layer.closeAll();
        var orgId = $('#org_select').val();
        var toOrgId = $('#org_select2').val();
        var goodsId = $(this).closest('td').attr('data-goods-id');
        var warehouseId = '';
        if($('#type-list').val() == 1){
            warehouseId = $("#warehouse-select1").val();
        }
        else if($('#type-list').val() == 2){
            warehouseId = $("#warehouse-select2").val();
        }
        var spanId = $(this).attr('id');
        var title = $(this).attr('data-title');
        var layerIndex = layer.load(1, {
            shade: 0
        });
        var urlToOrg = '/transfer2/stock-org-best/get-goods-more-info';
        var urlToWarehouse = '/transfer2/transfer-org-to-warehouse/get-goods-more-info';
        var urlOrgToOrg = '/transfer2/transfer-org-to-org/get-goods-more-info';
        var dataToOrg = 'orgId=' + orgId + '&goodsId=' + goodsId;
        var dataToWarehouse = 'orgId=' + orgId + '&goodsId=' + goodsId + '&warehouseId=' + warehouseId;
        var dataOrgToOrg = 'orgId=' + orgId + '&goodsId=' + goodsId + '&toOrgId=' + toOrgId;
        var url = '';
        var da = '';
        if($('#type-list').val() == 1){
            url = urlToOrg;
            da = dataToOrg;
        }
        else if($('#type-list').val() == 2){
            url = urlToWarehouse;
            da = dataToWarehouse;
        }
        else {
            url = urlOrgToOrg;
            da = dataOrgToOrg;
        }

        $.ajax({
            type: "GET",
            url: url,
            data: da,
            error: function (request) {
                Utils.Toastr.Error('失败', '对不起，网络错误，请重试！');
            },
            success: function (data) {
                layer.close(layerIndex);
                if (0 == data.code) {
                    layer.tips(title + '<br>' + data.msg, '#' + spanId, {
                        tips: [1, '#3595CC'],
                        time: 8000
                    });
                }
            }
        });

    });

    $(document).on('mouseout', '.td-tr-t', function () {
        layer.closeAll();
    });


    /**
     *
     * 自动下拉选择及勾选功能
     *
     */

    ctConf.ct_show_animation = false;
    var sku = String($('#sub_sku').val());
    var org = String($('#sub_org').val());
    var warehouse = $('#sub_warehouse').val();
    var results = [];

    if (org && warehouse) {
        $('#org_select option').each(function () {
            if ($(this).val() && $(this).val() === org) {
                $(this).attr('selected', 'selected');
                $('#org_select').trigger('change');
            }
        });

        $('#warehouse_select option').each(function () {
            if ($(this).val() && $(this).val() === warehouse) {
                $(this).attr('selected', 'selected');
                $('#warehouse_select').trigger('change');
            }
        });
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
    }

    function getAllNodes(nodes) {
        if (!nodes) {
            return [];
        }
        var childKey = categoryTree.setting.data.key.children;
        for (var i = 0, l = nodes.length; i < l; i++) {
            results.push(nodes[i]);
            getAllNodes(nodes[i][childKey]);
        }
        return results;
    }

});
