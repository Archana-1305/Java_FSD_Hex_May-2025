package com.assignment.enums;

public enum Coupon {
	DIWALI(15),
	NEW_YEAR(10),
	CHRISTMAS(20),
	SPRING(5);
	
	Coupon(int discount){
		this.discount = discount;
	}
	
	private int discount;

	public int getDiscount() {
		return discount;
	} 

}
