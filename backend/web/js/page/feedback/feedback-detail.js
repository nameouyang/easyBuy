$(function() {

    /**
     * 关闭反馈
     */
    $(document).on('click', '#ui-close-btn', function () {

        var id = $(this).data('id');
        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        $.post("/feedback/ajax-close-by-id", {'id': id, _csrf: csrfToken}, function (rs) {
            if (rs.code != 200) {
                Utils.Toastr.Warning('错误', rs.msg);
            } else {
                Utils.Toastr.Success('成功', rs.msg);
                self.location.reload();
            }
        }, "json");

    });

    /**
     * 解决反馈
     */
    $(document).on('click', '#ui-resolve-submit-btn', function () {

        var id = $('#ui-resolve-btn').attr('data-id');
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var comment = $('#resolve-feedback-description').val();
        //如果点击了，就把按钮设置成灰色和禁用的，防止并发
        setBtnForbid('#ui-resolve-submit-btn',true);
        $.post("/feedback/ajax-resolve-by-id", {'id': id, _csrf: csrfToken,'comment':comment}, function (rs) {
            if (rs.code != 200) {
                Utils.Toastr.Warning('错误', rs.msg);
                setBtnForbid('#ui-resolve-submit-btn',false);
            } else {
                Utils.Toastr.Success('成功', rs.msg);
                self.location.reload();
            }
        }, "json");

    });

    $(document).on('click', '#ui-assign-submit-btn' , function() {

        var id = $(this).data('id');
        //var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var assignor = $('#feedback-assigned_to').val();
        //验证通过隐藏提示信息//注册一个change事件
        $('#feedback-assigned_to').change(function (e) {
            var assignor = $('#feedback-assigned_to').val();
            if(assignor){
                $('.div-assigned_to').hide();
            }else{
                $('.div-assigned_to').show();
            }

        });
        //验证转移人不能为空
        if(! assignor){
            $('.div-assigned_to').show();
            return false;
        }else{
            $('.div-assigned_to').hide();
        }

        var data = $('#feedback-assign-form').serialize();
        var url = $('#feedback-assign-form').attr('action');
        //如果点击了，就把按钮设置成灰色和禁用的，防止并发
        setBtnForbid('#ui-assign-submit-btn',true);
        $.post(url, data, function (rs) {

            if (rs.code != 200) {
                Utils.Toastr.Warning('错误', rs.msg);
                //恢复按钮
                setBtnForbid('#ui-assign-submit-btn',false);
            } else {
                Utils.Toastr.Success('成功', rs.msg);
                self.location.reload();
            }

        }, "json");
    });

    function setBtnForbid(btn,flag)
    {
        if(flag){
            $(btn).attr('disabled',true);
            $(btn).css({'background':'#B0B0B0'});
        }else{
            $(btn).attr('disabled',false);
            $(btn).css({'background':''});
        }

    }


    //反馈图片的展示处理
    // $('#show-img-id').find('img').click(function (e) {
    //     var src = $(this).attr('src');
    //     $('#img-body img').attr('src',src);
    //
    // });

    $('img').click(function (e) {
        var src = $(this).attr('src');
        $('#img-body img').attr('src',src);
    });








});