package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.Map;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON; 

import entity.Address;
import service.AddressService;

/**
 * Servlet implementation class AddressServlet
 */
@WebServlet("/AddressServlet")
public class AddressServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddressServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doGet(request, response);
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
		AddressService addressService = new AddressService();
		if (requestType.equals("addAddress")) {
			Address address = new Address(); 
			String userCode = request.getParameter("userCode");
			String addr = request.getParameter("address");
			String name = request.getParameter("name");
			address.setUserId(userCode);
			address.setAdd(addr); 
			address.setName(name);
			addressService.addAddress(address);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else  if (requestType.equals("findAddress")) { 
			String userCode = request.getParameter("userCode"); 
			List<Map<String, Object>> address = addressService.findAdd(userCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(address).getBytes("utf-8"));
		}
	}

}
