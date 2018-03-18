Array.prototype.insert = function (index, item) {  
    this.splice(index, 0, item);  
};
Array.prototype.remove = function (index) {  
    this.splice(index, 1);
};
Array.prototype.swap = function (x,y) {
    var tmp = this[x];
    this.remove(x);
    this.insert(y, tmp);
}
String.prototype.ucfirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

_app = new Vue({
    el: '#price-main',
    data: function(){
        return {
            skus: [],
            prices: [],
            accurate: 0,
        };
    },
    methods: {
        submit: function(){
            var prices = this.prices;
            var validate = true;
            for (var i in this.prices) {
                if (parseFloat(this.prices[i].price) == parseFloat(this.prices[i].newPrice) && parseInt(this.prices[i].autosyncType) == parseInt(this.prices[i].oldType)) {
                    Utils.Toastr.Error('Warning', 'No change has been made for sku #' + this.prices[i].sku);
                    validate = false;
                }

                if (parseFloat(this.prices[i].newPrice) < 0.01) {
                    Utils.Toastr.Error('Warning', 'Price for sku #' + this.prices[i].sku + ' should be larger than 0.01');
                    validate = false;
                }
            }
            if (!validate) {
                return false;
            }
            $.ajax({
                cache: true,
                type: "POST",
                url: '/pms/price-change-record/create',
                data: {
                    valid_time_from: this.accurate == 1 ? $("#valid_time_from_second").val() : $("#valid_time_from_day").val(),
                    prices: this.prices
                },
                error: function (request) {
                    Utils.Toastr.Error('Warning', 'Network Issue!');
                },
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        window.location.href = '/pms/price-change-record/index?type=1';
                    } else {
                        Utils.Toastr.Error('Notice', data.msg);
                    }
                }
            });
        }
    }
});

$(document).on('click', '.update-price', function(event){
    var data = $(this).data();
    if (_app.skus.indexOf(data.sku) == -1) {
        var index = _app.skus.length;
        _app.skus.insert(index, data.sku);
        _app.prices.insert(index, data);
        if (data.autosyncType == 3) {
            setTimeout(function(){$(".price-input").focus();}, 100);
        } else {
            setTimeout(function(){$(".price-select").focus();}, 100);
        }
        
    }
})