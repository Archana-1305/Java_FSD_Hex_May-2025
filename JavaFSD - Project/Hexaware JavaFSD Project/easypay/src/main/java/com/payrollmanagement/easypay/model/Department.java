package com.payrollmanagement.easypay.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "department_info")
public class Department {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String departmentName;
	private String departmentCode;
	private String description;
	private LocalDate createdOn;
	private Boolean isActive;
	private Boolean isDelete;
	
	@ManyToOne
    private Company company;
	
	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public String getDepartmentName() { return departmentName; }
	public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

	public String getDepartmentCode() { return departmentCode; }
	public void setDepartmentCode(String departmentCode) { this.departmentCode = departmentCode; }

	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }

	public LocalDate getCreatedOn() { return createdOn; }
	public void setCreatedOn(LocalDate createdOn) { this.createdOn = createdOn; }

	
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public Boolean getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
	}
	public Company getCompany() { return company; }
	public void setCompany(Company company) { this.company = company; }
}
