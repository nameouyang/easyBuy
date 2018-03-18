/**
 * Created by chenguidong on 16-10-23.
 */

$(document).ready(function(){

    CKEDITOR.replace( 'content_ckeditor' );

    $(document).on("change","#activity-scope",function(){
        if($("#activity-scope input:checked").val() == 4)
        {
            $("#choose-org").show();
            $('select').select2({theme:"bootstrap"});
        }
        else
        {
            $("#choose-org").hide();
        }
    });

    $(document).on("click","#submit-WifiActivityCreate",function(e){
        e.preventDefault;

        //时间检验
        var start_time = $("#start_time").val();
        var end_time = $("#end_time").val();
        if(end_time <= start_time)
        {
            Utils.Toastr.Warning('警告', '过期时间必须大于开始时间');
            return false;
        }

        return true;
    })
});
