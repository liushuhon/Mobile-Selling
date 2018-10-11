/**
 * 
 */
var isSearch = false;
var showInfo = function() {
	if(isSearch=== false) {
		findOrderByIdByLimit(5,1);
	}
}
function findOrder(){
/*	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/OrderServlet",
		dataType : 'json',
		data:{
			'type':'find'
		},
		  success : function(data) {
			 datas = eval(data);
			 showData(datas);   
			 findUserOrderByIdByLimit(5,1);
	  		},
	  		error : function(error) {
	  			alert("添加失败");
	  		}	
	  });*/
	findOrderByIdByLimit(5,1);
}

var pageSize1 = 5;  //每页大小
var currentPage1 = 1;  // 当前第几页
var total1 = 0; // 一共有多少条数据
function showOrder(type) {
	if((currentPage1-1) * pageSize1 < total1 && currentPage1 * pageSize1 > 0){
		 findOrderByIdByLimit();
	}
	else{
		if(type==="next") {
			currentPage1--;
		}
		else{
			currentPage1++;
		}
	}
}
/*
 * 下一页
 */
function nextPage1(){
	currentPage1++;
	showOrder("next");
}
/*
 * 上一页
 */
function previousPage1() {
	currentPage1--;
	showOrder("previous");
}
/**
 *  浏览学生信息
 */
 
function  findOrderByIdByLimit() {
	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/OrderServlet",
		dataType : 'json',
		data:{
			'type':'findAllOrderByIdByLimit',
			'pageSize' : pageSize1,
			'currentPage' : currentPage1
		},
		success : function(data) {
			datas = eval(data);
			var order = datas.orders;
			total1 = datas.total;
			if(currentPage1 == 1) {
				showTotalOrderPageInfo();
			}
			showOrderData(order);
			showCurrentPage1();
	  	},
	  	error : function(error) {
	  		alert("添加失败");
	  	}	
	});
}
var totalPage1 = 0;
/*
 * 把总页数传给totalPage
 */
function showTotalOrderPageInfo() {
	if(total1 % pageSize1 == 0) {
		totalPage1 = total1 / pageSize1;
	}
	else{
		totalPage1 = parseInt(total1 / pageSize1) + 1; 
	}
	$("#totalPage1").html(totalPage1);  
}
/*
 * 第一页
 */
function firstPage1() {
	currentPage1 = 1;
	findOrderByIdByLimit();
}
/*
 * 最后一页
 */
function lastPage1() {
	currentPage1 = totalPage1;
	findOrderByIdByLimit();
}
/*
 * 把当前页数传给currentPage
 */
function showCurrentPage1() {
	$("#currentPage1").html(currentPage1);
}
/*
 * 输出学生信息
 */
function showOrderData(datas){
	$('#orderTable').html(""); //清空table
	var inputHtml = "<tr class='single-color'><td class='td1'>订单编号</td><td>订单人</td><td>下单时间</td><td>订单状态</td><td style='width: 18%;'>操作</td></tr>";
	for(var i = 0; i < datas.length; i++) {
		if(i % 2 == 1) {
			inputHtml += "<tr class='single-color'>"
			    + "<td class='padding-top-tr'>"+ datas[i].orderCode +"</td>"  
			    + "<td class='padding-top-tr'>"+ datas[i].userId +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].time +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].orderState +"</td>"
			    + "<td><a class='operation-btn'   onclick=' delivery("+ datas[i].id +") '>发货</a> <a class='operation-btn'  onclick='viewOrder("+ datas[i].orderCode +")'>查看订单</a></td>"
			    + "</tr>";
		}
		else{
			inputHtml += "<tr class='double-color'>"
				+ "<td class='padding-top-tr'>"+ datas[i].orderCode +"</td>"  
				+ "<td class='padding-top-tr'>"+ datas[i].userId +"</td>"
				+ "<td class='padding-top-tr'>"+ datas[i].time +"</td>"
				+ "<td class='padding-top-tr'>"+ datas[i].orderState +"</td>"
			    + "<td ><a class='operation-btn'   onclick='delivery("+ datas[i].id +")'>发货 </a> <a class='operation-btn'  onclick='viewOrder("+ datas[i].orderCode +")'>查看订单</a></td>"
			    + "</tr>";
		}
		
	}
	$('#orderTable').append(inputHtml);
}

