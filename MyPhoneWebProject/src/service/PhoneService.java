package service;

import java.util.List;
import java.util.Map;

import dao.PhoneDao;
import util.CommonDAO;
import entity.Phone;

public class PhoneService {
	 
	
private PhoneDao phoneDao = new PhoneDao();
	public  void addPhone(Phone Phone)
	{
		try 
		{
			this.phoneDao.addPhone(Phone);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	//删除库中指定的数据
	public  void deletePhone(String id)
	{
		try 
		{
			this.phoneDao.deletePhone(id);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	
	public List<Map<String, Object>> findPhone()
	{
		try 
		{
			return this.phoneDao.findPhone();
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	
	public List<Map<String, Object>> findPhoneById(String id) {
		return this.phoneDao.findPhoneById(id);
	}
	public void updatePhone(Phone Phone) {
		this.phoneDao.updatePhone(Phone);
	}
	public List<Map<String, Object>> search(String value, String mark) {
		try{
			return this.phoneDao.search(value,mark);
		}catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		
		return null;
	}
	
	public List<Map<String, Object>> findPhoneOrderByIdByLimit(int currentPage,int pageSize){
		try{
			return this.phoneDao.findPhoneOrderByIdByLimit(currentPage,pageSize);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Long findTotalOfPhone() {
		try{
			return this.phoneDao.findTotalOfPhone();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return 1l;
	}
	public  void deInventory(String phoneId,String number)
	{
		try 
		{
			this.phoneDao.deInventory(phoneId,number);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public List<Map<String, Object>> assoSearch(String searchCon ) {
		try{
			return this.phoneDao.assoSearch(searchCon);
		}catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		
		return null;
	}
	 
}
