$(function () {
    
    $(".province-select").on("change",cityList);
    $(".city-select").on("change", districtList);

    //初始化城市 是为目前印度只有一个省做方便处理 
    function cityList() {
        var areaCode = $('#areaCodeId').val();
        var provinceId = $('.province-select').val();
        $.post("/address/get-child-region?id=" + provinceId + "&areaCode=" + areaCode, function(data) {
            var data = data.data; 
            var lang = $('html').attr('lang');
            switch(lang){
                case 'zh-TW':
                    var optHtml = "<option value>請選擇城市</option>";
                    break;
                case 'zh-CN':
                    var optHtml = "<option value>请选择城市</option>";
                    break;
                case 'en-IN':
                    var optHtml = "<option value>Please Select City</option>";
                    break;
                default:
                    var optHtml = "<option value>Please Select City</option>";
                    break;
            }
            for(var key in data){
                optHtml += "<option value=" + key + ">" + data[key] + "</option>";
            }
            $(".city-select").html(optHtml);
            $(".city-select").addClass("option:first").prop("selected", 'selected');
            $(".city-select").trigger('change.select2');
            
            switch(lang){
                case 'zh-TW':
                    $('.district-select').html("<option value>請選擇地區</option>"); 
                    break;
                case 'zh-CN':
                    $('.district-select').html("<option value>请选择地区</option>"); 
                    break;
                case 'en-IN':
                    $('.district-select').html("<option value>Please Select District</option>"); 
                    break;
                default:
                    $('.district-select').html("<option value>Please Select District</option>"); 
                    break;
            }
            $(".district-select").addClass("option:first").prop("selected", 'selected');
            $(".district-select").trigger('change.select2');
        });
    }
   function districtList(){

        var areaCode = $('#areaCodeId').val();
        var cityId   = $('.city-select').val(); 
        $.post("/address/get-child-region?id=" + cityId + "&areaCode=" + areaCode, function(data) {
            var data = data.data; 
            var lang = $('html').attr('lang');
            switch(lang){
                case 'zh-TW':
                    var optHtml = "<option value>請選擇地區</option>";
                    break;
                case 'zh-CN':
                    var optHtml = "<option value>请选择地区</option>";
                    break;
                case 'en-IN':
                    var optHtml = "<option value>Please Select District</option>";
                    break;
                default:
                    var optHtml = "<option value>Please Select District</option>";
                    break;
            }
            for(var key in data){
                optHtml += "<option value=" + key + ">" + data[key] + "</option>";
            }
            $(".district-select").html(optHtml);
            $(".district-select").addClass("option:first").prop("selected", 'selected');
            $(".district-select").trigger('change.select2');
        });
    }

    // 上传控件初始化ID
    var initUploadFileId = [];
    initUploadFileId["show"] = $(".show-image-box tr").length;
    initUploadFileId["activity"] = $(".activity-image-box tr").length;

    // 商城图片上传列表
    var shopImageUploadList = [
        "detail",
        "list",
        "icon",
        "oncity",
        "offcity",
        "global",
        "gloablurl"
    ];

    // 展示和活动图片
    var showImageLine = '<tr>' +
        '<td>' +
        '<img src="https://i6.mifile.cn/b2c-men/oms/1/66/5968dc0585072.png" class="image" width="45" height="38" style="border:1px solid #ccc;border-radius:7px;" />' +
        '<input type="hidden" name="Organization[{module}-image][]">' +
        '</td>' +
        '<td>' +
        '<input type="file" class="{fileId}" name="FileUploader[file]" accept="image/*">' +
        '</td>' +
        '<td><input type="text" class="form-control" name="Organization[{module}-title][]"></td>' +
        '<td><input type="text" class="form-control" name="Organization[{module}-description][]"></td>' +
        '<td><input type="text" class="form-control" name="Organization[{module}-href][]"></td>' +
        '<td><input type="text" class="form-control" name="Organization[{module}-order][]"></td>' +
        '<td>' +
        '<span class="btn btn-icon white">' +
        '<i class="fa fa-plus"></i>' +
        '</span>' +
        '</td>' +
        '</tr>';

    // 添加一行
    $(document).on("click", ".show-image-box .fa-plus", function () {
        initUploadImageLine('show');
    });

    // 添加一行
    $(document).on("click", ".activity-image-box .fa-plus", function () {
        initUploadImageLine('activity');
    });

    // 移除一行
    $(document).on("click", ".end-remove", function () {
        var isDelete = confirm("真的要删除吗？");
        if (isDelete === true) {
            $(this).parent().parent().parent().remove();
        }
    });

    //删除第一张图片
    $(document).on("click", ".first-image", function () {
        var isDelete = confirm("真的要删除吗？");
        if (isDelete === true) {
            $(this).parent().prev().val('');
            $(this).parent().prev().prev().attr('src', 'https://i6.mifile.cn/b2c-men/oms/1/66/5968dc0585072.png');
        }
    });

    // 文件上传
    var initUploadFIle = function (elem, module) {
        $(elem).fileinput({
            language: 'zh', //设置语言
            uploadUrl: '/util/file/upload', //上传的地址
            allowedFileExtensions: ['jpg', 'png', 'gif'], //接收的文件后缀
            uploadAsync: true,
            dropZoneEnabled: false,
            maxFileCount: 1,    //最大上传数
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
            // var imageUrl = "https://s01.mifile.cn/i/logo-footer.png?v2&tm=" + Math.random();
            var imageUrl = "https://i6.mifile.cn/" + url;

            var imageEle = $(this).parent().parent().parent().prev();
            imageEle.find("img").attr("src", imageUrl);
            imageEle.find("img").attr("title", imageUrl);

            if (module == "shop") {
                var type = $(this).attr("data-type");
                $("input[name='Organization[imageurl-shop-" + type + "]'").val(imageUrl);
            } else {
                imageEle.find("input").val(imageUrl);
            }
        });
    };

    // 初始化一行一行
    var initUploadImageLine = function (module) {
        // eval("initUploadFileId." + module);

        var currentUploadFileField = "upload-file-" + ++initUploadFileId[module];
        var currentUploadFileClass = "." + currentUploadFileField;

        // 替换模块
        var reg = new RegExp("{module}", "g");
        var trHtm = showImageLine.replace(reg, module).replace("{fileId}", currentUploadFileField);
        if (initUploadFileId[module] > 1) {
            trHtm = trHtm.replace("fa-plus", "fa-remove end-remove");
        }

        // 替换file input id
        $("." + module + "-image-box").append("<tr>" + trHtm + "</tr>");

        // 初始化上传控件
        initUploadFIle($(currentUploadFileClass), module);
    };

    // 初始化展示和活动图片
    if ($(".show-image-box tr").length == 0) {
        initUploadImageLine("show");
    } else {
        // 1、获取当前 tbody 里面的所有 tr
        // 2、each 遍历 tr 调用 initUploadFIle();
        for (var i = 1; i <= $(".show-image-box tr").length; i++) {
            initUploadFIle($(".upload-file-" + i), "show");
        }

    }

    if ($(".activity-image-box tr").length == 0) {
        initUploadImageLine("activity");
    } else {
        for (var i = 1; i <= $(".activity-image-box tr").length; i++) {
            initUploadFIle($(".upload-file-" + i), "activity");
        }

    }

    // 初始化商城图片
    $.each(shopImageUploadList, (function (k, v) {
        initUploadFIle($(".upload-file-" + v), "shop");
    }));

    $('fieldset:first').css('border-top',0);
});
