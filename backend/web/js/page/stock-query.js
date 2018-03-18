
function changeProvince(provinceId, cb) {
    $.post("/stock/address?regionId=" + provinceId , function(data){
        var optHtml = "<option></option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        $(".district-select").val("").trigger("change");
        //$(".street-select").val("").trigger("change");
        $(".city-select").html(optHtml).val("").trigger("change");

        if (typeof cb === "function") cb();
    });
}

function changeCity(cityId, cb) {
    $.post("/stock/address?regionId=" + cityId , function(data){
        var optHtml = "<option></option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
       // $(".street-select").val("").trigger("change");
        $(".district-select").html(optHtml).val("").trigger("change");

        if (typeof cb === "function") cb();
    });
}

function changeDistrict(districtId, cb) {
    $.post("/stock/street-address?regionId=" + districtId , function(data){
        var optHtml = "<option></option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        $(".street-select").html(optHtml);

        if (typeof cb === "function") cb();
    });
}

function changeProvinceDelivery(provinceId, cb) {
    $.post("/stock/address?regionId=" + provinceId , function(data){
        var optHtml = "<option></option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        $(".district-select-delivery").val("").trigger("change");
        $(".street-select-delivery").val("").trigger("change");
        $(".city-select-delivery").html(optHtml).val("").trigger("change");

        if (typeof cb === "function") cb();
    });
}

function changeCityDelivery(cityId, cb) {
    $.post("/stock/address?regionId=" + cityId , function(data){
        var optHtml = "<option></option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        $(".street-select-delivery").val("").trigger("change");
        $(".district-select-delivery").html(optHtml).val("").trigger("change");

        if (typeof cb === "function") cb();
    });
}

function changeDistrictDelivery(districtId, cb) {
    $.post("/stock/street-address?regionId=" + districtId , function(data){
        var optHtml = "<option></option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        $(".street-select-delivery").html(optHtml).val("").trigger("change");

        if (typeof cb === "function") cb();
    });
}


function changeTopCategory(topCategoryId, cb) {
    $.post("/stock/category?categoryId=" + topCategoryId , function(data){
        var optHtml = "<option></option>";
        for(var key in data.data){
            optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
        }
        $(".secondCategory-stock-select").html(optHtml).val("").trigger("change");

        if (typeof cb === 'function') cb();
    });
}

