/**
 * Created by wangchongshan@xiaomi.com on 17-5-10.
 */

$(function () {
    /**
     * 控制附件和门店的限制
     */
    $(document).on('click', '.view-file-dis', function (req) {
        $('.view-file').css('display','none');
        $('.view-file-dis').css('display','none');
        $('.view-file-show').css('display','block');
    });

        $(document).on('click', '.view-file-show', function (req) {
        $('.view-file').css('display','block');
        $('.view-file-show').css('display','none');
        $('.view-file-dis').css('display','block');
    });

    $(document).on('click', '.view-scope-dis', function (req) {
        $('.view-scope').css('display','none');
        $('.view-scope-dis').css('display','none');
        $('.view-scope-show').css('display','block');
    });

        $(document).on('click', '.view-scope-show', function (req) {
        $('.view-scope').css('display','block');
        $('.view-scope-show').css('display','none');
        $('.view-scope-dis').css('display','block');
    });

});
