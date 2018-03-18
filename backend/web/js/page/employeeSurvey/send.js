$(function(){

    $(document).on("click","#submit-survey-send",function(){
        $('#on-submit').css('display',"block");
        var id = $('#survey-id').attr('data-id');
        var sended_num = $('#sended').attr('data-sended');
		var allow_num = $('#allow').attr('data-allow');
		var send_num = $('#send').val();
		var postOrNot = true;
		if(!send_num){
			Utils.Toastr.Info('错误', '本次投放人数不能为空');
			$('#submit-survey').css('display',"block");
	        $('#on-submit').css('display',"none");
			postOrNot = false;
		}

		if(isNaN(send_num)){
			$('#submit-survey').css('display',"block");
	        $('#on-submit').css('display',"none");
			Utils.Toastr.Info('错误', '请输入数字');
			postOrNot = false;
		}

		if(Number(send_num) > Number(allow_num)){
			$('#submit-survey').css('display',"block");
	        $('#on-submit').css('display',"none");
			Utils.Toastr.Info('错误', '本次最多允许投放' + allow_num + '个人');
			postOrNot = false;
		}

		if(postOrNot){
			$('#submit-survey-send').css('display',"none");
			$('#on-submit').css('display',"block");
	        $.post({
	                url: 'send-survey?id=' + id,
	                data: {send_num:send_num},
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
		}
    });

    $(document).on("click","#submit-survey-resend",function(){

		$('#submit-survey-resend').css('display',"none");
		$('#on-submit').css('display',"block");
		surveyId = $('#survey-id').attr('data-id');
		sendId   = $('#send-id').attr('data-id');
        $.post({
                url: 'resend?sendId=' + sendId + '&surveyId=' + surveyId,
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "send-survey?id="+surveyId;
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
    });

     $(document).on("click","#send-info",function(){
     	var send_id = $(this).attr('data-id');
     	 window.location.href = 'send-info?id=' + send_id;

     });

     $('.article-group').attr("style","");
});