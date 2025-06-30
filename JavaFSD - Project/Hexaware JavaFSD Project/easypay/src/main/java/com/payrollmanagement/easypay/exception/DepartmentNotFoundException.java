package com.payrollmanagement.easypay.exception;

public class DepartmentNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private String message;

	public DepartmentNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
}
