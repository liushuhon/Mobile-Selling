package dao;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import entity.Phone;
/*import jdk.nashorn.internal.objects.annotations.Where;*/
import util.CommonDAO;

public class PhoneDao {
	private CommonDAO commonDAO = new CommonDAO();
	
	 public void addPhone(Phone phone){
		 String phoneCode = phone.getPhoneCode();
		 String phoneName = phone.getPhoneName();
		 String price = phone.getPrice();
		 String image = phone.getImage();
		 String number = phone.getNumber();
		 Date time = new Date(); 
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String date = sdf.format(time);
		   try {
				String sql = "insert into phone (phoneCode,price,phoneName,image,time,kucun) "
						+ "values("+phoneCode+",'"+price+"','"+phoneName+"','"+image+"','"+date+"','"+number+"');";
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
		
		public  boolean deletePhone(String id){//删除库中指定的数据
			try {
				String sql = "delete from phone where phoneCode='"+id+"'";
				this.commonDAO.executeUpdate(sql, new Object[]{});
				return true;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return false;
		}
		public List<Map<String, Object>> findPhone() {
			try {
				String sql = "select * from  phone order by time DESC";
				List<Map<String, Object>> phone = this.commonDAO.excuteQuery(sql, null);
				return phone;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return null;
		}
		public List<Map<String, Object>> findPhoneById(String id) {
			try {
				String sql = "select * from  phone where phoneCode='" + id + "'";
				List<Map<String, Object>> phone = this.commonDAO.excuteQuery(sql, null);
				return phone;
			}
			catch(Exception e){
				new Exception("操作数据库出错！").printStackTrace();;
			}
			return null;
		}
		public void updatePhone(Phone phone) {
			 Date time = new Date(); 
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String date = sdf.format(time);
			try{
				String sql = "update phone set price='" + phone.getPrice() + "',phoneName='" + phone.getPhoneName()
				+ "',phoneCode='" + phone.getPhoneCode()+ "',kucun='" + phone.getNumber()
				+ "',image='" + phone.getImage()+ "',time='" + date+ "' where id='" + phone.getId() + "'";
				this.commonDAO.executeUpdate(sql, null);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		}
		public List<Map<String, Object>> search(String value, String mark) {
			try{
				String sql  = "select * from phone where "+mark+" like "+"'%"+value+"%'";
		
				return this.commonDAO.excuteQuery(sql, null);

			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;
		}
		public List<Map<String, Object>> findPhoneOrderByIdByLimit(int currentPage, int pageSize) {
			int startIndex = (currentPage - 1) * pageSize;
			try{
				String sql = "select * from phone order by `phone`.time desc limit "+ startIndex +"," + pageSize;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			return null;
		}
		public Long findTotalOfPhone() {
			try{
				String sql = "select count(phoneCode) as total from phone";
				List<Map<String, Object>> result = this.commonDAO.excuteQuery(sql, null);
				Map<String,Object> tobj = result.get(0);
				return (Long)(tobj.get("total"));
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			return 0l;
		}
		public  boolean deInventory(String phoneId,String number){//删除库中指定的数据
			try {
				 
					String  sql  =" update phone set kucun = kucun - "+number +" Where phoneCode="+phoneId; 
					this.commonDAO.executeUpdate(sql , null);
				 return true;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return false;
		}
		public List<Map<String, Object>> assoSearch(String searchCon) {
			try {
				String sql = "select * from  phone where phoneName like '%"+searchCon+"%'";
				List<Map<String, Object>> phone = this.commonDAO.excuteQuery(sql, null);
				return phone;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return null;
		}
	 
		/**
		 * 获取where子句
		 */
		private String getWhereSql(Object value, String mark,Class<?> currentEntity) {
			Class<?> fieldType = judgeFieldType(mark,currentEntity);
			String result = " where " + mark + " like "+"%";
			if(fieldType.equals(String.class)) {
				result +="'" + value + "%';";
			}
			else{
				result +=value + "%';";
			}
			return result;
		}
		/**
		 * 判断字段类型
		 */
		private Class<?> judgeFieldType(String mark,Class<?> clazz) {
			try{
				Field[] fields = clazz.getDeclaredFields();
				for(Field field: fields) {
					if(field.getName().equals(mark)) {
						return field.getType();
					}
				}
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			return null;
		}
}
