$(function () {
    $(".bootstrap-tagsinput").css({'min-height': '2.375rem', 'width': '100%', 'border-radius': '0', 'border': '1px solid #ccc', 'border-color': 'rgba(120, 130, 140, 0.2)'});

    if ($(".bootstrap-tagsinput span").length > 0)
    {
        $(".bootstrap-tagsinput span").css({'background-color': '#2196f3', 'font-size': '100%', 'line-height': 'inherit', 'margin-top':'2px'});
    }
    $('#evaluation_tags').on('itemAdded', function (event) {
        $(".bootstrap-tagsinput span").css({'background-color': '#2196f3', 'font-size': '100%', 'line-height': 'inherit', 'margin-top':'2px'});
    });
});