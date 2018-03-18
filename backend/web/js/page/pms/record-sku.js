$(document).on('input', '.search-input-sku', function(event){
    if($(this).val() == ""){
        $('.search-record').attr('disabled', true);
    } else {
        $('.search-record').attr('disabled', false);
    }
})