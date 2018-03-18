function del(obj){
    var name = $(obj).attr('tt');
    if($("."+name).length <= 1){
        Utils.Toastr.Info('错误', '最少保留1条');
        return;
    }

    if (confirm("真的要删除吗？")) {
        $(obj).parents('.'+name).remove();
    }
}



function cityList(obj) {
    $city = $(obj).parents('.mi_location').find('.city');
    $.post("/address/get-child-region?id=" + $(obj).val(), function (data) {
        var optHtml = "<option value='-1'>请选择城市</option>";
        for (var key in data.data) {
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        $city.html(optHtml);
    });
}


function districtList(obj){
    $district = $(obj).parents('.mi_location').find('.district');
    $.post("/address/get-child-region?id=" + $(obj).val() , function(data){
        var optHtml = "<option vaule='-1'>请选择地区</option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        $district.html(optHtml);
    });

}



function areaList(obj){
    var area = $(obj).parents('.mi_location').find('.area');
    $.post("/address/get-child-region?id=" + $(obj).val() , function(data){
        var optHtml = "<option vaule='-1'>请选择地区</option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        area.html(optHtml);
    });

}


var $infoToggle = $('.info-toggle');

$infoToggle.click(function() {
    sectionToggle($(this).parents("fieldset"));
});

function sectionToggle($fieldset) {
    var $panel = $fieldset.find(".section-body");
    var $icon =  $fieldset.find(".section-header a");
    $icon.removeClass($panel.is(":hidden") ? "fa-plus-square-o" : "fa-minus-square-o");
    $icon.addClass($panel.is(":hidden") ? "fa-minus-square-o" : "fa-plus-square-o");
    $panel.slideToggle();
}

function downLoadLicense(obj){
    window.open('/crm/customer/down-load?url='+ $(obj).attr('ccc'));
}

$(function(){

    //初始化表单第一项展开，其他关闭
    $("fieldset .section-body").each(function() {
        $(this).css('display','none');
    });

    $("#required-information").show(); //显示基本信息
    $("#bank-info").show(); //银行信息
    $("#shenhe-information").show(); //审核信息


    $("#upload-license-a").click(function () {
        window.open('/crm/customer/down-load?url='+ $("#upload-license-a").attr('ccc'));
    });



    function check(){
        var bol = true;

        var status = $("#status").val();
       // if(status != 2){  //为了兼容老数据
            var name = $("#customer-name").val();
            var id = $("#customer-id").val();
            $.ajax({
                url: '/crm/customer/have-name',
                type: 'post',
                dataType: 'json',
                data: 'name='+name+'&id='+id,
                async:false,
                success: function (msg) {
                    if(msg == 2){
                        Utils.Toastr.Info('错误', '客户名称已经存在');
                        bol = false;
                    }
                }
            })
            if(!bol) return bol;

            var myreg =  /^1[3|4|5|7|8][0-9]{9}$/;
            if(!myreg.test($("#customer-buyer_mobile").val()))
            {
                Utils.Toastr.Info('错误', '授权手机号格式错误');

                return  bol = false;
            }


        $("input[name='bank_account[]']").each(function(){
                if($(this).val() == ''){
                    Utils.Toastr.Info('错误', '银行账号补充完整');

                    return  bol = false;
                }
            });
            if(!bol) return bol;

            if($("#customer-buyer_mobile").val().length != 11){
                Utils.Toastr.Info('错误', '手机号为11位');
                return  bol = false;
            }
            if(!bol) return bol;

            $("input[name='account_name[]']").each(function(){
                if($(this).val() == ''){
                    Utils.Toastr.Info('错误', ' 银行账号名补充完整');
                    return  bol = false;
                }
            });
            if(!bol) return bol;

            $("input[name='bank_name[]']").each(function(){
                if($(this).val() == ''){
                    Utils.Toastr.Info('错误', ' 开户行名称补充完整');
                    return  bol = false;
                }
            });
            if(!bol) return bol;

            $("input[name='registered_address[]']").each(function(){
                if($(this).val() == ''){
                    Utils.Toastr.Info('错误', ' 注册地址补充完整');
                    return  bol = false;
                }
            });
            if(!bol) return bol;

            if($("#customer-business_license_url").val() == ''){
                Utils.Toastr.Info('错误', '请上传营业执照副本');
                return  bol = false;
            }

            if(!bol) return bol;
       // }


        
        $("#customer-form").submit();
    }


    $("#customer-create").click(function (){
        $("#button_action").val('save');
        check();
    })

    $("#customer-submit").click(function (){
        $("#button_action").val('tj');
        check()
    })

    $("#customer_pass").click(function (){

        var remark = $('#check_remark').val();
        if (remark == '') {
            remark = '通过';
        }

        if(confirm('确认审核通过吗？')){
            //$("#action_status").val(1);
            //$("#customer-form").submit();

             $.post('/bpm/approve/approve', {'id': $('#approve_id').val(), 'action': 1, 'comment' : remark, '_csrf' : $('#_csrf').val()}, function (rs) {
                 if (rs.code == 200) {
                    history.back(-1);
                 } else {
                    Utils.Toastr.Info('提示', rs.msg);
                 }
             })
        }




    })

    $("#customer_reject").click(function (){

        if(confirm('确认驳回吗？')){
            /*
            $("#action_status").val(2);
            $("#customer-form").submit();
            */

            var remark = $('#check_remark').val();
            if (remark == '') {
                Utils.Toastr.Info('提示', '请输入驳回原因');
                return;
            }
            $.post('/bpm/approve/approve', {'id': $('#approve_id').val(), 'action': 2, 'comment' : remark, '_csrf' : $('#_csrf').val()}, function (rs) {
                if (rs.code == 200) {
                    history.back(-1);
                } else {
                    Utils.Toastr.Info('提示', rs.msg);
                }
            })
        }

    })

    //增加联系人信息
    $("#add-contact").click(function(){
        if ($(".contact-child").length >=10) {
            Utils.Toastr.Info('错误', '不能超过10个');
            return;
        }
        //var content = '<div class="contact-child"><div class="row"><label class="col-md-2 form-control-label text-right name-11">用户名 </label> <div class="col-xs-3"> <input type="text" name="user_name[]" class="form-control" placeholder=""></div><a class="delete-child" onclick="del(this)"   href="javascript:void(0);" tt="contact-child"><span class="glyphicon glyphicon-minus">删除</span></a></div><div class="row"> <label class="col-md-2 form-control-label text-right name-11">邮箱</label><div class="col-xs-3"> <input type="text" name="email[]" class="form-control" placeholder=""></div> </div><div class="row"><label class="col-md-2 form-control-label text-right name-11">手机</label><div class="col-xs-3"> <input type="text" name="contacts_mobile[]"  class="form-control" placeholder=""> </div></div><div class="row"> <label class="col-md-2 form-control-label text-right name-11">公司电话</label> <div class="col-xs-3"> <input type="text" name="contacts_telephone[]"  class="form-control" > </div> </div> <div class="row"> <label class="col-md-2 form-control-label text-right name-11"> 部门 </label> <div class="col-xs-3"><input type="text" name="department[]" class="form-control" > </div> </div> <div class="row"> <label class="col-md-2 form-control-label text-right name-11">岗位</label> <div class="col-xs-3"> <input type="text" name="position[]"  class="form-control" > </div> </div> <div class="row"> <label class="col-md-2 form-control-label text-right name-11">是否决策人 </label> <div class="col-md-2 mi_location"> <select class="form-control select2" name="is_leader[]"> <option value="1" >否</option> <option value="2" >是</option> </select> </div> </div> <div class="row"><div class="col-md-6"><hr></div></div></div>';
        //$("#contact-group").append(content);

        $("#contact-group").append($(".contact-child").first().clone());
        $(".contacts_id").last().remove()
    });


    //增加发票地址
/*    $("#add_invoice_address").click(function(){
        if ($(".invoice_address_child").length >=10) {
            Utils.Toastr.Info('错误', '不能超过10个');
            return;
        }
        $("#invoice_address_group").append($(".invoice_address_child").first().clone());
        $(".invoice_id").last().remove()

    });*/

    //增加发货地址
/*    $("#add_delivery_address").click(function(){
        if ($(".delivery_address_child").length >=10) {
            Utils.Toastr.Info('错误', '不能超过10个');
            return;
        }
        $("#delivery_address_group").append($(".delivery_address_child").first().clone());
        $(".address_id").last().remove()
    });*/

    //增加银行信息
    $("#add_bank_info").click(function(){
        if ($(".bank_child").length >=3) {
            Utils.Toastr.Info('错误', '不能超过3个');
            return;
        }
        $("#bank_group").append($(".bank_child").first().clone());
        $(".bank_id").last().remove()
    });


});


