package servlet;
import java.util.List;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import entity.Cart; 
import service.CartService;  

/**
 * Servlet implementation class OrderServlet
 */
@WebServlet("/CartServlet")
public class CartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CartServlet() {
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
		CartService cartService = new CartService();
		if (requestType.equals("addCart")) {
			Cart cart = new Cart();
			String cartCode = (new Date()).getTime()+"";
			String userCode = request.getParameter("userCode");
			cart.setUserId(userCode);
			cart.setCartCode(cartCode);
			cartService.addCart(cart);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(cartCode).getBytes("utf-8"));
		}else if(requestType.equals("findCartExist")){
			String userCode = request.getParameter("userCode");
			List<Map<String, Object>> cart =cartService.findCart(userCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(cart).getBytes("utf-8"));
		}
	}

}
