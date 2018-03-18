$(function () {

    $('body').on('hidden.bs.modal', '.modal', function () {
        $('#input-imei').blur();
        $('#input-imei')[0].blur();
        $(document).off('click', "#btn-imei-add");
        $(document).off('keydown', '#input-imei');
        $(document).off('submit', '#aftersale-transfer-scan');
        $(document).off('click', "a.glyphicon-trash");
        $(this).removeData("bs.modal");
        $("#m-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });

    $('body').on('shown.bs.modal', '.modal', function () {
        $('#input-imei').focus();
    });

    $.extend({
        initThirdPlugins: function () {
            $(document).on('submit', '#aftersale-transfer-scan', function () {
                return false;
            });
            $(document).on('keydown', '#input-imei', function (event) {
                if ($(this).attr('data-ta') == 0 && event.keyCode == 13) {
                    $('#btn-imei-add').click();
                    return;
                }
            });
            $(document).on('click', '#btn-imei-add', function () {
                var imei = $("#input-imei").val();
                var scanNum = parseInt($("#scan-count-tip").text());
                var showKey = "has-scan-" + $("#sku").val();
                $.post("/aftersale/transfer/scan",
                    {
                        query: imei,
                        sku: $("#sku").val(),
                        transfer_id: $("#transfer-id").val(),
                        transfer_item_id: $("#transfer-item-id").val()
                    },
                    function (result) {
                        if (result.code == 200) {
                            var itemHtml = '<tr>';
                            itemHtml += '<td class="text-center">' + result.data.imei + '</td>';
                            itemHtml += '<td class="text-center">' + result.data.sn + '</td>';
                            itemHtml += '<td class="text-center">' + result.data.meid + '</td>';
                            itemHtml += '<td class="text-center"><a title="删除" class="glyphicon glyphicon-trash" id="'+result.data.id+'"></a></td>';
                            $("#tb-scan-ret").prepend(itemHtml);
                            if ($("#tb-scan-ret-pre").length>0){
                                $("#tb-scan-ret-pre").remove();
                            }
                            scanNum += 1;
                            $("#scan-count-tip").text(scanNum);
                            $("#" + showKey).text(scanNum);
                            Utils.Toastr.Success('成功', '扫描成功');
                        } else if (result.code == 10001 || result.code == 10002) {
                            Utils.Toastr.Info('提示', result.msg);
                        } else {
                            Utils.Toastr.Error('失败', '扫描失败');
                        }
                    }, "json");
            });

            $(document).on('click', 'a.glyphicon-trash', function () {
                var itemInfoId = $(this).attr('id');
                var $rmObj = $(this).parent().parent();
                var scanNum = parseInt($("#scan-count-tip").text());
                var showKey = "has-scan-" + $("#sku").val();
                $.post("/aftersale/transfer/del-scan",
                    {
                        id: itemInfoId
                    },
                    function (result) {
                        if (result.code == 200) {
                            $rmObj.remove();
                            if (scanNum>0){
                                scanNum -= 1;
                                $("#scan-count-tip").text(scanNum);
                                $("#" + showKey).text(scanNum);
                            }
                            Utils.Toastr.Success('成功', '删除成功');
                        } else if (result.code == 10001 || result.code == 10002) {
                            Utils.Toastr.Info('提示', result.msg);
                        } else {
                            Utils.Toastr.Error('失败', '删除失败');
                        }
                    }, "json");
            });

        }
    });

});