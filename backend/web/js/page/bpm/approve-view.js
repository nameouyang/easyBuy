var em = new Vue({
    el: '#approve-app',
    data: {
        approveModel: {},
        actionId: '',
        csrfToken: '',
        comment  : '',
        content  : '',
    },
    mounted: function() {
        var vm = this;
        this.$nextTick(function() {
            vm.initData();
        })
    },
    methods: {
        initData: function() {
            this.actionId = initData.id;
            this.csrfToken  = initData.csrfToken;
            this.content    = initData.content;
            this.content    = $(this.content).find('.box-content').html();
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
                    history.back(-1);
                }).catch(function (error) {
                    console.log(error);
                });
        },
    },
});
