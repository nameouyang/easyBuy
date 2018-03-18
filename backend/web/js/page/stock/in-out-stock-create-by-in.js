/**
 * Created by zhangxiaolong on 17/12/26.
 */
$(function () {
    categoryTreeVal = '';
    $(document).on('change', '#unit_type', function () {

        reloadCateTree();

    });



    $(document).on('click', '#transfer-submit, #transfer-submit-fb', function () {
        // 数据校验
        if ($("input[name^='quantity']").length == 0) {
            Utils.Toastr.Warning('商品为空', '请添加申请入库的商品');
            return;
        }

        //入库单商品行数限制
        if($('#transfer-list tr').size() > 40){
            Utils.Toastr.Warning('入库单商品不能超过40行');
            return;
        }

        var selectedGoods = {};
        var checkPassed = true;
        $("input[name^='quantity']").each(function () {
            var goods_id = $(this).attr('data-sku');
            var quantity = $(this).val();
            selectedGoods[goods_id] = quantity;
        });

        if (!checkPassed) {
            return;
        }
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.post("/mistock/in-out-stock/create-in-out-apply",
            {
                "type":'1',
                "inout_type":'in',
                "selectedGoods": selectedGoods,
                "org_id": $('#org_id').val(),
                "service_type": $('#service_type').val(),
                "unit_type": $('#unit_type').val(),
                "remark": $("#remark").val()
            },
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = '/mistock/in-out-stock/stock-transfer-apply-search';
                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
                layer.close(layerIndex);
            },
            "json");

    });



    function reloadCateTree()
    {
        categoryTree.destroy();
        $('#transfer-list').empty();
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        $.ajax({
            cache: false,
            type: "GET",
            url: '/mistock/in-out-stock/get-goods-node',
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (data) {

                categoryTreeVal = jQuery.parseJSON(data);
                categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
                results = getAllNodes(categoryTree.getNodes());
                layer.close(layerIndex);

                // autoChecked();
            }
        });

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


    $.extend({
        categroryTreeAfterFly: function (treeNode, nansItem) {
            var goodsId = nansItem.id;
            var orgId = $('#org_select').val();

            //$.ajax({
            //    cache: true,
            //    type: "POST",
            //    url: '/transfer2/transfer/get-goods-real-price',
            //    data: 'org=' + orgId + '&goods=' + goodsId,
            //    error: function (request) {
            //    },
            //    success: function (data) {
            //        var ret = jQuery.parseJSON(data);
            //        var price = ret.price;
            //        $('#td-tprice-' + goodsId).html('￥0');
            //        $('#td-sprice-' + goodsId).html('￥' + price);
            //        $('#td-sprice-' + goodsId).attr('data-price', price);
            //
            //    }
            //});
        },
        categroryTreeAfterUncheck: function (treeNode, nansItem) {

        }
    });


    $(document).on('click', '.cancel-current', function () {
        if ($('#categoryTreeSearchInput').val() != '') {
            $('#categoryTreeSearchInput').val('');
            $.zTreeResearch();
        }
        categoryTree.checkNode(categoryTree.getNodeByTId($(this).attr('data-zt-tid')), false, true, true);
    });



    $(document).on('mouseover', '.td-tr-t', function () {
        layer.closeAll();
        var spanId = $(this).attr('id');
        var title = $(this).attr('data-title');
        layer.tips(title, '#' + spanId, {
            tips: [1, '#3595CC'],
            time: 2999
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
