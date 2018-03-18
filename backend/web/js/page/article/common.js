$(function () {
    var $articleCreateSumbit = $('#submit-ArticleCreate');
    var $articleUpdateSumbit = $('#submit-ArticleUpdate');
    var $articleCreateForm = $('#common-create-form')
    var $articleUpdateForm = $('#common-edit-form')
    var $articleId = $('.article_id').attr("id");

    var $typeCreateSumbit = $('#submit-ArticleTypeCreate');
    var $typeUpdateSumbit = $('#submit-ArticleTypeUpdate');

    $(document).ready(function() {
  		$('.summernote').summernote({
            onImageUpload: function(files, editor, $editable) {
                uploadImage(files, editor, $editable);
        // $('.summernote').summernote('insertNode', files.file);
            },
            height: 450,   //set editable area's height
             codemirror: { // codemirror options
             theme: 'monokai'
            }
        });
        var content = $('.hid_content').val();
        $('.summernote').code(content);
    });

  $articleCreateSumbit.click(function() {
        $articleCreateSumbit.css('display',"none");
        $('#on-submit').css('display',"block");
        var markupStr = $('.summernote').code();
        console.log(markupStr)
        $('.hid_content').val(markupStr);
        $.post({
                url: 'create',
                data: $articleCreateForm.serialize() ,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "index";
                    } else {
                        $articleCreateSumbit.css('display',"block");
                        $('#on-submit').css('display',"none");
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $articleCreateSumbit.css('display',"block");
                    $('#on-submit').css('display',"none");
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );
    });

    $articleUpdateSumbit.click(function() {
        var markupStr = $('.summernote').code();
        $('.hid_content').val(markupStr);
        $.post({
                url: 'update?id='+$articleId,
                data: $articleUpdateForm.serialize() ,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "index";
                    } else {
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );
    });

    $typeCreateSumbit.click(function() {
        $.post({
                url: 'type-create',
                data: $articleCreateForm.serialize() ,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "type-index";
                    } else {
                        
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );
    });

    $typeUpdateSumbit.click(function() {
        var id = $typeUpdateSumbit.attr("data-id");
        $.post({
                url: 'type-update?id='+id,
                data: $articleUpdateForm.serialize() ,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "type-index";
                    } else {
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );
    });

    $(this).keydown( function(e) {
        var key = window.event?e.keyCode:e.which;
        if(key.toString() == "13"){
            return false;
        }
    });
});

function uploadImage(files, editor, $editable){
    var data = new FormData();
    data.append("upload", files[0]);
    $.ajax({  
        data : data,  
        type : "POST",  
        url : "upload", //图片上传出来的url，返回的是图片上传后的路径，http格式  
        cache : false,  
        contentType : false,  
        processData : false,  
        dataType : "json",  
        success: function(data) {//data是返回的hash,key之类的值，key是定义的文件名     
         $('.summernote').summernote('insertImage', data.file['file_path']);  
        },  
        error:function(){  
            alert("上传失败");  
        }  
    });  

}
