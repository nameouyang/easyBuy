/**
 * Created by wzm on 17-12-14.
 */

// 文件上传

        $('#file').fileinput({
            language: 'zh', //设置语言
            uploadUrl: '/util/file/upload', //上传的地址
            allowedFileExtensions: ['jpg', 'png', 'gif'], //接收的文件后缀
            uploadAsync: true,
            dropZoneEnabled: false,
            maxFileCount: 8,    //最大上传数
            showUpload: false,  //是否显示上传按钮
            showCaption: false, //是否显示标题
            showRemove: false,
            showCancel: false,
            showPreview: false,
            showUploadedThumbs: false, //是否显示原来的图片
            browseOnZoneClick: false,
            autoReplace: false,
            showBrowse: true,
            browseClass: 'btn white',
            uploadExtraData: function (previewId, index) {
                return {
                    'FileUploader[biz_name]': "oms",
                    'FileUploader[remark]': "org upload"
                };
            }
        }).on('filebatchselected', function (event) {
            $(this).fileinput("upload");
        }).on('fileuploaded', function (event, data, previewId, index) {
            console.log(data.response);
            var url = data.response.data;
            var imageUrl = "https://i6.mifile.cn/" + url;
            // $('.image').attr("src", imageUrl);
            $('.field-feedback-attachment').before('<div style="position:relative;width: 120px;float: left;"><img src="'+ imageUrl +'" class="image" width="100" height="80" style="border:1px solid #ccc;border-radius:7px;"/><i class="fa fa-times" style="cursor: pointer;position:absolute" id="del-image"></i></div><input type="hidden" name="Feedback[attachment][]" value="'+ imageUrl +'">');

        });

$('#message-file').fileinput({
    language: 'zh', //设置语言
    uploadUrl: '/util/file/upload', //上传的地址
    allowedFileExtensions: ['jpg', 'png', 'gif'], //接收的文件后缀
    uploadAsync: true,
    dropZoneEnabled: false,
    maxFileCount: 8,    //最大上传数
    showUpload: false,  //是否显示上传按钮
    showCaption: false, //是否显示标题
    showRemove: false,
    showCancel: false,
    showPreview: false,
    showUploadedThumbs: false, //是否显示原来的图片
    browseOnZoneClick: false,
    autoReplace: false,
    showBrowse: true,
    browseClass: 'btn white',
    uploadExtraData: function (previewId, index) {
        return {
            'FileUploader[biz_name]': "oms",
            'FileUploader[remark]': "org upload"
        };
    }
}).on('filebatchselected', function (event) {
    $(this).fileinput("upload");
}).on('fileuploaded', function (event, data, previewId, index) {
    console.log(data.response);
    var url = data.response.data;
    var imageUrl = "https://i6.mifile.cn/" + url;
    // $('.image').attr("src", imageUrl);
    $('.field-feedback-attachment').before('<div style="position:relative;width: 120px;float: left;"><img src="'+ imageUrl +'" class="image" width="100" height="80" style="border:1px solid #ccc;border-radius:7px;"/><i class="fa fa-times" style="cursor: pointer;position:absolute" id="del-image"></i></div><input type="hidden" name="message-attachment" value="'+ imageUrl +'">');
});

$('body').on('click', '#del-image', function () {
    var parent = $(this).parent();
    var hidden = parent.next();
    parent.remove();
    hidden.remove();
    if (!$('#del-image').length > 0) {
        $('.progress').remove();
    }
});


        $("select[name='first_system']").change(function(){
            var first_system = $(this).val();
            var csrf = $("input[name='_csrf']").val();

            $.ajax({
                method: "POST",
                url: "/feedback/feedback/update-second-system",
                data: {
                    'parent_id': first_system,
                    '_csrf': csrf
                },
                dataType: "JSON",
                success: function (data) {
                    var optHtml = "<option value='-1'>请选择二级模块</option>";
                    for(var key in data.data){
                        optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
                    }
                    var select = $("select[name='second_system']");
                    select.html(optHtml);
                    select.addClass("option:first").prop("selected", 'selected');
                    select.trigger('change.select2');
                }
            })
        });
