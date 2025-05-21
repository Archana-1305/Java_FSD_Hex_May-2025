package com.assignment.service;

import java.time.LocalDate;
import java.util.Scanner;

import com.assignment.dao.CustomerDao;
import com.assignment.dao.ProductDao;
import com.assignment.dao.PurchaseDao;
import com.assignment.dao.impl.CustomerDaoImpl;
import com.assignment.dao.impl.ProductDaoImpl;
import com.assignment.dao.impl.PurchaseDaoImpl;
import com.assignment.enums.Coupon;
import com.assignment.exception.InvalidIdException;
import com.assignment.model.Customer;
import com.assignment.model.Product;
import com.assignment.model.Purchase;

public class PurchaseService {
	private PurchaseDao purchaseDao = new PurchaseDaoImpl();
	private ProductDao productDao = new ProductDaoImpl();
	private CustomerDao customerDao = new CustomerDaoImpl();
	
	public void insert(int customerId, int productId, Scanner sc)throws InvalidIdException {
		Purchase purchase = new Purchase();
		
		Customer customer = customerDao.getById(customerId);
		purchase.setCustomer(customer);
		
		Product product = productDao.getById(productId);
		purchase.setProduct(product);
		
		System.out.println("Enter quantity:");
		int qty = sc.nextInt();
		purchase.setQuantity(qty);
		
		System.out.println("Do you have a coupon? (Y/N)");
		String ans = sc.next();
		double discount = 0.0;
		if (ans.equalsIgnoreCase("Y")) {
			System.out.println("Enter the coupon code:");
			String couponCode = sc.next().toUpperCase();
			try {
				Coupon coupon = Coupon.valueOf(couponCode);
				discount = coupon.getDiscount();
				System.out.println("Coupon applied: " + discount + "% off");
				purchase.setCouponUsed(coupon);
			} catch (IllegalArgumentException e) {
				System.out.println("Invalid coupon. No discount will be applied.");
			}
		} else {
			System.out.println("No coupon applied.");
		}
		
		// Step 5: Calculate total amount
		double total = product.getPrice() * qty;
		double finalAmount = total - (total * (discount / 100));
		if (finalAmount < 0) {
			finalAmount = 0;
		}
		purchase.setTotalAmount(finalAmount);
		purchase.setPurchaseDate(LocalDate.now());
		
		// Step 6: Save purchase
		purchaseDao.addPurchase(purchase);
		System.out.println("Final amount: ₹" + finalAmount);
	
	}

}