$(function () {
    $("#mihomeTab").click(function () {
        $("#mihomeSelectArea").css({"display":"block"});
        $("#storageSelectArea").css({"display":"none"});
        $("#deliverySelectArea").css({"display":"none"});

        $("#mihomeResultArea").css({"display":"block"});
        $("#storageResultArea").css({"display":"none"});
        $("#deliveryResultArea").css({"display":"none"});
    });

    $("#storageTab").click(function () {
        $("#mihomeSelectArea").css({"display":"none"});
        $("#storageSelectArea").css({"display":"block"});
        $("#deliverySelectArea").css({"display":"none"});

        $("#mihomeResultArea").css({"display":"none"});
        $("#storageResultArea").css({"display":"block"});
        $("#deliveryResultArea").css({"display":"none"});
    });

    $("#deliveryTab").click(function () {
        $("#mihomeSelectArea").css({"display":"none"});
        $("#storageSelectArea").css({"display":"none"});
        $("#deliverySelectArea").css({"display":"block"});

        $("#mihomeResultArea").css({"display":"none"});
        $("#storageResultArea").css({"display":"none"});
        $("#deliveryResultArea").css({"display":"block"});
    });

    //监听米家库存查询提交表单
    $("#mihome-stock-query").submit(function () {
        var mihomeOrgIdField = $("#mihome-orgId-field").val();
        var mihomeSkuField = $("#mihome-sku-field").val();
        var mihomeTopCategoryField = $("#mihome-topCategory-field").val();
        var mihomeSecondCategoryField = $("#mihome-secondCategory-field").val();

        if( mihomeOrgIdField == '' ){
            Utils.Toastr.Info('提示','请选择米家机构');
            return false;
        }

        if ( mihomeSkuField == '' && (mihomeTopCategoryField == '' || mihomeSecondCategoryField == '' ) ){
            Utils.Toastr.Info('提示','SKU和两级分类不能同时为空');
            return false;
        }

        //验证通过，将条件写入cookie
        setCookie('mihomeOrgIdField', mihomeOrgIdField);
        setCookie('mihomeSkuField', mihomeSkuField);
        setCookie('mihomeTopCategoryField', mihomeTopCategoryField);
        setCookie('mihomeSecondCategoryField', mihomeSecondCategoryField);
    });

    //监听分仓库存查询提交表单
    $("#storage-stock-query").submit(function () {
        var storageProvinceIdField = $("#storageProvinceIdField").val();
        var storageCityIdField = $("#storageCityIdField").val();
        var storageDistrictIdField = $("#storageDistrictIdField").val();
        var storageSkuField = $("#storageSkuField").val();

        if ( storageProvinceIdField == '' ){
            Utils.Toastr.Info('提示', '请选择省份');
            return false;
        }else if ( storageCityIdField == '' ){
            Utils.Toastr.Info('提示', '请选择城市');
            return false;
        }else if ( storageDistrictIdField == '' ){
            Utils.Toastr.Info('提示', '请选择区域');
            return false;
        }/*else if ( storageSkuField == '' ){
            Utils.Toastr.Info('提示', '请输入SKU');
            return false;
        }*/

        //验证通过，将条件写入cookie
        setCookie('storageProvinceIdField', storageProvinceIdField);
        setCookie('storageCityIdField', storageCityIdField);
        setCookie('storageDistrictIdField', storageDistrictIdField);
        setCookie('storageSkuField', storageSkuField);
    });

//监听送装一体库存查询提交表单
    $("#delivery-stock-query").submit(function () {
        var deliveryProvinceIdField = $("#deliveryProvinceIdField").val();
        var deliveryCityIdField = $("#deliveryCityIdField").val();
        var deliveryDistrictIdField = $("#deliveryDistrictIdField").val();
        var deliveryStreetIdField = $("#deliveryStreetIdField").val();
        var deliverySkuField = $("#deliverySkuField").val();

        if ( deliveryProvinceIdField == '' ){
            Utils.Toastr.Info('提示', '请选择省份');
            return false;
        }else if ( deliveryCityIdField == '' ){
            Utils.Toastr.Info('提示', '请选择城市');
            return false;
        }else if ( deliveryDistrictIdField == '' ){
            Utils.Toastr.Info('提示', '请选择区域');
            return false;
        }else if ( deliveryStreetIdField == '' ){
            Utils.Toastr.Info('提示', '请选择街道');
            return false;
        }/*else if ( deliverySkuField == '' ){
            Utils.Toastr.Info('提示', '请输入Goods Id');
            return false;
        }*/

        setCookie('deliveryProvinceIdField', deliveryProvinceIdField);
        setCookie('deliveryCityIdField', deliveryCityIdField);
        setCookie('deliveryDistrictIdField', deliveryDistrictIdField);
        setCookie('deliveryStreetIdField', deliveryStreetIdField);
        setCookie('deliverySkuField', deliverySkuField);

    });

    /**
     * 保持米家库存查询搜索条件
     */

    var mihomeOrgIdField = getCookie('mihomeOrgIdField');
    var mihomeSkuField = getCookie('mihomeSkuField');
    var mihomeTopCategoryField = getCookie('mihomeTopCategoryField');
    var mihomeSecondCategoryField = getCookie('mihomeSecondCategoryField');

    //选中米家
    if ( mihomeOrgIdField == null ){
        //选中当前用户所处米家
        var currentOrgId = $("#currentOrgId").text();
        $("#mihome-orgId-field").val(currentOrgId).trigger("change");
    }else {
        $("#mihome-orgId-field").val( mihomeOrgIdField ).trigger("change");
    }

    //选中sku
    if ( mihomeSkuField != null ){
        $("#mihome-sku-field").val( mihomeSkuField ).trigger("change");
    }

    //选中一级分类
    if ( mihomeTopCategoryField != null ){
        //$("#mihome-topCategory-field").off('change');
        $("#mihome-topCategory-field").val( mihomeTopCategoryField ).trigger("change");
    }

    $(".topCategory-stock-select").on("change", function (e, mihomeSecondCategoryField) {
        if (mihomeSecondCategoryField) {
            changeTopCategory($(this).val(), function () {
                $(".secondCategory-stock-select").val(mihomeSecondCategoryField).trigger('change');
            });
        } else {
            changeTopCategory($(this).val());
        }
    });

    //选中二级分类
    if ( mihomeTopCategoryField != null && mihomeSecondCategoryField != null ){
        $.post("/stock/category?categoryId=" + mihomeTopCategoryField , function(data){
            var optHtml = "<option></option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $(".secondCategory-stock-select").html(optHtml);
            window.setTimeout(oldSecondCategory, 1000);
        });
    }

    /**
     * 保持分仓库存查询搜索条件
     */
    var storageProvinceIdField = getCookie('storageProvinceIdField');
    var storageCityIdField = getCookie('storageCityIdField');
    var storageDistrictIdField = getCookie('storageDistrictIdField');
    var storageSkuField = getCookie('storageSkuField');
    if ( storageSkuField != null ){
        $("#storageSkuField").val( storageSkuField ).trigger('change');
    }

    $(".province-select").on("change", function (e, cityId) {
        if (cityId) {
            changeProvince($(this).val(), function () {
                $(".city-select").val(cityId).trigger('change', [storageDistrictIdField]);
            });
        } else {
            changeProvince($(this).val());
        }
    });


    $(".city-select").on("change" , function (e, districtId) {

        if ( districtId ){
            changeCity($(this).val(), function () {
                $(".district_select").val(districtId).trigger('change');
            });
        } else {
            changeCity($(this).val());
        }
    });


    if ( storageProvinceIdField != null ){
        $(".province-select").val( storageProvinceIdField );//.trigger('change');
        $(".province-select").addClass("option:first").prop("selected", 'selected');
        $(".province-select").trigger('change.select2');
        //$(".district-select").val( storageDistrictIdField ).trigger('change', [storageDistrictIdField]);
    }
    /*if ( storageDistrictIdField != null ){
        $(".district-select").val( storageDistrictIdField ).trigger('change');
    }*/

    if ( storageProvinceIdField != null ){
        $.post("/stock/address?regionId=" + storageProvinceIdField , function(data){
            var optHtml = "<option></option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $(".city-select").append(optHtml).val( storageCityIdField );//.trigger('change');
            $(".city-select").addClass("option:first").prop("selected", 'selected');
            $(".city-select").trigger('change.select2');
        });
    }

    if ( storageCityIdField != null ){
        $.post("/stock/address?regionId=" + storageCityIdField , function(data){
            var optHtml = "<option></option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $(".district-select").append(optHtml).val( storageDistrictIdField ).trigger('change');
            $(".district-select").addClass("option:first").prop("selected", 'selected');
            $(".district-select").trigger('change.select2');
        });
    }



    /**
     * 保持送装一体库存查询搜索条件
     */
    var deliveryProvinceIdField = getCookie('deliveryProvinceIdField');
    var deliveryCityIdField = getCookie('deliveryCityIdField');
    var deliveryDistrictIdField = getCookie('deliveryDistrictIdField');
    var deliveryStreetIdField = getCookie('deliveryStreetIdField');
    var deliverySkuField = getCookie('deliverySkuField');

    if ( deliverySkuField != null ){
        $("#deliverySkuField").val( deliverySkuField ).trigger('change');
    }


    //$(".province-select").on("change", function (e, cityId) {
    $(".province-select-delivery").on("change", function (e, cityId) {
        if (cityId) {
            changeProvinceDelivery($(this).val(), function () {
                $(".city-select-delivery").val(cityId).trigger('change', [deliveryDistrictIdField]);
            });
        } else {
            changeProvinceDelivery($(this).val());
        }
    });


    $(".city-select-delivery").on("change" , function (e, districtId) {

        if ( districtId ){
            changeCityDelivery($(this).val(), function () {
                $(".district_select-delivery").val(districtId).trigger('change', [deliveryStreetIdField]);
            });
        } else {
            changeCityDelivery($(this).val());
        }
    });

    $(".district-select-delivery").on("change" , function (e, streetId) {

        if ( streetId ){
            changeDistrictDelivery($(this).val(), function () {
                $(".street-select-delivery").val(streetId).trigger('change');
            });
        } else {
            changeDistrictDelivery($(this).val());
        }
    });


    if ( deliveryProvinceIdField != null ){
        $(".province-select-delivery").val( deliveryProvinceIdField );//.trigger('change', [deliveryCityIdField]);
        $(".province-select-delivery").addClass("option:first").prop("selected", 'selected');
        $(".province-select-delivery").trigger('change.select2');
    }

    if ( deliveryProvinceIdField != null ){
        $.post("/stock/address?regionId=" + deliveryProvinceIdField , function(data){
            var optHtml = "<option></option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $(".city-select-delivery").append(optHtml).val( deliveryCityIdField );//.trigger('change');
            $(".city-select-delivery").addClass("option:first").prop("selected", 'selected');
            $(".city-select-delivery").trigger('change.select2');
        });
    }

    if ( deliveryCityIdField != null ){
        $.post("/stock/address?regionId=" + deliveryCityIdField , function(data){
            var optHtml = "<option></option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $(".district-select-delivery").append(optHtml).val( deliveryDistrictIdField );//.trigger('change');
            $(".district-select-delivery").addClass("option:first").prop("selected", 'selected');
            $(".district-select-delivery").trigger('change.select2');
        });
    }
    if ( deliveryDistrictIdField != null ){
        $.post("/stock/street-address?regionId=" + deliveryDistrictIdField , function(data){
            var optHtml = "<option></option>";
            for(var key in data.data){
                optHtml += "<option value=" + key + ">" + data.data[key] + "</option>";
            }
            $(".street-select-delivery").append(optHtml).val( deliveryStreetIdField ).trigger('change');
            $(".street-select-delivery").addClass("option:first").prop("selected", 'selected');
            $(".street-select-delivery").trigger('change.select2');
        });
    }


    function setCookie(name,value)
    {
        var Days = 30; //此 cookie 将被保存 30 天
        var exp  = new Date();    //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(name)//取cookies函数
    {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); return null;

    }

    function oldSecondCategory()
    {
        $('#mihome-secondCategory-field').val( getCookie('mihomeSecondCategoryField') ).trigger('change');
    }

    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    var tabType=GetQueryString('tab-type');
    if (tabType != '' && tabType != null) {
        $('#'+tabType).css("background-color","#fff");
    } else {
        $('#test ul li:eq(0)').css('background-color', '#fff');
    }
});



