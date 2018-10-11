package dao;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import entity.Phone;
import util.CommonDAO;

public class StorageDao {
	private CommonDAO commonDAO = new CommonDAO();
	 public void inStorage(Phone phone){ //入库记录
		 String phoneCode = phone.getPhoneCode();
		 String number = phone.getNumber();
		 Date time = new Date(); 
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String date = sdf.format(time);
		   try {
				String sql = "insert into inStorage (phoneId,number,time) "+ "values("+phoneCode+",'"+number+"','"+date+"');";
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
		public  boolean outStorage(String id){//删除库中指定的数据
			try {
				String sql = "delete from outStorage where phoneCode='"+id+"'";
				this.commonDAO.executeUpdate(sql, new Object[]{});
				return true;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return false;
		} 
		public  boolean recordDelivery(String phoneId,String number){//出库记录
			 Date time = new Date(); 
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String date = sdf.format(time);
			
			try {
				String sql = "insert into  outStorage(phoneId,number,time) "+"values("+phoneId+",'"+number+"','"+date+"');";
				this.commonDAO.executeUpdate(sql, null);
				return true;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return false;
		} 
		public  List<Map<String,Object>> viewInstorage(){//查看入库记录
			 
			try {
				String sql = "select * from instorage order by time";
				List<Map<String,Object>> records =  this.commonDAO.excuteQuery(sql, null);
				return records;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return null;
		}  
		public  List<Map<String,Object>>  viewOutstorage(){//查看出库记录
			try {
				String sql = "select * from outStorage order by time";
				List<Map<String,Object>> records =  this.commonDAO.excuteQuery(sql, null);
				return records;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return null;
		}  
}
