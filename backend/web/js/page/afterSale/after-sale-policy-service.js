$(function(){
	var createForm = $('#policy-service-create-form');
	var updateForm = $('#policy-service-edit-form');
	var createBtn = $('#submit-Policy-service-Create');
    var updateBtn = $('#submit-Policy-Service-Update');

    //创建角色
	createBtn.click(function(){
		createBtn.css('display',"none");
        $('#on-submit').css('display',"block");
		$.post({
		    url: 'create',
            data: createForm.serialize() ,
            dataType: 'json',
            success: function (ret) {
                if (ret.code === 200) {
                    window.location.href = "index";
                } else {
                    createBtn.css('display',"block");
                    $('#on-submit').css('display',"none");
                    Utils.Toastr.Info('错误', ret.data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                createBtn.css('display',"block");
                $('#on-submit').css('display',"none");
                Utils.Toastr.Error('异常', '系统错误' + textStatus);
            }

		});
	});

	    //创建角色
	updateBtn.click(function(){
		updateBtn.css('display',"none");
        $('#on-submit').css('display',"block");
        var id = updateBtn.attr('data-id');
		$.post({
		    url: 'update?id=' + id,
            data: updateForm.serialize() ,
            dataType: 'json',
            success: function (ret) {
                if (ret.code === 200) {
                    window.location.href = "index";
                } else {
                    updateBtn.css('display',"block");
                    $('#on-submit').css('display',"none");
                    Utils.Toastr.Info('错误', ret.data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                updateBtn.css('display',"block");
                $('#on-submit').css('display',"none");
                Utils.Toastr.Error('异常', '系统错误' + textStatus);
            }

		});
	});

	$(document).on('click', '.switchStatusButton', function (req) {
        var status = $(req.target).attr('status');
        var id = $(req.target).attr('id');
        $.ajax({
            cache: true,
            type: "POST",
            url: '/role/switch-status',
            data: 'id='+ id + '&status=' + status,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', data.msg);
                    $(req.target).parent().children().toggleClass('success');

                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '修改角色状态失败');
                    self.location.reload();
                }
            }
        });

    });
});