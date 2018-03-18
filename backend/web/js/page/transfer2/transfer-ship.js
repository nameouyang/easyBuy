$(function () {
    $(document).on('mouseover', '#td-exp', function(){
        $('#div-exp-more').show();
    });
    $(document).on('mouseout', '#td-exp', function(){
        $('#div-exp-more').hide();
    });
    $(document).on('click', '#transfer-ship', function () {
        var dataId = $(this).attr('data-id');
        layer.confirm('确认发货?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            postAuditResult(dataId, 1, '');
            layer.close(index);
        }, function () {
        });
    });

    $(document).on('click', '#transfer-cancel', function () {
        var dataId = $(this).attr('data-id');
        layer.confirm('确认取消?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            alert('取消');
        }, function () {
        });
    });

    $(document).on('click', '#transfer-print-detail', function () {
        var dataId = $(this).attr('data-id');
        window.location.href = '/transfer2/transfer/print-detail?id='+dataId;
    });
    $(document).on('click', '#transfer-print-sn', function () {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var dataId = $(this).attr('data-id');
        $.post("/transfer2/transfer/print-sn?id=" + dataId + '',
            {
                'orgReceiptName' : 1
            }, function (rs) {
                if (rs.code == 0) {
                    layer.close(layerIndex);
                    window.location.href = '/transfer2/transfer/print-sn?id='+dataId;
                } else {
                    layer.close(layerIndex);
                    Utils.Toastr.Error('失败', rs.msg);

                }
            }, "json");

    });

    $(document).on('change', '#company-list', function () {

        if($('#company-list').val() == '1'){
            $('#express_no').hide();
            $('#express-detail').show();
            $('#p31').val('顺丰');
            $("#p31").attr('readonly', true);
        }
        else{
            $('#express_no').show();
            $('#express-detail').hide();

        }
    });
    function postAuditResult(transferId, status, reason) {
        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        var type = $('#transfer_type').text();
        var company = $('#company-list').val();
        var expressType = '';
        var orgReceiptName = $('#org-name').text();
        var fromAddress = '';
        var toAddress = '';
        var expressNum = '';
        var isDemand = $("input:radio[name='isdemand']:checked").val();
        isDemand = isDemand ? isDemand : '2';
        var quantity = $('#p32').val();
        if($('#company-list').val() == 1){//顺丰
            expressType = 'sf';
            fromAddress = {
                'province' : 0,
                'city' : 0,
                'district' : 0,
                'address' : $('#p13').val(),
                'manager' : $('#p11').val(),
                'tel' : $('#p12').val()
            };

            toAddress = {
                'province' : 0,
                'city' : 0,
                'district' : 0,
                'address' : $('#p23').val(),
                'manager' : $('#p21').val(),
                'tel' : $('#p22').val()
            };
            if((isDemand != '1' && isDemand != '2' && type != '31' ) || $('#p11').val() == '' || $('#p12').val() == '' || $('#p13').val() == ''
                || $('#p21').val() == '' || $('#p22').val() == '' || $('#p23').val() == ''
                || $('#p31').val() == '' || $('#p32').val() == ''){
                layer.close(layerIndex);
                Utils.Toastr.Error('失败', '快递信息填写不完整');
                return;
            }
        }
        else if($('#company-list').val() == 2){
            expressType = 'ems';
            expressNum = $('#express_num').val();
            if(expressNum == ''){
                layer.close(layerIndex);
                Utils.Toastr.Error('失败', '快递信息填写不完整');
                return;
            }
        }
        else {
            expressType = '';
        }
        var shipUrl = '/transfer2/transfer/ship?';
        //耗材
        if (type == '31'){
            shipUrl = '/transfer2/transfer-material/ship?';
        }
        $.post(shipUrl + 'id=' + transferId + '',
            {
                'orgReceiptName' : orgReceiptName,
                'expressType': expressType,
                'expressNum' : expressNum,
                'fromAddress' : fromAddress,
                'toAddress' : toAddress,
                'status': status,
                'reason': reason,
                'type' : type,
                'isDemand' : isDemand,
                'quantity' : quantity
            }, function (rs) {
            if (rs.code == 0 || rs.code == 200) {
                layer.close(layerIndex);
                Utils.Toastr.Success('发货成功', rs.msg);
                window.location.href = '/transfer2/transfer/index';
            } else {
                layer.close(layerIndex);
                Utils.Toastr.Error('发货失败', rs.msg);

            }
        }, "json");
    }

});
