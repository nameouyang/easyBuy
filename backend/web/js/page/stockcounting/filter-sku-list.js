
$(function () {

    var  status=false;
    $(document).on('click', '.choose', function () {
        if(!status){
            $("#choose").select2({
                placeholder:'请选择商品',
                maximumSelectionLength: 10,
                theme: "bootstrap",
                tags: false,
                class:"form-control",
                allowClear: true, //是否允许清空选中
                ajax: {
                    url: '/mistock/in-out-stock/search-goods-by-ajax',
                    type:'GET',
                    dataType: 'json',
                    processResults: function (data) {
                        //console.log(data);
                        return {
                            results: data
                        };
                    }
                },
                templateSelection: function (repo) {  //选中某一个选项是执行
                    $(".choose").attr('data-to-sku',repo.id);
                    return repo.text;
                }

            })
            status=true;
        }
    })



    $(document).on('click', '#goods-create', function () {

        var macno=$("#choose").val();
        if(macno==null){
            Utils.Toastr.Info('商品未选中', '请选择商品');
            return;
        }


        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.post("/stockcounting/task/add-filter-sku",
            {
                "macno":macno
            },
            function (data) {
                layer.close(layerIndex);
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);

                    window.location.href = '/stockcounting/task/filter-sku-list';

                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }

            },
            "json");
    })


    $(document).on('click', '.delete-sku', function () {

        var macno=$(this).attr("data-id");
        console.log(macno);


        var layerIndex = layer.load(0, {
            shade: [0.2, '#000']
        });
        $.post("/stockcounting/task/delete-filter-sku",
            {
                "macno":macno
            },
            function (data) {
                layer.close(layerIndex);
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);

                    window.location.href = '/stockcounting/task/filter-sku-list';

                } else {
                    Utils.Toastr.Error('失败', data.msg);
                }

            },
            "json");

    })



    $(document).on('click', '.close-windows,.close', function () {
        status=false;
    })






});
