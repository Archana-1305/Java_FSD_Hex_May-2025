package com.assignment.model;

import java.time.LocalDate;

import com.assignment.enums.Coupon;

public class Purchase {
	
    
    private int purchaseId;
	private Customer customer;
	private Product product;
	private int quantity;
	private double totalAmount;
	private LocalDate purchaseDate;
	private Coupon couponUsed;
    
	public Purchase() { }

	public Purchase(int purchaseId, Customer customer, Product product, int quantity, double totalAmount,
			LocalDate purchaseDate, Coupon couponUsed) {
		super();
		this.purchaseId = purchaseId;
		this.customer = customer;
		this.product = product;
		this.quantity = quantity;
		this.totalAmount = totalAmount;
		this.purchaseDate = purchaseDate;
		this.couponUsed = couponUsed;
	}

	public int getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(int purchaseId) {
		this.purchaseId = purchaseId;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public LocalDate getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(LocalDate purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public Coupon getCouponUsed() {
		return couponUsed;
	}

	public void setCouponUsed(Coupon couponUsed) {
		this.couponUsed = couponUsed;
	}

	@Override
	public String toString() {
		return "Purchase [purchaseId=" + purchaseId + ", customer=" + customer + ", product=" + product + ", quantity="
				+ quantity + ", totalAmount=" + totalAmount + ", purchaseDate=" + purchaseDate + ", couponUsed="
				+ couponUsed + "]";
	}

	
	
    
    

}
