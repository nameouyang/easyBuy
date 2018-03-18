/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function () {

    // 添加门店和分仓关系
    $(document).on('click', '#create-org-warehouse', function () {

        $.ajax({
            type: "POST",
            url: $('#org-warehouse-form').attr('action'),
            data: $('#org-warehouse-form').serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', '创建门店和分仓关系成功');
                    window.location.reload();
                } else if (data.code == 10001) {
                    Utils.Toastr.Error('失败', '添加门店和分仓关系失败');
                } else if (data.code == 1000 || data.code == 10002) {
                    Utils.Toastr.Info('提示', data.msg);
                }
            }
        });

    });


    $(document).on('click', '#update-org-warehouse', function () {

        $.ajax({
            type: "POST",
            url: $('#org-warehouse-form').attr('action'),
            data: $('#org-warehouse-form').serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', '更新门店和分仓关系成功');
                    window.location.reload();
                } else if (data.code == 10086) {
                    Utils.Toastr.Error('失败', '更新失败，要修改的关系已存在');
                } else {
                    Utils.Toastr.Info('提示', data.msg);
                }
            }
        });

    });

});
