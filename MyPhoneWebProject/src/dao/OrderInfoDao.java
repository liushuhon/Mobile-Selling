package dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import entity.Cart;
import entity.Order;
import entity.OrderInfo;
import util.CommonDAO;

public class OrderInfoDao {
	private CommonDAO commonDAO = new CommonDAO();
	 public void addOrderInfo(String orderId,String userId){   
		   try {
			   String sql1 = "select * from middle where cartid =(  select cartcode from cart where userid="+userId+")";
			  
			   
			   List<Map<String, Object>> goods = this.commonDAO.excuteQuery(sql1, null);
			   for (Map<String, Object> m : goods) { 
					String sql = "insert into orderInfo (orderId,phoneId,number)"
							+ "values('"+orderId +"','"+m.get("phoneId")+"','"+m.get("number")+"');";
					this.commonDAO.executeUpdate(sql, null); 
			    }
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	 public void addOrderInfoForDirect(String orderId,String phoneCode,String number){
		   try {
			   String sql = "insert into orderInfo (orderId,phoneId,number)" + "values('"+orderId+"','"+phoneCode+"','"+number+"');";
			  
			   
			   this.commonDAO.executeUpdate(sql, null); 
			    
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	public List<Map<String, Object>> showOrderInfo(String curUser) {
		try {
			String sql = " select * from phone where phoneCode=any(select phoneId from orderinfo where orderId =(select ordercode from porder where userId= '15023875746'))";
			return this.commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return null;
		
		
	}
	public List<Map<String, Object>> selectOrderInfoByOrderId(String orderCode) {
		try {
			String sql = "select * from orderinfo where orderId = "+orderCode+"";
			return this.commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return null;
	}
	public List<Map<String, Object>> selectOrderInfoByOrderCode(String orderCode) {
		try {
			String sql = "SELECT * from phone join orderinfo on phoneCode = phoneId join gorder on orderId = orderCode where orderId ="+orderCode+"";
			return this.commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return null;
	}
	public   List<Map<String, Object>>  findNumber(String goodCode){ 
		try {
			String sql = "select number from orderInfo where phoneId ="+ goodCode+"";
			 
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
}
