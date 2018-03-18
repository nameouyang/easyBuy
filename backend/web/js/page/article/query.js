/**
 * Created by wangchongshan@xiaomi.com on 17-6-22.
 */

$(function () {
    var id = $('.notice').attr('id');
    if(id==1){
        Utils.Toastr.Error('失败', '结束时间不能小于开始时间');
    }

    $('#org_node').css('display','none'); 
});

