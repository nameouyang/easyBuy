
$(function () {
    $(document).on('click', '#audit-all', function () {
        var postData = 'id=all';
        layer.confirm('您确定要审核通过吗？', {title:'确认操作', btn:['确定', '取消']}, function(index){
            if(submit(postData)){
                $('.table tbody').hide();
            }
            layer.close(index);
        },function(){

        });
    });

    $(document).on('click', '#audit-more', function () {
        var postData = "";
        $("input[name='id[]']:checked").each(function () {
            postData += "id[]=" + this.value + "&";
        });

        if (postData == '') {
            Utils.Toastr.Warning('警告', '请先至少选择一个内容');
            return;
        }
        layer.confirm('您确定要审核通过吗？', {title:'确认操作', btn:['确定', '取消']}, function(index){
            if (submit(postData)) {
                $("input[name='id[]']:checked").each(function(){
                    $(this).attr('checked', false);
                    $(this).parents('tr').hide();
                });
            }
            layer.close(index);
        },function(){

        });

    });

    var submit = function (postData){
        var result = true;
        $.ajax({
            cache: true,
            type: "POST",
            url: '/goods-price/audit',
            data: postData,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                result = false;
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                    result = false;
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '修改商品信息失败,1秒钟后刷新页面');
                    window.setTimeout(function(){
                        self.location.reload();
                    }, 1000);

                }
            }
        });
        return result;
    }
});

