/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function () {
    //业务门店范围选择单店时显示选择框
    $(document).on("change", "#user-scope", function () {
        if ($("#user-scope input:checked").val() == 4) {
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

    $(document).on("change", '[name="User[country_scope][]"]', function(){
        if ($(this).val() == '*') {
            if ($(this)[0].checked) {
                $('[name="User[country_scope][]"]').not(this).attr({'checked':false});
            }
        } else {
            if ($(this)[0].checked && $('[name="User[country_scope][]"]').eq(0).val() == '*') {
                $('[name="User[country_scope][]"]').eq(0).attr({'checked':false});
            }
        }
    });
});

