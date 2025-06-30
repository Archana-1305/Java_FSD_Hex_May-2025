package com.payrollmanagement.easypay.exception;

public class BadRequestException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private String message;

	

	public BadRequestException(String message) {
		super();
		this.message = message;
	}



	public String getMessage() {
		return message;
	} 
}
