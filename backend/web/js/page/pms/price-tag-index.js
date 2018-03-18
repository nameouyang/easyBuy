$(function () {
    $(document).on('click', '#batch-download-btn', function () {
        console.log(1);
        params = new Object();
        paramValue = new Array();
        $("input[name='priceTag[]']:checked").each(function () {
            paramValue.push({name: 'id[]', value:$(this).val()});
        });
        params = paramValue;
        if (0 == params.length)
        {
            return;
        }
        open('POST', $('#batch-download-btn').attr('data-url'), params, '_blank');
    });

    $(document).on('change', '#per-page', function ()
    {
        url = changeURLArg(window.location.href, 'per-page', $('#per-page').val());
        window.location.href = url;
    }
    );

    var changeURLArg = function (url, arg, arg_val) {
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            var tmp = '/(' + arg + '=)([^&]*)/gi';
            tmp = url.replace(eval(tmp), replaceText);
            return tmp;
        } else {
            if (url.match('[\?]')) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }
        }
        return url + '\n' + arg + '\n' + arg_val;
    }
    var open = function(verb, url, data, target) {
        var form = document.createElement("form");
        form.action = url;
        form.method = verb;
        form.target = target || "_self";
        if (data) {
            for (var key in data) {
                var input = document.createElement("input");
                input.name = data[key].name;
                input.value = data[key].value;
                form.appendChild(input);
            }
        }
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
    };
});
