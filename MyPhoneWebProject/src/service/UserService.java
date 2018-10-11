package service;

import java.util.List;
import java.util.Map;

import dao.UserDao;
import entity.User;

public class UserService {
	private UserDao userDao = new UserDao();
	public void addUser(User user){
		try 
		{
			this.userDao.addUser(user);
		}
		catch(Exception e)
		{
			System.out.println("操作数据库出错！");
		}
	}
	public List<Map<String, Object>> findUserById(String id) {
		return this.userDao.findUserById(id);
	}
	public List<Map<String, Object>> findUserOrderByIdByLimit(int currentPage,int pageSize){
		try{
			return this.userDao.findUserOrderByIdByLimit(currentPage,pageSize);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public Long findTotalOfUser() {
		try{
			return this.userDao.findTotalOfUser();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return 1l;
	}
	public void editUserById(User user,String id) {
		this.userDao.editUserById(user,id);
	}
	public void deleteUser(String id) {
		this.userDao.deleteUser(id);
		
	}public List<Map<String, Object>> search(String value, String mark) {
		try{
			return this.userDao.search(value,mark);
		}catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		
		return null;
	}
	
}
