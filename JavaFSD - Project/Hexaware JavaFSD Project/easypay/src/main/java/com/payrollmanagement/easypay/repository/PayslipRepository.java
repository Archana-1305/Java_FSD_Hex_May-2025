package com.payrollmanagement.easypay.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.payrollmanagement.easypay.dto.MonthlyTotalNetPayDto;
import com.payrollmanagement.easypay.enums.PayslipStatus;
import com.payrollmanagement.easypay.model.Payslip;

public interface PayslipRepository extends JpaRepository<Payslip, Integer> {
	List<Payslip> findByPayrollRunId(int payrollRunId);
    List<Payslip> findByEmployeeIdAndMonthAndYear(int employeeId, int month, int year);
    
    @Query("Select ps from Payslip ps where ps.payrollRun.id=?1")
	List<Payslip> getPayslipsByPayrollRun(int payrollRunId);
    
	Optional<Payslip> findByEmployeeIdAndPayrollRunId(int id, int id2);
	
	
	
	 @Query("SELECT p FROM Payslip p WHERE p.payrollRun.id = :payrollRunId AND p.status IN :statuses")
	    List<Payslip> getByPayrollRunIdAndStatusIn(int payrollRunId, List<PayslipStatus> statuses);
	 
//	 @Query("SELECT new com.yourpackage.MonthlyTotalNetPayDto(p.year, p.month, SUM(p.netPay)) FROM Payslip p GROUP BY p.year, p.month ORDER BY p.year, p.month")
//	List<MonthlyTotalNetPayDto> getMonthlyNetPayTotals();
	 
	 @Query("SELECT p FROM Payslip p WHERE p.year =?1 AND p.month =?2")
	List<Payslip> getByYearAndMonth(int year, int month);
	 
	 
	List<Payslip> findByStatus(PayslipStatus approved);
	
	@Query("SELECT p FROM Payslip p WHERE p.employee.user.username = ?1")
	List<Payslip> getAllPayslips(String username);
	
	@Query("Select p from Payslip p where p.payrollRun.department.id=?1 and p.payrollRun.id=?2")
	List<Payslip> getByPayrunAndDepartment(int departmentId, int payrunId);
	
	@Query("Select p from Payslip p where p.status=?1")
	List<Payslip> getAllPayslipsByStatus(PayslipStatus status);
}
