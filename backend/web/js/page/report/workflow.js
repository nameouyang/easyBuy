/**
 * Created by hanlu<hanlu1@xiaomi.com> on 2017/1/17.
 */
$(function() {
    // 添加选择柜台号的时候必须选择门店
    $(document).on('click', '#check', function () {

        var org = $("#org").val();
        var counter = $("#counter").val();
        if(counter.length != 0 && org.length == 0 && counter != 0)
        {
            layer.alert("请选择所在门店");
            return false;
        }
        else
        {
            $('form').submit();
        }
    });
});