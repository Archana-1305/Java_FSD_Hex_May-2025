package com.payrollmanagement.easypay.dto;

public class AttendanceRecordResponse {
	private Integer id;
    private Integer year;
    private Integer month;
    private Integer totalWorkingDays;
    private Integer totalPayableDays;
    private SimpleEmployeeDTO employee;
    // Only basic info
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public Integer getMonth() {
		return month;
	}
	public void setMonth(Integer month) {
		this.month = month;
	}
	public Integer getTotalWorkingDays() {
		return totalWorkingDays;
	}
	public void setTotalWorkingDays(Integer totalWorkingDays) {
		this.totalWorkingDays = totalWorkingDays;
	}
	public Integer getTotalPayableDays() {
		return totalPayableDays;
	}
	public void setTotalPayableDays(Integer totalPayableDays) {
		this.totalPayableDays = totalPayableDays;
	}
	public SimpleEmployeeDTO getEmployee() {
		return employee;
	}
	public void setEmployee(SimpleEmployeeDTO employee) {
		this.employee = employee;
	}

    // getters and setters
    
    

	 public static class SimpleEmployeeDTO {
	        private Integer id;
	        private String employeeCode;
	        private String firstName;
	        private String lastName;
	        private String email;
	        private String departmentName; // Flattened from department
			public Integer getId() {
				return id;
			}
			public void setId(Integer id) {
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
			public String getEmail() {
				return email;
			}
			public void setEmail(String email) {
				this.email = email;
			}
			public String getDepartmentName() {
				return departmentName;
			}
			public void setDepartmentName(String departmentName) {
				this.departmentName = departmentName;
			}

	        // getters and setters
	    }
	 

}
