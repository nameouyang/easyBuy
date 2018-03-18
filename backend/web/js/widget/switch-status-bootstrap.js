$(function () {
    $(".switch:checkbox").bootstrapSwitch();
    $(".switch:checkbox").on('switchChange.bootstrapSwitch', function (event,state) {
        var status = state ? 1 : 0;
        var name = $(this).data('name');
        var url = $(this).data('url');
        var data = eval('(' + '{"'+name+'":'+status+'}'+ ')');
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json",
            success: function(result){
                if(result.code === 0){
                    Utils.Toastr.Success("<?= Yii::t('app', 'Update Success')?>", result.msg);
                    return false;
                }else{
                    Utils.Toastr.Error("<?= Yii::t('app', 'Update Failed')?>", result.msg);
                    setInterval(function () {
                        window.location.reload();
                    },1000);
                    return false;
                }
            }
        });
        return false;
    });
});

