package entity;

public class Address {
	private String userId;
	private String add;
	private String name;
	public Address(){
	}
	public Address(String userId, String address,String name) {
		super();
		this.userId = userId;
		this.add = address;
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAdd() {
		return add;
	}
	public void setAdd(String address) {
		this.add = address;
	}
	
}
