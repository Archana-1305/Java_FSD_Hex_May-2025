package com.hex.codingchallenge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hex.codingchallenge.model.DoctorPatient;
import com.hex.codingchallenge.model.Patient;
import com.hex.codingchallenge.service.DoctorPatientService;

import org.springframework.web.bind.annotation.PostMapping;


@RestController

public class DoctorPatientController {
	
	@Autowired
	private DoctorPatientService doctorPatientService;
 
	
	/*
	 * AIM: Book an appointment between a patient and a doctor
	 * METHOD: POST
	 * PATH: /api/appointment/{patientId}/{doctorId}
	 * PARAM: @PathVariable int patientId
	 *        @PathVariable int doctorId 
	 *        @RequestBody DoctorPatient doctorPatient 
	 * RESPONSE: DoctorPatient
	 */
	
	@PostMapping("/api/appointment/{patientId}/{doctorId}")
	public DoctorPatient appointment(@PathVariable int patientId,
			@PathVariable int doctorId,
			@RequestBody DoctorPatient doctorPatient) {
		return doctorPatientService.appointment(patientId,doctorId,doctorPatient);
		
	}
	
	/*
	 * AIM: Retrieve all patients assigned to a specific doctor
	 * METHOD: GET
	 * PATH: /api/getPatientByDoctorId/{doctorId}
	 * PARAM: @PathVariable int doctorId 
	 * RESPONSE: List of Patient associated with the given doctor ID
	 */
	
	 @GetMapping("/api/getPatientByDoctorId/{doctorId}")
	public List<Patient> getAllPatientByDoctorId(@PathVariable int doctorId) {
		return doctorPatientService. getAllPatientByDoctorId(doctorId);
		
	}
	
	
}
