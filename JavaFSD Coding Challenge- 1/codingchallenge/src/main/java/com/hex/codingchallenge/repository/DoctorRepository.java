package com.hex.codingchallenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hex.codingchallenge.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer>{

}
