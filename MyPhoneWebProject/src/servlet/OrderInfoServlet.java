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

import dao.StorageDao;
import entity.OrderInfo;
import service.OrderInfoService;
import service.PhoneService;
import sun.misc.BASE64Encoder;

/**
 * Servlet implementation class OrderInfoServlet
 */
@WebServlet("/OrderInfoServlet")
public class OrderInfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrderInfoServlet() {
        super(); 
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("type");
		OrderInfoService orderInfoService  = new OrderInfoService();
		if(requestType.equals("addOrderInfo")){ 
			String orderId = request.getParameter("orderId");
			String userId = request.getParameter("curUser");
			orderInfoService.addOrderInfo(orderId,userId);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}
		else if(requestType.equals("addOrderInfoForDirect")){ 
			String orderId = request.getParameter("orderId");
			String phoneId = request.getParameter("curPhoneCode");
			String number = request.getParameter("number");
			orderInfoService.addOrderInfoForDirect(orderId,phoneId,number);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if(requestType.equals("showOrderInfo")){
			String curUser = request.getParameter("curUser");
			List<Map<String, Object>> phones = orderInfoService.showOrderInfo(curUser);
			for(int i=0;i<phones.size();i++){
				HashMap<String, Object> temp=(HashMap<String, Object>) phones.get(i);
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + getImageStr(temp.get("image").toString());
				temp.put("info", s);
			}
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phones).getBytes("utf-8"));
		}else if(requestType.equals("findNumber")){
			String phoneCode = request.getParameter("phoneCode");
			List<Map<String, Object>> phones = orderInfoService.findNumber(phoneCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phones).getBytes("utf-8"));
		}else if(requestType.equals("selectOrderInfoByOrderCode")){
			String orderCode = request.getParameter("orderCode");
			List<Map<String, Object>> goods = orderInfoService.selectOrderInfoByOrderCode(orderCode);
			for(int i=0;i<goods.size();i++){
				HashMap<String, Object> temp=(HashMap<String, Object>) goods.get(i);
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + getImageStr(temp.get("image").toString());
				temp.put("info", s);
			}
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(goods).getBytes("utf-8"));
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
