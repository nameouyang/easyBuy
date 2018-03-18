
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
                        maxFileSize: 1024*10,
                        allowedFileExtensions: 
                            [
                                'png','jpeg','jpg',
                            ],
                        theme: 'fa',
                        showPreview: false,
                        uploadUrl: '/pay-type/upload',
                        elErrorContainer: '#kv-errors',
                        // uploadExtraData:{article_id:$('#upload_show').attr('data-article')}
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
                        $('#image_url').val(response.file['upload_path']);
                        $('#image_url').attr("readonly","readonly");
                        $('#image_div').css('display',"block");
                        $('#image_preview').attr("src",response.file['upload_path']);
                        $('#m-a-a-a').modal('hide');
                        // $('#removeFile').attr('data-file',response.file['file_id']);
                        // $('#file_name').html(response.file['name']);
                        // $("#img_uploaded").attr("src",response.file['img']);
                        // html = $('#add_file').html();
                        // $("#upload_show").prepend(html);
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
