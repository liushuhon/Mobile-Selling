/**
 * 
 */
var curUser = null; 
var goodsCount = 0;
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
function OrderView(){
	 getCurUser();   
	if(curUser=="" || curUser==null){
		alert('请登陆！');
		location.href="../html/Login.html";
	} 
	$.ajax({
		type : "POST", 
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/OrderServlet",
		dataType : 'json',
		data : {
			'type' : 'selectOrderCode',
			'curUser' : curUser
		},
		success : function(data) {
			datas = eval(data);
			var orderLength = datas.length;
			if(datas.length==0){
				alert('你还没有下订单');
			}else{
				for(var i = 0 ;i<orderLength;i++){
					showEachOrder(datas[i]);
				}
			}
		},
		error : function(error) {
			alert("cannot find!");
		}
	});
}
function showEachOrder(order) {
	var orderCode = order.orderCode;
	var time = order.time;
	$.ajax({
		type : "POST",  
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/OrderInfoServlet",
		dataType : 'json',
		data : {
			'type' : 'selectOrderInfoByOrderCode',
			'orderCode' : orderCode
		},
		success : function(data) {
			datas = eval(data);
			showOrderInfoByOrderCode(datas);
		},
		error : function(error) {
			alert("cannot find!");
		}
	});
}
var totalIndex = 0;
var j = 0;
function showOrderInfoByOrderCode(datas){
	var inputHtml = "";
	inputHtml += "<div class='orderTitle'><span class='orderSpan'>下单时间："+datas[0].time+"</span><span>&nbsp;&nbsp;订单号："+datas[0].orderId+" </span><span id='total"+totalIndex+"'>&nbsp;&nbsp;总价： </span><span>&nbsp;&nbsp;状态："+datas[0].orderState+" </span></div>"
	goodsCount = datas.length;
	inputHtml += "<div style='border: 1px solid #dedede;margin-bottom: 20px;'>";
	for(var i = 0; i < goodsCount; i++) {
		var number = datas[i].number;
		inputHtml +=
			"<table border='0' cellpadding='0' cellspacing='0' class='eveygood-tab'>"
			+"<tr >"
		    +"<td class='goods-img'><img src='"+datas[i].info+"'width=64px;height=64px;style='padding-left: 10px;' ></td>"
			+"<td class='goods-name'><span>"+ datas[i].phoneName +"</span></td>"
		    +"<td class='titletab-other'><span>￥</span> <span id='uprice"+j+""+i+"'>"+ datas[i].price +".00</span></td>"
            +"<td class='titletab-other'><em>X</em><em class='num' id='coun"+j+""+i+"'>"+number+"</td>"
		    +"<td class='titletab-other'><span>￥</span><span class='num' id='subtotal"+j+""+i+"'>"+parseInt(datas[i].price)*parseInt(number)+".00</span></td>" 
		    +"</tr>"
		    +"</table >";
	}
	inputHtml += "</div>";
	$('#viewOrder').append(inputHtml);
	calculateTotal();
	j = j + 1;
}
 
function calculateTotal(){
	var total = 0; 
	for(var i=0;i<goodsCount;i++){
		var subtotal = $("#subtotal"+j+""+i+"").text(); 
		total = parseInt(total) + parseInt(subtotal);
	} 
	$("#total"+totalIndex+"").html( "&nbsp;&nbsp;总价:<span class='totalMoney'>￥"+total+"</span><span style='color: #E01D25;'>.00<span>" );
	totalIndex += 1; 
	
}
/*function findNumber(phoneCode){
	var number = 0;
	$.ajax({
		type : "POST", 
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/OrderInfoServlet",
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
}*/