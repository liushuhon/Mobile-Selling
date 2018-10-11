package service;

import java.util.List;
import java.util.Map;

import dao.MiddleDao;
import entity.Middle;

public class MiddleService {
	private MiddleDao middleDao = new MiddleDao();
	public  void addMiddle(Middle Middle)
	{
		try 
		{
			this.middleDao.addMiddle(Middle);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public List<Map<String, Object>> showMiddle(String curUser) {
		try 
		{
			return this.middleDao.showMiddle(curUser);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
		 
	}
	public List<Map<String, Object>> showConfirmMiddle(String curUser) {
		try 
		{
			return this.middleDao.showConfirmMiddle(curUser);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
		 
	}
	public  void deleteGood(String goodCode)
	{
		try 
		{
			this.middleDao.deleteGood(goodCode);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public  void changeGoodMark1(String goodCode,String number)
	{
		try 
		{
			this.middleDao.changeGoodMark1(goodCode,number);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public  List<Map<String, Object>> findNumber(String goodCode)
	{
		try 
		{
			return	this.middleDao.findNumber(goodCode );
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public  List<Map<String, Object>> findPhoneExistInMiddle(String cartCode,String phoneCode )
	{
		try 
		{
			return	this.middleDao.findPhoneExistInMiddle(cartCode,phoneCode );
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public  void deleteBuyGood(String userId)
	{
		try 
		{
			this.middleDao.deleteBuyGood(userId);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public  void deleteBuyGoodForDirect(String userId,String phoneCode)
	{
		try 
		{
			this.middleDao.deleteBuyGoodForDirect(userId,phoneCode);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public  void changeGoodMark0(String userCode)
	{
		try 
		{
			this.middleDao.changeGoodMark0(userCode);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public  void updateNumber(String cartCode,String phoneCode,String number)
	{
		try 
		{
			this.middleDao.updateNumber(cartCode,phoneCode,number);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public  List<Map<String, Object>> findMiddleMark1(String curUser )
	{
		try 
		{
			return	this.middleDao.findMiddleMark1(curUser );
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public  void deletePhoneMark1(String phoneCode,String cartCode)
	{
		try 
		{
			this.middleDao.deletePhoneMark1(phoneCode,cartCode);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
}
