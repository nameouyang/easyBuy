
/**
 * Created by lurenzhong@xiaomi.com on 17-01-07.
 */

$(function () {

    $(document).on('click', '.switchStatusButton', function (req) {

        var categoryId = $(req.target).attr("categoryId");
        var status = $(req.target).attr('status');

        $.ajax({
            cache: true,
            type: "POST",
            url: '/product-category/switch-status',
            data: 'categoryId='+ categoryId + '&status=' + status,
            error: function (request) {
                Utils.Toastr.Error('失败', '网络错误');
                //self.location.reload();
            },
            success: function (data) {
                if (data.code == 200) {
                    Utils.Toastr.Success('成功', '修改成功');
                    $(req.target).parent().children().toggleClass('primary');

                } else if (data.code == 10001) {
                    Utils.Toastr.Info('提示', data.msg);
                } else if (data.code == 10003) {
                    Utils.Toastr.Error('失败', '修改失败');
                    self.location.reload();
                }
            }
        });

    });

});



function fn() {
    var getSelectMessage = function(treeData) {

        let messageArray = [];
        for (let i in treeData) {
            let node = treeData[i];
            if (node.checked) {
                messageArray.push(node.title);
            } else if (node.children) {
                let childMessage = getSelectMessage(node.children);
                let childMessageArray = childMessage.split(',');
                for (let j in childMessageArray) {
                    if (childMessageArray[j].length > 0) {
                        messageArray.push(childMessageArray[j]);
                    }
                }
            }
        }
        return messageArray.join(',');
    };

    var Main = {
        data() {
            return {
                visible: false,
                treeData: node.children,
                selectIds : ids,
                selectMessage: '',
            }
        },
        methods: {
            show() {
                this.visible = !this.visible;
            },
            onCheckChange(nodes) {
                this.selectIds = [];
                for (let i in nodes) {
                    let child = nodes[i];
                    if (this.selectIds.indexOf(child['id']) === -1) {
                        this.selectIds.push(child['id']);
                    }
                }
                this.selectMessage =getSelectMessage(this.treeData);
            },
            notify(title, desc) {
                this.$Notice.config({
                    top: 100,
                    duration: 3
                });
                this.$Notice.open({
                    title: title,
                    desc: desc,
                });
            },
        },
    };

    var Component = Vue.extend(Main);
    var searchTree = new Component().$mount('#searchTree');
    searchTree.selectMessage = getSelectMessage(searchTree.treeData);
}
fn();
