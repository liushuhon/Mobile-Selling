/**
 * 
 */
/**
 * 获取URL后的ID
 */

var curUser = null;
var curPhoneCode = GetQueryString('curPhoneCode');
var numbers = null;
numbers = GetQueryString('number');
var orderId = null;
var goodsCount = 0;
var addressCount = 0;
var uaddress = null;
var total = 0;
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
function showConfirmCart(){
	getCurUser();   
	if(curUser!=null && curPhoneCode==null){
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/MiddleServlet",
		dataType : 'json',
		data : {
			'type' : 'showConfirmMiddle',
			'curUser' : curUser
		},
		success : function(data) {
			datas = eval(data);
			showMiddle(datas);
		},
		error : function(error) {
			alert("cannot find!");
		}
	});
	}else{
		$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/MyPhoneWebProject/servlet/PhoneServlet",
			dataType : 'json',
			data : {
				'type' : 'findPhoneByCode',
				'phoneCode' : curPhoneCode
			},
			success : function(data) {
				datas = eval(data);
				showMiddle(datas);
			},
			error : function(error) {
				alert("cannot find!");
			}
		});
	}
	queryAddress(curUser); //查询地址
}
function queryAddress(user){
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/AddressServlet",
		dataType : 'json',
		data : {
			'type' : 'findAddress',
			'userCode' : curUser
		},
		success : function(data) {
			datas = eval(data);
			showAddress(datas);
		},
		error : function(error) {
			alert("cannot find!");
		}
	});
}
function showAddress(datas){
	 $('#addressArea').html("");
	 var inhtml = "";
	 
	for(var i = 0;i<datas.length;i++){
		inhtml += ""
			var a = datas[i].name+datas[i].address+datas[i].telnumber;
		inhtml += "<div class='address'><input type=radio name='radio' id='radio"+i+"' value='"+a+"'>"+datas[i].name+"&nbsp;&nbsp;"+datas[i].address+"&nbsp;&nbsp;"+datas[i].telnumber+"</div>"
	  
	}
	addressCount = datas.length;
	$('#addressArea').append(inhtml);
	
} 
function showMiddle(datas){
	goodsCount = datas.length;
	$('#Middle').html(""); //清空div
	var inputHtml = "";
		for(var i = 0; i < datas.length; i++) {
			var number = 0;
			if(numbers!=null  ){
					number = numbers;
			}
			else{

				 number = findNumber(datas[i].phoneCode);
			}
			 
			inputHtml += "<div >"
				+"<table border='0' cellpadding='0' cellspacing='0' class='eveygood-tab'>"
				+"<tr >"
				+ "<td class='goods-name font17'><span>"+ datas[i].phoneName +"</span></td>"
			    + "<td class='titletab-other font17'><span>￥</span> <span id='uprice"+i+"'>"+ datas[i].price +".00</span></td>"
	            +"<td class='titletab-other font17'><em>X</em><em id='count"+i+"'>"+parseInt(number)+"</td>"
			    + "<td class='titletab-other font17'><span>￥</span><span id='subtotal"+i+"'>"+parseInt(datas[i].price)* parseInt(number)+".00</span></td>" 
			    + "</tr>"
			    + "</table >"
				+ "</div>";
	} 
		
	$('#Middle').append(inputHtml);
	calculatesubtotal();
	calculateTotal();
	
}
function findNumber(phoneCode){
	var number = 0;
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/MiddleServlet",
		dataType : 'json',
		data : {
			'type' : 'findNumber',
			'phoneCode' : phoneCode
		},
		success : function(data) {
			datas = eval(data); 
			number = datas[0].number;
		},
		error : function(error) {
			alert("cannot find!");
		}
		
	});
	return number;
}
function calculatesubtotal(){
	for(var i=0;i<goodsCount;i++){
		var count = document.getElementById("count"+i+"").innerHTML; 
		var uprice = document.getElementById("uprice"+i+"").innerHTML; 
		var subtotal1 = document.getElementById("subtotal"+i+""); 
		subtotal1.innerHTML = parseInt(parseInt(count) * parseInt(uprice));
	}
}
/**
 * 提交订单按钮的监听事件
 */
