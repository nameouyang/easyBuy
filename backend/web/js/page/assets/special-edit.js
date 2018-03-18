var app = new Vue({
    el : "#app",
    data : {
        materialInfo : materialInfo,
        specialReadonly : true,
        csrfToken : csrfToken,
    },
    methods:{
        updateSendQuantity :function(quantity, id){
            var url = "save-send-quantity?id="+id;
            var params = new FormData();
            params.append('quantity', quantity);
            params.append('_csrf', this.csrfToken);

            axios.post(url,params).then(function (response) {
                if (response.data.code == 0) {
                    Utils.Toastr.Success(response.data.msg);
                }
                else {
                    Utils.Toastr.Warning(response.data.msg);
                }
            }).catch(function (error) {
                Utils.Toastr.Error(error);
            });
        },

        updateAdvice: function(advice, id){
            var url = "save-advice?id="+id;
            var params = new FormData();
            params.append('advice', advice);
            params.append('_csrf', this.csrfToken);

            axios.post(url, params).then(function(response){
                if (response.data.code == 0) {
                    Utils.Toastr.Success(response.data.msg);
                }
                else {
                    Utils.Toastr.Warning(response.data.msg);
                }
            }).catch(function (error) {
                Utils.Toastr.Error(error);
            });
        },

        setEdit : function(){
            this.specialReadonly = false;
        },

        updateSupplier : function(supplier, id) {
            var url = "save-waybill?id=" + id;

            var params = new FormData();
            params.append('warehouseId', supplier);
            params.append('_csrf', this.csrfToken);

            axios.post(url, params).then(function (response) {
                console.log(response.data.code);
                if (response.data.code == 0) {
                    Utils.Toastr.Success(response.data.msg);
                }
                else {
                    Utils.Toastr.Warning(response.data.msg);
                }
            }).catch(function (error) {
                Utils.Toastr.Error(error);
            });
        }
    }
});