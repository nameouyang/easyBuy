$(function(){

    var form = $('#approve-edit-form');

    freshSelect2();

    form.on("click",".btn-submit",function (e) {
        e.preventDefault();
        $(".approve_level_item").removeAttr("disabled");
        $.post($(this).attr("data-tourl"),$("form").serialize(),function (result) {
            if(result.code === 200){
                Utils.Toastr.Success('Sucess', result.msg);
                window.location.href = "index";
            }else{
                Utils.Toastr.Info('Error', result.msg);
            }
        })
    })

    function freshSelect2() {
        $(".approve_level_item").select2({
            theme:'bootstrap',
            ajax: {
                delay: 50,
                url: '/bpm/approve-template/search-user',
                data: function (params) {
                    var query = {
                        search: params.term,
                    }
                    return query;
                },
                processResults: function (data) {
                    // Tranforms the top-level key of the response object from 'items' to 'results'
                    return {
                        results: data.data
                    };
                }
            }
        }); 
    }

    function freshFirstSelect2() {
        $(".approve_level_item_1").select2({
            theme:'bootstrap',
        }); 
    }
    form.on('select2:select', '#approvetemplate-approve_level', function(){

        var itemLength = $('.approve_level_location').length;
        if (itemLength == $(this).val()) {
            return;
        }

        if (itemLength > $(this).val()) {
            for (var i = 0; i < itemLength - $(this).val(); i++) {
                $('.approve_level_location').last().remove();
            }
            return;
        }
        for (var i = 0; i < $(this).val() - itemLength; i++) {
            var level = i + 1 + itemLength;
            console.log(level);
            if (level == 1) {
                $insertRow = '<div class="row approve_level_location form-group">' + 
                    '<label class="col-md-2 form-control-label text-right name-11">' +
                    '<strong class="text-danger">*</strong>' + 
                    level + '级审批人'+
                    '</label>' +
                    '<div class="col-md-3">' + 
                    '<select type="search" id="approvetemplate-approve_level_item['+ level +'][]" class="approve_level_item_1 form-control select2 select2-hidden-accessible" name="ApproveTemplate[approveLevelItem]['+level+'][]"  style="width:100%" tabindex="-1" aria-hidden="true" readOnly>' +
                    '<option value="">请选择审批人</option>' +
                    '<option value="-1" selected>申请人 - 动态获取</option>' +
                    '</select>' + 
                    '</div>' +
                    '</div>';
            } else {
                $insertRow = '<div class="row approve_level_location form-group">' + 
                    '<label class="col-md-2 form-control-label text-right name-11">' +
                    '<strong class="text-danger">*</strong>' + 
                    level + '级审批人'+
                    '</label>' +
                    '<div class="col-md-3">' + 
                    '<select type="search" id="approvetemplate-approve_level_item['+ level +'][]" class="approve_level_item form-control select2 select2-hidden-accessible" name="ApproveTemplate[approveLevelItem]['+level+'][]"  style="width:100%" tabindex="-1" aria-hidden="true" multiple="multiple">' +
                    '<option value="">请选择审批人</option>' +
                    '</select>' + 
                    '</div>' +
                    '</div>';
            }

            $('.after_approve_level').before($insertRow);
        }

        freshFirstSelect2();
        freshSelect2();
    })
});
