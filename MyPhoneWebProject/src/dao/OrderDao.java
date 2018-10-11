package dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import entity.Order;
import util.CommonDAO;

public class OrderDao {
	private CommonDAO commonDAO = new CommonDAO();
	 public void addOrder(Order order){
		 String userId = order.getUserId(); 
		 String orderCode = order.getOrderCode();
		 Date time = new Date(); 
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 String date = sdf.format(time);
		 String address = order.getAddress();
		   try {
				String sql = "insert into gorder (orderCode,userId,time,address,orderState)"
						+ "values('"+orderCode+"','"+userId+"','"+date+"','"+address+"','Î´·¢»õ');";
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	public List<Map<String, Object>> findOrder(String userCode,String mark) {
		 
		 
			try{
				String sql  = "select * from gorder where userId='"+userCode+"' and mark='"+mark+"'";
		
				return this.commonDAO.excuteQuery(sql, null);

			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;
		 
	}
	public List<Map<String, Object>> selectOrderCode(String userCode ) {
		 
		 
		try{
			String sql  = "select * from gorder where userId="+userCode;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return null;
	 
	}
	public List<Map<String, Object>> findOrderByIdByLimit(int currentPage, int pageSize) {
		int startIndex = (currentPage - 1) * pageSize;
		try{
			String sql = "select * from gorder order by `gorder`.time desc limit "+ startIndex +"," + pageSize;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public Long findTotalOfOrder() {
		try{
			String sql = "select count(orderCode) as total from gorder";
			List<Map<String, Object>> result = this.commonDAO.excuteQuery(sql, null);
			Map<String,Object> tobj = result.get(0);
			return (Long)(tobj.get("total"));
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return 0l;
	}
	public List<Map<String, Object>> search(String value, String mark) {
		try{
			String sql  = "select * from gorder where "+mark+" like "+"'%"+value+"%'";
	
			return this.commonDAO.excuteQuery(sql, null);

		}
		catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> changeOrderState(String orderId,
			String orderState) {
		try{
			String sql = "update gorder set orderState ='"+orderState+"' where id = '"+orderId+"'";
			 this.commonDAO.executeUpdate(sql, null);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
	
}
