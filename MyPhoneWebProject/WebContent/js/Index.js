
var curUser;

function showUser()  {
	  getCurUser();   
	if(curUser!=null && curUser!=""){
		if(curUser=='10086'){
			$("#kuang").html(""+curUser+""
							+"<a href='../html/bgManagement.html'>&nbsp;后台管理</a>"		
			);
			$("#exit").css("display","block");
			$("#exit").attr("onclick","exit();");
		}
		else {
			selectCart();
			$("#kuang").html(curUser+",您好");
			$("#exit").css("display","block");
			$("#exit").attr("onclick","exit();");
			 $("#registerAndLogin").mouseover(function(){
				  $("#b").css("opacity","1");
				}); 
			 $("#registerAndLogin").mouseout(function(){
				  $("#b").css("opacity","0");
				});
		}
	}
	else{
		$("#exit").css("display","none");
		$("#b").css("display","none");
	}
}
function selectCart(){
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
				var len = datas.length;
				$("#spCart-span").html(len);
			},
			error : function(error) {
				alert("cannot find!");
			}
		});
	 
} 
function toCart(){ 
	if(curUser==null || curUser==""){
		alert('请先登录');
		location.href="../html/Login.html";
	}else{

		location.href="../html/cart.html";
	}
}
function exit(){
	if(confirm('确定要退出吗?')) {  
		userLogout();
		location.href="../html/Index.html";
	}
}

function getParam(paramName) {
    paramValue = "";
    isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    } 
    return paramValue;
}


$(document).ready(function(){
	showUser();
	var i = 0;
	$.ajax({
		type : "POST",
		url : "/MyPhoneWebProject/servlet/PhoneServlet",
		dataType : 'json',
		data:{
			'type':'find'
		},
		success : function(data) {
			datas = eval(data);
			$("#goods").val("");
			var content = "";
			for(var i = 0;i<data.length;i++){
				content += "<li class='grid-items'>"
						+"<div  class='thumb'>" 
						+ "<a class='thumb' href='../html/showGoodInfo.html?phoneCode="+datas[i].phoneCode+"'target='_blank'"
						+"<p><img src='"+datas[i].info+"'width=134px;height=134px style='margin-top: 35px;'></p>"
						+"<h3 class='grid-title'>"+ datas[i].phoneName +"</h3>"
						+"<p class='grid-price'>¥" +datas[i].price+"</p>"
						+"</a>"
						+"</div>"
						+"</li>"
				
			}
			$("#goods").append(content)	;
	  	},
	  	error : function(error) {
	  		alert("添加失败");
	  	}	
	});
}
)
