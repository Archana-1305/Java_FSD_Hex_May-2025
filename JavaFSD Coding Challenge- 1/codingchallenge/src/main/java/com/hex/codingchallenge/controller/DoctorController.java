package com.hex.codingchallenge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hex.codingchallenge.model.Doctor;

import com.hex.codingchallenge.service.DoctorService;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
	
	@Autowired
	private DoctorService doctorService;
	/*
	 * AIM: To add doctor in Db along with its user credentails  
	 * PATH: http://localhost:8080/api/doctor/add
	 * Response: Doctor with User details
     * PARAM: @RequestBody Doctor doctor
     * METHOD: POST 
     * */
	
	@PostMapping("/add")
	public ResponseEntity<?> insertDoctor(@RequestBody Doctor doctor) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(doctorService.insertPatient(doctor));
		
	}

}