
function array_column(arr, key) {
    let b = [];
    for (let i in arr) {
        b.push(arr[i][key]);
    }
    return b;
}
$(function(){
    var skuList= [];

    $('#order-info').empty('');
    $('#coupon-info').empty('');
    $('#goods-info').empty('');
    $('#couponapply-customer_id').attr("value",'');;

    $('#couponapply-order_id').attr("disabled", 'disabled');
    $('#couponapply-reason').attr("disabled", 'disabled');
    $('.ivu-upload-input').attr("disabled", 'disabled');

    $('#form-show').css('display','block');
    $('#select-order-info').css('display','none');
    $('#coupon-apply-view').addClass('col-md-3');

    $(this).attr('disabled',true);
    let sku = $('#couponapply-order_id').val();
    if (sku) {
        $.post({
            url: 'select-order',
            data: {sku:sku,view:true},
            dataType: 'json',
            success: function (ret) {
                if (ret.code === 0 && $('#li-'+ret.data.org_id).val() == null) {
                    if (ret.data.coupon_info.customer_id != 0 ) {
                        $('#couponapply-customer_id').attr("value", ret.data.coupon_info.customer_id);
                        $('#couponapply-customer_id').attr("disabled", 'disabled');
                    }
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
                    $('#order-info').append(html);

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

                        var goodsInfo = '';
                        for(let len in ret.data.order_item) {
                            goodsInfo += '<tr id="li-' + ret.data.order_item[len]['goods_id'] +'">';
                            goodsInfo += '<td>' + ret.data.order_item[len]['goods_id'] + '</td>';
                            goodsInfo += '<td class="name-13" data-toggle="tooltip" title="'+ ret.data.order_item[len]['goods_name'] +'">' + ret.data.order_item[len]['goods_name'] + '</td>';
                            goodsInfo += '<td>' + ret.data.order_item[len]['goods_count'] + '</td>';
                            goodsInfo += '<td>' + ret.data.order_item[len]['origin_price'] + '</td>';
                            goodsInfo += '<td>' + ret.data.order_item[len]['now_price'] + '</td>';
                            goodsInfo += '<td>' + ret.data.order_item[len]['price'] + '</td>';
                            goodsInfo += '<td>' + (parseFloat(ret.data.order_item[len]['price']) - parseFloat(ret.data.order_item[len]['now_price'])).toFixed(2)  + '</td>';
                            goodsInfo += '<td>'
                            if (ret.data.view == 1 && ret.data.class_id !=0) {
                                goodsInfo += '<input type="radio" data-sku=' + ret.data.order_item[len]['goods_id'] + ' class="rule_close" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][is_limit]"  value="0" disabled><label style="margin: 0 7px 0 0px;">否</label>';
                                goodsInfo += '<input type="radio" class="rule_open" data-sku=' + ret.data.order_item[len]['goods_id'] + ' name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][is_limit]" value="1" checked disabled>是';
                                goodsInfo += '</td>';
                                goodsInfo += '<td><label>' + ret.data.coupon_name + '</label></td>';
                            } else {
                                if (ret.data.coupon_name[ret.data.order_item[len]['goods_id']] == '' || ret.data.coupon_name[ret.data.order_item[len]['goods_id']] == null || ret.data.coupon_name[ret.data.order_item[len]['goods_id']] == undefined) {
                                    goodsInfo += '<input type="radio" data-sku=' + ret.data.order_item[len]['goods_id'] + ' class="rule_close" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][is_limit]"  value="0" checked disabled><label style="margin: 0 7px 0 0px;">否</label>';
                                    goodsInfo += '<input type="radio" class="rule_open" data-sku=' + ret.data.order_item[len]['goods_id'] + ' name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][is_limit]" value="1" disabled>是';
                                    goodsInfo += '</td>';
                                    goodsInfo += '<td><label>无 </label></td>';
                                } else {
                                    goodsInfo += '<input type="radio" data-sku=' + ret.data.order_item[len]['goods_id'] + ' class="rule_close" name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][is_limit]"  value="0" disabled><label style="margin: 0 7px 0 0px;">否</label>';
                                    goodsInfo += '<input type="radio" class="rule_open" data-sku=' + ret.data.order_item[len]['goods_id'] + ' name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][is_limit]" value="1" checked disabled>是';
                                    goodsInfo += '</td>';
                                    goodsInfo += '<td><label>' + ret.data.coupon_name[ret.data.order_item[len]['goods_id']] + '</label></td>';
                                }

                            }

                            /*if (ret.data.view == 1) {
                             goodsInfo += '<td><label>' + ret.data.coupon_name + '</label></td>';
                             } else {
                             goodsInfo += '<td> <select name="apply_goods[' + ret.data.order_item[len]['goods_id'] + '][coupon_id]"' + ' class="selectpicker" style="display:none;width:150px;padding:3px 10px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;appearance:none;moz-appearance:none;-webkit-appearance:none;background-color: #eee;background-size:20%;">';
                             goodsInfo += selectValue;
                             goodsInfo += '</select></td>';
                             }*/
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
                    //Utils.Toastr.Success('查询成功', ret.msg);
                }else {
                    Utils.Toastr.Info('查询失败', ret.msg);
                }
                $('#reduce-goods').attr('disabled',false);
                var defaultList = [];
                var  noImg = true;
                var  isImg = true;

                if (ret.data.img_url ==null || ret.data.img_url =='' || ret.data.img_url ==undefined) {
                    defaultList = [];
                    noImg = false;
                } else {
                    for (let index in ret.data.img_url)
                    defaultList.push({
                        name: ret.data.img_url[index],
                        url: ret.data.img_url[index]
                    });
                    isImg = false;
                }
                /*var FirstUpload = {
                    data() {
                        return {
                            defaultList: defaultList,
                            imgUrl: '',
                            visible: false,
                            backupList: [],
                            uploadList: [],
                            hide: true,
                            noImg: noImg,
                            isImg: isImg,
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


                var SecondUpload = {
                    data() {
                        return {
                            defaultList: defaultList,
                            imgUrl: '',
                            visible: false,
                            hide: true,
                            noImg: noImg,
                            isImg: isImg,
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
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Utils.Toastr.Error('异常', '系统错误:' + textStatus);
                $('#reduce-goods').attr('disabled',false);
            }
        });
    }

    $(document).on('click', ".rule_open", function (e) {
        let sku = $(this).data('sku');
        //$(this).parents('#li-' + sku).next(['tr.rule_table']).show();
        $('#li-' + sku + ' td:eq(8)').children().css('display','block');

    });

    $(document).on('click', ".rule_close", function (e) {
        let sku = $(this).data('sku');
        //alert($('#li-' + sku + ' td:eq(7)'));
        //$(this).parents('#li-' + sku).next(['tr.rule_table']).hide();
        $('#li-' + sku + ' td:eq(8)').children().css('display','none');
    });
});