package com.payrollmanagement.easypay.exception;

public class InvalidOperationException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private String message;


	public InvalidOperationException(String message) {
		super();
		this.message = message;
	}


	public String getMessage() {
		return message;
	} 

}
