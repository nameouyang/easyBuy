


/**
 * Created by ouyang on 17-11-15.
 */
$(function () {
    $(".stockout-goods-form").on("click", "#button-create", function (e) {
        e.preventDefault();
        $.post($(this).attr("data-tourl"), $("form").serialize(), function (result) {
            if (result.code === 200) {
                Utils.Toastr.Success('添加成功', result.msg);
                window.location.reload();
            } else {
                Utils.Toastr.Info('添加失败', result.msg);
            }
        });
    });

    $(".stockout-goods-form").on("click", "#button-update", function (e) {
        e.preventDefault();
        $.post($(this).attr("data-tourl"), $("form").serialize(), function (result) {
            if (result.code === 200) {
                Utils.Toastr.Success('更新成功', result.msg
            )
                ;
                window.location.reload();
            } else {
                Utils.Toastr.Info('更新失败', result.msg);
            }
        });
    });
});