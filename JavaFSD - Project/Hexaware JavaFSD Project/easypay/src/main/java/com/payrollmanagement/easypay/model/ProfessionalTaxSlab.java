package com.payrollmanagement.easypay.model;

import com.payrollmanagement.easypay.enums.States;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "professional_tax_slabs")
public class ProfessionalTaxSlab {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Enumerated(EnumType.STRING)
    private States state;

	private double minIncome;
	private double maxIncome;
	private double rate;
	private String financialYear;
	
	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public States getState() { return state; }
	public void setState(States state) { this.state = state; }

	public double getMinIncome() { return minIncome; }
	public void setMinIncome(double minIncome) { this.minIncome = minIncome; }

	public double getMaxIncome() { return maxIncome; }
	public void setMaxIncome(double maxIncome) { this.maxIncome = maxIncome; }

	public double getRate() { return rate; }
	public void setRate(double rate) { this.rate = rate; }

	public String getFinancialYear() { return financialYear; }
	public void setFinancialYear(String financialYear) { this.financialYear = financialYear; }
	
}
