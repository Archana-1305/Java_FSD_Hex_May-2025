package com.payrollmanagement.easypay.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.payrollmanagement.easypay.enums.RequestStatus;
import com.payrollmanagement.easypay.model.Employee;
import com.payrollmanagement.easypay.model.MonthReimbursement;
import com.payrollmanagement.easypay.repository.EmployeeRepository;
import com.payrollmanagement.easypay.repository.MonthReimbursementRepository;
import com.payrollmanagement.easypay.repository.ReimbursementRequestRepository;

@Service

public class MonthReimbursementService {
	 private  MonthReimbursementRepository monthReimbursementRepository;
	    private  EmployeeRepository employeeRepository;
	    private  ReimbursementRequestRepository reimbursementRequestRepository;
	    
		public MonthReimbursementService(MonthReimbursementRepository monthReimbursementRepository,
				EmployeeRepository employeeRepository, ReimbursementRequestRepository reimbursementRequestRepository) {
			super();
			this.monthReimbursementRepository = monthReimbursementRepository;
			this.employeeRepository = employeeRepository;
			this.reimbursementRequestRepository = reimbursementRequestRepository;
		}
		
//		public MonthReimbursement calculateAndSaveTotalReimbursement(int employeeId, int month, int year) {
//	        Employee employee = employeeRepository.findById(employeeId)
//	                .orElseThrow(() -> new RuntimeException("Employee not found"));
//
//	        List<Double> amounts = reimbursementRequestRepository.getApprovedAmountsByEmployeeMonthYear(
//	                employeeId, month, year, RequestStatus.APPROVED);
//
//	        double total = 0.0;
//	        for (Double amount : amounts) {
//	            if (amount != null) {
//	                total += amount;
//	            }
//	        }
//	        MonthReimbursement monthReimbursement = monthReimbursementRepository
//	                .findByEmployeeAndMonthAndYear(employee, month, year)
//	                .orElseGet(() -> {
//	                    MonthReimbursement mr = new MonthReimbursement();
//	                    mr.setEmployee(employee);
//	                    mr.setMonth(month);
//	                    mr.setYear(year);
//	                    return mr;
//	                });
//	        return monthReimbursementRepository.save(monthReimbursement);
//	    }
		
		public MonthReimbursement calculateAndSaveTotalReimbursement(int employeeId, int month, int year) {
		    // 1. Find the employee
		    Employee employee = employeeRepository.findById(employeeId)
		            .orElseThrow(() -> new RuntimeException("Employee not found"));

		    // 2. Calculate the total of approved reimbursement requests for the month/year
		    List<Double> amounts = reimbursementRequestRepository.getApprovedAmountsByEmployeeMonthYear(
		            employeeId, month, year, RequestStatus.APPROVED);

		    double total = 0.0;
		    for (Double amount : amounts) {
		        if (amount != null) {
		            total += amount;
		        }
		    }

		    // 3. Find existing MonthReimbursement or create a new one
		    MonthReimbursement monthReimbursement = monthReimbursementRepository
		            .findByEmployeeAndMonthAndYear(employee, month, year)
		            .orElseGet(() -> {
		                MonthReimbursement mr = new MonthReimbursement();
		                mr.setEmployee(employee);
		                mr.setMonth(month);
		                mr.setYear(year);
		                return mr;
		            });

		    // 4. Set the new total
		    monthReimbursement.setTotalAmount(total);

		    // 5. Save and return
		    return monthReimbursementRepository.save(monthReimbursement);
		}
	    

}
