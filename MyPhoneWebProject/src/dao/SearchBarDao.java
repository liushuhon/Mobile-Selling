package dao;

import java.util.List;
import java.util.Map;

import util.CommonDAO;

public class SearchBarDao {
	private CommonDAO  commonDAO = new CommonDAO();
	 public List<Map<String, Object>>findGoods() {
			try{
				String sql  = "select * from phone";
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;
		 
	}
}
