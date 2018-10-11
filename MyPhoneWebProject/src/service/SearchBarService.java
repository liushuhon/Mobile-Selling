package service;

import java.util.List;
import java.util.Map;

import dao.SearchBarDao;

public class SearchBarService {
	SearchBarDao searchBarDao = new SearchBarDao();

	 public List<Map<String, Object>>  findGoods() {
		{
			try 
			{
				return this.searchBarDao.findGoods();
			}
			catch(Exception e)
			{
				System.out.println("操作数据库出错！");
			}
			return null;
		}
}
}
