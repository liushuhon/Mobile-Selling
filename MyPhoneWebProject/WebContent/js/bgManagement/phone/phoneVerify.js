/**
 * 
 */
/**
 * 
 */
function checkPhoneCode(){
	var phoneCode = document.getElementById("phoneCode");
	var lPhoneCode = document.getElementById("lPhoneCode");
		var pcValue = phoneCode.value;
		var pattern = /^[0-9]*$/g;
		var length = phoneCode.value.length;
		lPhoneCode.style.fontSize = '12px';
		lPhoneCode.style.color = 'red';
		var flag=true;
		if (length != 9 || (!pattern.test(pcValue))) {
			lPhoneCode.innerHTML = "不符合标准，编号为9位数的数字!";
			flag=false;
		} else  {
			$.ajax({
				type : "POST",
				async : false,
				contentType:'application/x-www-form-urlencoded; charset=utf-8',
				url : "/MyPhoneWebProject/servlet/PhoneServlet",
				dataType : 'json',
				data:{
					'type':'findPhoneByCode',
					'phoneCode':pcValue
				},
			    success: function(data) {
			    	datas = eval(data);
			    	if(datas.length!=0){
			    	lPhoneCode.innerHTML = "该编号已存在!";
			    	flag=false;
			    	}
			    	else{
			    		lPhoneCode.style.color = 'green';
			    		lPhoneCode.innerHTML = "√"; 
			    	} 
			    		
		  		},
		  		error : function(error) {
		  		}	
			});
		}
		return flag;
}
function checkPhoneCodeForEdit(){
	var phoneCode = document.getElementById("phoneCode");
	var lPhoneCode = document.getElementById("lPhoneCode");
		var pcValue = phoneCode.value;
		var pattern = /^[0-9]*$/g;
		var length = phoneCode.value.length;
		lPhoneCode.style.fontSize = '12px';
		lPhoneCode.style.color = 'red';
		var flag=true;
		if (length != 9 && (!pattern.test(pcValue))) {
			lPhoneCode.innerHTML = "不符合标准!";
			flag=false;
		} else  {
			$.ajax({
				type : "POST",
				async : false,
				contentType:'application/x-www-form-urlencoded; charset=utf-8',
				url : "/MyPhoneWebProject/servlet/PhoneServlet",
				dataType : 'json',
				data:{
					'type':'findPhoneByCode',
					'phoneCode':pcValue
				},
			    success: function(data) {
			    	datas = eval(data);
			    	if(datas.length!=0 != datas[0].phoneCode==pcValue){
			    	lPhoneCode.innerHTML = "该编号已存在!";
			    	flag=false;
			    	}
			    	else {
			    		lPhoneCode.style.color = 'green';
			    		lPhoneCode.innerHTML = "√"; 
			    	} 
		  		},
		  		error : function(error) {
		  		}	
			});
		}
		return flag;
}
function checkPhoneName(){
	var phoneName = document.getElementById("phoneName");
	var lPhoneName = document.getElementById("lPhoneName");
	var pnValue = phoneName.value;
	var pnLen = phoneName.value.length;
	var pattern = /^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}$/g;
	var patternLen = /^.{8,}$/g;
	lPhoneName.style.fontSize = '12px';
	lPhoneName.style.color = 'red';
	if (pnValue == "" || pnValue == null) {
		lPhoneName.innerHTML = "机名不能为空!";
		return false;

	}
	else  {
		lPhoneName.style.color = 'green';
		lPhoneName.innerHTML = "√";  
		return true;
	}
	return false;
}
function checkPrice(){
	var price = document.getElementById("price");
	var lPrice = document.getElementById("lPrice");
	var priValue = parseInt(price.value);
	var pattern = /^[0-9]*$/g;
	lPrice.style.fontSize = '12px';
	lPrice.style.color = 'red';
	if (priValue == "" || priValue == null) {
		lPrice.innerHTML = "价钱不能为空!";
		return false;
	}
	else if(!pattern.test(priValue)){
		lPrice.innerHTML = "价钱只能为数字!";
		return false;
		
	}
	else  {
		lPrice.style.color = 'green';
		lPrice.innerHTML = "√";   
		return true;
	}
	return false;
}
 