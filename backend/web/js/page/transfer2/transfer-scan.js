$(function () {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $('#input-imei').blur();
        $('#input-imei')[0].blur();
        $(document).off('click', "#btn-imei-add");
        $(document).off('keydown', '#input-imei');
        $(document).off('submit', '#transfer-scan-form');
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
            $(document).on('submit', '#transfer-scan-form', function () {
                return false;
            });
            $(document).on('keydown', '#input-imei', function (event) {
                if ($(this).attr('data-ta') == 0 && event.keyCode == 13) {
                    $('#btn-imei-add').click();
                    return;
                }
            });
            $(document).on('click', '#btn-imei-add', function () {
                var layerIndex = layer.load(0, {
                    shade: [0.2, '#000']
                });
                $.post($('#transfer-scan-form').attr('action'), $('#transfer-scan-form').serialize(), function (rs) {
                    if (rs.code == 0) {
                        layer.close(layerIndex);
                        $('#tb-scan-ret-pre').remove();
                        var datas = rs.data.imeiList;
                        var isAllPass = rs.data.allPass;
                        var triId = rs.data.triId;
                        var orginNum = parseInt($('#scan-count-tip').html());
                        datas.forEach(function (dataItem) {
                            $('#tb-scan-ret').append('<tr><td>' + dataItem.imei + '</td><td>' + dataItem.sn + '</td><td></td><td><i class="material-icons md-12 scaned-li" style="cursor: pointer" data-tri-id="' + triId + '" data-id="' + dataItem.id + '">remove_circle_outline </i></td></tr>')
                        });
                        if (isAllPass == 1 && $('.tri-btn-' + triId).length > 0) {
                            $('.tri-btn-' + triId).first().parent().parent().hide();
                        }
                        if (isAllPass == 1) {
                            $('#m-a-a-a').modal('hide');
                        }
                        $('#input-imei').val('');
                        $('#input-imei').focus();
                        $('#scan-count-tip').html(orginNum + datas.length);
                        Utils.Toastr.Success('成功', rs.msg);
                    } else if (rs.code > 0) {
                        layer.close(layerIndex);
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
                var isShip = $('#isShip').text();
                var scanItemId = $(this).attr('data-id');
                var triId = $(this).attr('data-tri-id');
                var parentTr = $(this).parent().parent();
                var orginNum = parseInt($('#scan-count-tip').html());
                $.post('/transfer2/transfer/remove-scan?id=' + scanItemId +'&isShip='+ isShip, function (rs) {
                    if (rs.code == 0) {
                        layer.close(layerIndex);
                        parentTr.remove();
                        if ($('.tri-btn-' + triId).length > 0) {
                            $('.tri-btn-' + triId).first().parent().parent().show();
                        }
                        $('#scan-count-tip').html(orginNum - 1);
                        $('#input-imei').focus();
                        Utils.Toastr.Success('移除成功', rs.msg);
                    } else {
                        layer.close(layerIndex);
                        $('#input-imei').focus();
                        Utils.Toastr.Error('移除失败', rs.msg);
                    }
                }, "json");
            });
            $('#input-imei').focus();
            $('#input-imei')[0].focus();
        },
        commonAjaxSubmitBefore: function () {
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
        },
        commonAjaxSubmitAfter: function () {
            layer.closeAll();
        }
    });
});