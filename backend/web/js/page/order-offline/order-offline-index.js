/**
 * Created by ouyang on 17-11-29.
 * 对json串进行格式化后输出
 */

$(function () {

    var id = $('#data').text();
    id = JSON.parse(id);
    $('#data').html(syntaxHighlight(id));

    var exception = $('#exception').text();
    exception = JSON.parse(exception);
    $('#exception').html(syntaxHighlight(exception));

    /*$('#data').css('display', 'none');

    var id = $(this).attr("data-url");
    id = JSON.parse(id);
    $('#result').html(syntaxHighlight(id));*/

    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    $('.order-exception').click(function (req) {
        req.preventDefault();
        if ($('#data').css('display') == 'none') {
            $('#data').css('display', 'block');
        } else {
            $('#data').css('display', 'none');
        }

    });
});


