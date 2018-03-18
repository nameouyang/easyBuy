$('#file').fileinput({
    language: 'zh', //设置语言
    uploadUrl: '/util/file/upload', //上传的地址
    allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀
    theme: "mi",
    uploadAsync: true,
    dropZoneEnabled: true,
    maxFileCount: 4,    //最大上传数
    showUpload: false, //是否显示上传按钮
    showCaption: false,//是否显示标题
    showRemove: false,
    showCancel:false,
    showPreview: true,
    showUploadedThumbs: false, //是否显示原来的图片
    browseOnZoneClick: true,
    autoReplace: true,
    showBrowse: false,
    uploadExtraData:function(previewId, index) {
        var data = {
            'FileUploader[biz_name]' : $('#biz_select').val(),
            'FileUploader[remark]' : $('#remark').val(),
        };
        return data;
    },
});

$(document).ready(function(){
    var biz_select = $('#biz_select').val()
    var remark = $('#remark').val();

    if (biz_select == "" ||  biz_select == null || remark == ""){
        $('#file').fileinput({browseOnZoneClick: false,});
        $('#file').fileinput("lock").fileinput('disable');
        $('.file-drop-zone-title').text('请先选择业务类型和添加备注信息');
    }
});

$('#biz_select').change(function () {
    var biz_select = $('#biz_select').val()
    var remark = $('#remark').val();
    if (biz_select != "" &&  biz_select != null && remark !="") {
        $('.file-drop-zone-title').html('拖拽文件到这里 …<br />(or click to select 多个文件)');
        $('.file-drop-zone').css('background-color', 'rgb(255,255,255)');
        $('#file').fileinput({browseOnZoneClick: true,});
        $('#file').fileinput("unlock").fileinput('enable');
    }
});

$('#remark').keyup(function () {
    var biz_select = $('#biz_select').val()
    var remark = $('#remark').val();
    if (biz_select != "" &&  biz_select != null && remark !="") {
        $('.file-drop-zone-title').html('拖拽文件到这里 …<br />(or click to select 多个文件)');
        $('.file-drop-zone').css('background-color', 'rgb(255,255,255)');
        $('#file').fileinput({browseOnZoneClick: true,});
        $('#file').fileinput("unlock").fileinput('enable');
    }else {
        $('#file').fileinput({browseOnZoneClick: false,});
        $('#file').fileinput("lock").fileinput('disable');
        $('.file-drop-zone-title').text('请先选择业务类型和添加备注信息');
        $('.file-drop-zone').css('background-color', 'rgba(0,0,0,0.15)');
    }
});

$('#file').on('filebatchselected', function (event) {
    $('#file').fileinput("upload");
});

$('#file').on('fileuploaded', function (event, data, previewId, index) {
    $.pjax.reload({container: "#gridview-pjax"});
});
