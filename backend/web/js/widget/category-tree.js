var categoryTree;
var categoryTreeSetting;

$(document).ready(function () {
    //赋予zTree值
    categoryTreeNodes = 'undefined' === typeof (categoryTreeVal) ? null : categoryTreeVal;

    //个性化属性 [可用循环改写]
    ctConf = new Object();
    ctConf.ct_parent_checkable = 'undefined' === typeof (ctParentCheckable) ? 0 : ctParentCheckable;
    ctConf.ct_check_type = 'undefined' === typeof (ctCheckType) ? 'checkbox' : ctCheckType;
    ctConf.ct_radio_type = 'undefined' === typeof (ctRadioType) ? 'all' : ctRadioType;
    ctConf.ct_radio_type = 'undefined' === typeof (ctRadioType) ? 'all' : ctRadioType;
    ctConf.ct_selected_label = 'undefined' === typeof (ctSelectedLabel) ? 'categoryTreeLabel' : ctSelectedLabel;
    ctConf.ct_show_icon = 'undefined' === typeof (ctShowIcon) ? 'all' : ctShowIcon;
    ctConf.ct_show_sku = 'undefined' === typeof (ctShowSku) ? true : ctShowSku;
    ctConf.ct_show_animation = 'undefined' === typeof (ctShowAnimation) ? false : ctShowAnimation;
    ctConf.ct_selected_label_tpl = 'undefined' === typeof (ctSelectedLabelTpl) ? null : ctSelectedLabelTpl;
    ctConf.ct_selected_label_append = 'undefined' === typeof (ctSelectedLabelAppend) ? false : ctSelectedLabelAppend;

    //同步传递的属性
    ctConfGet = new Object();
    ctConfGet.ct_parent_checkable = ctConf.ct_parent_checkable;
    ctConfGet.ct_show_sku = ctConf.ct_show_sku;

    categoryTreeSetting = {
        view: {
            showIcon: showIconForTree
        },
        check: {
            enable: true,
            chkStyle: ctConf.ct_check_type,
            radioType: ctConf.ct_radio_type,
        },
        async: {
            enable: null === categoryTreeNodes,
            url: "/category-tree?" + $.param(ctConfGet),
            autoParam: ["id", "name=n", "level=lv"],
        },
        callback: {
            onCheck: categoryTreeOnCheck,
            onClick: zTreeOnClick,
        }
    };

    initCaregoryTree();

    $('#categoryTreeSearchBtn').on('click', ztreeSearch);
    $('#categoryTreeSearchInput').bind('input propertychange', ztreeSearch);

    function initCaregoryTree()
    {
        if ($("#categoryTree").length > 0)
        {
            categoryTree = $.fn.zTree.init($("#categoryTree"), categoryTreeSetting, categoryTreeNodes);
        }
    }

    $(".zTreeBg").scroll(function () {
        var offset = $(this).offset();
        $(".zTreeSearchDiv").offset(offset);
    });


    function showIconForTree(treeId, treeNode)
    {

        if (ctConf.ct_show_icon === 'all')
        {
            return true;
        }
        if (ctConf.ct_show_icon === 'none')
        {
            return false;
        }
        if (ctConf.ct_show_icon === 'parent')
        {
            return treeNode.isParent;
        }
        return !treeNode.isParent;
    }
    ;

    function zTreeOnClick(event, treeId, treeNode) {
        categoryTree.checkNode(treeNode, null, true, true);
    }

    function categoryTreeOnCheck(event, treeId, treeNode) {
        if ($("#categoryTreeSelected").length > 0) {
            checkedNodes = getAllCheckedNodes(categoryTree.getNodes(), true);
            checkedIdList = new Array();
            checkedNodes.forEach(function (checkedNodeItem)
            {
                if (!checkedNodeItem.isParent)
                {
                    checkedIdList.push(checkedNodeItem.id);
                }
            });
            $("#categoryTreeSelected").val(checkedIdList.join(","));
        }
        if ($("#" + ctConf.ct_selected_label).length > 0)
        {
            var checkedNodesLabelPrefix = null === ctConf.ct_selected_label_tpl ? "<ul>" : "";
            var checkedNodeslableEnd = null === ctConf.ct_selected_label_tpl ? "</ul>" : "";

            if (ctConf.ct_selected_label_append)
            {
                var checkedNodesLabelTpl = null === ctConf.ct_selected_label_tpl ? "<li>{name}</li>" : ctConf.ct_selected_label_tpl;
                var needAppendNodes = new Array();
                var mode = 1;
                if (treeNode.isParent) {
                    mode = 2;
                    needAppendNodes = treeNode.children;
                } else {
                    needAppendNodes.push(treeNode);
                }
                needAppendNodes.forEach(function (nansItem) {
                    if (!nansItem.checked)
                    {
                        $('#li-' + nansItem.id).remove();
                        if (typeof ($['categroryTreeAfterUncheck']) !== 'undefined') {
                            $['categroryTreeAfterUncheck'].apply('categroryTreeAfterUncheck', [treeNode, nansItem]);
                        }
                    } else
                    {
                        if($('#li-' + nansItem.id).length > 0){
                            return;
                        }
                        var tmpNodeLabel = checkedNodesLabelTpl;
                        var checkedNodesLabel = '';

                        for (var nodePropName in nansItem)
                        {
                            tmpNodeLabel = tmpNodeLabel.replace(new RegExp("\{" + nodePropName + "\}", "g"), nansItem[nodePropName]);
                        }
                        checkedNodesLabel += tmpNodeLabel;
                        checkedNodesLabel = checkedNodesLabelPrefix + checkedNodesLabel + checkedNodeslableEnd;
                        categoryTree.setChkDisabled(nansItem, true);
                        if (mode == 2) {
                            categoryTree.setChkDisabled(treeNode, true);
                        }
                        fly({
                            target: "#" + ctConf.ct_selected_label,
                            source: $("#" + treeNode.tId + "_span")
                        },
                        nansItem.checked && ctConf.ct_show_animation,
                                function ()
                                {
                                    $("#" + ctConf.ct_selected_label).prepend(checkedNodesLabel);
                                    categoryTree.setChkDisabled(nansItem, false);
                                    if (mode == 2) {
                                        categoryTree.setChkDisabled(treeNode, false);
                                    }
                                    if (typeof ($['categroryTreeAfterFly']) !== 'undefined') {
                                        $['categroryTreeAfterFly'].apply('categroryTreeAfterFly', [treeNode, nansItem]);
                                    }
                                });
                    }
                });

            } else
            {
                var checkedNodesLabelTpl = null === ctConf.ct_selected_label_tpl ? "<li>{name}</li>" : ctConf.ct_selected_label_tpl;

                checkedNodes = getAllCheckedNodes(categoryTree.getNodes(), true);

                checkedNodes.forEach(function (checkedNodeItem)
                {
                    if (!checkedNodeItem.isParent)
                    {
                        var tmpNodeLabel = checkedNodesLabelTpl;
                        for (var nodePropName in checkedNodeItem)
                        {
                            tmpNodeLabel = tmpNodeLabel.replace(new RegExp("\{" + nodePropName + "\}", "g"), checkedNodeItem[nodePropName]);
                        }
                        checkedNodesLabel += tmpNodeLabel;
                    }

                });
                checkedNodesLabel = checkedNodesLabelPrefix + checkedNodesLabel + checkedNodeslableEnd;

                fly({
                    target: "#" + ctConf.ct_selected_label,
                    source: $("#" + treeNode.tId + "_span")
                },
                treeNode.checked && ctConf.ct_show_animation,
                        function ()
                        {
                            $("#" + ctConf.ct_selected_label).html(checkedNodesLabel);
                            if (typeof ($['categroryTreeAfterFly']) !== 'undefined') {
                                $['categroryTreeAfterFly'].apply('categroryTreeAfterFly', [treeNode, nansItem]);
                            }
                        });
            }
        }

    }

    function ztreeSearch()
    {
        var seachKw = $('#categoryTreeSearchInput').val();
        categoryTree.showNodes(categoryTree.getNodesByParam("isHidden", true));
        var nodes = getNodesNeedsToHide(categoryTree.getNodes(), "name", seachKw, categoryTree.getNodes().l);
        categoryTree.hideNodes(nodes);
        categoryTree.expandAll(true);
    }

    function getAllCheckedNodes(nodes, checked, results) {
        if (!nodes)
            return [];
        var childKey = categoryTree.setting.data.key.children,
                checkedKey = categoryTree.setting.data.key.checked,
                onlyOne = (checked && categoryTree.setting.check.chkStyle == "radio" && categoryTree.setting.check.radioType == "all");
        results = !results ? [] : results;
        for (var i = 0, l = nodes.length; i < l; i++) {
            if (nodes[i][checkedKey] === checked) {
                results.push(nodes[i]);
                if (onlyOne) {
                    break;
                }
            }
            getAllCheckedNodes(nodes[i][childKey], checked, results);
            if (onlyOne && results.length > 0) {
                break;
            }
        }
        return results;
    }

    function getNodesNeedsToHide(nodes, key, value)
    {
        if (!nodes || !key)
        {
            return [];
        }
        var childKey = categoryTree.setting.data.key.children, result = [];
        value = value.toLowerCase();
        var counter = 0;
        for (var i = 0, l = nodes.length; i < l; i++)
        {
            if (typeof nodes[i][key] !== "string" || nodes[i][key].toLowerCase().indexOf(value) < 0)
            {
                if (!nodes[i].isParent)
                {
                    result.push(nodes[i]);
                    ++counter;
                } else
                {
                    if (typeof (nodes[i][childKey]) === 'undefined' || nodes[i][childKey] === null)
                    {
                        result.push(nodes[i]);
                        ++counter;
                    }
                }

            }
            if (counter === l)
            {
                result.push(nodes[i].getParentNode());
            }
            result = result.concat(getNodesNeedsToHide(nodes[i][childKey], key, value));
        }
        return result;
    }

    function fly(options, showAnimation, afterFly)
    {
        if (!showAnimation)
        {
            afterFly();
            return;
        }
        var settings = $.extend({
            target: '.flyto-target',
            source: '.flyto-btn',
        }, options);

        var source = $(settings.source),
                target = $(settings.target);
        var sourceClone = source.clone()
                .offset({
                    top: source.offset().top,
                    left: source.offset().left
                })
                .css({
                    'opacity': '0.5',
                    'position': 'absolute',
                    'height': source.height() / 2,
                    'width': source.width() / 2,
                    'z-index': '100',
                })
                .appendTo($('body'))
                .animate({
                    'top': target.offset().top + 10,
                    'left': target.offset().left + 15,
                    'height': source.height(),
                    'width': source.width()
                }, 200, 'easeInOutExpo');

        setTimeout(function () {
            afterFly();
        }, 400);

        sourceClone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach()
        });
    }

    $.extend({
        zTreeResearch: ztreeSearch,
    });

});
