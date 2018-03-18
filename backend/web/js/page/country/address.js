Vue.component('select2', {
    props: ['options', 'value'],
    template: '#select2-template',
    mounted: function () {
        $(this.$el).select2({theme:'bootstrap'})
    },
    watch: {
        value: function (value) {
            // update value
            $(this.$el).val(value)
        },
        options: function (options) {
            // update options
            var vm = this
            $(this.$el).empty().select2({ data: options, theme:'bootstrap', placeholder : '请选择'})
                .val(this.value)
                .trigger('change')
                .on('change', function () {
                    vm.$emit('input', this.value)
                })
        }
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy')
    }
})

var vm = new Vue({
    el: '#vue_address',
    data: {
        model: {},
        option : {},
        optionProvince : [],
        optionCity : [],
        optionDistrict : [],
        optionStreet : [],
        areaCode : '',
        csrfToken : '',

    },
    mounted: function() {
        var vm = this;
        vm.option.provinceName = option.provinceName;
        vm.option.cityName = option.cityName;
        vm.option.DistrictName = option.DistrictName;
        vm.option.streetName = option.streetName;
        this.$nextTick(function() {
            vm.initData();
            vm.initOptionProvince();
        })
    },
    watch : {
        'model.province' : function(curVal, oldVal){
            if(curVal > 0)
            {
                this.initOptionCity(curVal);
            }
        },
        'model.city' : function(curVal, oldVal){
            if(curVal > 0)
            {
                this.initOptionDistrict(curVal);
            }
        },
        'model.district' : function(curVal, oldVal){
            if(curVal > 0)
            {
                this.initOptionStreet(curVal);
            }
        },
    },
    methods: {
        initData: function() {
            this.model = initData;
            this.areaCode = areaCode;
            this.optionCity = [];
            this.optionDistrict = [];
            this.optionStreet = [];
        },
        initOptionProvince: function(){
            var _this = this;
            axios.get('/address/get-child-region',{
                params: {
                    id:countryCode,
                    areaCode : this.areaCode,
                }}).then(function(res){
                    if(res.data.code != 200)
                    {
                        Utils.Toastr.Info(res.data.msg);
                    }
                    else {
                        _this.optionProvince = [];
                        _this.optionProvince.push({
                            id : -1,
                            text :'请选择',
                        });
                        for(var id in res.data.data)
                        {
                            _this.optionProvince.push({
                                id:id,
                                text:res.data.data[id],
                            });
                        }
                    }
                }).catch(function(err){
                    Utils.Toastr.Error(err);
                });
        },
        initOptionCity : function(provinceId){
            var _this = this;
            axios.get('/address/get-child-region',{
                params: {
                    id: provinceId,
                    areaCode : this.areaCode,
                }}
            ).then(function(res){
                if(res.data.code != 200)
                {
                    Utils.Toastr.Info(res.data.msg);
                }
                else
                {
                    _this.optionCity = [];
                    _this.optionCity.push({
                        id : -1,
                        text :'请选择',
                    });
                    for(var id in res.data.data)
                    {
                        _this.optionCity.push({
                            id : id,
                            text : res.data.data[id],
                        });
                    }
                }
            }).catch(function(err){
                Utils.Toastr.Error(err);
            });
        },
        initOptionDistrict : function(cityId){
            var _this = this;
            axios.get('/address/get-child-region',{
                params: {
                    id: cityId,
                    areaCode : this.areaCode,
                }}
            ).then(function(res){
                if(res.data.code != 200)
                {
                    Utils.Toastr.Info(res.data.msg);
                }
                else
                {
                    _this.optionDistrict = [];
                    _this.optionDistrict.push({
                        id : -1,
                        text :'请选择',
                    });
                    for(var id in res.data.data)
                    {
                        _this.optionDistrict.push({
                            id : id,
                            text : res.data.data[id],
                        });
                    }
                }
            }).catch(function(err){
                Utils.Toastr.Error(err);
            });
        },
        initOptionStreet :function(districtId){
            var _this = this;
            axios.get('/address/get-child-region',{
                params: {
                    id: districtId,
                    areaCode : this.areaCode,
                }}
            ).then(function(res){
                if(res.data.code != 200)
                {
                    Utils.Toastr.Info(res.data.msg);
                }
                else
                {
                    _this.optionStreet = [];
                    _this.optionStreet.push({
                        id : -1,
                        text :'请选择',
                    });
                    for(var id in res.data.data)
                    {
                        _this.optionStreet.push({
                            id : id,
                            text : res.data.data[id],
                        });
                    }
                }
            }).catch(function(err){
                Utils.Toastr.Error(res.msg);
            });
        }
    }
});
