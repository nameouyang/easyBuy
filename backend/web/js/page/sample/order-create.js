$(function () {
    $(document).on('click', '#search-sku', function () {
        var sku_code = $("#sku-code").val();
        if (!sku_code) {
            Utils.Toastr.Info('提示', 'sku为空');
        }
        var org_id = $('#org_select').val();
        $.get("check?goods_id=" + sku_code + "&org_id=" + org_id, function (rs) {
            if (rs.code == 0) {
                $("#sku-code").val('');
                $("#sku-code").focus();
                var orderTable = document.getElementById("tb-order-total");
                for (var i = 1; i < orderTable.rows.length; i++) {    //遍历Table的所有Row
                    if (orderTable.rows[i].cells[0].innerHTML == sku_code) {
                        Utils.Toastr.Info('提示', 'sku已存在列表中');
                        return;
                    }
                }
                var datas = rs.data;
                $('#tb-order-body').prepend('<tr><td>' + datas.goods_id + '</td><td>' + datas.goods_name + '</td><td>' + datas.sample_num + '</td><td><input type="text" class="form-control"></td><td><i class="material-icons md-12 scaned-li" style="cursor: pointer" data-tri-id="' + +'" data-id="' + datas.goods_id + '">remove_circle_outline </i></td></tr>');
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        });
    });

    $(document).on('click', '.scaned-li', function () {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var parentTr = $(this).parent().parent();
        layer.close(layerIndex);
        parentTr.remove();
        Utils.Toastr.Success('移除成功');
    });

    $(document).on('click', '#submit', function () {
        var orderTable = document.getElementById("tb-order-body");
        var row = orderTable.rows.length;
        if (row == 0) {
            Utils.Toastr.Error('请先加入商品');
        } else {
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
            params = new Object();
            paramSku = new Array();
            paramNum = new Array();
            $('#tb-order-total input').each(function () {
                var num = $(this).val();
                if (!num || parseInt(num, 10) === num) {
                    Utils.Toastr.Error('请输入数字');
                    return;
                }
                paramNum.push(num);
                paramSku.push($(this).closest("tr").find("td").eq(0)[0].innerHTML);
            });
            params.num = paramNum;
            params.sku = paramSku;
            params.org = $('#org_select').val();
            params.reason = $("#apply-reason").val();
            $("#submit").attr("disabled", true);
            $.ajax({
                url: "create",
                type: 'post',
                data: params,
                success: function (ret) {
                    layer.closeAll();
                    if (0 === ret.code) {
                        Utils.Toastr.Success('成功', ret.msg);
                        $('#m-a-a-a').modal('hide');
                        window.location.reload();
                    } else {
                        Utils.Toastr.Error('失败', ret.msg);
                        $("#submit").attr("disabled", false);
                    }
                },
                error: function () {
                    layer.close(layerIndex);
                    Utils.Toastr.Error('异常', '系统错误');
                }
            });
        }
    });

    $(document).on('change', '#org_select', function () {
        var orgId = $('#org_select').val();
        if ( orgId == '') {
            return;
        }
        $('#order-create-form').show();
    });

});


