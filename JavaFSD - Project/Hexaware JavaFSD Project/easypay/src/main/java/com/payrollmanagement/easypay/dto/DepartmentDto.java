package com.payrollmanagement.easypay.dto;

import java.time.LocalDate;

import com.payrollmanagement.easypay.model.Department;

public class DepartmentDto {
    private int id;
    private String departmentName;
    private String departmentCode;
    private String description;
    private LocalDate createdOn;
    private Boolean isActive;
    private Boolean isDelete;
    private int companyId;
    private String companyName;

    // Getters and setters
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
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public Boolean getIsDelete() { return isDelete; }
    public void setIsDelete(Boolean isDelete) { this.isDelete = isDelete; }
    public int getCompanyId() { return companyId; }
    public void setCompanyId(int companyId) { this.companyId = companyId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    // Conversion from entity to DTO
    public static DepartmentDto fromEntity(Department dept) {
        DepartmentDto dto = new DepartmentDto();
        dto.setId(dept.getId());
        dto.setDepartmentName(dept.getDepartmentName());
        dto.setDepartmentCode(dept.getDepartmentCode());
        dto.setDescription(dept.getDescription());
        dto.setCreatedOn(dept.getCreatedOn());
        dto.setIsActive(dept.getIsActive());
        dto.setIsDelete(dept.getIsDelete());
        if (dept.getCompany() != null) {
            dto.setCompanyId(dept.getCompany().getId());
            dto.setCompanyName(dept.getCompany().getName());
        }
        return dto;
    }
}