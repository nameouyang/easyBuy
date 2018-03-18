$(function ($) {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $.extend({
        initThirdPlugins: function () {
            if ($('#file_data').length > 0) {
                $("#file_data").fileinput({language: 'zh', showUpload: false, showRemove: false, allowedFileExtensions: ['xlsx'], theme: 'fa', showPreview: false, uploadUrl: '/report/file-uploader'});
                $('#file_data').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    if (response.success)
                    {
                        $("#file_uploaded").val(response.file);
                        console.log('file uploaded: ' + response.file);
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