$(function () {

    $('#balance-batch-add-btn').click(
            function ()
            {
                var layerIndex = layer.load(0, {
                    shade: [0.2, '#000']
                });
                
                $.ajax({
                    cache: false,
                    type: "POST",
                    url: '/transfer/balance/batch-add',
                    data: $('#balance-batch-add-form').serialize(),
                    error: function (request) {
                        Utils.Toastr.Error('失败', '网络错误');
                        layer.close(layerIndex);
                    },
                    success: function (data) {
                        if (data.code == 0) {
                            Utils.Toastr.Success('成功', '创建可调拨数量成功');
                        } else {
                            Utils.Toastr.Error('失败', data.msg);
                        }
                        layer.close(layerIndex);
                    }
                });

            }
    );

    $('#org-amount-add-btn').click(
            function ()
            {
                
                $("#org-amount").children().find('select').select2("destroy");
                fieldsNum = $("#add-count").val();
                $("#add-count").val(1+parseInt(fieldsNum));
                $("#org-amount").children().first().clone().appendTo("#org-amount");
                $("#org-amount").children().find('select').select2({theme: "bootstrap"});

                lastGroup = $("#org-amount").children().last();
                lastGroupLast = lastGroup.children().last();
                lastGroupLast.find("input").attr('name', 'amount_available[' + fieldsNum + ']');
                lastGroup.find('select').attr('name', 'org_id[' + fieldsNum + '][]');
                lastGroupLast.find("input").val('');
                lastGroup.find('.balance-batch-minus-btn').show();
                $(".app-footer").html($(".app-footer").html());
                $('.balance-batch-minus-btn').click(
                        function () {
                            $(this).parent().parent().remove()
                        }
                );
                //$('#org-amount').scrollTop($('#org-amount')[0].scrollHeight );
            }
    );
});