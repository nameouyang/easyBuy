$(function () {
    categoryTreeVal = '';
    var results = [];

    $(document).on('change', '#out-channel', function () {
        reloadCateTree($(this).val());
    });

    $(document).on('click', '#stock-apply-submit, #stock-apply-submit-fb', function () {
        // 数据校验
        if ($("input[name^='quantity']").length == 0) {
            Utils.Toastr.Info('商品为空', '请选择需要申请的商品');
            return;
        }

        if (!$("#to-channel").val()) {
            Utils.Toastr.Info('渠道为空', '请选择转入渠道');
            return;
        }

        if ($("#to-channel").val() == $("#out-channel").val()) {
            Utils.Toastr.Info('渠道错误', '不能选择相同的渠道');
            return;
        }

        if (!$("#remark").val()) {
            Utils.Toastr.Info('备注', '备注必填');
            return;
        }

        var selectedGoods = {};
        $("input[name^='quantity']").each(function () {
            var goods_id = $(this).attr('data-sku');
            var quantity = $(this).val();
            selectedGoods[goods_id] = quantity;
        });
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        $.post("/mistock/org-stock-query/create-channel-adjust",
            {
                "selectedGoods": selectedGoods,
                "from_channel": $('#out-channel').val(),
                "to_channel": $('#to-channel').val(),
                "remark": $("#remark").val()
            },
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = '/mistock/org-stock-query/index';
                } else {
                    Utils.Toastr.Error('失败', data.msg);
                    //自动取消已勾选节点
                    if (data.data.type == 'cancelChecked') {
                        $.each(results, function (k, v) {
                            if ($.inArray(v.id, data.data.goodsId) >= 0) {
                                categoryTree.checkNode(v, false, true, true);
                            }
                        });
                    }
                }
                layer.close(layerIndex);
            },
            "json");
    });

    function reloadCateTree(val) {
        categoryTree.destroy();
        $('#stock-apply-list').empty();
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        if (!val) {
            layer.close(layerIndex);
            return false;
        }
        $.ajax({
            cache: false,
            type: "GET",
            url: '/mistock/org-stock-query/get-goods-node',
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (data) {
                categoryTreeVal = jQuery.parseJSON(data);
                categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
                $('#categoryTreeSearchInput').unbind();
                results = getAllNodes(categoryTree.getNodes());
                layer.close(layerIndex);
            }
        });
    }

    function showSb(anTime) {
        if ($("#stock-apply-submit").isOnScreen(true)) {
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
            var channel = $('#out-channel').val();
            $.ajax({
                cache: true,
                type: "POST",
                url: '/mistock/org-stock-query/get-stock',
                data: 'channel=' + channel + '&goods=' + goodsId,
                error: function (request) {
                },
                success: function (data) {
                    $('#td-stock-' + goodsId).html(data.data.stock);
                }
            });
        }
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


function delNode(source) {
    if ($('#categoryTreeSearchInput').val() != '') {
        $('#categoryTreeSearchInput').val('');
        $.zTreeResearch();
    }
    categoryTree.checkNode(categoryTree.getNodeByTId(source.getAttribute('data-zt-tid')), false, true, true);
}




