package service;

import java.util.List;
import java.util.Map;

import dao.OrderInfoDao;
import entity.Order;
import entity.OrderInfo;

public class OrderInfoService {
	private OrderInfoDao orderInfoDao = new OrderInfoDao();
	public  void addOrderInfo(String orderId,String userId)
	{
		try 
		{
			this.orderInfoDao.addOrderInfo(orderId,userId);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public  void addOrderInfoForDirect(String orderId,String phoneCode,String number)
	{
		try 
		{
			this.orderInfoDao.addOrderInfoForDirect(orderId,phoneCode,number);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public List<Map<String, Object>> showOrderInfo(String curUser) {
		try 
		{
			return this.orderInfoDao.showOrderInfo(curUser);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
		 
	}
	public List<Map<String, Object>> selectOrderInfoByOrderId(String orderCode) {
		try 
		{
			return this.orderInfoDao.selectOrderInfoByOrderId(orderCode);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
		 
	}
	public List<Map<String, Object>> selectOrderInfoByOrderCode(String orderCode) {
		try 
		{
			return this.orderInfoDao.selectOrderInfoByOrderCode(orderCode);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
		 
	}
 
	public  List<Map<String, Object>> findNumber(String goodCode)
	{
		try 
		{
			return	this.orderInfoDao.findNumber(goodCode );
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	
}
