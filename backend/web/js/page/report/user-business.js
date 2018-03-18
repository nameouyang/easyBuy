$(function(){
    $(document).on('click','#btn-create',function(){
        $.ajax({
            cache: true,
            type: "POST",
            url: '/report/user-business/create',
            data:$('#common-create-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','添加通讯录人员成功');
                    self.location.reload();
                }else if ( data.code == 10001 ){
                    Utils.Toastr.Warning('提示',data.msg);
                    self.location.reload();
                }
                else{
                    Utils.Toastr.Warning('提示',data.msg);
                }
            }
        });

    });

    $(document).on('click','#btn-update',function(){
        $.ajax({
            cache: true,
            type: "POST",
            url:  $('#common-edit-form').attr('action'),
            data: $('#common-edit-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','修改通讯录人员成功');
                    self.location.reload();
                }else if ( data.code == 10001 ){
                    Utils.Toastr.Warning('提示',data.msg);
                    self.location.reload();
                }
                else{
                    Utils.Toastr.Warning('提示',data.msg);
                }
            }
        });

    });

    $(document).on('click','#group-btn-create',function(){
        console.log("dfvdfv");
        $.ajax({
            cache: true,
            type: "POST",
            url: '/report/user-business-group/create',
            data:$('#common-create-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','添加配置成功');
                    self.location.reload();
                }else if ( data.code == 10001 ){
                    Utils.Toastr.Warning('提示',data.msg);
                    self.location.reload();
                }
                else{
                    Utils.Toastr.Warning('提示',data.msg);
                }
            }
        });

    });

    $(document).on('click','#group-btn-update',function(){
        $.ajax({
            cache: true,
            type: "POST",
            url:  $('#common-edit-form').attr('action'),
            data: $('#common-edit-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','修改配置成功');
                    self.location.reload();
                }else if ( data.code == 10001 ){
                    Utils.Toastr.Warning('提示',data.msg);
                    self.location.reload();
                }
                else{
                    Utils.Toastr.Warning('提示',data.msg);
                }
            }
        });

    });
});