/*
 * 模糊查询
 */
function searchOrderByMark() {
	var mark  = document.getElementById("ordermark").value;
	var value = document.getElementById("ordervalue").value;
	// 如果搜索框内没填内容
	if(value==="") {
		findOrderByIdByLimit();
	}
	else{
	// 如果搜索框内填了内容
		searchOrder(value,mark);
	}
}
/*
 * 模糊查询
 */
function searchOrder(value,mark){
	
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/OrderServlet", 
		dataType : 'json',
		data : {
			'type' : "searchOrderByMark",
			'mark' : mark,
			'value':value
		},
		success : function(data) {
			var datas = eval(data);
			$("#orderTable").html("");
			var result = "<tr class='single-color'><td class='td1'>订单编号</td><td>订单人</td><td>下单时间</td><td>订单状态</td><td style='width: 18%;'>操作</td></tr>";
			for (var i = 0; i < datas.length; i++) {
				if(i % 2 == 1) {
					result += "<tr class='single-color'>"
					    + "<td class='padding-top-tr'>"+ datas[i].orderCode +"</td>"  
					    + "<td class='padding-top-tr'>"+ datas[i].userId +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].time +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].orderState +"</td>"
					    + "<td><a class='operation-btn'   onclick='delivery("+ datas[i].id +")'>发货 </a> <a class='operation-btn'  onclick='viewOrder("+ datas[i].orderCode +")'>查看订单</a></td>"
					    + "</tr>";
				}
				else{
					result += "<tr class='single-color'>"
					    + "<td class='padding-top-tr'>"+ datas[i].orderCode +"</td>"  
					    + "<td class='padding-top-tr'>"+ datas[i].userId +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].time +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].orderState +"</td>"
					    + "<td><a class='operation-btn'   onclick='delivery("+ datas[i].id +")'>发货 </a> <a class='operation-btn'  onclick='viewOrder("+ datas[i].orderCode +")'>查看订单</a></td>"
					    + "</tr>";
				}
			}
			$("#orderTable").append(result);
		},
		error : function(error) {
			alert("查询失败");
		}
	});	
}
 
/*
 * 按ID删除
 */
function delivery(id){
	var id = id;
	var state = '已发货';
	/*if(orderState===state){
		alert("您已经发货");
	}else{*/
		if(confirm("确定要发货吗？")){
			
			$.ajax({
				type : "POST",
				url : "/MyPhoneWebProject/servlet/OrderServlet",
				dataType : 'json',
				data:{
					'type':'changeOrderState',
					'orderId':id, 
					'orderState':'已发货'
				},
				success : function(data) { 
					findOrder();
		      	},
		      	error : function(error) {
		      		findOrder();
		      	}
		      	});   
			}
			else{
				window.event.returnValue = false;
			}


}

function viewOrder(orderId){
	showViewOrder();
	$.ajax({
		type : "POST",  
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/OrderInfoServlet",
		dataType : 'json',
		data : {
			'type' : 'selectOrderInfoByOrderCode',
			'orderCode' : orderId
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
		    +"<td class='titletab-other'><span>￥</span> <span id='uprice"+j+""+i+"'>"+ datas[i].price +"</span></td>"
            +"<td class='titletab-other'><em>X</em><em class='num' id='coun"+j+""+i+"'>"+number+"</td>"
		    +"<td class='titletab-other'><span>￥</span><span class='num' id='subtotal"+j+""+i+"'>"+parseInt(datas[i].price)*parseInt(number)+"</span></td>" 
		    +"</tr>"
		    +"</table >";
	}
	inputHtml += "</div>";
	$('#viewOrder').html(inputHtml);
	calculateTotal();
	j = j + 1;
}
function calculateTotal(){
	var total = 0; 
	for(var i=0;i<goodsCount;i++){
		var subtotal = $("#subtotal"+j+""+i+"").text(); 
		total = parseInt(total) + parseInt(subtotal);
	} 
	$("#total"+totalIndex+"").html( "&nbsp;&nbsp;总价:<span class='totalMoney'>￥"+total+"</span><span style='color: #E01D25;'><span>" );
	totalIndex += 1; 
	
}