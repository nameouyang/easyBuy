$(function ($) {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $.extend({
        initThirdPlugins: function () {
            initWebUploader();
            $("#picker .webuploader-pick").click(function(){
                $("#picker :file").click();
            });
        }
    });
    function initWebUploader()
    {
        var uploader = WebUploader.create({
            // swf文件路径
            swf: '/libs/js/webuploader/Uploader.swf',
            // 文件接收服务端。
            server: '/hipos/file/upload',
            method: 'POST',
            auto: true,
            pick: '#picker',
            accept: {
                title: 'file',
                extensions: 'jpg,jpeg,png,gif,bmp,avi,mp4,rm,rmvb,wmv,mkv,3gp',
                mimeTypes: '*'
            },
            chunked: true,
            chunkSize: 6*1024*1024,
            chunkRetry: 2,
            threads: 1
        });

        // 当有文件被添加进队列的时候
        uploader.on( 'fileQueued', function( file ) {
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            $percent = $('.progress-bar');
            $percent.attr('aria-valuenow', Math.ceil(percentage * 100));
            $percent.attr('aria-valuenow', Math.ceil(percentage * 100));
            $percent.html(Math.ceil(percentage * 100) + '%');
            $percent.css( 'width', percentage * 100 + '%' );
            if (percentage == 1) {
                $percent.html('处理中..');
            }
        });

        uploader.on( 'uploadAccept', function(object, ret) {
            //上传成功，但是分片文件未上传完成
            if (ret.code == 201) {
                return true;
            }
            if (ret.code == 200) {
                $('.file_name').html(ret.file['name']);
                $('#hiposfile-url').val(ret.file['url']);
                $('#hiposfile-name').val(ret.file['name']);
                return true;
            }
            return false;
        });

        uploader.on( 'uploadStart', function(file) {
            $('#hiposfile-size').val(file.size);
            $('.file-caption-name').html(file.name);
            $('.fileinput-cancel').removeClass('hide');
            $('.kv-upload-progress').removeClass('hide');
        });

        uploader.on( 'uploadSuccess', function( file ) {
            $('#m-a-a-a').modal('hide');
        });

        uploader.on( 'uploadError', function( file ) {
            $('.fileinput-cancel').addClass('hide');
            $('.kv-upload-progress').addClass('hide');
            $('.file-caption-name').html('<font color="red">上传出错</font>');
            uploader.reset();
        });

        uploader.on( 'uploadComplete', function( file ) {
        });

        $('.fileinput-cancel-button').on('click', function(){
            uploader.stop(true);
            $('.fileinput-cancel').addClass('hide');
            $('.kv-upload-progress').addClass('hide');
        });
    }
});
