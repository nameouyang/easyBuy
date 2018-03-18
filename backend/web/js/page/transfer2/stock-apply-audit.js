$(function () {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $(this).removeData("bs.modal");
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $(document).on('click', '#btn-stock-apply-reject, #btn-stock-apply-jump', function () {
        var paramObj = new Object();
        paramObj.reject_mode = $(this).attr('data-mode');
        paramObj.reason = $('#reason').val();
        if (paramObj.reject_mode == 1) {
            layer.confirm('您确定要驳回？', {
                btn: ['确定', '取消'],
                title: '提示'
            }, function () {
                layer.closeAll();
                processReject(paramObj);
            }, function () {

            });
        } else {
            processReject(paramObj);
        }
    });

    function processReject(paramObj) {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.ajax({
            type: "POST",
            url: $('#common-ajax-form').attr('action'),
            data: $.param(paramObj),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                var nextId = 0;
                if (data.code == 0) {
                    nextId = data.data.next;
                    if (paramObj.reject_mode == 1) {
                        $('#sa-sp-ac-' + data.data.oid).html('');
                        $('#sa-sp-re-' + data.data.oid).html(data.data.reason);
                        $('#sa-sp-st-' + data.data.oid).removeClass('blue');
                        $('#sa-sp-st-' + data.data.oid).addClass('danger');
                        $('#sa-sp-st-' + data.data.oid).text('不处理');
                        Utils.Toastr.Success('成功', data.msg);
                    } else if ($('#input-fst-jump-id').val() < 1) {
                        $('#input-fst-jump-id').val(data.data.oid)
                        if (nextId == data.data.oid) {
                            nextId = 0;
                        }
                    } else if ($('#input-fst-jump-id').val() == nextId) {
                        $('#input-fst-jump-id').val(0);
                        nextId = 0;
                        Utils.Toastr.Success('成功', '所有审核项均处理完成');
                    }
                    layer.close(layerIndex);
                    loadNextAuditModal(nextId);
                } else {
                    Utils.Toastr.Error('失败', data.msg);
                    layer.close(layerIndex);
                }
            }
        });
    }

    $.extend({
        commonAjaxSubmitBefore: function () {
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
        },
        commonAjaxSubmitAfter: function (data) {
            if (data.code == 0) {
                loadNextAuditModal(data.data.next);
                $('#sa-sp-ac-' + data.data.oid).html('');
                $('#sa-sp-acn-' + data.data.oid).html(data.data.act_num);
                $('#sa-sp-re-' + data.data.oid).html(data.data.reason);
                $('#sa-sp-st-' + data.data.oid).removeClass('blue');
                $('#sa-sp-st-' + data.data.oid).addClass('success');
                $('#sa-sp-st-' + data.data.oid).text('已处理');
            }
            layer.closeAll();
        }
    });

    function loadNextAuditModal(auditId) {
        if (auditId == 0) {
            $("#m-a-a-a").modal('hide');
            return;
        }
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $("#m-a-a-a .modal-content").load('/transfer2/stock-apply/assign?id=' + auditId, function () {
            if ($("select").length > 0) {
                $('select').select2({theme: "bootstrap"});
            }
            var func = $['initThirdPlugins'];
            if (typeof (func) !== 'undefined')
            {
                func.apply('initThirdPlugins', []);
            }
            layer.close(layerIndex);
        });

    }
});


