$(function () {
    $(document).on('click', '#auditok', function () {
        var remark = $('#audit-remark').val();
        if (remark == '') {
            remark = '通过';
        }
        var id = $('#order_id').val();
        $.post('audit?id=' + id, {'pass': 1, 'remark': remark}, function (rs) {
            if (rs.code == 0) {
                history.back(-1)
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });

    $(document).on('click', '#auditnok', function () {
        var remark = $('#audit-remark').val();
        if (remark == '') {
            Utils.Toastr.Info('提示', '请输入驳回原因');
            return;
        }
        var id = $('#order_id').val();
        $.post('audit?id=' + id, {'pass': 0, 'remark': remark}, function (rs) {
            if (rs.code == 0) {
                history.back(-1);
            } else {
                Utils.Toastr.Info('提示', rs.msg);
            }
        })
    });
});