package com.hex.codingchallenge.service;

import org.springframework.stereotype.Service;

import com.hex.codingchallenge.repository.PatientRepository;

@Service
public class PatientService {
	private PatientRepository patientRepository;

	public PatientService(PatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}
	
	

}
