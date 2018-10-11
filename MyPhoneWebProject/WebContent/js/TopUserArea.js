/**
 * 
 */
var curUser = ""; 
$(document).ready(function(){
	getCurUser(); 
	if(curUser!=null && curUser!=""){
		selectCart();
		$("#userId").html(curUser+",您好  ");
	} else{
		$("#userId").html("<a href='../html/Login.html'>点击登陆</a>");
	}
	
	}
	
)
function selectCart(){
		$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/MyPhoneWebProject/servlet/MiddleServlet",
			dataType : 'json',
			data : {
				'type' : 'showMiddle',
				'curUser' : curUser
			},
			success : function(data) {
				datas = eval(data);
				var len = datas.length;
				$("#spCart-span").html(len);
			},
			error : function(error) { 
			}
		});
	 
} 