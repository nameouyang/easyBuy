$(function(){
    $.extend($.fn, {
        treeView: function () {
            // checked = arguments[0] ? arguments[0] : [];

            var plusClass = 'fa-plus-square';
            var minuClass = 'fa-minus-square';
            $(this).children('ul').children('li').each(function () {
                var ul = $(this).children('ul');
                if (ul.length > 0) {
                    ul.hide();
                    $(this).children('i').addClass(plusClass);
                    $(this).treeView();
                }

                // 初始化选中状态
                var checkbox = $(this).children('input[type=checkbox]');
                if (checkbox.prop('checked')) {
                    // 判断上级是否选中
                    if (!$(this).parent().parent().children('input[type=checkbox]').prop('checked')) {
                        // $(this).parents('ul').show();
                        $(this).parents('li').children('label').append('<i class="dot" title="有包含的选中内容"></i>');
                    }
                }
            });

            // 收缩展开
            $(this).children('i').on('click', function () {
                if ($(this).hasClass(plusClass)) {
                    $(this).removeClass(plusClass).addClass(minuClass);
                } else {
                    $(this).removeClass(minuClass).addClass(plusClass);
                }
                $(this).siblings('ul').toggle();
            });

            // 状态选中
            $(this).find('input[type=checkbox]').on('click', function () {
                var checkbox = $(this).siblings('ul').find('input[type=checkbox]');
                if ($(this).prop('checked')) {
                    checkbox.prop('checked', true);
                    // 验证上级是否需要选中
                    $(this).parentChecked();
                } else {
                    $(this).parents('li').children('input[type=checkbox]').prop('checked', false);
                    checkbox.prop('checked', false);
                }
            });
        },

        // 上级选中
        parentChecked: function () {
            var li = $(this).parent();
            if (li.parent().find('input[type=checkbox]:not(:checked)').length === 0 &&
                li.parent().find('input[type=checkbox]').length > 1) {
                li.parent().siblings('input[type=checkbox]').prop('checked', true);
                li.parentChecked();
            }
        }
    });

    $('.specific').treeView();
    /**
     * 后退
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#go-back",function(){
        history.go(-1)
    })

    $(document).on("click","#submit-survey",function(){
        $('#on-submit').css('display',"block");
        var scope = $('.scope').attr('data-scope');
        var id = $('#survey_id').attr('data-id');
        $('#submit-survey').css('display',"none")
        $.post({
                url: 'create?id=' + id,
                data: {type:'create', scope: scope},
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "index";
                    } else {
                        $('#submit-survey').css('display',"block");
                        $('#on-submit').css('display',"none");
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#submit-survey').css('display',"block");
                    $('#on-submit').css('display',"none");
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );
    })
});