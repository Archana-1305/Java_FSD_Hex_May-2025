package com.payrollmanagement.easypay.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payrollmanagement.easypay.model.Company;
import com.payrollmanagement.easypay.model.ReimbursementType;

public interface ReimbursementTypeRepository extends JpaRepository<ReimbursementType, Integer>{

	@Query("Select rt from ReimbursementType rt where rt.company.id=?1")
	List<ReimbursementType> getByCompanyId(Company company);

	//Optional<Company> findByNameIgnoreCaseAndCompanyId(String name, int companyId);

}
