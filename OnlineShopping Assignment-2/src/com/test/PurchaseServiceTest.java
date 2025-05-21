package com.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;


import java.util.Scanner;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.assignment.exception.InvalidIdException;
import com.assignment.model.Customer;
import com.assignment.model.Product;
import com.assignment.service.PurchaseService;

public class PurchaseServiceTest {
	PurchaseService purchaseService;
    Customer c1;
    Product p1;
    Scanner sc;

    @BeforeEach
    public void init() {
        purchaseService = new PurchaseService();
        c1 = new Customer(1, "John Doe", "New York");
        p1 = new Product(1, "Apple", 3000.0, 1);
    }

    @Test
    public void insertTest_ValidQuantityWithCoupon() throws InvalidIdException {
      
        int quantity = 3;
        String hasCoupon = "Y";
        String couponCode = "DIWALI";
        sc = new Scanner(quantity + "\n" + hasCoupon + "\n" + couponCode + "\n");
        assertDoesNotThrow(() -> purchaseService.insert(c1.getCustomerId(), p1.getProductId(), sc));
    }

    @Test
    public void insertTest_ValidQuantityWithoutCoupon() throws InvalidIdException {
        
        int quantity = 5;
        String hasCoupon = "N";
        sc = new Scanner(quantity + "\n" + hasCoupon + "\n");  
        assertDoesNotThrow(() -> purchaseService.insert(c1.getCustomerId(), p1.getProductId(), sc));
    }

    @Test
    public void insertTest_InvalidCouponCode() throws InvalidIdException {
       
        int quantity = 1;
        String hasCoupon = "Y";
        String couponCode = "INVALID";
        sc = new Scanner(quantity + "\n" + hasCoupon + "\n" + couponCode + "\n");
        assertDoesNotThrow(() -> purchaseService.insert(c1.getCustomerId(), p1.getProductId(), sc));
    }

    @Test
    public void insertTest_InvalidCustomer_ThrowsException() {
        
        int quantity = 1;
        String hasCoupon = "N";
        sc = new Scanner(quantity + "\n" + hasCoupon + "\n");
        InvalidIdException e = assertThrows(InvalidIdException.class, () -> {
            purchaseService.insert(-10, p1.getProductId(), sc);
        });
        assertEquals("id given is invalid", e.getMessage().toLowerCase());
    }

    @Test
    public void insertTest_InvalidProduct_ThrowsException() {
        
        int quantity = 1;
        String hasCoupon = "N";
        sc = new Scanner(quantity + "\n" + hasCoupon + "\n");
        InvalidIdException e = assertThrows(InvalidIdException.class, () -> {
            purchaseService.insert(c1.getCustomerId(), -5, sc);
        });
        assertEquals("id given is invalid", e.getMessage().toLowerCase());
    }
}
