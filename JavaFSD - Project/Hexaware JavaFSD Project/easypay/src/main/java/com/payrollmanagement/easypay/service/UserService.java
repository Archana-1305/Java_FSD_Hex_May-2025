package com.payrollmanagement.easypay.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.payrollmanagement.easypay.model.Employee;
import com.payrollmanagement.easypay.model.User;
import com.payrollmanagement.easypay.repository.EmployeeRepository;
import com.payrollmanagement.easypay.repository.UserRepository;

@Service
public class UserService {
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private EmployeeRepository employeeRepository;
	
	
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			EmployeeRepository employeeRepository) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.employeeRepository = employeeRepository;
	}

	public User signUp(User user) {
		// encrypt the pain text password given 
		String plainPassword = user.getPassword(); //<- this gives you plain password
		String encodedPassword =  passwordEncoder.encode(plainPassword);
		user.setPassword(encodedPassword); //<- Now, User has encoded password 
		
		// Save User in DB 
		return userRepository.save(user);
	}

	public Object getUserInfo(String username) {
	    User user = userRepository.findByUsername(username);
	    if (user == null) throw new UsernameNotFoundException(username);
	    switch (user.getRole()) {
        case SYSTEM_ADMIN:
            user.setPassword(null); // Mask password
            return user;
        case PAYROLL_ADMIN:
        	user.setPassword(null); // Mask password
            return user;
        	
        case EMPLOYEE:
            Employee employee = employeeRepository.findByUser(user);
            if (employee == null) throw new RuntimeException("Employee profile not found!");
            employee.getUser().setPassword(null);
            return employee;
        default:
            throw new RuntimeException("Unknown user role");
    }
	}

}
