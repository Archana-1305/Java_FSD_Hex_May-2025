package com.payrollmanagement.easypay.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.model.User;
import com.payrollmanagement.easypay.service.UserService;
import com.payrollmanagement.easypay.util.JwtUtil;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	/*
	 * @Autowired private JwtUtil jwtUtil;
	 */
	/*
	 * AIM: Insert the user in the DB with password encrypted. 
	 * PATH: /api/user/signup
	 * PARAM: @RequestBody User user 
	 * Response: User 
	 * METHOD: POST 
	 * */
	@PostMapping("/signup")
	public User signUp(@RequestBody User user ) {
		return userService.signUp(user);
	}
		
	
	@GetMapping("/token")

	public ResponseEntity<?> getToken(Principal principal) {
		try {
		String token =jwtUtil.createToken(principal.getName()); 
		Map<String, Object> map = new HashMap<>();
		map.put("token", token);
		return ResponseEntity.status(HttpStatus.OK).body(map);
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}
	@GetMapping("/details")
	public ResponseEntity<?> getLoggedInUserDetails(Principal principal) {
	    try {
	        Object userDetails = userService.getUserInfo(principal.getName());
	        return ResponseEntity.ok(userDetails);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	    }
	}
	
	 

}
