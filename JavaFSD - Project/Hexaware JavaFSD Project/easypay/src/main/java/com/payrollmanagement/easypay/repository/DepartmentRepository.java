package com.payrollmanagement.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payrollmanagement.easypay.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

	// Get Dept by Company Id
	@Query("Select d from Department d where company.id=?1 and isDelete=false")
	List<Department> getDepartmentsByCompanyId(int companyId);

	// Get All Dept which is not deleted
	@Query("Select d from Department d where isDelete=false")
	List<Department> getAllDepartments();

}
