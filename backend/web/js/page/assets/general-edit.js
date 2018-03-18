$(function(){
   $(document).on('click', '#btn-edit', function(){
         $(".edit").attr('readonly', false);
         $(".supplier-edit").removeAttr('disabled');
   });

   $(document).on('change', '.edit', function(){
       var url = $(this).data('url');
       var params = new Object();
       params.quantity = $(this).val();
       params.advice = $(this).val();
       $.ajax({
           cache : false,
           type : 'POST',
           url : url,
           data : params,
           error:function(error){
               Utils.Toastr.Info('错误', '网络问题');
           },
           success: function(data){
               if(data.code == 0)
               {
                   if(params.quantity)
                   {
                       var sendTotal = 0;
                       $(".send-quantity").each(function(index, ele){
                           sendTotal = parseInt(sendTotal) + parseInt(ele.value);
                       });
                       $("#sendTotal").text(sendTotal);
                   }
                   Utils.Toastr.Success('成功',data.msg);
               }
               else {
                   Utils.Toastr.Info('提示', data.msg);
               }
           }
       });
   });

   $(document).on('change', '.supplier-edit', function(){
       var value = $(this).val();
       var id = $(this).data('id');
       console.log(id);
       var params = new Object();
       params.warehouseId = value,
       $.ajax({
           cache : false,
           type : 'POST',
           data : params,
           url : '/assets/material-delivery/save-waybill?id='+id,
           error : function(error){
                Utils.Toastr.Error('error', error);
           },
           success : function(data){
               if(data.code == 0)
               {
                   Utils.Toastr.Success('Success', data.msg);
               }
               else {
                   Utils.Toastr.Warning('Info', data.msg);
               }
           }
       })
   });
});