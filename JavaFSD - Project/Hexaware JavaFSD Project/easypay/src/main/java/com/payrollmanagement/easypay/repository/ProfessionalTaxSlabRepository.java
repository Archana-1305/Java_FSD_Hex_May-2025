package com.payrollmanagement.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payrollmanagement.easypay.enums.States;
import com.payrollmanagement.easypay.model.ProfessionalTaxSlab;

public interface ProfessionalTaxSlabRepository extends JpaRepository<ProfessionalTaxSlab, Integer>{

	List<ProfessionalTaxSlab> findByStateAndFinancialYear(States state, String financialYear);

}
