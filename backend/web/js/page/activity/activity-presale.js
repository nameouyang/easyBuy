var activity_presale = (function(){
    return {
        /**
         * [init 初始化]
         * @return {[type]} [description]
         */
        init: function(){
            var type = $('#activity-presale-back').data('type');
            if ( type == 'view' || type == 'update' ) {
                $('input[name="org_scope"]').attr("disabled",true); 
                $('select').attr("disabled", true);
            }
            this.display_org_ratio();
        },

        /**
         * [add_goods_line 根据选择的商品名称, 添加预售商品表单]
         * @param {[type]} obj_id [表单id名称]
         * @param {[type]} data   [添加的商品数据]
         */
        add_goods_line: function(obj_id, data){
            $.post({
                url: '/activity/promotion/get-goods-info',
                data: {sku:data.sku},
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 0) {
                        var html='';
                        html += '<tr id="li-' + ret.data.sku +'">';
                        html += '<td>' + ret.data.sku + '</td>';
                        html += '<td>' + ret.data.name + '</td>';
                        html += '<td><input type="radio" data-sku=' + data.sku + ' class="rule_close" name="goods[' + ret.data.sku + '][pre_sold_type]"  value="1" checked>预付全款<input type="radio" class="rule_open" data-sku=' + ret.data.sku + ' name="goods[' + ret.data.sku + '][pre_sold_type]" value="2" disabled>预付定金</td>';
                        html += '<td><input style="width: 50px" type="number" name="goods[' + ret.data.sku + '][limit_buy]" value="0"</td>';
                        html += '<td><button class="btn btn-icon white btn-icon-sm remove-goods" data-sku=' + ret.data.sku + ' type="button"><i class="fa fa-minus"></i></button></td>';
                        html += '</tr>';
                        html += '<tr class="rule_table" style="display: none">';
                        html += '<td colspan="7" class=".table-responsive" style="padding: 0px;margin: 0px">';
                        html += '<table class="table" cellspacing="0" cellpadding="1" style="border:1px solid #000000;">';
                        html += '<tr>';
                        html += '<td style="width: 40%">预付定金: </td>';
                        html += '<td style="width: 5%"><input style="width: 50px" type="number" name="goods[' + ret.data.sku + '][pay_amount]" value="0"></td>';
                        html += '<td colspan="3">元</td>';
                        html += '</tr>';
                        html += '</table>';
                        html += '</td>';
                        html += '</tr>';
                        $('#'+obj_id).append(html);
                    } else {
                        Utils.Toastr.Info('查询失败', ret.msg);
                    }
                    // $('#reduce-goods').attr('disabled',false);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误:' + textStatus);
                    $('#reduce-goods').attr('disabled',false);
                }
            });  
        },

        /**
         * [display_org_ratio 根据选择门店范围ratio 显示input]
         * @return
         */
        display_org_ratio: function(orgAreaInfo){
            var _csrf = $('#_csrf').val();
            switch( parseInt($('input[name="org_scope"]:checked').val()) ){
                case 5:
                    if(!window.orgAreaInfo){//获取门店区域信息
                        //如果存在id 证明是update 页面
                        var param = $('#activity-presale-submit').data('id')!==undefined ? '?id='+$('#activity-presale-submit').data('id') : ''  ;
                        $.post({
                            url: '/activity/promotion/org-area-info'+param,
                            data: {'_csrf': _csrf},
                            dataType: 'json',
                            async:false,
                            success:function(msg){
                                if(msg.code==200) {
                                    window.orgAreaInfo = msg.data; // 存入window
                                }
                            }
                        })
                    }
                    $('#org').hide();
                    $('#area').show();
                    this.view_tree(window.orgAreaInfo);
                    break;
                case 4:
                    $('#area').hide();
                    $('#org').show();
                    break;
                default:
                    $('#org').hide();
                    $('#area').hide();
                    break;
            }            
        },

        /**
         * [view_tree 显示树形结构数据]
         * @param  {[type]} orgAreaInfo [description]
         * @return {[type]}             [description]
         */
        view_tree: function(orgAreaInfo) {
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
            var zNodes = orgAreaInfo;
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            this.set_check();
            $("#py, #sy, #pn, #sn").bind("change", this.set_check);
        },

        /**
         * [onCheck 获取节点的方法]
         * @return
         */
        on_check: function (){ 
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
        },

        set_check: function(){
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            py = $("#py").attr("checked")? "p":"",
            sy = $("#sy").attr("checked")? "s":"",
            pn = $("#pn").attr("checked")? "p":"",
            sn = $("#sn").attr("checked")? "s":"",
            type = { "Y":py + sy, "N":pn + sn};
        }

    }
})();


