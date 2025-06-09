package com.hex.codingchallenge.service;

import org.springframework.stereotype.Service;

import com.hex.codingchallenge.model.Doctor;
import com.hex.codingchallenge.model.User;
import com.hex.codingchallenge.repository.DoctorRepository;

@Service
public class DoctorService {

	private DoctorRepository doctorRepository;
	private UserService userService;

	public DoctorService(DoctorRepository doctorRepository, UserService userService) {
		super();
		this.doctorRepository = doctorRepository;
		this.userService = userService;
	}

	public Object insertPatient(Doctor doctor) {
		// Take user out of this doctor object
		User user = doctor.getUser();

		// Give role to this user
		user.setRole("DOCTOR");

		// Save this User in the DB
		user = userService.signUp(user);

		// Attach this user back to doctor
		doctor.setUser(user);

		// Save doctor in DB
		return doctorRepository.save(doctor);

	}

}