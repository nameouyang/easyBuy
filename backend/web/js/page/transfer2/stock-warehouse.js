$(function () {

    $(document).on('click', '#btn-all-auto-assign', function () {
        layer.confirm('您确定要进行一次库存的全量自动分配？建议您在大仓无出入库操作时使用本功能', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
            $.ajax({
                cache: false,
                type: "GET",
                url: $('#btn-all-auto-assign').attr('data-url'),
                data: 'act=1',
                error: function (request) {
                    Utils.Toastr.Error('失败', '网络错误');
                    layer.close(layerIndex);
                },
                success: function (data) {
                    if (data.code == 0)
                    {
                        Utils.Toastr.Success('成功', data.msg);
                    } else {
                        Utils.Toastr.Info('失败', data.msg);
                    }
                    layer.close(layerIndex);
                }
            });
        });
    });


});

