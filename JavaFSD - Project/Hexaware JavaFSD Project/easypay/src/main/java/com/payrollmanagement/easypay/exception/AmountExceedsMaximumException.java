package com.payrollmanagement.easypay.exception;

public class AmountExceedsMaximumException extends RuntimeException {
    public AmountExceedsMaximumException(String message) {
        super(message);
    }
}
