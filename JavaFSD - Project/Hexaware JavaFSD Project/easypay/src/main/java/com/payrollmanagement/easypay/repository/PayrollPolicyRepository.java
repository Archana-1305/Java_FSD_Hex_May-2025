package com.payrollmanagement.easypay.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payrollmanagement.easypay.model.Company;
import com.payrollmanagement.easypay.model.PayrollPolicy;

public interface PayrollPolicyRepository extends JpaRepository<PayrollPolicy, Integer> {

	 @Query("select p from PayrollPolicy p where p.company.id = ?1 and p.isDelete = false")
	PayrollPolicy getPayrollPolicyByCompanyId(int companyId);

	

	Optional<Company> findByCompanyId(int companyId);

}
