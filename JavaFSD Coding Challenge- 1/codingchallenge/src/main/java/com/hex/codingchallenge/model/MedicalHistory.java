package com.hex.codingchallenge.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="medical_history")
public class MedicalHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 255)
	private String illness;
	
	private int num_of_years;
	
	@Column(length = 1000)
	private String current_medication;
	
	@ManyToOne
	private Patient patient;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getIllness() {
		return illness;
	}

	public void setIllness(String illness) {
		this.illness = illness;
	}

	public int getNum_of_years() {
		return num_of_years;
	}

	public void setNum_of_years(int num_of_years) {
		this.num_of_years = num_of_years;
	}

	public String getCurrent_medication() {
		return current_medication;
	}

	public void setCurrent_medication(String current_medication) {
		this.current_medication = current_medication;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	
	
	

}