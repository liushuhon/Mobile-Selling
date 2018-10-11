package servlet;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.sun.corba.se.spi.orbutil.fsm.Guard.Result;

import dao.StorageDao;
import entity.Phone;
import service.OrderInfoService;
import service.PhoneService;
import sun.misc.BASE64Encoder;
import servlet.uploadImgServlet;
/**
 * Servlet implementation class phoneServlet
 */
public class PhoneServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Default constructor.
	 */
	public PhoneServlet() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("type");
		PhoneService phoneService = new PhoneService();
		StorageDao storageDao = new StorageDao();
		if (requestType.equals("add")) {
			Phone phone = new Phone();
			phone.setPhoneCode(request.getParameter("phoneCode"));
			phone.setPhoneName(request.getParameter("phoneName"));
			phone.setPrice(request.getParameter("price"));
			String image = request.getParameter("img");
			System.out.println(image);
			phoneService.addPhone(phone);
			storageDao.inStorage(phone);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("find")) {
			List<Map<String, Object>> phone = phoneService.findPhone();
			for(int i=0;i<phone.size();i++){
				HashMap<String, Object> temp=(HashMap<String, Object>) phone.get(i);
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + getImageStr(temp.get("image").toString());
				temp.put("info", s);
			}
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phone).getBytes("utf-8"));
		} else if (requestType.equals("delete")) {
			String id = request.getParameter("phoneCode");
			phoneService.deletePhone(id);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}   else if (requestType.equals("findPhoneByCode")) {
			String id = request.getParameter("phoneCode");
			List<Map<String, Object>> phone = phoneService.findPhoneById(id);
			for(int i=0;i<phone.size();i++){
				HashMap<String, Object> temp=(HashMap<String, Object>) phone.get(i);
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + getImageStr(temp.get("image").toString());
				temp.put("info", s);
			}
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phone).getBytes("utf-8"));
		}    else if (requestType.equals("searchPhone")) {
			OutputStream out = response.getOutputStream();
			String value = request.getParameter("value");
			String mark = request.getParameter("mark");
			List<Map<String, Object>> phones = phoneService.search(value, mark);
			out.write(JSON.toJSONString(phones).getBytes("utf-8"));
		} else if (requestType.equals("findPhoneOrderByIdByLimit")){
			OutputStream out = response.getOutputStream();
			String pageSize = request.getParameter("pageSize");
			String currentPage = request.getParameter("currentPage");
			List<Map<String, Object>> phones = phoneService.findPhoneOrderByIdByLimit(Integer.parseInt(currentPage.trim())
					,Integer.parseInt(pageSize.trim()));  // trim()去掉前后空格
			Long total = phoneService.findTotalOfPhone();
			Map<String,Object> result = new HashMap<String,Object>();
			result.put("phones", phones);
			result.put("total", total);
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("deInventory")) {
			OrderInfoService orderInfoService = new OrderInfoService();
			String orderId = request.getParameter("orderId"); 
			List<Map<String, Object>> phones = orderInfoService.selectOrderInfoByOrderId(orderId);
			
			for(int i=0;i<phones.size();i++){
				Object phoneid =  phones.get(i).get("phoneId");
				Object number =   phones.get(i).get("number");
				phoneService.deInventory(""+phoneid,""+number);
				storageDao.recordDelivery(""+phoneid,""+ number);
		 	}
			
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("assoSearch")) {
			String searchCon = request.getParameter("searchCon");
			List<Map<String, Object>> phone = phoneService.assoSearch(searchCon);
			for(int i=0;i<phone.size();i++){
				HashMap<String, Object> temp=(HashMap<String, Object>) phone.get(i);
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + getImageStr(temp.get("image").toString());
				temp.put("info", s);
			}
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(phone).getBytes("utf-8"));

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
	    // 加密
	    BASE64Encoder encoder = new BASE64Encoder();
	    return encoder.encode(data);
	}
}
