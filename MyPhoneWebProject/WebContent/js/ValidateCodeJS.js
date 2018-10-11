/**
 * 
 */
function ValCode(){ 
		$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/MyPhoneWebProject/servlet/ValidateCodeServlet",
			dataType : 'json', 
			data : {
				'type' : 'getValImg',
			},
			success : function(data) {  
				$('#img').html('<img src="'+data+'" style="margin-left: 6px;width: 95px;height: 40px;">');
			},
			error : function(data) {  
				alert("cannot find!");
			}
		});

	}
	function changeValCode(){
		ValCode();
	}