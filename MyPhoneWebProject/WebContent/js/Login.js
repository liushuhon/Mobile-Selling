/**
 * 
 */
function Login(){
	var pNumber = document.getElementById("phoneNumber").value;
	var pwd = document.getElementById("password").value; 
	if(checkPhoneNum()&&checkPwd()&&checkIdenCode() ){ 
		LoginUser(pNumber,pwd);
	}
	else{
		
	}
}
function checkPhoneNum(){

	var pNumber = document.getElementById("phoneNumber").value;
	var lpNumber = document.getElementById("lPhoneNumber");
	lpNumber.style.fontSize = '12px';
	lpNumber.style.color = 'red';
	lpNumber.innerHTML = "";
	if(pNumber==null || pNumber==""){
		lpNumber.innerHTML = "请填写正确的账号";
		return false;
	}
	else{ 
		 
		return true;
	}
}
function checkPwd(){
	
	var pwd = document.getElementById("phoneNumber").value;
	var lpwd = document.getElementById("lPassword");
	lpwd.style.fontSize = '12px';
	lpwd.style.color = 'red';
	lpwd.innerHTML = "";
	if(pwd==null || pwd==""){
		lpwd.innerHTML = "请填写正确的密码";
		return false;
	}
	else{  
		 
		return true;
	}
}
function checkIdenCode(){
	var valCode = null;
	var codeInput = document.getElementById("idenCode").value;
	var lCodeInput = document.getElementById("lIdenCode");
	lCodeInput.style.fontSize = '12px';
	lCodeInput.style.color = 'red';
	var flag = false;
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/ValidateCodeServlet", 
		async :false,
		dataType : 'json',
		data : {
			'type' : 'getValCode'
		},
		success : function(data) { 
			valCode = data; 
			 
			if(valCode.toLowerCase() == codeInput.toLowerCase()){
				lCodeInput.style.color = 'green';
				lCodeInput.style.fontSize = '20px';
				lCodeInput.innerHTML = "√"; 
				flag =  true;
			}else{
				ValCode();
				lCodeInput.innerHTML = "请填写正确的验证码";
				$("#idenCode").css("border","1px solid #BC0000");
				flag =  false;
			}
		},
		error : function(error) {
			alert("error");
			flag =  false;
		}
	});
	return flag;
}
function LoginUser(pNumber,pwd){
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'json',
		data : {
			'types' : 'findUserByNum',
			'num' : pNumber
		},
		success : function(data) {
			datas = eval(data);
			if (datas.length != 0) {
				if(datas[0].userCode==pNumber && datas[0].password==pwd) {
					/*history.back(-1);*/
					   location.href="../html/Index.html";  
				}else {
					var lpwd = document.getElementById("lPassword");
					lpwd.innerHTML = "请填写正确的账号或密码";
				}
				
				} 
		},
		error : function(error) {
			alert("error");
			
		}
	});
	
}