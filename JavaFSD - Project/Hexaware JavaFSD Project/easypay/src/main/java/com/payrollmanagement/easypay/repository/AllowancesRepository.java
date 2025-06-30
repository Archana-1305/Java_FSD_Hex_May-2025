package com.payrollmanagement.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payrollmanagement.easypay.model.Allowances;

public interface AllowancesRepository extends JpaRepository<Allowances, Integer>{

	// To get allowance by company Id
	@Query("Select a from Allowances a where a.company.id=?1")
	List<Allowances> getByCompanyId(int companyId);

}
