package com.payrollmanagement.easypay.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "designation_info")
public class Designation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String designationName;
	private String designationCode;
	private String description;  
	
	private Boolean isFullTimeAllowed;  
    private Double minFullTimeCtc;
    private Double maxFullTimeCtc;
    
    private Boolean isPartTimeAllowed;
    private Double minPartTimeCtc;
    private Double maxPartTimeCtc;
	
    private LocalDate createdOn;
	private Boolean isActive;
	private Boolean isDelete;
	
	
	@ManyToOne
	private Department department;

	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public String getDesignationName() { return designationName; }
	public void setDesignationName(String designationName) { this.designationName = designationName; }

	public String getDesignationCode() { return designationCode; }
	public void setDesignationCode(String designationCode) { this.designationCode = designationCode; }

	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }

	public Boolean getIsFullTimeAllowed() { return isFullTimeAllowed; }
	public void setFullTimeAllowed(Boolean isFullTimeAllowed) { this.isFullTimeAllowed = isFullTimeAllowed; }

	public Double getMinFullTimeCtc() { return minFullTimeCtc; }
	public void setMinFullTimeCtc(Double minFullTimeCtc) { this.minFullTimeCtc = minFullTimeCtc; }

	public Double getMaxFullTimeCtc() { return maxFullTimeCtc; }
	public void setMaxFullTimeCtc(Double maxFullTimeCtc) { this.maxFullTimeCtc = maxFullTimeCtc; }

	public Boolean isPartTimeAllowed() { return isPartTimeAllowed; }
	public void setisPartTimeAllowed(Boolean isPartTimeAllowed) { this.isPartTimeAllowed = isPartTimeAllowed; }

	public Double getMinPartTimeCtc() { return minPartTimeCtc; }
	public void setMinPartTimeCtc(Double minPartTimeCtc) { this.minPartTimeCtc = minPartTimeCtc; }

	public Double getMaxPartTimeCtc() { return maxPartTimeCtc; }
	public void setMaxPartTimeCtc(Double maxPartTimeCtc) { this.maxPartTimeCtc = maxPartTimeCtc; }

	public LocalDate getCreatedOn() { return createdOn; }
	public void setCreatedOn(LocalDate createdOn) { this.createdOn = createdOn; }

	public Boolean isActive() { return isActive; }
	public void setActive(Boolean isActive) { this.isActive = isActive; }

	public Department getDepartment() { return department; }
	public void setDepartment(Department department) { this.department = department; }
	public Boolean getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
	}
	
	
}
