$(function () {
    $(document).on('change', '[name="Country[country_name]"]', function (event) {
        $.ajax({
            cache: true,
            type: "POST",
            url: '/country/info',
            data: {country: $(this).val()},
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                if (data.code == 200) {
                    $('[name="Country[country_code]"]').val(data.data.country_code);
                    $('[name="Country[country_code_alpha3]"]').val(data.data.country_code_alpha3);
                    $('[name="Country[flag_icon]"]').val('flag-icon-'+data.data.country_code);
                }
            }
        });
    });

    $(document).on('shown.bs.modal', '#modal-country', function(){
        $('[name="Country[country_name]"]').trigger('change');
    });

    $(document).on('click', '.modal-submit', function(){
        var action = $(this).data('action');
        $.ajax({
            cache: true,
            type: "POST",
            url: '/country/' + action + (action == 'update' ? '?id=' + $('[name="Country[country_code]"]').val() : ''),
            data: $("#country-form").serialize(),
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
            },
            success: function (data) {
                if (data.code == 200) {
                    window.location.reload();
                } else {
                    for (var key in data.data) {
                        Utils.Toastr.Error('Warning', data.data[key][0]);
                        $('[name="Country[' + key + ']"]').focus();
                        return false;
                    }
                }
            }
        });
    });
});

