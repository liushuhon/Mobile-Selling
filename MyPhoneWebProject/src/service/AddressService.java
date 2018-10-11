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
				System.out.println("�������ݿ����");
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
				System.out.println("�������ݿ����");
			}
			return null;
		}
}
