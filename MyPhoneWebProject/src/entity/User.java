package entity;

import java.util.Date;

public class User {
	private String userCode;
	private String password;
	private String unit;
	private Date birth;
	public User(){
	}
	public User(String userCode, String password,String unit,Date birth) {
		super();
		this.userCode = userCode;
		this.password = password;
		this.unit = unit;
		this.birth = birth;
	}
	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	
}
