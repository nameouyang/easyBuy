$(function () {
    $(document).on('click', '#batch-outbound-btn', function () {
        layer.confirm('您确定要领取出样选中的项？', {
            btn: ['确定', '取消']
        }, function () {
            params = new Object();
            paramValue = new Array();
            paramQuantity = new Array();
            paramSn = new Array();
            $("input[name='rep_id[]']:checked").each(function () {
                paramValue.push($(this).val());
                paramQuantity.push($(this).closest("tr").find("input[type='text']").val());
                paramSn.push($(this).closest("tr").find("td").eq(6)[0].innerHTML);
            });
            params.id = paramValue;
            params.quantity = paramQuantity;
            params.sn = paramSn;
            params.org = $('#selected_org_id').val();
            if (0 == paramValue.length) {
                layer.msg('请选择您需要取样的项', {icon: 2});
                return;
            }
            layer.closeAll()
            $.ajax({
                url: $('#batch-outbound-btn').attr('data-url'),
                type: 'post',
                data: $.param(params),
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

    $(document).on('change', '#org_select', function () {
        var orgId = $('#org_select').val();
        if ( orgId == '') {
            return;
        }
        $('#pending-search').submit();
    });

});


