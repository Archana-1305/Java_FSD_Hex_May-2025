package com.assignment.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.assignment.dao.ProductDao;
import com.assignment.exception.InvalidIdException;
import com.assignment.model.Product;
import com.assignment.utility.DBUtil;

public class ProductDaoImpl implements ProductDao {
	
	DBUtil db = DBUtil.getInstance();

	@Override
	public void addProduct(Product product) {
		Connection con = db.connect();
		String sql = "Insert Into Product values (?,?, ?, ?)";
		try {
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setInt(1, product.getProductId());
			pst.setString(2, product.getProductName());
            pst.setDouble(3, product.getPrice());
            pst.setInt(4, product.getCategoryId());
            pst.executeUpdate();
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		db.close();
		
		
	}

	@Override
	public List<Product> getByCategoryId(int categoryId) throws InvalidIdException {
		Connection con = db.connect();
		String sql = "Select * From Product Where category_id = ?";
		List<Product> list = new ArrayList<>();
		
		try {
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setInt(1, categoryId);
	        ResultSet rs = pst.executeQuery();
	        while (rs.next()) {
	            Product p = new Product();
	            p.setProductId(rs.getInt("product_id"));
	            p.setProductName(rs.getString("product_name"));
	            p.setPrice(rs.getDouble("price"));
	            p.setCategoryId(rs.getInt("category_id"));
	            list.add(p);
	        }
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		
		if (list.isEmpty()) {
			throw new InvalidIdException("Invalid Category ID");
	    }
		
		return list;
	}
	
	public Product getById(int productId) throws InvalidIdException{
		Connection con = db.connect();
		Product product=null;
		String sql ="Select * from product where product_id = ?";
		
		try {
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setInt(1, productId);
			ResultSet rs = pst.executeQuery();
			
			if(rs.next()) {
				product = new Product();
				product.setProductId(rs.getInt("product_id"));
				product.setProductName(rs.getString("product_name"));
				product.setPrice(rs.getDouble("price"));
				product.setCategoryId(rs.getInt("category_id"));
				
				
			}
			else {
	            throw new InvalidIdException("Id given is Invalid");
	        }
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return product;
		
	}

	

}
