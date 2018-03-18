/**
 * Created by zhangxiaolong on 17/01/06.
 */

$(function () {





    $(document).on('change', '.count_num', function () {

        var num=$(this).val();
        var sku=$(this).attr("data-sku");
        var unit_type=$(this).attr("data-unit");
        var task_item_id=$("#task_item_id").val();
        //console.log(num)
        //console.log(sku)
        //console.log(task_item_id)
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        var _this=$(this)


        $.post("/stockcounting/task/query-sku-has-diff",
            {
                "task_item_id":task_item_id,
                "macno": sku,
                "unit_type":unit_type,
                "count_num": num
            },
            function (data) {
                layer.closeAll();
                if (data.code == 0) {
                    console.log(data.msg);
                    Utils.Toastr.Success('成功', data.msg);
                    var tips=data.data.has_diff_msg;
                    _this.parent().next().html(tips);
                    var has_diff= data.data.has_diff;
                    var diff_price= data.data.diff_price;
                    var is_serial= data.data.is_serial;

                    if(has_diff=='1'){
                        if(is_serial=='1'){
                            _this.parent().next().next().find("a").removeClass('hide');
                        }

                    }else{
                        _this.parent().next().next().find("a").addClass('hide');
                    }

                    if(diff_price>='500'){
                        _this.parent().parent().css("background-color",'#fbc500');
                        _this.parent().parent().css("background-clip",'padding-box');
                    }else{
                        _this.parent().parent().css("background-color",'#fff');
                    }



                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
            },
            "json");

    });






    $(document).on('click', '#show_diff', function () {


        if($(this).prop("checked"))
        {
            $(".sku-list tr").each(function () {
                var msg=$(this).find(".has_diff span").html();

                if(msg=='有差异'){
                    $(this).show();
                }else{
                    $(this).hide();
                }

            });


            $(".report-list tr").each(function () {
                var msg=$(this).find(".has_diff span").html();

                if(msg!='0'){
                    $(this).show();
                }else{
                    $(this).hide();
                }

            });






        }else{
            $(".sku-list tr").each(function () {
                $(this).show();
            });

            $(".report-list tr").each(function () {
                $(this).show();
            });


        }





        });




    $('#input-sn').keypress(function(event){
        var keynum = (event.keyCode ? event.keyCode : event.which);
        if(keynum == '13'){
            $("#btn-sn-add").trigger("click");
        }
    });



    $(document).on('click', '#btn-sn-add', function () {

        var sn=$("#input-sn").val();

        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        $.post($('#scan-form').attr('action'),
            $('#scan-form').serialize(),
            function (data) {
                layer.close(layerIndex);
                if (data.code == 1) {
                    //console.log(data.msg);
                    //Utils.Toastr.Success('成功', data.msg);
                    $("#tb-scan-ret-pre").hide();
                    $('#tb-scan-ret').append('<tr ><td>' + data.sku + '</td><td>' + data.macname + '</td><td>' + data.sn  + '</td><td><i class="material-icons md-12 scaned-li" style="cursor: pointer"  data-id="' + data.diff_id + '">remove_circle_outline </i></td></tr>')

                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
            },
            "json");


    })




    $.extend({
        initThirdPlugins: function () {
            $(document).on('submit', '#scan-form', function () {
                return false;
            });

            $('#tb-scan-ret').on('click', '.scaned-li', function () {
                var layerIndex = layer.load(0, {
                    shade: [0.2, '#000']
                });
                var diff_id = $(this).attr('data-id');
                var parentTr = $(this).parent().parent();
                $.post('/stockcounting/task/remove-scan', 'id=' + diff_id, function (rs) {
                    if (rs.code == 0) {
                        layer.close(layerIndex);
                        parentTr.remove();
                        $('#input-sn').focus();
                        Utils.Toastr.Success('移除成功', rs.msg);
                    } else {
                        $('#input-sn').focus();
                        Utils.Toastr.Error('移除失败', rs.msg);
                    }
                }, "json");
            });


        },
        commonAjaxSubmitBefore: function () {
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
        },
        commonAjaxSubmitAfter: function () {
            layer.closeAll();
        }

    })







    $(document).on('click', '#sc-submit', function () {

        layer.confirm('数据一旦提交，将无法更改，确认提交将默认您对本次盘点结果负责，您确定提交吗?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {


        var task_item_id=$("#task_item_id").val();
            postAuditResult(task_item_id, 1);
            layer.close(index);
        }, function () {
        });
    });




    function postAuditResult(task_item_id, status) {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.post("/stockcounting/task/finish-item?task_item_id=" + task_item_id, {'status': status}, function (rs) {
            if (rs.code == 0) {

                layer.close(layerIndex);
                Utils.Toastr.Success('审核成功', rs.msg);
                window.location.href = '/stockcounting/task/item-list';
            } else {
                layer.close(layerIndex);
                Utils.Toastr.Error('审核失败', rs.msg);

            }
        }, "json");
    }





    $(document).on('click', '#spot-checks-submit', function () {

        layer.confirm('数据一旦提交，将无法更改，您确定提交吗?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {

            var task_item_id=$("#task_item_id").val();


            var ids=[];

            $("input[name^='selection']").each(function () {
                if($(this).prop("checked")){
                    var sku_id = $(this).val();
                    ids.push(sku_id);
                }

            });


            //console.log(ids);


            $.post("/stockcounting/task/spot-checks-sku",
                {
                    "ids":ids,
                    "task_item_id": task_item_id
                },
                function (data) {
                    if (data.code == 0) {
                        Utils.Toastr.Success('成功', data.msg);

                        window.location.href = '/stockcounting/task/item-sku-list-by-finance?id='+task_item_id;


                    } else {
                        Utils.Toastr.Error('失败', data.msg);
                    }
                    //layer.close(layerIndex);
                },
                "json");






            layer.close(index);
        }, function () {
        });
    });









});