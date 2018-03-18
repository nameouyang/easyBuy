(function(window, $) {

    /**
     * 实现打印功能（只打印网页中的一部分）
     *
     * Usage:
     *   <button jw-click-print="#printContext">Print</button>
     */
    var print = function($dom) {
        $("iframe.js-print").remove();

        var iframe = $('<iframe class="js-print" style="position:absolute;width:0;height:0;left:-10000px;top:-10000px;">');
        $('body').append(iframe);

        var styles = [];
        var $doc = $(window.document);
        $doc.find("link[rel=stylesheet]").each(function() {
            var href = $(this).attr("href");
            return styles.push('<link type="text/css" rel="stylesheet" href="' + href + '" />');
        });
        $doc.find("style").each(function() {
            var css = $(this).html();
            return styles.push('<style type="text/css">' + css + '</style>');
        });

        var frameWindow = iframe[0].contentWindow;
        var frameDocument = frameWindow.document;
        frameDocument.write("<!DOCTYPE html><html><head>" + styles.join('') + "</head><body>" + $dom.html() + "</body></html>");
        frameDocument.close();
        frameWindow.close();
        frameWindow.focus();
        return frameWindow.print();
    };

    $.fn.print = function() {
        print(this);
    };

    $(function() {
        $('[jw-click-print]').on('click', function() {
            var selector = $(this).attr('jw-click-print');
            $(selector).print();
        });
    });

})(window, jQuery);