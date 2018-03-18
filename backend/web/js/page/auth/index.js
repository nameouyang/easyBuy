$(function () {
    $(document).on('click', '.modal-submit', function(){
        var action = $(this).data('action');
        $.ajax({
            cache: true,
            type: "POST",
            url: '/auth/' + action + (action == 'update' ? '?id=' + $('[name="AuthItem[name]"]').val() : ''),
            data: $("#route-form").serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                if (data.code == 200) {
                    window.location.reload();
                } else {
                    Utils.Toastr.Error('Warning', data.msg);
                    return false;
                }
            }
        });
    });
});

