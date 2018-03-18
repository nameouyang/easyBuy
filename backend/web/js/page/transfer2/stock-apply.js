$(function () {
    categoryTreeVal = '';
    var results = [];

    $(document).on('change', '#org_select', function () {
        var orgId = $('#org_select').val();
        if (orgId == '') {
            return;
        }
        $.ajax({
            cache: false,
            type: "GET",
            url: '/organization/get-org-info?orgId='+orgId,
            // data: 'org=' + orgId,
            error: function (request) {
            },
            success: function (data) {
                if(data.code == 0)
                {
                    $("#org-address").text(data.msg.address);
                }
            }
        });
        reloadCateTree(orgId);
    });

    $(document).on('click', '#stock-apply-submit, #stock-apply-submit-fb', function () {
        // 数据校验
        if ($("input[name^='quantity']").length == 0) {
            Utils.Toastr.Info('商品为空', '请选择需要申请的商品');
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

        $.post("/transfer2/stock-apply/create",
            {
                "selectedGoods": selectedGoods,
                "org": $('#org_select').val(),
                "remark": $("#remark").val()
            },
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = '/transfer2/stock-apply/index';
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

    function reloadCateTree(orgId) {
        categoryTree.destroy();
        $('#stock-apply-list').empty();
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.ajax({
            cache: false,
            type: "POST",
            url: '/transfer2/stock-apply/get-goods-nodes',
            data: 'org=' + orgId,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (data) {
                categoryTreeVal = jQuery.parseJSON(data);
                categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
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

    if ($('#org_select').val() != '') {
        reloadCateTree($('#org_select').val());
    }

    $.extend({
        categroryTreeAfterFly: function (treeNode, nansItem) {
            var goodsId = nansItem.id;
            var orgId = $('#org_select').val();
            $.ajax({
                cache: true,
                type: "POST",
                url: '/transfer2/stock-apply/get-available-stock',
                data: 'org=' + orgId + '&goods=' + goodsId,
                error: function (request) {
                },
                success: function (data) {
                    var dataInfo = data.data;
                    $('#td-real-' + goodsId).html(dataInfo.ra);
                    $('#td-daily-' + goodsId).html(dataInfo.sa);
                    $('#td-auth-' + goodsId).html(dataInfo.au);
                    $('#td-stock-' + goodsId).html(dataInfo.ts);

                    //计算dos （在库 + 在途）/ 日均销
                    var dos = '-';
                    var realStock = parseInt(dataInfo.sa);
                    if (realStock > 0) {
                        var amount = parseInt($('#td-amount-' + goodsId).html());
                        dos = (dataInfo.ra + amount) / dataInfo.sa;
                        dos = dos.toFixed(1);
                    }
                    $('#td-dos-' + goodsId).html(dos);
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

    $(document).on('mouseover', '.td-tr-s', function () {
        var orgId = $('#org_select').val();
        var goodsId = $(this).attr('sku');
        var spanId = $(this).attr('id');
        var stock = $(this).html();

        if(parseInt(stock) <= 0){
            return false;
        }

        $.ajax({
            type: "GET",
            url: '/transfer2/stock-org-best/get-assigned-stock-detail',
            data: 'orgId=' + orgId + '&goodsId=' + goodsId,
            error: function (request) {
                Utils.Toastr.Error('失败', '对不起，网络错误，请重试！');
            },
            success: function (data) {
                layer.closeAll();
                if (0 == data.code) {
                    layer.tips(data.msg, '#' + spanId, {
                        tips: [1, '#3595CC'],
                        time: 4000
                    });
                }
            }
        });
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


