$(function(){
    $(document).on('click', '#btn-create', function(){
        $.ajax({
            data : $('#common-create-form').serialize(),
            url  : $('#common-create-form').attr('action'),
            type : 'POST',
            error: function()
            {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data)
            {
                if(data.code == 0)
                {
                    Utils.Toastr.Success('成功', data.msg);
                    self.location.reload();
                }
                else
                {
                    Utils.Toastr.Warning('提示', data.msg);
                   // self.location.reload();
                }
            },
        });
    });

    $(document).on('click', '#btn-update', function(){
        console.log($('#common-edit-form').attr('action'));
        $.ajax({
            data : $('#common-edit-form').serialize(),
            url  : $('#common-edit-form').attr('action'),
            type : 'POST',
            error: function()
            {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data)
            {
                if(data.code == 0)
                {
                    Utils.Toastr.Success('成功', data.msg);
                    self.location.reload();
                }
                else
                {
                    Utils.Toastr.Warning('提示', data.msg);
                    //self.location.reload();
                }
            },
        });
    });
});