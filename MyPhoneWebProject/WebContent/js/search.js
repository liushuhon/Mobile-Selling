/**
 * 
 */

var searchCon = decodeURI(decodeURIComponent(GetQueryString("keyword")));  
var curUser = null;
function showCurUser()  {
	  getCurUser();   
	  $("#search-text").val(searchCon ); 
	  selectGoods();
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
function selectGoods(){
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/PhoneServlet",
		dataType : 'json',
		data : {
			'type' : 'assoSearch',
			'searchCon' : searchCon
		},
		success : function(data) {
			datas = eval(data);  
			showAssoSearchGoods(datas);
		},
		error : function(error) {
			alert("cannot find!");
		}
	});
}
function showAssoSearchGoods(data){
	$("#goodsNum").html(data.length);
	$("#searchContent").html(searchCon); 
	$("#goods1").val("");
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
	$("#goods1").append(content)	;
}

function getParam(paramName) {
    paramValue = "";
    isFound = false; 
    var str =  decodeURI(this.location); 
    if (str.indexOf("?") == 0 && str.indexOf("=") > 1) {
        arrSource = unescape(str).substring(1, str.length).split("&");
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
function GetQueryString(str){
	LocString=String(window.document.location.href);
	var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
	if(tmp=rs)return tmp[2];
	return "没有这个参数";
} 
 