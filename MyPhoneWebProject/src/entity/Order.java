package entity;

public class Order {
	private String orderCode;
	private String userId;
	private String mark;
	private String address;
	public Order(){
		
	}
	public Order(String orderCode, String userId,String mark,String address) {
		super();
		this.orderCode = orderCode;
		this.userId = userId;
		this.address = address;
	}
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getOrderCode() {
		return orderCode;
	}
	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
