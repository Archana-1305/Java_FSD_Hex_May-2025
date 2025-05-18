package com.assignment.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.assignment.dao.CustomerDao;
import com.assignment.exception.InvalidIdException;
import com.assignment.model.Customer;
import com.assignment.utility.DBUtil;

public class CustomerDaoImpl implements CustomerDao {
	DBUtil db = DBUtil.getInstance();

	@Override
	public Customer getById(int customerId) throws InvalidIdException {
		Connection con = db.connect();
		Customer customer=null;
		String sql ="Select * from customer where customer_id = ?";
		
		try {
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setInt(1, customerId);
			ResultSet rs = pst.executeQuery();
			
			if(rs.next()) {
				customer = new Customer();
				customer.setCustomerId(rs.getInt("customer_id"));
				customer.setCustomerName(rs.getString("customer_name"));
				customer.setCity(rs.getString("city"));
				
				
			}
			else {
	            throw new InvalidIdException("Id given is Invalid");
	        }
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		db.close();
		return customer;
	}

}
