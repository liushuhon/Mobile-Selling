package service;

import java.util.List;
import java.util.Map;

import dao.CartDao;
import entity.Cart;
  

public class CartService {
 private  CartDao cartDao = new CartDao();
 public  void addCart(Cart cart)
	{
		try 
		{
			this.cartDao.addCart(cart);
		}
		catch(Exception e)
		{
			System.out.println("�������ݿ����");
		}
	}
 public List<Map<String, Object>> findCart(String userCode)
	{
		try 
		{
			return this.cartDao.findCart(userCode);
		}
		catch(Exception e)
		{
			System.out.println("�������ݿ����");
		}
		return null;
	}
}
