package com.hex.codingchallenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hex.codingchallenge.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer>{

}
