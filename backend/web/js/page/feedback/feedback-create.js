/**
 * Created by wzm on 17-12-31.
 */
$('input[name="FbCreator[mi_id]"]').focus(function (e){
    $('.div-comment_miId').hide();
});

$('input[name="FbCreator[store_name]"]').focus(function (e){
    $('.div-comment_emptyStore').hide();
});

$('input[name="FbCreator[phone]"]').focus(function (e){
    $('.div-comment_phone').hide();
    $('.div-comment_emptyPhone').hide();
});

$('input[name="FbCreator[email]').blur(function (e){
    var email = $('input[name="FbCreator[email]"]').val();
    if(! $.trim(email)){
        $('input[name="FbCreator[email]"]').focus(function (e){
            $('.div-comment_email').hide();
        });
        return false;
    } else {
        if (isEmailNo(email)) {
            $('.div-comment_email').hide();
        } else {
            $('.div-comment_email').show();
        }
    }
});

// $('input[name="FbCreator[mi_id]').blur(function (e){
//     var miId = $('input[name="FbCreator[mi_id]"]').val();
//     if(! $.trim(miId)){
//         $('input[name="FbCreator[mi_id]"]').focus(function (e){
//             $('.div-comment_miId').hide();
//         });
//         return false;
//     } else {
//         if (isNumber(miId)) {
//             $('.div-comment_miId').hide();
//         } else {
//             $('.div-comment_miId').show();
//         }
//     }
// });

function isNumber(miId) {
    var pattern = /^(-)?\d+(\.\d+)?$/;
    return pattern.test(miId);
}

function isPhoneNo(phone) {
    var pattern = /^1[34578]\d{9}$/;
    return pattern.test(phone);
}

function isEmailNo(email) {
    var pattern =  /\w+[@]{1}\w+[.]\w+/;
    return pattern.test(email);
}

$('.btn-success').on('click',function (e) {
    var secondSystem = $('select[name="second_system"]').val();
    var secondQuestion = $('select[name="second_question"]').val();
    var phone = $('input[name="FbCreator[phone]"]').val();
    var storeName = $('input[name="FbCreator[store_name]"]').val();
    var miId = $('select[name="FbCreator[mi_id]"]').val();
    if(! $.trim(miId)){
        $('.div-comment_miId').show();
        return false;
    }
    if(! $.trim(phone)){
        $('.div-comment_emptyPhone').show();
        return false;
    } else {
        if (!isPhoneNo(phone)) {
            $('.div-comment_phone').show();
            return false;
        }
    }
    if(! $.trim(storeName)){
        $('.div-comment_emptyStore').show();
        return false;
    }
    if(! $.trim(secondSystem)){
        $('.div-comment_system').show();
        return false;
    }
    if(! $.trim(secondQuestion)){
        $('.div-comment_question').show();
        return false;
    }

});

$("select[name='second_system']").change(function(){
    $('.div-comment_system').hide();
});

$("select[name='second_question']").change(function(){
    $('.div-comment_question').hide();
});

$("select[name='FbCreator[mi_id]']").change(function(){
    $('.div-comment_miId').hide();
    var miId = $(this).val();

    if (miId.length != 0) {
        $.ajax({
            method: "POST",
            url: "/feedback/feedback/ajax-get-user-info",
            data: {
                'mi_id': miId
            },
            dataType: "JSON",
            success: function (data) {
                if (data.code == 200) {
                    $("input[name='FbCreator[phone]']").val(data.data.phone);
                    $("input[name='assist-mi_id").val(data.data.mi_id);
                    $("input[name='FbCreator[email]']").val(data.data.email);
                    $("input[name='FbCreator[store_name]']").val(data.data.dep_name);
                }
            }
        })
    }

    if (miId.length == 0) {
        $("input[name='FbCreator[phone]']").val('');
        $("input[name='assist-mi_id").val('');
        $("input[name='FbCreator[email]']").val('');
        $("input[name='FbCreator[store_name]']").val('');
    }

});
