$(function () {
    $(document).on('click', '#common-ajax-submit-btn', function (e) {
        e.preventDefault();
        if (typeof ($['commonAjaxSubmitBefore']) !== 'undefined') {
            $['commonAjaxSubmitBefore'].apply('commonAjaxSubmitBefore', []);
        }
        $.ajax({
            type: "POST",
            url: $('#common-ajax-form').attr('action'),
            data: $('#common-ajax-form').serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '对不起，网络错误，请重试！');
            },
            success: function (data) {
                if (0 == data.code) {
                    var backUrl = $('#common-ajax-form').attr('back-url');
                    var disableReload = $('#common-ajax-form').attr('disable-reload');

                    Utils.Toastr.Success('成功', data.msg);

                    if (typeof ($['commonAjaxSubmitAfter']) !== 'undefined') {
                        $['commonAjaxSubmitAfter'].apply('commonAjaxSubmitAfter', [data]);
                    }
                    if (typeof (backUrl) == 'undefined') {
                        if (typeof (disableReload) == 'undefined') {
                            self.location.reload();
                        }
                    } else {
                        window.location.href = backUrl;
                    }
                } else if (data.code > 0) {
                    Utils.Toastr.Info('提示', data.msg);
                    if (typeof ($['commonAjaxSubmitAfter']) !== 'undefined') {
                        $['commonAjaxSubmitAfter'].apply('commonAjaxSubmitAfter', [data]);
                    }
                } else
                {
                    Utils.Toastr.Error('失败', data.msg);
                    if (typeof ($['commonAjaxSubmitAfter']) !== 'undefined') {
                        $['commonAjaxSubmitAfter'].apply('commonAjaxSubmitAfter', [data]);
                    }
                }
            }
        });

    });

});