package entity;

public class Cart { 
	private String userId;
	private String cartCode;
	public Cart(){
		
	}
	public Cart(  String userId,String cartCode) {
		super(); 
		this.userId = userId;
		this.cartCode = cartCode;
	}
 
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getCartCode() {
		return cartCode;
	}
	public void setCartCode(String cartCode) {
		this.cartCode = cartCode;
	}
	
}
