package com.assignment.exception;

public class InvalidIdException extends Exception {
	private static final long serialVersionUID=629358560522435677L;
	private String message;
	
	public InvalidIdException(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	

}
