$(function () {
    $(document).on('click', '#mitv-activity-submit', function (e) {
        e.preventDefault();
        $this = $(this);
        $this.attr('disabled', 'disabled');
        $.post("/activity/mitv-activity/create", $('#mitv-activity-form').serialize(),
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = '/activity/mitv-activity/index';
                } else {
                    $this.removeAttr('disabled');
                    Utils.Toastr.Error('失败', data.msg);
                }
            },
            "json");
    });
});