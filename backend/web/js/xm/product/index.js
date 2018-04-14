$(document).ready(function() {
    $("#batchDelete").click(function() {
        var keys = $("#w0").yiiGridView("getSelectedRows");
        $.ajax({
            type: "POST",
            url: "/product/batch-delete",
            dataType: "json",
            data: {ids: keys}
        });
    });
});