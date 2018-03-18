$(function () {
    categoryTreeVal = '';

    if($('#org_select').val()){
        var orgId = $('#org_select').val();
        reloadCateTree(orgId);
    }

    $(document).on('change', '#org_select', function () {
        var orgId = $('#org_select').val();
        reloadCateTree(orgId);
    });

    $(document).on('click', '#transfer-submit, #transfer-submit-fb', function () {
        // 数据校验
        if ($("input[name^='quantity']").length == 0) {
            Utils.Toastr.Warning('商品为空', '请添加要修改陈列库存的商品');
            return;
        }

        var selectedGoods = {};
        var checkPassed = true;
        $("input[name^='quantity']").each(function () {
            var goods_id = $(this).attr('data-sku');
            var quantity = $(this).val();
            if (parseInt(quantity) < 0) {
                Utils.Toastr.Warning('sku '+goods_id+' 陈列库数量错误');
                $(this).focus();
                checkPassed = false;
                return;
            }
            if (parseInt(quantity) > parseInt($(this).attr('max'))) {
                Utils.Toastr.Warning('数量错误', goods_id + '陈列库存数不能超过30');
                $(this).focus();
                checkPassed = false;
                return;
            }
            selectedGoods[goods_id] = quantity;
        });
        console.log(selectedGoods);

        // return;
        if (!checkPassed) {
            return;
        }
        // var layerIndex = layer.load(0, {
        //     shade: [0.2, '#000']
        // });
        $.post("/transfer2/stock-org-display/create",
                {
                    "selectedGoods": selectedGoods,
                    "org": $('#org_select').val(),
                },
        function (data) {
            if (data.code == 0) {
                Utils.Toastr.Success('成功', data.msg);
                window.location.href = '/transfer2/stock-org-display/index';
            } else {
                Utils.Toastr.Error('失败', data.msg);
            }
            // layer.close(layerIndex);
        },
                "json");

    });


    function reloadCateTree(orgId)
    {
        categoryTree.destroy();
        $('#transfer-list').empty();
        // var layerIndex = layer.load(0, {
        //     shade: [0.2, '#000']
        // });
        $.ajax({
            cache: false,
            type: "POST",
            url: '/transfer2/stock-org-display/get-transfer-goods-nodes',
            data: '&org=' + orgId,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                // layer.close(layerIndex);
            },
            success: function (data) {
                categoryTreeVal = jQuery.parseJSON(data);
                categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
                // layer.close(layerIndex);
                if ($('#org_select').attr('data-t') == 0) {
                    getCredit(orgId);
                }
                showJMSpCol(isJM(orgId), true);
                //autoChecked();
            }
        });

    }

    function isJM(orgId) {
        return orgId.indexOf('JM') == 0;
    }

    function getCredit(orgId)
    {
        $('#div-credit').hide();
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
    }

    function showSb(anTime) {
        if ($("#transfer-submit").isOnScreen(true)) {
            $(".fix-bar").fadeOut(anTime);
        } else {
            $(".fix-bar").fadeIn(anTime);
        }
    }

    $(document).on('click', '.cancel-current', function () {
        if ($('#categoryTreeSearchInput').val() != '') {
            $('#categoryTreeSearchInput').val('');
            $.zTreeResearch();
        }
        categoryTree.checkNode(categoryTree.getNodeByTId($(this).attr('data-zt-tid')), false, true, true);
    });

    function calTotalPrice() {
        var totalPrice = math.chain(0.0);
        $('.td-tprice').each(function () {
            var stPrice = $(this).attr('data-price');
            totalPrice = totalPrice.add(stPrice);
        });
        var credit = $('#sp-jm-total').attr('data-price');
        var totalPriceNum = totalPrice.done();
        var leftPriceNum = math.chain(credit).subtract(totalPriceNum).done();
        var leftPriceNumRound = math.round(leftPriceNum, 2);

        if ($('#tr-list-pr-t').length < 1) {
            $('#transfer-list-foot').append('<tr id="tr-list-pr-t"><td colspan="7" class="text-center">总计：<span id="tr-list-pr-t-st">' + math.round(totalPriceNum, 2) + '</span> 元， 剩余可用余额：<span id="tr-list-pr-t-lf">' + leftPriceNumRound + '</span> 元</td></tr>');
        } else {
            $('#tr-list-pr-t-st').html(math.round(totalPriceNum, 2));
            $('#tr-list-pr-t-lf').html(leftPriceNumRound);
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
