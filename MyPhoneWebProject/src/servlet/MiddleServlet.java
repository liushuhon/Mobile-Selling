package servlet;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import entity.Middle;
import service.CartService;
import service.MiddleService;
import sun.misc.BASE64Encoder;

/**
 * Servlet implementation class MiddleServlet
 */
@WebServlet("/MiddleServlet")
public class MiddleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MiddleServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response); 
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		 
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("type");
		MiddleService middleService = new MiddleService();
		if(requestType.equals("addMiddle")){
			Middle middle = new Middle();
			middle.setNumber(request.getParameter("number"));
			middle.setCartId(request.getParameter("cartCode"));
			middle.setPhoneId(request.getParameter("phoneCode"));
			middle.setMark(request.getParameter("mark"));
			middleService.addMiddle(middle);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if(requestType.equals("showMiddle")){
			String curUser = request.getParameter("curUser");
			List<Map<String, Object>> phones = middleService.showMiddle(curUser);
			for(int i=0;i<phones.size();i++){
				HashMap<String, Object> temp=(HashMap<String, Object>) phones.get(i);
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + getImageStr(temp.get("image").toString());
				temp.put("info", s);
			}
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phones).getBytes("utf-8"));
		}else if(requestType.equals("deleteGood")){
			String id = request.getParameter("id");
			 middleService.deleteGood(id);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if(requestType.equals("showConfirmMiddle")){
			String curUser = request.getParameter("curUser");
			List<Map<String, Object>> phones = middleService.showConfirmMiddle(curUser);
			for(int i=0;i<phones.size();i++){
				HashMap<String, Object> temp=(HashMap<String, Object>) phones.get(i);
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + getImageStr(temp.get("image").toString());
				temp.put("info", s);
			}
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phones).getBytes("utf-8"));
		}else if(requestType.equals("changeGoodMark1")){
			String goodCode = request.getParameter("goodCode");
			String number = request.getParameter("number");
		    middleService.changeGoodMark1(goodCode,number);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if(requestType.equals("findNumber")){
			String phoneCode = request.getParameter("phoneCode");
			List<Map<String, Object>> phones = middleService.findNumber(phoneCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phones).getBytes("utf-8"));
		}else if(requestType.equals("deleteBuyGood")){
			String userId = request.getParameter("curUser");
			middleService.deleteBuyGood(userId);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if(requestType.equals("deleteBuyGoodForDirect")){
			String userId = request.getParameter("curUser");
			String phoneCode = request.getParameter("phoneCode");
			middleService.deleteBuyGoodForDirect(userId,phoneCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}
		else if(requestType.equals("changeGoodMark0")){
			String curUser = request.getParameter("curUser"); 
		    middleService.changeGoodMark0(curUser);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if(requestType.equals("findPhoneExistInMiddle")){
			String cartCode = request.getParameter("cartCode"); 
			String phoneCode = request.getParameter("phoneCode");
			List<Map<String, Object>> phones = middleService.findPhoneExistInMiddle(cartCode,phoneCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phones).getBytes("utf-8"));
		}else if(requestType.equals("updateNumber")){
			String cartCode = request.getParameter("cartCode"); 
			String phoneCode = request.getParameter("phoneCode");
			String number = request.getParameter("number");
			middleService.updateNumber(cartCode,phoneCode,number);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if(requestType.equals("findMiddleMark1")){
			String curUser = request.getParameter("curUser");  
			List<Map<String, Object>> phones = middleService.findMiddleMark1(curUser);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phones).getBytes("utf-8"));
		}else if(requestType.equals("deletePhoneMark1")){
			String phoneCode = request.getParameter("phoneCode"); 
			String cartCode = request.getParameter("cartCode");
			middleService.deletePhoneMark1(phoneCode,cartCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}
		
	}
	public String getImageStr(String imgFile) {
	    InputStream inputStream = null;
	    byte[] data = null;
	    try {
	        inputStream = new FileInputStream(imgFile);
	        data = new byte[inputStream.available()];
	        inputStream.read(data);
	        inputStream.close();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    // º”√‹
	    BASE64Encoder encoder = new BASE64Encoder();
	    return encoder.encode(data);
	}

}
