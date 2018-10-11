/**
 * 
 */
function showUserMg(){
	findUserOrderByIdByLimit();
	$("#showUserMg").show();
	$("#showPhoneMg").hide();
	$("#showOrderMg").hide();
	$("#showBackInfoMg").hide();

	$("#viewOrder").hide();
	$("#addPhone").hide();
	$("#editUser").hide();
	$("#nav_3").removeClass("clickClass");
	$("#nav_2").removeClass("clickClass");
	$("#nav_1").removeClass("clickClass");
	$("#nav_0").addClass("clickClass");
}
function showPhoneMg(){
	findPhoneOrderByIdByLimit();
	$("#showUserMg").hide();
	$("#showPhoneMg").show();
	$("#showOrderMg").hide();
	$("#showBackInfoMg").hide();

	$("#viewOrder").hide();
	$("#addPhone").hide();
	$("#nav_3").removeClass("clickClass");
	$("#nav_2").removeClass("clickClass");
	$("#nav_1").addClass("clickClass");
	$("#nav_0").removeClass("clickClass");
}
function showOrderMg(){
	findOrderByIdByLimit();
	$("#showUserMg").hide();
	$("#showPhoneMg").hide();
	$("#showOrderMg").show();
	$("#showBackInfoMg").hide();
	$("#editUser").hide();
	$("#addPhone").hide();
	$("#viewOrder").hide();
	$("#nav_3").removeClass("clickClass");
	$("#nav_2").addClass("clickClass");
	$("#nav_1").removeClass("clickClass");
	$("#nav_0").removeClass("clickClass");
}
function showBackInfoMg(){
	showStorage();
	$("#showUserMg").hide();
	
	$("#showPhoneMg").hide();
	$("#showOrderMg").hide();
	$("#showBackInfoMg").show();
	$("#editUser").hide();
	$("#addPhone").hide();
	$("#viewOrder").hide();
	$("#nav_3").addClass("clickClass");
	$("#nav_2").removeClass("clickClass");
	$("#nav_1").removeClass("clickClass");
	$("#nav_0").removeClass("clickClass");
}
function showAddPhone(){
	$("#showPhoneMg").hide();

	$("#viewOrder").hide();
	$("#addPhone").show();
	$("#btnCrop").val("新增");
	$("#phoneName").val("");
	$("#phoneCode").val("");
	$("#price").val("");
	$("#number").val("");
	document.getElementById('lPhoneCode').innerHTML="";
	document.getElementById('lPhoneName').innerHTML="";
	document.getElementById('lPrice').innerHTML="";
	$("#imgbox").html("	<div class='imageBox'>"
						+"	<div class='thumbBox'></div>"
						+"	<div class='spinner' id='spinner' style='display: none'>Loading...</div>"
						+"</div>" );
}
function showEditPhone(){
	document.getElementById('lPhoneCode').innerHTML="";
	document.getElementById('lPhoneName').innerHTML="";
	document.getElementById('lPrice').innerHTML="";

	$("#viewOrder").hide();
	$("#showPhoneMg").hide();
	$("#addPhone").show();
	
}

function showEditUser(){
	$("#addUser").show();
	$("#showPhoneMg").hide();
	$("#showUserMg").hide();
	$("#addPhone").hide();
	$("#btnCropUser").val("修改"); 
	$("#editUser").show();
	$("#viewOrder").hide();
	$("#username").val("");
	$("#birth").val("");
	$("#unit").val("");
	document.getElementById('lusername').innerHTML="";
	document.getElementById('lbirth').innerHTML="";
	document.getElementById('lunit').innerHTML=""; 
}

function showViewOrder(){
	$("#addUser").hide();
	$("#showPhoneMg").hide();
	$("#showUserMg").hide();
	$("#addPhone").hide();
	$("#btnCropUser").val("修改"); 
	$("#editUser").hide(); 
	$("#showOrderMg").hide();
	$("#viewOrder").show();
}