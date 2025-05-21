package com.assignment.controller;

import java.util.List;
import java.util.Scanner;

import com.assignment.exception.InvalidIdException;
import com.assignment.model.Product;
import com.assignment.service.ProductService;
import com.assignment.service.PurchaseService;

public class App {
	public static void main(String args[]) throws InvalidIdException {
		Scanner sc = new Scanner(System.in);
		ProductService productService = new ProductService();
		PurchaseService purchaseService = new PurchaseService();
		Product product = new Product();
		
		while(true) {
			System.out.println("---------------------- MENU ----------------------");
			System.out.println("1. Add Product");
			System.out.println("2. Fetch Product By Category");
			System.out.println("3. Purchase");
			System.out.println("4. To Exit");
			System.out.println("--------------------------------------------------");
			int input  = sc.nextInt(); 
			if(input == 4) {
				System.out.println("Exited!!");
				break; 
			}
			
			switch(input) {
			
			case 1:
				// Inserting Product.
				System.out.println("Enter Product Name: ");
				sc.nextLine();
				product.setProductName(sc.nextLine());
				System.out.println("Enter Price: ");
				product.setPrice(sc.nextDouble());
				System.out.println("Enter Category ID: ");
				product.setCategoryId(sc.nextInt());
				productService.insertProduct(product);
				System.out.println("Product added in DB");
				break;
			
			case 2:
				// Fetching Products by Category ID
				System.out.println("Enter Category ID: ");
				 int id = sc.nextInt();
				    List<Product> products = productService.fetchByCategory(id);
				    if (products.isEmpty()) {
				        System.out.println("No products found for this category.");
				    } else {
				        for (Product p : products) {
				            System.out.println("ID: " + p.getProductId() + 
				                               ", Name: " + p.getProductName() +
				                               ", Price: " + p.getPrice());
				        }
				    }
				    break;
			
			case 3:
				// Purchasing
				System.out.print("Enter Customer ID: ");
                int customerId = sc.nextInt();
                System.out.print("Enter Product ID: ");
                int productId = sc.nextInt();
                
                try {
                	purchaseService.insert(customerId, productId, sc);
					System.out.println("Product Purchased Sucessfully");
				} catch (InvalidIdException e) {
					 System.out.println(e.getMessage());
				}catch(IllegalArgumentException e) {
					System.out.println("Coupon code is Invalid!!");
				}
                break; 
				
			default: 
				System.out.println("Invaid Input!!!");
               
			
				
			}
		}
		sc.close();
		
		
	}

}