function submitOrder(){
	/**
	 * 增加订单
	 */ 
	if(chooseAddress() == true){
		$.ajax({
			type : "POST",
			url : "/MyPhoneWebProject/servlet/OrderServlet",
			dataType : 'json',
			async : false,
			data : {
				'type' : 'addOrder',
				'userCode' : curUser,
				'address' : uaddress
			},
			success : function(data) {
				var c = eval(data); 
				orderId = c; 
			},
			error : function(error) { 
			}
		});
		/**
		 *  由购物车到提交订单
		 */
		if(curPhoneCode == ''|| curPhoneCode == null){
		$.ajax({
			type : "POST",
			async : false,
			url : "/MyPhoneWebProject/servlet/OrderInfoServlet",
			dataType : 'json',
			data : {
				'type' : 'addOrderInfo',
				'curUser' :curUser,
				'orderId' :orderId
			},
			success : function(data) { 
				 
			},
			error : function(error) {
				alert("添加失败");
			}
		});
		/**
		 * 删除middle表中mark=1的记录
		 */
		$.ajax({
			type : "POST",
			async : false,
			url : "/MyPhoneWebProject/servlet/MiddleServlet",
			dataType : 'json',
			data : {
				'type' : 'deleteBuyGood',
				'curUser' :curUser
			},
			success : function(data) {   
			},
			error : function(error) {
				alert("删除失败1");
			}
		});
		/**
		 * 减少库存
		 */
		$.ajax({
			type : "POST",
			async : false,
			url : "/MyPhoneWebProject/servlet/PhoneServlet",
			dataType : 'json',
			data : {
				'type' : 'deInventory',
				'orderId' :orderId
			},
			success : function(data) {  
				alert('提交成功');
				location.href="../html/CreateOrder.html";
			},
			error : function(error) {
				alert("删除失败2");
			}
			});
		}
		/**
		 *  直接提交订单
		 */
		else{
			$.ajax({
				type : "POST",
				async : false,
				url : "/MyPhoneWebProject/servlet/OrderInfoServlet",
				dataType : 'json',
				data : {
					'type' : 'addOrderInfoForDirect',
					'orderId' :orderId,
					'curPhoneCode' :curPhoneCode,
					'number' :numbers
				},
				success : function(data) { 
					 
				},
				error : function(error) {
					alert("添加失败");
				}
			});
			/**
			 * 删除middle表中mark=1的记录
			 */
			$.ajax({
				type : "POST",
				async : false,
				url : "/MyPhoneWebProject/servlet/MiddleServlet",
				dataType : 'json',
				data : {
					'type' : 'deleteBuyGoodForDirect',
					'curUser' :curUser,
					'phoneCode' : curPhoneCode
					
				},
				success : function(data) {   
				},
				error : function(error) {
					alert("删除失败1");
				}
			});
			/**
			 * 减少库存
			 */
			$.ajax({
				type : "POST",
				async : false,
				url : "/MyPhoneWebProject/servlet/PhoneServlet",
				dataType : 'json',
				data : {
					'type' : 'deInventory',
					'orderId' :orderId
				},
				success : function(data) {  
					alert('提交成功');
					location.href="../html/CreateOrder.html";
				},
				error : function(error) {
					alert("删除失败2");
				}
				});
			}
	}
	else{
		
	}
	
}
/**(
 * 计算总价
 */
