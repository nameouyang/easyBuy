/**
 * Created by zhangxiaolong on 17/12/26.
 */
$(function () {

    categoryTreeVal = '';

    $(document).on('change', '#org_id', function () {

        var unit_type=$('#unit_type').val();
        if(unit_type!=''){
            reloadCateTree();
        }

    });



    $(document).on('change', '#unit_type', function () {

        var org_id= $("#org_id").val();

        if (org_id=='') {
            Utils.Toastr.Warning('申请机构为空', '请先选择申请机构');
            return;
        }


        var unit_type=$('#unit_type').val();
        var to_unit_type=$('#to_unit_type').val();

        if(unit_type==to_unit_type){
            $(".to_goods_item_t").show();
        }else{
            $(".to_goods_item_t").hide();
        }



        reloadCateTree();

    });


    $(document).on('change', '#to_unit_type', function () {

        var unit_type=$('#unit_type').val();
        var to_unit_type=$('#to_unit_type').val();

        if (unit_type=='') {
            Utils.Toastr.Warning('转出库存类型为空', '请先选择转出库存类型');
            return;
        }

        if(unit_type==to_unit_type){
            $(".to_goods_item_t").show();
        }else{
            $(".to_goods_item_t").hide();
        }



    });





    $(document).on('click', '#transfer-submit, #transfer-submit-fb', function () {

        var unit_type=$('#unit_type').val();
        var to_unit_type=$('#to_unit_type').val();

        if (unit_type=='') {
            Utils.Toastr.Warning('转出库存类型为空', '请选择转出库存类型');
            return;
        }
        if (to_unit_type=='') {
            Utils.Toastr.Warning('转入库存类型为空', '请选择转入库存类型');
            return;
        }

        // 数据校验
        if ($("input[name^='quantity']").length == 0) {
            Utils.Toastr.Warning('商品为空', '请添加申请出库的商品');
            return;
        }

        //商品行数限制
        if($('#transfer-list tr').size() > 40){
            Utils.Toastr.Warning('库存转移商品不能超过40行');
            return;
        }


        if($("#remark").val()==''){
            Utils.Toastr.Warning('备注为空', '请添加备注');
            return;
        }

        var unit_type=$('#unit_type').val();
        var to_unit_type=$('#to_unit_type').val();





        var selectedGoods = {};
        var checkPassed = true;
        $("input[name^='quantity']").each(function () {
            var goods_id = $(this).attr('data-sku');
            var quantity = $(this).val();
            if (parseInt(quantity) > parseInt($(this).attr('max'))) {
                Utils.Toastr.Warning('数量错误', goods_id + '本次申请数量不能超过可申请数量');
                $(this).focus();
                checkPassed = false;
                return;
            }

            //如果转出库存类型等于转入库存类型
            if(unit_type==to_unit_type){

                var to_goods_id = $("#tr-t-s-to-"+goods_id).attr('data-to-sku');
                //console.log(to_goods_id);
                if(to_goods_id===undefined || to_goods_id==''){
                    Utils.Toastr.Warning('调整商品为空', goods_id + '请填写调整商品');
                    $(this).focus();
                    checkPassed = false;
                    return;
                }

                selectedGoods[goods_id] = quantity+'-'+to_goods_id;
            }else{
                selectedGoods[goods_id] = quantity;
            }





        });

        if (!checkPassed) {
            return;
        }
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });


        $.post("/mistock/in-out-stock/create-in-out-apply",
            {
                "type":'2',
                "selectedGoods": selectedGoods,
                "org_id": $('#org_id').val(),
                "service_type": $('#service_type').val(),
                "unit_type": to_unit_type,
                "from_unit_type": unit_type,
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
            url: '/mistock/in-out-stock/get-goods-node-by-out',
            data:{unit_type: $('#unit_type').val(),org_id:$('#org_id').val()},
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


            var unit_type=$('#unit_type').val();
            var to_unit_type=$('#to_unit_type').val();

            if(unit_type==to_unit_type){
                $(".to_goods_item_t").show();
            }else{
                $(".to_goods_item_t").hide();
            }


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


   $(document).on('click', '.to_goods_item', function () {

            var id= $(this).attr('id');

            $("#"+id).empty();
            $("#"+id).select2({

                placeholder:'请输入商品',
                maximumSelectionLength: 10,
                theme: "bootstrap",
                tags: false,
                class:"form-control",
                allowClear: true, //是否允许清空选中
                ajax: {
                    url: '/mistock/in-out-stock/search-goods-by-ajax',
                    type:'GET',
                    dataType: 'json',
                    processResults: function (data) {
                        return {
                            results: data
                        };
                    }
                },
                templateSelection: function (repo) {  //选中某一个选项是执行
                    $("#"+id).attr('data-to-sku',repo.id);
                    return repo.text;
                }

            })

            //console.log(id);

    });



    //
    //var search_goods_html=$(".search_goods").html();
    ////
    ////var a=$("#tr-t-s-to-"+goodsId).html();
    //////console.log(a);
    //$("#tr-t-s-to-"+goodsId).html(search_goods_html);
    ////$("#tr-t-s-to-"+goodsId).select2();
    //$("#tr-t-s-to-"+goodsId).select2({
    //    placeholder:'请选择商品',
    //
    //
    //});










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
