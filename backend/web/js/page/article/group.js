/**
 * Created by wangchongshan@xiaomi.com on 17-5-10.
 */

$(function () {

    var createGroup = $('#submit-CreateGroup');
    var updateGroup = $('#submit-UpdateGroup');
    var createGroupForm = $('#group-create-form');
    var updateGroupForm = $('#group-update-form');
    $('.group-add').click(function(){
        var emptId = $('#emptId').val();
        $.ajax({
            type: 'POST',
            data: {emptId:emptId},
            url: '/cms/article/group-add',
            success: function (data) {
                if (data.code == 0) {
                    var count = 0;
                    var exit = false;
                    $("#group_list").find("td").each(function(){
                        var str = data.data['name'];
                        if(str == $(this).text()){
                            Utils.Toastr.Info('提示', '该成员已添加');
                            exit = true;
                        }
                    });
                    if(!exit){
                        html = '<tr><td>' + data.data['id'] + '</td>'
                            +'<td>' + data.data['name'] + '</td>'
                            +'<td>' + data.data['posn_descr'] + '</td>' 
                            +'<td>' + data.data['dept_descr'] + '</td>'
                            + '<td><a class="child-delete" href="javascript:void(0);" style="color: #0F6099" onClick="remove(this)">删除</a></td></tr>';
                        $('.table-tr').append(html)                    
                    }
                }
                if(data.code == -1){
                    Utils.Toastr.Info('提示', data.msg);
                }

                if(data.code == -2){
                    Utils.Toastr.Info('提示', data.msg);
                }
            },
        });
    });

    createGroup.click(function(){
        var data = [];
        $("#group_list").find("td").each(function(){
            data.push($(this).text()); 
        });
        var groupName = $("#groupName").val();
        $.post({
                url: 'group-create',
                data: {form:createGroupForm.serialize(),td:data, groupName:groupName},
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "group-index";
                    } else {
                        Utils.Toastr.Info('错误', ret.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );
    });

    updateGroup.click(function(){
        var data = [];
        $("#group_list").find("td").each(function(){
            data.push($(this).text()); 
        });
        var groupName = $("#groupName").val();
        var id = updateGroup.attr('data-id');
        $.post({
                url: 'group-update?id=' + id,
                data: {form:updateGroupForm.serialize(),td:data, groupName:groupName},
                dataType: 'json',
                success: function (ret) {
                    if (ret.code === 200) {
                        window.location.href = "group-index";
                    } else {
                        Utils.Toastr.Info('错误', ret.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Utils.Toastr.Error('异常', '系统错误' + textStatus);
                }
            }
        );
    });
    
});

function remove(event){
    $(event).parent().parent().remove();
}

