$(function ($) {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $.extend({
        initThirdPlugins: function (){
            if ($('#file_data').length > 0) {
                $("#file_data").fileinput({language: 'zh', showUpload: false, showRemove: false, allowedFileExtensions: ['txt'], theme: 'fa', showPreview: false, uploadUrl: '/activity/coupon-send-service/upload'});
                $('#file_data').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    if (response.success) {
                        $("#couponsendservice-file_name").text(response.filename);
                        $("#couponsendservice-file_path").val(response.realPath);
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
