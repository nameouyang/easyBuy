/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function () {
    //业务门店范围选择单店时显示选择框
    $(document).on("change", "#groupgoods-scope", function () {
        if ($("#groupgoods-scope input:checked").val() == 4) {
            $("#choose-org").show();
            $('select').select2({theme: "bootstrap"});
            var orgnodeContainer = $("#choose-org").find('div:first');
            var orgchartDiv = orgnodeContainer.find('div.orgchart');
            orgnodeContainer.height(orgchartDiv.width()+100);
            orgnodeContainer.width(orgchartDiv.height()+100);
        } else {
            $("#choose-org").hide();
        }
    });



    $("#goods-effective").click(function () {
        var checkids = $("input[name='check_id[]']:checked").serialize();
        if(confirm('确认置成有效吗？')){
            $.ajax({
                url: '/group/goods/effective',
                type: 'post',
                dataType: 'json',
                data:checkids,
                success: function (msg) {
                    Utils.Toastr.Info('Success','操作成功！')
                }
            })
        }
        setTimeout("window.location.reload()",5000)

    });

    $("#goods-invalid").click(function () {
        var checkids = $("input[name='check_id[]']:checked").serialize();
        if(confirm('确认置成失效吗？')){
            $.ajax({
                url: '/group/goods/invalid',
                type: 'post',
                dataType: 'json',
                data:checkids,
                async:true,
                success: function (msg) {
                    Utils.Toastr.Info('Success','操作成功！')

                }
            })
        }
        setTimeout("window.location.reload()",5000)

    });

    $("#goodssearch-scope").change(function () {
        if($("#goodssearch-scope").val() == 4){
            $("#org").show();
        }else {
            $("#org").hide();
        }
    });


    if($("#goodssearch-scope").val() == 4){
        $("#org").show();
    }else {
       $("#org").hide();
    }


    $("#goods-submit").click(function () {
        var price = parseFloat($("#groupgoods-price").val());
        var discounted_price = parseFloat($("#groupgoods-discounted_price").val());
        var first_price = parseFloat($("#groupgoods-first_discount").val());
        var second_price = parseFloat($("#groupgoods-second_discount").val());
        var third_price = parseFloat($("#groupgoods-third_discount").val());

        if(first_price > price){
            Utils.Toastr.Info('Error','一级签批价不能大于原价！')
            return false;
        }

        if(second_price > first_price){
            Utils.Toastr.Info('Error','二级签批价不能大于一级签批价！')
            return false;
        }

        if(third_price > second_price){
            Utils.Toastr.Info('Error','三级签批价不能大于二级签批价！')
            return false;
        }

        if(third_price < discounted_price){
            Utils.Toastr.Info('Error','三级签批价不能小于折扣价格！')
            return false;
        }

        $("#goods-submit").submit();

    });
});




