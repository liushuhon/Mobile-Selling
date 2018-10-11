/**
 * 
 */
/* FileReader对象的使用：借助FileReader对象来获取上传图片的base64，就可以在客户端显示该图片，同时，还可以把图片的base64发送到服务端，保存起来（也及上传图片） */

/* 使用FileReader对象，web应用程序可以异步的读取存储在用户计算机上的文件，可以使用File对象，或者Blob对象来指定所要读取的文件或数据。 */
var isEdit = null;
var phoneId = null;
var photoBase64 = null;
function editPhoneByCode(id,isEdits){ 
	$("#imgbox").html("	<div class='imageBox'>"
			+"	<div class='thumbBox'></div>"
			+"	<div class='spinner' id='spinner' style='display: block'>Loading...</div>"
			+"</div>" );
	showEditPhone();
	$("#btnCrop").val("修改");
	isEdit = isEdits;
	$.ajax({
		type : "POST",
		contentType:'application/x-www-form-urlencoded; charset=utf-8',
		url : "/MyPhoneWebProject/servlet/PhoneServlet",
		dataType : 'json',
		data:{
			'type':'findPhoneByCode',
			'phoneCode':id
		},
	    success: function(data) {
			datas = eval(data);
			phoneId = datas[0].id;
			photoBase64 = datas[0].info;
			showPhoneInfo(datas[0]);
  		},
  		error : function(error) {
  			alert("修改失败");
  		}	
	});
}

window.onload = function() {
	var options = {
		imageBox : '.imageBox',
		thumbBox : '.thumbBox',
		spinner : '.spinner',
		imgSrc : ''// 这里可以设置默认图片
	}
	var cropper = new cropbox(options);

	// 首先为元素添加一个监听事件，目的是检查选择文件是否发生 变化。
	document.querySelector('#file').addEventListener('change', function() {
		var reader = new FileReader();
		// 绑定load事件
		reader.onload = function(e) {
			// console.log(e.target.result);
			// e.target.result获取到的是base64编码
			options.imgSrc = e.target.result;
			cropper = new cropbox(options);
		}
		// 当FileReader对象通过readAsDataURL读取数据成功后，就会触发load事件，target中的result属性的值就是该文件的base64数据
		reader.readAsDataURL(this.files[0]);
		// this.files = [];
	})
	
	// 剪裁
	document.querySelector('#btnCrop').addEventListener(
			'click',
			function() {
				if(isEdit == null || document.getElementById('btnCrop').value=="新增"){
					// 新增
				var img = cropper.getDataURL();
				var phoneName = document.getElementById("phoneName").value;
				var phoneCode = document.getElementById("phoneCode").value;
				var price = document.getElementById("price").value;
				var number = document.getElementById("number").value;
				if(checkPhoneName()&&checkPrice()&&checkPhoneCode()) {
				$.ajax({
					method : 'post',
					url : "/MyPhoneWebProject/servlet/uploadImgServlet",
					type : "text",
					data : {
						'type':'addPhone',
						"img" : img,
						"phoneName" : phoneName,
						"phoneCode" : phoneCode,
						"price" : price,
						"number" :number
					},
					success : function(data) {
						alert("新增成功");
						 showPhoneMg();
					},
					error : function(error) {
						alert(error);
					}
				});
				 
				}}
			 
				else{
					// 编辑
					var phoneCode = document.getElementById('phoneCode').value;
					var phoneName = document.getElementById('phoneName').value;
					var price = document.getElementById('price').value;
					var number = document.getElementById('number').value;
					/*if(checkPhoneCodeForEdit()&&checkPhoneName()&&checkPrice()){*/
					var img = cropper.getDataURL();
					if(img == 'data:,'){
						 img = photoBase64;
					}
						$.ajax({
						type : "POST",
						contentType:'application/x-www-form-urlencoded; charset=utf-8',
						url :"/MyPhoneWebProject/servlet/uploadImgServlet",
						dataType : 'json',
						data:{
							'type':'update',
							'id':phoneId,
							'phoneCode':phoneCode,
							'phoneName':phoneName,
							'price':price,
							'number':number,
							'image':img
						},
						success : function(data) {
							 alert("修改成功");
							 isEdit=null;
							 showPhoneMg();
					  	},
					  	error : function(error) {
					  		alert("修改成功");
					  		isEdit=null;
					  		showPhoneMg(); 
					  	}	
					  });
					
			}
			})
};
'use strict';
var showPhoneInfo = function(data) {
	document.getElementById('phoneCode').value=data.phoneCode;
	document.getElementById('phoneName').value=data.phoneName;
	document.getElementById('price').value=data.price;
	document.getElementById('number').value=data.kucun;
	$("#spinner").html('<img src="'+data.info+'" style="   width: 100%;  height: 100%;">');
}
 
