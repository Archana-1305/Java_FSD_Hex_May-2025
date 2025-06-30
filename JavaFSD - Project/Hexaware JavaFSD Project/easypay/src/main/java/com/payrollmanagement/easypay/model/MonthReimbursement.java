package com.payrollmanagement.easypay.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "month_reimbursements")
public class MonthReimbursement {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    @ManyToOne
	    private Employee employee;
	    private int month;
	    private int year;
	    private double totalAmount;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public Employee getEmployee() {
			return employee;
		}
		public void setEmployee(Employee employee) {
			this.employee = employee;
		}
		public int getMonth() {
			return month;
		}
		public void setMonth(int month) {
			this.month = month;
		}
		public int getYear() {
			return year;
		}
		public void setYear(int year) {
			this.year = year;
		}
		public double getTotalAmount() {
			return totalAmount;
		}
		public void setTotalAmount(double totalAmount) {
			this.totalAmount = totalAmount;
		}
	    
	    

}
