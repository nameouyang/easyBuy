var vm = new Vue({
    el: '#app',
    data: {
        model: false,
    },
    mounted: function() {
        var vm = this;
        this.$nextTick(function() {
            vm.initData();
        })
    },
    methods: {
        initData: function() {
            this.model = initData
        },
        pushFailQuotas: function(id) {
            var vm = this;
            axios.get('/activity/activity-presale/push-fail-quotas?id='+id, ''
            ).then(function (res) {
                res = res.data;
                if (res.code != 200) {
                    Utils.Toastr.Info('Error', res.msg);
                 } else {
                     Utils.Toastr.Success('Success', '修改成功');
                     vm.model.failCount = 0;
                     window.location.reload();
                 }
            }).catch(function (error) {
            });
        },
        updateQuotas: function(id) {
            var vm = this;
            axios.post('/activity/activity-presale/update-quotas?id=' + id, 
                $('#presale-quotas-form').serialize(),
            ).then(function (res) {
                res = res.data;
                if (res.code != 200) {
                    Utils.Toastr.Info('Error', res.msg);
                    return -1;
                }
                Utils.Toastr.Success('Success', '修改成功');
                window.location.reload();
            }).catch(function (error) {
            });
        }
    }
});

$(function ($) {
    $('body').on('hidden.bs.modal', '.modal', function () {
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });
    $.extend({
        initThirdPlugins: function () {
            if ($('#file_data').length > 0) {
                var id = $('#activity_id').val();
                $("#file_data").fileinput({language: 'zh', showUpload: false, showRemove: false, allowedFileExtensions: ['xlsx'], theme: 'fa', showPreview: false, uploadUrl: '/activity/activity-presale/quotas-import?id=' + id});
                $('#file_data').on('fileuploaded', function (event, data, previewId, index) {
                    var response = data.response;
                    if (response.code == 200) {
                        $("#m-a-a-a").modal('hide');
                        window.location.reload();
                    } else {
                        Utils.Toastr.Info('Error', response.msg);
                    }
                });
                $('#file_data').on('change', function (event) {
                    $('#file_data').fileinput("upload");
                });
            }
            if ($('.date').length > 0) {
                $('.date').datetimepicker({
                    viewMode: 'years',
                    format: 'YYYY-MM',
                    locale: 'zh-cn'
                });
            }
        }});
});
