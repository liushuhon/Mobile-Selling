/**
 * 
 */
 
	$(document).ready(function() {
         var result = "";
         $.ajax({
             url:"/MyPhoneWebProject/servlet/RandImage",
             type:"GET",
             dataType:"json",
             async:false,//关闭异步加载,这样只有加载完成才进行下一步
             success:function (data) {
                data = eval(data);
                $('#Img').html(data);
             }
         });
         return result;
     }
 )