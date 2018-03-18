$(function(){
	$('.table').find('tr').each(function(){
		key_str = $(this).attr('data-key');
		if(key_str){
			key_arr = key_str.split('-');
			if(key_arr[1] == 0){
				$(this).css("border-top-style","inset")
				$(this).css("border-top-color","burlywood")
			}
		}
	});

});