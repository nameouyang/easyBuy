
$(function () {



    $("#choose-goods").select2({
        placeholder:'请选择商品',
        maximumSelectionLength: 10,
        theme: "bootstrap",
        tags: false,
        class:"form-control",
        allowClear: true, //是否允许清空选中
        ajax: {
            url: '/mistock/inv-storage/search-goods-by-ajax',
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
            //$(".choose").attr('data-to-sku',repo.id);
            return repo.text;
        }

    })








});
