package com.payrollmanagement.easypay.model;

import com.payrollmanagement.easypay.enums.TaxRegime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "income_tax_slabs")
public class IncomeTaxSlab {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String financialYear;

	@Enumerated(EnumType.STRING)
	private TaxRegime taxRegime;

	private double minAnnualIncome;
	private double maxAnnualIncome;

	private double taxRatePercentage;

	private double surcharge;

	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public String getFinancialYear() { return financialYear; }
	public void setFinancialYear(String financialYear) { this.financialYear = financialYear; }

	public TaxRegime getTaxRegime() { return taxRegime; }
	public void setTaxRegime(TaxRegime taxRegime) { this.taxRegime = taxRegime; }

	public double getMinAnnualIncome() { return minAnnualIncome; }
	public void setMinAnnualIncome(double minAnnualIncome) { this.minAnnualIncome = minAnnualIncome; }

	public double getMaxAnnualIncome() { return maxAnnualIncome; }
	public void setMaxAnnualIncome(double maxAnnualIncome) { this.maxAnnualIncome = maxAnnualIncome; }

	public double getTaxRatePercentage() { return taxRatePercentage; }
	public void setTaxRatePercentage(double taxRatePercentage) { this.taxRatePercentage = taxRatePercentage; }

	public double getSurcharge() { return surcharge; }
	public void setSurcharge(double surcharge) { this.surcharge = surcharge; }
}
