var curPhoneCode = GetQueryString('phoneCode');
var curUser = null;
var cartID = null;
var kucun = null;
$( document ).ready(function(){
	 getCurUser();   
})
if (curPhoneCode == null || curPhoneCode == "") {
	alert("curPhoneCode is null");
} else {
	findGoodByCode();
}
function findGoodByCode() {
		$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/PhoneServlet",
		dataType : 'json',
		data : {
			'type' : 'findPhoneByCode',
			'phoneCode' : curPhoneCode
		},
		success : function(data) {
			datas = eval(data);
			kucun = datas[0].kucun;
			showGood(datas[0]);
			
		},
		error : function(error) {
			alert("cannot find!");
		}
	});
}
function showGood(data) {
	$("#titlePhoneName").html(data.phoneName);
	$("#phoneName").html(data.phoneName);
	$("#phoneCode").html(data.phoneCode);
	curGoodCode = data.phoneCode;
	$("#price").html("¥&nbsp;" + data.price + "");
	$("#phoneCode").html(data.phoneCode);
	$("#phoneCount").html(data.kucun);
	
	$("#photo").html(
			'<img src="' + data.info+ '" style="   width: 100%;  height: 100%;">');
}
/**
 * 获取URL后的ID
 */

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

var num_jia = document.getElementById("num-jia");
var num_jian = document.getElementById("num-jian");
var input_num = document.getElementById("input-num");

function num_jiaonclick() {
	var num_jia = document.getElementById("num-jia");
	var num_jian = document.getElementById("num-jian");
	var input_num = document.getElementById("input-num");
	if(input_num.value>=kucun){
		input_num.value = kucun;
	}
	else{

		input_num.value = parseInt(input_num.value) + 1;
	}
}

function num_jianonclick() {
	var num_jia = document.getElementById("num-jia");
	var num_jian = document.getElementById("num-jian");
	var input_num = document.getElementById("input-num");
	if (input_num.value <= 1) {
		input_num.value = 1;
	} else {

		input_num.value = parseInt(input_num.value) - 1;
	}

}
function checkNum(){
	var input_num = document.getElementById("input-num");
	if(input_num.value>kucun){
		input_num.value = kucun;
	}
	if(input_num.value<=0){
		input_num.value = 1;
	}
}
 var buyCount = null;
function addCart() {
	if (curUser == null || curUser == "") {
		alert("请先登录！");
		location.href = "../html/Login.html"
	} else {
		 buyCount = $("#input-num").val();
		if (findExist() == false) {
			$.ajax({
				type : "POST",
				url : "/MyPhoneWebProject/servlet/CartServlet",
				dataType : 'json',
				async : false,
				data : {
					'type' : 'addCart',
					'userCode' : curUser
				},
				success : function(data) {
					var c = eval(data);
					cartID = c;
				},
				error : function(error) {
				}
			});
		}
		if (cartID != null) {
			if(findPhoneExistInMiddle()==false){
				$.ajax({
					type : "POST",
					async : false,
					url : "/MyPhoneWebProject/servlet/MiddleServlet",
					dataType : 'json',
					data : {
						'type' : 'addMiddle',
						'phoneCode' : curPhoneCode,
						'cartCode' : cartID,
						'number' : buyCount,
						'mark' : 0
					},
					success : function(data) {
						$("#pro-popup-area").css("display","block");
						 
					},
					error : function(error) {
						alert("添加失败");
					}
				});
			}else{
				$.ajax({
					type : "POST",
					async : false,
					url : "/MyPhoneWebProject/servlet/MiddleServlet",
					dataType : 'json',
					data : {
						'type' : 'updateNumber',
						'phoneCode' : curPhoneCode,
						'cartCode' : cartID,
						'number' : buyCount
					},
					success : function(data) {
						$("#pro-popup-area").css("display","block");
						 
					},
					error : function(error) {
						alert("添加失败");
					}
				});
			}
			
		
			
			
			
		}
	}
}
function gotoCart(){
	location.href="../html/cart.html";
}
function findPhoneExistInMiddle(){
	var exist = true;
	$.ajax({
		type : "POST",
		async : false,
		url : "/MyPhoneWebProject/servlet/MiddleServlet",
		dataType : 'json',
		data : {
			'type' : 'findPhoneExistInMiddle',
			'phoneCode' : curPhoneCode,
			'cartCode' : cartID
		},
		success : function(data) { 
			datas = eval(data); 
			if(datas.length == 0){
				exist = false;
			}else { 
				buyCount = parseInt(buyCount) + parseInt(datas[0].number);
				exist = true;
			}
		},
		error : function(error) {
			alert("添加失败");
		}
	});
	return exist;
}
function findExist() {
	var isExist = true;
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/CartServlet",
		async : false,
		dataType : 'json',
		data : {
			'type' : 'findCartExist',
			'userCode' : curUser
		},
		success : function(data) {
			var datas = eval(data);
			if (datas.length == 0) {
				isExist = false;
			}

			else {
				cartID = datas[0].cartCode;
				isExist = true;
			}

		},
		error : function(error) {
		}
	});
	return isExist;
}

function orderNow() {
	if (curUser == null || curUser == "") {
		alert("请先登录！");
		location.href = "../html/Login.html";
	} else {
		var buyCount1 = $("#input-num").val();
		if (findExist() == false) {
			$.ajax({
				type : "POST",
				url : "/MyPhoneWebProject/servlet/CartServlet",
				dataType : 'json',
				async : false,
				data : {
					'type' : 'addCart',
					'userCode' : curUser
				},
				success : function(data) {
					var c = eval(data);
					alert(c);
					cartID = c;
				},
				error : function(error) {
				}
			});
		}
		if (cartID != null) {
			$.ajax({
				type : "POST",
				async : false,
				url : "/MyPhoneWebProject/servlet/MiddleServlet",
				dataType : 'json',
				data : {
					'type' : 'addMiddle',
					'phoneCode' : curPhoneCode,
					'cartCode' : cartID,
					'number' : buyCount1,
					'mark' : 1
				},
				success : function(data) {
					location.href = "../html/ConfirmCart.html?curPhoneCode="+curPhoneCode+"&number="+buyCount1;
				},
				error : function(error) {
					alert("添加失败");
				}
			});
		}
	}
}
function closePopup(){
	$("#pro-popup-area").css("display","none");
}