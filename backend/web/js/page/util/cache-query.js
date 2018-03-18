$(function () {
    //变量初始化
    var $jsonView = $('#json-view');
    var $jsonViewBoard = $('#json-view-board');
    var $name  = $('#cachequery-name');
    var $operate = $('#cachequery-operate');
    var $hash = $('#cachequery-hash');
    var $key = $('#cachequery-key');
    var $history = $('#query-history');
    var $form = $('#cache-query-form');
    var storage = window.localStorage;

    $('#collapse-btn').on('click', function() {
        $jsonView.JSONView('collapse');
    });

    $('#expand-btn').on('click', function() {
        $jsonView.JSONView('expand');
    });

    $operate.on("select2:select", function (e) {
        var id = e.params.data.id;
        if (id === '1') {
            $hash.css('display', 'block');
            $hash.val($key.val());
            $key.val('');
        } else  {
            $hash.css('display', 'none');
            $hash.val('');
        }
    });

    var historyLoad  =function () {
        var historyItem = JSON.parse(storage.getItem('query-history'));
        $history.empty();
        if (historyItem === null) {
            return;
        }
        for (var i = 0; i< historyItem.length; i++) {
            var item = historyItem[i].split('|');
            if (item[1] === '0') {
                $history.append('<a class="dropdown-item" href="javascript:void(0)" data-name="'+ item[0] + '" data-operate="' + item[1] + '" >'+ item[3] +'</a>\n');
            } else  {
                $history.append('<a class="dropdown-item" href="javascript:void(0)" data-name="'+ item[0] + '" data-operate= "' + item[1] + '" >'+ item[2] + '|' + item[3] +'</a>\n');
            }
            if (i >= 15) {
                break;
            }
        }

        $('#query-history .dropdown-item').each(function () {
            $(this).click(function () {
                $(this).attr('data-cache');
                $name.val($(this).attr('data-name')).trigger('change');
                $operate.val($(this).attr('data-operate')).trigger('change');
                var item = $(this).text().split('|');
                if (typeof item[1] !== 'undefined') {
                    $hash.val(item[0]).css('display', 'block');
                    $key.val(item[1]);
                } else {
                    $key.val(item[0]);
                    $hash.val('').css('display', 'none');
                }
            });
        });
    };

    historyLoad();

    $(document).on('click', '#cache-query-submit', function () {
        $.ajax({
            cache: false,
            type: "POST",
            url: 'query',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    var storeArray = JSON.parse(storage.getItem('query-history'));
                    if (storeArray === null) {
                        storeArray = [];
                    }
                    var insertItem = $name.val() + '|' + $operate.val() + '|' + $hash.val()+ '|' + $key.val();
                    for (var item in storeArray) {
                        if (storeArray.hasOwnProperty(item)) {
                            if (storeArray[item] ===  insertItem) {
                                storeArray.splice(item, 1);
                            }
                        }
                    }
                    storeArray.unshift(insertItem);
                    var storeJson = JSON.stringify(storeArray);
                    storage.setItem('query-history', storeJson);
                    //加载历史记录
                    historyLoad();
                    $jsonViewBoard.css('display', 'block');
                    $jsonView.JSONView(data.data);
                    $jsonView.JSONView('collapse');
                }
                else {
                    Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg + '<br/>' + data.data);
                }
            }
        });
    });

    $(document).on('click', '#cache-query-delete', function () {
        if ($key.val() !== '' &&  window.confirm('你确定删除吗？')) {
            $.ajax({
                cache: false,
                type: "POST",
                url:  'delete',
                data: $form.serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.code === 200) {
                        Utils.Toastr.Success('成功', '删除成功');
                    }
                    else {
                        Utils.Toastr.Info('错误：' + data.code, '错误信息：' + data.msg + '<br/>' + data.data);
                    }
                }
            });
        }
    });
});