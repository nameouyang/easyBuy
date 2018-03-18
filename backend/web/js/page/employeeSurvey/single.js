$(function(){
	$('.table').find('tr').each(function(){
		key_str = $(this).attr('data-key');
		if(key_str){
			str = key_str.substring(0, 1)
			if(str == 0){
				$(this).css("border-top-style","inset")
				$(this).css("border-top-color","burlywood")
			}
		}
	});

});