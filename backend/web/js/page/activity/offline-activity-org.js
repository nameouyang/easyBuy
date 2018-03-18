$(function(){
    var area = areaName;
    var areaArr = new Array();
    for(var id in area)
    {
        areaArr[id] = area[id];
    }
    var allOrgName = new Array();
    allOrgName[1] = "全部门店";
    allOrgName[2] = "小米之家";
    allOrgName[3] = "专卖店";
    var selectNationwide = false;
    var selectSpecialType = false;
    init();

    //活动类型控制活动范围
    $(document).on("click", "#activity-type", function(){
        var type = $("input[name='OfflineActivity[type]']:checked").val();
        var orgType = $("input[name='ActivityOrgType']:checked").val();
        $("input[name='ActivityOrgType']:checked").attr("checked", false);
        $("#area-select").css("display", "none");
        //1.遍历已选门店列表中门店地址可以修改
        if (['0', '2'].indexOf(type) >= 0) {
            $("input[name='orgAddress[]']").each(function(){
                $(this).val() != '--' && $(this).removeAttr("readonly");
            })
        } else {
            $("input[name='orgAddress[]']").attr("readonly", "readonly");
        }
        if(type == 1)
        {
            //1.限制门店范围radio选择
            $("input[name=ActivityOrgType]").eq(3).prop("checked", true);
            $("input[name=ActivityOrgType]").eq(0).attr("disabled", "disabled");
            $("input[name=ActivityOrgType]").eq(1).attr("disabled", "disabled");
            $("input[name=ActivityOrgType]").eq(2).attr("disabled", "disabled");
            //2.重置下拉框的展示
            $("#area-org-select").css("display", "block");
            $("#at-id-ot").attr("readonly", "readonly");
            //3.判断门店列表中是否由大范围的门店,如果有的话，就会删除。
            $("input[name='orgId[]']").each(function(){
                if(['1', '2', '3'].indexOf($(this).val()) >= 0)
                {
                    $(this).parent().parent().remove();
                }
            });
        }
        else {
            //2.活动类型为其他的情况下可以修改
            if(type == 0)
            {
                $("#at-id-ot").attr("readonly", false);
            }
            else {
                $("#at-id-ot").remove("readonly", "readonly");
            }
            //3.重置门店范围
            $("input[name=ActivityOrgType]").eq(0).attr("disabled", false);
            $("input[name=ActivityOrgType]").eq(1).attr("disabled", false);
            $("input[name=ActivityOrgType]").eq(2).attr("disabled", false);
            $("input[name=ActivityOrgType]").eq(3).attr("checked", false);
            $("#area-org-select").css("display", "none");
        }
        init();
    });

    $(document).on("click", ".org-scope-type", function(){
        var type = $("input[name='OfflineActivity[type]']:checked").val();
        if(type == undefined)
        {
            Utils.Toastr.Warning("Warning", "请先选择活动类型,在选择门店范围");
            return;
        }
        var orgType = $("input[name='ActivityOrgType']:checked").val();

        if(orgType == 1 || orgType == 2 || orgType == 3)
        {
            $("#area-select").css("display", "block");
            $("#area-org-select").css("display", "none");
            $("#select-area").select2("val", "");
        }
        else
        {
            /*$("#org_node").select2("val", "");*/
            $("#del-all-org").select2("val", "");
            $("#area-select").css("display", "none");
            $("#area-org-select").css("display", "block");
            $("#article-group").css("float", 'right');
        }
    });

    $(document).on("click", "#btn-add", function(){
        var type = $("input[name='OfflineActivity[type]']:checked").val();
        var orgType = $("input[name='ActivityOrgType']:checked").val();
        if(orgType == undefined)
        {
            Utils.Toastr.Warning("Warning", "没有选择门店范围");
            return;
        }
        if(orgType == 1 || orgType == 2 || orgType == 3){
            var areaId = $("#select-area").val();
            if(areaId == '')
            {
                Utils.Toastr.Warning("Warning", "没有选择区域");
                return;
            }
            var orgId = orgType;
            if(areaId == -1)
            {
                selectNationwide = true;
                $("#selected-org-list").nextAll().empty();
            }
            else {
                if(selectNationwide == true)
                {
                    $("#selected-org-list").nextAll().empty();
                    selectNationwide = false;
                }
            }
            var res = checkActivityOrg(areaId, orgId);
            if(res == true)
            {
                Utils.Toastr.Info("提示", "区域为"+areaArr[areaId]+"，门店为"+allOrgName[orgId]+"已经添加过，不可以重复添加");
                return;
            }
            insertTable(areaId, orgId, allOrgName[orgId], "--", true);
            $("#btn-add").attr("disabled", false);
        }
        else {

            if(selectNationwide == true)
            {
                $("#selected-org-list").nextAll().empty();
                selectSpecialType = false;
            }
            var areaId = $("#org_node").val();
            var orgId = new Object();
            var orgName = "";
            var orgAddress = "";
            orgId.orgId = $("#del-all-org").val();
            if(areaId == '')
            {
                Utils.Toastr.Warning("Warning", "没有选择区域范围");
                return;
            }
            if($("#del-all-org").val() == '')
            {
                Utils.Toastr.Warning("Warning", "没有选择门店");
                return;
            }
            $.ajax({
                type : "POST",
                data : orgId,
                url  : "get-org-info",
                cache : false,
                success : function(data){
                    if(data.code == 0)
                    {
                        orgName = data.data.name;
                        orgAddress = data.data.address;
                        var disable = true;
                        if(type == 2 || type == 0)
                        {
                            disable =  false;
                        }
                        var res = checkActivityOrg(areaId, orgId.orgId);
                        if(res == true)
                        {
                            Utils.Toastr.Info("提示", "区域为"+areaArr[areaId]+"，门店为"+orgName+"已经添加过，不可以重复添加");
                            return;
                        }
                        insertTable(areaId, orgId.orgId, orgName, orgAddress, disable);
                        $("#btn-add").attr("disabled", false);
                    }
                    else {
                        $("#btn-add").attr("disabled", false);
                    }
                }
            });
        }

    });

    $(document).on("change", "#del-all-org, #select-area, #org_node", function(){
        $("#btn-add").attr("disabled", false);
    });

    $(document).on("click", ".scaned-li", function(){
        $(this).parent().parent().remove();
    });

    function insertTable(areaId, orgId, orgName, address, disabled)
    {
        var html = "<tr><td width='50'><input type='hidden' name='areaId[]' value='"+areaId+"'>"+areaArr[areaId]+"</td><td width='100'><input type='hidden' name='orgId[]' value='"+orgId+"'>"+orgName+"</td><td width='150'>" +
            "<input type='text' name='orgAddress[]' style='width:100%' readonly='readonly' value='"+address+"' id='"+areaId+orgId+"'></td><td width='30'><i class='material-icons md-12 scaned-li' style='cursor: pointer'>remove_circle_outline </i></td></tr>";
        $("#selected-org-list").after(html);

        if(disabled == false)
        {
            var id = areaId + orgId;
            $("#"+id).removeAttr("readonly");
        }
        $("#btn-add").attr("disabled","disabled");
    }

    function checkActivityOrg(areaId, orgId)
    {
        var orgIdArr = new Array();
        var areaIdArr = new Array();
        $("input[name='orgId[]']").each(function(i){
            orgIdArr[i] = $(this).val();
        });
        $("input[name='areaId[]']").each(function(i){
            areaIdArr[i] = $(this).val();
        });
        for(var i in areaIdArr)
        {
            if(areaIdArr[i] == areaId && orgIdArr[i] == orgId)
            {
                return true;
            }
        }
        return false;
    }

    function init()
    {
        var type = $(".org-scope-type").data('type');
        if(type == 2)
        {
            $("input[name=ActivityOrgType]").eq(0).attr("disabled", "disabled");
            $("input[name=ActivityOrgType]").eq(2).attr("disabled", "disabled");
        }
        else if(type == 3)
        {
            $("input[name=ActivityOrgType]").eq(0).attr("disabled", "disabled");
            $("input[name=ActivityOrgType]").eq(1).attr("disabled", "disabled");
        }
        else if(type == 5)
        {
            $("input[name=ActivityOrgType]").eq(0).attr("disabled", "disabled");
        }
        else if(type == 4 || type > 5)
        {
            $("input[name=ActivityOrgType]").eq(0).attr("disabled", "disabled");
            $("input[name=ActivityOrgType]").eq(1).attr("disabled", "disabled");
            $("input[name=ActivityOrgType]").eq(2).attr("disabled", "disabled");
        }
    }
});
