$(function () {
    $(document).on('click', '.btn-primary', function(){
        var action = $(this).data('action');
        $.ajax({
            cache: true,
            type: "POST",
            url: '/menu/' + action + (action == 'edit' ? '?id=' + $('[id="node_id"]').val() : ''),
            data: $("#common-edit-form").serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
            	//alert(data.code);
            	//alert(data);
            	//return;
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