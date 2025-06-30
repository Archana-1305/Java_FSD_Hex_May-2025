package com.payrollmanagement.easypay.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.model.Designation;
import com.payrollmanagement.easypay.service.DesignationService;

@RestController
@RequestMapping("/api/designation")
@CrossOrigin(origins = "http://localhost:5173")
public class DesignationController {
	@Autowired
	private DesignationService designationService;

	private Logger logger = LoggerFactory.getLogger("DesignationController");
	
	/* AIM      : To add a new Designation under a specific Department
	 * PATH     : /api/designation/add/{departmentId}
	 * METHOD   : POST
	 * PARAM    : @PathVariable int departmentId, @RequestBody Designation designation
	 * RESPONSE : Designation with saved details under the given department
	 */
	@PostMapping("/add/{departmentId}")
	public ResponseEntity<?> addDesignation(@PathVariable int departmentId,
	                                        @RequestBody Designation designation) {
		logger.info("Adding designation to department: " + departmentId);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(designationService.addDesignation(departmentId, designation));
	}
	
	/* AIM      : To fetch all Designations available in the system
	 * PATH     : /api/designation/getAll
	 * METHOD   : GET
	 * PARAM    : None
	 * RESPONSE : List of all Designations
	 */
	@GetMapping("/getAll")
	public ResponseEntity<?> getAllDesignations() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(designationService.getAllDesignations());
	}
	
	/* AIM      : To fetch a Designation by its ID
	 * PATH     : /api/designation/getById/{id}
	 * METHOD   : GET
	 * PARAM    : @PathVariable int id
	 * RESPONSE : Designation details for the given ID
	 */
	@GetMapping("/getById/{id}")
	public ResponseEntity<?> getDesignationById(@PathVariable int id) {
		logger.info("Fetching designation by id: " + id);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(designationService.getDesignationById(id));
	}

	/* AIM      : To fetch all Designations under a specific Department
	 * PATH     : /api/designation/getByDepartmentId/{departmentId}
	 * METHOD   : GET
	 * PARAM    : @PathVariable int departmentId
	 * RESPONSE : List of Designations for the specified Department ID
	 */
	@GetMapping("/getByDepartmentId/{departmentId}")
	public ResponseEntity<?> getDesignationsByDepartmentId(@PathVariable int departmentId) {
		logger.info("Fetching designations for department id: " + departmentId);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(designationService.getDesignationsByDepartmentId(departmentId));
	}
	

	/* AIM      : To update an existing Designation by its ID
	 * PATH     : /api/designation/update/{id}
	 * METHOD   : PUT
	 * PARAM    : @PathVariable int id, @RequestBody Designation updatedDesignation
	 * RESPONSE : Updated Designation details
	 */
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateDesignation(@PathVariable int id,
	                                           @RequestBody Designation updatedDesignation) {
		logger.info("Updating designation id: " + id);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(designationService.updateDesignation(id, updatedDesignation));
	}

    
	/* AIM      : To perform a soft delete of a Designation by its ID
	 * PATH     : /api/designation/delete/{id}
	 * METHOD   : DELETE
	 * PARAM    : @PathVariable int id
	 * RESPONSE : Success message after marking the designation as deleted
	 */
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> softDeleteDesignation(@PathVariable int id) {
		logger.info("Soft delete for designation ID: {}", id);
		designationService.softDeleteDesignation(id);
		return ResponseEntity.ok("Designation marked as deleted");
	}

}
