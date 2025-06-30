package com.payrollmanagement.easypay.model;

import java.time.LocalDate;

import com.payrollmanagement.easypay.enums.RequestStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reimbursement_requests")
public class ReimbursementRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private double amount;
	private String billUrl; 
	private LocalDate appliedOn;
	private RequestStatus status;
	private int month;      // add this
    private int year;       // add this
   
    
    @ManyToOne
	private Employee employee;

	@ManyToOne
	private ReimbursementType reimbursementType;


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
	

	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public double getAmount() { return amount; }
	public void setAmount(double amount) { this.amount = amount; }

	public String getBillUrl() { return billUrl; }
	public void setBillUrl(String billUrl) { this.billUrl = billUrl; }

	public LocalDate getAppliedOn() { return appliedOn; }
	public void setAppliedOn(LocalDate appliedOn) { this.appliedOn = appliedOn; }

	public RequestStatus getStatus() { return status; }
	public void setStatus(RequestStatus status) { this.status = status; }

	public Employee getEmployee() { return employee; }
	public void setEmployee(Employee employee) { this.employee = employee; }

	public ReimbursementType getReimbursementType() { return reimbursementType; }
	public void setReimbursementType(ReimbursementType reimbursementType) { this.reimbursementType = reimbursementType; }

	
	
	
	

}
