package dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import entity.User;
import util.CommonDAO;

public class UserDao {
	 private CommonDAO commonDAO = new CommonDAO();
	 SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	 public void addUser(User user){
		 String userCode = user.getUserCode(); 
		 String password = user.getPassword();
		 String unit = user.getUnit();
		
		 String birth = formatter.format(user.getBirth());
		   try {
				String sql = "insert into user (userCode,password,birth,unit) "
						+ "values('"+userCode+"','"+password+"','"+birth+"','"+unit+"');";
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
		public List<Map<String, Object>> findUserById(String id) {
			try {
				String sql = "select * from  user where userCode='" + id + "'";
				List<Map<String, Object>> phone = this.commonDAO.excuteQuery(sql, null);
				return phone;
			}
			catch(Exception e){
				new Exception("操作数据库出错！").printStackTrace();;
			}
			return null;
		}
		public List<Map<String, Object>> findUserOrderByIdByLimit(int currentPage, int pageSize) {
			int startIndex = (currentPage - 1) * pageSize;
			try{
				String sql = "select * from user order by `user`.id desc limit "+ startIndex +"," + pageSize;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			return null;
		}
		public List<Map<String, Object>> search(String value, String mark) {
			try{
				String sql  = "select * from user where "+mark+" like "+"'%"+value+"%'";
		
				return this.commonDAO.excuteQuery(sql, null);

			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;
		}
		public Long findTotalOfUser() {
			try{
				String sql = "select count(userCode) as total from user";
				List<Map<String, Object>> result = this.commonDAO.excuteQuery(sql, null);
				Map<String,Object> tobj = result.get(0);
				return (Long)(tobj.get("total"));
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			return 0l;
		}
		public void editUserById(User user,String id) {
			
			try{
				String birth = formatter.format(user.getBirth());
				String sql = "update  user set userCode = '"+user.getUserCode()+"' , birth = '"+birth+"', unit ='"+user.getUnit()+"' where id = '"+id+"'";
				this.commonDAO.executeUpdate(sql, null);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		}
		public void deleteUser(String id) {
			try {
				String sql = "delete from user where id='"+id+"'";
				this.commonDAO.executeUpdate(sql, new Object[]{});
				 
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			 
		}
}
