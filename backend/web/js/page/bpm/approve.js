Vue.component('modal', {
    template: '#modal-template',
    mounted: function() {
    }
})

Vue.component('select2', {
    props: ['options', 'value', 'placeholder'],
    template: '#select2-template',
    mounted: function () {
        var vm = this;
        $(this.$el)
            .select2({ data: this.options, theme:'bootstrap', placeholder: vm.placeholder})
            .val(this.value)
            .trigger('change')
            .on('change', function () {
                vm.$emit('input', this.value)
            })
    },
  watch: {
    value: function (value) {
        $(this.$el).val(value).trigger('change');
        vm.changeTemplate(value);
    },
    options: function (options) {
      // update options
        $(this.$el).empty().select2({ data: options, theme:'bootstrap'})
    },
  },
  destroyed: function () {
      $(this.$el).off().select2('destroy')
  }
})

var vm = new Vue({
    el: '#approve-app',
    data: {
        modalSeen: false,
        showTemplate: false,
        modelTitle : '',
        createModel : {},
        viewModel : {},
        businessViewModel: {},
        approveModel: {},
        logModel: {},
        actionName : '',
        actionId : 0,
        template: {},
        templateId: 0,
        csrfToken: '',
        comment  : '',
    },
    mounted: function() {
        var vm = this;
        this.$nextTick(function() {
            vm.initData();
        })
    },
    methods: {
        initData: function() {
            this.createModel = initData.create;
            this.viewModel = initData.view;
            this.businessViewModel = initData.businessView;
            this.approveModel = initData.approve;
            this.logModel = initData.log;
            this.csrfToken  = initData.csrfToken;
            this.modalSeen  = true;
        },
        changeAction: function (name, id = 0) {
            if (!this.modalSeen) {
                return ;
            }
            this.actionName = name;
            if (id != 0) {
                this.actionId = id;
            }
            if (this[name] != 'undefined') {
                this[name]();
                this.showModal();
            }
        },
        changeTemplate: function(templateId) {
            var vm = this;
            axios.get('/bpm/approve/template',{
                params: { 
                    id: templateId
                }
            }).then(function (res) {
                res = res.data;
                if (res.code != 200) {
                    Utils.Toastr.Info('Error', res.msg);
                    return -1;
                }
                vm.template = res.data;
                vm.showTemplate = true; 
            }).catch(function (error) {
                console.log(error);
            });
        },
        create: function() {
            this.modelTitle = this.createModel.title;
        }, 
        view: function () {
            this.modelTitle = '查看 - 编号:' + this.actionId;
        },
        businessView: function() {
            this.modelTitle =  '查看业务数据 - 编号:' + this.actionId;
        },
        approve: function() {
            this.modelTitle =  '审批 - 编号:' + this.actionId;
        },
        log: function() {
            this.modelTitle =  '日志 - 编号:' + this.actionId;
        },
        submit: function () {
            var vm = this;
            axios.post('/bpm/approve/create',$(this.$refs.form).serialize())
                .then(function (res) {
                    res = res.data;
                    if (res.code != 200) {
                        Utils.Toastr.Info('Error', res.msg);
                        return -1;
                    }
                    Utils.Toastr.Success('success', res.msg);
                    $.pjax.reload({container: "#gridview-pjax"});
                    $("#m-a-a-a").modal('hide');
                }).catch(function (error) {
                    console.log(error);
                });
        },
        approveSubmit: function (id, action) {
            var vm = this;
            var params = new FormData();
            params.append('id', id);
            params.append('action', action);
            params.append('comment', this.comment);
            params.append('_csrf', this.csrfToken);
            axios.post('/bpm/approve/approve', params)
                .then(function (res) {
                    res = res.data;
                    if (res.code != 200) {
                        Utils.Toastr.Info('Error', res.msg);
                        return -1;
                    }
                    Utils.Toastr.Success('success', res.msg);
                    $.pjax.reload({container: "#gridview-pjax"});
                    $("#m-a-a-a").modal('hide');
                }).catch(function (error) {
                    console.log(error);
                });
        },
        showModal: function() {
            $('#m-a-a-a').modal('show');
        },
        showModal: function() {
            $('#m-a-a-a').modal('show');
        },
    },
});
