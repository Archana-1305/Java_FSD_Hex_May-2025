package com.test;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import com.assignment.exception.InvalidIdException;
import com.assignment.model.Product;
import com.assignment.service.ProductService;

public class ProductServiceTest {
	ProductService productService;
    Product p1;
    Product p2;
    Product p3;
    List<Product> productList;
    
    @BeforeEach
    public void init() {
        productService = new ProductService();
        Product p1 = new Product(1, "Apple", 3000.0, 1);
        Product p2 = new Product(2, "HP", 1500.0, 2);
        productList = Arrays.asList(p1, p2);
    }
    
    @Test
    public void insertProductTest() {
        Product newProduct = new Product(2, "HP", 1500.0, 2);
        assertDoesNotThrow(() -> productService.insertProduct(newProduct));
    }
   
    @Test
    public void fetchByCategoryTest() throws InvalidIdException  {
       
        List<Product> expected = productService.fetchByCategory(1);
        assertDoesNotThrow(() -> productService.fetchByCategory(1));
    }
    
    @Test
    public void fetchByCategoryInvalidTest() {
        InvalidIdException e = assertThrows(
            InvalidIdException.class, 
            () -> productService.fetchByCategory(-1)
        );
        assertEquals("Invalid Category ID", e.getMessage());
    }
}
