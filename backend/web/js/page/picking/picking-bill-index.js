/**
 * Created by ouyang on 17-8-23.
 */

$(function () {
    $('.picking-top').click(function (req) {
        req.preventDefault();
        var id = $(this).attr("data-url");
        $.get(id, function (rs) {
            if (rs.code == 200) {
                window.location.reload();
                Utils.Toastr.Success(rs.msg, req.msg);
            } else if(rs.code == 10001) {
                Utils.Toastr.Error(rs.msg, req.msg);
            } else {
                Utils.Toastr.Error(rs.msg, req.msg);
            }
        });
    });
});

$(function () {
    $('.picking-reset').click(function (req) {
        req.preventDefault();
        var id = $(this).attr("data-url");
        $.get(id, function (rs) {
            if (rs.code == 200) {
                window.location.reload();
                Utils.Toastr.Success(rs.msg, req.msg);
            } else if(rs.code == 10001){
                Utils.Toastr.Error(rs.msg, req.msg);
            } else {
                Utils.Toastr.Error(rs.msg, req.msg);
            }
        });
    });
});