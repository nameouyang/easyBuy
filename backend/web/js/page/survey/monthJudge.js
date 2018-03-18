/**
 * Created by hanlu on 16-12-5.
 */
$(function() {
    // 添加门店和分仓关系
    $(document).on('click', '#month', function () {
        var beginDate = $("input[name='date_begin']").val();
        var endDate = $("input[name='date_end']").val();
        if(beginDate && endDate) {
            var date_begin = new Date(beginDate);
            var date_end = new Date(endDate);
            var date = getMaxDate(date_begin);
            var max_date = new Date(date['year'], date['month'], date['day']);
            if(max_date < date_end)
            {
                layer.alert("系统支持查询6个月内的数据，请重新选择");
                return false;
            }
        }
        if(beginDate && !endDate)
        {
            layer.alert("请选择结束时间");
            return false;
        }
        else if(!beginDate && endDate)
        {
            layer.alert("请选择开始时间");
            return false;
        }
        else
        {
            $('form').submit();
        }
    });
});

function getMaxDate(beginDate)
{
    var day = beginDate.getDate();
    var month = beginDate.getMonth() + 6;      //根据实际情况相差几个月直接修改值就可以
    if(month > 11)
    {
        var year = beginDate.getFullYear() + 1;
        month = month - 12;

    }else {
        year = beginDate.getFullYear();
    }
    return {"year": year,
            "month": month,
            "day": day};
}