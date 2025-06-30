package com.payrollmanagement.easypay.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payrollmanagement.easypay.enums.TaxRegime;
import com.payrollmanagement.easypay.model.IncomeTaxSlab;

public interface IncomeTaxSlabRepository extends JpaRepository<IncomeTaxSlab, Integer>  {

	List<IncomeTaxSlab> findByFinancialYearAndTaxRegime(String financialYear, TaxRegime taxRegime);

	@Query("SELECT s FROM IncomeTaxSlab s WHERE s.financialYear = ?1 AND ?2 BETWEEN s.minAnnualIncome AND s.maxAnnualIncome")
    Optional<IncomeTaxSlab> findMatchingSlab(int year, double annualIncome);
	

}
