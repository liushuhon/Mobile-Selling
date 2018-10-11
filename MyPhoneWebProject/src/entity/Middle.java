package entity;

public class Middle {
	private String phoneId;
	private String cartId;
	private String number; 
	private String mark;
	public Middle(){
	}
	public Middle(String odInfoCode, String phoneId, String cartId,String number,String mark ) {
		super();
		this.phoneId = phoneId;
		this.cartId = cartId;
		this.number = number;
		this.mark = mark;
		 
	}
 
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
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
	public String getCartId() {
		return cartId;
	}
	public void setCartId(String cartId) {
		this.cartId = cartId;
	}
	
}
