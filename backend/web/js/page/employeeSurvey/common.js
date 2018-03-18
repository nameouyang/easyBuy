$(function () {
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

    $(document).on("change","#survey-scope",function(){
        if($("#survey-scope input:checked").val() == 4)
        {
            $("#choose-org").show();
        }
        else
        {
            $("#choose-org").hide();
        }
    });

    showUnSaveData();
    /**
     * 添加单选题
     * @param  {[type]} ){                     var type [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#add-single",function(){
        var type    = $('#single-type').val();
        var content = $('#employeesurvey-singlecontent').code();
        content = content.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        var typeList = new Array();
        typeList[1] = '工作方面';
        typeList[2] = '发展方面';
        typeList[3] = '薪酬方面';
        typeList[4] = '环境方面';
        typeList[5] = '管理方面';
        typeList[6] = '其他方面';

        if (!type) {
            Utils.Toastr.Error('失败', '请选择单选题类型');
            return 0;
        }

        if (!content) {
            Utils.Toastr.Error('失败', '单选题-题目描述不能为空');
            return 0;
        }

        var hide_content = $('.single-contents').attr('data-single');

        hide_content = hide_content + '|||' +  content + '(' + typeList[type] + ')';
        $('.single-contents').attr('data-single',hide_content);
        all_content = hide_content.split('|||');
        var new_content = new Array();
        for (var i = 0; i <all_content.length; i++) {
            if(!all_content[i]){
                continue;
            }
            new_content.push(all_content[i]);
        }
        new_content = new_content.join('|||');
        new_content = '|||' + new_content;
        $('.single-contents').attr('data-single',new_content);
        reshowSingleContent();

    });

    /**
     * 删除单选题
     * @param  {[type]} ){                     var index [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#single_delete",function(){
        var index = $(this).attr('data-index');
        var hide_content = $('.single-contents').attr('data-single');
        all_content = hide_content.split('|||');
        all_content.splice(index, 1);
        var new_content = new Array();
        for (var i = 0; i <all_content.length; i++) {
            if(!all_content[i]){
                continue;
            }
            new_content.push(all_content[i]);
        }
        new_content = new_content.join('|||');
        new_content = '|||' + new_content;
        $('.single-contents').attr('data-single',new_content);
        reshowSingleContent();
    });

    /**
     * 添加整体满意度问题
     * @param  {[type]} ){                     var content [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#add-satis",function(){
        var content = $('#employeesurvey-satisquestion').code();
        content = content.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        if (!content) {
            Utils.Toastr.Error('失败', '整体满意度-题目描述不能为空');
            return 0;
        }

        var hide_content = $('.satis-contents').attr('data-satis');
        //判断是否已经添加过[整体满意度]的题目
        if(hide_content){
            Utils.Toastr.Error('失败', '只能有一道整体满意度题目');
            return 0;
        }
        $('.satis-contents').attr('data-satis',content);
        reShowSatisContent();
    });

    /**
     * 重新渲染整体满意度题目
     * @return {[type]} [description]
     */
    function reShowSatisContent(){
        var content = $('.satis-contents').attr('data-satis');
        if(!content){
            $('.satis-contents').html("");
        }else{
            html = '<div>';
            html += '<p>1. ' + content + '&nbsp&nbsp<a style="color:#0F6099" id="satis_delete">删除</a></p>';
            html += '<p style="margin-left:10px">A. 完全不满意  &nbsp&nbsp  B. 有些不满意  &nbsp&nbsp  C. 稍微满意  &nbsp&nbsp   D. 比较满意  &nbsp&nbsp  E. 非常不满意</p></div>';
            $('.satis-contents').append(html);
        }
    }

    /**
     * 删除整体满意度题目
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#satis_delete",function(){
        $('.satis-contents').attr('data-satis',"");
        reShowSatisContent();
    });


    /**
     * 重新渲染单选题目
     * @return {[type]} [description]
     */
    function reshowSingleContent(){
        var all_content = $('.single-contents').attr('data-single');
        all_content = all_content.split('|||');
        $('.single-contents').html('');
        html = '<div>';
        if(all_content.length < 1){
            return 0;
        }
        var count = 1;
        for (var i = 0; i < all_content.length; i++) {
            if(!all_content[i]){
                continue;
            }
            html += '<p>' + count + '. ' + all_content[i] + '&nbsp&nbsp<a style="color:#0F6099" id="single_delete" data-index=' + i +'>删除</a></p>';
            html += '<p style="margin-left:10px">A. 完全不赞同  &nbsp&nbsp  B. 有些不赞同  &nbsp&nbsp  C. 稍微赞同  &nbsp&nbsp   D. 比较赞同  &nbsp&nbsp  E. 非常不赞同</p></div>';
            count++;
        }

        $('.single-contents').append(html);

    }

    /**
     * 添加多选题选项
     * @param  {[type]} ){} [description]
     * @return {[type]}       [description]
     */
    $(document).on("click",".add-multiple-item",function(){
        html = '<tr><td><textarea class="form-control multiple_item" rows=1 placeholder="请输入选项描述"></textarea></td><td class="text-center"><a class="delete-multiple-item" style = "color:#0F6099">删除</a></td></tr>';
        $('.mutliple-tbody').append(html);
    });

    /**
     * 删除多选题选项
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $(document).on("click",".delete-multiple-item",function(){
        $(this).parent().parent().remove();
    });


    /**
     * 添加多选题
     * @param  {[type]} ){                     $(this).parent().parent().remove();    } [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#add-multiple",function(){
        var content = $('#employeesurvey-multiplechoice').code();
        content = content.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        var continueOrNot = true;

        if(!content){
            Utils.Toastr.Error('失败', '多选题-题目描述不能为空');
            return 0;
        }

        item_contents = new Array();
        $('.multiple_item').each(function(){
            item_content = $(this).code().replace(/<\/?[^>]*>/g,'');
            if(!item_content){
                Utils.Toastr.Error('失败', '多选题-选项描述不能为空');
                continueOrNot = false;
                return 0;
            }
            item_contents.push(item_content);//去除HTML tag
        })
        if(continueOrNot){
            items_contents_str = item_contents.join('|-|');
            items_str = $('.multiple-contents').attr('data-multiple-item');
            items_str += '|||' + items_contents_str;
            $('.multiple-contents').attr('data-multiple-item', items_str);

            multiple_str = $('.multiple-contents').attr('data-multiple');
            multiple_str += '|||' + content;
            $('.multiple-contents').attr('data-multiple', multiple_str);
            reshowMultipleContent();
        }

    });


    /**
     * 重新渲染多选题目
     * @return {[type]} [description]
     */
    function reshowMultipleContent()
    {
        multiple_arr = $('.multiple-contents').attr('data-multiple').split('|||');
        multiple_item_arr = $('.multiple-contents').attr('data-multiple-item').split('|||');
        html = '';
        $('.multiple-contents').html('');
        var count = 0;
        for (var i = 0; i < multiple_arr.length; i++) {
            if(!multiple_arr[i]){
                continue;
            }
            count++;
            html += '<p>' + count + '. ' + multiple_arr[i] + '&nbsp&nbsp<a style="color:#0F6099" id="multiple_delete" data-index=' + i +'>删除</a></p>';
            item_str = multiple_item_arr[i];
            if(item_str){
                item_arr = item_str.split('|-|');
                html += '<p style="margin-left:10px">';
                for (var k = 0; k < item_arr.length; k++) {
                    html += String.fromCharCode(65 + k) + '. ' + item_arr[k] + ' &nbsp&nbsp';
                }
                html += '</p>';
            }
        }

        $('.multiple-contents').append(html);
    }

    /**
     * 删除多选题题目
     * @param  {[type]} ){                     var index [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#multiple_delete",function(){
        var index = $(this).attr('data-index');
        multiple_arr = $('.multiple-contents').attr('data-multiple').split('|||');
        multiple_item_arr = $('.multiple-contents').attr('data-multiple-item').split('|||');
        multiple_arr.splice(index, 1);
        multiple_item_arr.splice(index, 1);
        var new_arr = new Array();
        var new_item_arr = new Array();
        for (var i = 0; i < multiple_arr.length; i++) {
            if(multiple_arr[i]){
                new_arr.push(multiple_arr[i]);
            }

            if(multiple_item_arr[i]){
                new_item_arr.push(multiple_item_arr[i]);
            }
        }
        new_str = new_arr.join('|||');
        new_str = '|||' + new_str;
        $('.multiple-contents').attr('data-multiple',new_str);

        new_item_str = new_item_arr.join('|||');
        new_item_str = '|||' + new_item_str;
        $('.multiple-contents').attr('data-multiple-item',new_item_str);
        reshowMultipleContent();
    });

    /**
     * 添加开放式问题
     * @param  {[type]} ){                     var content [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#add-open",function(){
        var content = $('#employeesurvey-openquestion').code();
        content = content.replace(/<\/?[^>]*>/g,''); //去除HTML tag

        if(!content){
            Utils.Toastr.Error('失败', '开放式问题-题目描述不能为空');
            return 0;
        }
        open_str = $('.open-contents').attr('data-open');
        open_str += '|||' + content;
        $('.open-contents').attr('data-open', open_str);

        reshowOpenContent();
    });

    /**
     * 重新渲染开放式问题
     * @return {[type]} [description]
     */
    function reshowOpenContent()
    {
        open_arr = $('.open-contents').attr('data-open').split('|||');
        $('.open-contents').html('');
        html = '';
        var count=0;
        for (var i = 0; i < open_arr.length; i++) {
            if(!open_arr[i]){
                continue;
            }
            count++;
            html += '<p>' + count + '. ' + open_arr[i] + '&nbsp&nbsp<a style="color:#0F6099" id="open_delete" data-index=' + i +'>删除</a></p>';

        }
        $('.open-contents').append(html);
    }

    /**
     * 删除开放式问题
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#open_delete",function(){
        var index = $(this).attr('data-index');
        open_arr = $('.open-contents').attr('data-open').split('|||');
        open_arr.splice(index, 1);
        var new_arr = new Array();
        for (var i = 0; i < open_arr.length; i++) {
            if(open_arr[i]){
                new_arr.push(open_arr[i]);
            }
        }
        new_str = new_arr.join('|||');
        new_str = '|||' + new_str;
        $('.open-contents').attr('data-open',new_str);
        reshowOpenContent();
    });


    var previewSumbit = $('#submit-survey-preview');
    var createForm = $('#survey-create-form')
    var updateForm = $('#survey-edit-form')

    previewSumbit.click(function() {
        var previewOrNot = false;
        open_arr = $('.open-contents').attr('data-open');
        single_arr = $('.single-contents').attr('data-single');
        multiple_arr = $('.multiple-contents').attr('data-multiple');
        satis_arr = $('.satis-contents').attr('data-satis');
        if(open_arr != '|||' && open_arr){
            previewOrNot = true;
        }

        if(satis_arr){
            previewOrNot = true;
        }

        if(single_arr != '|||' && single_arr){
            previewOrNot = true;
        }

        if(multiple_arr != '|||' && multiple_arr){
            previewOrNot = true;
        }

        if(!previewOrNot){
            Utils.Toastr.Info('错误', '至少设置单选、整体满意度、多选、开放式问题中的一种！');
            return 0;
        }

        var id = $('#survey_id').attr('data-id');

        previewSumbit.css('display',"none");
        $('#on-submit').css('display',"block");
        var data = getQuestions(createForm.serialize())
        $.post({
                url: 'preview',
                data: data,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = 'preview?id=' + id;
                    } else {
                        previewSumbit.css('display',"block");
                        $('#on-submit').css('display',"none");
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    previewSumbit.css('display',"block");
                    $('#on-submit').css('display',"none");
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );
    });



    /**
     * 获取所有的题目信息
     * @return {[type]} [description]
     */
    function getQuestions(str)
    {
        str += '&single%5B'+ $('.single-contents').attr('data-single') + '%5D';
        str += '&multiple%5B'+ $('.multiple-contents').attr('data-multiple') + '%5D';
        str += '&open%5B'+ $('.open-contents').attr('data-open') + '%5D';
        str += '&multiple-item%5B'+ $('.multiple-contents').attr('data-multiple-item') + '%5D';
        str += '&satis%5B'+ $('.satis-contents').attr('data-satis') + '%5D';
        return str;
    }

    /**
     * 后退
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $(document).on("click","#go-back",function(){
        history.go(-1)
    })

    function showUnSaveData()
    {
        var u_single = $('#unSaveData').attr('data-u-single');
        var u_multiple = $('#unSaveData').attr('data-u-multiple');
        var u_multiple_item = $('#unSaveData').attr('data-u-multiple-item');
        var u_open = $('#unSaveData').attr('data-u-open');
        var u_satis = $('#unSaveData').attr('data-u-satis');
        if(u_single){
            $('.single-contents').attr('data-single', u_single);
        }

        if(u_multiple){
            $('.multiple-contents').attr('data-multiple', u_multiple);
        }

        if(u_multiple_item){
            $('.multiple-contents').attr('data-multiple-item', u_multiple_item);
        }

        if(u_open){
            $('.open-contents').attr('data-open', u_open);
        }

        if(u_satis){
            $('.satis-contents').attr('data-satis', u_satis);
        }

        reshowSingleContent();
        reshowMultipleContent();
        reshowOpenContent();
        reShowSatisContent();
    }

    $(document).on("click","#cancel",function(){
        $.post({
                url: 'clear-unsave-data',
                data: {},
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = 'index';
                    } else {
                        Utils.Toastr.Info('错误', ret.data);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );

    })
});