package com.payrollmanagement.easypay;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.payrollmanagement.easypay.exception.InvalidLeaveRequestException;
import com.payrollmanagement.easypay.exception.InvalidOperationException;
import com.payrollmanagement.easypay.exception.ResourceNotFoundException;

import io.jsonwebtoken.security.SignatureException;
@RestControllerAdvice
public class GlobalExceptionHandler {
	
	/* Whenever a RuntimeException is thrown in Controller, this method gets called
	 * */
	@ExceptionHandler(exception = RuntimeException.class)
	public ResponseEntity<?> handleRuntime(RuntimeException e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	/*Whenever a Custom ResourseNotFoundException is thrown in Controller, 
	 * this method gets called
	 * */
	@ExceptionHandler(exception = ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	/* Whenever a token is invalid , 
	 * this method gets called
	 * */
	@ExceptionHandler(exception = SignatureException.class)
	public ResponseEntity<?> handleSignatureException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(map);
	}
	
	@ExceptionHandler(exception=InvalidOperationException.class)
    public ResponseEntity<Map<String, String>> handleInvalidOperationException(InvalidOperationException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
	
	 @ExceptionHandler(InvalidLeaveRequestException.class)
	    public ResponseEntity<?> handleInvalidLeaveRequest(InvalidLeaveRequestException ex) {
	        Map<String, Object> err = new HashMap<>();
	        err.put("timestamp", LocalDateTime.now());
	        err.put("status", HttpStatus.BAD_REQUEST.value());
	        err.put("error", "Bad Request");
	        err.put("message", ex.getMessage());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	    }

}
