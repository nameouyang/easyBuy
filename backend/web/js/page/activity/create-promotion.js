$(function () {
    var skuList= [];
    $(document).on('change', '#reduce-goods', function (e) {
        $(this).attr('disabled',true);
        let sku = $('#reduce-goods').val();
        if($.inArray(sku, skuList) !== -1){
            Utils.Toastr.Info('查询失败', '此活动中存在多条同一SKU申请，请修改核对后提交。');
            $(this).attr('disabled',false);
            return false;
        }
        if (sku) {
            $.post({
                url: '/activity/promotion/get-goods-info',
                data: {sku:sku},
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 0) {
                        var html='';
                        html += '<tr id="li-' + ret.data.sku +'">';
                        html += '<td>' + ret.data.sku + '</td>';
                        html += '<td>' + ret.data.name + '</td>';
                        html += '<td class="text-center col-th-10">' + ret.data.market_price + '</td>';
                        html += '<td>' + ret.data.price + '</td>';
                        html += '<td><input type="number" style="width: 80px" name="reduce_goods['+ret.data.sku+'][lower_price]" /></td>';
                        html += '<td><input type="radio" data-sku=' + ret.data.sku + ' class="rule_close" name="reduce_goods[' + ret.data.sku + '][is_limit]"  value="0" checked>无<input type="radio" class="rule_open" data-sku=' + ret.data.sku + ' name="reduce_goods[' + ret.data.sku + '][is_limit]" value="1">有</td>';
                        html += '<td><button class="btn btn-icon white btn-icon-sm remove-goods" data-sku=' + ret.data.sku + ' type="button"><i class="fa fa-minus"></i></button></td>';
                        html += '</tr>';
                        html += '<tr class="rule_table" style="display: none">';
                        html += '<td colspan="7" class=".table-responsive" style="padding: 0px;margin: 0px">';
                        html += '<table class="table" cellspacing="0" cellpadding="1" style="border:1px solid #000000;">';
                        html += '<tr>';
                        html += '<td style="width: 23%">每单购买数量限制:</td>';
                        html += '<td style="width: 5%"><input style="width: 50px" type="text" name="reduce_goods[' + ret.data.sku + '][order_limit_buy]" value="0"></td>';
                        html += '<td colspan="3">个/单张订单（0则不限制）</td>';
                        html += '</tr>';
                        html += '<tr>';
                        html += '<td>每人购买数量限制:</td>';
                        html += '<td><input style="width: 50px" type="text" name="reduce_goods[' + ret.data.sku + '][limit_buy]" value="0"></td>';
                        html += '<td colspan="3">个/单个身份证号（0则不限制）</td>';
                        html += '</tr>';
                        html += '<tr>';
                        html += '<td>每天出售总量限制:</td>';
                        html += '<td><input type="text" style="width: 50px" name="reduce_goods[' + ret.data.sku + '][day_limit_sold]" value="0"></td>';
                        html += '<td>个/天（0则不限制）</td>';
                        html += '<td><input type="radio" name="reduce_goods[' + ret.data.sku + '][day_limit_sold_type]" value="1" checked/>全部门店参与合计</td>';
                        html += '<td><input type="radio" name="reduce_goods[' + ret.data.sku + '][day_limit_sold_type]" value="2">每个门店单独计数</td>';
                        html += '</tr>';
                        html += '<tr>';
                        html += '<td>活动期间出售总量限制:</td>';
                        html += '<td><input type="text" style="width: 50px" name="reduce_goods[' + ret.data.sku + '][limit_sold]" value="0"></td>';
                        html += '<td >个/整个活动（0则不限制）</td>';
                        html += '<td><input type="radio" name="reduce_goods[' + ret.data.sku + '][limit_sold_type]" value="1" checked/>全部门店参与合计</td>';
                        html += '<td><input type="radio" name="reduce_goods[' + ret.data.sku + '][limit_sold_type]" value="2">每个门店单独计数</td>';
                        html += '</tr>';
                        html += '</table>';
                        html += '</td>';
                        html += '</tr>';
                        $('#reduce').append(html);
                        skuList.push(sku);
                    } else {
                        Utils.Toastr.Info('查询失败', ret.msg);
                    }
                    $('#reduce-goods').attr('disabled',false);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误:' + textStatus);
                    $('#reduce-goods').attr('disabled',false);
                }
            });  
        }
    });

    displayOrgRatio();
    $(document).on('change', 'input[name="org_scope"]', function (e) {
        displayOrgRatio();
    });

    function displayOrgRatio()
    {
        if (parseInt($('input[name="org_scope"]:checked').val()) == 5) {
            if(!orgAreaInfo){//获取门店区域信息
                $.post({
                    url: '/activity/promotion/org-area-info',
                    data: {},
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
        $(this).parents('#li-' + sku).next(['tr.rule_table']).remove();
        $(this).parents('#li-' + sku).remove();
    });

    $(document).on('click', '#promotion-submit', function (e) {
        if($('input:radio[name="org_scope"]:checked').val() == 5){
            onCheck();
        }
        e.preventDefault();
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $.post("/activity/promotion/create", $('#promotion-form').serialize(),
        function (data) {
            if (data.code == 0) {
                Utils.Toastr.Success('成功', data.msg);
                window.location.href = '/activity/promotion/index';
            } else {
                $this.removeAttr('disabled');
                Utils.Toastr.Error('失败', data.msg);
            }
        },
        "json");
    });

    $(document).on('click', ".rule_open", function (e) {
        let sku = $(this).data('sku');
        $(this).parents('#li-' + sku).next(['tr.rule_table']).show();
    });

    $(document).on('click', ".rule_close", function (e) {
        let sku = $(this).data('sku');
        $(this).parents('#li-' + sku).next(['tr.rule_table']).hide();
    });



    function setCheck() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            py = $("#py").attr("checked")? "p":"",
            sy = $("#sy").attr("checked")? "s":"",
            pn = $("#pn").attr("checked")? "p":"",
            sn = $("#sn").attr("checked")? "s":"",
            type = { "Y":py + sy, "N":pn + sn};
        // zTree.setting.check.chkboxType = type;
        // showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
    }
    function showCode(str) {
        if (!code) code = $("#code");
        code.empty();
        code.append("<li>"+str+"</li>");
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
