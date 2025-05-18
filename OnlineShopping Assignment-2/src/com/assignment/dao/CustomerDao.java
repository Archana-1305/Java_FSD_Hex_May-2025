package com.assignment.dao;

import com.assignment.exception.InvalidIdException;
import com.assignment.model.Customer;


public interface CustomerDao {
	Customer getById(int id) throws InvalidIdException;

}
