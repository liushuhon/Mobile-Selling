var isEdit = null;
var userId = null; 
function editUserByCode(id,isEdits){ 
	showEditUser();
	$("#btnCropUser").val("修改");
	isEdit = isEdits;
	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'json',
		data:{
			'types':'findUserByNum',
			'num':id
		},
	    success: function(data) {
			datas = eval(data);
			userId = datas[0].id; 
			showUserInfo(datas[0]);
  		},
  		error : function(error) {
  			alert("修改失败");
  		}	
	});
}


 function editUser() {
	var userCode = document.getElementById('usercode').value;
	var birth = document.getElementById('birth').value;
	var unit = document.getElementById('unit').value; 
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'json',
		data : {
			'types' : 'editUserById',
			'id' : userId,
			'userCode' : userCode, 
			'unit' : unit,
			'birth' : birth 
		},
		success : function(data) {
			alert("修改成功");
			isEdit = null;
			showUserMg();
		},
		error : function(error) {
			alert("修改成功");
			isEdit = null;
			showUserMg();
		}
	});

}
'use strict';
var showUserInfo = function(data) {
	document.getElementById('usercode').value = data.userCode;
	document.getElementById('birth').value = data.birth;
	document.getElementById('unit').value=data.unit;  
}
 
