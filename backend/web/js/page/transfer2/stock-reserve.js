/**
 * Created by lurenzhong@xiaomi.com on 16-8-22.
 */

$(function() {

    //修改库存预留比例的js
    $(document).on('click','#reserve-update',function(){

        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer/stock-reserve/update',
            data:$('#reserveUpdate-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                self.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','修改预留比例成功');
                    self.location.reload();
                }else if( data.code == 10001 || data.code == 10002 || data.code == 10003 ){
                    Utils.Toastr.Info('提示',data.msg);
                }else if ( data.code == 10004 ){
                    Utils.Toastr.Error('失败','修改预留比例失败');
                    self.location.reload();
                }
            }
        });

    });


    $(document).on('submit','#reserveUpdate-form',function(){
        return false;
    });

    //监听预留比例input输入
    $('.reserve_ratio_input').on('input', function () {
        var _ratioVal = $('.reserve_ratio_input input').val();
        var _otherRatioVal = $('#other_reserve_ratio').val();

        if ( _ratioVal < 0 ||  _otherRatioVal < 0 ){
            Utils.Toastr.Info('提示','预留比例不能为负数');
        }else if( _ratioVal.length > 3 || _otherRatioVal.length > 3 ){
            Utils.Toastr.Info('提示','字符数应小于4位');
        }else if( _ratioVal > 100 || _otherRatioVal > 100 ){
            Utils.Toastr.Info('提示','预留比例范围应在0-100之间');
        }

    });

    //$(document).on('change', ".range-input", function(){
    //    $(this).prev('label').html($(this).val());
    //});

    $(".range-input").ionRangeSlider({
        type: "single",
        grid: true,
        min: 0,
        max: 100,
        from: 10,
        postfix: "%"
    });

    //批量添加库存预留比例js
    $(document).on('click','#submit-stockReserve', function () {

        $.ajax({
            cache: true,
            type: "POST",
            url: '/transfer/stock-reserve/batch-create',
            data:$('#submitReserve-form').serialize(),
            error: function(request) {
                Utils.Toastr.Error('失败','网络错误');
                window.location.reload();
            },
            success: function(data) {
                if ( data.code == 0 ){
                    Utils.Toastr.Success('成功','批量添加预留比例成功');
                    window.location.href = '/transfer/stock-reserve/index';
                }else if( data.code == 10001 || data.code == 10002 || data.code == 10034 ) {
                    Utils.Toastr.Info('提示',data.msg);
                }else if( data.code == 10003 ){
                    Utils.Toastr.Warning('警告','你已添加过该sku预留比例，请编辑原有比例');
                }else if( data.code == 10004 ){
                    Utils.Toastr.Error('失败','批量添加预留比例失败');
                    window.location.reload();
                }
            }
        });

    });


});

