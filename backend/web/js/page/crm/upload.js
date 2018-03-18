$(function ($) {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $.extend({
        initThirdPlugins: function () {
            if ($('#file_data').length > 0) {
                $("#file_data").fileinput({language: 'zh', showUpload: false, showRemove: false, allowedFileExtensions: ['png','jpg'], theme: 'fa', showPreview: false, uploadUrl: '/crm/file-uploader'});
                $('#file_data').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    if (response.success)
                    {
                        $("#file_uploaded").val(response.file);
                        console.log('file uploaded: ' + response.file);
                        //$('#common-upload-form').submit();
                        $('#customer-business_license_url').val(response.file);
                        $("#upload-license-a").attr('ccc',response.file);
                        $('#upload-license-a').show();
                    }
                });
                $('#file_data').on('change', function (event) {
                    $('#file_data').fileinput("upload");
                });
            }

            if ($('#file_data_contract').length > 0) {
                $("#file_data_contract").fileinput({
                    language: 'zh',
                    showUpload: false,
                    showRemove: false,
                    allowedFileExtensions: ['png', 'jpg'],
                    theme: 'fa',
                    showPreview: false,
                    uploadUrl: '/crm/file-uploader'
                });
                $('#file_data_contract').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    if (response.success) {
                        $("#file_uploaded").val(response.file);
                        console.log('file uploaded: ' + response.file);
                        //$('#common-upload-form').submit();
                        if ($('#order_contract_url').val() == '') {
                            var contract_proof = response.file;
                        } else {
                            var contract_proof = $('#order_contract_url').val() + ',' + response.file;
                        }
                        // layer.confirm('您确定上传?', {
                        //     btn: ['确定', '取消']
                        // }, function () {
                        //     var data = new Object();
                        //
                        // });
                        var data = new Object();
                        data.proof = contract_proof;
                        data.type = 'contract';
                        data.id = $('#order_id').val();
                        $.ajax({
                            url: "upload",
                            type: 'post',
                            data: data,
                            success: function (ret) {
                                if (0 === ret.code) {
                                    Utils.Toastr.Success('成功', ret.msg);
                                    $('#m-a-a-a').modal('hide');
                                    $.pjax.reload({container: '.contract_proof'});
                                } else {
                                    Utils.Toastr.Error('失败', ret.msg);
                                }
                            },
                            error: function () {
                                Utils.Toastr.Error('异常', '系统错误');
                            }
                        });

                    }
                    // $.pjax.reload({container: '.contract_proof'});
                    $("#m-a-a-a").hide();
                });
                $('#file_data_contract').on('change', function (event) {
                    $('#file_data_contract').fileinput("upload");
                });
            }

            if ($('#file_data_pay').length > 0) {
                $("#file_data_pay").fileinput({
                    language: 'zh',
                    showUpload: false,
                    showRemove: false,
                    allowedFileExtensions: ['png', 'jpg'],
                    theme: 'fa',
                    showPreview: false,
                    uploadUrl: '/crm/file-uploader'
                });
                $('#file_data_pay').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    if (response.success) {
                        $("#file_uploaded").val(response.file);
                        console.log('file uploaded: ' + response.file);
                        //$('#common-upload-form').submit();
                        var pay_proof = response.file;
                        var data = new Object();
                        data.proof = pay_proof;
                        data.type = 'pay';
                        data.id = $('#order_id').val();
                        $.ajax({
                            url: "upload",
                            type: 'post',
                            data: data,
                            success: function (ret) {
                                if (0 === ret.code) {
                                    Utils.Toastr.Success('成功', ret.msg);
                                    $('#m-a-a-a').modal('hide');
                                    $.pjax.reload({container: '.pay_proof'});
                                } else {
                                    Utils.Toastr.Error('失败', ret.msg);
                                }
                            },
                            error: function () {
                                Utils.Toastr.Error('异常', '系统错误');
                            }
                        });
                    }
                    // $.pjax.reload({container: '.pay_proof'});
                    $("#m-a-a-a").hide();
                });
                $('#file_data_pay').on('change', function (event) {
                    $('#file_data_pay').fileinput("upload");
                });
            }

            if ($('#file_data_other').length > 0) {
                $("#file_data_other").fileinput({
                    language: 'zh',
                    showUpload: false,
                    showRemove: false,
                    allowedFileExtensions: ['png', 'jpg'],
                    theme: 'fa',
                    showPreview: false,
                    uploadUrl: '/crm/file-uploader'
                });
                $('#file_data_other').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    if (response.success) {
                        $("#file_uploaded").val(response.file);
                        console.log('file uploaded: ' + response.file);
                        //$('#common-upload-form').submit();
                        if ($('#order_other_url').val() == '') {
                            var other_proof = response.file;
                        } else {
                            var other_proof = $('#order_other_url').val() + ',' + response.file;
                        }
                        var data = new Object();
                        data.proof = other_proof;
                        data.type = 'other';
                        data.id = $('#order_id').val();
                        $.ajax({
                            url: "upload",
                            type: 'post',
                            data: data,
                            success: function (ret) {
                                if (0 === ret.code) {
                                    Utils.Toastr.Success('成功', ret.msg);
                                    $('#m-a-a-a').modal('hide');
                                    $.pjax.reload({container: '.other_proof'});
                                } else {
                                    Utils.Toastr.Error('失败', ret.msg);
                                }
                            },
                            error: function () {
                                Utils.Toastr.Error('异常', '系统错误');
                            }
                        });
                    }
                    // $.pjax.reload({container: '.other_proof'});
                    $("#m-a-a-a").hide();
                });
                $('#file_data_other').on('change', function (event) {
                    $('#file_data_other').fileinput("upload");
                });
            }
        }
    });
});

function prom() {

    var contract_no = prompt("请输入合同编号", "");
    if (contract_no) {
        var data = new Object();
        data.id = $('#order_id').val();
        data.contract_no = contract_no;
        $.ajax({
            url: "contract",
            type: 'post',
            data: data,
            success: function (ret) {
                if (0 === ret.code) {
                    Utils.Toastr.Success('成功', ret.msg);
                    $('#contract_no').text(contract_no);

                } else {
                    Utils.Toastr.Error('失败', ret.msg);
                }
            },
            error: function () {
                Utils.Toastr.Error('异常', '系统错误');
            }
        });
    }else{
        // Utils.Toastr.Info('提示', '请输入合同编号');
    }

}
