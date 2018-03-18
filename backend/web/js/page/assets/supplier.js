
$(function () {
    $(document).on('click', '#delete-supplier', function () {
        var url = $(this).data('url');
        layer.confirm('您确定删除该供应商吗?', {
            btn: ['确定', '取消']
        }, function () {
            layer.closeAll();
            $.ajax({
                url: url,
                type: 'post',
                success: function (ret) {
                    if (0 === ret.code) {
                        Utils.Toastr.Success('成功', ret.msg);
                        window.location.reload();
                    } else {
                        Utils.Toastr.Info('失败', ret.msg);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            });
        }, function () {

        });
    });

    $(document).on('change', "#nationwide", function(){
        var selectNationwide = -1;
        $("input[type='checkbox']:checked").each(function(){
            if(selectNationwide == 1)
            {
                this.checked = false;
            }
            if(this.value == -1){
                selectNationwide = 1;
            }
        })
    });

    $(document).on('click', '#btn-edit', function(){
       var url = '/assets/supplier/' + $(this).data('url');
       var data = $(this).data('url') == 'create' ? $("#common-create-form").serialize() : $("#common-edit-form").serialize();
       $.ajax({
            cache : false,
            data : data,
            url : url,
            type : 'POST',
           error : function(error){
                Utils.Toastr.Error('Error', '网络问题');
           },
           success: function(data){
               if(data.code == 0)
               {
                   Utils.Toastr.Success('Success', data.msg);
                   window.location.href = "/assets/supplier/index";
               }
               else {
                   Utils.Toastr.Info('Info', data.msg);
               }
           }
       });
    });
});


