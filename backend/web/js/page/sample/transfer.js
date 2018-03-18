//调拨类型变更时切换机构
function selectTransferType(obj) {
    var type = $('#type').val();
    if (type == 20) {
        $('.org1').show()
        $('.org2').hide();
        $('.org3').hide();
    } else if (type == 21 || type == 22) {
        //返回大仓
        $('.org2').show();
        $('.org1').hide();
        $('.org3').hide();
    } else if (type == 23) {
        $('.org3').show();
        $('.org1').hide();
        $('.org2').hide();
    }
}

//选择机构时候选择对应的可调拨商品
function selectOrg(obj) {
    getSampleGoods($('#from_org_id').val());
}

//获取可调拨商品
function getSampleGoods(org) {
    $('#transfer-list').empty();
    var layerIndex = layer.load(0, {
        shade: [0.2, '#000']
    });
    $.ajax({
        cache: false,
        type: "GET",
        url: '/sample/transfer/get-sample-goods?org=' + org,
        error: function (request) {
            Utils.Toastr.Error('失败', '网络错误');
            layer.close(layerIndex);
        },
        success: function (data) {
            categoryTreeVal = jQuery.parseJSON(data);
            categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
            layer.close(layerIndex);
        }
    });
}


$(function () {
    document.onkeydown = function(e) {
        var e = e || event;
        if(e.keyCode == 13) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
    }
    var from_org_id = $('#from_org_id').val()
    if (from_org_id !== null && from_org_id !== undefined && from_org_id !== '') {
        getSampleGoods(from_org_id);
    }
    $(document).on('click', '.cancel-current', function () {
        if ($('#categoryTreeSearchInput').val() != '') {
            $('#categoryTreeSearchInput').val('');
            $.zTreeResearch();
        }
        categoryTree.checkNode(categoryTree.getNodeByTId($(this).attr('data-zt-tid')), false, true, true);
    });

    //提交调拨
    $(document).on('click', "#transfer-submit", function(){
        $("#transfer-submit").prop('disabled', true);
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.ajax({
            url : '/sample/transfer/create',
            type : "POST",
            data : $("#transfer-list-batch-add-form").serialize(),
            cache :false,
            error:function(){
                Utils.Toastr.Error('Error', '网络问题');
                layer.close(layerIndex);
            },
            success : function(data) {
                if(data.code == 0)
                {
                    Utils.Toastr.Info('info', 'success');
                    window.location.href = "/sample/transfer/index";
                }
                else
                {
                    $("#transfer-submit").prop('disabled', false);
                    Utils.Toastr.Info('info', data.msg);
                    layer.close(layerIndex);
                }
            }
        });

    });

    //提交发货
    $(document).on('click', "#transfer-send", function(){
        $("#transfer-send").prop('disabled', true);
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.ajax({
            url : '/sample/transfer/send?id='+$('#transfer_id').val(),
            type : "POST",
            data : $("#transfer-sn-list-form").serialize(),
            cache :false,
            error:function(){
                Utils.Toastr.Error('Error', '网络问题');
                $("#transfer-send").prop('disabled', false);
                layer.close(layerIndex);
            },
            success : function(data) {
                if(data.code == 0)
                {
                    window.location.href = "/sample/transfer/index";
                }
                else
                {
                    $("#transfer-send").prop('disabled', false);
                    Utils.Toastr.Info('info', data.msg);
                    layer.close(layerIndex);
                }
            }
        });

    });

    //入库
    $(document).on('click', "#transfer-instorage", function(){
        var params = new Array();
        $("input[name='rep_id[]']:checked").each(function () {
            params.push($(this).val());
        });
        if (0 == params.length) {
            layer.msg('您没有勾选任何要签收的商品，请选择要签收的商品', {icon: 2});
            return;
        }
        $("#transfer-instorage").prop('disabled', true);
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var params_unchecked = new Array();
        if($('.select-on-check-all').is(':checked')){
            var msg = '签收代表您已经收到货物且对机器进行了验收确认账实相符，您确认签收全部商品吗？';
            var is_all = 1;
        }else{
            var is_all = 0;
            var msg = '您将要对部分商品进行签收，未签收的商品系统将自动创建逆向调拨单，请在系统中进行配货并将未签收的商品寄回发货机构。未签收的商品：';
            $("input[name='rep_id[]']:not(:checked)").each(function () {
                msg += ($(this).val())+',';
                params_unchecked.push($(this).val());
            });
        }
        layer.confirm(msg, {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.post('/sample/transfer/instorage?id='+$('#transfer_id').val(), {'is_all':is_all, 'goods_id': params, 'goods_id_unchecked' : params_unchecked}, function (rs) {
                if (rs.code == 0) {
                    Utils.Toastr.Info('提示', 'success');
                    window.location.href = "/sample/transfer/index";
                } else {
                    Utils.Toastr.Info('提示', rs.msg);
                    layer.closeAll();
                    $("#transfer-instorage").prop('disabled', false);
                }
            })
        }, function () {
            layer.closeAll();
            $("#transfer-instorage").prop('disabled', false);
        });

    });

    //整单拒收
    $(document).on('click', "#transfer-instorage-reject", function(){
        var params = new Array();
        $("input[name='rep_id[]']:checked").each(function () {
            params.push($(this).val());
        });
        if (0 != params.length) {
            layer.msg('如果整单拒收，您无需勾选任何商品', {icon: 2});
            return;
        }
        layer.confirm("您将要对整单拒收，拒收的商品系统将自动创建逆向调拨单，请在系统中进行配货并将未签收的商品寄回发货机构。 \n"+'您确定整单拒收吗？', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.post('/sample/transfer/receive-reject?id='+$('#transfer_id').val(), null, function (rs) {
                if (rs.code == 0) {
                    Utils.Toastr.Info('提示', 'success');
                    window.location.href = "/sample/transfer/index";
                } else {
                    Utils.Toastr.Info('提示', rs.msg);
                    layer.closeAll();
                    $("#transfer-instorage-reject").prop('disabled', false);
                }
            })
        }, function () {
            layer.closeAll();
            $("#transfer-instorage-reject").prop('disabled', false);
        });

    });

    //关闭调拨单
    $(document).on('click', '#transfer-close', function () {
        var url = $(this).data('url');
        layer.confirm('您确定关闭该调拨单吗?', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.ajax({
                url: url,
                type: 'get',
                success: function (ret) {
                    if (0 === ret.code) {
                        Utils.Toastr.Success('成功', ret.msg);
                        $.pjax.reload({container: '#gridview-pjax'});
                    } else {
                        Utils.Toastr.Error('失败', ret.msg);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            });
        }, function () {

        });
    });

    //审核通过
    $(document).on('click', "#transfer-audit-pass", function(){
        var audit_remark = $('#audit-remark').val();
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $("#transfer-audit-reject").prop('disabled', true);
        $.post('/sample/transfer/approve?id=' + $('#transfer_id').val(), {'remark': audit_remark, 'pass': 1}, function (rs) {
            if (rs.code == 0) {
                history.back(-1);
            } else {
                Utils.Toastr.Info('提示', rs.msg);
                $("#transfer-audit-reject").prop('disabled', false);
                layer.close(layerIndex);
            }
        })
    });

    //审核拒绝
    $(document).on('click', "#transfer-audit-reject", function(){
        var audit_remark = $('#audit-remark').val();
        if (audit_remark == '') {
            Utils.Toastr.Info('提示', '请输入驳回原因');
            return;
        }
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $("#transfer-audit-reject").prop('disabled', true);
        $.post('/sample/transfer/approve?id=' + $('#transfer_id').val(), {'remark': audit_remark, 'pass': 0}, function (rs) {
            if (rs.code == 0) {
                history.back(-1);
            } else {
                Utils.Toastr.Info('提示', rs.msg);
                $("#transfer-audit-reject").prop('disabled', false);
                layer.close(layerIndex);
            }
        })
    });

    $('body').on('hidden.bs.modal', '.modal', function () {
        $('#input-imei').blur();
        $('#input-imei')[0].blur();
        $(document).off('click', "#btn-imei-add");
        $(document).off('keydown', '#input-imei');
        $(document).off('submit', '#sample-scan-form');
        $(this).removeData("bs.modal");
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });

    $('body').on('shown.bs.modal', '.modal', function () {
        $('#input-imei').focus();
    });

    $.extend({
        initThirdPlugins: function () {
            $(document).on('submit', '#sample-scan-form', function () {
                return false;
            });
            $(document).on('keydown', '#input-imei', function (event) {
                if ($(this).attr('data-ta') == 0 && event.keyCode == 13) {
                    $('#btn-imei-add').click();
                    return;
                }
            });
            $(document).on('click', '#btn-imei-add', function () {
                // var layerIndex = layer.load(0, {
                //     shade: [0.2, '#000']
                // });
                $.post($('#sample-scan-form').attr('action'), $('#sample-scan-form').serialize(), function (rs) {
                    if (rs.code == 0) {
                        // layer.close(layerIndex);
                        var datas = rs.data.imeiList;
                        if (parseInt($('#total-count-tip')[0].innerHTML) < (parseInt($('#scan-count-tip')[0].innerHTML) + datas.length)) {
                            Utils.Toastr.Info('提示', '超出总数量');
                        } else {
                            // var isAllPass = rs.data.allPass;
                            var triId = rs.data.triId;
                            var orginNum = parseInt($('#scan-count-tip').html());
                            var addNum = datas.length;
                            var alreadyScanSN = new Array();
                            var scanTable = document.getElementById("tb-scan-total");

                            for (var i = 1; i < scanTable.rows.length; i++) {    //遍历Table的所有Row
                                alreadyScanSN.push(scanTable.rows[i].cells[0].innerHTML);
                            }
                            datas.forEach(function (dataItem) {
                                if (!in_array(dataItem.sn, alreadyScanSN)) {
                                    $('#tb-scan-ret').append('<tr><td>' + dataItem.sn + '</td><td><i class="material-icons md-12 scaned-li" style="cursor: pointer" data-tri-id="' + triId + '" data-id="' + dataItem.id + '">remove_circle_outline </i></td></tr>');
                                } else {
                                    Utils.Toastr.Info('提示', '已经为您去掉重复提交的商品');
                                    addNum--;
                                }
                            });
                            $('#input-imei').val('');
                            $('#input-imei').focus();
                            $('#scan-count-tip').html(orginNum + addNum);
                        }

                    } else if (rs.code > 0) {
                        // layer.close(layerIndex);
                        if ($('#input-imei').attr('data-ta') == 0) {
                            $('#input-imei').val('');
                        }
                        $('#input-imei').focus();
                        Utils.Toastr.Info('提示', rs.msg);
                    } else {
                        layer.close(layerIndex);
                        if ($('#input-imei').attr('data-ta') == 0) {
                            $('#input-imei').val('');
                        }
                        $('#input-imei').focus();
                        Utils.Toastr.Error('失败', rs.msg);
                    }
                }, "json");
            });

            $('#tb-scan-ret').on('click', '.scaned-li', function () {
                var layerIndex = layer.load(0, {
                    shade: [0.2, '#000']
                });
                var scanItemId = $(this).attr('data-id');
                var triId = $(this).attr('data-tri-id');
                var parentTr = $(this).parent().parent();
                var orginNum = parseInt($('#scan-count-tip').html());
                layer.close(layerIndex);
                parentTr.remove();
                if ($('.tri-btn-' + triId).length > 0) {
                    $('.tri-btn-' + triId).first().parent().parent().show();
                }
                $('#scan-count-tip').html(orginNum - 1);
                $('#input-imei').focus();
                Utils.Toastr.Success('移除成功');
            });

            $('#submit_sn').on('click', function () {
                var scanTable = document.getElementById("tb-scan-total");
                var snStr = "";
                var row = scanTable.rows.length;
                if (0 && parseInt($('#total-count-tip')[0].innerHTML) != row-1) {
                    Utils.Toastr.Error('扫描的商品数量不足');
                } else {
                    var goodsId = $("#goods_id").val();
                    for (var i = 1; i < row; i++) {
                        snStr += scanTable.rows[i].cells[0].innerHTML + ',';
                    }
                    snStr = snStr.substring(0, snStr.lastIndexOf(','));
                    var transferItemId = $('#transferItemId').val();
                    $('#scan-button-'+transferItemId).parent().prev().text(snStr);
                    $('#sn_sku-'+transferItemId).val(snStr);
                    $('#m-a-a').modal('hide');
                }

            });
            $('#input-imei').focus();
            // $('#input-imei')[0].focus();
        },
        commonAjaxSubmitBefore: function () {
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
        },
        commonAjaxSubmitAfter: function () {
            // layer.closeAll();
        }
    });

});

function in_array(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}
function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
}
