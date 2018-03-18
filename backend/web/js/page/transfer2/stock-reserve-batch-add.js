$(function () {
    $('#stock-reserve-submit-btn').click(
            function ()
            {
                var layerIndex = layer.load(0, {
                    shade: [0.2, '#000']
                });
                
                $.ajax({
                    cache: false,
                    type: "POST",
                    url: '/transfer/stock-reserve/batch-add',
                    data: $('#batch-add-reserve-form').serialize(),
                    error: function (request) {
                        Utils.Toastr.Error('失败', '网络错误');
                        layer.close(layerIndex);
                    },
                    success: function (data) {
                        if (data.code == 0) {
                            Utils.Toastr.Success('成功', data.msg);
                        } else {
                            Utils.Toastr.Error('失败', data.msg);
                        }
                        layer.close(layerIndex);
                    }
                });

            }
    );
    $('#range-set-add-btn').click(
            function ()
            {
                slider = $(".range-input").data("ionRangeSlider");
                $("#range-set").children().find('select').select2("destroy");
                slider.destroy();
                fieldsNum = $("#add-count").val();
                $("#add-count").val(1 + parseInt(fieldsNum));
                $("#range-set").children().first().clone().appendTo("#range-set");
                $("#range-set").children().find('select').select2({theme: "bootstrap"});
                $(".range-input").ionRangeSlider({
                    type: "single",
                    grid: true,
                    min: 0,
                    max: 100,
                    from: 10,
                    postfix: "%"
                });
                lastGroup = $("#range-set").children().last();
                lastGroupLast = lastGroup.children().last();
                lastGroupLast.find("input").attr('name', 'reserve_ratio[' + fieldsNum + ']');
                lastGroup.find('select').attr('name', 'warehouse_id[' + fieldsNum + '][]');
                lastGroup.find('.range-set-minus-btn').show();
                $(".app-footer").html($(".app-footer").html());
                $('.range-set-minus-btn').click(
                        function () {
                            $(this).parent().parent().remove()
                        }
                );
            }
    );


});