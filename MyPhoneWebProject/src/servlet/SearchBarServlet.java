package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON; 

import service.SearchBarService;

/**
 * SearchBarServlet implementation class SearchBar
 */
@WebServlet("/SearchBarServlet")
public class SearchBarServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SearchBarServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("type"); 
		ArrayList<String> list=new ArrayList<String>();
		SearchBarService searchBarService = new SearchBarService();
		List<Map<String,Object>> goods =  searchBarService.findGoods();
		for(int i = 0;i<goods.size();i++){
			list.add(goods.get(i).get("phoneName").toString());
		}
		if (requestType.equals("search")) {
			if (request.getParameter("search-text") != null) {
				String key = request.getParameter("search-text");
				if (key.length() != 0) {
					String json = "[";
					for (int i = 0; i < list.size(); i++) {
						if (list.get(i).indexOf(key)!=-1) {
							json += "\"" + list.get(i) + "\"" + ",";
						}
					}
					json = json.substring(0, json.length() - 1 > 0 ? json.length() - 1 : 1);
					json += "]"; 
					OutputStream out = response.getOutputStream();
					out.write(JSON.toJSONString(json).getBytes("utf-8")); 
				}
			}
		}
	}

}
