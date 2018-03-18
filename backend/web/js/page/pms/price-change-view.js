$(function () {
    $(document).on('click', '.review-btn', function (event) {
        var data = $(event.target).data();
        console.log(data);
        $.ajax({
            cache: true,
            type: "POST",
            url: '/pms/price-change-record/' + data.action,
            data: {id: data.id, comment: $('#review-comment').val()},
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                if (data.code == 200) {
                    window.location.href = '/pms/price-change-record/index?type=2';
                } else {
                    Utils.Toastr.Info('提示', data.msg);
                }
            }
        });
    });
});