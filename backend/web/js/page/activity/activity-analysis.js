/**
 * Created by hanlu on 2017/2/8.
 */
$(function(){
    $('#start').datetimepicker({
        format: "YYYY-MM-DD",
        useCurrent: false
    });
    $('#end').datetimepicker({
        format : "YYYY-MM-DD",
        useCurrent: false //Important! See issue #1075
    });
    $("#start").on("dp.change", function (e) {
        var today = new Date();
        var maxDate = new Date(e.date);
        maxDate.setMonth(maxDate.getMonth() + 1);
        if(maxDate > today)
        {
            maxDate = today;
        }
        $("#end").data("DateTimePicker").maxDate(maxDate);
    });

    $("#end").on('dp.show', function(){
        var today = new Date();
        var startAt = new Date($("#start_at").val())    ;
        startAt.setMonth(startAt.getMonth() + 1);
        if(startAt > today)
        {
            startAt = today;
        }
        $("#end").data("DateTimePicker").maxDate(startAt);
    });

    $("#search").on('click', function(){
        var startAt = new Date($("#start_at").val());
        var endAt = new Date($("#end_at").val());
        startAt.setMonth(startAt.getMonth() + 1);
        if(startAt < endAt)
        {
            alert("结束时间和开始时间超过一个月，请重新选择");
            return;
        }
    });

    $(document).on('mouseover', '.activity-info', function () {
        layer.closeAll();
        var activityName = $(this).attr('data-activity-name');
        var activityTime = $(this).attr('data-activity-time');
        var activityOrgs = $(this).attr('data-activity-org');
        var id = $(this).attr('id');
        var layerIndex = layer.load(1, {
            shade: 0
        });
        layer.close(layerIndex);
        layer.tips(activityName +"<br>"+activityTime+"<br>"+activityOrgs, "#"+id,
            {
                tips: [1, '#3595CC'],
                time: 4000
            });
    });
});