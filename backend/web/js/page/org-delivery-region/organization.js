$(function(){
    var city = [$("#organization-city"), $("#organizationextension-city")];
    var district = [$('#organization-district'), $("#organizationextension-district")];
    var $orgCreateSumbit = $('#submit-createOrgDelivery');
    var $orgUpdateSumbit = $('#submit-updateOrgDelivery');
    var $orgForm = $('#org-form');
    var $orgId = $('#organization-id');
    var $infoToggle = $('.info-toggle');
    var $saveButton = $('.section-save a');
    var orgArr = $('.update_mi_location').attr('id');
    var firstOrgArr = $('.create_mi_location').attr('id');
    var csrf = $('.hidden_csrf').attr('id');
    $.ajaxSetup( {
        url: "" , // 默认URL
        aysnc: false , // 默认同步加载
        type: "POST" , // 默认使用POST方式
        headers: { // 默认添加请求头
            'X-CSRF-Token': csrf
        } ,
        error: function(jqXHR, textStatus, errorMsg){ // 出错时默认的处理函数
        }
    } );    

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
        $('input, select').attr('disabled', true);
        $('select').attr('disabled', true);
        $('.add-row, .delete-row, .add-address, .delete-address-row, #submit-updateOrg, .btn-default').remove();
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
        $province = $('.mi_location_new').find('.province');
        $.post("/address/get-child-region?id=1", function(data) {
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

    function initProvinceForUpdate() {
        $province = $('.mi_location_new').find('.province');
        $.post("/address/get-child-region?id=1", function(data) {
            var optHtml = "";
            for (var i = 0; i < $province.length; i++) {
                for(var key in data.data){
                    $province[i].options.add(new Option(data.data[key],key));
                }
            }
            $province.addClass("option:first").prop("selected", 'selected');
            $province.trigger('change.select2');
        });
        $('.mi_location_new').addClass('mi_location');
        $('.mi_location_new').removeClass('mi_location_new');
    }

    function updateAdd(org){
        var orgArr = org.split('|');
        $insertRow = '';
        for(var i =0; i< orgArr.length; i++){
            var orgInfo = orgArr[i].split('-');
                $row = $('.section-add').prev().find('.other-address-group-first').end();
                $insertRow = $insertRow + '<div class="other-address-group">' + 
                    '<div class="row form-group form-inline">'+
                        '<div class="col-md-8 mi_location_new" style="width:400px">'+
                            '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible province" name="OrganizationExtension[other_address][province][]"  style="width:138px;" tabindex="-1" aria-hidden="true">' +
                                '<option value="'+ orgInfo[1]+'">'+ orgInfo[0] +'</option>' +
                            '</select>' + 
                            '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible city" name="OrganizationExtension[other_address][city][]"  style="width:138px" tabindex="-1" aria-hidden="true">' + 
                                '<option value="'+ orgInfo[3] +'">'+ orgInfo[2]+'</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row form-group">' + 
                    '<div class="text-right" style="margin-right:15px">' +
                        '<a class="update-delete-address-row" href="javascript:void(0);" ><span class="glyphicon glyphicon-minus">删除</span></a>' + 
                    '</div>' +
                '</div>'+
                '</div>';
        }
        $row.after($insertRow);
        freshSelect2();
        $(".select2").css("margin-top", "5px");
        $(".select2").css("margin-right", "5px");
        initProvinceForUpdate();
    }

    function firstAdd(){
        $row = $('.section-add').prev().find('.other-address-group-first').end();
            $insertRow = '<div class="other-address-group">' + 
                '<div class="row form-group form-inline">'+
                    '<div class="col-md-8 mi_location_new" style="width:400px">'+
                        '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible province" name="OrganizationExtension[other_address][province][]"  style="width:138px;" tabindex="-1" aria-hidden="true">' +
                            '<option value="">请选择省份</option>' +
                        '</select>' + 
                        '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible city" name="OrganizationExtension[other_address][city][]"  style="width:138px" tabindex="-1" aria-hidden="true">' + 
                            '<option value="">请选择城市</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="row form-group">' + 
                '<div class="text-right" style="margin-right:15px">' +
                    '<a class="update-delete-address-row" href="javascript:void(0);" ><span class="glyphicon glyphicon-minus">删除</span></a>' + 
                '</div>' +
            '</div>'+
            '</div>';
        $row.after($insertRow);
        freshSelect2();
        $(".select2").css("margin-top", "5px");
        $(".select2").css("margin-right", "5px");
        initProvince();
    }

    $(".section-content").on('select2:select', '.province', function() {
        $city = $(this).parents('.mi_location').find('.city');
        $street = $(this).parents('.mi_location').find('.street');
        $district = $(this).parents('.mi_location').find('.district');
        $.post("/address/get-child-region?id=" + $(this).val() , function(data){
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
            $street.html("<option value='-1'>请选择地区</option>");
            $street.addClass("option:first").prop("selected", 'selected');
            $street.trigger('change.select2');
        });
    });

    $(".section-content").on('select2:select', '.city', function() {
        $district = $(this).parents('.mi_location').find('.district');
        $street = $(this).parents('.mi_location').find('.street');
        $.post("/address/get-child-region?id=" + $(this).val() , function(data){
            var optHtml = "<option vaule='-1'>请选择地区</option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $district.html(optHtml);
            $district.addClass("option:first").prop("selected", 'selected');
            $district.trigger('change.select2');
            $street.html("<option value='-1'>请选择地区</option>");
            $street.addClass("option:first").prop("selected", 'selected');
            $street.trigger('change.select2');
        });
    });
    
    $orgCreateSumbit.click(function() {
        //$orgCreateForm.data('yiiActiveForm').submitting = true;
        $.post({
                url: 'create',
                data: $orgForm.serialize() ,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "index";
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
        //$orgCreateForm.data('yiiActiveForm').submitting = true;
        $.post({
                url: 'update?id='+$orgId.text(),
                data: $orgForm.serialize() ,
                dataType: 'json',
                success: function (ret) {
                    console.log(ret);
                    if (ret.code === 200) {
                        window.location.href = "index";
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


    $(".section-content").on('click', ".add-address-delivery", function(){
        $row = $(this).parents('.section-add').prev().find('.other-address-group-first').end();
            $insertRow = '<div class="other-address-group">' + 
                '<div class="row form-group form-inline">'+
                    '<div class="col-md-8 mi_location_new" style="width:400px">'+
                        '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible province" name="OrganizationExtension[other_address][province][]"  style="width:138px;" tabindex="-1" aria-hidden="true">' +
                            '<option value="">请选择省份</option>' +
                        '</select>' + 
                        '<select type="search" class="other_address_status form-control select2 select2-hidden-accessible city" name="OrganizationExtension[other_address][city][]"  style="width:138px" tabindex="-1" aria-hidden="true">' + 
                            '<option value="">请选择城市</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="row form-group">' + 
                '<div class="text-right" style="margin-right:15px">' +
                    '<a class="update-delete-address-row" href="javascript:void(0);" ><span class="glyphicon glyphicon-minus">删除</span></a>' + 
                '</div>' +
            '</div>'+
            '</div>';
        $row.after($insertRow);
        freshSelect2();
        $(".select2").css("margin-top", "5px");
        $(".select2").css("margin-right", "5px");
        initProvince();
    });

    $('.section-content').on("click", ".delete-address-row", function(){
         if ($(".other-address-group").length <= 1) {
              Utils.Toastr.Info('错误', '最少保留1条');
              return;
          }
          var isDelete=confirm("真的要删除吗？"); 
          if (isDelete === true /*&& $(".other-address-group").length > 1*/) {
              $id = $(this).parents('.other-address-group').find(".other_address_id").val();
              if ($id !== -1) {
 //               $.post('/organization-address/delete?id='+$id);
              }
              $(this).parents('.mi_location').remove();
          }
    });

    $('.section-content').on("click", ".update-delete-address-row", function(){
         if ($(".other-address-group").length <= 1) {
              Utils.Toastr.Info('错误', '最少保留1条');
              return;
          }
          var isDelete=confirm("真的要删除吗？"); 
          if (isDelete === true /*&& $(".other-address-group").length > 1*/) {
              $id = $(this).parents('.other-address-group').find(".other_address_id").val();
              if ($id !== -1) {
 //               $.post('/organization-address/delete?id='+$id);
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
                '<option value="">是否有效</option>' + 
                '<option value="1" selected>有效</option>' + 
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
               // $.post('/organization-bank-account/delete?id='+$id);
              }
              $(this).parents('.account').remove();
          }
    })

    if(firstOrgArr){
        firstAdd();
        // $('.delete-address-row').trigger("click");
    }

    if(orgArr){
        updateAdd(orgArr);
    }
});


