$(function () {

    reloadCateTree();
    categoryTreeVal = '';
    $('#sampleorg-id').change(reloadCateTree);
    $(document).on('click', '#transfer-submit', 
		function(){
			layer.confirm('提交之前，请您慎重、慎重、再慎重的核对录入的信息，您确认要提交吗？', {title:'系统提示',btn: ['确定', '取消']},function () {
	        var layerIndex = layer.load(0, {
	            shade: [0.2, '#000']
	        });
	        $.post("/selling/order-sample/create",
				$('#order-sample-list-batch-add-form').serialize(),
		        function (data) {
		            if (data.code == 0) {
		                Utils.Toastr.Success('成功', data.msg);
		                window.location.href = '/selling/order-sample/index';
		            } else {
		                Utils.Toastr.Error('失败', data.msg);
		            }
		            layer.close(layerIndex);
		        },"json");
		    },function(){}
		)
	});


    function reloadCateTree(warehouseId, orgId)
    {
        categoryTree.destroy();
        var orgid = $('#sampleorg-id').val();
        if(orgid == ''){
            return;
        }
        $('#transfer-list').empty();
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        $.ajax({
            cache: false,
            type: "POST",
            url: '/selling/order-sample/get-sample-goods-nodes',
            data:{'orgid':orgid},
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                layer.close(layerIndex);
            },
            success: function (data) {
                categoryTreeVal = jQuery.parseJSON(data);
                categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
                layer.close(layerIndex);
            }
        });

    }


  


});
