/**
 * 
 */
var isSearch = false;
var showInfo = function() {
	if(isSearch=== false) {
		findPhone();
	}
}
function findPhone(){
	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/PhoneServlet",
		dataType : 'json',
		data:{
			'type':'find'
		},
		  success : function(data) {
			 datas = eval(data);
			 showPhoneData(datas);   
			 findPhoneOrderByIdByLimit(5,1);
	  		},
	  		error : function(error) {
	  			alert("添加失败");
	  		}	
	  });
}

var pageSize = 5;  //每页大小
var currentPage = 1;  // 当前第几页
var total = 0; // 一共有多少条数据
function showPhone(type) {
	if((currentPage-1) * pageSize < total && currentPage * pageSize > 0){
		 findPhoneOrderByIdByLimit();
	}
	else{
		if(type==="next") {
			currentPage--;
		}
		else{
			currentPage++;
		}
	}
}
/*
 * 下一页
 */
function nextPage(){
	currentPage++;
	showPhone("next");
}
/*
 * 上一页
 */
function previousPage() {
	currentPage--;
	showPhone("previous");
}
/**
 *  浏览学生信息
 */
 
function  findPhoneOrderByIdByLimit() {
	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/PhoneServlet",
		dataType : 'json',
		data:{
			'type':'findPhoneOrderByIdByLimit',
			'pageSize' : pageSize,
			'currentPage' : currentPage
		},
		success : function(data) {
			datas = eval(data);
			var phone = datas.phones;
			total = datas.total;
			if(currentPage == 1) {
				showTotalPageInfo();
			}
			showPhoneData(phone);
			showCurrentPage();
	  	},
	  	error : function(error) {
	  		alert("添加失败");
	  	}	
	});
}
var totalPage = 0;
/*
 * 把总页数传给totalPage
 */
function showTotalPageInfo() {
	if(total % pageSize == 0) {
		totalPage = total / pageSize;
	}
	else{
		totalPage = parseInt(total / pageSize) + 1; 
	}
	$("#totalPage").html(totalPage);  
}
/*
 * 第一页
 */
function firstPage() {
	currentPage = 1;
	findPhoneOrderByIdByLimit();
}
/*
 * 最后一页
 */
function lastPage() {
	currentPage = totalPage;
	findPhoneOrderByIdByLimit();
}
/*
 * 把当前页数传给currentPage
 */
function showCurrentPage() {
	$("#currentPage").html(currentPage);
}
/*
 * 输出学生信息
 */
function showPhoneData(datas){
	$('#table').html(""); //清空table
	var inputHtml = "<tr class='single-color'><td class='td1'>型号</td><td>机名</td><td>价格</td><td>数量</td><td>图片</td><td style='width: 18%;'>操作</td></tr>";
	for(var i = 0; i < datas.length; i++) {
		if(i % 2 == 1) {
			inputHtml += "<tr class='single-color'>"
			    + "<td class='padding-top-tr'>"+ datas[i].phoneCode +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].phoneName +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].price +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].kucun +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].image +"</td>"
			    + "<td><a class='operation-btn' onclick='deleteData("+ datas[i].phoneCode +")'>删除</a> <a class='operation-btn'  onclick='editPhoneByCode("+ datas[i].phoneCode +",1)'>编辑</a></td>"
			    + "</tr>";
		}
		else{
			inputHtml += "<tr class='double-color'>"
			    + "<td class='padding-top-tr'>"+ datas[i].phoneCode +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].phoneName +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].price +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].kucun +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].image +"</td>"
			    + "<td ><a class='operation-btn' onclick='deleteData("+ datas[i].phoneCode +")'>删除</a> <a class='operation-btn'  onclick='editPhoneByCode("+ datas[i].phoneCode +",1)'>编辑</a></td>"
			    + "</tr>";
		}
		
	}
	$('#table').append(inputHtml);
}

/*
 * 模糊查询
 */
function searchPhoneByMark() {
	var mark  = document.getElementById("phonemark").value;
	var value = document.getElementById("phonevalue").value;
	// 如果搜索框内没填内容
	if(value==="") {
		findPhoneOrderByIdByLimit();
	}
	else{
	// 如果搜索框内填了内容
		searchPhone(value,mark);
	}
}
/*
 * 模糊查询
 */
function searchPhone(value,mark){
	
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/PhoneServlet", 
		dataType : 'json',
		data : {
			'type' : "searchPhone",
			'mark' : mark,
			'value':value
		},
		success : function(data) {
			var datas = eval(data);
			$("#table").html("");
			var result = "<tr class='single-color'><td class='td1'>型号</td><td>机名</td><td>价格</td><td>数量</td><td>图片</td><td style='width: 18%;'>操作</td></tr>";
			for (var i = 0; i < datas.length; i++) {
				if(i % 2 == 1) {
					result += "<tr class='single-color'>"
					    + "<td class='padding-top-tr'>"+ datas[i].phoneCode +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].phoneName +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].price +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].kucun +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].image +"</td>"
					    + "<td><a class='operation-btn' onclick='deleteData("+ datas[i].phoneCode +")'>删除</a> <a class='operation-btn' onclick='editPhoneByCode("+ datas[i].phoneCode + ",1)'>编辑</a></td>"
					    + "</tr>";
				}
				else{
					result += "<tr class='double-color'>"
						 + "<td class='padding-top-tr'>"+ datas[i].phoneCode +"</td>"
						    + "<td class='padding-top-tr'>"+ datas[i].phoneName +"</td>"
						    + "<td class='padding-top-tr'>"+ datas[i].price +"</td>"
						    + "<td class='padding-top-tr'>"+ datas[i].kucun +"</td>"
						    + "<td class='padding-top-tr'>"+ datas[i].image +"</td>"
						    + "<td><a class='operation-btn' onclick='deleteData("+ datas[i].phoneCode +")'>删除</a> <a class='operation-btn' onclick='editPhoneByCode("+ datas[i].phoneCode + ",1)'>编辑</a></td>"
						    + "</tr>";
				}
			}
			$("#table").append(result);
		},
		error : function(error) {
			alert("查询失败");
		}
	});	
}
 
/*
 * 按ID删除
 */
function deleteData(id){
	var id = id;
	if(confirm("确定要删除吗？")){
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/PhoneServlet",
		dataType : 'json',
		data:{
			'type':'delete',
			'phoneCode':id, 
		},
		success : function(data) { 
			findPhone();
      	},
      	error : function(error) {
      		findPhone();
      	}
      	});  
	}
	else{
		window.event.returnValue = false;
	}

}
