$(function($){
	$("#delete-all").click(function(event) {
		var ret = confirm('确定是否清除所有数据？');
		if(ret){
			$.post({
			    url: 'delete-all',
	            data: '',
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
			});
		}
	});
});