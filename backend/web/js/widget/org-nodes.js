$(function () {
    var orgNodeContainer = $('#' + orgNodeContainerId);
    var orgNodeSelectInput = $('#' + orgNodeContainerId + '-select');
    var selectInputDatas = new Array();
    orgNodeContainer.orgchart({
        'data': '/organization-nodes?_load_data',
        'depth': 999,
        'nodeContent': 'title',
        'direction': 'l2r',
        'toggle': false,
        'toggleSiblingsResp': true,
        'createNode': function (node, data) {
            node.attr('is_org', data.is_org);
            node.attr('title', data.name);
            if (typeof (data.pid) !== typeof (undefined)) {
                node.attr('data-parent', data.pid);
            }
            if (data.is_org === 1) {
                node.addClass('mi');
            }
            if (orgNodeWithSelect) {
                selectInputDatas.push({id: data.id, text: data.name});
            }
            reloadContainerSize();
        },
        'loadedCompleted': function () {
            if (orgNodeWithSelect) {
                orgNodeSelectInput.select2({
                    multiple: true,
                    allowClear: false,
                    theme: "bootstrap",
                    language: "zh-CN",
                    placeholder: "请选择机构",
                    data: selectInputDatas
                });
                orgNodeSelectInput.on('select2:select', function (evt) {
                    if ($('#' + evt.params.data.id).length > 0){
                        selectNode($('#' + evt.params.data.id));
                    }
                });
                orgNodeSelectInput.on('select2:unselect', function (evt) {
                    if ($('#' + evt.params.data.id).length > 0){
                        selectNode($('#' + evt.params.data.id));
                    }
                });
                orgNodeSelectInput.show();

            }
            initSelection();
        }
    }).on('click', '.node', function () {
        if (0 === orgNodeMode) {
            selectNode($(this));
        }
    });

    function selectNode(node) {
        var nodeId = node.attr('id');
        if (node.children('li.second-menu-icon').length > 0) {
            node.children('li.second-menu-icon').remove();
        } else {
            var secondMenuIcon = $('<li>', {
                'data-node-id': nodeId,
                'class': 'fa fa-check-circle second-menu-icon',
                click: function () {
                    console.log(node);
                }
            });
            node.append(secondMenuIcon)
        }
        var allSelectedNodes = getAllSelectedNodes();
        var selectedIniNodes = new Array();
        if (null !== orgNodeHiddenName) {
            $("input[name='" + orgNodeHiddenName + "']").remove();
            allSelectedNodes.forEach(function (item) {
                orgNodeContainer.append($('<input>', {
                    'type': 'hidden',
                    'value': item,
                    'name': orgNodeHiddenName,
                }));
                selectedIniNodes.push('orgnodes-' + item);
            });
        }
        if (orgNodeWithSelect) {
            orgNodeSelectInput.select2('val', selectedIniNodes);
        }
        console.log(allSelectedNodes);
    }

    function initSelection() {
        if (0 === orgNodeMode && typeof (selectedNodes) !== typeof (undefined) && $.isArray(selectedNodes)) {
            selectedNodes.forEach(function (item) {
                var nodeId = isNaN(item) && 0 === item.indexOf('orgnodes-') ? item : 'orgnodes-' + parseInt(item);
                selectNode($('#' + nodeId));
            });
        }
    }

    function reloadContainerSize() {
        orgNodeContainer.height(orgNodeContainer.children('div.orgchart:first').width() + 100);
        orgNodeContainer.width(orgNodeContainer.children('div.orgchart:first').height() + 100);
    }
    function addChildToUI(node, childObj) {
        var hasChild = node.parent().attr('colspan') > 0 ? true : false;
        if (!hasChild) {
            orgNodeContainer.orgchart('addChildren', node,
                    {'children': [childObj]}, $.extend({}, orgNodeContainer.find('.orgchart').data('options'), {depth: 0}));
        } else {
            orgNodeContainer.orgchart('addSiblings', node.closest('tr').siblings('.nodes').find('.node:first'),
                    {'siblings': [childObj]});
        }
    }

    function removeNodeFromUI(node) {
        orgNodeContainer.orgchart('removeNodes', node);
    }

    function addChild(node) {
        var path = '/organization-nodes/create?from=' + node.attr('id');
        loadModal(path);
    }

    function modifyChild(node) {
        var path = '/organization-nodes/modify?from=' + node.attr('id');
        loadModal(path);
    }

    function removeChild(node) {
        layer.confirm('您好，节点【' + node.find('.title:first').text() + '】一旦删除，不可恢复。所有相关数据都会清除。确定要删除吗？', {
            btn: ['确定', '取消'],
            title: '提示'
        }, function () {
            layer.closeAll();
            var layerIndex = layer.load(0, {
                shade: [0.2, '#000']
            });
            $.ajax({
                type: "POST",
                url: '/organization-nodes/delete',
                data: 'from=' + node.attr('id'),
                error: function (request) {
                    layer.close(layerIndex);
                    Utils.Toastr.Error('失败', '对不起，网络错误，请重试！');
                },
                success: function (data) {
                    layer.close(layerIndex);
                    if (data.code == 0) {
                        removeNodeFromUI(node);
                        Utils.Toastr.Success('成功', data.msg);
                    } else {
                        Utils.Toastr.Error('失败', data.msg);
                    }
                }
            });
        }, function () {
        });
    }

    $('body').on('hidden.bs.modal', '.modal', function () {
        $(this).removeData("bs.modal");
        $("#m-a-a-a .modal-content").children().each(function () {
            $(this).remove();
        });
    });

    $(document).on('click', '#ck-is-org', function () {
        toggleSelect();
    })

    function toggleSelect() {
        if ($('#ck-is-org').prop('checked')) {
            $('#div-org-select').show();
            $('#div-org-input').hide();
            $('select').select2({theme: "bootstrap"});
        } else {
            $('#div-org-select').hide();
            $('#div-org-input').show();
        }
    }

    function loadModal(url) {
        $("#m-a-a-a .modal-content").load(url, function () {
            if ($("select").length > 0) {
                $('select').select2({theme: "bootstrap"});
            }
            var func = $['initThirdPlugins'];
            if (typeof (func) !== 'undefined') {
                func.apply('initThirdPlugins', []);
            }
            if ($('#ck-is-org').length > 0) {
                toggleSelect();
            }
        });
        $("#m-a-a-a").modal('show')
    }

    function closeModal() {
        $("#m-a-a-a").modal('hide');
    }

    function getAllSelectedNodes() {
        var nodeList = new Array();
        orgNodeContainer.find('li.second-menu-icon').each(function () {
            nodeList.push(parseInt($(this).attr('data-node-id').replace('orgnodes-', '')));
        });
        return nodeList;
    }

    $.extend({
        commonAjaxSubmitAfter: function (data) {
            if (data.code == 0) {
                closeModal();
            }
            var act = data.data.act;
            if (act == 'add') {
                addChildToUI($('#' + data.data.pid), {'name': data.data.title, 'title': data.data.mgmt_name, 'id': data.data.id, 'is_org': data.data.is_org, 'pid': data.data.pid});
            } else if (act == 'modify') {
                var node = $('#' + data.data.id);
                node.find('.title:first').text(data.data.title);
                node.find('.content:first').text(data.data.mgmt_name);
                node.attr('is_org', data.data.is_org);
                node.attr('title', data.data.title);
                if (data.data.is_org === 1) {
                    node.addClass('mi');
                } else {
                    node.removeClass('mi');
                }
            }

        }
    });

    if (orgNodeMode === 1)
    {
        $.contextMenu({
            selector: '.node',
            trigger: 'left',
            autoHide: false,
            items: {
                add: {name: "添加下属机构", disabled: function (key, opt) {
                        return 1 == opt.$trigger.attr('is_org');
                    }, icon: "fa-plus-square", callback: function (key, opt) {
                        addChild(opt.$trigger);
                    }},
                sep1: "---------",
                modify: {name: "修改机构信息", icon: "fa-edit", callback: function (key, opt) {
                        modifyChild(opt.$trigger);
                    }},
                sep2: "---------",
                del: {name: "删除", disabled: function (key, opt) {
                        var dataParent = opt.$trigger.attr('data-parent');
                        return typeof dataParent === typeof undefined || dataParent === false;
                    }, icon: "fa-minus-square", callback: function (key, opt) {
                        removeChild(opt.$trigger);
                    }}
            }
        });
    }

});