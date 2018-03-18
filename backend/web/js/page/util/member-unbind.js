$(function () {
    var $key = $('#memberunbind-member_id');
    var $form = $('#member-unbind-form');
    
    // ajax callback
    function ajaxUnbind(){
            $.ajax({
                cache: false,
                type: "POST",
                url:  'unbind',
                data: $form.serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.code === 200) {
                        Utils.Toastr.Success('成功', '解绑成功');
                    }
                    else {
                        Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg );
                    }
                }
            });
    }
    
    // button click
    $(document).on('click', '#member-unbind', function () {
        if ($key.val() !== '' &&  window.confirm('你确定关闭吗？')) {
            ajaxUnbind();
        }
    });

    // enter key
    $(document).on('onkeypress', '#member-unbind', function () {
        if ( event.keyCode==13 &&  window.confirm('你确定关闭吗？')) {
            ajaxUnbind();
        }
    });

});
