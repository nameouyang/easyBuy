/**
 * Created by zhangxiaolong on 17/01/06.
 */

$(function () {


    $("#all_check").click(function(){

        if($("#all_check").prop("checked"))
        {

            $("input[name='areaids']").each(function(){
                $(this).prop('checked', true)
            })

        }else{
            $("input[name='areaids']").each(function(){

                $(this).prop("checked",false);
            })
        }

    })


    $(document).on('click', '#task-submit', function () {


        var org_ids=[];
        var task_type=$("#task_type").val();

        $("input[name^='areaids']").each(function () {
            if($(this).prop("checked")){
                var org_id = $(this).attr('data-id');
                org_ids.push(org_id);
            }

        });

        var start_time=$("input[name='date_begin']").val();


        if (org_ids.length== 0) {
            Utils.Toastr.Info('机构必选', '请选择机构列表');
            return;
        }

        if(task_type=='1'){

            if (start_time=='') {
                Utils.Toastr.Info('开始时间为空', '请设置开始时间');
                return;
            }


        }




        $.post("/stockcounting/task/create-task",
            {
                "task_type":task_type,
                "org_ids": org_ids,
                "start_time": start_time
            },
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    if(task_type=='1'){
                        window.location.href = '/stockcounting/task/list';
                    }else{
                        window.location.href = '/stockcounting/task/list-by-finance';
                    }



                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
                //layer.close(layerIndex);
            },
            "json");

    });

    $(document).on('click', '.cancel', function () {

        var task_id=$("#task_id").val();
        var org_id=$(this).attr('name');

        $.post("/stockcounting/task/cancel-org",
            {
                "task_id":task_id,
                "org_id": org_id
            },
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    //window.location.reload();
                    //window.location.href = '/mistock/in-out-stock/stock-transfer-apply-search';
                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
            },
            "json");

    })






    $(document).on('click', '.org-item', function () {

        if($(this).find("input[name='areaids']").prop("checked"))
        {
            $(this).find("input[name='areaids']").prop("checked",false);
            $(this).css('background-color','#fff');
        }else{
            $(this).find("input[name='areaids']").prop("checked",true);
            $(this).css('background-color','#efefef');
        }
    })


    $(document).on('click', '.checkbox-item', function () {
        if($(this).prop("checked"))
        {
            $(this).prop("checked",false);
        }else{
            $(this).prop("checked",true);
        }
    })





    $(document).on('click', '.cancel-task', function () {

        var task_id=$(this).attr('name');

        $.post("/stockcounting/task/cancel-task",
            {
                "task_id":task_id
            },
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.reload();
                    //window.location.href = '/mistock/in-out-stock/stock-transfer-apply-search';
                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }
            },
            "json");

    })








});