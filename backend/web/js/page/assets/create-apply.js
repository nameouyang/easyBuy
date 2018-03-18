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

function selectApplyType(obj) {
    var apply_type = $('#apply_type').val();
   // getMaterial(apply_type);
    if (apply_type == 1) {
        $('.div-expect-time').hide();
    } else if (apply_type > 1) {
        $('.div-expect-time').show();
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

function getMaterial(apply_type, orgId) {
    // categoryTree.destroy();
    $('#transfer-list').empty();
    var layerIndex = layer.load(0, {
        shade: [0.2, '#000']
    });
    $.ajax({
        cache: false,
        type: "GET",
        url: '/assets/material-apply/get-material-node?type=' + apply_type + "&orgId=" + orgId,
        error: function (request) {
            Utils.Toastr.Error('失败', '网络错误');
            layer.close(layerIndex);
        },
        success: function (data) {
            categoryTreeVal = jQuery.parseJSON(data);
            categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
            // $('#categoryTreeSearchInput').unbind();
            layer.close(layerIndex);
            // if ($('#org_select').attr('data-t') == 0) {
            //     getCredit(orgId);
            // }
            // showJMSpCol(isJM(orgId), true);
            // autoChecked();
        }
    });
}

function calTotalPrice() {
    var totalNum = 0;
    var totalMoney = 0.00;
    $('.td-tprice').each(function () {
        var goodsId = $(this).parent().find("td").first().attr('data-goods-id');
        var num = parseInt($('#quantity-' + goodsId).val());
        var minPackage = $('#min_packing-' + goodsId).text();
        var price = $("#price-" + goodsId).text();
        totalMoney = totalMoney + minPackage * num * price;
        totalNum = totalNum + num * minPackage;
    });
    var optHtml = '<tr id="tr-list-pr-t"><td colspan="7" class="text-center">共选择' + '<font style="color: red">' + totalNum +
        '件物料</font> '+'总金额' + '<font style="color: red">' +totalMoney + '</font>' + '元';
    $('#transfer-list-foot').html(optHtml);
}

function calApplyNum(goodId)
{
    var minPackage = parseInt($('#min_packing-' + goodId).text());
    var num = parseInt($('#quantity-' + goodId).val());
    var total = minPackage * num;
    $("#select-num-"+goodId).val(total);
}
//提交申请
function submitApply() {
    var layerIndex = layer.load(0, {
        shade: [0.2, '#000']
    });
    params = new Object();
    params.org_id = $('#org_id').val();
    params.apply_type = $('#apply_type').val();
    params.expect_time = $('#expect_time').val();
    params.apply_reason  = $('#apply_reason').val();
    var material_list = new Array();
    $('.td-tprice').each(function () {
        var materialId = $(this).parent().find("td").first().attr('data-goods-id');
        var apply_quantity = parseInt($('#select-num-' + materialId).val());
        var max_transfer = $('#max_transfer-' + materialId).text();
        var price = $('#price-' + materialId).text();
        var material_name = $('#tr-t-s-' + materialId).text();
        var material = new Object();
        material.material_id = materialId;
        material.apply_quantity = apply_quantity;
        material.price = price;
        material.max_transfer = max_transfer;
        material.material_name = material_name;
        material_list.push(material)
    });
    params.material_list = material_list;
    $.ajax({
        cache: false,
        type: "POST",
        data: params,
        url: '/assets/material-apply/create',
        error: function (request) {
            Utils.Toastr.Error('失败', '网络错误');
            layer.close(layerIndex);
            $(this).removeAttr("disabled");
        },
        success: function (ret) {
            $('#apply-submit').removeAttr("disabled");
            if (0 === ret.code) {
                Utils.Toastr.Success('成功', ret.msg);
                window.history.go(-1);
                window.location.href = document.referrer;//返回上一页并刷新
            } else {
                $(this).removeAttr("disabled");
                Utils.Toastr.Error('失败', ret.msg);
                layer.close(layerIndex);
            }
        }
    });
}

$(function () {
    if ($('#apply_type').val() == 1) {
        $('.div-expect-time').hide();
    }
    //getMaterial($('#apply_type').val());
    $(document).on('click', '.cancel-current', function () {
        if ($('#categoryTreeSearchInput').val() != '') {
            $('#categoryTreeSearchInput').val('');
            $.zTreeResearch();
        }
        categoryTree.checkNode(categoryTree.getNodeByTId($(this).attr('data-zt-tid')), false, true, true);
        calTotalPrice();
    });
    $(document).on('input', '.td-n-input', function () {
        var goodId = $(this).attr('data-sku');
        calTotalPrice();
        calApplyNum(goodId);

    });

    $.extend({
        categroryTreeAfterFly: function (treeNode, nansItem) {
            calTotalPrice();
        },
        categroryTreeAfterUncheck: function (treeNode, nansItem) {
            calTotalPrice();
        }
    });

    $(document).on('click', '#apply-submit', function () {
        if($('#apply_type').val() == 1){
            $(this).attr({"disabled": "disabled"});
            submitApply();
        }else{
            //如果申请时间与现在时间小于8天
            var now = Date.parse(new Date()) / 1000;
            var expect_time = $('#expect_time').val();
            if (expect_time !== null && expect_time !== undefined && expect_time !== '') {
                expect_time = Date.parse(new Date(expect_time)) / 1000;
                if (expect_time - now <= 3600 * 24 * 8) {
                    layer.confirm('申请时间过于紧迫，是否确认申请？', {
                        btn: ['确定', '取消']
                    }, function () {
                        layer.closeAll();
                        $(this).attr({"disabled": "disabled"});
                        submitApply();
                    }, function () {
                    });
                } else {
                    submitApply();
                }
            }else{
                Utils.Toastr.Info('失败', '请选择期望到货时间');
            }
        }

    });

    /**
     * 门店更换,展示物料选择信息也相应变换
     */
    $(document).on('change', '#org_id', function(){
        //选择物料信息变换
        var org = new Object();
        org.org_id = $("#org_id").val();
        getMaterial($('#apply_type').val(), $("#org_id").val());
        //申请方式变换
        $.ajax({
            url : 'select-type',
            data : org,
            type : "POST",
            cache : true,
            error: function(){
                Utils.Toastr.Error('Error', '网络错误');
            },
            success : function(data){
                if(data.code == 0)
                {
                    //删除老数据选项
                    $("#apply_type").empty();

                    //增加新数据选项
                    var selectOption = data.data.select;
                    for(var key in selectOption)
                    {
                        $("#apply_type").append("<option value='"+key+"'>"+selectOption[key]+"</option>");
                    }
                    var defaultSelect = data.data.default;
                    $("#apply_type").find("option[value= '2']").attr("selected", true);
                }
                else
                {
                    Utils.Toastr.Info('Error', data.msg);
                }

            }
        });
    })
});


