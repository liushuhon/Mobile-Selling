/**
 * 
 */
var curUser = null;
var goodsCount = 0;
var total = 0;
var i = 0;
function showCart(){  
	 getCurUser();   
	 if(curUser!=null && curUser!=""){
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
					showMiddle(datas);
				},
				error : function(error) {
					alert("cannot find!");
				}
			});
	 }

}
/**
 * 展示订单条目
 */
function showMiddle(datas){
	goodsCount = datas.length;
	$('#Middle').html("");  
	var inputHtml = "";
		for(var i = 0; i < datas.length; i++) {
			var number = parseInt(datas[i].number);
			var kucun = parseInt(datas[i].kucun); 
			var kucunArr = new Array();
			kucunArr[i] = kucun;
			inputHtml += "<div>"
				+"<table border='0' cellpadding='0' cellspacing='0' style='height: 130px;border-bottom: 1px solid #dedede;'>"
				+"<tr >"
				+ "<td class='goods-check'> <input type='checkbox' name='cb' class='vam' onclick='checkBox("+i+")'   id=good"+i+"> </td>"
			    + "<td class='goods-img'><img src='"+datas[i].info+"'width=100px;height=100px ; style= 'border: 1px solid #dedede;'></td>"
			    + "<td class='goods-name'>"+ datas[i].phoneName +"</td>"
			    + "<td class='goods-uprice'><span>￥</span> <span id='uprice"+i+"'>"+ datas[i].price +".00</span></td>"
			    + "<td class='goods-count'>"
			    + "<div  style='position: relative;'> "
	            + "<span class='minus' id='num-jian"+i+"' onclick='num_jianonclick("+i+")'>-</span>"
	            + "<input id='input-num"+i+"' onchange='checkNum("+i+","+kucunArr[i]+")' class='pro-quantity' type='text' value='"+number+"'>"
	            + " <span class='plus' id='num-jia"+i+"' onclick='num_jiaonclick("+i+","+kucunArr[i]+")'>+</span> "
	            + "<span>&nbsp;&nbsp;库存：</span>"
	            + "<span id='remNum"+i+"'>"+(kucun-number)+"</span>"
	            + "<p class='normalLimitstock-10904718 hide' >"
	            + "<div class='sc-stock-tips limitstock' id='limitstocks"+i+"' >"
	            + "<div class='tips-style-1 tips-area'>"
	            + "<i></i>"
	            + "<div class='tips-text'>"
	            + "<p>达到购买上限</p>"
	            + "</div>"
	            + "<u></u>"
	            + "</div>"
	            + "</div>"
	            + "<p>"
	            + "</td>"
			    + "<td class='goods-price'><span>￥</span><span id='subtotal"+i+"'>"+datas[i].price*parseInt(number)+".00</span></td>" 
			    + "<td  class='goods-price'><a class='operation-btn' id='phoneCode"+i+"' value='"+datas[i].phoneCode+"' onclick='deleteGood("+ datas[i].id_middle +")'>删除</a></td>"
			    + "</tr>"
			    + "</table >"
				+ "</div>";
	} 
		
	$('#Middle').append(inputHtml);
	calculateTotal();
}
function checkNum(index,kucun){
	
	var remNum = document.getElementById("remNum"+index+"").innerHTML ;
	var subtotal = document.getElementById("subtotal"+index+"") ;
	var uprice = document.getElementById("uprice"+index+"").innerHTML;
	var input_num = document.getElementById("input-num"+index+"");
	if(input_num.value>=kucun){
		input_num.value = kucun;
		$("#remNum"+index+"").html(0); 
		 $("#limitstocks"+index+"").css("display",'block'); 
	}else if(0<input_num.value<kucun){ 
		 $("#limitstocks"+index+"").css("display",'none'); 
	}
	if(input_num.value<=0){
		input_num.value = 1;
		$("#remNum"+index+"").html(parseInt(kucun)-1);
	}
	
	$("#remNum"+index+"").html(parseInt(kucun)-parseInt(input_num.value));
	subtotal.innerHTML = ((input_num.value * uprice).toFixed(2));
	 calculateTotal();
}
/**
 * 计算总价
 */
function calculateTotal(){
	total = 0;
	for(var i=0;i<goodsCount;i++){
		if(document.getElementById("good"+i+"").checked){
		var subtotal = document.getElementById("subtotal"+i+"").innerHTML;
		total = parseInt(total + parseInt(subtotal));
		}
	}
	$("#total").html(total);
}
 
/**
 * checkbox的监听事件
 * @param index
 */