function calculateTotal(){
	total = 0;
	for(var i=0;i<goodsCount;i++){
		var subtotal = document.getElementById("subtotal"+i+"").innerHTML; 
		total = parseInt(total + parseInt(subtotal));
	}
	$("#total").html(total);
}
function popBox(){
	document.getElementById('light').style.display='block'; 
	document.getElementById('fade').style.display='block';
	 
}
function closePopBox(){
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
}
function saveAddInfo(){
	var consigner = document.getElementById("consigner").value;
	var address = "";
	address += document.getElementById("cmbProvince").value;
	address += document.getElementById("cmbCity").value;
	address += document.getElementById("cmbArea").value;
	address += document.getElementById("address").value;
	 
	var phoneNum = document.getElementById("phoneNum").value;
	var inhtml = "";
	var a = consigner+address+phoneNum;
	inhtml += "<div class='address'><input type=radio name='radio' value="+a+" id='radio"+(addressCount+1)+"'>"+consigner+"&nbsp;&nbsp;"+address+"&nbsp;&nbsp;"+phoneNum+"</div>"
 
	$('#addressArea').append(inhtml);
 	closePopBox();
}
var allNumber = 0;
function goBack(){
     
   /* changeGoodMark0(curUser);*/
	findMiddleMark1();
	
    location.href="../html/Index.html";
}
function changeGoodMark0(curUser){ 	  
	  $.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/MyPhoneWebProject/servlet/MiddleServlet",
			dataType : 'json',
			data : {
				'type' : 'changeGoodMark0',
				'curUser' : curUser 
			},
			success : function(data) {
			},
			error : function(error) {
				 
			}
		});curUser
 
}
function findMiddleMark1(){
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/MiddleServlet",
		dataType : 'json',
		data : {
			'type' : 'findMiddleMark1',
			'curUser' : curUser 
		},
		success : function(data) {
			datas = eval(data);
			for(var i = 0 ;i<datas.length;i++){
				if(findPhoneExistInMiddle(datas[i])==true){
					$.ajax({
						type : "POST",
						async : false,
						url : "/MyPhoneWebProject/servlet/MiddleServlet",
						dataType : 'json',
						data : {
							'type' : 'updateNumber',
							'phoneCode' : datas[i].phoneId,
							'cartCode' : datas[i].cartId,
							'number' : allNumber
						},
						success : function(data) {
							$("#pro-popup-area").css("display","block");
							deletePhoneMark1(datas[i]);
						},
						error : function(error) {
							alert("添加失败");
						}
					});
					
				} else{
					changeGoodMark0(curUser);
				}
				allNumber = 0;
			}
		},
		error : function(error) {
			 
		}
	});
}
function deletePhoneMark1(data){
	$.ajax({
		type : "POST",
		async : false,
		url : "/MyPhoneWebProject/servlet/MiddleServlet",
		dataType : 'json',
		data : {
			'type' : 'deletePhoneMark1',
			'phoneCode' : data.phoneId,
			'cartCode' : data.cartId
		},
		success : function(data) {  
		},
		error : function(error) {
			alert("删除失败");
		}
	});
}
function findPhoneExistInMiddle(data){
	var exist = true;
	var phoneCode = data.phoneId;
	var cartID = data.cartId;
	var number = data.number;
	$.ajax({
		type : "POST",
		async : false,
		url : "/MyPhoneWebProject/servlet/MiddleServlet",
		dataType : 'json',
		data : {
			'type' : 'findPhoneExistInMiddle',
			'phoneCode' : phoneCode,
			'cartCode' : cartID
		},
		success : function(data) { 
			datas = eval(data); 
			if(datas.length == 0){
				exist = false;
			}else { 
				allNumber = parseInt(number) + parseInt(datas[0].number);
				exist = true;
			}
		},
		error : function(error) {
			alert("添加失败");
		}
	});
	return exist;
}
function chooseAddress(){
     
       var val=$('input:radio[name="radio"]:checked').val();
       if(val==null){
           alert("请选中一个地址!");
           return false;
       }
       else{ 
    	   uaddress = val;
           return true;
       }
       var list= $('input:radio[name="radio"]:checked').val();
       if(list==null){ 
           return false;
       }
       else{
          
       }          
     
    return false;
}