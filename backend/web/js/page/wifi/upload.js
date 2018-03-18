$(function ($) {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $.extend({
        initThirdPlugins: function (){
            if ($('#file_data').length > 0) {
                $("#file_data").fileinput({language: 'zh', showUpload: false, showRemove: false, allowedFileExtensions: ['jpg', 'jpeg', 'png', 'bmp', 'gif'], theme: 'fa', showPreview: false, uploadUrl: '/wifi/activity/upload'});
                $('#file_data').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    if (response.success)
                    {
                        $("#file_uploaded").val(response.file);
                        $("#img_uploaded").css("background-image","url("+response.file+")");
                        $('#m-a-a-a').modal('hide');
                    }
                });
                $('#file_data').on('change', function (event) {
                    $('#file_data').fileinput("upload");
                });
            }
        }
    });

});
