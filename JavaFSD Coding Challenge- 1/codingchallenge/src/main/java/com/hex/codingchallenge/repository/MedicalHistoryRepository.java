package com.hex.codingchallenge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hex.codingchallenge.model.MedicalHistory;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Integer> {
	
	
	@Query("select mh from MedicalHistory mh where mh.patient.id=?1")
	List<MedicalHistory> getAllMedicalRecordByPatientId(int patientId);

}
