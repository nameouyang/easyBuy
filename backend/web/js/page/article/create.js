/**
 * Created by chenguidong on 16-10-23.
 */

$(document).ready(function(){

    // CKEDITOR.replace( 'content_ckeditor',{
    //     height: '600px',
    // });

    // CKEDITOR.config.contentsCss = '/css/article/ckeditor.css';  

    $(document).on("change","#article_notice",function(){
        if($("#article_notice input:checked").val() == 1)
        {
            $("#choose-notice").show();
            $('select').select2({theme:"bootstrap"});
        }
        else
        {
            $("#choose-notice").hide();
        }
    });

    $(document).on("change","#article_status",function(){
        if($("#article_status input:checked").val() == 2)
        {
            $("#choose-status").show();
            $('select').select2({theme:"bootstrap"});
        }
        else
        {
            $("#choose-status").hide();
        }
    });

    var node = {};
    node.node = '';
    $("#org_node").change(function () {
        node.node = $("#org_node").val();
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
