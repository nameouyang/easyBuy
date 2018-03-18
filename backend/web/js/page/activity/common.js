$(function ()
{
    $('#save-btn').on('click', function ()
    {
        $("#save-btn").attr("disabled", "disabled");
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.ajax({
            cache: false,
            type: "POST",
            url: $('#at-id-form').attr('action'),
            data: $('#at-id-form').serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = "draft?draftStatus=0";
                } else if (data.code < 0) {
                    $("#save-btn").attr("disabled", false);
                    Utils.Toastr.Error('失败', data.msg);
                } else {
                    $("#save-btn").attr("disabled", false);
                    Utils.Toastr.Info('提示', data.msg);
                }
                layer.close(layerIndex);
            }
        });
    });


    $('#post-btn').on('click', function ()
    {
        $("#post-btn").attr("disabled", "disabled");
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        $.ajax({
            cache: false,
            type: "POST",
            url: $('#at-id-form').attr('action').replace("/create", "/post").replace('/update', '/post'),
            data: $('#at-id-form').serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = "index";
                } else if (data.code < 0) {
                    $("#post-btn").attr("disabled", false);
                    Utils.Toastr.Error('失败', data.msg);
                } else {
                    $("#post-btn").attr("disabled", false);
                    Utils.Toastr.Info('提示', data.msg);
                }
                layer.close(layerIndex);
            }
        });
    });

        $("#ac-audit").on('click', function(){
            layer.confirm('是否确认这次活动', function(index){
                var id = $("#ac-audit").data('id');
                var status = {};
                status.status = 2;
                $.ajax({
                    cache:false,
                    type:"POST",
                    url:"audit?id=" + id,
                    data: status,
                    error:function(){
                        Utils.Toastr.Error('失败', '网络错误');
                    },
                    success:function(data)
                    {
                        if(data.code == 0)
                        {
                            layer.close(index);
                            Utils.Toastr.Success('成功', "审核成功");
                            window.location.href = "/activity/offline-activity/index";
                        }
                        else {
                            layer.close(index);
                            Utils.Toastr.Info('提示', data.msg);
                        }
                    }
                });
            });

        });

        $("#ac-against").on('click', function(){
            layer.prompt({"title": '是否需要驳回', formType: 2}, function(text, index){
                var id = $("#ac-against").data('id');
                var status = {};
                status.status = -1;
                status.reason = text;
                $.ajax({
                    cache:false,
                    type:"POST",
                    url:"audit?id=" + id,
                    data: status,
                    error:function(){
                        Utils.Toastr.Error('失败', '网络错误');
                        layer.close(index);
                    },
                    success:function(data)
                    {
                        if(data.code == 0)
                        {
                            Utils.Toastr.Success('成功', "审核被驳回");
                            window.location.href = "/activity/offline-activity/index";
                        }
                        else
                        {
                            Utils.Toastr.Info('提示', data.msg);
                        }
                        layer.close(index);
                    }
                });
            });
        });

    if ($('#at-id-types').length > 0)
    {
        var types = $('#at-id-types').val().split(',');

        types.forEach(function (type) {
            if (type < 0)
            {
                $('.at-checkbox').each(function ()
                {
                    if ($(this).val() === type)
                    {
                        $(this).attr('checked', 'checked');
                    }
                });
            } else
            {
                $('.at-radio').each(function ()
                {
                    if ($(this).val() === type)
                    {
                        $(this).attr('checked', 'checked');
                        if (type != 0)
                        {
                            $('#at-id-ot').attr("disabled", "disabled");
                        }
                    }
                });
            }
        });
    }

    $(document).on("mouseover", ".activity-org-info",  function(){
        var id = $(this).attr('id');
        var areaList = $(this).attr('data-area-name');
        var orgNameList = $(this).attr("data-org-name");
        var info = "";
        areaList = areaList.split(',');
        orgNameList = orgNameList.split(',');
        for(var key in areaList)
        {
            info = info + areaList[key] + " " + orgNameList[key] + "</br>";
        }
        var layerIndex = layer.load(1, {
            shade: 0
        });
        layer.close(layerIndex);
        layer.tips(info, "#"+id,
            {
                tips: [1, '#3595CC'],
                time: 4000
            });
    });

    $(document).on("click", "#removeFile", function(){
        $("#file_path").val("");
        $("#file_upload_name").val("");
        $("#upload_show").empty();
    });

    $.extend({
        initThirdPlugins: function () {
            if ($('#file_data').length > 0) {
                $("#file_data").fileinput({
                    language: 'zh',
                    showUpload: false,
                    showRemove: false,
                    allowedFileExtensions: ['xlsx', 'png', 'doc',
                        'pdf', 'ppt', 'zip', 'jpg',
                        'gif', 'rar',
                        'txt', 'xls', 'pptx', 'docx'],
                    theme: 'fa',
                    showPreview: false,
                    browseClass: "btn btn-primary",
                    uploadUrl: '/activity/offline-activity/upload'
                });
                $('#file_data').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    var html = '';
                    if (response.success) {
                        $("#upload_show").empty();
                        $("#file_path").val(response.file['url']);
                        $("#file_upload_name").val(response.file['name']);
                        $('#file_name').html(response.file['name']);
                        $('#m-a-a-a').modal('hide');

                        $("#img_uploaded").attr("src", response.file['img']);
                        html = $('#img_uploaded').html();
                        html = $('#add_file').html();
                        $("#upload_show").append(html);
                    }
                });
                $('#file_data').on('change', function (event) {
                    $('#file_data').fileinput("upload");
                });
            }
        }
    });

    $('.at-checkbox').each(function ()
    {
        if ('undefined' !== typeof ($(this).attr("checked")))
        {
            disabledItems(true);
        }
    });

    $('.at-checkbox').on('click', function ()
    {
        $('.at-radio').each(
                function () {
                    $(this).removeAttr("checked");
                }
        );

        disabledItems($('.at-checkbox:checked').length > 0);
    });

    $('.at-radio').on('click', function ()
    {
        $('.at-checkbox').each(
                function () {
                    $(this).removeAttr("checked");
                }
        );
        disabledItems(false);
        if ($(this).val() != 0)
        {
            $('#at-id-ot').attr("disabled", "disabled");
            $('#at-id-ot').val('');
        } else
        {
            $('#at-id-ot').removeAttr("disabled");
        }
    });

    if ($('#org-type').length > 0)
    {
        orgtype = $('#org-type').val();
        $('#org-1').val($('#se-org').html());

        if (orgtype <= 0)
        {
            realType = $('#se-type').val() < 0 ? 2 : 1;
            $('#se-org').empty();
            $('#se-org').append($('#org-' + realType).val());
            realText = realType === 2 ? '按活动范围搜索' : '按门店搜索';
            $('#select2-se-org-container').attr('title', realText)
            $('#select2-se-org-container').text(realText);
        } else
        {
            $('#se-org').empty();
            $('#se-org').append($('#org-1').val());
        }

        $('#se-org').val(orgtype);

        $('#se-type').change(function () {

            var orgOVal = $('#se-org').val();
            if ($(this).val() < 0)
            {
                if (orgOVal == '' || isNaN(orgOVal))
                {
                    $('#se-org').empty();
                    $('#se-org').append($('#org-2').val());
                    $('#select2-se-org-container').attr('title', '按活动范围搜索')
                    $('#select2-se-org-container').text('按活动范围搜索');
                }

            } else
            {
                if (!isNaN(orgOVal))
                {
                    $('#se-org').empty();
                    $('#se-org').append($('#org-1').val());
                    $('#select2-se-org-container').attr('title', '按门店搜索')
                    $('#select2-se-org-container').text('按门店搜索');
                }
            }
        });

    }

   $("#at-id-start-at-dp").on("dp.change", function (e) {

       if(e.date <= $("#at-id-end-at-dp").data("DateTimePicker").date())
       {
           return;
       }

      $("#at-id-end-at-dp").data("DateTimePicker").minDate(e.date);
      $("#at-id-end-at").val('');
   });
    $("#at-id-start-at-dp").on("dp.hide", function (e) {
        $("#at-id-end-at-dp").data("DateTimePicker").show();
    });
    function disabledItems(disabled)
    {
        if (disabled)
        {
            $('#at-id-address').attr("disabled", "disabled");
            $('#at-id-org').attr("disabled", "disabled");
            $('#at-id-ot').attr("disabled", "disabled");
        } else
        {
            $('#at-id-address').removeAttr("disabled");
            if ($('#at-id-org').attr("data-type") == 1)
            {
                $('#at-id-org').removeAttr("disabled");
            }
            $('#at-id-ot').removeAttr("disabled");
        }
    }

}
);
