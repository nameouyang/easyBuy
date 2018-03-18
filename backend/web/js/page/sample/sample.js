$(function () {
    /*$("input[name=status]").click(function () {
        var status = $("input[name='status']:checked").val();
        if(status == 1|| status == 3){
            $("#hidden_responsible").show();
            var html = '';
            $.ajax({
                url: '/sample/info/responsible/',
                type: 'post',
                dataType: 'json',
                data: {org_id: $("#org_id").val(),status:status},
                success: function (msg) {
                    $.each(msg, function (key, val) {
                        html += '<option value="' + key + '">' + val + '</option>';
                    });

                    $("#responsible").empty().append(html);

                    html = '';
                    $.ajax({
                        url: '/sample/info/responsible2/',
                        type: 'post',
                        dataType: 'json',
                        data: {number: $("#responsible").val()},
                        success: function (msg) {
                            $.each(msg, function (key, val) {
                                html += '<option value="' + key + '">' + val + '</option>';
                            });
                            $("#responsible2").empty().append(html);
                        }
                    })

                }
            })

        }else {
            $("#hidden_responsible").hide();
        }

    });*/

    $("#update-sampleInfo").click(function () {
        var status = $("input[name='status']:checked").val();
        if(status == 1|| status == 3){
           var responsible =  $("#responsible").val();
            var responsible2 = $("#responsible").val();
            if(responsible == '0' || (responsible == undefined)){
                layer.alert('请选择责任方');
                return false;
            }
            if(responsible2 == '0' || (responsible2 == undefined)){
                layer.alert('请选择具体责任');
                return false;
            }
        }
        return true;
    });

    $("#sample_compensate").click(function () {

        var pay_amount =  $("#pay_amount").val();
        var file_uploaded =  $("#file_uploaded").val();
        var duty = $("#duty").val();
        var data = $("#data").val();
        if(!duty)
        {
            layer.alert('请选择责任人！');
            return false;
        }
        if(!data)
        {
            layer.alert('请选择打款时间！');
            return false;
        }
        if(!pay_amount)
        {
            layer.alert('请填写支付金额！');
            return false;
        }
        if (isNaN(pay_amount)) {
            layer.alert('请输入正确的支付金额！');
            return false;

        }
        if(!file_uploaded){
            layer.alert('请上传打款凭证！');
            return false;
        }
        return true;
    });
    $(document).on("change", "#responsible", function()
    {
        var html = '';
        $.ajax({
            url: '/sample/info/responsible2/',
            type: 'post',
            dataType: 'json',
            data: {number: $("#responsible").val()},
            success: function (msg) {
                $.each(msg, function (key, val) {
                    html += '<option value="' + key + '">' + val + '</option>';
                });
                $("#responsible2").empty().append(html);
            }
        })
    });
});

function responsibleSelect(){

    var html = '';
    $.ajax({
        url: '/sample/info/responsible2/',
        type: 'post',
        dataType: 'json',
        data: {number: $("#responsible").val()},
        success: function (msg) {
            $.each(msg, function (key, val) {
                html += '<option value="' + key + '">' + val + '</option>';
            });
            $("#responsible2").empty().append(html);
        }
    })
}