function checkBox(index){
	 var subtotal = document.getElementById("subtotal"+index+"").innerHTML;
	 var  allcheck = document.getElementById("allcheck");
	 var allcheck2= document.getElementById("allcheck2");
	 
	 if(document.getElementById("good"+index+"").checked){
		 i=i+1;
		 total = parseInt(total + parseInt(subtotal));
		 $("#total").html(total);
		 
		 if(i == goodsCount){ 
			 $("#allcheck").prop("checked", true);
			 $("#allcheck2").prop("checked", true);
			  
		 }
	 }
	 else{
		 total = parseInt(total - parseInt(subtotal));
		 $("#total").html(total);
		 $("#allcheck").attr('checked',false);
		 $("#allcheck2").attr('checked',false);
		 i=i-1;
	 }
 
}
/**
 * checkAllBox的监听事件
 */
function checkallBox(){ 
	 if(document.getElementById("allcheck").checked){
		 $("input[name=cb]").prop("checked", true);
		 $("input[name=cball]").prop("checked", true);
		 i = goodsCount;
		 calculateTotal();
	 }else{
		 $("input[name=cb]").prop("checked", false);
		 $("input[name=cball]").prop("checked", false);
		 $("#total").html(0);
		 i = 0;
		 calculateTotal();
	 }
}
function checkallBox2(){ 
	 if(document.getElementById("allcheck2").checked){
		 $("input[name=cb]").prop("checked", true);
		 $("input[name=cball]").prop("checked", true);
		 i = goodsCount;
		 calculateTotal();
	 }else{
		 $("input[name=cb]").prop("checked", false);
		 $("input[name=cball]").prop("checked", false);
		 $("#total").html(0);
		 i = 0;
		 calculateTotal();
	 }
}
/**
 * +号的监听事件
 * @param index
 */
function num_jiaonclick(index,kucun) { 
	var num_jia = document.getElementById("num-jia"+index+"");
	var num_jian = document.getElementById("num-jian"+index+"");
	var input_num = document.getElementById("input-num"+index+"");
	var remNum = document.getElementById("remNum"+index+"");
	var subtotal = document.getElementById("subtotal"+index+"");
	var uprice = document.getElementById("uprice"+index+"").innerHTML;
	input_num.value = parseInt(input_num.value) + 1;
 	if(input_num.value>=kucun){
		input_num.value = kucun;
		 $("#limitstocks"+index+"").css("display",'block'); 
		$("#remNum"+index+"").html(0);
	
		
	}
 	else{
 		$("#limitstocks"+index+"").css("display",'none'); 
 		
 		remNum.innerHTML = ( parseInt(remNum.innerHTML) - 1);
 	} 
 	
	subtotal.innerHTML = ((input_num.value * uprice).toFixed(2));
	calculateTotal();
}
/**
 * -号的监听事件
 * @param index
 */
function num_jianonclick(index) {
	$("#limitstocks"+index+"").css("display",'none'); 
	var num_jia = document.getElementById("num-jia"+index+"");
	var num_jian = document.getElementById("num-jian"+index+"");
	var input_num = document.getElementById("input-num"+index+"");
	var remNum = document.getElementById("remNum"+index+""); 
	var subtotal = document.getElementById("subtotal"+index+"");
	var uprice = document.getElementById("uprice"+index+"").innerHTML;
	if (input_num.value <= 1) {
		input_num.value = 1;
	} else {
		input_num.value = parseInt(input_num.value) - 1;
		remNum.innerHTML = ( parseInt(remNum.innerHTML) + 1);
		subtotal.innerHTML = ((input_num.value * uprice).toFixed(2));
		calculateTotal();
	}
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
/**
 * 删除商品
 */
function deleteGood(id_middle){
	alert('确定要删除吗？');
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/MiddleServlet",
		dataType : 'json',
		data : {
			'type' : 'deleteGood',
			'id' : id_middle
		},
		success : function(data) {
			showCart();
		},
		error : function(error) {
			alert("cannot delete!");
			showCart();
		}
	});
}
function goConfirmCart(){ 
	if(i == 0){
		alert("请至少选中一个商品！");
	}
	else{ 
	  for(var j=0;j<goodsCount;j++){
			if(document.getElementById("good"+j+"").checked){
				var phoneCode = $("#phoneCode"+j+"").attr("value");
				var number = $("#input-num"+j+"").val();
				changeGoodMark1(phoneCode,number);
			}
	  }

	  location.href="../html/ConfirmCart.html";  
}
}
function changeGoodMark1(phoneCode,number){ 	  
	  $.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/MyPhoneWebProject/servlet/MiddleServlet",
			dataType : 'json',
			data : {
				'type' : 'changeGoodMark1',
				'goodCode' : phoneCode,
				'number':number
			},
			success : function(data) {
			},
			error : function(error) {
				 
			}
		});
 
}
