package servlet;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;

import entity.ValidateCode;
import sun.misc.BASE64Encoder;

/**
 * Servlet implementation class RandImgServlet
 */
@WebServlet("/ValidateCodeServlet")
public class ValidateCodeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ValidateCodeServlet() {
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
		response.setContentType("image/jpeg");  
		response.setHeader("Pragma", "no-cache");  
		response.setHeader("Cache-Control", "no-cache");  
		response.setDateHeader("Expires", 0);  
		String requestType = request.getParameter("type");
		HttpSession session = request.getSession();  
		if(requestType.equals("getValImg")){
			ValidateCode vCode = new ValidateCode(100,30,4,10);  
			ByteArrayOutputStream bs = new ByteArrayOutputStream();
		    ImageOutputStream imOut = ImageIO.createImageOutputStream(bs);
		    ImageIO.write(vCode.getBuffImg(), "jpg", imOut); 
		    InputStream inputStream = new ByteArrayInputStream(bs.toByteArray());
		    String base64Code ="data:image/jpg;base64,"+ ioToBase64(inputStream); 
			session.removeAttribute("validateCode");   
			session.setAttribute("validateCode", vCode.getCode());   
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(base64Code).getBytes("utf-8"));
		}else if(requestType.equals("getValCode")){
			Object valCode = session.getAttribute("validateCode");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(valCode).getBytes("utf-8"));
		}
		
		 
	}
	public String ioToBase64(InputStream in) throws IOException {
		String strBase64 = null;
		try {
			// in.available()返回文件的字节长度
			byte[] bytes = new byte[in.available()];
			// 将文件中的内容读入到数组中
			in.read(bytes);
			strBase64 = new BASE64Encoder().encode(bytes);      //将字节流数组转换为字符串
			in.close();
		} catch (FileNotFoundException fe) {
			fe.printStackTrace();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
		return strBase64;
	}
	      
}
