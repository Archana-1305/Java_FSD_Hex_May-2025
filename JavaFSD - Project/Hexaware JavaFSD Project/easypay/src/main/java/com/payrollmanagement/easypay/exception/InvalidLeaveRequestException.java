package com.payrollmanagement.easypay.exception;

public class InvalidLeaveRequestException extends RuntimeException {
	private static final long serialVersionUID = 1L;
    public InvalidLeaveRequestException(String message) {
        super(message);
    }
}