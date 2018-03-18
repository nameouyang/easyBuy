$(function () {

    $(document).on('click','.log-submit',function(e){

         $(this).attr('disabled','disabled');
        var _this = $(this);
        $.post("/cash/cash-log/create", $('#log-form').serialize(),
            function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = '/cash/cash-log/index';
                } else {
                    Utils.Toastr.Error('失败', data.msg);
                    _this.removeAttr('disabled');
                }
            },
            "json");
    })
});
