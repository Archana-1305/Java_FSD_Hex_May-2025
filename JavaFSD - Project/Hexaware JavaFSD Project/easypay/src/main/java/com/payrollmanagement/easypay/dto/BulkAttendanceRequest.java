package com.payrollmanagement.easypay.dto;

import java.util.List;

public class BulkAttendanceRequest {
	 private Integer departmentId;
	    private Integer month;
	    private Integer year;
	    private Integer totalWorkingDays;
	    private List<EmployeeAttendanceDTO> records;
	    

	
	    public Integer getDepartmentId() {
			return departmentId;
		}
		public void setDepartmentId(Integer departmentId) {
			this.departmentId = departmentId;
		}

		public Integer getMonth() {
			return month;
		}



		public void setMonth(Integer month) {
			this.month = month;
		}



		public Integer getYear() {
			return year;
		}



		public void setYear(Integer year) {
			this.year = year;
		}



		public Integer getTotalWorkingDays() {
			return totalWorkingDays;
		}



		public void setTotalWorkingDays(Integer totalWorkingDays) {
			this.totalWorkingDays = totalWorkingDays;
		}



		public List<EmployeeAttendanceDTO> getRecords() {
			return records;
		}



		public void setRecords(List<EmployeeAttendanceDTO> records) {
			this.records = records;
		}



		public static class EmployeeAttendanceDTO {
	        private Integer employeeId;
	        private Integer totalPayableDays;
			
			
			public Integer getEmployeeId() {
				return employeeId;
			}
			public void setEmployeeId(Integer employeeId) {
				this.employeeId = employeeId;
			}
			public Integer getTotalPayableDays() {
				return totalPayableDays;
			}
			public void setTotalPayableDays(Integer totalPayableDays) {
				this.totalPayableDays = totalPayableDays;
			}
	        

	       
	    }

}
