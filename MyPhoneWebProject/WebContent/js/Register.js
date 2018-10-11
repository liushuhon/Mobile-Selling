/**
 * register.js
 */
/**
 * 获取注册时填入的信息
 */
function getElement() {
	var pNumber = document.getElementById("phoneNumber").value;
	var pwd = document.getElementById("password").value;
	var unit = document.getElementById("unit").value;
	var birth = document.getElementById("birth").value;
	var data = {};
	data.pNumber = pNumber;
	data.pwd = pwd;
	data.unit = unit;
	data.birth = birth;
	if (checkNum() && checkPwd() && checkRePwd()&&checkBirth() && checkUnit() ) {
		addUser(pNumber, pwd,unit,birth);
	}
	else{
	}
}
/**
 * 新增用户
 */
function addUser(pNumber,pwd,unit,birth) { 
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'text',
		data : {
			'types' : 'add',
			'userCode' : pNumber,
			'password' : pwd,
			'unit' : unit,
			'birth' : birth
		},
		success : function(data) {
			alert('注册成功');
			window.location.href = "../html/Login.html";
		},
		error : function(error) {
			alert("添加失败");
		}
	});

}
function checkUnit() {
	var unit = document.getElementById("unit");
	var lunit = document.getElementById("lunit");
	var unitValue = unit.value;   
	lunit.style.fontSize = '12px';
	lunit.style.color = 'red';
	if (unitValue == "" || unitValue == null) {
		lunit.innerHTML = "单位不能为空!";
		return false;
	} else {
		 lunit.style.color = 'green';
		 lunit.innerHTML = "√";
		return true;
	}
}
function checkBirth() {
	var birth = document.getElementById("birth");
	var lbirth = document.getElementById("lbirth");
	var birthValue = birth.value;   
	lbirth.style.fontSize = '12px';
	lbirth.style.color = 'red';
	if (birthValue == "" || birthValue == null) {
		lbirth.innerHTML = "出生日期不能为空!";
		return false;
	} else {
		 lbirth.style.color = 'green';
		 lbirth.innerHTML = "√";
		return true;
	}
}
function checkPwd() {
	var pwd = document.getElementById("password");
	var lpwd = document.getElementById("lpwd");
	var pwdValue = pwd.value;
	var pwdLength = pwd.value.length;
	var pattern = /^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}$/g;
	var patternLen = /^.{8,}$/g;
	lpwd.style.fontSize = '12px';
	lpwd.style.color = 'red';
	if (pwdValue == "" || pwdValue == null) {
		lpwd.innerHTML = "密码不能为空!";
		return false;
	}
	/*
	 * else if (!pattern.test(pwdValue)) { lpwd.innerHTML =
	 * "密码必须由数字、字符、特殊字符三种中的两种组成"; return false;
	 * 
	 *  }
	 */else {
		 lpwd.style.color = 'green';
		 lpwd.innerHTML = "√";
		return true;
	}
}
function checkRePwd() {
	var pwd = document.getElementById("password");
	var lpwd = document.getElementById("lpwd");
	var rePwd = document.getElementById("rePassword");
	var lrepwd = document.getElementById("lrepwd");
	lrepwd.style.fontSize = '12px';
	lrepwd.style.color = 'red';
	if (pwd.value == rePwd.value &&pwd.value!="") {
		lrepwd.style.color = 'green';
		lrepwd.innerHTML = "√"; 
		return true;
	} else {
		lrepwd.innerHTML = "与上面输入的密码不符!";
		return false;
	}

}
function checkNum() {
	var phoneNum = document.getElementById("phoneNumber");
	var lPhoneNum = document.getElementById("lphoneNumber");
	var phoneNumValue = phoneNum.value;
	var pattern = /^[0-9]*$/g;
	var length = phoneNum.value.length;
	lPhoneNum.style.fontSize = '12px';
	lPhoneNum.style.color = 'red';
	var flag=true;
	if (!pattern.test(phoneNumValue) || length != 11) {
		lPhoneNum.innerHTML = "账号为11位的数字！";
		flag = false;
	} else {
		$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/MyPhoneWebProject/servlet/UserServlet",
			dataType : 'json',
			data : {
				'types' : 'findUserByNum',
				'num' : phoneNumValue
			},
			success : function(data) {
				datas = eval(data);
				if (datas.length != 0) {
					lPhoneNum.innerHTML = "该账户已存在！";
					flag=false;
				} else {
					lPhoneNum.style.color = 'green';
					lPhoneNum.innerHTML = "√"; 
					flag=true;
				}
			},
			error : function(error) {
				alert("error");
			}
		});
	}
	 return flag;
}