// +----------------------------------------------------------------------
// | XIAOMI OMS
// +----------------------------------------------------------------------
// | Copyright (c) 2017 http://www.xiaomi.com/license/ rights reserved.
// +----------------------------------------------------------------------
// | Author: chenpingbin <chenpingbin@xiaomi.com>
// +----------------------------------------------------------------------
// | Time: 17-8-25 上午10:43
// +----------------------------------------------------------------------


$(function(){

    //商品分类联动
    $('#area').change(function(){
        var defOpt = '<option value="">请选择门店编号</option>';
        $.post('/transfer2/org-goods-sales/get-orgs-by-area?area_id='+$(this).val(),function(data){
            $('#org_id').html(defOpt);
            $('#select2-org_id-container').html(defOpt);
            $('#org_id').append(data);
        });
    });

    //固定表头
    $('.table thead tr').css({'display':'block','position': 'relative'});
    $('.table thead tr th').css({'display':'block','float':'left'});
    $('.table tbody').css({'display':'block','overflow':'auto','height':'500px'});
    $('.table tbody tr').css({'text-align': 'center','display': 'block','position': 'relative'});

});