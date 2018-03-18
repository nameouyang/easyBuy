$(function () {
    let promotionId = $('.reduce-submit').data('id');
    $(document).on('change', '#reduce-goods', function (e) {
        let sku = $('#reduce-goods').val();
        if (sku) {
            $.post({
                url: '/activity/promotion/get-goods-info',
                data: {sku:sku},
                dataType: 'json',
                success: function (ret) {
                    console.log(ret);
                    if (ret.code === 0) {
                        $('#reduce').append('<tr id="li-' + ret.data.sku +'"><td>' + ret.data.sku + '</td><td>' + ret.data.name + '</td><td>'
                            + ret.data.market_price + '</td><td>' + ret.data.price + '</td><td>' + ret.data.price + '</td><td><input type="number" name="reduce_goods[' + ret.data.sku + ']["reduce"]"></td><td><button class="btn btn-icon white btn-icon-sm remove-goods" data-sku=' + ret.data.sku + ' type="button"><i class="fa fa-minus"></i></button></td>><tr>');
                    } else {
                        Utils.Toastr.Info('查询失败', ret.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误:' + textStatus);
                }
            });
        }
    });

    displayOrgRatio();
    $(document).on('change', 'input[name="org_scope"]', function (e) {
        displayOrgRatio();
    });

    // function displayOrgRatio()
    // {
    //     if (parseInt($('input[name="org_scope"]:checked').val()) == 4) {
    //         $('#org').show();
    //     } else {
    //         $('#org').hide();
    //     }
    // }
    function displayOrgRatio()
    {
        if (parseInt($('input[name="org_scope"]:checked').val()) == 5) {
            var _csrf = $('#_csrf').val();
            if(!orgAreaInfo){//获取门店区域信息
                $.post({
                    url: '/activity/promotion/org-area-info?id='+promotionId,
                    data: {"_csrf":_csrf},
                    dataType: 'json',
                    async:false,
                    success:function(msg){
                        if(msg.code==200) {
                            orgAreaInfo = msg.data;
                        }
                    }
                })
            }
            $('#org').hide();
            $('#area').show();
            viewTree(orgAreaInfo);
        }else if(parseInt($('input[name="org_scope"]:checked').val()) == 4){
            $('#area').hide();
            $('#org').show();
        }else {
            $('#org').hide();
            $('#area').hide();
        }
    }

    $(document).on('click', ".remove-goods", function (e) {
        let sku = $(this).data('sku');
        $(this).parents('#li-' + sku).remove();
    });

    $(document).on('click', '.reduce-submit', function (e) {
        e.preventDefault();
        $this = $(this);
        var id = $(this).data('id');
        var action = $(this).data('action');
        var content = $('#reduce-content').val();
        var approveid = $(this).data('approveid');
        if(action == 2 && content == ''){
            Utils.Toastr.Error('失败', '驳回必须填写驳回原因');
            return false;
        }
        $this.attr('disabled', 'disabled');
        $.post("/bpm/approve/approve", {'id':approveid,'action':action,'comment':content},
        function (data) {
            if (data.code == 200) {
                Utils.Toastr.Success('成功', data.msg);
                window.location.href = '/activity/promotion/index';
            } else {
                $this.removeAttr('disabled');
                Utils.Toastr.Error('失败', data.msg);
            }
        },
        "json");
    });

    if (promotionId) {
        $.post({
            url: '/activity/promotion/get-reduce-goods?id=' + promotionId,
            dataType: 'json',
            success: function (ret) {
                console.log(ret);
                if (ret.code === 0) {
                    for (let x in ret.data) {
                        var html='';
                        html += '<tr id="li-' + ret.data[x].sku +'">';
                        html += '<td>' + ret.data[x].sku + '</td>';
                        html += '<td>' + ret.data[x].name + '</td>';
                        html += '<td class="text-center col-th-10">' + ret.data[x].market_price + '</td>';
                        html += '<td>' + ret.data[x].price + '</td>';
                        html += '<td><input type="number" style="width: 80px" name="reduce_goods['+ret.data[x].sku+'][lower_price]" value="'+ret.data[x].reduce.reduce_price+'" disabled/></td>';
                        html += '<td>' + ret.data[x].reduce.difference_price + '</td>';
                        html += '<td><input type="radio" data-sku=' + ret.data[x].sku + ' class="rule_close" name="reduce_goods[' + ret.data[x].sku + '][is_limit]"  value="0" disabled ';
                        if(ret.data[x].reduce.is_limit == 0){
                            html += 'checked';
                        }
                        html += '>无<input type="radio" class="rule_open" data-sku=' + ret.data[x].sku + ' name="reduce_goods[' + ret.data[x].sku + '][is_limit]" value="1" disabled ';
                        if(ret.data[x].reduce.is_limit == 1){
                            html += 'checked';
                        }
                        html += '>有</td>';
                        html += '</tr>';
                        html += '<tr class="rule_table" ';
                        if(ret.data[x].reduce.is_limit == 0) {
                            html += 'style="display: none"';
                        }
                        html += '>';
                        html += '<td colspan="8" class=".table-responsive" style="padding: 0px;margin: 0px">';
                        html += '<table class="table" cellspacing="0" cellpadding="1" style="border:1px solid #000000;">';
                        html += '<tr>';
                        html += '<td style="width: 23%">每单购买数量限制:</td>';
                        html += '<td style="width: 5%"><input style="width: 50px" type="text" name="reduce_goods[' + ret.data[x].sku + '][order_limit_buy]" value="'+ret.data[x].reduce.order_limit_buy+'" disabled /></td>';
                        html += '<td colspan="3">个/单张订单（0则不限制）</td>';
                        html += '</tr>';
                        html += '<tr>';
                        html += '<td>每人购买数量限制:</td>';
                        html += '<td><input style="width: 50px" type="text" name="reduce_goods[' + ret.data[x].sku + '][limit_buy]" value="'+ret.data[x].reduce.limit_buy+'" disabled /></td>';
                        html += '<td colspan="3">个/单个身份证号（0则不限制）</td>';
                        html += '</tr>';
                        html += '<tr>';
                        html += '<td>每天出售总量限制:</td>';
                        html += '<td><input type="text" style="width: 50px" name="reduce_goods[' + ret.data[x].sku + '][day_limit_sold]" value="'+ret.data[x].reduce.day_limit_sold+'" disabled /></td>';
                        html += '<td>个/天（0则不限制）</td>';
                        html += '<td><input type="radio" name="reduce_goods[' + ret.data[x].sku + '][day_limit_sold_type]" value="1" disabled ';
                        if(ret.data[x].reduce.day_limit_sold_type == 1){
                            html += 'checked';
                        }
                        html += '/>全部门店参与合计</td>';
                        html += '<td><input type="radio" name="reduce_goods[' + ret.data[x].sku + '][day_limit_sold_type]" value="2" disabled ';
                        if(ret.data[x].reduce.day_limit_sold_type == 2){
                            html += 'checked';
                        }
                        html += '>每个门店单独计数</td>';
                        html += '</tr>';
                        html += '<tr>';
                        html += '<td>活动期间出售总量限制:</td>';
                        html += '<td><input type="text" style="width: 50px" name="reduce_goods[' + ret.data[x].sku + '][limit_sold]" value="'+ret.data[x].reduce.limit_sold+'" disabled /></td>';
                        html += '<td >个/整个活动（0则不限制）</td>';
                        html += '<td><input type="radio" name="reduce_goods[' + ret.data[x].sku + '][limit_sold_type]" value="1" disabled ';
                        if(ret.data[x].reduce.limit_sold_type == 1) {
                            html += 'checked';
                        }
                        html += '/>全部门店参与合计</td>';
                        html += '<td><input type="radio" name="reduce_goods[' + ret.data[x].sku + '][limit_sold_type]" value="2" disabled ';
                        if(ret.data[x].reduce.limit_sold_type == 2) {
                            html += 'checked';
                        }
                        html += '/>每个门店单独计数</td>';
                        html += '</tr>';
                        html += '</table>';
                        html += '</td>';
                        html += '</tr>';
                        $('#reduce').append(html);
                    }
                } else {
                    Utils.Toastr.Info('查询失败', ret.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Utils.Toastr.Error('异常', '系统错误:' + textStatus);
            }
        });
    }

    $(document).on('click', ".rule_open", function (e) {
        let sku = $(this).data('sku');
        $(this).parents('#li-' + sku).next(['tr.rule_table']).show();
    });

    $(document).on('click', ".rule_close", function (e) {
        let sku = $(this).data('sku');
        $(this).parents('#li-' + sku).next(['tr.rule_table']).hide();
    });

    $("#org_scope").find("input[name='org_scope']").attr('disabled','disabled');

    function setCheck() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            py = $("#py").attr("checked")? "p":"",
            sy = $("#sy").attr("checked")? "s":"",
            pn = $("#pn").attr("checked")? "p":"",
            sn = $("#sn").attr("checked")? "s":"",
            type = { "Y":py + sy, "N":pn + sn};
        var nodes = zTree.getCheckedNodes(true);
        for(var j=0;j<nodes.length;j++){
            var node = zTree.getNodeByParam("id",nodes[j].id);
            var parent = node.getParentNode();
            if(parent && !parent.open){
                zTree.expandNode(parent,true,true);
            }
            zTree.checkNode(node,true,true);
        }
    }

    var code;
    var orgAreaInfo;
    function viewTree(orgAreaInfo) {
        var setting = {
            check: {
                enable: true,
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            view: {
                showIcon: false
            }
        };
        console.log(orgAreaInfo);
        var zNodes = orgAreaInfo;


        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        setCheck();
        $("#py").bind("change", setCheck);
        $("#sy").bind("change", setCheck);
        $("#pn").bind("change", setCheck);
        $("#sn").bind("change", setCheck);
    }


    function onCheck(){  //获取节点的方法
        var disabledSelect = $('#org_scope').data('disabled');
        var treeObj=$.fn.zTree.getZTreeObj("treeDemo"),
            nodes=treeObj.getCheckedNodes(true),
            v="";
        for(var i=0;i<nodes.length;i++){
            v+=nodes[i].id + ",";
        }
        if(disabledSelect != 1){
            $('#selectOrgIds').val(v);
        }
    }
});
