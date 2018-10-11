package entity;

public class Phone {
	private String phoneCode;
	private String price;
	private String phoneName;
	private String image;
	private String id;
	private String number;
	public Phone(){
	}
	public Phone(String phoneCode, String price, String phoneName, String image) {
		super();
		this.phoneCode = phoneCode;
		this.price = price;
		this.phoneName = phoneName;
		this.image = image;
	}
	
	public Phone(String phoneCode, String price, String phoneName, String image, String id,String number) {
		super();
		this.phoneCode = phoneCode;
		this.price = price;
		this.phoneName = phoneName;
		this.image = image;
		this.id = id;
		this.number = number;
	}
	
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPhoneCode() {
		return phoneCode;
	}
	public void setPhoneCode(String phoneCode) {
		this.phoneCode = phoneCode;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getPhoneName() {
		return phoneName;
	}
	public void setPhoneName(String phoneName) {
		this.phoneName = phoneName;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
}
