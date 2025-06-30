package com.payrollmanagement.easypay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payrollmanagement.easypay.model.EmployeeAllowance;

public interface EmployeeAllowanceRepository extends JpaRepository<EmployeeAllowance, Integer> {

	
	//EmployeeAllowance getAmountById(int employeeAllowanceId);
//    // Find by employee, month, year
//    Optional<EmployeeAllowance> findByEmployeeIdAndMonthAndYear(int empId, int month, int year);

	@Query("SELECT ea.amount FROM EmployeeAllowance ea WHERE ea.employee.id = ?1 AND ea.month = ?2 AND ea.year = ?3")
	List<Double> getAmountById(int employeeID, int month, int year);

}
