// /**
//  * Created by yangwenshan on 16-10-20.
//  */
//
//
// $(function () {
//
//     var noAssignedCurrentPage = 1,newFlowCurrentPage=1,projectUserCurrentPage=1;
//     var noAssignedallPage = $('#no-assigned-allpage').text();
//     var newFlowallPage = $('#new-flow-allpage').text();
//     var projectUserallPage = $('#project-user-allpage').text();
//     var noAssignedUrl = '/feedback/ajax-get-noassigned-feedback';
//     var newFlowUrl = '/feedback/ajax-get-newflow-feedback';
//     var projectUserUrl = '/feedback/ajax-get-projectuser-info';
//
//     //未分配的反馈的分页处理的js
//     $('button.no-assigned-page').on('click',function (e) {
//         var left = $(this).find('i').hasClass('fa-chevron-left');
//         var right = $(this).find('i').hasClass('fa-chevron-right');
//
//         if(left && noAssignedCurrentPage>1){
//             noAssignedCurrentPage--;
//         }else if(right && noAssignedCurrentPage <=noAssignedallPage){
//             noAssignedCurrentPage++;
//         }
//         var url = noAssignedUrl + '?page='+noAssignedCurrentPage;
//         //设置当前页数的文本
//         $(this).parents('div.index-page').find('span.current-page b').text(noAssignedCurrentPage);
//
//         $.get(url,function (data) {
//             //设置按钮的状态
//             setButtonStatusNew('button.no-assigned-button-left','button.no-assigned-button-right',noAssignedCurrentPage,noAssignedallPage);
//             $('#no-assigned-content').html(data);
//
//         });
//
//
//     });
//
//     //反馈日志的分页处理的js
//     $('button.new-flow-page').on('click',function (e) {
//         var left = $(this).find('i').hasClass('fa-chevron-left');
//         var right = $(this).find('i').hasClass('fa-chevron-right');
//
//         if(left && newFlowCurrentPage>1){
//             newFlowCurrentPage--;
//         }else if(right && newFlowCurrentPage <=newFlowallPage){
//             newFlowCurrentPage++;
//         }
//         var url = newFlowUrl + '?page='+newFlowCurrentPage;
//         //设置当前页数的文本
//         $(this).parents('div.index-page').find('span.current-page b').text(newFlowCurrentPage);
//
//         $.get(url,function (data) {
//             //设置按钮的状态
//             setButtonStatusNew('button.new-flow-button-left','button.new-flow-button-right',newFlowCurrentPage,newFlowallPage);
//             $('#new-flow-content').html(data);
//
//         });
//
//
//     });
//
//     //项目用户的分页处理的js
//     $('button.project-user-page').on('click',function (e) {
//         var left = $(this).find('i').hasClass('fa-chevron-left');
//         var right = $(this).find('i').hasClass('fa-chevron-right');
//
//         if(left && projectUserCurrentPage>1){
//             projectUserCurrentPage--;
//         }else if(right && projectUserCurrentPage <=projectUserallPage){
//             projectUserCurrentPage++;
//         }
//         var url = projectUserUrl + '?page='+projectUserCurrentPage;
//         //设置当前页数的文本
//         $(this).parents('div.index-page').find('span.current-page b').text(projectUserCurrentPage);
//
//         $.get(url,function (data) {
//             //设置按钮的状态
//             setButtonStatusNew('button.project-user-button-left','button.project-user-button-right',projectUserCurrentPage,projectUserallPage);
//             $('#project-user-content').html(data);
//
//         });
//
//
//     });
//     //刷新页面，首先禁用左边按钮
//     setButtonStatusNew('button.no-assigned-button-left','button.no-assigned-button-right',noAssignedCurrentPage,noAssignedallPage);
//     setButtonStatusNew('button.new-flow-button-left','button.new-flow-button-right',newFlowCurrentPage,newFlowallPage);
//     setButtonStatusNew('button.project-user-button-left','button.project-user-button-right',projectUserCurrentPage,projectUserallPage);
//
//      function setButtonStatusNew(left,right,currentPage,allPage)
//     {
//         if(allPage == 1){
//             //禁用未分配的按钮左右边的按钮
//             $(left).attr('disabled',true);
//             $(right).attr('disabled',true);
//         }else{
//             //当前页数等于1，禁用左边的按钮，右边放开
//             if(currentPage ==1  ){
//                 $(left).attr('disabled',true);
//                 $(right).attr('disabled',false);
//             }else if(currentPage >= allPage){
//                 //右边禁用，左边放开
//                 $(left).attr('disabled',false);
//                 $(right).attr('disabled',true);
//             }else{
//                 //左右都要放开
//                 $(left).attr('disabled',false);
//                 $(right).attr('disabled',false);
//             }
//         }
//     }
//
//
//
//
//
//    //设置导航选中状态的js
//     var nav1 = $('#aside').find('nav.nav-active-primary ul.nav').children('li:nth-child(1)');
//     var nav2 = $('#aside').find('nav.nav-active-primary ul.nav').children('li:nth-child(2)');
//
//     //刷新，把第一个导航选中
//     // if( ! nav1.hasClass('active')){
//     //     nav1.addClass('active');
//     // }
//
//
//     function setBtnForbid(btn,flag) {
//         if (flag) {
//             $(btn).attr('disabled', true);
//             $(btn).css({'background': '#B0B0B0'});
//         } else {
//             $(btn).attr('disabled', false);
//             $(btn).css({'background': ''});
//         }
//     }
//
//     $("a[data-target='#m-a-a']").bind('click', function (ev) {
//         $(this).unbind('click');
//         ev.preventDefault();
//         var target = $(this).attr("href");
//
//         $("#m-a-a .modal-content").load(target, function () {
//             $("#m-a-a").modal("show");
//         });
//
//     });
//     //如果没有认证,则弹层提示进行验证
//     var indexAddUserInfoBtn = $('#index-add-userinfo-btn');
//     var authkey = indexAddUserInfoBtn.data('authkey');
//     if (!authkey) {
//         indexAddUserInfoBtn.click();
//     }
//
// });