<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
	<script type="text/javascript">
	$(document).ready(function(){
	  $("#b01").click(function(){
	  htmlobj=$.ajax({url:"/jquery/test1.txt",async:false});
	  $("#myDiv").html(htmlobj.responseText);
	  });
	});
	</script>
<%
	String[] words = { "华为", "华为13", "华为144", "华为21", "华为221", "bike", "byebye", "beat", "be", "bing", "come",
			"cup", "class", "calendar", "china" };
	if (request.getParameter("search-text") != null) {
		String key = request.getParameter("search-text");
		if (key.length() != 0) {
			String json = "[";
			for (int i = 0; i < words.length; i++) {
				if (words[i].startsWith(key)) {
					json += "\"" + words[i] + "\"" + ",";
				}
			}
			json = json.substring(0, json.length() - 1 > 0 ? json.length() - 1 : 1);
			json += "]";
			System.out.println("json:" + json);
			out.println(json);
		}
	}

%>
