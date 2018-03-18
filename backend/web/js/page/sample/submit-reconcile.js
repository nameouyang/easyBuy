/**
 * @author hanlu1@xiaomi.com
 * @data 2017-11-23
 */

$(function(){
    $(document).on('click', '#check-sample', function() {
        layer.open({
            type: 1,
            skin: 'layui-layer-rim',
            area: ['380px', '210px'],
            closeBtn : 1,
            shadeClose : false,
            content: "<div class='padding'>" +
            "<div><h6>是否提交盘点结果</h6></div>" +
            "<div class='p-t-1'><input type='checkbox' name='check' value='1'>提交人对盘点结果负责</div>" +
            "<div class='p-t-1'><div style='float:left' class='p-r-1'><input type='button' class='btn btn-default btn-sm blue ' value='确定' onclick='sendReconcile(this)'></div><div class='p-l-1'><input type='button' class='btn btn-default btn-sm gray-100' value='取消' onclick='cancel(this)'></div></div>" +
            "</div>"
        });
    });
})

function sendReconcile(index)
{
    var status = $("input[name='check']").prop("checked");
    if(status == false)
    {
        Utils.Toastr.Info("没有选中确认框");
        return ;
    }
    $.ajax({
        data: $("#common-check").serialize(),
        url : $("#check-sample").data("url"),
        type: "POST",
        cache : false,
        error: function()
        {
            Utils.Toastr.Error("错误", "网络问题");
        },
        success:function(data)
        {
            if(data.code == 0)
            {
                Utils.Toastr.Success("成功", data.msg);
                location.href = "/sample/reconcile-order/index";
            }
            else {
                Utils.Toastr.Warning("提示", data.msg);
                cancel();
            }
        }
    })
    //window.location.reload();
}

function cancel(index)
{
    window.location.reload();
}
