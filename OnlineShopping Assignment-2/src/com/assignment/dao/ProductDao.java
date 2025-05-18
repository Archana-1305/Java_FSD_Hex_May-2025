package com.assignment.dao;

import java.util.List;

import com.assignment.exception.InvalidIdException;
import com.assignment.model.Product;

public interface ProductDao {
	void addProduct(Product product);
	List<Product> getByCategoryId(int categoryId)throws InvalidIdException;
	Product getById(int productId) throws InvalidIdException;
	
}
