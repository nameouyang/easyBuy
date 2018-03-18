$(function($) {

    $(document).on('ready pjax:success', function() {
        $('.ajaxDelete').on('click', function(e) {
            if (confirm('是否要删除11这个项目？')) {
                $.ajax({
                    url: $(this).attr('href'),
                    type: 'post',
                    // error: function(xhr, status, error) {
                    //     alert('There was an error with your request.' + xhr.responseText);
                    // }
                }).done(function(data) {
                    // $.pjax.reload({
                    //     container: '#pjax-list'
                    // });
                    // $.pjax.reload({container:'#gridview-pjax'});
                    if(data.success){
                        // $.pjax.reload({container:'#gridview-pjax'});
                        window.location.reload();
                    }else{
                        if(data.msg){
                            Utils.Toastr.Error('错误', data.msg);
                        }

                    }
                });
            }
            return false;
        });
    });

    $(document).on('ready pjax:success', function() {
        $('.ajaxEnd').on('click', function(e) {
            if (confirm('是否要结束这个项目？')) {
                $.ajax({
                    url: $(this).attr('href'),
                    type: 'post',
                    // error: function(xhr, status, error) {
                    //     alert('There was an error with your request.' + xhr.responseText);
                    // }
                }).done(function(data) {
                    // $.pjax.reload({
                    //     container: '#pjax-list'
                    // });
                    // $.pjax.reload({container:'#gridview-pjax'});
                    if(data.success){
                        // $.pjax.reload({container:'#gridview-pjax'});
                        window.location.reload();
                    }else{
                        if(data.msg){
                            Utils.Toastr.Error('错误', data.msg);
                        }

                    }
                });
            }
            return false;
        });
    });

    $(function () {
        $(document).on('submit','#edit-form',function(){
            var form = $(this);
            if (form.find('.has-error').length) {
                return false;
            }
            $.ajax({
                url: form.attr('action'),
                type: 'post',
                data: form.serialize(),
                success: function(response) {
                    //console.log($.pjax);
                    if(response.success){
                        //$.pjax.reload('#gridview-pjax');
                        //$('#m-a-a').modal('toggle');
                        window.location.reload();
                    }else{
                        if(response.msg){
                            Utils.Toastr.Error('错误', response.msg);
                        }
                    }
                },
                error: function() {
                    console.log('internal server error');
                }
            });
            return false;
        });

        $("a[data-target='#m-a-a'][data-toggle!='modal']").click(function(ev) {
            ev.preventDefault();
            var target = $(this).attr("href");

            $("#m-a-a .modal-content").load(target, function() {

                 $("#m-a-a").modal("show");
                console.log($('#edit-form').length);
            });
        });

        $('body').on('hidden.bs.modal', '.modal', function () {
            $("#m-a-a .modal-content").children().each(function() {
                $(this).remove();
            });
          // $(this).removeData('bs.modal');
        });
    });
    $(document).on('click','#gridview-pjax tr',function(){
        $('.highlight-tr').removeClass('highlight-tr');
        $(this).children().addClass('highlight-tr');
    });
    if ($(".table").length>0) {
        // $(".table").addClass('water');
        $('.table').freezeHeader({ 'offset': '64px' });
    }

    $(document).on('click', '[data-toggle="modal"]', function(ev){
        ev.preventDefault();
        var url = typeof($(this).data("url")) == 'undefined' ? $(this).attr("href") : $(this).data("url") ;
        $($(this).data("target")+' .modal-content').load(url,function(){
            if ($("select").length>0) {
                $('select').select2({theme:"bootstrap"});
            }            
            //模态窗口选用的自定义方法，相当于call_user_func的作用
                var func = $['initThirdPlugins'];                
                if(typeof(func) !== 'undefined')
                {
                    func.apply('initThirdPlugins', []);
                }
        });
        
    });

    //批量添加库存预留比例商品下拉样式
    if ($("#stockreserve-goods_id").length>0) {
        $('#stockreserve-goods_id').select2({theme:"bootstrap",language:"zh-CN"});
    }

    //批量选择分仓
    if ($("#stockreserve-warehouse_id").length>0) {
        $('#stockreserve-warehouse_id').select2({theme:"bootstrap",language:"zh-CN"});
    }

    //添加用户
    $('#user-org_id').select2({theme:"bootstrap",language:"zh-CN"});

    //分仓编号下拉搜索
    $('.warehouse-search-select').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "按分仓编号搜索"
    });

    //米家库存查询
    $('.mihome-stock-select').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择米家机构"
    });

    //省份选择
    $('.province-select').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择省份"
    });
    $('.province-select-delivery').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择省份"
    });

    //城市选择
    $('.city-select').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择城市"
    });
    $('.city-select-delivery').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择城市"
    });

    //地区选择
    $('.district-select').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择区域"
    });
    $('.district-select-delivery').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择区域"
    });
    //街道选择
    $('.street-select').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择街道"
    });
    $('.street-select-delivery').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择街道"
    });

    //库存一级分类
    $('.topCategory-stock-select').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择一级分类"
    });

    //库存二级分类
    $('.secondCategory-stock-select').select2({
        theme:"bootstrap",
        language:"zh-CN",
        placeholder : "请选择二级分类"
    });

});
