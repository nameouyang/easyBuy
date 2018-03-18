$("#start-date").on("dp.change", function (e) {
    if(typeof $("#end-date").data("DateTimePicker") == "undefined")
    {
        return;
    }
    var date = new Date(e.date);
    var month = date.getMonth() + 1;
    var year  = date.getFullYear();
    var day   = date.getDate();
    if(month > 12)
    {
        month = 1;
        year++;
    }
    date = new Date(year, month, day);
    $("#end-date").data("DateTimePicker").minDate(e.date);
    $("#end-date").data("DateTimePicker").maxDate(date);
    $("#end-date").val('');
});

