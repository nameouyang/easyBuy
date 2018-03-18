$(function () {
    // $(document).on('click','#myTab a',function () {
    //     var id=$(this).data('target');
    //     $('#orderCardArea').show();
    // });
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    var tabType=GetQueryString('tab-type');
    if(tabType == 2){
        $('#myTab li:eq(1) a').tab('show')
    }else if(tabType == 3){
        $('#myTab li:eq(2) a').tab('show')
    }else{
        $('#myTab li:eq(0) a').tab('show')
    }

});