activity_presale.init();

/**
 * [选择预售商品名称 会给table添加一条信息]
 * @return 
 */
$(document).on('change', '#goods_list', function(event) {
    event.preventDefault();
    var _this = $(this).find("option:selected");
    var data = {
        'sku': _this.val(),
    }
    var obj_id = 'goods_line';
    activity_presale.add_goods_line(obj_id, data);
});

/**
 * [点击预售方式 显示/隐藏table定金]
 * @return
 */
/*$(document).on('click', ".rule_open", function (e) {

    let sku = $(this).data('sku');
    $(this).parents('#li-' + sku).next(['tr.rule_table']).show();
});

$(document).on('click', ".rule_close", function (e) {
    let sku = $(this).data('sku');
    $(this).parents('#li-' + sku).next(['tr.rule_table']).hide();
});*/

/**
 * [点击门店范围ratio 根据选择门店范围ratio 显示input]
 * @return
 */
$(document).on('change', 'input[name="org_scope"]', function (e) {
    activity_presale.display_org_ratio();
});

/**
 * 删除table的一行
 * @return
 */
$(document).on('click', ".remove-goods", function (e) {
    var type = $('#activity-presale-back').data('type');
    if ( type == 'view' || type == 'update' ) {
        return;
    }
    let sku = $(this).data('sku');
    $(this).parents('#li-' + sku).next(['tr.rule_table']).remove();
    $(this).parents('#li-' + sku).remove();
});

/**
 * [提交表单]
 * @return 
 */
$(document).on('click', '#activity-presale-submit', function (e) {
    if($('input:radio[name="org_scope"]:checked').val() == 5){
        activity_presale.on_check();
    }
    // $(this).attr('disabled', 'disabled');
    if ( $(this).data('id') ) {
        $.post("/activity/activity-presale/update?id="+$(this).data('id'), $('#activity-presale-form').serialize(),
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = '/activity/activity-presale/index';
                } else {
                    $(this).removeAttr('disabled');
                    Utils.Toastr.Error('失败', data.msg);
                }
        },"json");
    }else{
        $.post("/activity/activity-presale/create", $('#activity-presale-form').serialize(),
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = '/activity/activity-presale/index';
                } else {
                    $(this).removeAttr('disabled');
                    Utils.Toastr.Error('失败', data.msg);
                }
        },"json");
    }
});

/**
 * [go back]
 * @return
 */
$(document).on('click', '#activity-presale-back', function(event) {
    event.preventDefault();
    window.location.href='index';
});

$('#goods_list').select2();

/**
 * [index页面点击删除]
 * @return
 */
$('span[name="status-change"]').click(function(event) {
    var _this = $(this);
    $.ajax({
        url: '/activity/activity-presale/update-status?id='+$(this).parent('a').data('id'),
        type: 'POST',
        dataType: 'json',
        success: function(data){
            if ( data.code == 1000 ) {
                $.pjax.reload({container:'#gridview-pjax'});
                //_this.removeClass('glyphicon-remove').addClass('glyphicon-ok');
            }else if( data.code == 999 ){
                $.pjax.reload({container:'#gridview-pjax'});
                //_this.removeClass('glyphicon-remove').addClass('glyphicon-remove');
            }
        }
    });
});

