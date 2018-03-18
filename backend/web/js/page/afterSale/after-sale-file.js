$(function ($) {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $.extend({
        initThirdPlugins: function () {
            if ($('#file_data').length > 0) {
                var type = $('#after-sale').attr('data-type');
                var id = $('#after-sale').attr('data-id');
                var url = ''
                if(type == 1){
                    url = '/cms/after-sale-file/create';
                }else{
                    url = '/cms/after-sale-file/update?id=' + id;
                }
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
                        uploadUrl: url,
                        elErrorContainer: '#kv-errors',
                        uploadExtraData:{navigation:$('#navigation').attr('data-article')}
                    }
                );
                $('#file_data').off('fileuploaded');
                $('#file_data').on('fileuploaded', function (event, data, previewId, index) {
                        $('#m-a-a-a').modal('hide');
                        window.location.reload();
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

