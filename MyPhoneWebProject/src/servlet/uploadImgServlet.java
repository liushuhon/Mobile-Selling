package servlet;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import dao.StorageDao;
import entity.Phone;
import service.PhoneService;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * Servlet implementation class uploadImgServlet
 */
@WebServlet(description = "上传图片servlet", urlPatterns = { "/uploadImgServlet" })
public class uploadImgServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public uploadImgServlet() {
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
	PhoneService phoneService = new PhoneService();
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("type");
		PhoneService phoneService = new PhoneService();
		StorageDao storageDao = new StorageDao();
		if (requestType.equals("addPhone")){
		PrintWriter writer = response.getWriter();
		Phone phone = new Phone();
		phone.setPhoneCode(request.getParameter("phoneCode"));
		String name =request.getParameter("phoneName");
		phone.setPhoneName(request.getParameter("phoneName"));
		phone.setPrice(request.getParameter("price"));
		phone.setNumber(request.getParameter("number"));
		String imgString = request.getParameter("img");
		String im = processImgStr(imgString);
		String path = "D:\\\\image\\\\"+name+".jpg";
		phone.setImage(path); 
		phoneService.addPhone(phone);
		storageDao.inStorage(phone);
		generatorImage(im,path);
		String imgHeader = "data:image/png;base64,";
		writer.write(imgHeader + getImageStr(path));
		writer.flush();
		writer.close();
	}else if (requestType.equals("update")) {
		PrintWriter writer = response.getWriter();
		Phone phone = new Phone();
		phone.setId(request.getParameter("id"));
		phone.setPhoneCode(request.getParameter("phoneCode"));
		String name =request.getParameter("phoneName");
		phone.setPhoneName(request.getParameter("phoneName"));
		phone.setPrice(request.getParameter("price"));
		String imgString = request.getParameter("image");
		String number = request.getParameter("number");
		phone.setNumber(number);
		String im = processImgStr(imgString);
		String path = "D:\\\\image\\\\"+name+".jpg";
		phone.setImage(path); 
		phoneService.updatePhone(phone);
		generatorImage(im,path);
		String imgHeader = "data:image/png;base64,";
		writer.write(imgHeader + getImageStr(path));
		writer.flush();
		writer.close();
	}
	}

	/**
	 * 去除base64原来的东西
	 * @param imgStr
	 * @return
	 */
	public String processImgStr(String imgStr){
		int headIndex = imgStr.indexOf(',') + 1;
		return imgStr.substring(headIndex);
	}
	/**
	 * @Description: 将base64编码字符串转换为图片
	 * @Author: 
	 * @CreateTime: 
	 * @param imgStr base64编码字符串
	 * @param path 图片路径-具体到文件
	 * @return
	 */
	
	public boolean  generatorImage(String imgStr,String filePath){
		if(imgStr==null){
			return false;
		}
		else {
			BASE64Decoder decoder = new BASE64Decoder();
			try {
				//解密过程
				byte[] imgByte = decoder.decodeBuffer(imgStr);
				//处理数据
				for(int i = 0; i < imgByte.length; i ++){
					if(imgByte[i] < 0){
						imgByte[i] += 256;
					}
				}
				OutputStream out = new FileOutputStream(filePath);
				out.write(imgByte);
				out.flush();
				out.close();
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
	}
	
	
	/**
	 * @Description: 根据图片地址转换为base64编码字符串
	 * @Author: 
	 * @CreateTime: 
	 * @return
	 */
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
