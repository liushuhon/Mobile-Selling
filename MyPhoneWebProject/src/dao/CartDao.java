package dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import entity.Cart;
import entity.Order;
import util.CommonDAO;

public class CartDao {
	private CommonDAO commonDAO = new CommonDAO();
	 public void addCart(Cart cart){
		 String userId = cart.getUserId(); 
		 String cartCode = cart.getCartCode();
		   try {
				String sql = "insert into cart (userId,cartCode)"
						+ "values('"+userId+"','"+cartCode+"');";
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	public List<Map<String, Object>> findCart(String userCode) {
			try{
				String sql  = "select * from cart where userId='"+userCode+"'";
		
				return this.commonDAO.excuteQuery(sql, null);

			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;
		 
	}
	public  boolean deleteGood(String goodCode){//删除库中指定的数据
		try {
			String sql = "delete from phone where phoneCode='"+goodCode+"'";
			this.commonDAO.executeUpdate(sql, new Object[]{});
			return true;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return false;
	}	
}
