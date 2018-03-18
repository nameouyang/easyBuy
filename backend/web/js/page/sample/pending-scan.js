$(function () {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $('#input-imei').blur();
        //$('#input-imei')[0].blur();
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
                var layerIndex = layer.load(0, {
                    shade: [0.2, '#000']
                });
                $.post($('#sample-scan-form').attr('action'), $('#sample-scan-form').serialize(), function (rs) {
                    if (rs.code == 0) {
                        layer.close(layerIndex);
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

            $('#submit').on('click', function () {
                var scanTable = document.getElementById("tb-scan-total");
                var snStr = "";
                var row = scanTable.rows.length;
                if (row == 1) {
                    Utils.Toastr.Error('请扫描对应的商品');
                } else {
                    var sampleId = $("#sample_id").val();
                    for (var i = 1; i < row; i++) {
                        snStr += scanTable.rows[i].cells[0].innerHTML + ',';
                    }
                    snStr = snStr.substring(0, snStr.lastIndexOf(','));
                    var sampleTable = document.getElementById("table_sample");
                    var sampleRow = sampleTable.rows.length - 2;
                    var tableInfo = '';
                    for (var i = 1; i < sampleTable.rows.length - 1; i++) {    //遍历Table的所有Row
                        if (sampleTable.rows[i].cells[1].innerHTML == sampleId) {
                            sampleTable.rows[i].cells[5].innerHTML = row - 1;
                            sampleTable.rows[i].cells[6].innerHTML = snStr;
                            break;
                        }
                    }
                    $('#m-a-a-a').modal('hide');
                }
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
