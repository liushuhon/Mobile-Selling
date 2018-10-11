/**
 * 
 */
function getUser(){
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'json',
		data:{
			'type':'getUserSession'
		},
		success : function(data) {
			datas = eval(data);
			alert(datas);
			var	curUser = datas;
	  	},
	  	error : function(error) {
	  		alert("添加失败");
	  	}	
	}); 
}