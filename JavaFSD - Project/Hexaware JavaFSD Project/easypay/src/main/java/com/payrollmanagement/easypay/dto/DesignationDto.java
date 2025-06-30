package com.payrollmanagement.easypay.dto;

import java.time.LocalDate;

import com.payrollmanagement.easypay.model.Designation;

public class DesignationDto {
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
    private int departmentId;
    private String departmentName;

    // Getters and setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getDesignationName() { return designationName; }
    public void setDesignationName(String designationName) { this.designationName = designationName; }
    public String getDesignationCode() { return designationCode; }
    public void setDesignationCode(String designationCode) { this.designationCode = designationCode; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Boolean getIsFullTimeAllowed() { return isFullTimeAllowed; }
    public void setIsFullTimeAllowed(Boolean isFullTimeAllowed) { this.isFullTimeAllowed = isFullTimeAllowed; }
    public Double getMinFullTimeCtc() { return minFullTimeCtc; }
    public void setMinFullTimeCtc(Double minFullTimeCtc) { this.minFullTimeCtc = minFullTimeCtc; }
    public Double getMaxFullTimeCtc() { return maxFullTimeCtc; }
    public void setMaxFullTimeCtc(Double maxFullTimeCtc) { this.maxFullTimeCtc = maxFullTimeCtc; }
    public Boolean getIsPartTimeAllowed() { return isPartTimeAllowed; }
    public void setIsPartTimeAllowed(Boolean isPartTimeAllowed) { this.isPartTimeAllowed = isPartTimeAllowed; }
    public Double getMinPartTimeCtc() { return minPartTimeCtc; }
    public void setMinPartTimeCtc(Double minPartTimeCtc) { this.minPartTimeCtc = minPartTimeCtc; }
    public Double getMaxPartTimeCtc() { return maxPartTimeCtc; }
    public void setMaxPartTimeCtc(Double maxPartTimeCtc) { this.maxPartTimeCtc = maxPartTimeCtc; }
    public LocalDate getCreatedOn() { return createdOn; }
    public void setCreatedOn(LocalDate createdOn) { this.createdOn = createdOn; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public int getDepartmentId() { return departmentId; }
    public void setDepartmentId(int departmentId) { this.departmentId = departmentId; }
    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    // Static conversion method
    public static DesignationDto fromEntity(Designation designation) {
        DesignationDto dto = new DesignationDto();
        dto.setId(designation.getId());
        dto.setDesignationName(designation.getDesignationName());
        dto.setDesignationCode(designation.getDesignationCode());
        dto.setDescription(designation.getDescription());
        dto.setIsFullTimeAllowed(designation.getIsFullTimeAllowed());
        dto.setMinFullTimeCtc(designation.getMinFullTimeCtc());
        dto.setMaxFullTimeCtc(designation.getMaxFullTimeCtc());
        dto.setIsPartTimeAllowed(designation.isPartTimeAllowed());
        dto.setMinPartTimeCtc(designation.getMinPartTimeCtc());
        dto.setMaxPartTimeCtc(designation.getMaxPartTimeCtc());
        dto.setCreatedOn(designation.getCreatedOn());
        dto.setIsActive(designation.isActive());
        if (designation.getDepartment() != null) {
            dto.setDepartmentId(designation.getDepartment().getId());
            dto.setDepartmentName(designation.getDepartment().getDepartmentName());
        }
        return dto;
    }
}