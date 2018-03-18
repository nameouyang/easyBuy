// /**
//  * Created by yangwenshan on 16-9-28.
//  */
//
// $(function (){
//     //反馈状态变更的几个方法
//     $(document).on('ready pjax:success',function(event){
//         // alert(1111);
//         function resolvedFeedback() {
//             var id = $(this).attr('feedback-id');
//             var _csrf = $('meta[name="csrf-token"]').attr("content");
//             var msg = "您真的确定解决问题了吗？";
//             event.preventDefault();
//             if (confirm(msg) == true) {
//                 $.ajax({
//                     url: "/feedback/update?id=" + id,
//                     type: "POST",
//                     data: {'feedback_id': id, '_csrf': _csrf, 'comment': '已经解决', 'status': 2},
//                     dataType: "json",
//                     success: function (msg) {
//                         console.log(msg);
//                         if (msg.code == 0) {
//                             window.location.reload();
//                         } else {
//                             alert(msg.msg);
//                         }
//                     },
//                     error: function (msg) {
//                         console.log(msg);
//                     }
//                 });
//             }
//
//         }
//
//         function closeFeedback(event) {
//             var id = $(this).attr('feedback-id');
//             var _csrf = $('meta[name="csrf-token"]').attr("content");
//             var msg = "您真的确定关闭问题吗？";
//             event.preventDefault();
//             if (confirm(msg)==true){
//                 $.ajax({
//                     url: "/feedback/update?id="+id,
//                     type: "POST",
//                     data: {'feedback_id':id,'_csrf':_csrf,'comment':'已经关闭','status':0},
//                     dataType:"json",
//                     success: function(msg){
//                         console.log(msg);
//                         if(msg.code == 0){
//                             window.location.reload();
//                         }else{
//                             alert(msg.msg);
//                         }
//                     },
//                     error:function(msg){
//                         console.log(msg);
//                     }
//                 });
//             }
//
//         }
//         function assignedTo(event) {
//             event.preventDefault();
//             var target = $(this).attr("href");
//
//             $("#m-a-a .modal-content").load(target, function() {
//
//                 $("#m-a-a").modal("show");
//                 console.log($('#edit-form').length);
//             });
//         }
//
//         $("a[name='resolved-feedback']").on('click',resolvedFeedback);
//         $("a[name='close-feedback']").on('click',closeFeedback);
//         $("a[data-target='#m-a-a']").on('click',assignedTo);
//     });
//
//
// //三级联动的js
//     $('#feedback-project_id').change(function (e) {
//         var project_id = $(this).val();
//         var cat_option = '<option value="">请选择反馈问题分类</option> ';
//         //发送ajax请求获取项目下的分类
//         $.ajax({
//             url:'/feedback/getcategoryinfo',
//             type:'GET',
//             dataType:'json',
//             data:{'project_id':project_id},
//             success:function(msg){
//                 var data = msg.data;
//                 var len=msg.data.length;
//                 if(len == 0){
//                     $('#feedback-title').html('<option value="">该项目下没有分类</option>');
//                     return false;
//                 }
//                 for(var i=0;i<len;i++){
//                     cat_option += '<option value="'+data[i].id+'">'+data[i].title+'</option>';
//                 }
//                 $('#feedback-title').html(cat_option);
//             },
//             error:function (msg) {
//                 console.log(msg);
//             },
//         });
//
//         //获取具体问题
//         $('#feedback-title').change(function(e){
//             var category_id = $(this).val();
//             var issue_checkbox ='';
//             $.ajax({
//                 url:'/feedback/getissueinfo',
//                 type:'GET',
//                 dataType:'json',
//                 data:{'category_id':category_id},
//                 success:function (msg) {
//                     var data = msg.data;
//                     var len = data.length;
//                     if(len == 0){
//                         $('#feedback-issues').html('');
//                         return false;
//                     }
//                     for(var i=0;i<len;i++){
//                         if(data[i].title.length == 0){
//                             continue;
//                         }
//                         issue_checkbox +='  <label><input type="checkbox" name="Feedback[issues][]" value="'+data[i].id+'" class="has-value"> '+data[i].title+'</label>  ';
//                     }
//                     $('#feedback-issues').html(issue_checkbox);
//
//                 }
//             });
//
//         });
//     });
//
//
//
// //addteam下的js
//
//     $('#userCreate-form').find('#add-team-buttions').click(function (){
//         var selectVal = $('#userCreate-form').find('#single-append-radio').val();
//         var role =$("input[name='role']:checked").val()
//         if( ! selectVal){
//             $('#userCreate-form').find('.div-show').show();
//             return false;
//         }
//         // if(role == null){
//         //     $('#userCreate-form').find('.div-show-role').show();
//         //     return false;
//         // }
//         var span = '';
//         for(var len =selectVal.length,i=0;i < len;i++){
//             var sel = '.'+selectVal[i];
//             span += ' <pan>'+$(sel).text()+'</span> ';
//         }
//         var id = $('input[name="addteam_project_id"]').val();
//         var _csrf = $('meta[name="csrf-token"]').attr("content");
//         //禁用按钮
//         setBtnForbid('#add-team-buttions',true);
//         $.ajax({
//             url: "/project/addteam?id="+id,
//             type: "POST",
//             data: {'selectVal':selectVal,'id':id,'_csrf':_csrf,'role':role},
//             dataType:"json",
//             success: function(msg){
//                 console.log(msg);
//                 if (msg.code != 0) {
//                     Utils.Toastr.Warning('错误', msg.msg);
//                 } else {
//                     Utils.Toastr.Success('成功', msg.msg);
//                     self.location.reload();
//                 }
//             },
//             error:function(msg){
//                 console.log(msg);
//             }
//         });
//         return false;
//     });
//     $('#single-append-radio').change(function (e){
//         $('#userCreate-form').find('.div-show').hide();
//     });
//     $('input[name=role]').change(function (){
//         $('#userCreate-form').find('.div-show-role').hide();
//     });
//
//
//
//     //设置导航选中状态的js
//     var nav1 = $('#aside').find('nav.nav-active-primary ul.nav').children('li:nth-child(1)');
//     var nav2 = $('#aside').find('nav.nav-active-primary ul.nav').children('li:nth-child(2)');
//
//     //影藏差异化的字段
//     $('div.field-feedback-device,div.field-feedback-os,div.field-feedback-app,div.field-feedback-browser').hide();
//     //创建反馈的模板的差异化处理
//     $('#feedback-project_id').change(function () {
//         var project_id = $(this).val();
//         var descHolder = '选填，（补充内容：支付问题请提供SA订单号,示例：SA161020562036968）';
//         if(project_id == 4){
//             $('div.field-feedback-device,div.field-feedback-os,div.field-feedback-app,div.field-feedback-browser').hide();
//             $('div.field-feedback-device,div.field-feedback-os,div.field-feedback-app').show();
//             $('#feedback-device').attr('placeholder','必填，示例：小米5，小米电视65');
//             $('#feedback-os').attr('placeholder','必填，示例：MIUI7.3.6稳定版');
//             $('#feedback-app').attr('placeholder','选填');
//
//         }else if(project_id == 1){
//             $('div.field-feedback-device,div.field-feedback-os,div.field-feedback-app,div.field-feedback-browser').hide();
//             $('div.field-feedback-browser').show();
//             $('#feedback-browser').attr('placeholder','请使用谷歌浏览器');
//             $('#feedback-description').attr('placeholder',descHolder);
//
//         }else if(project_id == 3){
//
//             $('div.field-feedback-device,div.field-feedback-os,div.field-feedback-app').show();
//             $('#feedback-device').attr('placeholder','必填，示例：小米5，小米电视65');
//             $('#feedback-os').attr('placeholder','必填，示例：MIUI7.3.6稳定版');
//             $('#feedback-app').attr('placeholder','选填');
//             $('#feedback-description').attr('placeholder',descHolder);
//         }else{
//             $('#feedback-description').attr('placeholder',descHolder);
//         }
//
//     });
//
//
//
//     function setBtnForbid(btn,flag)
//     {
//         if(flag){
//             $(btn).attr('disabled',true);
//             $(btn).css({'background':'#B0B0B0'});
//         }else{
//             $(btn).attr('disabled',false);
//             $(btn).css({'background':''});
//         }
//
//     }
//
//
//
//
//     //创建问题的时候的分类级联
//     $('#issue-project').change(function (e) {
//         var project_id = $(this).val();
//         var cat_option = '<option value="">请选择反馈问题分类</option> ';
//         //发送ajax请求获取项目下的分类
//         $.ajax({
//             url:'/feedback/getcategoryinfo',
//             type:'GET',
//             dataType:'json',
//             data:{'project_id':project_id},
//             success:function(msg){
//                 var data = msg.data;
//                 var len=msg.data.length;
//                 if(len == 0){
//                     $('#feedback-issue-title').html('<option value="">该项目下没有分类</option>');
//                     return false;
//                 }
//                 for(var i=0;i<len;i++){
//                     cat_option += '<option value="'+data[i].id+'">'+data[i].title+'</option>';
//                 }
//                 $('#feedback-issue-title').html(cat_option);
//             },
//             error:function (msg) {
//                 console.log(msg);
//             },
//         });
//
//     });
//
//     //删除项目成员的js
//     $('#dele-span-prouser').find('.dele-prouser').click(function () {
//         var user_id = $(this).parents('.prouserinfo').attr('user-id');
//         var project_id = $('#project-id').val();
//         var _csrf = $('meta[name="csrf-token"]').attr("content");
//         $.ajax({
//             url:'/project/delete-project-user',
//             type:'post',
//             dataType:'json',
//             data:{'project_id':project_id,'user_id':user_id,'_csrf':_csrf},
//             success:function(msg){
//                     if (msg.code != 0) {
//                         Utils.Toastr.Warning('错误', msg.msg);
//                     } else {
//                         Utils.Toastr.Success('成功', msg.msg);
//                         self.location.reload();
//                     }
//             },
//             error:function (msg) {
//                 console.log(msg);
//             },
//         });
//     });
//
//
// });