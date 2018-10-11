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
	 public void inStorage(Phone phone){ //����¼
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
		public  boolean outStorage(String id){//ɾ������ָ��������
			try {
				String sql = "delete from outStorage where phoneCode='"+id+"'";
				this.commonDAO.executeUpdate(sql, new Object[]{});
				return true;
			}
			catch(Exception e){
				System.out.println("�������ݿ����");
			}
			return false;
		} 
		public  boolean recordDelivery(String phoneId,String number){//�����¼
			 Date time = new Date(); 
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String date = sdf.format(time);
			
			try {
				String sql = "insert into  outStorage(phoneId,number,time) "+"values("+phoneId+",'"+number+"','"+date+"');";
				this.commonDAO.executeUpdate(sql, null);
				return true;
			}
			catch(Exception e){
				System.out.println("�������ݿ����");
			}
			return false;
		} 
		public  List<Map<String,Object>> viewInstorage(){//�鿴����¼
			 
			try {
				String sql = "select * from instorage order by time";
				List<Map<String,Object>> records =  this.commonDAO.excuteQuery(sql, null);
				return records;
			}
			catch(Exception e){
				System.out.println("�������ݿ����");
			}
			return null;
		}  
		public  List<Map<String,Object>>  viewOutstorage(){//�鿴�����¼
			try {
				String sql = "select * from outStorage order by time";
				List<Map<String,Object>> records =  this.commonDAO.excuteQuery(sql, null);
				return records;
			}
			catch(Exception e){
				System.out.println("�������ݿ����");
			}
			return null;
		}  
}
