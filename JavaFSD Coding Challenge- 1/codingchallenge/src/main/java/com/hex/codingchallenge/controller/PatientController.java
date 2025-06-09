package com.hex.codingchallenge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.hex.codingchallenge.service.PatientService;

@RestController
public class PatientController {
	@Autowired
	private PatientService patientService;

}
