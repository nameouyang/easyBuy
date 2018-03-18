$(function(){
    var city = [$("#organization-city"), $("#organizationextension-city")];
    var district = [$('#organization-district'), $("#organizationextension-district")];
    var $orgCreateSumbit = $('#submit-createOrg');
    var $orgUpdateSumbit = $('#submit-updateOrg');
    var $orgForm = $('#org-form');
    var $orgId = $('#organization-id');
    var $infoToggle = $('.info-toggle');
    var $saveButton = $('.section-save a');

    var overseaOrgForm = $('#oversea-org-form');
    var updateOrgOverSeaSubmit = $('#submit-updateOrgOverSea');
    //初始化 select2
    freshSelect2(); 

    //初始化 省份
    // initProvince();


    //初始化表单第一项展开，其他关闭
    $("fieldset .section-body").each(function() {
        $(this).css('display','none');
    });

    $("fieldset .section-body").first().css('display', 'block');

    //如果为view,readOnly 所以
    if ($('.is-view').length > 0) {
        $('input, select, textarea').attr('disabled', true);
        $('select').attr('disabled', true);
        $('.add-row, .delete-row, .add-address, .delete-address-row, #submit-updateOrg, .btn-default, #submit-updateOrgOverSea').remove();
    }

    function sectionToggle($fieldset) {
        var $panel = $fieldset.find(".section-body");
        var $icon =  $fieldset.find(".section-header a");
        $icon.removeClass($panel.is(":hidden") ? "fa-plus-square-o" : "fa-minus-square-o");
        $icon.addClass($panel.is(":hidden") ? "fa-minus-square-o" : "fa-plus-square-o");
        $panel.slideToggle();
    }

    function freshSelect2() {
        $(".company_money_account_status").select2({
                theme:'bootstrap'
        });
        $(".other_address_status").select2({
                theme:'bootstrap'
        });
    }

    function initProvince() {
        $province = $('.mi_location').find('.province');
        $country = $('.country_location').attr('data-country');
        $.post("/org-address/get-child-region?id=" + $country , function(data) {
            var optHtml = "<option value='-1'>请选择省份</option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $province.html(optHtml);
            $province.addClass("option:first").prop("selected", 'selected');
            $province.trigger('change.select2');
        });
        $('.mi_location_new').addClass('mi_location');
        $('.mi_location_new').removeClass('mi_location_new');
    }
    $(".section-content").on('select2:select', '.country', function() {

        $province = $(this).parents('.mi_location').find('.province');
        $city = $(this).parents('.mi_location').find('.city');
        $district = $(this).parents('.mi_location').find('.district');
        $.post("/org-address/get-child-region?id=" + $(this).val() , function(data){
            var optHtml = "<option value='-1'>请选择省份</option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $province.html(optHtml);
            $province.addClass("option:first").prop("selected", 'selected');
            $province.trigger('change.select2');
            $city.html("<option value='-1'>请选择城市</option>");
            $city.addClass("option:first").prop("selected", 'selected');
            $city.trigger('change.select2');
            $district.html("<option value='-1'>请选择地区</option>");
            $district.addClass("option:first").prop("selected", 'selected');
            $district.trigger('change.select2');
        });
    });


    $(".section-content").on('select2:select', '.province', function() {
        $city = $(this).parents('.mi_location').find('.city');
        $street = $(this).parents('.mi_location').find('.street');
        $district = $(this).parents('.mi_location').find('.district');
        $.post("/org-address/get-child-region?id=" + $(this).val() , function(data){
            var optHtml = "<option value='-1'>请选择城市</option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $city.html(optHtml);
            $city.addClass("option:first").prop("selected", 'selected');
            $city.trigger('change.select2');
            $district.html("<option value='-1'>请选择地区</option>");
            $district.addClass("option:first").prop("selected", 'selected');
            $district.trigger('change.select2');
        });
    });

    $(".section-content").on('select2:select', '.city', function() {
        $district = $(this).parents('.mi_location').find('.district');
        $.post("/org-address/get-child-region?id=" + $(this).val() , function(data){
            var optHtml = "<option vaule='-1'>请选择地区</option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $district.html(optHtml);
            $district.addClass("option:first").prop("selected", 'selected');
            $district.trigger('change.select2');
        });
    });

    $orgCreateSumbit.click(function() {
        //$orgCreateForm.data('yiiActiveForm').submitting = true;
        $.post({
                url: '/organization/create',
                data: overseaOrgForm.serialize(),
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "/organization/index";
                    } else {
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            }
        );
    });

    updateOrgOverSeaSubmit.click(function() {
        var returnUrl = $("#returnUrl").val();
        if(!returnUrl) {
            returnUrl = '/organization/index';
        }
        $.post({
                url: '/organization/update-oversea-org?id='+$orgId.val(),
                data: overseaOrgForm.serialize() ,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href=returnUrl;
                    } else {
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            }
        );
    });
    $orgUpdateSumbit.click(function() {
        var returnUrl = $("#returnUrl").val();
        if(!returnUrl) {
            returnUrl = '/organization/index';
        }
        //所属区域验证
        var orgAreaId = $('#organization-area_id');
        if(orgAreaId.val() == ''){
            Utils.Toastr.Info('请选择门店所属区域!');
            return false;
        }

        //检测地理位置省市区必填
        var checkProvice = $("#check-province");
        var checkCity = $("#check-city");
        var checkDistrict = $("#check-district");

        if(!checkisNull(checkProvice.val())){
            Utils.Toastr.Info('地理位置-省份为必选项!');
            return false;
        }
        if(!checkisNull(checkCity.val())){
            Utils.Toastr.Info('地理位置-城市为必选项!');
            return false;
        }
        if(!checkisNull(checkDistrict.val())){
            Utils.Toastr.Info('地理位置-地区为必选项!');
            return false;
        }


        //$orgCreateForm.data('yiiActiveForm').submitting = true;
        $.post({
                url: '/organization/update?id='+$orgId.val(),
                data: $orgForm.serialize() ,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href=returnUrl;
                    } else {
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function () {
                    Utils.Toastr.Error('异常', '系统错误');
                }
            }
        );
    });

    $infoToggle.click(function() {
        sectionToggle($(this).parents("fieldset"));
    });

    $saveButton.click(function() {
        sectionToggle($(this).parents("fieldset"));
        var $nextSection = $(this).parents("fieldset").next();
        if ($nextSection.children(".section-body").is(":hidden")) {
            sectionToggle($nextSection);
        }
    });

    $(".section-content").on('click', ".add-address", function(){
        $row = $(this).parents('.section-add').prev().find('.other-address-group').end();
           $insertRow = '<div class="other-address-group"><hr />' +
                '<div class="row form-group">' + 
                    '<label class="col-md-2 form-control-label text-right name-11">' +
                            '类型'+
                    '</label>' +
                    '<div class="col-md-3">' + 
                        '<select type="search" id="organizationextension-other_address_status" class="other_address_status form-control select2 select2-hidden-accessible" name="OrganizationExtension[other_address][type][]"  style="width:100%" tabindex="-1" aria-hidden="true">' +
               '<option value="">请选择收货地址类型</option>' +
               '<option value="3" selected>门店收货地址</option>' +
                        '</select>' + 
                    '</div>' +
            
                    '<div class="text-right" style="margin-right:15px">' +
                            '<a class="delete-address-row" href="javascript:void(0);" ><span class="glyphicon glyphicon-minus">删除</span></a>' + 
                         '</div>' +
                '</div>'+
                '<div class="row form-group form-inline">'+
                    '<label class="col-md-2 form-control-label text-right name-11">' +
                    '区域' +
                    '</label>' +
                    '<div class="col-md-8 mi_location_new">'+
                        '<select type="search" class="other_address_status form-control select2 select2-hidden-accessibl country" name="OrganizationExtension[other_address][country][]"  style="width:100px;" tabindex="-1" aria-hidden="true">' +
                            '<option value="">请选择国家</option>' +
                            '<option value="1" selected>中国</option>' +
                        '</select>' + 
                        '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible province" name="OrganizationExtension[other_address][province][]"  style="width:110px" tabindex="-1" aria-hidden="true">' +
                            '<option value="">请选择省份</option>' +
                        '</select>' + 
                        '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible city" name="OrganizationExtension[other_address][city][]"  style="width:110px" tabindex="-1" aria-hidden="true">' + 
                            '<option value="">请选择城市</option>' +
                        '</select>' +
                        '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible district" name="OrganizationExtension[other_address][district][]"  style="width:140px" tabindex="-1" aria-hidden="true">' +
                            '<option value="">请选择地区</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' + 
                    '<label class="col-md-2 form-control-label text-right name-11">' +
                        '地址' +
                    '</label>' +
                    '<div class="col-md-3">' +
                        '<div class="form-group">' +
                        '<input type="hidden" class="form-control other_address_id" name="OrganizationExtension[other_address][id][]" value="-1">' + 
                        '<input type="text" class="form-control" name="OrganizationExtension[other_address][address][]" value="">' + 
                        '</div>' +
                    '</div>' +
                '</div>' +
               '<div class="row">' +
                    '<label class="col-md-2 form-control-label text-right name-11">' +
                    '联系人' +
                    '</label>' +
                    '<div class="col-md-3">' +
                        '<div class="form-group field-organizationextension-companymoneyaccount">' +
                            '<input type="text" class="form-control" name="OrganizationExtension[other_address][contact][]" value="">' +
                        '</div>' +
                    '</div>' +
               '</div>' +
                '<div class="row">' +
                    '<label class="col-md-2 form-control-label text-right name-11">' +
                    '联系电话' +
                    '</label>' +
                    '<div class="col-md-3">' +
                        '<div class="form-group field-organizationextension-companymoneyaccount">' +
                            '<input type="text" class="form-control" name="OrganizationExtension[other_address][contact_mobile][]" value="">' +
                        '</div>' +
                    '</div>' +
                '</div>' +

            '</div>';


        $row.after($insertRow);
        freshSelect2();
        $(".select2").css("margin-right", "5px");
        initProvince();
    });

    $('.section-content').on("click", ".delete-address-row", function(){
         if ($(".other-address-group").length <= 1) {
              Utils.Toastr.Info('错误', '最少保留1条');
              return;
          }
	      var isDelete=confirm("真的要删除吗？"); 
          if (isDelete === true && $(".other-address-group").length > 1) {
              $id = $(this).parents('.other-address-group').find(".other_address_id").val();
              if ($id !== -1) {
                $.post('/organization-address/delete?id='+$id);
              }
              $(this).parents('.other-address-group').remove();
          }
    });

    $('.section-content').on("click", ".add-row", function() {
        $insertRow = '<div class="row account"><label class="col-md-2 form-control-label text-right name-11"></label>'+
            '<div class="col-md-2">'+
                '<div class="form-group field-organizationextension-companymoneyaccount">' +
                '<input type="hidden" class="form-control company_money_account_id" name="OrganizationExtension[company_money_account][id][]" value="-1">' +
                '<input type="text" class="form-control" name="OrganizationExtension[company_money_account][account][]">' + 
                '</div>' + 
            '</div>'+
            '<div class="col-md-1">'+
                '<select type="search" id="organizationextension-company_money_account_status" class="company_money_account_status form-control select2 select2-hidden-accessible" name="OrganizationExtension[company_money_account][status][]"  style="width:100%" tabindex="-1" aria-hidden="true">' +
                '<option value="1">有效</option>' +
                '<option value="0">无效</option>' +
                '</select>' +
            '</div>' + 
            '<div class="col-md-2 form-control-label company_money_account">' +
                '<a class="add-row" href="javascript:void(0);" style="margin-right:4px;" ><span class="glyphicon glyphicon-plus"></span></a>'+
				'<a class="delete-row" href="javascript:void(0);" ><span class="glyphicon glyphicon-minus"></span></a>'+
            '</div>'+
        '</div>';
        $row = $(this).parents(".account");
        $row.after($insertRow);
        freshSelect2();
    });

    $('.section-content').on("click", ".delete-row", function() {
          if ($(".account").length <= 1) {
              Utils.Toastr.Info('错误', '最少保留1条');
              return;
          }
	      var isDelete=confirm("真的要删除吗？"); 
          if (isDelete === true && $(".account").length >1) {
              $id = $(this).parents('.account').find(".company_money_account_id").val();
              if ($id !== -1) {
                $.post('/organization-bank-account/delete?id='+$id);
              }
              $(this).parents('.account').remove();
          }
    })

    //起止时期选择框校验,相关的字段结束时间需要大于开始时间
    var startDate = $("#start_date");
    var preOfficeTime = $("#pre_office_time");
    var agreementStartDate = $("#agreement_start_time");
    var agreementEndDate = $("#agreement_end_time");
    var reconstructStartTime = $("#reconstruct_start_time");
    var reconstructEndTime = $("#reconstruct_end_time");

    //试营业与正式营业日期限制
    startDate.blur(function(){
        var beginDate=preOfficeTime.val();
        var endDate=$(this).val();

        var dateCheck = diffDate(beginDate,endDate);
        if(!dateCheck){
            Utils.Toastr.Info('正式营业日期应大于试营业日期');
            $(this).val('');
        }
    });

    preOfficeTime.blur(function(){
        var beginDate=$(this).val();
        var endDate=startDate.val();

        var dateCheck = diffDate(beginDate,endDate);
        if(!dateCheck){
            Utils.Toastr.Info('试营业日期应小于正式营业日期');
            $(this).val('');
        }
    });

    //合同起止日期限制
    agreementStartDate.blur(function(){
        var beginDate=$(this).val();
        var endDate=agreementEndDate.val();

        var dateCheck = diffDate(beginDate,endDate);
        if(!dateCheck){
            Utils.Toastr.Info('合同开始日期应小于结束日期');
            $(this).val('');
        }
    });

    agreementEndDate.blur(function(){
        var beginDate=agreementStartDate.val();
        var endDate=$(this).val();

        var dateCheck = diffDate(beginDate,endDate);

        if(!dateCheck){
            Utils.Toastr.Info('合同结束日期应大于开始日期');
            $(this).val('');
        }
    });

    //改造日期起止限制
    reconstructStartTime.blur(function(){
        var beginDate=$(this).val();
        var endDate=reconstructEndTime.val();

        var dateCheck = diffDate(beginDate,endDate);

        if(!dateCheck){
            Utils.Toastr.Info('改造开始日期应小于结束日期');
            $(this).val('');
        }
    });
    reconstructEndTime.blur(function(){
        var beginDate=reconstructStartTime.val();
        var endDate=$(this).val();

        var dateCheck = diffDate(beginDate,endDate);

        if(!dateCheck){
            Utils.Toastr.Info('改造结束日期应大于开始日期');
            $(this).val('');
        }
    });

    //比较两个日期大小
    function diffDate(beginDate,endDate){

        if(!beginDate || !endDate){
            return true;
        }

        arr1 = beginDate.split("-");
        arr2 = endDate.split("-");
        var dateToStr1 = arr1.join("");
        var dateToStr2 = arr2.join("");

        if(parseInt(dateToStr1) > parseInt(dateToStr2)){
            return false;
        }else{
            return true;
        }
    }


    //检测表单空值
    function checkisNull(val){
        if(val == '' || val == '-1' || val == 0){
            return false;
        }
        return true;
    }

   $("#country").change(function(){
        setCurrency();
    });

   setCurrency();

   //根据国家字段设置货币信息
   function setCurrency(country){
    var country = $("#country").val();

    $map = new Array();
    $map['1']       = 'CNY';
    $map['3385']    = 'HKD';
    $map['3386']    = 'TWD';

    $symbolMap = new Array();
    $symbolMap['CNY'] = '¥';
    $symbolMap['HKD'] = 'HK$';
    $symbolMap['TWD'] = 'NT$';

    $currency        = $map[country];
    $currency_symbol = $symbolMap[$currency];

    $('#currency').val($currency);
    $('#currency_symbol').val($currency_symbol);

    $.post({
        url: '/organization/get-exchange-rate?currency=' + $currency,
        data: '',
        dataType: 'json',
        success: function (ret) {
            if (ret.code === 200) {
                $("#exchange_rate").val(ret.rate);
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


