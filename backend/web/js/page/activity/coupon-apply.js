function array_column(arr, key) {
    let b = [];
    for (let i in arr) {
        b.push(arr[i][key]);
    }
    return b;
}

$(function () {
    var skuList= [];
   // $(document).on('blur', '#couponapply-order_id', function (e) {
    $(document).on('click', '#select-order-info', function (e) {

        $('#order-info').empty('');
        $('#coupon-info').empty('');
        $('#goods-info').empty('');
        $('#couponapply-customer_id').attr("value",'');

        //$(this).attr('disabled',true);
        let sku = $('#couponapply-order_id').val();
        if (sku) {
            $.post({
                url: 'select-order',
                data: {sku:sku,view:false},
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 0 && $('#li-'+ret.data.org_id).val() == null) {
                        if (ret.data.customer_id != 0 ) {
                            $('#couponapply-customer_id').attr("value", ret.data.customer_id);
                            $('#couponapply-customer_id').attr("readonly", true);
                        } else {
                            $('#couponapply-customer_id').attr("readonly", false);
                        }
                        $('#form-show').css('display','block');

                        var html='';
                        html += '<tr id="li-' + ret.data.org_id +'">';
                        html += '<td>' + ret.data.org_name + '</td>';
                        html += '<td>' + ret.data.order_id + '</td>';
                        html += '<td>' + ret.data.amount + '</td>';
                        html += '<td>' + ret.data.total_num + '</td>';
                        html += '<td>' + ret.data.data + '</td>';
                        html += '<td>' + ret.data.customer_name + '</td>';
                        html += '<td>' + ret.data.customer_tel + '</td>';
                        html += '</tr>';
                        html += '<input type="hidden" name="order[org_id]" value='+ret.data.org_id +'>';
                        html += '<input type="hidden" name="order[order_id]" value='+ret.data.order_id +'>';
                        html += '<input type="hidden" name="order[org_name]" value='+ret.data.org_name +'>';
                        html += '<input type="hidden" name="order[amount]" value='+ret.data.amount +'>';
                        html += '<input type="hidden" name="order[total_num]" value='+ret.data.total_num +'>';
                        html += '<input type="hidden" name="order[data]" value='+ret.data.data +'>';
                        html += '<input type="hidden" name="order[customer_name]" value='+ret.data.customer_name +'>';
                        html += '<input type="hidden" name="order[customer_tel]" value='+ret.data.customer_tel +'>';
                        $('#order-info').append(html);
//console.log(ret.data.coupon_info)

                        if ( ret.data.order_item != undefined && ret.data.order_item != '' && ret.data.order_item != null) {

                            var selectValue = '';
                           // selectValue += '<td> <select name="coupon-type" class="selectpicker" style="display:none;width:150px;padding:3px 10px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;appearance:none;moz-appearance:none;-webkit-appearance:none;background-color: #eee;background-size:20%;">';
                            if (ret.data.coupon_info != undefined && ret.data.coupon_info != '' && ret.data.coupon_info != null) {
                                for(let index in ret.data.coupon_info) {
                                    selectValue += '<option value=' + index + '>' + ret.data.coupon_info[index] + '</option>';
                                }
                            } else {
                                selectValue += '<option value="0">没有优惠券</option>';
                            }
                           // selectValue += '</select></td>';
//console.log(ret.data.order_item.length)
                            var goodsInfo = '';
                            //for (var k = 0, length = ret.data.order_item.length; k < length; k++) {
                            for(let len in ret.data.order_item) {
                                goodsInfo += '<tr id="li-' + ret.data.order_item[len]['goods_id'] +'">';
                                goodsInfo += '<td style="line-height: 33px;">' + ret.data.order_item[len]['goods_id'] + '</td>';
                                goodsInfo += '<td class="name-11" style="line-height: 33px;" data-toggle="tooltip" title="'+ ret.data.order_item[len]['goods_name'] +'">' + ret.data.order_item[len]['goods_name'] + '</td>';
                                goodsInfo += '<td class="name-3" style="line-height: 33px;">' + ret.data.order_item[len]['goods_count'] + '</td>';
                                goodsInfo += '<td style="line-height: 33px;">' + ret.data.order_item[len]['origin_price'] + '</td>';
                                goodsInfo += '<td style="line-height: 33px;">' + ret.data.order_item[len]['now_price'] + '</td>';
                                goodsInfo += '<td style="line-height: 33px;">' + ret.data.order_item[len]['price'] + '</td>';
                                goodsInfo += '<td style="line-height: 33px;">' + (parseFloat(ret.data.order_item[len]['price']) - parseFloat(ret.data.order_item[len]['now_price'])).toFixed(2)  + '</td>';
                                goodsInfo += '<td style="line-height: 33px;">'
                                goodsInfo += '<input type="radio" data-sku=' + ret.data.order_item[len]['goods_id'] + ' class="rule_close" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][is_limit]"  value="0" checked>否';
                                goodsInfo += '<input type="radio" class="rule_open" data-sku=' + ret.data.order_item[len]['goods_id'] + ' name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][is_limit]" value="1">是';
                                goodsInfo += '</td>';
                                goodsInfo += '<td> <label class="sr-only" for="'+ret.data.order_item[len]['goods_id']+'">优惠券</label> <select id="'+ret.data.order_item[len]['goods_id']+'" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][coupon_id]"' + ' class="selectpicker form-control" data-toggle="select" disabled= "true" style="width:150px;border-radius: 5px;">';
                                //goodsInfo += '<td> <label class="sr-only" for="'+ret.data.order_item[len]['goods_id']+'">国家</label> <select id="'+ret.data.order_item[len]['goods_id']+'" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][coupon_id]"' + ' class="selectpicker form-control" data-toggle="select" disabled= "true" style="width:150px;border-radius: 5px;appearance:none;moz-appearance:none;-webkit-appearance:none;background-color: #eee;background-size:20%;">';
                                goodsInfo += selectValue;
                                goodsInfo += '</select></td>';
                                goodsInfo += '</tr>';
                                goodsInfo += '<input type="hidden" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][goods_id]"' +' value='+ret.data.order_item[len]['goods_id'] +'>';
                                goodsInfo += '<input type="hidden" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][goods_name]"' +' value='+ret.data.order_item[len]['goods_name'] +'>';
                                goodsInfo += '<input type="hidden" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][goods_count]"' +' value='+ret.data.order_item[len]['goods_count'] +'>';
                                goodsInfo += '<input type="hidden" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][origin_price]"' +' value='+ret.data.order_item[len]['origin_price'] +'>';
                                goodsInfo += '<input type="hidden" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][now_price]"' +' value='+ret.data.order_item[len]['now_price'] +'>';
                                goodsInfo += '<input type="hidden" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][price]"' +' value='+ret.data.order_item[len]['price'] +'>';
                                goodsInfo += '<input type="hidden" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][diff_price]"' +' value='+(parseFloat(ret.data.order_item[len]['price']) - parseFloat(ret.data.order_item[len]['now_price'])).toFixed(2) +'>';
                            }
                            $('#goods-info').append(goodsInfo);

                            if (ret.data.order_item[0]['coupon_id']!=0 && ret.data.order_item[0]['coupon_name']!='') {
                                var couponInfo = '';
                                couponInfo += '<tr id="li-' + ret.data.order_item[0]['coupon_id'] +'">';
                                couponInfo += '<td>' + ret.data.order_item[0]['coupon_id'] + '</td>';
                                couponInfo += '<td>' + ret.data.order_item[0]['coupon_name'] + '</td>';
                                couponInfo += '<td>' + ret.data.order_item[0]['created_by'] + '</td>';
                                couponInfo += '<td>' + ret.data.order_item[0]['use_time'] + '</td>';
                                couponInfo += '</tr>';
                                couponInfo += '<input type="hidden" name="CouponApply[coupon_id]" value='+ret.data.order_item[0]['coupon_id'] +'>';
                                couponInfo += '<input type="hidden" name="CouponApply[coupon_name]" value='+ret.data.order_item[0]['coupon_name'] +'>';
                                couponInfo += '<input type="hidden" name="CouponApply[created_by]" value='+ret.data.order_item[0]['created_by'] +'>';
                                couponInfo += '<input type="hidden" name="CouponApply[use_time]" value='+ret.data.order_item[0]['use_time'] +'>';
                                $('#coupon-info').append(couponInfo);
                            }
                        }
                    } if (ret.code === 0 && $('#li-'+ret.data.org_id).val() != null) {
                        Utils.Toastr.Success('订单信息查询成功', ret.msg);
                    }else {
                        Utils.Toastr.Error('查询失败', ret.msg);
                        $('#form-show').css('display','none');
                        $('#couponapply-customer_id').attr("readonly", false);
                    }
                    $('#reduce-goods').attr('disabled',false);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误:' + textStatus);
                    $('#reduce-goods').attr('disabled',false);
                }
            });
        } else {
            $('#form-show').css('display','none');
            $('#couponapply-customer_id').attr("readonly", false);
        }
    });

    $(document).on('click', ".rule_open", function (e) {
        let sku = $(this).data('sku');
        //$(this).parents('#li-' + sku).next(['tr.rule_table']).show();
        //$('#li-' + sku + ' td:eq(8)').children().css('display','block');
        $('#li-' + sku + ' td:eq(8)').children().attr("disabled",false);

    });

    $(document).on('click', ".rule_close", function (e) {
        let sku = $(this).data('sku');
        //alert($('#li-' + sku + ' td:eq(7)'));
        //$(this).parents('#li-' + sku).next(['tr.rule_table']).hide();
        //$('#li-' + sku + ' td:eq(8)').children().css('display','none');
        $('#li-' + sku + ' td:eq(8)').children().attr("disabled",true);
    });

    $(document).on('click', '#apply-btn', function (e) {
        layer.confirm('每个订单号仅可申请一次，请确认信息无误！', {
                btn: ['确定', '取消'], },function() {
            //e.preventDefault();
            $this = $(this);
            $.post("create", $('#common-create-form').serialize(),
                function (data) {
                    if (data.code == 0) {
                        Utils.Toastr.Success('成功', data.msg);
                        window.location.href = 'index';
                    } else {
                        $this.removeAttr('disabled');
                        Utils.Toastr.Error('失败', data.msg);
                    }
                },
                "json");
            layer.closeAll();
            }, function() {
        });
    });

    /*var FirstUpload = {
        data() {
            return {
                defaultList: defaultList,
                imgUrl: '',
                visible: false,
                noImg: true,
                isImg: false,
                backupList: [],
                hide: false,
                uploadList: [],
                submitUrls: []
            }
        },
        methods: {
            handleView(url) {
                this.imgUrl = url;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess(res, file, fileList) {
                if (String(res.code) === '200') {
                    file.url = '//i6.mifile.cn' + res.data;
                } else {
                    this.$Notice.warning({
                        title: '服务端错误',
                        desc: res.msg
                    });
                    if (this.backupList.length > 0)
                        this.uploadList.push(this.backupList.pop());
                }
                this.submitUrls = [];
                for (let i in fileList) {
                    let f = fileList[i];
                    this.submitUrls.push(f.url)
                }

            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式正确',
                    desc: '无法上传，请选择jpg或者png.'
                });
                if (this.backupList.length > 0)
                    this.uploadList.push(this.backupList.pop());
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出最大上传限制',
                    desc: '文件' + file.name + '体积太大, 请上传小于4M的文件.'
                });
                if (this.backupList.length > 0)
                    this.uploadList.push(this.backupList.pop());
            },
            handleBeforeUpload(file) { //多张
                this.backupList = [];
                console.log(this.uploadList);
                if (this.uploadList.length >= 1) {
                    this.backupList.push(this.uploadList.shift())
                }
            },
            handleError(file) {
                this.$Notice.warning({
                    title: '上传出错',
                    desc: '请刷新页面再尝试'
                });
                if (this.backupList.length > 0)
                    this.uploadList.push(this.backupList.pop());
            }
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
            this.$Notice.config({
                top: 100,
                duration: 3
            });
            var vueObj = this;
        }
    };
    var Component1 = Vue.extend(FirstUpload);
    new Component1().$mount('#firstUpload');*/



    var screen = '';
    var defaultList = [];
    if (screen && screen.banner_img_urls) {
        let bannerImgUrls = JSON.parse(screen.banner_img_urls);
        for (let i in bannerImgUrls) {
            defaultList.push({
                'name': bannerImgUrls[i],
                'url': bannerImgUrls[i]
            });
        }
    }
    var SecondUpload = {
        data() {
            return {
                defaultList: defaultList,
                imgUrl: '',
                visible: false,
                noImg: true,
                isImg: false,
                hide: false,
                uploadList: []
            }
        },
        methods: {
            handleView(url) {
                this.imgUrl = url;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess(res, file, fileList) {
                console.log(this.uploadList);
                if (String(res.code) === '200') {
                    file.url = '//i6.mifile.cn' + res.data;
                } else {
                    this.$Notice.warning({
                        title: '服务端错误',
                        desc: res.msg
                    });
                }
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式正确',
                    desc: '无法上传，请选择jpg或者png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出最大上传限制',
                    desc: '文件' + file.name + '体积太大, 请上传小于4M的文件.'
                });
            },
            handleBeforeUpload(file) {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多上传5张图片'
                    });
                }
                return check;
            },
            handleError(file) {
                this.$Notice.warning({
                    title: '上传出错',
                    desc: '请刷新页面再尝试'
                });
            },
            handleUp(index) {
                if (index >= 1) {
                    let upObj = this.uploadList.splice(index, 1);
                    this.uploadList.splice(index - 1, 0, upObj.pop());
                }
            },
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
            this.$Notice.config({
                top: 100,
                duration: 3
            });
            var me = this;
        }
    };
    var Component2 = Vue.extend(SecondUpload);
    new Component2().$mount('#secondUpload');
    /*$(document).on('click', '#apply-btn', function (e) {
        e.preventDefault();
        $this = $(this);
        //$this.attr('disabled', 'disabled');
        $.post("create", $('#common-create-form').serialize(),
            function (data) {
                if (data.code == 0) {
                    Utils.Toastr.Success('成功', data.msg);
                    window.location.href = 'index';
                } else {
                    $this.removeAttr('disabled');
                    Utils.Toastr.Error('失败', data.msg);
                }
            },
            "json");
    });*/
});
