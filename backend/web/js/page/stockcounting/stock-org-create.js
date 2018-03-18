$(function(){
    $(document).on('click', "#btn-search", function(){
        var orgId = $("#org_select").val();
        var unitType = $("#unit_type").val();
        //获取门店
        reloadCateTree(orgId, unitType);
    });

    $("#check-submit").click(function(){
        $("#check-submit").prop('disabled', true);
        var params = $("#common-create-form").serialize();
        $.ajax({
            url : '/stockcounting/org-stock-check/create',
            type : "POST",
            cache :  false,
            data : params,
            error: function(){
                $("#check-submit").prop('disabled', false);
            },
            success: function(data){
                if(data.code == 0)
                {
                    Utils.Toastr.Success('Success', data.msg);
                    window.location.href = "/stockcounting/org-stock-check/index";
                }
                else
                {
                    $("#check-submit").prop('disabled', false);
                    Utils.Toastr.Info('Info', data.msg);
                }
            }
        });
    });

    $(document).on('click', '.cancel-current', function () {
        if ($('#categoryTreeSearchInput').val() != '') {
            $('#categoryTreeSearchInput').val('');
            $.zTreeResearch();
        }
        categoryTree.checkNode(categoryTree.getNodeByTId($(this).attr('data-zt-tid')), false, true, true);
    });

    function reloadCateTree(orgId, unitType)
    {
        categoryTree.destroy();
        $('#transfer-list').empty();
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });

        $.ajax({
            cache : false,
            type  : "POST",
            url   : '/stockcounting/org-stock-check/get-good-list',
            data : 'orgId='+orgId+'&unitType='+unitType,
            error:function(){
                Utils.Toastr.Error('error',"网络错误");
            },
            success:function(data){
                categoryTreeVal = jQuery.parseJSON(data);
                categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeVal);
                layer.close(layerIndex);
            }
        });
    }
});