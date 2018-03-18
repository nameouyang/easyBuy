var vm = new Vue({
    el:'#price-tag',
    data: {
        isShow: false,
        isView: false,
        model: {}, 
        sellingPoint: '',
        pointInput: '',
        pointValue: [0],
    },
    mounted: function() {
        var _this = this;
        this.$nextTick(function(){
            _this.initData();
            if (model.action == 'view') {
                this.addPoint = null;
                this.delPoint = null;
                this.submit = null;
                this.isView = true;
            }
        });
    },
    methods: {
        initData: function() {
            this.model = model;          
            this.formatPoint();
        },
        addPoint: function() {
            pointList = this.model.selling_point;
            if (pointList == null || pointList.constructor != Array) {
                pointList = []; 
            }
            var x; 
            var maxIndex = -1;
            for (x in pointList) {
                if (pointList[x].value > maxIndex) {
                    maxIndex = pointList[x].value;
                }
            }
            maxIndex += 1;
            pointList.push({
                value: maxIndex,
                text: this.pointInput,
            });
            this.formatPoint();
        },
        delPoint: function() {
            pointList = this.model.selling_point;
            if (pointList ==null || pointList.constructor != Array) {
                pointList = []; 
            }
            this.pointValue.sort();
            for (x in pointList) {
                if (this.pointValue.includes(pointList[x].value)) {
                   pointList.splice(x, this.pointValue.length);
                   break;
                }
            }
            this.formatPoint();
        },
        upPoint: function() {
            pointList = this.model.selling_point;
            if (pointList ==null || pointList.constructor != Array) {
                pointList = []; 
            }
            this.pointValue.sort();
            for (x in pointList) {
                if (this.pointValue.includes(pointList[x].value)) {
                   if (x == 0) {
                       return;
                   }
                   tempArr = pointList.splice(x, this.pointValue.length);
                   for (var i = tempArr.length - 1; i >= 0; i--) {
                       pointList.splice(x - 1, 0, tempArr[i]);
                   }
                   break;
                }
            }
            this.formatPoint();
        },
        downPoint: function() {
            pointList = this.model.selling_point;
            if (pointList ==null || pointList.constructor != Array) {
                pointList = []; 
            }
            this.pointValue.sort().reverse();
            if (this.pointValue.includes(pointList[pointList.length - 1].value)) {
                return;
            }
            for (x in pointList) {
                if (this.pointValue.includes(pointList[x].value)) {
                   tempArr = pointList.splice(x, this.pointValue.length);
                   for (var i = tempArr.length - 1; i >= 0; i--) {
                       pointList.splice(x + 1, 0, tempArr[i]);
                   }
                   break;
                }
            }
            this.formatPoint();
        },
        formatPoint: function () {
            this.sellingPoint =  JSON.stringify(this.model.selling_point); 
        },
        submit: function() {
            axios.post(window.location.href, $('#price-tag-form').serialize())
                .then(function (res) {
                    data = res.data;
                    if (data.code == 200) {
                        Utils.Toastr.Success(data.code, data.msg);
                        history.back(-1);
                    } else {
                        Utils.Toastr.Error(data.code, data.msg);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});
