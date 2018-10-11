/**
 * 
 */ 
function getCurUser(){
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'json',
		async:false,
		data : {
			'types' : 'getUserCode', 
		},
		success : function(data) {
			var datas = eval(data); 
			curUser = datas;   
		},
		error : function(error) {
			alert("error");
		}
	});
}
function userLogout(){
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'json',
		async:false,
		data : {
			'types' : 'userLogout', 
		},
		success : function(data) {  
		},
		error : function(error) {
			alert("error");
			
		}
	});
}