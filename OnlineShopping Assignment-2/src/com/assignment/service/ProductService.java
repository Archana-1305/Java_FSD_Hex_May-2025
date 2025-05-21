package com.assignment.service;

import com.assignment.model.Product;

import java.util.List;

import com.assignment.dao.*;
import com.assignment.dao.impl.*;
import com.assignment.exception.InvalidIdException;

public class ProductService {
	
	private ProductDao productDao = new ProductDaoImpl();
	
	public void insertProduct(Product product) {
		int productId = (int) (Math.random() * 10000);
		product.setProductId(productId);
		productDao.addProduct(product);		
	}
	
	public List<Product> fetchByCategory(int categoryId) throws InvalidIdException {
	    return productDao.getByCategoryId(categoryId);
	}

}
