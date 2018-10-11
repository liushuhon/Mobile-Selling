package entity;

public class OrderInfo {
	private String phoneId;
	private String orderId;
	private String number; 
	public OrderInfo(){
	}
	public OrderInfo(String odInfoCode, String phoneId, String orderId,String number ) {
		super();
		this.phoneId = phoneId;
		this.orderId = orderId;
		this.number = number; 
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getPhoneId() {
		return phoneId;
	}
	public void setPhoneId(String phoneId) {
		this.phoneId = phoneId;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
}
