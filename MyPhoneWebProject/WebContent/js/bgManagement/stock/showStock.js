/**
 * 
 */
function showStorage(){
	 showInstorage();
	 showOutstorage();
}
function showInstorage(){
	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/StorageServlet",
		dataType : 'json',
		async:false,
		data:{
			'type':'viewInstorage'
		},
		success : function(data) {
			var datas = eval(data);  
			showInStorage(datas);
	  	},
	  	error : function(error) {
	  		alert("添加失败");
	  	}	
	});
}
function showOutstorage(){
	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/StorageServlet",
		dataType : 'json',
		async:false,
		data:{
			'type':'viewOutstorage'
		},
		success : function(data) {
			var datas = eval(data);  
			showOutStorage(datas);
	  	},
	  	error : function(error) {
	  		alert("添加失败b");
	  	}	
	});
}
function showInStorage(datas){
	$('#storageTable').html(""); //清空table
	var inputHtml ="";
	for(var i = 0; i < datas.length; i++) {
		if(i % 2 == 1) {
			inputHtml += "<div class='single-color'>"
			    + "<div class='padding-top-tr storageLine'>手机编号为："+ datas[i].phoneId +"的手机在"+datas[i].time+"时间入库了"+datas[i].number+"台</div>"  
		/*	    + "在"+ datas[i].time +"时间"
			    + "入库了"+ datas[i].number +"台</div>"*/
			     + "</div>";
		}
		else{
			inputHtml += "<div class='single-color'>"
					  + "<div class='padding-top-tr storageLine'>手机编号为："+ datas[i].phoneId +"的手机在"+datas[i].time+"时间入库了"+datas[i].number+"台</div>"  
				      + "</div>";
		}
	}
	$('#storageTable').append(inputHtml);
}
function showOutStorage(datas){
		//清空table
	var inputHtml ="";
	for(var i = 0; i < datas.length; i++) {
		if(i % 2 == 1) {
			inputHtml  += "<div class='double-color'>"
				  + "<div class='padding-top-tr storageLine'>手机编号为："+ datas[i].phoneId +"的手机在"+datas[i].time+"时间出库了"+datas[i].number+"台</div>"  
			      + "</div>";
		}
		else{
			inputHtml  += "<div class='double-color'>"
				  + "<div class='padding-top-tr storageLine'>手机编号为："+ datas[i].phoneId +"的手机在"+datas[i].time+"时间出库了"+datas[i].number+"台</div>"  
			      + "</div>";
		}
	}
	$('#storageTable').append(inputHtml);
}