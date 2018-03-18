/**
 * Created by chenguidong on 16-11-3.
 */

/*
$(function() {
    $(document).ready(function () {

        $.fn.modal.Constructor.prototype.enforceFocus =function(){};

        $("#m-a-a").on("shown.bs.modal", function(){
            $('#iporgloc-org_id').select2({theme:"bootstrap",language:"zh-CN"});
        });

        $(document).on("click","#ip-create",function () {
            $.post($(this).attr("data-tourl"),$("#ip-form").serialize(),function (result) {
                if(result.code === 0){
                    Utils.Toastr.Success('成功', result.msg);
                    window.location.reload();
                }else{
                    Utils.Toastr.Warning('错误', result.msg);
                }
            })
        });

        $(document).on("click","#ip-update",function () {
            $.post($(this).attr("data-tourl"),$("#ip-form").serialize(),function (result) {
                if(result.code === 0){
                    Utils.Toastr.Success('成功', result.msg);
                    window.location.reload();
                }else{
                    Utils.Toastr.Warning('错误', result.msg);
                }
            })
        });
    });
});
    */

$(".ip-org-loc-search").on("click",".search-input-item",function () {
    var value = $(this).val();
    $(".ip-org-loc-search .search-input-item").val('');
    $(this).val(value);
});