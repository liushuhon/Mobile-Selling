package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;
import com.sun.org.apache.xalan.internal.xsltc.runtime.Parameter;
 





import entity.User;
import service.UserService;

public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public UserServlet(){
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		this.doPost(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("types");
		UserService userService = new UserService();
		SimpleDateFormat sdf = new SimpleDateFormat( "yyyy-MM-dd" ); 
		
		if (requestType.equals("add")) {
			User user = new User();
			user.setUserCode(request.getParameter("userCode"));
			user.setPassword(request.getParameter("password"));
			user.setUnit(request.getParameter("unit"));
			try {
				user.setBirth(sdf.parse(request.getParameter("birth")));
			} catch (ParseException e) { 
				e.printStackTrace();
			}
			userService.addUser(user);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if (requestType.equals("delete")) {
			String id = request.getParameter("userId");
			userService.deleteUser(id);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}  else if (requestType.equals("findUserOrderByIdByLimit")){
			OutputStream out = response.getOutputStream();
			String pageSize = request.getParameter("pageSize");
			String currentPage = request.getParameter("currentPage");
			List<Map<String, Object>> users = userService.findUserOrderByIdByLimit(Integer.parseInt(currentPage.trim())
					,Integer.parseInt(pageSize.trim()));  // trim()去掉前后空格
			Long total = userService.findTotalOfUser();
			Map<String,Object> result = new HashMap<String,Object>();
			result.put("users", users);
			result.put("total", total);
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		}    else if (requestType.equals("searchUser")) {
			OutputStream out = response.getOutputStream();
			String value = request.getParameter("value");
			String mark = request.getParameter("mark");
			List<Map<String, Object>> users = userService.search(value, mark);
			out.write(JSON.toJSONString(users).getBytes("utf-8"));
		} 
		else if(requestType.equals("findUserByNum")){ 
			String num = request.getParameter("num");
			request.getSession().setAttribute("userCode", num);   
			List<Map<String, Object>> user = userService.findUserById(num);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(user).getBytes("utf-8"));
		}else if(requestType.equals("getUserCode")){ 
			Object usercode = request.getSession().getAttribute("userCode"); 
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(usercode).getBytes("utf-8"));
		}else if(requestType.equals("userLogout")){ 
			request.getSession().removeAttribute("userCode"); 
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if(requestType.equals("editUserById")){  
			User user = new User();
			try {
				user.setBirth(sdf.parse(request.getParameter("birth")));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			user.setUnit(request.getParameter("unit"));
			user.setUserCode(request.getParameter("userCode"));
			userService.editUserById(user,request.getParameter("id"));
		}
	}
}