// 默认选中模块和问题
        var project_id = $("input[name='project_id']").val();
        var detail_parent_system = $("input[name='detail_parent_system']").val();
        if (project_id) {
            $("select[name='first_system']").val(detail_parent_system);
        }
        if (detail_parent_system) {
            $("#detail_second_system select[name='second_system']").val(project_id);
        }

        var first_question_id = $("input[name='first_question_id']").val();
        var second_question_id = $("input[name='second_question_id']").val();
        var third_question_id = $("input[name='third_question_id']").val();
        if (first_question_id) {
            if (first_question_id != 0) {
                $("select[name='first_question']").val(first_question_id);
            }
        }
        if (second_question_id != 0) {
            $("#detail_second_question select[name='second_question']").val(second_question_id);
        }
        if (third_question_id != 0) {
            $("#detail_third_question select[name='third_question']").val(third_question_id);

        }

        $("select[name='first_question']").change(function(){
            var first_question = $(this).val();

            $.ajax({
                method: "POST",
                url: "/feedback/feedback/update-question",
                data: {
                    'parent_id': first_question
                },
                dataType: "JSON",
                success: function (data) {
                    var optHtml = "<option value='-1'>请选择二级问题</option>";
                    var ThirdOptHtml = "<option value='-1'>请选择三级问题</option>";
                    for(var key in data.data){
                        optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
                    }
                    var selectSecond = $("select[name='second_question']");
                    var selectThird = $("select[name='third_question']");
                    selectSecond.html(optHtml);
                    selectSecond.addClass("option:first").prop("selected", 'selected');
                    selectSecond.trigger('change.select2');
                    selectThird.html(ThirdOptHtml);
                    selectThird.addClass("option:first").prop("selected", 'selected');
                    selectThird.trigger('change.select2');
                }
            })
        });

        $("select[name='second_question']").change(function(){
            var second_question = $(this).val();

            $.ajax({
                method: "POST",
                url: "/feedback/feedback/update-question",
                data: {
                    'parent_id': second_question
                },
                dataType: "JSON",
                success: function (data) {
                    var optHtml = "<option value='-1'>请选择三级问题</option>";
                    for(var key in data.data){
                        optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
                    }
                    var select = $("select[name='third_question']");
                    select.html(optHtml);
                    select.addClass("option:first").prop("selected", 'selected');
                    select.trigger('change.select2');
                }
            })
        });

        $("#detail_project_name").click(function(){
            $("#detail_project_name").css("display","none");
            $("#detail_first_system").css("display","");
            $("#detail_second_system").css("display","");
        });

        $("#detail_second_system select[name='second_system']").change(function () {
            var secondSystem = $(this).val();
            var feedbackId = $("span[name='feedback_id']").text();
            var csrf = $("input[name='_csrf']").val();

            $.ajax({
                method: "POST",
                url: "/feedback/feedback/ajax-set-system",
                data: {
                    'id': feedbackId,
                    'project_id': secondSystem,
                    '_csrf': csrf
                },
                dataType: "JSON",
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        Utils.Toastr.Success('成功', '切换模块成功');
                    }
                }
            })
        });

        $("#detail_first_question select[name='first_question']").change(function () {
            var feedbackId = $("span[name='feedback_id']").text();
            var first_question = $(this).val();
            if (first_question == -1) {
                $.ajax({
                    method: "POST",
                    url: "/feedback/feedback/ajax-clear-question",
                    data: {
                        'id': feedbackId,
                    },
                    dataType: "JSON",
                    success: function (data) {
                        console.log(data);
                        if (data.code == 200) {
                            $("span[name='level_data']").html('');
                        }
                    }
                })
            }
            $.ajax({
                method: "POST",
                url: "/feedback/feedback/update-question",
                data: {
                    'parent_id': first_question
                },
                dataType: "JSON",
                success: function (data) {
                    var optHtml = "<option value='-1'>请选择二级问题</option>";
                    var ThirdOptHtml = "<option value='-1'>请选择三级问题</option>";
                    for(var key in data.data){
                        optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
                    }
                    var selectSecond = $("select[name='second_question']");
                    var selectThird = $("select[name='third_question']");
                    selectSecond.html(optHtml);
                    selectSecond.addClass("option:first").prop("selected", 'selected');
                    selectSecond.trigger('change.select2');
                    selectThird.html(ThirdOptHtml);
                    selectThird.addClass("option:first").prop("selected", 'selected');
                    selectThird.trigger('change.select2');
                }
            })
        });

        $("#detail_second_question select[name='second_question']").change(function () {
            var secondQuestion = $(this).val();
            var feedbackId = $("span[name='feedback_id']").text();

            $.ajax({
                method: "POST",
                url: "/feedback/feedback/update-question",
                data: {
                    'parent_id': secondQuestion
                },
                dataType: "JSON",
                success: function (data) {
                    if (data.data.length !== 0) {
                        var optHtml = "<option value='-1'>请选择三级问题</option>";
                        for(var key in data.data){
                            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
                        }
                        var select = $("select[name='third_question']");
                        select.html(optHtml);
                        select.addClass("option:first").prop("selected", 'selected');
                        select.trigger('change.select2');
                    } else {
                        $.ajax({
                            method: "POST",
                            url: "/feedback/feedback/ajax-set-question",
                            data: {
                                'id': feedbackId,
                                'question_id': secondQuestion
                            },
                            dataType: "JSON",
                            success: function (data) {
                                console.log(data);
                                if (data.code == 200) {
                                    Utils.Toastr.Success('成功', '切换问题成功');
                                }
                            }
                        })
                    }
                }
            })
        });

        $("#detail_third_question select[name='third_question']").change(function () {
            var thirdQuestion = $(this).val();
            var feedbackId = $("span[name='feedback_id']").text();

            $.ajax({
                method: "POST",
                url: "/feedback/feedback/ajax-set-question",
                data: {
                    'id': feedbackId,
                    'question_id': thirdQuestion
                },
                dataType: "JSON",
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        $("span[name='level_data']").html(data.data);
                        Utils.Toastr.Success('成功', '切换问题成功');
                    }
                }
            })
        });

        $("#detail_type").find("select[name='Feedback[type]']").change(function () {
            var type = $(this).val();
            var feedbackId = $("span[name='feedback_id']").text();

            $.ajax({
                method: "POST",
                url: "/feedback/feedback/ajax-set-type",
                data: {
                    'id': feedbackId,
                    'type': type
                },
                dataType: "JSON",
                success: function (data) {
                    if (data.code == 200) {
                        Utils.Toastr.Success('成功', '切换类型成功');
                        console.log(data);
                    }
                }
            })
        });

        $("#detail_source").find("select[name='Feedback[source]']").change(function () {
            var source = $(this).val();
            var feedbackId = $("span[name='feedback_id']").text();

            $.ajax({
                method: "POST",
                url: "/feedback/feedback/ajax-set-source",
                data: {
                    'id': feedbackId,
                    'source': source
                },
                dataType: "JSON",
                success: function (data) {
                    if (data.code == 200) {
                        Utils.Toastr.Success('成功', '切换来源成功');
                        console.log(data);
                    }
                }
            })
        });