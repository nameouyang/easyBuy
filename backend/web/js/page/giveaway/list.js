/**
 * Created by zhangxiaolong on 17/12/26.
 */
$(function () {



    $(document).on('click', '.sms', function () {
        // 数据校验
        var id = $(this).attr("data-id");
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.post("/giveaway/index/notice",
            {
                "id":id
            },
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);

                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
                layer.close(layerIndex);
            },
            "json");

    });



});
