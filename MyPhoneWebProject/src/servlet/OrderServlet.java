package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
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
import entity.Order;
import entity.Phone;
import service.OrderService;
import service.PhoneService;

/**
 * Servlet implementation class OrderServlet
 */
@WebServlet("/OrderServlet")
public class OrderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrderServlet() {
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
		OrderService orderService = new OrderService();
		if (requestType.equals("addOrder")) {
			Order order = new Order();
			String orderCode = (new Date()).getTime()+"";
			String userCode = request.getParameter("userCode"); 
			String address = request.getParameter("address");
			order.setOrderCode(orderCode); 
			order.setAddress(address);
			order.setUserId(userCode);
			orderService.addOrder(order);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(orderCode).getBytes("utf-8"));
		}else if(requestType.equals("findOrderExist")){
			String userCode = request.getParameter("userCode");
			String mark = request.getParameter("mark");
			List<Map<String, Object>> order =orderService.findOrder(userCode,mark);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(order).getBytes("utf-8"));
		}else if(requestType.equals("selectOrderCode")){
			String userCode = request.getParameter("curUser"); 
			List<Map<String, Object>> order =orderService.selectOrderCode(userCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(order).getBytes("utf-8"));
		}else if(requestType.equals("findAllOrderByIdByLimit")){
			OutputStream out = response.getOutputStream();
			String pageSize = request.getParameter("pageSize");
			String currentPage = request.getParameter("currentPage");
			List<Map<String, Object>> orders = orderService.findAllOrderByIdByLimit(Integer.parseInt(currentPage.trim())
					,Integer.parseInt(pageSize.trim()));  // trim()去掉前后空格
			Long total = orderService.findTotalOfOrder();
			Map<String,Object> result = new HashMap<String,Object>();
			result.put("orders", orders);
			result.put("total", total);
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("searchOrderByMark")) {
			OutputStream out = response.getOutputStream();
			String value = request.getParameter("value");
			String mark = request.getParameter("mark");
			List<Map<String, Object>> orders = orderService.search(value, mark);
			out.write(JSON.toJSONString(orders).getBytes("utf-8"));
		} else if (requestType.equals("changeOrderState")) {
			OutputStream out = response.getOutputStream();
			String orderId = request.getParameter("orderId"); 
			String orderState = request.getParameter("orderState");
			List<Map<String, Object>> orders = orderService.changeOrderState(orderId, orderState);
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		} 
	}

}
