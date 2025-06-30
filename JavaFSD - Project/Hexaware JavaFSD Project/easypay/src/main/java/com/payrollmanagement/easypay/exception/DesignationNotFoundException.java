package com.payrollmanagement.easypay.exception;

public class DesignationNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private String message;

	public DesignationNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
}
