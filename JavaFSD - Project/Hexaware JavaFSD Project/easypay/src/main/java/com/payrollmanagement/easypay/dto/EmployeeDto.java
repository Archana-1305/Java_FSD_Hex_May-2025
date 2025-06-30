package com.payrollmanagement.easypay.dto;

import java.util.List;

import com.payrollmanagement.easypay.model.Employee;

public class EmployeeDto {
    private int id;
    private String employeeCode;
    private String firstName;
    private String lastName;
    private String gender;
    private String email;
    private String contact;
    private String address;
    private String dob;
    private String empType;
    private String dateOfJoining;
    private String dateOfLeaving;
    private String status;
    private double ctcAmount;
    private String bankName;
    private String accountNumber;
    private String ifscCode;

    private int departmentId;
    private String departmentName;
    private int designationId;
    private String designationName;
    private int companyId;
    private String companyName;
    
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmployeeCode() {
		return employeeCode;
	}

	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getEmpType() {
		return empType;
	}

	public void setEmpType(String empType) {
		this.empType = empType;
	}

	public String getDateOfJoining() {
		return dateOfJoining;
	}

	public void setDateOfJoining(String dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}

	public String getDateOfLeaving() {
		return dateOfLeaving;
	}

	public void setDateOfLeaving(String dateOfLeaving) {
		this.dateOfLeaving = dateOfLeaving;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getCtcAmount() {
		return ctcAmount;
	}

	public void setCtcAmount(double ctcAmount) {
		this.ctcAmount = ctcAmount;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getIfscCode() {
		return ifscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public int getDesignationId() {
		return designationId;
	}

	public void setDesignationId(int designationId) {
		this.designationId = designationId;
	}

	public String getDesignationName() {
		return designationName;
	}

	public void setDesignationName(String designationName) {
		this.designationName = designationName;
	}

	public int getCompanyId() {
		return companyId;
	}

	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}


   
    

    public static EmployeeDto fromEntity(Employee emp) {
        EmployeeDto dto = new EmployeeDto();
        dto.id = emp.getId();
        dto.employeeCode = emp.getEmployeeCode();
        dto.firstName = emp.getFirst_name();
        dto.lastName = emp.getLast_name();
        dto.gender = emp.getGender() != null ? emp.getGender().name() : null;
        dto.email = emp.getEmail();
        dto.contact = emp.getContact();
        dto.address = emp.getAddress();
        dto.dob = emp.getDob();
        dto.empType = emp.getEmp_type() != null ? emp.getEmp_type().name() : null;
        dto.dateOfJoining = emp.getDate_of_joining();
        dto.dateOfLeaving = emp.getDate_of_leaving();
        dto.status = emp.getStatus() != null ? emp.getStatus().name() : null;
        dto.ctcAmount = emp.getCtcAmount();
        dto.bankName = emp.getBankName();
        dto.accountNumber = emp.getAccountNumber();
        dto.ifscCode = emp.getIfscCode();

        if (emp.getDepartment() != null) {
            dto.departmentId = emp.getDepartment().getId();
            dto.departmentName = emp.getDepartment().getDepartmentName();
        }
        if (emp.getDesignation() != null) {
            dto.designationId = emp.getDesignation().getId();
            dto.designationName = emp.getDesignation().getDesignationName();
        }
        if (emp.getCompany() != null) {
            dto.companyId = emp.getCompany().getId();
            dto.companyName = emp.getCompany().getName();
        }
       
        return dto;
    }
    public static List<EmployeeDto> convertEmployeeListToDto(List<Employee> employees) {
        return employees.stream()
            .map(EmployeeDto::fromEntity)
            .collect(java.util.stream.Collectors.toList());
    }

	
}