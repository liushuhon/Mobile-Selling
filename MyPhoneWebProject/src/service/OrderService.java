package service;

import java.util.List;
import java.util.Map;

import dao.OrderDao;
import entity.Order;

public class OrderService {
 private  OrderDao orderDao = new OrderDao();
 public  void addOrder(Order order)
	{
		try 
		{
			this.orderDao.addOrder(order);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
 public List<Map<String, Object>> findOrder(String userCode,String mark)
	{
		try 
		{
			return this.orderDao.findOrder(userCode,mark);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
	}
 public List<Map<String, Object>> findAllOrderByIdByLimit(int currentPage,int pageSize){
		try{
			return this.orderDao.findOrderByIdByLimit(currentPage,pageSize);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
 public Long findTotalOfOrder() {
		try{
			return this.orderDao.findTotalOfOrder();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return 1l;
	}
 public List<Map<String, Object>> selectOrderCode(String userCode )
	{
		try 
		{
			return this.orderDao.selectOrderCode(userCode);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
		return null;
	}
 public List<Map<String, Object>> search(String value, String mark) {
		try{
			return this.orderDao.search(value,mark);
		}catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		
		return null;
	}
 public List<Map<String, Object>> changeOrderState(String orderId, String orderState) {
		try{
			return this.orderDao.changeOrderState(orderId, orderState);
		}catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		
		return null;
	}
}
