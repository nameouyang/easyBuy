$(function(){
    var code = $("#code").attr("data-code");
    console.log(code)
    if(code == 10001){
        Utils.Toastr.Info('错误', '开始日期不能比结束日期大');
    }

});