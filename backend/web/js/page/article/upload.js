

$(function ($) {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $.extend({
        initThirdPlugins: function () {
            if ($('#file_data').length > 0) {
                $("#file_data").fileinput(
                    {
                        language: 'zh',
                        showUpload: false,
                        showRemove: false,
                        maxFileSize: 1024*20,
                        allowedFileExtensions: 
                            [
                                'xlsx', 'png', 'doc',
                                'pdf', 'ppt', 'zip', 'jpg',
                                'gif','rar',
                                'txt', 'xls','pptx','docx'
                            ],
                        theme: 'fa',
                        showPreview: false,
                        uploadUrl: '/cms/article/upload',
                        elErrorContainer: '#kv-errors',
                        uploadExtraData:{navigation:$('#navigation').attr('data-article')}
                    }
                );
                $('#file_data').off('fileuploaded');
                $('#file_data').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    var html = '';
                    var img;
                    var file_id;
                    if (response.success)
                    {
                        if(response.file['navigation']){
                            $('#navigation_img').attr("src", response.file['file_path']);
                            $('#navigation_id').attr("value", response.file['file_id']);
                        }else{
                            $('#removeFile').attr('data-file',response.file['file_id']);
                            $('#file_name').html(response.file['name']);
                            $("#img_uploaded").attr("src",response.file['img']);
                            html = $('#add_file').html();
                            $("#upload_show").prepend(html);
                        }
                        $('#m-a-a-a').modal('hide');
                    }

                });
                $('#file_data').on('change', function (event) {
                    $('#file_data').fileinput("upload");
                });
            }
            if ($('.date').length > 0) {
                $('.date').datetimepicker({
                    viewMode: 'years',
                    format: 'YYYY-MM',
                    locale: 'zh-cn'
                });
            }
        }});
});

function remove(event){
    $(event).parent().parent().remove();
    var file_id = $(event).attr('data-file');
    $.ajax({
            cache: false,
            type: "POST",
            url: '/cms/article/remove',
            data: 'file_id='+ file_id,
            error: function (request) {

            },
            success: function (data) {

            }
    });

}
