package dao;
 
import java.util.List;
import java.util.Map;

import entity.Address;
import util.CommonDAO;

public class AddressDao {
	private CommonDAO commonDAO = new CommonDAO();
	 public void addAddress(Address address){
		 String userId = address.getUserId();
		 String add = address.getAdd();
		 String name = address.getName();
		   try {
				String sql = "insert into address (userId,address,name)"
						+ "values('"+userId+"','"+add+"','"+name+"');";
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	 public List<Map<String, Object>> findAdd(String userCode) {
			try{
				String sql  = "select * from address where userId='"+userCode+"'";
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;
		 
	}
}
