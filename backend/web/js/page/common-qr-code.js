$(function () {
    $(document).on('click', '#app_qr_sp', function () {
        layer.open({
            type: 1,
            skin: 'layui-layer-rim',
            title: '内网环境下扫描',
            area: ['260px', '260px'],
            content: '<div style="text-align:center"><img src="/images/app_qr.png" style="width:200px; height:200px"/></div>'
        });
    }
    );
}
);