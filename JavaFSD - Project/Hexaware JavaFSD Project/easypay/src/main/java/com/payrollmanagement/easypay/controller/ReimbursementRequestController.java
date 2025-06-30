package com.payrollmanagement.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.enums.RequestStatus;
import com.payrollmanagement.easypay.model.ReimbursementRequest;
import com.payrollmanagement.easypay.service.ReimbursementRequestService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/reimbursements")
@CrossOrigin(origins = "http://localhost:5173")
public class ReimbursementRequestController {
	@Autowired
	private  ReimbursementRequestService reimbursementRequestService;
	
	// Employee submits a reimbursement request
    @PostMapping("/submit/{employeeId}")
    public ResponseEntity<?> submitReimbursement(@PathVariable int employeeId,@RequestParam int reimbursementTypeId,@RequestBody ReimbursementRequest request) {
        return ResponseEntity
        		.status(HttpStatus.OK)
				.body(reimbursementRequestService.submitReimbursement(employeeId,reimbursementTypeId,request));
        		
    }

    // Admin updates status and/or amount
    @PutMapping("/{requestId}")
    public ResponseEntity<?> updateStatusAndAmount(
            @PathVariable int requestId,
            @RequestParam RequestStatus status,
            @RequestParam(required = false) Double amount)
   
    
    {
        return ResponseEntity
        		.status(HttpStatus.OK)
				.body(reimbursementRequestService.updateStatusAndAmount(requestId, status, amount));
    }
    
 // GET all reimbursements by status
    @GetMapping("/by-status")
    public ResponseEntity<?> getReimbursementsByStatus(@PathParam(value = "status") RequestStatus status) {
        List<ReimbursementRequest> requests = reimbursementRequestService.getReimbursementsByStatus(status);
        return ResponseEntity.ok(requests);
    }
    
    

}
