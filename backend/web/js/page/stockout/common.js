$(function () {

    /*$("input[status='-1']").css("display","none");*/

    $(document).on('click', '#batch-del-btn', function () {
        layer.confirm('您确定要删除选中的项？', {
            btn: ['确定', '取消']
        }, function () {
            params = new Object();
            paramValue = new Array();
            $("input[name='rep_id[]']:checked").each(function () {
                paramValue.push($(this).val());
            });
            params.id = paramValue;
            if (0 == paramValue.length)
            {
                layer.msg('请选择您需要删除的项', {icon: 2});
                return;
            }
            $.ajax({
                url: $('#batch-del-btn').attr('data-url'),
                type: 'post',
                data: $.param(params),
                success: function (ret) {
                    layer.closeAll()
                    if (0 === ret.code)
                    {
                        Utils.Toastr.Success('删除成功', ret.msg);
                        $.pjax.reload({container: '#gridview-pjax'});
                    } else {
                        Utils.Toastr.Error('删除失败', ret.msg);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            });

        }, function () {

        });
    });

    $(document).on('click', '#batch-notice-btn', function () {
        layer.confirm('您确定要通知选中的项？', {
            btn: ['确定', '取消']
        }, function () {
            params = new Object();
            paramValue = new Array();
            $("input[name='rep_id[]']:checked").each(function () {
                if($(this).attr('able') == null || $(this).attr('able')=='') { //判断是否可选
                    paramValue.push($(this).val());
                }
            });
            params.id = paramValue;
            if (0 == paramValue.length)
            {
                layer.msg('请选择您需要通知的项', {icon: 2});
                return;
            }
            /*$.ajax({
                url: $('#batch-notice-btn').attr('data-url'),
                type: 'post',
                data: $.param(params),
                success: function (ret) {
                    layer.closeAll()
                    if (0 === ret.code)
                    {
                        Utils.Toastr.Success('通知成功', ret.msg);
                        $.pjax.reload({container: '#gridview-pjax'});
                    } else {
                        Utils.Toastr.Error('通知失败', ret.msg);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            });*/

        }, function () {

        });
    });

    $(document).on('click', '#time', function (e) {
        e.preventDefault();
        if($('#begin-date').val() == '' || $('#begin-date').val() == null) {
            Utils.Toastr.Warning('请选择取货日期');
        } else {
            params = new Object();
            paramValue = new Array();
            $("input[name='rep_id[]']:checked").each(function () {
                 if($(this).attr('able') == null || $(this).attr('able')=='') { //判断是否可选
                    paramValue.push($(this).val());
                 }
            });
            params.id = paramValue;
            params.date = $('#begin-date').val();
            if (0 == paramValue.length)
            {
                layer.msg('请选择您需要通知的项', {icon: 2});
                return;
            } else {
                $.ajax({
                    url: '/stockout/stockout/batch-notice',
                    type: 'post',
                    data: $.param(params),
                    success: function (ret) {
                        layer.closeAll();
                        if (0 === ret.code)
                        {
                            Utils.Toastr.Success('通知成功', ret.msg);
                            window.location.reload();
                            //$.pjax.reload({container: '#gridview-pjax'});
                        } else {
                            Utils.Toastr.Error('通知失败', ret.msg);
                            window.location.reload();
                            //$.pjax.reload({container: '#gridview-pjax'});
                        }
                    },
                    error: function () {
                        Utils.Toastr.Error('异常', '系统错误');
                    }
                });
            }
        }
    });

    $(document).on('click', '#timeOne', function (e) {
        e.preventDefault();
        if($('#begin-date').val() == '' || $('#begin-date').val() == null) {
            Utils.Toastr.Warning('请选择取货日期');
        } else {
            params = new Object();
            params.id = $('#stockout-id').val();
            params.date = $('#begin-date').val();
            $.ajax({
                url: '/stockout/stockout/notice',
                type: 'post',
                data: $.param(params),
                success: function (ret) {
                    layer.closeAll();
                    if (0 === ret.code)
                    {
                        Utils.Toastr.Success('通知成功', ret.msg);
                        window.location.reload();
                    } else {
                        Utils.Toastr.Error('通知失败', ret.msg);
                        window.location.reload();
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            });
        }
    });

});
