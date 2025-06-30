package com.payrollmanagement.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payrollmanagement.easypay.model.Designation;

public interface DesignationRepository extends JpaRepository<Designation, Integer> {
	 @Query("select d from Designation d where d.department.id = ?1 and d.isDelete = false")
	List<Designation> findByDepartmentId(int departmentId);
	 
	 @Query("select d from Designation d where d.isDelete = false")
	    List<Designation> findAllActive();

}
