/**
 * 
 */
var isSearch = false;
var showInfo = function() {
	if(isSearch=== false) {
		findUserOrderByIdByLimit(5,1);
	}
}
function findUser(){
/*	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/UserServlet",
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
	findUserOrderByIdByLimit(5,1);
}

var pageSize0 = 5;  //每页大小
var currentPage0 = 1;  // 当前第几页
var total0 = 0; // 一共有多少条数据
function showUser(type) {
	if((currentPage0-1) * pageSize0 < total0 && currentPage0 * pageSize0 > 0){
		 findUserOrderByIdByLimit();
	}
	else{
		if(type==="next") {
			currentPage0--;
		}
		else{
			currentPage0++;
		}
	}
}
/*
 * 下一页
 */
function nextPage0(){
	currentPage0++;
	showUser("next");
}
/*
 * 上一页
 */
function previousPage0() {
	currentPage0--;
	showUser("previous");
}
/**
 *  浏览学生信息
 */
 
function  findUserOrderByIdByLimit() {
	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'json',
		data:{
			'types':'findUserOrderByIdByLimit',
			'pageSize' : pageSize0,
			'currentPage' : currentPage0
		},
		success : function(data) {
			datas = eval(data);
			var user = datas.users;
			total0 = datas.total;
			if(currentPage0 == 1) {
				showTotalUserPageInfo();
			}
			showData(user);
			showCurrentPage0();
	  	},
	  	error : function(error) {
	  		alert("添加失败");
	  	}	
	});
}
var totalPage0 = 0;
/*
 * 把总页数传给totalPage
 */
function showTotalUserPageInfo() {
	if(total0 % pageSize0 == 0) {
		totalPage0 = total0 / pageSize0;
	}
	else{
		totalPage0 = parseInt(total0 / pageSize0) + 1; 
	}
	$("#totalPage0").html(totalPage0);  
}
/*
 * 第一页
 */
function firstPage0() {
	currentPage0 = 1;
	findUserOrderByIdByLimit();
}
/*
 * 最后一页
 */
function lastPage0() {
	currentPage0 = totalPage0;
	findUserOrderByIdByLimit();
}
/*
 * 把当前页数传给currentPage
 */
function showCurrentPage0() {
	$("#currentPage0").html(currentPage0);
}
/*
 * 输出学生信息
 */
function showData(datas){
	$('#userTable').html(""); //清空table
	var inputHtml = "<tr class='single-color'><td class='td1'>用户id</td><td>出生日期</td><td>单位</td><td style='width: 18%;'>操作</td></tr>";
	for(var i = 0; i < datas.length; i++) {
		if(i % 2 == 1) {
			inputHtml += "<tr class='single-color'>"
			    + "<td class='padding-top-tr'>"+ datas[i].userCode +"</td>"  
			    + "<td class='padding-top-tr'>"+ datas[i].birth +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].unit +"</td>"
			    + "<td><a class='operation-btn' onclick='deleteUserData("+ datas[i].id +")'>删除</a> <a class='operation-btn'  onclick='editUserByCode("+ datas[i].userCode +",1)'>编辑</a></td>"
			    + "</tr>";
		}
		else{
			inputHtml += "<tr class='double-color'>"
			    + "<td class='padding-top-tr'>"+ datas[i].userCode +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].birth +"</td>"
			    + "<td class='padding-top-tr'>"+ datas[i].unit +"</td>" 
			    + "<td ><a class='operation-btn' onclick='deleteUserData("+ datas[i].id +")'>删除</a> <a class='operation-btn'  onclick='editUserByCode("+ datas[i].userCode +",1)'>编辑</a></td>"
			    + "</tr>";
		}
		
	}
	$('#userTable').append(inputHtml);
}

/*
 * 模糊查询
 */
function searchUserByMark() {
	var mark  = document.getElementById("usermark").value;
	var value = document.getElementById("uservalue").value;
	// 如果搜索框内没填内容
	if(value==="") {
		findUserOrderByIdByLimit();
	}
	else{
	// 如果搜索框内填了内容
		searchUser(value,mark);
	}
}
/*
 * 模糊查询
 */
function searchUser(value,mark){
	
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/UserServlet", 
		dataType : 'json',
		data : {
			'types' : "searchUser",
			'mark' : mark,
			'value':value
		},
		success : function(data) {
			var datas = eval(data);
			$("#userTable").html("");
			var result = "<tr class='single-color'><td class='td1'>用户id</td><td>出生日期</td><td>单位</td><td style='width: 18%;'>操作</td></tr>";
			for (var i = 0; i < datas.length; i++) {
				if(i % 2 == 1) {
					result += "<tr class='single-color'>"
					    + "<td class='padding-top-tr'>"+ datas[i].userCode +"</td>"  
					    + "<td class='padding-top-tr'>"+ datas[i].birth +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].unit +"</td>"
					    + "<td><a class='operation-btn' onclick='deleteUserData("+ datas[i].id +")'>删除</a> <a class='operation-btn'  onclick='editUserByCode("+ datas[i].userCode +",1)'>编辑</a></td>"
					    + "</tr>";
				}
				else{
					result += "<tr class='double-color'>"
					    + "<td class='padding-top-tr'>"+ datas[i].userCode +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].birth +"</td>"
					    + "<td class='padding-top-tr'>"+ datas[i].unit +"</td>" 
					    + "<td ><a class='operation-btn' onclick='deleteUserData("+ datas[i].id +")'>删除</a> <a class='operation-btn'  onclick='editUserByCode("+ datas[i].userCode +",1)'>编辑</a></td>"
					    + "</tr>";
				}
			}
			$("#userTable").append(result);
		},
		error : function(error) {
			alert("查询失败");
		}
	});	
}
 
/*
 * 按ID删除
 */
function deleteUserData(id){
	var id = id;
	if(confirm("确定要删除吗？")){
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/UserServlet",
		dataType : 'json',
		data:{
			'types':'delete',
			'userId':id, 
		},
		success : function(data) { 
			findUser();
      	},
      	error : function(error) {
      		findUser();
      	}
      	});  
	}
	else{
		window.event.returnValue = false;
	}

}
