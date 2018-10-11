package dao;

import java.util.List;
import java.util.Map;

import entity.Middle;
import util.CommonDAO;

public class MiddleDao {
	private CommonDAO commonDAO = new CommonDAO();
	 public void addMiddle(Middle middle){  
		 String cartCode = middle.getCartId();
		 String number = middle.getNumber();
		 String phoneCode = middle.getPhoneId();
		 String mark = middle.getMark();
		   try {
				String sql = "insert into Middle (cartId,phoneId,number,mark)"
						+ "values('"+cartCode+"','"+phoneCode+"','"+number+"','"+mark+"');";
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	public List<Map<String, Object>> showMiddle(String curUser) {
		try {
			String sql = "select * from phone   JOIN middle on phoneId = phoneCode JOIN cart on cartId = cartCode where userId ="+curUser+" and mark=0";
			return this.commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	public List<Map<String, Object>> showConfirmMiddle(String curUser) {
		try {
			String sql = " select * from phone where phoneCode=any(select phoneId from Middle where cartId =(select cartCode from cart where userId= '"+curUser+"') and mark=1)";
			return this.commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	public  boolean deleteGood(String id_middle){//删除库中指定的数据
		try {
			String sql = "delete from middle where id_middle='"+id_middle+"'";
			this.commonDAO.executeUpdate(sql, new Object[]{});
			return true;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return false;
	}
	public  boolean changeGoodMark1(String goodCode,String number){ 
		try {
			String sql = "update middle set mark=1,number="+number+" where phoneId = '"+goodCode+"'";
			this.commonDAO.executeUpdate(sql, null);
			return true;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return false;
	}
	public  boolean changeGoodMark0(String userCode){ 
		try {
			 
			String sql = "update middle set mark = 0 where cartID = ( select cartcode from cart where userId = "+userCode+")";
			this.commonDAO.executeUpdate(sql, null);
			return true;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return false;
	}
	public   List<Map<String, Object>>  findNumber(String goodCode){ 
		try {
			String sql = "select number from middle where phoneId ="+ goodCode+"";
			 
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public  boolean deleteBuyGood(String userId){//删除库中指定的数据
		try { 
			
			String sql = "delete from middle where cartId=( select cartCode from cart where userId="+userId+") and mark =1";
			this.commonDAO.executeUpdate(sql, new Object[]{});
			return true;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return false;
	}
	public  boolean deleteBuyGoodForDirect(String userId,String phoneCode){//删除库中指定的数据
		try { 
			
			String sql = "delete from middle where cartId=( select cartCode from cart where userId="+userId+") and mark =1 and phoneId="+phoneCode;
			this.commonDAO.executeUpdate(sql, new Object[]{});
			return true;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return false;
	}
	public   List<Map<String, Object>>  findPhoneExistInMiddle(String cartCode,String phoneCode){ 
		try {
			String sql = "select * from middle where phoneId ="+ phoneCode+" and cartId ="+cartCode+" and mark=0";
			 
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public    boolean   updateNumber(String cartCode,String phoneCode,String number){ 
		try {
			String sql = "update middle set number = "+number+" where phoneId = "+phoneCode+" and cartId = "+cartCode+" and mark = 0";
			 
			this.commonDAO.executeUpdate(sql, null);
			return true;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return false;
	}
	public   List<Map<String, Object>>  findMiddleMark1(String curUser){ 
		try {
			String sql = "select * from middle where cartId=(select cartCode from cart where userid = "+curUser+") and mark =	1";

			 
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public  boolean deletePhoneMark1(String phoneCode,String cartCode){//删除库中指定的数据
		try { 
			
			String sql = "delete from middle where cartId="+cartCode+" and mark =1 and phoneId="+phoneCode;
			this.commonDAO.executeUpdate(sql, new Object[]{});
			return true;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return false;
	}
}
