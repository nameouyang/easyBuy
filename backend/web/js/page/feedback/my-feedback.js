/**
 * Created by yangwenshan on 16-10-11.
 */
var  userId = $('input[name="userId"]').val();
var url = '/feedback/ajax-feedback?assigned_to='+userId;
var levelText = '',statusText='',sortText='';
var levelParam = '',statusParam='',sortParam='',page=1;
var desc =  '';
var allPage = 1;
//优先级
$('a.a-level').on('click',function (e) {
    e.preventDefault();
    var  title = $(this).parents('div.dropdown').find('span.dropdown-label').text();
    var   text = $(this).text();
    levelText = '<a class="search-condition levelParam">'+title+'：'+text+'<span class="icon-btn-x">x</span></a>';
    desc =  levelText+statusText+sortText
    $('#search-condition-box').html(desc);
    levelParam = $(this).attr('data') ;
    page = 1;
    var param = getParam();
    var getUrl = url +param;

    $.get(getUrl,function (data) {
        $('div.list').html(data);
        //注册事件处理清除筛选条件时，
        registerClear();
        //设置总的页数
        setAllpage();
        //设置按钮的变化
        setButtonStatus();
    },'html');
});
//状态
$('a.a-status').on('click',function (e) {
    e.preventDefault();
    var  title = $(this).parents('div.dropdown').find('span.dropdown-label').text();
    var   text = $(this).text();
    statusText = '<a class="search-condition statusParam">'+title+'：'+text+'<span class="icon-btn-x">x</span></a>';
    desc =  levelText+statusText+sortText
    $('#search-condition-box').html(desc);
    statusParam = $(this).attr('data') ;
    page = 1;
    var param = getParam();
    var getUrl = url +param;
    $.get(getUrl,function (data) {
        $('div.list').html(data);
        //注册事件处理清除筛选条件时，
        registerClear();
        //设置总的页数
        setAllpage();
        //设置按钮的变化
        setButtonStatus();
    },'html');
});
//排序
$('a.a-sort').on('click',function (e) {
    e.preventDefault();
    var  title = $(this).parents('div.dropdown').find('span.dropdown-label').text();
    var   text = $(this).text();
    //<a class="search-condition">优先级：低 <span class="icon-btn-x">x</span></a>
    sortText = '<a class="search-condition sortParam">'+title+'：'+text+'<span class="icon-btn-x">x</span></a>';
    desc =  levelText+statusText+sortText
    $('#search-condition-box').html(desc);
    sortParam = $(this).attr('data') ;
    page = 1;
    var param = getParam();
    var getUrl = url +param;
    $.get(getUrl,function (data) {
        $('div.list').html(data);
        //注册事件处理清除筛选条件时，
        registerClear();
        //设置总的页数
        setAllpage();
        //设置按钮的变化
        setButtonStatus();
    },'html');
});

//我的反馈
$('.my-project a.nav-link').on('click',function (e) {
    e.preventDefault();

    levelParam = '',statusParam='',sortParam='';
    $('a.nav-link').find('i.fa-circle').hide();
    $('a.nav-link').removeClass('active');
    $(this).addClass('active');
    //清空筛选提示
    $('#search-condition-box').html('');
    levelText = '',statusText='',sortText='';
    page=1;
    url = $(this).attr('href');
    $.get(url,function (data) {
        $('div.list').html(data);
        //设置总的页数
        setAllpage();
        //设置按钮的变化
        setButtonStatus();
    },'html');

});
//我的项目
$('.my-projects a.nav-link').on('click',function (e) {
    e.preventDefault();
    //清空筛选提示
    $('#search-condition-box').html('');
    levelText = '',statusText='',sortText='';
    levelParam = '',statusParam='',sortParam='';
    $('a.nav-link').removeClass('active');
    $('a.nav-link').find('i.fa-circle').hide();
    $(this).find('i.fa-circle').show();
    page=1;
    url = $(this).attr('href');
    $.get(url,function (data) {
        $('div.list').html(data);
        //设置总的页数
        setAllpage();
        //设置按钮的变化
        setButtonStatus();
    },'html');
});
//刷新
$('#b-refresh').on('click',function (e) {
    var refreshUrl = url + getParam();
    $(this).find('i.i-refresh').removeClass('fa-refresh');
    $(this).find('i.i-refresh').addClass('ajax-gif');
    $.get(refreshUrl,function (data) {
        $('div.list').html(data);
        //设置总的页数
//            setAllpage()
        setTimeout(function () {
            $('#b-refresh').find('i.i-refresh').removeClass('ajax-gif');
            $('#b-refresh').find('i.i-refresh').addClass('fa-refresh');
        },100);

    },'html');
})

