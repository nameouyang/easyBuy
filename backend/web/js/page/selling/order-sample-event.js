$(function () {
	 $('#sample-order-print').click(function(){
	 	var order_id = $('#sample-order-id-flag').attr('order_id');
        window.open("/selling/order-sample/print?id=" + order_id, "__blank");
	 });

    $('#sample-audit_pass').click(function(){
		layer.confirm('提交之前，请您慎重、慎重、再慎重的核对录入的信息，您确认要提交吗？', {title:'系统提示',btn: ['确定', '取消']}, 
			function(){
			 	var order_id = $('#sample-order-id-flag').attr('order_id');
			 	var audit_content = $('#audit_content').val();
		        $.ajax({
		            url: "/selling/order-sample/post-audit",
		            type: 'post',
		            data: {'order_id':order_id,'audit_content': audit_content},
		            success: function (ret) {
		                if (0 === ret.code) {
		                    Utils.Toastr.Success('成功', ret.msg);
		                    window.location.href = "/selling/order-sample/index";
		                } else {
		                    Utils.Toastr.Error('失败', ret.msg);
		                }
		            },
		            error: function () {
		                Utils.Toastr.Error('异常', '系统错误');
		            }
		        });
		    },function(){}
		)
	});

	
    $('#sample-audit_refuse').click(function(){
		layer.confirm('提交之前，请您慎重、慎重、再慎重的核对信息，您确认要提交吗？', {title:'系统提示',btn: ['确定', '取消']}, 
			function(){
			 	var order_id = $('#sample-order-id-flag').attr('order_id');
			 	var audit_content = $('#audit_content').val();
		        $.ajax({
		            url: "/selling/order-sample/refuse-audit",
		            type: 'post',
		            data: {'order_id':order_id,'audit_content': audit_content},
		            success: function (ret) {
		                if (0 === ret.code) {
		                    Utils.Toastr.Success('成功', ret.msg);
		                    window.location.href = "/selling/order-sample/index";
		                } else {
		                    Utils.Toastr.Error('失败', ret.msg);
		                }
		            },
		            error: function () {
		                Utils.Toastr.Error('异常', '系统错误');
		            }
		        });
		    }
			,function(){}
		)
	});
    $('#sample-payment_pass').click(function(){
		layer.confirm('提交之前，请您慎重、慎重、再慎重的核对信息，您确认要提交吗？', {title:'系统提示',btn: ['确定', '取消']}, 
			function(){
			 	var order_id = $('#sample-order-id-flag').attr('order_id');
		        
		        $.ajax({
		            url: "/selling/order-sample/payment-pass",
		            type: 'post',
		            data: {'order_id':order_id},
		            success: function (ret) {
		                if (0 === ret.code) {
		                    Utils.Toastr.Success('成功', ret.msg);
		                    window.location.href = "/selling/order-sample/index";
		                } else {
		                    Utils.Toastr.Error('失败', ret.msg);
		                }
		            },
		            error: function () {
		                Utils.Toastr.Error('异常', '系统错误');
		            }
		        });
		    }
			,function(){}
		)
	});

});



