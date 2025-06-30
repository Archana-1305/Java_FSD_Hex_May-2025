package com.payrollmanagement.easypay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.model.MonthReimbursement;
import com.payrollmanagement.easypay.service.MonthReimbursementService;

@RestController
@RequestMapping("/api/month-reimbursements")
public class MonthReimbursementController {
	 @Autowired
	    private MonthReimbursementService monthReimbursementService;

	    @GetMapping("/calculate/{employeeId}")
	    public ResponseEntity<MonthReimbursement> calculateTotalReimbursement(
	            @PathVariable int employeeId,
	            @RequestParam int month,
	            @RequestParam int year
	    ) {
	        return ResponseEntity.status(HttpStatus.OK)
					.body(monthReimbursementService.calculateAndSaveTotalReimbursement(employeeId, month, year));
    		
	    }

}
