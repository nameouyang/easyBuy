/**
 * @author hanlu1@xiaomi.com
 * @date 2017-11-07
 */

$(function () {
    var _csrfToken = csrfToken;

    $(document).on('click', '#delivery', function(){
        var url = $(this).data('url');
        $("#delivery").attr('disabled', true);
        var param = new Object();
        param._csrf = _csrfToken;
        layer.confirm('确定通知发货吗?',{
             btn : ['确定', '取消'],
            },function(index){
               $.ajax({
                    cache : false,
                    type : 'POST',
                    url : url,
                    data : param,
                    error:function(error){
                        Utils.Toastr.Info('错误', '网络问题');
                    },
                    success: function(data){
                        if(data.code == 0)
                        {
                            Utils.Toastr.Success('成功',data.msg);
                            layer.close(index);
                            window.location.href = "/assets/material-delivery/special";
                        }
                        else {
                            $("#delivery").attr('disabled', false);
                            Utils.Toastr.Info('提示', data.msg);
                            layer.close(index);
                        }
                    }
            });
            },function(){
            $("#delivery").attr('disabled', false);
            }
        );
        $("#delivery").attr('disabled', false);

    });
});

