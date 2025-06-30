package com.payrollmanagement.easypay.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee_allowance")
public class EmployeeAllowance {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    
	private int amount;
    private int month; // 1 - 12

    private int year;

    @ManyToOne
    private Employee employee;
    @ManyToOne
    private Allowances allowances;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public Allowances getAllowances() {
		return allowances;
	}
	public void setAllowances(Allowances allowances) {
		this.allowances = allowances;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}

	

}
