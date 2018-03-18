/**
 * Created by zhangxiaolong on 17/01/06.
 */

$(function () {





    $(document).on('click', '.start', function () {

        var task_item_id=$(this).attr("data-item-id");
        //console.log(task_item_id);
        window.location.href = '/stockcounting/task/item-sku-list?id='+task_item_id;
    });


    $(document).on('click', '.choose-goods', function () {

        var task_item_id=$(this).attr("data-item-id");
        //console.log(task_item_id);
        window.location.href = '/stockcounting/task/spot-checks-list?id='+task_item_id;
    });


    $(document).on('click', '.cancel-task-item', function () {


        var id=$(this).attr('date-id');
        var task_type=$("#task_type").val();
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        $.post("/stockcounting/task/cancel-task-item",
            {
                "id": id,
                "task_type":task_type
            },
            function (data) {
                layer.closeAll();
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.reload();
                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
            },
            "json");

    });














});