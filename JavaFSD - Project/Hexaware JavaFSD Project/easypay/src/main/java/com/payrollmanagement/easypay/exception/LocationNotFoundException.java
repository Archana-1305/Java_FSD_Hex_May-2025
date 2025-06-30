package com.payrollmanagement.easypay.exception;

public class LocationNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private String message;

	public LocationNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 

}
