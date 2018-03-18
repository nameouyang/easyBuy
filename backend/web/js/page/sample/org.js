$(function(){
    $(document).on('click', "#sample-org", function(){
        $("#sample-org").prop('disabled', true);
        $.ajax({
            url : $("#common-form").attr('action'),
            type : "POST",
            data : $("#common-form").serialize(),
            cache :false,
            success : function(data) {
                if(data.code == 0)
                {
                    //返回到机构列表页面
                    window.location.href = "index";
                }
                else
                {
                    $("#sample-org").prop('disabled', false);
                    Utils.Toastr.Info('info', data.msg);
                }
            },
            // error: function () {
            //     Utils.Toastr.Error('异常', '系统错误');
            // }
        });

    });
})