var req = 1;
$('button.page').on('click',function (e) {
    allPage = $('#allpage').val();
    var left = $(this).find('i').hasClass('fa-chevron-left');
    var right = $(this).find('i').hasClass('fa-chevron-right');

    if(left && page > 1){
        page--;
        req=1;
    }else if (right && page<allPage){
        page++;
        req=1;
    }
    $('span.current-page').find('b').text(page);
    $('span.current-allpage').find('b').text(allPage);
    var param = getParam();
    var pageUrl = url+param;
    //设置按钮的变化
    setButtonStatus();
    if(! req){
        return false;
    }
    $.get(pageUrl,function (data) {
        $('div.list').html(data);
        if(page>=allPage || page == 1){
            req = 0;
        }
    });

});
function getParam() {
    var param = '';
    if(levelParam){
        param += '&'+levelParam ;
    }
    if(statusParam){
        param += '&'+statusParam ;
    }
    if(sortParam){
        param += '&' + sortParam;
    }
    param += '&page='+page;

    return param;
}
function setAllpage() {
    allPage = $('#allpage').val();
    $('span.current-allpage').find('b').text(allPage);
    $('span.current-page').find('b').text('1');
    if(allPage<=0){
        $('div.page-total').hide();
    }else{
        $('div.page-total').show();
    }
}
function registerClear() {
    //鼠标事件
    $('#search-condition-box a.search-condition').hover(function (e) {
        $(this).css({'border':'1px solid red'});
        $(this).find('span.icon-btn-x').css({'color':'red'});
    },function (e) {
        $(this).css({'border':'1px solid #e8e8e8'});
        $(this).find('span.icon-btn-x').css({'color':''});
    })
    //点击删除条件，重新请求
    $('#search-condition-box a.search-condition').on('click',function (e) {
        $(this).remove();
        if($(this).hasClass('levelParam')){
            levelParam = '';
            levelText = '';
        }
        if($(this).hasClass('statusParam')){
            statusParam = '';
            statusText = '';
        }
        if($(this).hasClass('sortParam')){
            sortParam = '';
            sortText = '';
        }
        var getUrl = url + getParam();
        $.get(getUrl,function (data) {
            $('div.list').html(data);
            //设置总的页数
            setAllpage();
            //设置按钮的变化
            setButtonStatus();
        });
    })
}
$(function (e) {
    setButtonStatus();
});
//置灰处理
function setButtonStatus(){
    allPage = $('#allpage').val();
    if(allPage == 1){
        //禁用button
        $('button.page').attr('disabled',true);
        $('button.page').css({'color':'#959fb0'});
    }else{
        if(allPage == page){
            //如果当前页等于总页数，右边禁用左边放开
            $('button.button-right').attr('disabled',true);
            $('button.button-right').css({'color':'#959fb0'});
            $('button.button-left').attr('disabled',false);
            $('button.button-left').css({'color':'#333'});
        }else if(page == 1){
            //左边禁用，右边放开
            $('button.button-right').attr('disabled',false);

            $('button.button-right').css({'color':'#333'});
            $('button.button-left').css({'color':'#959fb0'});
            $('button.button-left').attr('disabled',true);
        }else{
            //两边都要放开
            $('button.button-right').attr('disabled',false);
            $('button.button-left').attr('disabled',false);
            $('button.button-right').css({'color':'#333'});
            $('button.button-left').css({'color':'#333'});
        }
    }
}


//提交评论的js
$(function () {
    $('#btn-comment').on('click',function (e) {
        e.preventDefault();
        var feedback_id = $('input[name="com-feed-id"]').val();
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var comment = $('#text-comment').val();
        var attachments = $("input[name=message-attachment]");
        var attachmentArr = new Array();
        $.each(attachments,function(i){
            attachmentArr[i] = $(this).val();
        });
        if(! $.trim(comment)){
            //验证评论内容不能为空
            $('.div-comment_cont').show();
            $("#text-comment").focus(function (e){
                $('.div-comment_cont').hide();
            });
            return false;
        }else{
            $('.div-comment_cont').hide();
        }
        //如果点击了，就把按钮设置成灰色和禁用的，防止并发
        setBtnForbid('#btn-comment',true);
        var url = '/feedback/feedback/ajax-create-message';
        $.ajax({
            url:url,
            type:'POST',
            dataType:'json',
            data:{'comment':comment,'_csrf':csrfToken,'feedback_id':feedback_id,'attachment':attachmentArr},
            success:function (res) {
                console.log(res);
                if(res.code == 200){
                    Utils.Toastr.Success('成功', res.msg);
                    window.location.reload();
                }else{
                    Utils.Toastr.Warning('添加失败', res.msg);
                    setBtnForbid('#btn-comment',false);
                }

            },
            error:function (res) {
                setBtnForbid('#btn-comment',false);
                console.log(res);
                Utils.Toastr.Warning('错误', res.msg);
            }

        });
    });

});


function setBtnForbid(btn,flag)
{
    if(flag){
        $(btn).attr('disabled',true);
        $(btn).css({'background':'#B0B0B0'});
    }else{
        $(btn).attr('disabled',false);
        $(btn).css({'background':''});
    }

}















