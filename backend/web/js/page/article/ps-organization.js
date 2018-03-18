$(function(){
    /**
     * 点击全部，选择所有的节点
     */
   $(".all_node").change(function () {
        checked = $(".all_node").prop("checked");
        $(".node").prop('checked', checked);
    });

   $(".node").change(function(){
        nodeRes = $(this).prop("checked");
        nodeClassArr = $(this).prop("class").split(' ');

        /**
         * 点击一级节点，选择所有的二级节点
         */
        if(nodeClassArr[1] == 'first'){
            $('.' + nodeClassArr[0] + '_second').prop("checked",nodeRes);
        }

        /**
         * 当二级节点全部被选择，一级节点也会被选择
         */
        if(nodeClassArr[1] == 'second'){
            if(nodeRes == false){
                $('.' + nodeClassArr[0] + '_first').prop("checked",false);
            }
            if(nodeRes == true){
                var childCheck = true;
                $("." + nodeClassArr[2]).each(function(){
                    childCheck = childCheck && $(this).prop("checked");
                });
                if(childCheck ==true){
                    $('.' + nodeClassArr[0] + '_first').prop("checked",true);
                }
            }
        }

        /**
         * 当所有的节点被选择时，顶级节点被选择
         */
        if(nodeRes == false){
            $(".all_node").prop("checked",false);
        }else{
            var allCheck = true
            $(".node").each(function(){
                allCheck = allCheck && $(this).prop("checked");
            }); 

            if(allCheck ==true){
                $(".all_node").prop("checked",true);

            }
        }
   });

    checkNode();

});
    /** 
     * 根据org_arr 填充区域信息
     */
   function checkNode(){
        secondNodeCheck = true;
        count = 0;
        $('.first').each(function(){
            count++;
        });
        for (var i = 1; i <= count; i++) {
            secondCheckNode = true
            if($('#' + i + '_second').length <=0){
                continue;
            }

            $('.' + i + '_second').each(function(){
                secondCheckNode = secondCheckNode && $(this).prop('checked');
            });
            $('.' + i + '_first').prop("checked", secondCheckNode);                
        }
        allCheckNode = true
        $('.node').each(function(){
            allCheckNode = allCheckNode && $(this).prop('checked');
        });
        $('.all_node').prop("checked", allCheckNode);
   }

