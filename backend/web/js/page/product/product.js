/**
 * Created by luboot on 16-11-30.
 */


$(function () {
    $('.nav-tab-switch').click(function () {
        $('.nav-tab-switch').removeClass("tab-nav-active");

        //获取点击的tab分类id
        var navTabId = 'row-' + $(this).attr('id');

        //根据点击的分类id,显示点击的分类具体内容
        $('.row-tab-content').css('display', 'none');
        $('#' + navTabId).css('display', 'block');
    });
    $('input[type="checkbox"]').each(function(){
        $(this).change(function () {
            var data = 'product_id=' + $(this).attr('product-id') + '&category_id=' + $(this).attr('category-id');
            if ($(this).is(":checked")) {
                data += '&is_show=1';
            } else {
                data += '&is_show=0';
            }
            $.post({
                    url: 'update-category',
                    data: data,
                    dataType: 'json',
                    success: function (ret) {
                        console.log(ret);
                        if (ret.code === 200) {
                            Utils.Toastr.Success('成功', '状态修改成功');
                        } else {
                            Utils.Toastr.Info('错误', ret.msg);
                        }
                    },
                    error: function () {
                        Utils.Toastr.Error('异常', '系统错误');
                    }
                }
            );
        });
    })
});