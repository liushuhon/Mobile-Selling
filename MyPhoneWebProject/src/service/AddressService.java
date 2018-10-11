package service;

import java.util.List;
import java.util.Map;

import dao.AddressDao; 
import entity.Address; 

public class AddressService {
	private  AddressDao addressDao = new AddressDao();
	 public  void addAddress(Address address)
		{
			try 
			{
				this.addressDao.addAddress(address);
			}
			catch(Exception e)
			{
				System.out.println("操作数据库出错！");
			}
		}
	 public List<Map<String, Object>> findAdd(String userCode)
		{
			try 
			{
				return this.addressDao.findAdd(userCode);
			}
			catch(Exception e)
			{
				System.out.println("操作数据库出错！");
			}
			return null;
		}
}
