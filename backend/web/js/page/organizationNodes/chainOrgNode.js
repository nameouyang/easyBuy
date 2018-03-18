$(function(){
    var node = {};
    node.node = '';
    $("#org_node").change(function () {
        node.node = $("#org_node").val();
        node.orgType = $("#org_type").val();
        $("#del-all-org").select2("val", "");
        $("#del-all-org").empty();
        $.ajax({
            type: 'POST',
            data: node,
            url: '/organization/get-org-list',
            success: function (data) {
                if (data.code == 0) {
                    var option = "<option value=\"\">按照门店编号搜索<\/option>";
                    if(1 == $("#org_node").data('orgKinds') && -1 !== parseInt(node.node))
                    {
                        option = option + "<option value='1'>全部门店<\/option>";
                        option = option + "<option value='2'>全部小米之家<\/option>";
                        option = option + "<option value='3'>全部专卖店<\/option>";
                    }
                    for (var i in data.data) {
                        option = option + "<option value=\""+i+"\">"+data.data[i]+"<\/option>";
                    }
                    $('#del-all-org').append(option);
                }
                else
                {
                    Utils.Toastr.Warning(data.msg);
                }
            },
        });
    });
    $("#org_type").change(function () {
        node.node = $("#org_node").val();
        node.orgType = $("#org_type").val();
        $("#del-all-org").empty();
        $.ajax({
            type: 'POST',
            data: node,
            url: '/organization/get-org-list',
            success: function (data) {
                if (data.code == 0) {
                    var option = "<option value=\"\">按照门店编号搜索<\/option>";
                    if(1 == $("#org_node").data('orgKinds') && -1 !== parseInt(node.node))
                    {
                        option = option + "<option value='1'>全部门店<\/option>";
                        option = option + "<option value='2'>全部小米之家<\/option>";
                        option = option + "<option value='3'>全部专卖店<\/option>";
                    }
                    for (var i in data.data) {
                        option = option + "<option value=\""+i+"\">"+data.data[i]+"<\/option>";
                    }

                    $('#del-all-org').append(option);
                }
                else
                {
                    Utils.Toastr.Warning(data.msg);
                }
            },
        });
    });

    node.node = $("#org_node").val();
    if(parseInt(node.node) >= 1)
    {
        $.ajax({
            type: 'POST',
            data: node,
            url: '/organization/get-org-list',
            success: function (data) {
                if (data.code == 0) {
                    $("#del-all-org").empty();
                    var option = "<option value=\"\">按照门店编号搜索<\/option>";
                    for (var i in data.data) {
                        option = option + "<option value=\""+i+"\">"+data.data[i]+"<\/option>";
                    }

                    $('#del-all-org').append(option);
                }
            },
        });
    }
});


