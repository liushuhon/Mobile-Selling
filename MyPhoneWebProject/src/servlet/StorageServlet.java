package servlet;

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

import service.OrderService;

import com.alibaba.fastjson.JSON;

import dao.StorageDao;
import entity.Order;

/**
 * Servlet implementation class StorageServlet
 */
@WebServlet("/StorageServlet")
public class StorageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public StorageServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("type"); 
		StorageDao storageDao = new StorageDao();
		if (requestType.equals("viewInstorage")) {
			OutputStream out = response.getOutputStream();
			List<Map<String,Object>> records = storageDao.viewInstorage();
			out.write(JSON.toJSONString(records).getBytes("utf-8"));
			out.close();
		}else if(requestType.equals("viewOutstorage")){
			OutputStream out = response.getOutputStream();
			List<Map<String,Object>> records = storageDao.viewOutstorage();
			out.write(JSON.toJSONString(records).getBytes("utf-8"));
			out.close();
		}
	}
}
