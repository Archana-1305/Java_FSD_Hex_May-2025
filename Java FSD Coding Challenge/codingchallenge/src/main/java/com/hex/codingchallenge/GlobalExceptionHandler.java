package com.hex.codingchallenge;

import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.hex.codingchallenge.exception.ResourceNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {
	Logger logger = LoggerFactory.getLogger("GlobalExceptionHandler");
	/*
	 * Whenever a RuntimeException is thrown in Controller, this method gets called
	 * */
	@ExceptionHandler(exception = RuntimeException.class)
	public ResponseEntity<?> handleRuntime(RuntimeException e) {
		logger.info(e.getMessage());
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		logger.error(e.getMessage(), e.getClass());
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	/*
	 * Whenever a Custom ResourseNotFoundException is thrown in Controller, 
	 * this method gets called
	 * */
	@ExceptionHandler(exception = ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		logger.error(e.getMessage(), e.getClass());
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	/*Add commentMore actions
	 * Whenever a token is invalid , 
	 * this method gets called
	 * */
	@ExceptionHandler(exception = SignatureException.class)
	public ResponseEntity<?> handleSignatureException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		logger.error(e.getMessage(), e.getClass());
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(map);
	}


}
