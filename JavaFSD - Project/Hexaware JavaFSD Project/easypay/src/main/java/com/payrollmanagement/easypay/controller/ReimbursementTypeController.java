package com.payrollmanagement.easypay.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.model.ReimbursementType;
import com.payrollmanagement.easypay.service.ReimbursementTypeService;

@RestController
@RequestMapping("/api/reimbursement-type")
public class ReimbursementTypeController {
	
    @Autowired
    private ReimbursementTypeService reimbursementTypeService;
    private static final Logger logger = LoggerFactory.getLogger(ReimbursementTypeController.class);
    
    /* AIM      : To add a new Reimbursement Type under a specific Company
     * PATH     : /api/reimbursement-type/add/{companyId}
     * METHOD   : POST
     * PARAM    : @PathVariable int companyId, @RequestBody ReimbursementType reimbursementType
     * RESPONSE : ReimbursementType with saved details under the given company
     */
    @PostMapping("/add/{companyId}")
    public ResponseEntity<?> addReimbursementType(@PathVariable int companyId,
                                                  @RequestBody ReimbursementType reimbursementType) {
    	logger.info("Adding reimbursement type for company ID: {}", companyId);
    	return ResponseEntity.status(HttpStatus.CREATED)
    			.body(reimbursementTypeService.addReimbursementType(reimbursementType, companyId));
    }

    /* AIM      : To fetch all Reimbursement Types available in the system
     * PATH     : /api/reimbursement-type/all
     * METHOD   : GET
     * PARAM    : None
     * RESPONSE : List of all Reimbursement Types
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllReimbursementTypes() {
    	logger.info("Fetching all reimbursement types");
    	return ResponseEntity.ok(reimbursementTypeService.getAllReimbursementTypes());
    }

    /* AIM      : To fetch a Reimbursement Type by its ID
     * PATH     : /api/reimbursement-type/get/{id}
     * METHOD   : GET
     * PARAM    : @PathVariable int id
     * RESPONSE : ReimbursementType details for the given ID
     */
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getReimbursementTypeById(@PathVariable int id) {
    	logger.info("Fetching reimbursement type with ID: {}", id);
    	return ResponseEntity.ok(reimbursementTypeService.getReimbursementTypeById(id));
    }

    /* AIM      : To fetch all Reimbursement Types for a specific Company
     * PATH     : /api/reimbursement-type/by-company/{companyId}
     * METHOD   : GET
     * PARAM    : @PathVariable int companyId
     * RESPONSE : List of Reimbursement Types for the specified company
     */
    @GetMapping("/by-company/{companyId}")
    public ResponseEntity<?> getByCompanyId(@PathVariable int companyId) {
    	logger.info("Fetching reimbursement types for company ID: {}", companyId);
    	return ResponseEntity.ok(reimbursementTypeService.getByCompanyId(companyId));
    }

    /* AIM      : To update an existing Reimbursement Type by its ID
     * PATH     : /api/reimbursement-type/update/{id}/{companyId}
     * METHOD   : PUT
     * PARAM    : @PathVariable int id, @PathVariable int companyId, @RequestBody ReimbursementType reimbursementType
     * RESPONSE : Updated ReimbursementType details
     */
    @PutMapping("/update/{id}/{companyId}")
    public ResponseEntity<?> updateReimbursementType(@PathVariable int id,
                                                     @PathVariable int companyId,
                                                     @RequestBody ReimbursementType reimbursementType) {
    	logger.info("Updating reimbursement type with ID: {}", id);
    	return ResponseEntity.ok(reimbursementTypeService.updateReimbursementType(id, reimbursementType));
    }



}
